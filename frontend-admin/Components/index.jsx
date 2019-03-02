export const LoadingIndicator = () => {
  return (<span className="echo-loader">Loading…</span>)
}

export const popup = (url, title, width, height) => {
  const { top: {
    outerHeight, screenY, outerWidth, screenX,
  } } = window
  const y = outerHeight / 2 + screenY - (height / 2)
  const x = outerWidth / 2 + screenX - (width / 2)
  const w = window.open(url, title, `height=${height},width=${width},top=${y-50},left=${x}`)
  return w
}