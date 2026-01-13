// let regExp = /[^A-Za-z]/;
let match;
let baseKey;
let numCharacters = 8;

class RandomWrd {
  constructor(tempVal, count) {
    baseKey = String.fromCharCode(tempVal).toLowerCase();

    this.word = "test";
    this.count = count;
  }

  exquisiteCorpse() {
    //  const ignoredKeyCodes = new Set([
    //    TAB,
    //    SHIFT,
    //    ALT,
    //    CONTROL,
    //    91,
    //    93,
    //    27,
    //    13,
    //    46,
    //    33,
    //    34,
    //    35,
    //    36,
    //    37,
    //    38,
    //    39,
    //    40,
    //  ]);
    //  if (ignoredKeyCodes.has(keyCode) || regExp.test(baseKey)) {
    //    this.word = "Well, that was not a letter...";
    //    // this.count = this.count - 1;
    //    return;
    //  } else {}
    //  if (keyCode !== BACKSPACE) {

    //  }
    this.val = baseKey;
    match = new RegExp(String.raw`^${this.val}`);

    if (this.count === 5) {
      let fifth = RiTa.randomWord(match, {
        maxLength: numCharacters,
        pos: "nn",
      });
      this.word = fifth + "." + "\n";
    } else if (this.count === 4) {
      let fourth = RiTa.randomWord(match, {
        maxLength: numCharacters,
        pos: "jj",
      });
      this.word = RiTa.articlize(fourth);
    } else if (this.count === 3) {
      this.word = RiTa.randomWord(match, {
        maxLength: numCharacters,
        pos: "vb",
      });
    } else if (this.count === 2) {
      this.word = RiTa.randomWord(match, {
        maxLength: numCharacters,
        pos: "nn",
      });
    } else if (this.count === 1) {
      let first = RiTa.randomWord(match, {
        maxLength: numCharacters,
        pos: "jj",
      });
      let article = RiTa.articlize(first);
      this.word = RiTa.capitalize(article);
    } else {
      this.word = "fluffy";
    }
  }
}
