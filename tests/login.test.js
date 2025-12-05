const puppeteer = require('puppeteer')
const { login, BASE } = require('./utils')

jest.setTimeout(120000)

describe('Login flow (Puppeteer + Jest)', () => {
  let browser
  let page

  beforeAll(async () => {
    const headless = process.env.HEADLESS !== 'false'
    browser = await puppeteer.launch({ headless, args: ['--no-sandbox'] })
    page = await browser.newPage()
  })

  afterAll(async () => {
    if (page && !page.isClosed && typeof page.close === 'function') {
      try { await page.close() } catch (e) {}
    }
    if (browser) {
      try { await browser.close() } catch (e) {}
    }
  })

  test('should login successfully', async () => {
    await login(page)

    expect(page.url()).not.toMatch(/\/login/)

    await page.waitForSelector('img.avatar.circle', { timeout: 15000 })
  })
})


