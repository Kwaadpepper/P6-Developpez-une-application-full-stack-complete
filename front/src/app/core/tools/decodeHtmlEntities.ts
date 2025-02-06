export function decodeHTmlEntities(value: string): string {
  const element = document.createElement('div')

  if (value && typeof value === 'string') {
    // strip script/html tags
    value = value.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
    value = value.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
    element.innerHTML = value
    value = element.textContent ?? ''
    element.textContent = ''
  }

  return value
}
