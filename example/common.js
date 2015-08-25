var SlotMachine = require('../src/slot-machine');

var config = {
  drink1: {
    slotMachineContainer: document.getElementById('drink1'),
    reels: [
      ['coffee maker', 'teapot', 'espresso machine'],
      ['coffee filter', 'tea strainer', 'espresso tamper'],
      ['coffee grounds', 'loose tea', 'ground espresso beans']
    ],
    sequence: ['coffee', 'tea', 'espresso']
  },
  fruit: {
    slotMachineContainer: document.getElementById('fruit'),
    reels: [
      ['pear', 'fig', 'persimmon', 'maskmelon', 'kiwi', 'apple', 'papaya', 'orange'],
      ['pear', 'fig', 'persimmon', 'maskmelon', 'kiwi', 'apple', 'papaya', 'orange'],
      ['pear', 'fig', 'persimmon', 'maskmelon', 'kiwi', 'apple', 'papaya', 'orange']
    ],
    sequence: ['pear', 'fig', 'persimmon', 'maskmelon', 'kiwi', 'apple', 'papaya', 'orange']
  }
}

Object.keys(config).forEach(function(key) {
  var slotMachine = new SlotMachine({
    reels: config[key].reels,
    sequence: config[key].sequence,
    reelNodes: Array.prototype.slice.call(config[key].slotMachineContainer.querySelectorAll('.js-reel')),
    reelContainer: config[key].slotMachineContainer.querySelector('.js-containter-reel'),
    startButton: config[key].slotMachineContainer.querySelector('.js-button'),
    resultContainer: config[key].slotMachineContainer.querySelector('.js-result'),
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

  slotMachine.init();

});

