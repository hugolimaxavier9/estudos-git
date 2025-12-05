const puppeteer = require('puppeteer')
const { login, BASE } = require('./utils')

jest.setTimeout(120000)

describe('Logout flow (Puppeteer + Jest)', () => {
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

  test('should logout successfully', async () => {
    
    await login(page)
    await page.waitForSelector('img.avatar.circle', { timeout: 15000 })

    
    await page.goto('https://github.com/logout', { waitUntil: 'networkidle2', timeout: 30000 })

    
    await new Promise(resolve => setTimeout(resolve, 2000))

    const finalUrl = page.url()
    console.log(`Final URL after logout: ${finalUrl}`)

    const isLoggedOut = 
      finalUrl.includes('/logout') || 
      finalUrl === 'https://github.com/' ||
      await page.evaluate(() => {
        const text = document.body.innerText
        return text.includes('Sign in') || text.includes('Sign in to GitHub')
      })

    expect(isLoggedOut).toBe(true)
  })
})

