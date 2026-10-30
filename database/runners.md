# Scripts de lancement de la base

Le dossier `database/scripts/` contient des scripts Bash (`.sh`). Ils fonctionnent sous Linux, macOS et Windows (avec Git Bash).

Tous les scripts sont au même niveau. Il y en a trois sortes :

- les **étapes**, préfixées par un numéro (`00_` à `04_`). Chacune exécute une liste de fichiers SQL ;
- les **enchaînements**, sans numéro. Ils appellent les étapes dans l’ordre et n’exécutent aucun SQL eux-mêmes ;
- **`_common.sh`**, préfixé par `_` : il est chargé par les étapes et ne se lance jamais seul. Son fonctionnement est expliqué ligne par ligne dans [`scripts/_common.md`](scripts/_common.md).

```text
database/scripts/
├── _common.md           # explication de _common.sh
├── _common.sh           # connexion et exécution, chargé par les étapes
├── 00_init.sh
├── 01_check.sh
├── 02_create.sh
├── 03_insert.sh
├── 04_drop.sh
├── build.sh
├── build_with_data.sh
└── rebuild.sh
```

Le numéro d’une étape donne son ordre dans une installation complète. `04_drop.sh` est à part : il n’est appelé que par `rebuild.sh`, en premier.

### Étapes

| Script | Rôle | Fichiers SQL exécutés |
| --- | --- | --- |
| `00_init.sh` | Crée la base si elle n’existe pas | `setup/00_create_database.sql` |
| `01_check.sh` | Vérifie la connexion à la base | `checks/dql_check_connection.sql` |
| `02_create.sh` | Crée les tables | `NN_ddl_create_tables.sql` de chaque feature |
| `03_insert.sh` | Remplit les tables vides | `NN_dml_insert_*.sql` de chaque feature |
| `04_drop.sh` | Supprime les tables | `reset/ddl_drop_tables.sql` de chaque feature |

### Enchaînements

| Script | Étapes appelées | Supprime des données ? | Si les tables existent déjà |
| --- | --- | --- | --- |
| `build.sh` | `init`, `check`, `create` | Non | Échoue sur `create` |
| `build_with_data.sh` | `build`, `insert` | Non | Échoue sur `create` |
| `rebuild.sh` | `drop`, `create`, `insert` | **Oui** | Les supprime et les recrée |

`build` et `build_with_data` servent à installer la base sur un poste, ou à recréer les tables après un `drop`. Ils ne suppriment jamais rien. Le `check` placé après `init` arrête le build avant `create` si la connexion à `planet_pulse` échoue. `rebuild` sert à repartir de zéro sur une base existante.

## Prérequis

- PostgreSQL, avec `psql` dans le `PATH`.
- Bash : déjà présent sous Linux et macOS. Sous Windows, installer [Git for Windows](https://git-scm.com/download/win), qui fournit Git Bash.

### Windows : lancer les scripts depuis Git Bash

Ouvrir un terminal **Git Bash** (dans VS Code : menu du terminal, profil « Git Bash »), puis lancer les commandes ci-dessous.

Depuis PowerShell ou `cmd`, la commande `bash` peut lancer le Bash de **WSL** au lieu de Git Bash. WSL est un Linux séparé : il ne voit pas le `psql` installé sous Windows, et le script échoue sur `psql: command not found`. Pour rester dans PowerShell, appeler Git Bash par son chemin :

```powershell
& 'C:\Program Files\Git\bin\bash.exe' database/scripts/build.sh
```

## Première installation

```bash
bash database/scripts/build_with_data.sh
```

Pour des tables vides, utiliser `build.sh` à la place.

`init` est différent des autres étapes :

- il se connecte à la base `postgres`, car `planet_pulse` n’existe peut-être pas encore ;
- il vérifie d’abord si la base existe. Si oui, il affiche `Database planet_pulse already exists: skipped` et s’arrête sans erreur ;
- il n’utilise pas de transaction, car `CREATE DATABASE` ne peut pas s’exécuter dans une transaction.

Le nom `planet_pulse` est écrit dans `sql/setup/00_create_database.sql`. Si `POSTGRES_DB` vaut autre chose, il faut aussi modifier ce fichier.

## Lancer un script

```bash
bash database/scripts/build.sh
bash database/scripts/build_with_data.sh
bash database/scripts/rebuild.sh
bash database/scripts/01_check.sh
bash database/scripts/04_drop.sh
```

`check` affiche la base, l’utilisateur et la version de PostgreSQL, puis `Connection OK`. Si la connexion échoue, il s’arrête avec l’erreur de `psql`.

Les scripts peuvent être lancés depuis n’importe quel dossier : les chemins SQL des listes sont relatifs à `database/sql/`.

`insert` attend des tables vides. Le relancer sur des tables déjà remplies échoue sur les contraintes d’unicité. Pour recharger les données, utiliser `rebuild`.

### `bash script.sh` ou `./script.sh` ?

| Commande | Droit d’exécution nécessaire ? |
| --- | --- |
| `bash database/scripts/build.sh` | Non : c’est `bash` qui lit le fichier |
| `./database/scripts/build.sh` | Oui sous Linux et macOS, sinon `Permission denied`. La première ligne `#!/usr/bin/env bash` choisit alors Bash |

La documentation utilise `bash script.sh` : cette forme marche partout, sans `chmod`. Git Bash, sous Windows, ignore les droits et accepte les deux formes.

Les enchaînements (`build`, `build_with_data`, `rebuild`) appellent les étapes avec `bash`. Seul le script lancé à la main a donc besoin du droit d’exécution, et seulement avec `./`.

Pour pouvoir utiliser `./` sur Linux et macOS sans faire de `chmod` après chaque clone, on enregistre le droit d’exécution **dans Git**. Les fichiers créés sous Windows sont enregistrés sans ce droit. On le fait une fois, quand on ajoute les scripts :

```bash
git add --chmod=+x database/scripts/[0-9]*.sh database/scripts/build*.sh database/scripts/rebuild.sh
```

`_common.sh` n’est pas concerné : il est chargé par `source`, jamais exécuté directement.

Sur un clone qui n’a pas encore ce droit, la commande locale est :

```bash
chmod +x database/scripts/[0-9]*.sh database/scripts/build*.sh database/scripts/rebuild.sh
```

Ne pas lancer les scripts avec `sh script.sh`. Sur Ubuntu et Debian, `sh` est `dash`, qui ne comprend pas `[[`, `<<<` ni `printf -v`, utilisés par les scripts.

Les fichiers `.sh` doivent garder des fins de ligne Unix (LF). `.gitattributes` l’impose dans Git (`*.sh text eol=lf`). Un fichier enregistré en CRLF par un éditeur Windows échoue avec `$'\r': command not found`.

## Connexion

La connexion se règle **uniquement** dans le fichier `.env` à la racine du dépôt. Pour le créer :

```bash
cp .env.example .env
```

puis renseigner `POSTGRES_PASSWORD`. Aucune commande n’est à lancer avant les scripts.

Garder le format de `.env.example` : une ligne `NOM=valeur` par variable, **sans espaces autour du `=` ni guillemets**. `POSTGRES_PASSWORD="secret"` serait lu avec les guillemets, et la connexion échouerait. Le détail est dans [`scripts/_common.md`](scripts/_common.md#format-attendu).

| Variable | Si absente ou vide dans `.env` |
| --- | --- |
| `POSTGRES_HOST` | `localhost` |
| `POSTGRES_PORT` | `5432` |
| `POSTGRES_USER` | `postgres` |
| `POSTGRES_PASSWORD` | **Obligatoire** : le script affiche une erreur et s’arrête |
| `POSTGRES_DB` | `planet_pulse` |

Les variables définies dans le terminal sont **ignorées**. Par exemple, `POSTGRES_PORT=5433 bash database/scripts/01_check.sh` utilise quand même le port de `.env`. Pour changer une valeur, on modifie `.env`.

Le script s’arrête avant d’appeler `psql` dans deux cas :

| Cas | Message |
| --- | --- |
| `.env` n’existe pas | `ERROR: .env not found at the repository root.` puis `Copy .env.example to .env and set POSTGRES_PASSWORD.` |
| `POSTGRES_PASSWORD` est vide ou absent | `ERROR: POSTGRES_PASSWORD is empty in .env.` puis `Set it in .env at the repository root (see .env.example).` |

Le backend Spring Boot lit les mêmes noms de variables : un seul `.env` sert aux deux.

Chaque script tourne dans son propre processus `bash` : les valeurs lues dans `.env` ne restent pas dans le terminal après le script.

L’hôte, le port, l’utilisateur et la base sont passés à `psql` avec `-h`, `-p`, `-U` et `-d`.

Le mot de passe est un cas particulier : `psql` n’a pas d’option pour le recevoir et ne lit que la variable `PGPASSWORD`. `_common.sh` copie `POSTGRES_PASSWORD` dans `PGPASSWORD` avec `export`. La variable n’existe que pendant l’étape, qui tourne dans son propre processus `bash`. On ne définit jamais `PGPASSWORD` soi-même.

## Fonctionnement

Chaque étape contient la **liste écrite en dur** des fichiers SQL qu’elle exécute, dans l’ordre où ils sont écrits. Un fichier absent de la liste n’est jamais exécuté.

Chaque étape charge `_common.sh` avec `source "$(dirname "$0")/_common.sh"`. Ce fichier fournit la fonction `run_sql_files`, qui exécute la liste. Pour chaque fichier :

1. Elle affiche `-> <chemin>`.
2. `psql` exécute le fichier dans **sa propre transaction** (`--single-transaction`). Si une instruction échoue, tout le fichier est annulé.
3. `ON_ERROR_STOP=1` fait échouer `psql` à la première erreur, et le script s’arrête : les fichiers suivants ne sont pas exécutés.

Les enchaînements appellent les étapes une par une et s’arrêtent dès que l’une d’elles échoue.

L’ordre compte :

- `create` et `insert` traitent `01_countries` avant `02_indicators`, car `t_annual_indicators` référence `t_countries`.
- `drop` suit l’ordre **inverse** : on supprime d’abord la table qui référence les autres.

Les scripts `reset/ddl_truncate_tables.sql` ne sont appelés par aucun script. On les lance à la main si besoin.

## Ajouter un script SQL

### 1. Créer le fichier

Le fichier se place dans le dossier de sa feature, sous `database/sql/`, avec le prochain numéro libre :

```text
database/sql/features/<NN>_<feature>/<NN>_<ddl|dml>_<action>_<objet>.sql
```

Dans les listes des scripts, on écrit le chemin sans `database/sql/` : `features/<NN>_<feature>/...`.

Il ne contient ni `BEGIN` ni `COMMIT` : le script gère la transaction.

### 2. Choisir l’étape

| Le fichier SQL… | Étape |
| --- | --- |
| crée ou modifie une table (`CREATE`, `ALTER`) | `02_create.sh` |
| insère des données (`INSERT`) | `03_insert.sh` |
| supprime des tables (`DROP`) | `04_drop.sh` |

Les enchaînements (`build`, `build_with_data`, `rebuild`) n’ont pas de liste : il n’y a rien à modifier.

### 3. Choisir la position

Une table doit exister avant d’être référencée, et une ligne doit exister avant d’être référencée par une clé étrangère. Le fichier se place donc **après** les fichiers dont il dépend.

### 4. Ajouter la ligne

Exemple : ajout de `features/02_indicators/03_dml_insert_sources.sql` dans `03_insert.sh` :

```bash
scripts=(
    features/01_countries/02_dml_insert_regions.sql
    features/01_countries/03_dml_insert_subregions.sql
    features/01_countries/04_dml_insert_countries.sql
    features/02_indicators/02_dml_insert_annual_indicators.sql
    features/02_indicators/03_dml_insert_sources.sql
)
```

Un chemin par ligne, sans guillemets ni virgules.

### 5. Ajouter une nouvelle feature

Pour une nouvelle feature `features/03_<feature>/` :

1. Ajouter son `01_ddl_create_tables.sql` **à la fin** de la liste de `create`.
2. Ajouter ses scripts `dml` **à la fin** de la liste de `insert`.
3. Créer `reset/ddl_drop_tables.sql` et l’ajouter **au début** de la liste de `drop`.

### 6. Vérifier

```bash
bash database/scripts/rebuild.sh
```

Le script doit afficher le nouveau fichier et se terminer sans erreur.
