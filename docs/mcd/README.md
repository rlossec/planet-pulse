# MCD — Planet Pulse

Documentation of the **MCD** (Merise).

## Features

| Feature                                        | Status      |
| ---------------------------------------------- | ----------- |
| [countries](features/countries/)               | In progress |
| [indicators](features/indicators/)             | In progress |
| [monitoring-notes](features/monitoring-notes/) | In progress |

### Fictional `COUNTRY` entity

Until the countries feature ships its detailed model, a **fictional** `COUNTRY` entity exposes the attributes other features need:

| Property       | Business meaning                               |
| -------------- | ---------------------------------------------- |
| `iso_code_2`   | ISO 3166-1 alpha-2 code (natural discriminant) |
| `country_name` | Common country name                            |
| `flag_url`     | Flag URL (SVG)                                 |
| `region`       | World region                                   |
| `subregion`    | World subregion                                |
| `area_km`      | Area in km²                                    |
| `population`   | Number of inhabitants                          |

This stub is for developers working on **other features**. Do not treat it as the definitive countries model.

## Organisation

Documentation is grouped **by feature**.

```text
docs/mcd/
├── README.md
└── features/
    └── <feature>/
        ├── README.md             ← scope + conceptual schema
        ├── data-dictionary.md    ← data dictionary
        ├── business-rules.md     ← business rules
        └── *-mcd.loo             ← Looping model
```

| Artefact            | Role                                          |
| ------------------- | --------------------------------------------- |
| **Data dictionary** | Property definitions                          |
| **Business rules**  | Business rules                                |
| **MCD Looping**     | Editable conceptual schema (`*-mcd.loo` file) |

## Conventions

### Vocabulary & abstraction level

- **Business** vocabulary only (no technical / economic jargon).
- No type, length, format, or storage constraint in the MCD.
- No technical identifier (auto-increment `id`, UUID…).
- No computed property, redundancy, or denormalisation (reserved for the LDM).

### Conceptual naming

| Element            | Convention                      | Example        |
| ------------------ | ------------------------------- | -------------- |
| Entity             | Singular, **UPPERCASE**, spaces | `COUNTRY`      |
| Property           | Lowercase, usually singular     | `country_name` |
| Identifier         | Bold + underlined in the schema | **iso_code_2** |
| Association (verb) | Infinitive, lowercase, unique   | `belong`       |

A repeated `name` field is forbidden → e.g. `country_name`.

### Logical / physical naming (reminder)

| Element | Convention                                | Example       |
| ------- | ----------------------------------------- | ------------- |
| Table   | `t_` prefix, **plural**, snake_case       | `t_countries` |
| Column  | snake_case, aligned with the logical name | `iso_code_2`  |

### Cardinalities & formalism

- Cardinalities on **every** leg: min `0|1`, max `1|n`.
- Association `(1,1)` ↔ `(1,1)`: merge the entities.
- Binary association `(0,1)` / `(1,1)`: no association property.
- Unique names for entities, identifiers, and verbs across the whole model.
