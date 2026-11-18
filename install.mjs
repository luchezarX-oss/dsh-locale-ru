// Installs (or removes) the dsh-locale-ru language pack in the active DSH web
// profile:  node install.mjs      |      node install.mjs --uninstall
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const uninstall = process.argv.includes('--uninstall')
const dshHome = process.env.DSH_HOME || path.join(process.env.USERPROFILE || process.env.HOME, '.dsh')
const positional = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const profileDir = path.resolve(positional[0] || path.join(dshHome, 'profiles', 'web'))
const NAME = 'dsh-locale-ru'
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const fail = (m) => { console.error('ОШИБКА: ' + m); process.exit(1) }

const manifestPath = path.join(profileDir, 'package.json')
const patchPath = path.join(profileDir, 'cordis.patch.yml')
const target = path.join(profileDir, 'node_modules', NAME)
if (!fs.existsSync(manifestPath)) fail('профиль не найден: ' + profileDir)

if (uninstall) {
  fs.rmSync(target, { recursive: true, force: true })
  console.log('Пакет удалён из ' + target)
  fs.copyFileSync(manifestPath, manifestPath + '.bak-' + stamp)
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const bundles = manifest.dsh?.profile?.bundles
  if (Array.isArray(bundles)) {
    manifest.dsh.profile.bundles = bundles.filter((b) => b !== NAME)
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8')
    console.log('Убран из dsh.profile.bundles')
  }
  console.log('Готово. Перезапустите сервер (dsh web).')
  process.exit(0)
}

if (!fs.existsSync(path.join(here, 'client.js'))) fail('рядом с install.mjs нет client.js')
fs.rmSync(target, { recursive: true, force: true })
fs.cpSync(here, target, {
  recursive: true,
  filter: (src) => !/[\\/](node_modules|\.git|install\.mjs)([\\/]|$)/.test(src) && !src.endsWith('.cmd'),
})
console.log('Скопировано в ' + target)

fs.copyFileSync(manifestPath, manifestPath + '.bak-' + stamp)
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const profile = (manifest.dsh ??= {}).profile ??= {}
const bundles = (profile.bundles ??= [])
if (!bundles.includes(NAME)) {
  bundles.push(NAME)
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8')
  console.log('Добавлено в dsh.profile.bundles')
} else {
  console.log('Уже присутствует в dsh.profile.bundles')
}

if (fs.existsSync(patchPath)) {
  const patch = fs.readFileSync(patchPath, 'utf8')
  const pattern = /^(\s+preference:[ \t]*)(\w+)[ \t]*$/gm
  const found = [...patch.matchAll(pattern)]
  if (found.length === 1 && found[0][2] !== 'ru') {
    fs.copyFileSync(patchPath, patchPath + '.bak-' + stamp)
    fs.writeFileSync(patchPath, patch.replace(pattern, (_, head) => head + 'ru'), 'utf8')
    console.log('locale.preference: ' + found[0][2] + ' -> ru')
  } else {
    console.log(found.length === 1 ? 'locale.preference уже ru' : 'ВНИМАНИЕ: строк preference найдено ' + found.length + ' — смените язык в Настройках')
  }
}
console.log('')
console.log('Готово. Перезапустите сервер (dsh web) и обновите страницу.')