# `_common.sh` expliqué

`_common.sh` contient ce que toutes les étapes (`00_init.sh` à `04_drop.sh`) ont en commun :

1. il arrête le script à la première erreur ;
2. il calcule les chemins utiles ;
3. il lit la connexion PostgreSQL dans `.env` ;
4. il fournit deux fonctions : `run_psql`, qui appelle `psql` avec la connexion, et `run_sql_files`, qui exécute une liste de fichiers SQL.

Il ne se lance pas seul. Chaque étape le charge avec `source` :

```bash
source "$(dirname "$0")/_common.sh"
```

`source` exécute le fichier **dans le processus de l’étape**, comme si son contenu était collé à cet endroit. Les variables et les fonctions de `_common.sh` sont donc disponibles dans l’étape.

Pour les commandes à lancer et le contenu de `.env`, voir [`../runners.md`](../runners.md).

## 1. Arrêt à la première erreur

```bash
set -e
```

Le script s’arrête dès qu’une commande échoue, par exemple un `psql` en erreur. Sans cette ligne, il continuerait avec les fichiers suivants.

## 2. Les chemins

```bash
scripts_dir=$(dirname "$0")
sql_dir="$scripts_dir/../sql"
env_file="$scripts_dir/../../.env"
```

- `$0` est le chemin du script lancé, par exemple `database/scripts/01_check.sh`.
- `dirname` garde le dossier : `database/scripts`.
- `$( )` remplace la commande par ce qu’elle affiche.

| Variable | Désigne |
| --- | --- |
| `scripts_dir` | `database/scripts/` |
| `sql_dir` | `database/sql/` |
| `env_file` | `.env` à la racine du dépôt |

Ces chemins fonctionnent parce que **toutes les étapes sont dans le même dossier que `_common.sh`**. Ils partent de l’emplacement du script, et pas du dossier courant : on peut lancer les scripts depuis n’importe où.

Les guillemets autour de `"$0"` et des chemins protègent les noms de dossiers qui contiennent des espaces.

## 3. Vérifier que `.env` existe

```bash
if [ ! -f "$env_file" ]; then
    echo "ERROR: .env not found at the repository root. Copy .env.example to .env and set POSTGRES_PASSWORD."
    exit 1
fi
```

- `[ -f fichier ]` est vrai si le fichier existe, et `!` inverse le test.
- `exit 1` arrête l’étape avec un code d’erreur. Les enchaînements (`build.sh`…) s’arrêtent à leur tour.

## 4. Lire `.env` : la fonction `read_env`

```bash
read_env() {
    value=$(grep "^$1=" "$env_file" | cut -d '=' -f 2- | tr -d '\r')
    if [ -z "$value" ]; then
        value="$2"
    fi
    echo "$value"
}
```

`read_env NOM DÉFAUT` affiche la valeur de `NOM` dans `.env`, ou `DÉFAUT` si elle est absente ou vide. Dans une fonction, `$1` et `$2` sont ses arguments.

La première ligne enchaîne trois commandes avec `|`. Chacune reçoit ce qu’affiche la précédente. Avec `.env` contenant `POSTGRES_PORT=5432` :

| Commande | Rôle | Résultat |
| --- | --- | --- |
| `grep "^$1=" "$env_file"` | Garde la ligne qui commence (`^`) par `POSTGRES_PORT=` | `POSTGRES_PORT=5432` |
| `cut -d '=' -f 2-` | Découpe sur `=` et garde à partir du 2e morceau | `5432` |
| `tr -d '\r'` | Supprime le caractère `\r`, présent si `.env` a des fins de ligne Windows | `5432` |

`-f 2-` garde le 2e morceau **et tous les suivants** : un mot de passe qui contient un `=` est lu en entier (`POSTGRES_PASSWORD=a=b` donne `a=b`).

Si la ligne n’existe pas, `grep` n’affiche rien et `value` est vide. `[ -z "$value" ]`, vrai pour une chaîne vide, déclenche alors la valeur par défaut.

```bash
POSTGRES_HOST=$(read_env POSTGRES_HOST localhost)
POSTGRES_PORT=$(read_env POSTGRES_PORT 5432)
POSTGRES_USER=$(read_env POSTGRES_USER postgres)
POSTGRES_DB=$(read_env POSTGRES_DB planet_pulse)
POSTGRES_PASSWORD=$(read_env POSTGRES_PASSWORD)
```

Chaque variable reçoit ce qu’affiche `read_env`. Le mot de passe n’a pas de valeur par défaut. Les quatre autres ont les mêmes valeurs par défaut que le backend dans `application.properties`.

Comme chaque variable reçoit la valeur de `.env`, une variable du même nom définie dans le terminal (`export POSTGRES_PORT=5999`) n’est pas utilisée.

### Format attendu

`.env` n’est pas exécuté : il est seulement lu par `grep`. Il ne peut donc pas lancer de commande. En contrepartie, il doit suivre le format de `.env.example` : une ligne `NOM=valeur` par variable, sans espaces autour du `=` ni guillemets.

| Dans `.env` | Résultat |
| --- | --- |
| `POSTGRES_PORT=5432` | `5432` |
| `POSTGRES_PASSWORD=a=b` | `a=b` |
| `POSTGRES_PORT = 5432` | Non trouvé (`grep` cherche `POSTGRES_PORT=` collé) : la valeur par défaut s’applique |
| `POSTGRES_PASSWORD="secret"` | `"secret"`, guillemets compris : la connexion échoue |
| `#POSTGRES_PORT=5433` | Ignoré : la ligne ne commence pas par le nom |
| `POSTGRES_PORT=5432 # local` | `5432 # local` : les commentaires en fin de ligne ne sont pas retirés |
| Deux lignes `POSTGRES_PORT=` | Les deux valeurs sont collées : à éviter |

## 5. Exiger le mot de passe

```bash
if [ -z "$POSTGRES_PASSWORD" ]; then
    echo "ERROR: POSTGRES_PASSWORD is empty. Set it in .env at the repository root (see .env.example)."
    exit 1
fi
```

Si le mot de passe est vide ou absent de `.env`, l’étape s’arrête **avant tout appel à `psql`**. Les fonctions `run_psql` et `run_sql_files` sont seulement définies plus bas : elles ne s’exécutent que lorsque l’étape les appelle, ce qui n’arrive jamais dans ce cas.

Sans ce contrôle, `psql` demanderait le mot de passe dans le terminal, ce qui bloquerait un enchaînement.

## 6. Transmettre le mot de passe à `psql`

```bash
export PGPASSWORD="$POSTGRES_PASSWORD"
```

`psql` n’a pas d’option pour recevoir un mot de passe : il lit la **variable d’environnement** `PGPASSWORD`. `export` rend la variable visible par les programmes lancés ensuite, dont `psql`.

Chaque étape tourne dans son propre processus `bash` (on la lance avec `bash 01_check.sh`). `PGPASSWORD` disparaît donc à la fin de l’étape : il ne reste pas dans le terminal.

## 7. `run_psql` : appeler `psql` avec la connexion

```bash
run_psql() {
    psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -v ON_ERROR_STOP=1 "$@"
}
```

`run_psql` évite de répéter la connexion à chaque appel de `psql`.

- `-h`, `-p`, `-U` : hôte, port et utilisateur.
- `-v ON_ERROR_STOP=1` : `psql` s’arrête à la première instruction SQL en erreur et renvoie un code d’erreur. Sans cette option, il continue et termine sans erreur. Avec `set -e`, l’étape s’arrête alors.
- `"$@"` ajoute tous les arguments reçus par la fonction. L’appelant précise ainsi la base, le fichier, etc.

## 8. `run_sql_files` : exécuter une liste de fichiers SQL

```bash
run_sql_files() {
    for file in "$@"; do
        echo "-> $file"
        run_psql -d "$POSTGRES_DB" --single-transaction -q -f "$sql_dir/$file"
    done
}
```

Une étape l’appelle avec sa liste, dont les chemins sont relatifs à `database/sql/` :

```bash
run_sql_files "${scripts[@]}"
```

La boucle `for` traite les fichiers un par un :

- `echo "-> $file"` affiche le fichier en cours. En cas d’erreur, on sait ainsi lequel a échoué.
- `-d "$POSTGRES_DB"` : la base du projet.
- `--single-transaction` : tout le fichier s’exécute dans une seule transaction, soit tout est appliqué, soit rien. C’est pourquoi les fichiers SQL ne contiennent ni `BEGIN` ni `COMMIT`.
- `-q` : mode silencieux. `psql` n’affiche pas les messages comme `CREATE TABLE`. Les résultats des `SELECT` restent affichés.
- `-f "$sql_dir/$file"` : le fichier SQL, avec son chemin complet.

Si un fichier échoue, `set -e` arrête l’étape : les fichiers suivants ne sont pas exécutés.

## Une exception : `00_init.sh`

`00_init.sh` utilise `run_psql` directement, sans `run_sql_files`, pour deux raisons :

- il se connecte à la base `postgres` (`-d postgres`), car `planet_pulse` n’existe peut-être pas encore ;
- `CREATE DATABASE` ne peut pas s’exécuter dans une transaction : `--single-transaction` est donc absent.
