function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const hex = "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
  const rgb = `rgb(${r}, ${g}, ${b})`
  const hsl = rgbToHSL(r, g, b)
  return { hex, rgb, hsl }
}

function rgbToHSL(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
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

  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)
  return `hsl(${h}, ${s}%, ${l}%)`
}

function generatePalette() {
  const palette = document.getElementById("palette")
  palette.innerHTML = ""

  for (let i = 0; i < 5; i++) {
    const color = getRandomColor()
    const colorDiv = document.createElement("div")
    colorDiv.className = "color"
    colorDiv.style.backgroundColor = color.hex

    const hexSpan = document.createElement("span")
    hexSpan.textContent = color.hex
    hexSpan.onclick = () => copyText(color.hex)

    const rgbSpan = document.createElement("span")
    rgbSpan.textContent = color.rgb
    rgbSpan.onclick = () => copyText(color.rgb)

    const hslSpan = document.createElement("span")
    hslSpan.textContent = color.hsl
    hslSpan.onclick = () => copyText(color.hsl)

    colorDiv.appendChild(hexSpan)
    colorDiv.appendChild(rgbSpan)
    colorDiv.appendChild(hslSpan)
    palette.appendChild(colorDiv)
  }
}

function copyText(text) {
  navigator.clipboard.writeText(text)
  alert(`Copied: ${text}`)
}

generatePalette()
