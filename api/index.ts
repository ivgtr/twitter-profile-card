import type { NowRequest, NowResponse } from '@vercel/node' // eslint-disable-line node/no-unpublished-import

import { createCard } from '../src/createCard'
import { getTwitterData } from '../src/getTwitterData'

type colors = 'default' | 'yellow' | 'pink' | 'purple' | 'orange' | 'green'

export default async (
  req: NowRequest & { query: { id: string; color?: colors } },
  res: NowResponse
) => {
  try {
    const result = await getTwitterData(req.query)
    const svgImage = await createCard(result, req.query.color || 'default')

    res.setHeader('Content-Type', 'image/svg+xml')
    res.setHeader('Cache-Control', `public, max-age=${60 * 60 * 2}`)
    res.send(svgImage)
  } catch (_err) {
    res.send('Sory... Could not resolve.')
  }
}
