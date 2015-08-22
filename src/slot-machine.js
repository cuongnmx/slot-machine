'use strict';

var MAX_SPEED = 25;
var MIN_SPEED = 12;
var Reel = require('./reel');

function SlotMachine(config) {
  var text;
  var css;

  var reels = config.reels;
  var sequence = config.sequence;

  text = config.text;

  /* istanbul ignore next */
  this.text = {
    jackpot: text && text.jackpot ? text.jackpot : 'Congratulations, you won a free {drink}',
    tryAgain: text && text.tryAgain ? text.tryAgain : 'Better luck next time.'
  };

  css = config.css;

  /* istanbul ignore next */
  this.css = {
    result: css && css.result ? css.result : 'result',
    jackpot: css && css.jackpot ? css.jackpot : 'jackpot'
  };

  if (!config.resultContainer) {
    throw 'resultContainer must be provided';
  }
  this.resultContainer = config.resultContainer;

  if (!config.startButton) {
    throw 'startButton must be provided';
  }
  this.startButton = config.startButton;

  if (!config.reelContainer) {
    throw 'reelContainer must be provided';
  }
  this.reelContainer = config.reelContainer;

  if (!config.reelNodes) {
    throw 'reelNodes must be provided';
  }
  this.reelNodes = config.reelNodes;

  if( !(sequence instanceof Array) ) {
    throw 'sequence must be an array';
  }

  if (sequence.length !== reels.length) {
    throw 'sequence must have equal number for entries with respect to reels';
  }

  this.sequence = sequence;

  if( !(reels instanceof Array) ) {
    throw 'reels must be an array';
  }
  if (reels.length < 2) {
    throw 'two reels required at minimum';
  }

  this.reels = [];

  for (var i = 0; i < reels.length; i += 1) {
    if (reels[i].length < 2) {
      throw 'two slots per reel is required at minimum';
    }
    if (i > 0 && reels[i].length !== reels[i - 1].length) {
      throw 'all the reels must be of same number of slots';
    }
    this.reels.push(new Reel(reels[i], this.reelNodes[i]));
  }

}

function isJackpot(selectedIndexes) {
  for (var i = 0; i < selectedIndexes.length; i += 1) {
    if (i > 0 && selectedIndexes[i] !== selectedIndexes[i - 1]) {
      return false;
    }
  }
  return true;
}

function spin(index) {
  var reels = this.reels;
  var reel = reels[index];
  var spinning = false;

  reel.currentPosition += reel.speed;
  if (reel.currentPosition < reel.stopPosition) {
    reel.spinning = true;
    reel.node.style.backgroundPosition = '0px ' + reel.currentPosition + 'px';
    setTimeout(function() {
      spin.bind(this)(index);
    }.bind(this), 1000 / 60);
  } else {
    reel.spinning = false;
    reel.node.style.backgroundPosition = '0px ' + reel.stopPosition + 'px';
  }

  for (var i = 0; i < reels.length; i += 1) {
    spinning = spinning || reels[i].spinning;
  }

  if (!spinning) {
    this.startButton.removeAttribute('disabled');
    if(isJackpot(this.selectedIndexes)) {
      this.reelContainer.classList.add(this.css.jackpot);
      this.resultContainer.innerHTML = '<p class="' + this.css.result + '">' + this.text.jackpot.replace('{drink}', this.sequence[this.selectedIndexes[0]]) + '</p>';
    } else {
      this.resultContainer.innerHTML = '<p class="' + this.css.result + '">' + this.text.tryAgain + '</p>';
    }
  }
}

function start() {
  var selectedIndexes = [];
  this.resultContainer.innerHTML = '';
  this.reelContainer.classList.remove(this.css.jackpot);
  this.startButton.setAttribute('disabled', true);

  this.reels.forEach(function(reel, index) {
    var selectedIndex = reel.updateSelectedIndex();
    selectedIndexes.push(selectedIndex);
    reel.speed = Math.floor( Math.random() * (MAX_SPEED - MIN_SPEED + 1)) + MIN_SPEED;
    reel.currentPosition = 0;
    reel.stopPosition = (300 * 10) + ( (selectedIndex + 1) * 100);
    spin.bind(this)(index);
  }.bind(this));

  this.selectedIndexes = selectedIndexes;
}

SlotMachine.prototype.init = function() {
  this.startButton.addEventListener('click', function() {
    start.bind(this)();
  }.bind(this));
};

module.exports = SlotMachine;
