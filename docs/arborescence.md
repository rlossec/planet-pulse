# Arborescence — PlanetPulse

Vue du dépôt PlanetPulse : application web de suivi d’indicateurs environnementaux par pays (backend Java, frontend JavaScript, base PostgreSQL).

Les dossiers générés et les fichiers locaux ignorés par Git sont listés à la fin. Ils ne font pas partie de l’arbre source.

## Arbre source

```text
planet-pulse/
├── backend/                          # API REST Spring Boot
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   ├── .mvn/wrapper/
│   │   └── maven-wrapper.properties
│   └── src/
│       ├── main/
│       │   ├── java/co/simplon/planetpulse/
│       │   │   ├── PlanetPulseApplication.java
│       │   │   ├── controllers/      # Endpoints HTTP
│       │   │   ├── dtos/              # Objets d’entrée et de sortie
│       │   │   ├── entities/          # Entités JPA
│       │   │   ├── exceptions/        # Gestion globale des erreurs
│       │   │   ├── repositories/      # Accès aux données
│       │   │   └── services/          # Règles métier
│       │   └── resources/
│       │       ├── application.properties
│       │       └── banner.txt
│       └── test/java/co/simplon/planetpulse/
│           └── PlanetPulseApplicationTests.java
├── data/
│   └── raw/                          # Jeux sources locaux (hors Git)
│       ├── countries.json
│       └── indicator_Data.csv
├── database/                         # Scripts PostgreSQL
│   ├── README.md
│   ├── runners.md
│   ├── sql/                          # Fichiers SQL uniquement
│   │   ├── setup/
│   │   │   └── 00_create_database.sql
│   │   ├── features/
│   │   │   ├── 01_countries/
│   │   │   │   ├── 01_ddl_create_tables.sql
│   │   │   │   ├── 02_dml_insert_regions.sql
│   │   │   │   ├── 03_dml_insert_subregions.sql
│   │   │   │   ├── 04_dml_insert_countries.sql
│   │   │   │   └── reset/
│   │   │   │       ├── ddl_drop_tables.sql
│   │   │   │       └── ddl_truncate_tables.sql
│   │   │   └── 02_indicators/
│   │   │       ├── 01_ddl_create_tables.sql
│   │   │       ├── 02_dml_insert_annual_indicators.sql
│   │   │       └── reset/
│   │   │           ├── ddl_drop_tables.sql
│   │   │           └── ddl_truncate_tables.sql
│   │   └── checks/
│   │       └── dql_check_connection.sql
│   └── scripts/                      # Lanceurs Bash
│       ├── _common.md                # Explication de _common.sh
│       ├── _common.sh                # Connexion et exécution, partagées
│       ├── 00_init.sh
│       ├── 01_check.sh
│       ├── 02_create.sh
│       ├── 03_insert.sh
│       ├── 04_drop.sh
│       ├── build.sh                  # init, check, create
│       ├── build_with_data.sh        # build, insert
│       └── rebuild.sh                # drop, create, insert
├── docs/
│   ├── arborescence.md
│   ├── excalidraw/                   # Maquettes de pages
│   │   ├── README.md
│   │   ├── countries/
│   │   ├── indicators/
│   │   └── monitoring-notes/
│   ├── mcd/                          # Modèle conceptuel de données
│   │   ├── README.md
│   │   └── features/
│   │       ├── countries/
│   │       └── indicators/
│   ├── mld/                          # Modèle logique de données
│   │   ├── README.md
│   │   └── features/
│   │       └── countries/
│   └── wireframes/
│       ├── countries/import-data/
│       └── indicators/add-indicator/
├── frontend/                         # Application web
│   ├── assets/img/
│   ├── css/app.css
│   ├── i18n/en/
│   ├── import-data/index.html
│   ├── indicators/index.html
│   ├── js/
│   │   ├── base/                     # Composants de page communs
│   │   ├── components/
│   │   │   ├── indicator-form/
│   │   │   └── students/
│   │   ├── pages/
│   │   │   ├── import-data/
│   │   │   ├── indicator/
│   │   │   └── students/
│   │   └── utils/
│   └── vendor/bootstrap/
├── notebooks/
│   └── analyse_indicateurs.ipynb
├── .env.example
├── .gitattributes
├── .gitignore
└── README.md
```

## Rôle des dossiers

| Dossier | Rôle |
| ------- | ---- |
| `backend/` | API Spring Boot. Le code métier est sous `co.simplon.planetpulse`, découpé en contrôleurs, services, dépôts, entités et DTO. |
| `data/raw/` | Fichiers sources utilisés pour préparer les données (pays, indicateurs). Le dossier est ignoré par Git. |
| `database/` | Création, chargement et remise à zéro de PostgreSQL. Le SQL est dans `sql/`, avec un dossier numéroté par fonctionnalité sous `sql/features/`. Les lanceurs Bash (`.sh`) vivent dans `scripts/`. |
| `docs/excalidraw/` | Premières maquettes de pages, une par fonctionnalité. |
| `docs/mcd/` | Modèle conceptuel Merise, règles de gestion et dictionnaire de données. |
| `docs/mld/` | Modèle logique dérivé du MCD. |
| `docs/wireframes/` | Zoning des écrans (desktop, tablette, mobile). |
| `frontend/` | Pages HTML, composants JavaScript, styles et Bootstrap. Chaque écran a son dossier (`indicators/`, `import-data/`) et sa page sous `js/pages/`. |
| `notebooks/` | Analyse exploratoire des indicateurs. |

## Fichiers à la racine

| Fichier | Rôle |
| ------- | ---- |
| `README.md` | Présentation du projet, prérequis et lancement du backend. |
| `.env.example` | Variables de connexion PostgreSQL à recopier dans `.env`. |
| `.env` | Valeurs locales de connexion. Ignoré par Git. |
| `.gitignore` | Exclusions Git (`target/`, `.env`, `data/raw/`, `.idea`, `.vscode/`, `.postman`). |
| `.gitattributes` | Attributs Git du dépôt. |

## Hors de l’arbre source

Ces éléments existent sur le poste de travail. Ils ne sont pas versionnés, ou ce sont des sorties d’outils.

| Chemin | Origine |
| ------ | ------- |
| `backend/target/` | Classes et rapports produits par Maven. |
| `.postman/` | Collection locale Postman (`resources.yaml`). |
| `.vscode/` | Réglages de l’éditeur. |
