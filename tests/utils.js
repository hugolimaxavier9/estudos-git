const dotenv = require('dotenv')
dotenv.config()

const USER_EMAIL = process.env.USER_EMAIL
const USER_PASSWORD = process.env.USER_PASSWORD
const BASE = process.env.BASE_URL || 'https://github.com'

async function login(page) {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle2' })
  await page.waitForSelector('#login_field', { timeout: 15000 })
  await page.type('#login_field', USER_EMAIL)
  await page.type('#password', USER_PASSWORD)
  await Promise.all([
    page.click('input[name="commit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ])
}

async function getByXPath(page, xpath, timeout = 15000) {
  await page.waitForXPath(xpath, { timeout })
  const els = await page.$x(xpath)
  return els[0]
}

module.exports = { login, getByXPath, BASE }
