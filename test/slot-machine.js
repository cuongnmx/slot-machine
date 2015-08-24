'use strict';

describe('SlotMachine', function() {
  var event = require('../polyfill/event');
  var SlotMachine = require('../src/slot-machine');
  var slotMachine;
  var slotMachineData = {};

  var wrapper;
  var markup = '\
    <div class="slot-machine"> \
      <div class="container-reel" id="container-reel"> \
        <div class="reel" id="reel-1"></div> \
        <div class="reel" id="reel-2"></div> \
        <div class="reel" id="reel-3"></div> \
      </div> \
      <div role="alert" aria-live="assertive" aria-relevant="additions" id="result"></div> \
      <button type="button" class="button" id="button-start">Start</button> \
    </div>';
  var reelContainer;
  var startButton;
  var resultContainer;

  var reel1;
  var reel2;
  var reel3;

  before(function() {
    wrapper = document.createElement('div');
    wrapper.innerHTML = markup;
    document.body.appendChild(wrapper);

    reelContainer = document.getElementById('container-reel');
    startButton = document.getElementById('button-start');
    resultContainer = document.getElementById('result');

    reel1 = document.getElementById('reel-1');
    reel2 = document.getElementById('reel-2');
    reel3 = document.getElementById('reel-3');
  });

  describe('validate input', function() {

    beforeEach(function() {
      slotMachine = null;
      slotMachineData = {
        reels: [],
        sequence: [],
        reelNodes: [],
        reelContainer: 'not empty',
        startButton: 'not empty',
        resultContainer: 'not empty',
        slotHeight: 10
      };

    });

    it('should throw an error if slotHeight is not be provided', function() {
      try {
        slotMachineData.slotHeight = null;
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'slotHeight must be provided');
      }
    });

    it('should throw an error if slotHeight is not a number', function() {
      try {
        slotMachineData.slotHeight = 'string';
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'slotHeight must be a number');
      }
    });

    it('should throw an error if resultContainer is not be provided', function() {
      try {
        slotMachineData.resultContainer = null;
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'resultContainer must be provided');
      }
    });

    it('should throw an error if startButton is not be provided', function() {
      try {
        slotMachineData.startButton = null;
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'startButton must be provided');
      }
    });

    it('should throw an error if reelContainer is not be provided', function() {
      try {
        slotMachineData.reelContainer = null;
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'reelContainer must be provided');
      }
    });

    it('should throw an error if reelNodes is not be provided', function() {
      try {
        slotMachineData.reelNodes = null;
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'reelNodes must be provided');
      }
    });

    it('should throw an error if the passed sequence is not an array', function() {
      try {
        slotMachineData.sequence = null;
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'sequence must be an array');
      }
    });

    it('should throw an error if the passed reel is not an array', function() {
      try {
        slotMachineData.sequence = [''];
        slotMachineData.reels = ' ';
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'reels must be an array');
      }
    });

    it('should throw an error if the passed reel\'s length < 2', function() {
      try {
        slotMachineData.sequence = [''];
        slotMachineData.reels = [''];
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'two reels required at minimum');
      }
    });

    it('should throw an error if the any of the passed reel\'s, slot\'s length < 2', function() {
      try {
        slotMachineData.sequence = ['', ''];
        slotMachineData.reels = [[''], ['']];
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'two slots per reel is required at minimum');
      }
    });

    it('should throw an error if the passed reel\'s  does not have same number of slots', function() {
      try {
        slotMachineData.sequence = ['', ''];
        slotMachineData.reels = [['', '', ''], ['', '']];
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'all the reels must be of same number of slots');
      }
    });

    it('should throw an error if the passed sequence\'s length is not equal to passed reel\'s length', function() {
      try {
        slotMachineData.sequence = [''];
        slotMachineData.reels = [['', '', ''], ['', '', ''], ['', '', '']];
        slotMachine = new SlotMachine(slotMachineData);
      } catch(e) {
        assert.equal(e, 'sequence must have equal number of entries with respect to reels');
      }
    });

    it('should retrun an object on valid input', function() {
      slotMachineData.sequence = ['', ''];
      slotMachineData.reels = [['', ''], ['', '']];
      slotMachine = new SlotMachine(slotMachineData);
      assert.isObject(slotMachine);
    });

  });

  describe('initialization and beahvior', function() {

    before(function() {
      slotMachine = new SlotMachine({
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
          jackpot: 'Congratulations, you won a free {option}.',
          tryAgain: 'Better luck next time.'
        },
        css: {
          jackpot: 'jackpot',
          result: 'result'
        }
      });
    });

    it('should initialize the slotMachine', function() {
      var spy = sinon.spy(slotMachine, 'init');
      slotMachine.init();
      assert.isTrue(spy.called);
    });

    it('should display the status', function(done) {
      this.timeout(10000);
      event.triggerClickEvent(startButton);
      setTimeout(function() {
        assert.isString(resultContainer.querySelector('p').innerHTML);
        done();
      }, 5000);
    });

    it('should request to try again', function(done) {
      this.timeout(10000);
      slotMachine.reels.forEach(function(reel, index) {
        reel.updateSelectedIndex = function() {
          return index;
        };
      });
      event.triggerClickEvent(startButton);
      setTimeout(function() {
        assert.equal(resultContainer.querySelector('p').innerHTML, 'Better luck next time.');
        assert.isFalse(reelContainer.classList.contains('jackpot'));
        done();
      }, 5000);
    });

    it('should result in Jackpot, for coffee', function(done) {
      this.timeout(10000);
      slotMachine.reels.forEach(function(reel) {
        reel.updateSelectedIndex = function() {
          return 0;
        };
      });
      event.triggerClickEvent(startButton);
      setTimeout(function() {
        assert.equal(resultContainer.querySelector('p').innerHTML, 'Congratulations, you won a free coffee.');
        assert.isTrue(reelContainer.classList.contains('jackpot'));
        done();
      }, 5000);
    });

    it('should disable the slotMachine', function() {
      var spy = sinon.spy(slotMachine, 'disable');
      slotMachine.disable();
      assert.isTrue(spy.called);
    });

    it('should not disable the startButton if the slotMachine is disabled', function() {
      slotMachine.disable();
      event.triggerClickEvent(startButton);
      assert.isNull(startButton.getAttribute('disabled'));
    });

    // it('should result in Jackpot, for tea', function(done) {
    //   this.timeout(10000);
    //   slotMachine.reels.forEach(function(reel) {
    //     reel.updateSelectedIndex = function() {
    //       return 1;
    //     };
    //   });
    //   event.triggerClickEvent(startButton);
    //   setTimeout(function() {
    //     assert.equal(resultContainer.querySelector('p').innerHTML, 'Congratulations, you won a free tea.');
    //     done();
    //   }, 5000);
    // });

    // it('should result in Jackpot, for coffee', function(done) {
    //   this.timeout(10000);
    //   slotMachine.reels.forEach(function(reel) {
    //     reel.updateSelectedIndex = function() {
    //       return 2;
    //     };
    //   });
    //   event.triggerClickEvent(startButton);
    //   setTimeout(function() {
    //     assert.equal(resultContainer.querySelector('p').innerHTML, 'Congratulations, you won a free expresso.');
    //     done();
    //   }, 5000);
    // });

  });

});
