import type { FullUser } from 'twitter-d' // eslint-disable-line node/no-unpublished-import
import imageToBase64 from 'image-to-base64'

export async function createCard(tweetData: FullUser) {
  const height = 288
  const width = height * Math.sqrt(2)

  const image = await new Promise((resolve, _reject) => {
    imageToBase64(tweetData.profile_banner_url as string).then((result) => {
      resolve(result)
    })
  })

  return `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${width}"
    height="${height}"
    viewport="0 0 ${width} ${height}"
    fill="none"
  >
    <rect
      x="0" y="0" width="100%" height="100%"
      rx="5" ry="5"
      fill="#ccc" />
    <g transform="translate(24, 24)">
      <g transform="translate(0, 0)">
      <text x="0" y="35" style="font-family: Times New Roman;font-size: 44px;stroke: #00ff00;fill: #0000ff;">
        Hello, out there
      </text>
      </g>
    </g>
    <image href="data:image/png;base64,${image}" x="0" y="0" style="object-fit: cover;height: 100%;width: 100%;"/>
  </svg>
  `
}
