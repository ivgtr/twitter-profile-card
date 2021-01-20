import type { FullUser } from 'twitter-d' // eslint-disable-line node/no-unpublished-import
import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
import handlebars from 'handlebars'

const getLocation = (location?: string | null) => {
  return location ? `<p style="font-size: 1.3rem;margin: 0;">location: ${location}</p>` : undefined
}

const createElement = (tweetData: FullUser, selectColor: colors) => {
  const icon = tweetData.profile_image_url_https
  const banner = tweetData.profile_banner_url
  const color: { [key: string]: string } = {
    default: '#fff',
    yellow: '#ffad1f',
    pink: '#e0245e',
    purple: '#794bc4',
    orange: '#f45d22',
    green: '#17bf63'
  }
  const element = `
    <div style="position: relative;height: 100%;width: 100%;border-radius: 10px;background-color: #fff;overflow: hidden;">
      <div style="position: absolute;height: 33%;width: 100%;overflow: hidden;">
        <img src="${banner}" height="100px" width="300px" style="height: 100%;width: 100%;object-fit: cover;" />
      </div>
      <div style="position: absolute;left: 25px;top: calc(33% - 65px);height: 130px;width: 130px;border-radius: 50%;background-color: ${
        color[selectColor] || '#fff'
      };"></div>
      <div style="position: absolute;left: 30px;top: calc(33% - 60px);height: 120px;width: 120px;border-radius: 50%;overflow: hidden;">
        <img src="${icon}" height="120px" width="120px" style="height: 100%;width: 100%;object-fit: cover;" />
      </div>
      <div style="position: absolute;left: 30px;top: 42%;width:calc(100% - 60px);">
        <h1 style="color: #111;font-size: 2.1rem;">${tweetData.name}</h1>
        <h2 style="margin-top: -1rem;font-size: 1.3rem;color: #555;">@${tweetData.screen_name}</h2>
        <p style="margin-top: -0.5rem;font-size: 1.3rem;">${tweetData.description}</p>
      </div>
      <div style="position: absolute;left: 30px;bottom:10px;>
        ${getLocation(tweetData.location)}
        <p style="font-size: 1.3rem;margin: 0;">follows: ${tweetData.friends_count} / followers: ${
    tweetData.followers_count
  }</p>
      </div>

    </div>
  `
  return element
}

export async function createCard(tweetData: FullUser, color: colors) {
  const height = 288
  const width = height * Math.sqrt(2)

  await chrome.font(
    'https://rawcdn.githack.com/googlefonts/noto-cjk/be6c059ac1587e556e2412b27f5155c8eb3ddbe6/NotoSansCJKjp-Regular.otf'
  )
  await chrome.font(
    'https://rawcdn.githack.com/googlefonts/noto-fonts/ea9154f9a0947972baa772bc6744f1ec50007575/hinted/NotoSans/NotoSans-Regular.ttf'
  )

  const browser = await puppeteer.launch(
    process.env.AWS_REGION
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless
        }
      : {
          args: [],
          executablePath:
            process.platform === 'win32'
              ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
              : process.platform === 'linux'
              ? '/usr/bin/google-chrome'
              : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        }
  )

  const element = createElement(tweetData, color)

  const html = handlebars.compile(`<html>
        <head>
          <style>
            body {
              width: "${width}";
              height: "${height}";
            }
          </style>
        </head>
        <body>${element}</body>
      </html>
      `)(null)

  const page = await browser.newPage()
  await page.setContent(html)

  const image = await page.$('body')

  const buffer = await image?.screenshot({ encoding: 'base64' })

  await browser.close()

  return `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${width}"
    height="${height}"
    viewport="0 0 ${width} ${height}"
    fill="none"
  >
    <image href="data:image/jpeg;base64,${buffer}" x="0" y="0" width="100%" height="100%"/>
  </svg>
  `
}
