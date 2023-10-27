const gridSizeInput = document.querySelector("input.grid-size");
const sketchPad = document.querySelector("div.drawing-container");

const clearBtn = document.querySelector("button.clear-btn");
const rainbowBtn = document.querySelector("button.rainbow");
const darkerBtn = document.querySelector("button.darker");

let isRainbowMode = false;

function gridCalc() {
  while (sketchPad.firstChild) {
    sketchPad.removeChild(sketchPad.firstChild);
  }

  let gridSizeValue = gridSizeInput.value;

  if (gridSizeValue <= 100) {
    const gridColumnValue = `repeat(${gridSizeValue}, 1fr)`;
    const gridRowValue = `repeat(${gridSizeValue}, 1fr)`;

    sketchPad.style.gridTemplateColumns = gridColumnValue;
    sketchPad.style.gridTemplateRows = gridRowValue;

    for (let i = 0; i < gridSizeValue ** 2; i++) {
      const squares = document.createElement("div");
      squares.style.border = "1px solid grey";

      sketchPad.appendChild(squares);

      squares.addEventListener("mouseenter", () => {
        if (isRainbowMode) {
          squares.style.backgroundColor = getRandomColor();
        } else {
          squares.style.backgroundColor = "black";
        }
      });
    }
  } else {
    alert("100 by 100 is the limit!");
  }
}

function clearSketchPad() {
  const gridCells = sketchPad.querySelectorAll("div");
  gridCells.forEach((cell) => {
    cell.style.backgroundColor = "";
  });
}

gridSizeInput.value = "4";
gridCalc();

gridSizeInput.addEventListener("input", () => {
  gridCalc();
});

clearBtn.addEventListener("click", () => {
  clearSketchPad();
});

rainbowBtn.addEventListener("click", () => {
  isRainbowMode = true;
  gridCalc();
});

function getRandomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR},${randomG},${randomB})`;
}
