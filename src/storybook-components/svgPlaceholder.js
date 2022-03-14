// Placeholder image
const svgPlaceholder = (data) => {
  const svg = `<svg width="${data.width}" height="${data.height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${data.width} ${data.height}" preserveAspectRatio="none">
    <defs>
      <style type="text/css">
        #holder text {
          fill: ${data.fgColor || 'rgb(150, 150, 150)'};
          font-family: Arial, sans-serif;
          font-size: ${((data.height / 6) > 32 ? 32 : data.height / 6)}px;
          font-weight: 400;
        }
      </style>
    </defs>
    <g id="holder">
      <rect width="100%" height="100%" fill="${data.bgColor || 'rgb(204, 204, 204)'}"></rect>
      <g>
        <text text-anchor="middle" x="50%" y="50%" dy=".3em">${data.width} x ${data.height}</text>
      </g>
    </g>
  </svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export default svgPlaceholder
