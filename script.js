const gridSizeInput = document.querySelector("input.grid-size");
const sketchPad = document.querySelector("div.drawing-container");

const clearBtn = document.querySelector("button.clear-btn");

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
        squares.style.backgroundColor = "black";
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
