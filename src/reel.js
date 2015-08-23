'use strict';
/**
 * returns a Reel.
 * @class Reel
 * @param {String[]} slots - array of the slots
 * @param {HTMLElement} node - html element whcih will represent this node.
 */
function Reel(slots, node) {
  this.slots = slots;
  this.node = node;
}

Reel.prototype.updateSelectedIndex = function() {
  return Math.floor( Math.random() * this.slots.length );
};

module.exports = Reel;
