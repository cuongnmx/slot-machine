'use strict';

var MAX_SPEED = 25;
var MIN_SPEED = 12;
var SPIN_COUNT = 10;
var Reel = require('./reel');

/* istanbul ignore next */
window.requestAnimationFrame = (function() {
  return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function( callback ) {
            window.setTimeout(callback, 1000 / 60);
          };
})();

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
 * @param {Number} config.slotHeight - height of the each slots; all the slots must be of same height
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

  var reels = [];
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
  if (!config.slotHeight) {
    throw 'slotHeight must be provided';
  }
  if (!config.slotHeight.toString().match(/^\d*$/)) {
    throw 'slotHeight must be a number';
  }
  Object.defineProperty( this, 'slotHeight', {
    value: config.slotHeight
  });

  if (!config.resultContainer) {
    throw 'resultContainer must be provided';
  }
  Object.defineProperty( this, 'resultContainer', {
    value: config.resultContainer
  });

  if (!config.startButton) {
    throw 'startButton must be provided';
  }
  Object.defineProperty( this, 'startButton', {
    value: config.startButton
  });

  if (!config.reelContainer) {
    throw 'reelContainer must be provided';
  }
  Object.defineProperty( this, 'reelContainer', {
    value: config.reelContainer
  });

  if (!config.reelNodes) {
    throw 'reelNodes must be provided';
  }
  Object.defineProperty( this, 'reelNodes', {
    value: config.reelNodes
  });

  if( !(sequence instanceof Array) ) {
    throw 'sequence must be an array';
  }
  Object.defineProperty( this, 'sequence', {
    value: config.sequence
  });

  if( !(config.reels instanceof Array) ) {
    throw 'reels must be an array';
  }
  if (config.reels.length < 2) {
    throw 'two reels required at minimum';
  }

  for (var i = 0; i < config.reels.length; i += 1) {
    if (config.reels[i].length < 2) {
      throw 'two slots per reel is required at minimum';
    }
    if (i > 0 && config.reels[i].length !== config.reels[i - 1].length) {
      throw 'all the reels must be of same number of slots';
    }
    reels.push(new Reel(config.reels[i], this.reelNodes[i]));
  }
  Object.defineProperty( this, 'reels', {
    value: reels
  });

  if (sequence.length !== config.reels[0].length) {
    throw 'sequence must have equal number of entries with respect to reels';
  }

  /*
   * ToDo
   * use Object.defineProperties
   * need to be refactored
  Object.defineProperties(this, {
    'slotHeight': {
      value: config.slotHeight
    },
    'resultContainer': {
      value: config.resultContainer
    },
    'startButton': {
      value: config.startButton
    },
    'reelContainer': {
      value: config.reelContainer
    },
    'reelNodes': {
      value: config.reelNodes
    },
    'sequence': {
      value: config.sequence
    },
    'reels': {
      value: config.reels
    }
  });
   */

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
    window.requestAnimationFrame(function() {
      spin.bind(this)(index);
    }.bind(this));
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
      this.resultContainer.innerHTML = '<p class="' + this.css.result + '">' + this.text.jackpot.replace('{option}', this.sequence[this.selectedIndexes[0]]) + '</p>';
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
    /*
     * store the selectedIndex in the selectedIndexes
     * it will be used to detect the option during jackpot
     */
    selectedIndexes.push(selectedIndex);
    /* randomly choose a speed between MAX_SPEED & MIN_SPEED to spin the reel */
    reel.speed = Math.floor( Math.random() * (MAX_SPEED - MIN_SPEED + 1)) + MIN_SPEED;
    reel.currentPosition = 0;
    /*
     * calculate the stopPosition
     * slotHeight * number of slots * SPIN_COUNT will produce full spin stopPosition
     * (selectedIndex + 1) * this.slotHeight will produce the offset for the currently selected slot
     */
    reel.stopPosition = (this.slotHeight * reel.slots.length * SPIN_COUNT) + ( (selectedIndex + 1) * this.slotHeight);
    spin.bind(this)(index);
  }.bind(this));

  this.selectedIndexes = selectedIndexes;
}

/**
 * @function init
 * initialize the instance of a SlotMachine
 */
SlotMachine.prototype.init = function() {
  this.startButton.addEventListener('click', start.bind(this));
};

module.exports = SlotMachine;
