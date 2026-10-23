# MLD — Planet Pulse

Documentation of the **MLD** (Merise logical data model) derived from the [MCD](../mcd/README.md).

## Features

| Feature                          | Status      |
| -------------------------------- | ----------- |
| [countries](features/countries/) | In progress |

## Organisation

```text
docs/mld/
├── README.md
└── features/
    └── <feature>/
        └── README.md    ← MLD brut, adaptation choices, adapted schema
```

The executable scripts live under `database/sql/features/<NN>_<feature>/`.
