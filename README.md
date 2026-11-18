# dsh-locale-ru

Русский языковой пакет для веб-интерфейса DeepSeek Harness (DSH).

## Что делает

Регистрирует язык `ru` (подпись «Русский», запасной — `en`) и русские словари
для 53 пространств имён:

`agent-team`, `approval`, `chat`, `command`, `conversation`, `cordis`, `deliverables`, `directory-browser`, `documentHtml`, `documentMarkdown`, `feedback`, `goal`, `job`, `model`, `open-in-app`, `permission.access`, `plan`, `pluginManager`, `question`, `reference`, `schedule.catalog`, `schedule.manager`, `session-log-download`, `settings`, `settings.agentLoop`, `settings.agentPreset`, `settings.models`, `settings.opencodeFree`, `settings.pluginInventory`, `settings.plugins`, `settings.sessionLog`, `settings.shell`, `settings.subagent`, `settings.webSearch`, `shortcuts`, `shortcuts.layout`, `sidebar`, `sidebarBrowser`, `sidebarCodePreview`, `sidebarDocumentPreview`, `sidebarExcel`, `sidebarFiles`, `sidebarImage`, `sidebarOffice`, `sidebarPdf`, `sidebarRight`, `sidebarTerminal`, `skill`, `slash.menu`, `subagent`, `trajectory`, `workflowRun`, `workspace`.

Переведено 2403 строк (1975 уникальных). Ключи без перевода
показываются по-английски, поэтому пакет можно расширять постепенно, не ломая
интерфейс.

## Установка

```
node install.mjs
```

Установщик копирует пакет в `$DSH_HOME/profiles/web/node_modules/dsh-locale-ru`,
добавляет его в бандлы профиля и ставит `locale.preference: ru`. Исходные файлы
настроек он предварительно сохраняет рядом с расширением `.bak-<дата>`.

После установки перезапустите сервер (`dsh web`) и обновите страницу.
Язык также можно переключить вручную: Настройки → Общие → Язык.

## Удаление

```
node install.mjs --uninstall
```
