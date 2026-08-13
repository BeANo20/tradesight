# TradeSight

TradeSight is a local-first Electron desktop helper for Murder Mystery 2 trades. It analyzes pixels only from the desktop window the user explicitly selects. It does not inject into Roblox, automate gameplay, read Roblox memory, accounts, cookies, tokens, files, or login data.

## Run it

```bash
npm install
npm run dev
```

Build a distributable app with `npm run package`. Before release, pin dependency versions, run `npm test`, `npm run build`, and `npm run audit`, then code-sign the platform installer.

## Value data

Open **Import Values** in the app and choose an XLSX or CSV value list. The importer accepts only XLSX/CSV under 10 MB, validates an Item/Name column, ignores formulas and HTML, and renders only sanitized React text.

If a source contains only one value column, TradeSight maps it to both trading value and visual value until a source with separate columns is supplied.

## Capture and recognition

The scanner lists local desktop-capture sources and presents refreshing thumbnails. It never begins capture until the user clicks a source. It tries to identify Roblox windows from their title; Electron/Windows does not reliably expose every source process name, so the interface labels this as a title match rather than pretending it is verified.

The capture preview is ready for an eight-slot region crop. The included recognition adapter is deliberately conservative: it requires local MM2 icon templates and multi-frame confirmation before producing a detection. Put normalized icon assets in `resources/reference-icons/` and connect them through `src/lib/recognition.ts`. Until then, use manual search/correction instead of a guessed match.

## Security architecture

- `contextIsolation: true`, `nodeIntegration: false`, sandboxed renderer, no remote module.
- The preload bridge exposes only `listSources` and allowlisted HTTPS link opening.
- Main-process IPC validates payloads with Zod and only supports named channels.
- Navigation, popups, webviews, unexpected permissions, raw filesystem access, shell execution, remote code, and arbitrary URL opening are blocked.
- A strict CSP permits local content, local data/blob images, and no network connections.
- Data remains local by default. Raw screen recordings are not saved.

Values and verdicts are advisory only. Demand and market values can change, and no score guarantees profit.

## Tests

`npm test` covers the trade scoring model, spreadsheet normalization and alias search, strict IPC validation, and the manual calculation flow. The scanner’s source-selection flow is deliberately separated from detection so it can be exercised on a real desktop without reading any Roblox data other than opted-in window pixels.
