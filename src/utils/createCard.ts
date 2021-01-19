export function createCard() {
  const height = 288
  const width = height * Math.sqrt(2)

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
      fill="#000" />
    <g transform="translate(24, 24)">
      <g transform="translate(0, 0)">
      </g>
    </g>
  </svg>
  `
}
