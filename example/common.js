var SlotMachine = require('../src/slot-machine');

var reelContainerCoffee = document.getElementById('container-reel-coffee');
var startButtonCoffee = document.getElementById('button-start-coffee');
var resultContainerCoffee = document.getElementById('result-coffee');

var reelCoffee1 = document.getElementById('reel-coffee-1');
var reelCoffee2 = document.getElementById('reel-coffee-2');
var reelCoffee3 = document.getElementById('reel-coffee-3');

var slotMachineCoffee = new SlotMachine({
  reels: [
      ['coffee maker', 'teapot', 'espresso machine'],
      ['coffee filter', 'tea strainer', 'espresso tamper'],
      ['coffee grounds', 'loose tea', 'ground espresso beans']
    ],
  sequence: ['coffee', 'tea', 'expresso'],
  reelNodes: [reelCoffee1, reelCoffee2, reelCoffee3],
  reelContainer: reelContainerCoffee,
  startButton: startButtonCoffee,
  resultContainer: resultContainerCoffee,
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

slotMachineCoffee.init();

var reelContainerFruit = document.getElementById('container-reel-fruit');
var startButtonFruit = document.getElementById('button-start-fruit');
var resultContainerFruit = document.getElementById('result-fruit');

var reelFruit1 = document.getElementById('reel-fruit-1');
var reelFruit2 = document.getElementById('reel-fruit-2');
var reelFruit3 = document.getElementById('reel-fruit-3');

var slotMachineFruit = new SlotMachine({
  reels: [
      ['apple', 'orange', 'papaya'],
      ['apple', 'orange', 'papaya'],
      ['apple', 'orange', 'papaya']
    ],
  sequence: ['apple', 'orange', 'papaya'],
  reelNodes: [reelFruit1, reelFruit2, reelFruit3],
  reelContainer: reelContainerFruit,
  startButton: startButtonFruit,
  resultContainer: resultContainerFruit,
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

slotMachineFruit.init();
