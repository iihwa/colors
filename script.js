let lockedColors = [false, false, false, false, false];

function getRandomColor() {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + hex.padStart(6, "0");
}

function generatePalette() {
  const palette = document.getElementById("palette");
  palette.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const color = getRandomColor();
    const colorDiv = document.createElement("div");
    colorDiv.className = "color";

    // Keep locked colors
    if (!lockedColors[i]) {
      colorDiv.dataset.color = color;
    }

    const finalColor = colorDiv.dataset.color || color;
    colorDiv.style.backgroundColor = finalColor;
    colorDiv.textContent = finalColor;

    // Lock icon
    const lockIcon = document.createElement("div");
    lockIcon.className = "lock-icon";
    lockIcon.innerHTML = lockedColors[i] ? "🔒" : "🔓";

    lockIcon.onclick = (e) => {
      e.stopPropagation();
      lockedColors[i] = !lockedColors[i];
      generatePalette();
    };

    // Copy on click
    colorDiv.onclick = () => {
      navigator.clipboard.writeText(finalColor);
      alert(`Copied ${finalColor} to clipboard`);
    };

    colorDiv.appendChild(lockIcon);
    palette.appendChild(colorDiv);
  }
}

// Initial load
generatePalette();
