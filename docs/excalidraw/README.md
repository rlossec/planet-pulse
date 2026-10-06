# Excalidraw page drafts

First-draft UI mockups of application pages, kept here for early visualization and discussion before implementation.

Open any `.json` file in [Excalidraw](https://excalidraw.com/) (or the Excalidraw VS Code extension) to view and edit a draft.

## Naming conventions

### Folders

Group drafts by the main feature they belong to:

```
docs/excalidraw/
├── countries/
├── indicators/
└── monitoring-notes/
```

### Files

Use a CRUD-oriented prefix for page drafts, then a short description of the resource:

| Prefix   | Purpose                          | Example                        |
|----------|----------------------------------|--------------------------------|
| `list-`  | List / index view                | `list-countries-page.json`     |
| `detail-`| Single-item / read view          | `detail-country-page.json`     |
| `edit-`  | Create or update form            | `edit-country-page.json`       |
| `delete-`| Delete confirmation / flow       | `delete-country-page.json`     |

Pattern: `{action}-{resource}-page.json`

Early or incomplete drafts that do not yet map to a clear CRUD screen may use a simpler name (e.g. `monitoring-note.json`) until the page role is settled.
