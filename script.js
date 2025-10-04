function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const hex = "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
  const rgb = `rgb(${r}, ${g}, ${b})`
  const hsl = rgbToHSL(r, g, b)
  const brightness = getLuminance(r, g, b) < 0.5 ? 'Dark' : 'Light'
  return { hex, rgb, hsl, brightness }
}

function rgbToHSL(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

function getLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

function copyText(text) {
  navigator.clipboard.writeText(text)
  alert(`Copied: ${text}`)
}

function generatePalette() {
  const palette = document.getElementById("palette")
  palette.innerHTML = ""

  for (let i = 0; i < 5; i++) {
    const color = getRandomColor()

    const card = document.createElement("div")
    card.className = "color-card"

    const swatch = document.createElement("div")
    swatch.className = "color-swatch"
    swatch.style.backgroundColor = color.hex

    const info = document.createElement("div")
    info.className = "color-info"

    const hex = document.createElement("span")
    hex.textContent = color.hex
    hex.onclick = () => copyText(color.hex)

    const rgb = document.createElement("span")
    rgb.textContent = color.rgb
    rgb.onclick = () => copyText(color.rgb)

    const hsl = document.createElement("span")
    hsl.textContent = color.hsl
    hsl.onclick = () => copyText(color.hsl)

    const brightness = document.createElement("span")
    brightness.textContent = `Brightness: ${color.brightness}`
    brightness.onclick = () => copyText(color.brightness)

    info.appendChild(hex)
    info.appendChild(rgb)
    info.appendChild(hsl)
    info.appendChild(brightness)

    card.appendChild(swatch)
    card.appendChild(info)

    palette.appendChild(card)
  }
}

generatePalette()
