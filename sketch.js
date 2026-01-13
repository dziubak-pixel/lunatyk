let cnv, poem, playPause, editLastWord, restartBtn, addTitle, saveBtn;

let frmRate = 25;

let videos = [];
const maxPlays = 3;
const videoFiles = [];
let isPaused = false;

let regExp = /[^A-Za-z]/;
let newWord;
let keyCount = 0;
let poemText = [];

let userInput = "";
let myWord;
let wordObjects = [];
let target;
let font;

let volumeControl, seedControl;

let x = 0;
let y = 0;

//function preload() {
  //font = loadFont("/assets/Lora-Regular.ttf");
//}

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

  frameRate(frmRate);

  for (let i = 1; i < 11; i++) {
    let fileName = "vid/sound-" + i + ".mp4";
    videoFiles.push(fileName);
  }

  poem = select("#poem");

  playPause = select("#playPause");
  playPause.mousePressed(togglePlayPause);

  editLastWord = select("#editLastWord");

  restartBtn = select("#restartBtn");
  restartBtn.mousePressed(restartComposition);

  addTitle = select("#addTitle");
  addTitle.mousePressed(addPoemTitle);

  saveBtn = select("#saveBtn");
  saveBtn.mousePressed(saveComposition);

  volumeControl = createSlider(0, 1, 0, 0);
  volumeControl.parent("#volume");

  // seedControl = createSlider(0, 100, 0, 0);
  // seedControl.parent("#seedControl");
}

function addPoemTitle() {}

function saveComposition() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    // Invert R, G, B channels (leave alpha as is)
    pixels[i] = 255 - pixels[i]; // R
    pixels[i + 1] = 255 - pixels[i + 1]; // G
    pixels[i + 2] = 255 - pixels[i + 2]; // B
  }
  updatePixels();
  save("canvas_inverted.png");
}

function restartComposition() {
  videos.forEach((vid) => {
    vid.remove();
  });
  videos.length = 0;
  isPaused = false;
  clear();
  // background(0);
  console.log(videos);

  poem.html("");
  keyCount = 0;
  poemText.length = 0;

  wordObjects.length = 0;
  userInput = "";
}

function togglePlayPause() {
  let anyPlaying = videos.some((vid) => !vid.elt.paused);
  if (anyPlaying) {
    videos.forEach((vid) => vid.pause());
    isPaused = true;
  } else {
    videos.forEach((vid) => vid.play());
    isPaused = false;
  }
}

function createNewVideo() {
  // Randomly select a video file from the list
  let randomIndex = floor(random(videoFiles.length));
  let vid = createVideo(videoFiles[randomIndex]);

  vid.hide();
  vid.volume(0);

  // Track play count for this video
  vid.playCount = 1;
  vid.shouldRemove = false;
  vid.onended(() => {
    if (vid.playCount < maxPlays) {
      vid.stop();
      vid.play();
      vid.playCount++;
    } else {
      vid.shouldRemove = true;
      // Remove video from array after it ends
      videos = videos.filter((v) => v !== vid);
      vid.remove(); // Clean up the video element
    }
  });

  vid.play();
  videos.push(vid);
}

function keyPressed() {
  // x = random(width / 2);
  // y = random(height / 2);

  const ignoredKeyCodes = new Set([
    TAB,
    SHIFT,
    ALT,
    CONTROL,
    91,
    93,
    27,
    13,
    46,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
  ]);

  if (ignoredKeyCodes.has(keyCode)) {
    //|| regExp.test(key)
    return;
  } else if (keyCode === 32) {
    myWord = new NewWord(userInput, width / 2, height / 2);
    wordObjects.push(myWord);
    userInput = "";
  } else if (keyCode === BACKSPACE) {
    userInput = userInput.slice(0, -1);
    if (poemText.length === 0) {
      return;
    } else {
      if (keyCount === 0) {
        keyCount = 4;
      } else {
        keyCount = max(0, keyCount - 1);
      }
      let remove = poemText.splice(-1, 1);
      console.log(remove);
    }
  } else {
    userInput += key;
    keyCount++;
    newWord = new RandomWrd(keyCode, keyCount);
    newWord.exquisiteCorpse();
    poemText.push(newWord.word);
    // console.log(poemText);
    if (keyCount >= 5) {
      keyCount = 0;
    }
  }

  // console.log("current count", keyCount);
  let combined = join(poemText, " ");
  poem.html(combined);

  if (!isPaused) {
    createNewVideo(); // Create and play a new video instance
  }
}

function draw() {
  cnv.clear();
  cnv.blendMode(EXCLUSION);

  // randomSeed(seedControl.value());

  for (let vid of videos) {
    vid.volume(volumeControl.value());
    image(vid, x, y, 1920, 1080);
  }

  target = createVector(mouseX, mouseY);
  stroke(255);
  fill(255, 25);
  ellipse(target.x, target.y, 32);

  noStroke();
  fill(255);
  //textFont(font);
  textAlign(CENTER);
  textSize(16);
  text(userInput, width / 2, height / 2);

  for (i = wordObjects.length - 1; i >= 0; i--) {
    let wordObject = wordObjects[i];
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
      wordObject.wander();
    } else {
      let steering = wordObject.arrive(target);
      wordObject.applyForce(steering);
    }

    wordObject.update();
    wordObject.checkEdges();
    wordObject.show();
    // if (wordObject.isDead()) {
    //   wordObjects.splice(i, 1);
    // }
  }
}
