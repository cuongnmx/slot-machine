'use strict';

var MAX_SPEED = 25;
var MIN_SPEED = 12;
var MAX_SPIN = 9;
var MIN_SPIN = 12;
var Reel = require('./reel');

/**
 * returns a SlotMachine.
 * @class SlotMachine
 * @param {Object} config - configuration object.
 * @param {Object} config.text - outcome of the SlotMachine spin.
 * @param {String} config.text.jackpot - text to be displayed on jackpot 'Congratulations, you won a free {drink}'
 * @param {String} config.text.tryAgain - text to be displayed to try again 'Better luck next time.'
 * @param {Object} config.css - css class names to be used by the SlotMachine.
 * @param {String} config.css.result - css class to be applied on the result Node
 * @param {String} config.css.jackpot - css class for jackpot highlight
 * @param {HTMLElement} resultContainer - container where result will be displayed.
 * @param {HTMLElement} startButton - to start the SlotMachine, on click of this button SlotMachine will be started
 * @param {HTMLElement} reelContainer - contanier which wraps the reels.
 * @param {HTMLElement[]} reelNodes - array of reelNodes, these nodes will be spinned
 * @param {String[]} sequence - array of texts that defines the the item in the SlotMachine
 * Refer the example folder for the usage.
 * example/index.html for the minumun markup
 * example/common.js for creating a new SlotMachine
 * example/main.css for style guide
 */
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

  /*
   * validate the passed argumenets
   * throw error on invalid arguments
   */
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

/**
 * @private
 * returns true if the current spin has resulted in a jackpot
 * or otherwise
 */
function isJackpot(selectedIndexes) {
  for (var i = 0; i < selectedIndexes.length; i += 1) {
    if (i > 0 && selectedIndexes[i] !== selectedIndexes[i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * @private
 * spin the reel
 * update the background-position-y value to simulate spin
 */
function spin(index) {
  var reels = this.reels;
  var reel = reels[index];
  var spinning = false;

  reel.currentPosition += reel.speed;
  /* keep spninng if the current position is less than the stop position */
  if (reel.currentPosition < reel.stopPosition) {
    reel.spinning = true;
    reel.node.style.backgroundPosition = '0px ' + reel.currentPosition + 'px';
    setTimeout(function() {
      spin.bind(this)(index);
    }.bind(this), 1000 / 60);
  } else {
    reel.spinning = false;
    /* set the background-position-y to stopPosition */
    reel.node.style.backgroundPosition = '0px ' + reel.stopPosition + 'px';
  }

  /*
   * determine if the SlotMachine is is motion
   * if all the reels have stopped
   */
  for (var i = 0; i < reels.length; i += 1) {
    spinning = spinning || reels[i].spinning;
  }
  /**
   * enable the start button if none of the reel is in motion
   * display the result of the current spin
   */
  if (!spinning) {
    this.startButton.removeAttribute('disabled');

    if(isJackpot(this.selectedIndexes)) {
      /* if jackpot */
      this.reelContainer.classList.add(this.css.jackpot);
      /*
       * fetch the the option from this.sequence
       * replace '{drink}' in the jackpot text with the option fetched.
       */
      this.resultContainer.innerHTML = '<p class="' + this.css.result + '">' + this.text.jackpot.replace('{drink}', this.sequence[this.selectedIndexes[0]]) + '</p>';
    } else {
      /* or otherwise; try again */
      this.resultContainer.innerHTML = '<p class="' + this.css.result + '">' + this.text.tryAgain + '</p>';
    }
  }
}

/**
 * @private
 * start the initialize instance of a SlotMachine
 * when the startButton is clicked
 */
function start() {
  var selectedIndexes = [];
  /* on (re)start empty the resultContainer */
  this.resultContainer.innerHTML = '';
  /* on (re)start remove the 'jackpot' class from the reelContainer */
  this.reelContainer.classList.remove(this.css.jackpot);
  /* on (re)start disable the startButton */
  this.startButton.setAttribute('disabled', true);

  /* for each real; prefrom the following */
  this.reels.forEach(function(reel, index) {
    /* randomly choose which slot is to selected */
    var selectedIndex = reel.updateSelectedIndex();
    var spinCount = Math.floor( Math.random() * (MAX_SPIN - MIN_SPIN + 1)) + MIN_SPEED;
    /*
     * store the selectedIndex in the selectedIndexes
     * it will be used to detect the option during jackpot
     */
    selectedIndexes.push(selectedIndex);
    /* randomly choose a speed between MAX_SPEED & MIN_SPEED to spin the reel */
    reel.speed = Math.floor( Math.random() * (MAX_SPEED - MIN_SPEED + 1)) + MIN_SPEED;
    reel.currentPosition = 0;
    /*
     * ToDo
     * remove the hard coding and expect it passed during instantiation of the SlotMachine
     * 300 height of the sprite
     * 100 height of each slot/icons
     */
    reel.stopPosition = (300 * spinCount) + ( (selectedIndex + 1) * 100);
    spin.bind(this)(index);
  }.bind(this));

  this.selectedIndexes = selectedIndexes;
}

/**
 * @function init
 * initialize the instance of a SlotMachine
 */
SlotMachine.prototype.init = function() {
  this.startButton.addEventListener('click', function() {
    start.bind(this)();
  }.bind(this));
};

module.exports = SlotMachine;
