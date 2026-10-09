# Business rules — Countries

Rules for the decomposed countries MCD.

## Structural rules


| #   | Rule                                                                                       |
| --- | ------------------------------------------------------------------------------------------ |
| 01  | A country belongs to exactly one subregion.                                                |
| 02  | A subregion belongs to exactly one region.                                                 |
| 03  | A region contains at least one subregion.                                                  |
| 04  | A subregion groups at least one country.                                                   |
| 05  | A country’s region is that of its subregion; a country is not linked directly to a region. |


## Country rules


| #   | Rule                                                                                       |
| --- | ------------------------------------------------------------------------------------------ |
| 06  | Every country must have a name, an ISO alpha-2 code, a flag URL, an area and a population. |
| 07  | A country name is unique.                                                                  |
| 08  | A country ISO alpha-2 code is unique and made of exactly 2 alphabetic characters.          |
| 09  | A country flag URL is unique and non-empty.                                                |
| 10  | A country area is expressed in km² and is strictly greater than 0.                         |
| 11  | A country population is an integer greater than or equal to 0.                             |


## Region and subregion rules


| #   | Rule                                                                                                           |
| --- | -------------------------------------------------------------------------------------------------------------- |
| 12  | A region name is mandatory and unique.                                                                         |
| 13  | A subregion name is mandatory.                                                                                 |
| 14  | Within a given region, a subregion name is unique. The same subregion name **may** exist in different regions. |


## Integrity / lifecycle rules


| #   | Rule                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------- |
| 15  | A country can only be created if it is linked to an existing subregion.                                       |
| 16  | A subregion can only be created if it is linked to an existing region.                                        |
| 17  | A subregion cannot be deleted while it still contains at least one country.                                   |
| 18  | A region cannot be deleted while it still contains at least one subregion.                                    |
| 19  | A source record missing name, ISO code, flag, region, subregion, area or population is not kept in the model. |


