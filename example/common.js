var SlotMachine = require('../src/slot-machine');

var reelContainerCoffeeBasic = document.getElementById('container-reel-coffee-basic');
var startButtonCoffeeBasic = document.getElementById('button-start-coffee-basic');
var resultContainerCoffeeBasic = document.getElementById('result-coffee-basic');

var reelCoffeeBasic1 = document.getElementById('reel-coffee-basic-1');
var reelCoffeeBasic2 = document.getElementById('reel-coffee-basic-2');
var reelCoffeeBasic3 = document.getElementById('reel-coffee-basic-3');

var slotMachineCoffeeBasic = new SlotMachine({
  reels: [
      ['coffee maker', 'teapot', 'espresso machine'],
      ['coffee filter', 'tea strainer', 'espresso tamper'],
      ['coffee grounds', 'loose tea', 'ground espresso beans']
    ],
  sequence: ['coffee', 'tea', 'espresso'],
  reelNodes: [reelCoffeeBasic1, reelCoffeeBasic2, reelCoffeeBasic3],
  reelContainer: reelContainerCoffeeBasic,
  startButton: startButtonCoffeeBasic,
  resultContainer: resultContainerCoffeeBasic,
  slotHeight: 100,
  text: {
    jackpot: 'Congratulations, you won a free {option}.',
    tryAgain: 'Better luck next time.'
  },
  css: {
    jackpot: 'jackpot',
    result: 'result'
  }
});

slotMachineCoffeeBasic.init();

var reelContainerCoffeeAdvanced = document.getElementById('container-reel-coffee-advanced');
var startButtonCoffeeAdvanced = document.getElementById('button-start-coffee-advanced');
var resultContainerCoffeeAdvanced = document.getElementById('result-coffee-advanced');

var reelCoffeeAdvanced1 = document.getElementById('reel-coffee-advanced-1');
var reelCoffeeAdvanced2 = document.getElementById('reel-coffee-advanced-2');
var reelCoffeeAdvanced3 = document.getElementById('reel-coffee-advanced-3');

var slotMachineCoffeeAdvanced = new SlotMachine({
  reels: [
      ['coffee maker', 'teapot', 'espresso machine'],
      ['coffee filter', 'tea strainer', 'espresso tamper'],
      ['coffee grounds', 'loose tea', 'ground espresso beans']
    ],
  sequence: ['coffee', 'tea', 'espresso'],
  reelNodes: [reelCoffeeAdvanced1, reelCoffeeAdvanced2, reelCoffeeAdvanced3],
  reelContainer: reelContainerCoffeeAdvanced,
  startButton: startButtonCoffeeAdvanced,
  resultContainer: resultContainerCoffeeAdvanced,
  slotHeight: 100,
  text: {
    jackpot: 'Congratulations, you won a free {option}.',
    tryAgain: 'Better luck next time.'
  },
  css: {
    jackpot: 'jackpot',
    result: 'result'
  }
});

slotMachineCoffeeAdvanced.init();

var reelContainerFruit = document.getElementById('container-reel-fruit');
var startButtonFruit = document.getElementById('button-start-fruit');
var resultContainerFruit = document.getElementById('result-fruit');

var reelFruit1 = document.getElementById('reel-fruit-1');
var reelFruit2 = document.getElementById('reel-fruit-2');
var reelFruit3 = document.getElementById('reel-fruit-3');

var slotMachineFruit = new SlotMachine({
  reels: [
      ['pear', 'fig', 'persimmon', 'maskmelon', 'kiwi', 'apple', 'papaya', 'orange'],
      ['pear', 'fig', 'persimmon', 'maskmelon', 'kiwi', 'apple', 'papaya', 'orange'],
      ['pear', 'fig', 'persimmon', 'maskmelon', 'kiwi', 'apple', 'papaya', 'orange']
    ],
  sequence: ['pear', 'fig', 'persimmon', 'maskmelon', 'kiwi', 'apple', 'papaya', 'orange'],
  reelNodes: [reelFruit1, reelFruit2, reelFruit3],
  reelContainer: reelContainerFruit,
  startButton: startButtonFruit,
  resultContainer: resultContainerFruit,
  slotHeight: 100,
  text: {
    jackpot: 'Congratulations, you won a free {option}.',
    tryAgain: 'Better luck next time.'
  },
  css: {
    jackpot: 'jackpot',
    result: 'result'
  }
});

slotMachineFruit.init();
