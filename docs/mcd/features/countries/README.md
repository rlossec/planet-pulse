# Feature — Countries

## Data scope

Only records where **all** of the following fields are non-empty are kept:

| JSON source field | Conceptual attribute |
| ----------------- | -------------------- |
| `names.common`    | Country name         |
| `codes.alpha_2`   | ISO alpha-2 code     |
| `flag.url_svg`    | Flag URL             |
| `region`          | Region name          |
| `subregion`       | Subregion name       |
| `area.kilometers` | Area (km²)           |
| `population`      | Population           |

## Files

| File                                     | Content         |
| ---------------------------------------- | --------------- |
| [data-dictionary.md](data-dictionary.md) | Data dictionary |
| [business-rules.md](business-rules.md)   | Business rules  |
| [countries-mcd.loo](countries-mcd.loo)   | MCD Looping     |

## Entities

### REGION

| Attribute | Description       | Notes                                        |
| --------- | ----------------- | -------------------------------------------- |
| name      | World region name | e.g. Africa, Americas, Asia, Europe, Oceania |

### SUBREGION

| Attribute | Description    | Notes                                                                    |
| --------- | -------------- | ------------------------------------------------------------------------ |
| name      | Subregion name | Unique **within** a region; the same name may exist in different regions |

A subregion is linked to exactly one region (`1,1`). Its natural uniqueness is the pair `(name, region)`, not the name alone.

### COUNTRY

| Attribute           | Description                          | Notes                |
| ------------------- | ------------------------------------ | -------------------- |
| name                | Common country name (`names.common`) | Unique               |
| **iso_code_alpha2** | ISO 3166-1 alpha-2 code              | Unique, 2 characters |
| flag_url            | SVG flag URL                         | Unique               |
| area_km2            | Area in square kilometres            | > 0                  |
| population          | Number of inhabitants                | ≥ 0                  |

## Relations

### CONTAIN

A region contains subregions.

| Entity    | Cardinality | Meaning                                   |
| --------- | ----------- | ----------------------------------------- |
| REGION    | **1,N**     | A region contains at least one subregion  |
| SUBREGION | **1,1**     | A subregion belongs to exactly one region |

### LOCATE

A country is located in a subregion.

| Entity    | Cardinality | Meaning                                    |
| --------- | ----------- | ------------------------------------------ |
| SUBREGION | **1,N**     | A subregion groups one or more countries   |
| COUNTRY   | **1,1**     | A country belongs to exactly one subregion |

A country’s region is deduced from its subregion; there is no direct COUNTRY — REGION association.
