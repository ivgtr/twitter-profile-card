import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
import { renderToString } from 'react-dom/server'

import type { FullUser } from 'twitter-d' // eslint-disable-line node/no-unpublished-import

import createElement from './createElement'

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

  const page = await browser.newPage()
  await page.setContent(
    `<html>
        <head>
          <style>
            body {
              width: "${width}";
              height: "${height}";
            }
          </style>
        </head>
        <body>${renderToString(element)}</body>
      </html>
    `
  )

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
