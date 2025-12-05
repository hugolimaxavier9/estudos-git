const puppeteer = require('puppeteer')
const { login, getByXPath, BASE } = require('./utils')

jest.setTimeout(180000)

describe('Create repository (Puppeteer + Jest)', () => {
  test('creates a new repo using XPath selectors', async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage()

    await login(page)

    await page.goto(`${BASE}/new`, { waitUntil: 'networkidle2' })

    const repoName = `repo-jest-${Date.now()}`

    const xpaths = [
      '//*[@id="repository_name"]',
      '//*[@id="repository-name-input"]',
      "//input[@name='repository[name]']",
      "//input[@name='name']"
    ]

    let inputHandle = null
    for (const xp of xpaths) {
      try {
        inputHandle = await getByXPath(page, xp, 3000)
        if (inputHandle) break
      } catch (e) {
      }
    }

    if (!inputHandle) {
      await browser.close()
      throw new Error('Repository name input not found (XPath)')
    }

    await inputHandle.focus()
    await inputHandle.click({ clickCount: 3 })
    await inputHandle.type(repoName, { delay: 50 })

    const btnXp = "//button[contains(normalize-space(.), 'Create repository') or contains(normalize-space(.), 'Create repository…')]"
    const btn = await getByXPath(page, btnXp, 15000)
    if (!btn) {
      await browser.close()
      throw new Error('Create repository button not found (XPath)')
    }

    await Promise.all([
      btn.click(),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 })
    ])

    const url = page.url()
    expect(url).toMatch(new RegExp(`${repoName}`))

    await browser.close()
  })
})
