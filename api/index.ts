import { NowRequest, NowResponse } from '@vercel/node' // eslint-disable-line node/no-unpublished-import
import { createCard } from '../src/utils/createCard'

export default (_req: NowRequest, res: NowResponse) => {
  res.setHeader('Content-Type', 'image/svg+xml')

  res.send(createCard())
}
