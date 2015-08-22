var SlotMachine = require('../src/slot-machine');

var reelContainer = document.getElementById('container-reel');
var startButton = document.getElementById('button-start');
var resultContainer = document.getElementById('result');

var reel1 = document.getElementById('reel-1');
var reel2 = document.getElementById('reel-2');
var reel3 = document.getElementById('reel-3');

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
