import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import { Options } from "./parser";

export const getScreenshot = async (html: string, options: Options) => {
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
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  const root = await page.$("#root");
  const screenshot = await root?.screenshot({ type: options.type });
  if (!screenshot) throw new Error();

  await browser.close();
  return screenshot;
};
