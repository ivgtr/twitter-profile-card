import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import { Options } from "./parser";

export const getScreenshot = async (html: string, options: Options) => {
  const height = 288;
  const width = height * Math.sqrt(2);

  await chrome.font(
    "https://rawcdn.githack.com/googlefonts/noto-cjk/be6c059ac1587e556e2412b27f5155c8eb3ddbe6/NotoSansCJKjp-Regular.otf"
  );
  await chrome.font(
    "https://rawcdn.githack.com/googlefonts/noto-fonts/ea9154f9a0947972baa772bc6744f1ec50007575/hinted/NotoSans/NotoSans-Regular.ttf"
  );

  const browser = await puppeteer.launch(
    process.env.AWS_REGION
      ? {
          args: chrome.args,
          defaultViewport: chrome.defaultViewport,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
      : {
          args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
          executablePath:
            process.platform === "win32"
              ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
              : process.platform === "linux"
              ? "/usr/bin/google-chrome"
              : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          headless: true,
        }
  );

  const page = await browser.newPage();
  await page.setViewport({ width: Math.floor(width), height });
  await page.setContent(html, { waitUntil: "networkidle0" });
  const body = await page.$("body");
  const screenshot = await body?.screenshot({ type: options.type });
  if (!screenshot) throw new Error();

  await browser.close();
  return screenshot;
};
