'use strict';

function Reel(slots, node) {
  this.slots = slots;
  this.node = node;
}

Reel.prototype.updateSelectedIndex = function() {
  return Math.floor( Math.random() * this.slots.length );
};

module.exports = Reel;
