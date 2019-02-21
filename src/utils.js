export function humanReadableSize(bytes) {
  bytes = Number(bytes)
  if (bytes === 0 || isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
    return '0b'
  }
  const units = ['b', 'kb', 'mb']
  let exponent = Math.min(Math.floor(Math.log10(bytes) / 3), units.length - 1)
  let number = Number((bytes / Math.pow(1000, exponent)).toPrecision(3))
  return `${number}${units[exponent]}`
}
