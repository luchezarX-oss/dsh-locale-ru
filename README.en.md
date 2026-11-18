# Russian language pack for DeepSeek Harness

DSH ships English and Chinese only. This plugin adds Russian: **53 dictionaries,
2403 keys, 1975 unique strings**, covering the whole web GUI — chat, settings,
trajectory, plugin manager, schedule, workspaces, previews.

[Русская версия](README.md)

## How it works

DSH exposes an official extension point for languages. A client plugin calls
`ctx.locale.addLanguage({ id: 'ru', label: 'Русский', fallback: 'en' })` and then
registers dictionaries with `ctx.locale.register(namespace, 'ru', {...})`.
Untranslated keys fall back to English, so partial coverage never breaks the UI.

There is no build step: `client.js` is plain JavaScript in DSH's
`window.__ModuleLoader__` format with the translations embedded as data.

| File | Role |
|---|---|
| `client.js` | Browser half: language registration and all dictionaries |
| `lib/index.js` | Host half: an empty row so the Loader can enable the plugin |
| `package.json` | Manifest with the `dsh.bundle` and `dsh.client` declarations |
| `cordis.patch.yml` | Inserts the plugin into the profile load list |
| `install.mjs` | Installs or removes the pack in the active DSH profile |

## Install

```
node install.mjs
```

The script copies the package into `$DSH_HOME/profiles/web/node_modules/dsh-locale-ru`,
adds it to `dsh.profile.bundles`, and sets `locale.preference: ru`. Edited files are
backed up as `*.bak-<timestamp>`.

Then restart the server (`dsh web`) and reload the page. The language can also be
switched manually: **Settings → General → Language**. Remove with
`node install.mjs --uninstall`.

## Notes

- Untranslated keys fall back to English, so the pack degrades gracefully.
- Chinese text inside the EasyEDA plugin comes from that package itself; a
  language pack cannot reach it.
- Russian is wordier than English: a few buttons may look tighter than usual.

## License

MIT.