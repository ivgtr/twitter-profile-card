import { NowRequest, NowResponse } from '@vercel/node' // eslint-disable-line node/no-unpublished-import

import { createCard } from '../src/utils/createCard'
import { getTwitterData } from '../src/utils/getTwitterData'

export default async (req: NowRequest, res: NowResponse) => {
  const result = await getTwitterData(req.query as { id: string })

  res.setHeader('Content-Type', 'image/svg+xml')
  res.send(await createCard(result))
}
