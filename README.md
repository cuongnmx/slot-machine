slot-machine
---

[![build status](https://travis-ci.org/sarbbottam/slot-machine.svg?branch=master)](https://travis-ci.org/sarbbottam/slot-machine/)
[![coverage Status](https://coveralls.io/repos/sarbbottam/slot-machine/badge.svg?branch=master)](https://coveralls.io/github/sarbbottam/slot-machine?branch=master)
[![sauce test status](https://saucelabs.com/buildstatus/sarbbottam)](https://saucelabs.com/u/sarbbottam)

[![sauce browser matrix](https://saucelabs.com/browser-matrix/sarbbottam.svg)](https://saucelabs.com/u/sarbbottam)

[Demo](http://sarbbottam.github.io/slot-machine/)
---
[![demo](http://i.imgur.com/wnkvEIr.png)](http://sarbbottam.github.io/slot-machine/)

Usage
---

```html
<!-- following markup is required at the minimum -->
<div class="container-reel" id="container-reel">
  <div class="reel" id="reel-1"></div>
  <div class="reel" id="reel-2"></div>
  <div class="reel" id="reel-3"></div>
</div>
<div role="alert" aria-live="assertive" aria-relevant="additions" id="result"></div>
<button type="button" class="button" id="button-start">Start</button>
```

```js
var SlotMachine = require('../src/slot-machine');

/* HTML elements to passed to the SlotMachine constructor*/
var reelContainer = document.getElementById('container-reel');
var startButton = document.getElementById('button-start');
var resultContainer = document.getElementById('result');

var reel1 = document.getElementById('reel-1');
var reel2 = document.getElementById('reel-2');
var reel3 = document.getElementById('reel-3');

/* instantiate the slotMachine */
var slotMachine = new SlotMachine({
  reels: [
      ['coffee maker', 'teapot', 'espresso machine'],
      ['coffee filter', 'tea strainer', 'espresso tamper'],
      ['coffee grounds', 'loose tea', 'ground espresso beans']
    ],
  sequence: ['coffee', 'tea', 'expresso'],
  reelNodes: [ reel1, reel2, reel3],
  reelContainer: reelContainer,
  startButton: startButton,
  resultContainer: resultContainer,
  slotHeight: 100,
  text: {
    jackpot: 'Congratulations, you won a free {drink}.',
    tryAgain: 'Better luck next time.'
  },
  css: {
    jackpot: 'jackpot',
    result: 'result'
  }
});

slotMachine.init();
```

Want to improve the functionality
---

* [fork the repo](https://github.com/sarbbottam/slot-machine#fork-destination-box)
* clone the forked repo
* `cd` into the cloned repo
* `npm i` or `sudo npm i` to install the dependencies
* `grunt dev` will start watching for any changes and trigger the necessary tasks. Refer the `tasks` folder for task related details.
* `grunt js:ci` will test the functionality against SauceLabs.
* prior using grunt js:ci, `export` `SAUCE_USERNAME` & `SAUCE_ACCESS_KEY`
