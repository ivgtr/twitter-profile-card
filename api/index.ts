import { NowRequest, NowResponse } from '@vercel/node' // eslint-disable-line node/no-unpublished-import

import { createCard } from '../src/utils/createCard'
import { getTwitterData } from '../src/utils/getTwitterData'

type colors = 'default' | 'yellow' | 'pink' | 'purple' | 'orange' | 'green'

export default async (
  req: NowRequest & { query: { id: string; color?: colors } },
  res: NowResponse
) => {
  try {
    const result = await getTwitterData(req.query)
    const svgImage = await createCard(result, req.query.color || 'default')

    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(svgImage)
  } catch (_err) {
    res.send('Sory... Could not resolve.')
  }
}
