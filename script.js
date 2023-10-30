const gridSizeInput = document.querySelector("input.grid-size");
const sketchPad = document.querySelector("div.drawing-container");

const clearBtn = document.querySelector("button.clear-btn");

const blackBtn = document.querySelector("button.black");
const rainbowBtn = document.querySelector("button.rainbow");
const darkerBtn = document.querySelector("button.darker");

let isBlackMode = true;
let isRainbowMode = false;
let isDarkerMode = false;

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
        } else if (isBlackMode) {
          squares.style.backgroundColor = "black";
        } else if (isDarkerMode) {
          squares.style.backgroundColor = getDarkerColor();
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

  finalRgbOpacity = 0.1;
}

gridSizeInput.value = "4";
gridCalc();

gridSizeInput.addEventListener("input", () => {
  gridCalc();
});

clearBtn.addEventListener("click", () => {
  clearSketchPad();
});

blackBtn.addEventListener("click", () => {
  if (!isBlackMode) {
    //false
    isBlackMode = true;
    isRainbowMode = false;
    isDarkerMode = false;
    gridCalc();
  }
});

rainbowBtn.addEventListener("click", () => {
  isRainbowMode = true;
  isBlackMode = false;
  isDarkerMode = false;
  gridCalc();
});

darkerBtn.addEventListener("click", () => {
  clearSketchPad();
  isDarkerMode = true;
  isRainbowMode = false;
  isBlackMode = false;
  gridCalc();
});

function getRandomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR},${randomG},${randomB})`;
}

//this function doesn't darken each interaction with the squares but returns a single value which is 0.9
/*function darkerMode() {
  const colorR = 255;
  const colorG = 0;
  const colorB = 0;

  let finalRgbOpacity = 0;
  for (let i = 1; i <= 9; i++) {
    finalRgbOpacity = i * 0.1;
  }

  return `rgb(${colorR}, ${colorG}, ${colorB}, ${finalRgbOpacity})`;
}*/

let finalRgbOpacity = 0;

const getDarkerColor = darkerMode();

function darkerMode() {
  const colorR = 255;
  const colorG = 0;
  const colorB = 0;

  const step = 0.1;

  //returns a function that adds a value from 0.1 to 0.9 everytime the mouse hovers over a single square
  return function () {
    finalRgbOpacity += step;
    if (finalRgbOpacity > 0.9) {
      finalRgbOpacity = 0.1;
    }

    return `rgb(${colorR}, ${colorG}, ${colorB}, ${finalRgbOpacity})`;
  };
}
