let cnv;
// let container;

function setup() {
  cnv = createCanvas(100, 100);
  cnv.parent("canvas");

  const container = document.getElementById("canvas");
  const resObsv = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      resizeCanvas(width, height);
    }
  });
  resObsv.observe(container);
  // resizeCanvasToParent();

  // container = document.getElementById("canvas");
  // cnv = createCanvas(container.clientWidth, container.clientHeight);
  // cnv.parent("canvas");
}

// function windowResized() {
//   cnv.resize(container.clientWidth, container.clientHeight);
// }

function draw() {
  cnv.background(128);
}
