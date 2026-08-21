import fs from 'node:fs'

fs.mkdirSync('public', { recursive: true })
if (!fs.existsSync('package-lock.json')) throw new Error('package-lock.json was not created by npm install')
fs.copyFileSync('package-lock.json', 'public/package-lock.json')
