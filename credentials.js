let currentFace = 0;
const cube = document.getElementById("cube");
const totalFaces = 6;

function rotateCube(index) {
  const angle = index * -60;
  cube.style.transform = `rotateY(${angle}deg)`;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    currentFace = (currentFace + 1) % totalFaces;
    rotateCube(currentFace);
  } else if (e.key === "ArrowLeft") {
    currentFace = (currentFace - 1 + totalFaces) % totalFaces;
    rotateCube(currentFace);
  }
});
