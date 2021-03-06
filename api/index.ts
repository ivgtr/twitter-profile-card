import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHtml } from "./_lib/createElement/createHtml";
import { createPlofile } from "./_lib/createElement/createPlofile";
import { requestTwitter } from "./_lib/getTwitterData";
import { Options, parseRequest } from "./_lib/parser";
import { getScreenshot } from "./_lib/puppeteer";

export default async (
  request: VercelRequest & { query: Options },
  response: VercelResponse
): Promise<void> => {
  if (!request.query?.id) {
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    return response.end(createHtml());
  }
  try {
    const options = parseRequest(request.query);
    const personalData = await requestTwitter(options.id);

    const html = await createPlofile(personalData, options);
    const screenshot = await getScreenshot(html, options);
    if (!screenshot) throw new Error("Not Get Screenshot");

    response.writeHead(200, {
      "Content-Type": `image/${options.type}`,
      "Content-Length": screenshot.length,
      "Cache-Control": "max-age=86400",
    });
    response.end(screenshot);
    return;
  } catch {
    response.writeHead(404);
    response.end();
    return;
  }
};
