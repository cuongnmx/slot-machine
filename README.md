slot-machine
---

[![build status](https://travis-ci.org/sarbbottam/slot-machine.svg?branch=master)](https://travis-ci.org/sarbbottam/slot-machine/)
[![coverage Status](https://coveralls.io/repos/sarbbottam/slot-machine/badge.svg?branch=master)](https://coveralls.io/github/sarbbottam/slot-machine?branch=master)
[![sauce test status](https://saucelabs.com/buildstatus/sarbbottam)](https://saucelabs.com/u/sarbbottam)

[![sauce browser matrix](https://saucelabs.com/browser-matrix/sarbbottam.svg)](https://saucelabs.com/u/sarbbottam)

[Demo](http://sarbbottam.github.io/slot-machine/)
---
[![demo](http://i.imgur.com/wnkvEIr.png)](http://sarbbottam.github.io/slot-machine/)

Accessibility walk through
---
Please refer [this youtube video](https://www.youtube.com/watch?v=gXywORUdpIM)
Usage
---

```html
<!-- following markup is required at the minimum -->
<div class="container-reel" id="container-reel">
  <div class="reel" id="reel-1"></div>
  <div class="reel" id="reel-2"></div>
  <div class="reel" id="reel-3"></div>
</div>
<div role="alert" aria-live="assertive" aria-relevant="additions" id="result"></div>
<button type="button" class="button" id="button-start">Start</button>
```

```js
var SlotMachine = require('../src/slot-machine');

/* HTML elements to passed to the SlotMachine constructor*/
var reelContainer = document.getElementById('container-reel');
var startButton = document.getElementById('button-start');
var resultContainer = document.getElementById('result');

var reel1 = document.getElementById('reel-1');
var reel2 = document.getElementById('reel-2');
var reel3 = document.getElementById('reel-3');

/* instantiate the slotMachine */
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

slotMachine.init();
```

Want to improve the functionality
---

* [fork the repo](https://github.com/sarbbottam/slot-machine#fork-destination-box)
* clone the forked repo
* `cd` into the cloned repo
* `npm i` or `sudo npm i` to install the dependencies
* `grunt dev` will start watching for any changes and trigger the necessary tasks. Refer the `tasks` folder for task related details.
* `grunt js:ci` will test the functionality against SauceLabs.
* prior using `grunt js:ci`, `export` `SAUCE_USERNAME` & `SAUCE_ACCESS_KEY`

Acknowledgement
---

* fruit icons have been downloaded from [all-free-download.com](http://all-free-download.com/free-vector/download/exotic_fruit_icon_set_310476_download.html)
* coffee beans from [charlestoncoffeeexchange.com]( http://charlestoncoffeeexchange.com/wp-content/uploads/2013/05/coffee-bean-extract1.jpg)
* tea leaves from [images.wisegeek.com](http://images.wisegeek.com/looseleaf-black-tea-with-two-fresh-tea-leaves.jpg)
* expresso from [ultimateespresso.com](http://www.ultimateespresso.com/wp-content/uploads/IMG_1764-2.jpg)
* sprites generated at [spritepad.wearekiss.com](http://spritepad.wearekiss.com/)
* coffe maker from [clivecoffee.com](http://www.clivecoffee.com/t/product-zoom/mm5/graphics/00000001/bonavita_thermal_coffee_maker.jpg)
* tea pot from [cloudfront.net](http://d3d71ba2asa5oz.cloudfront.net/52000777/images/chai-g.jpg)
* espresso machine from [homedepot.com](http://www.homedepot.com/catalog/productImages/1000/74/741cbdfc-89ac-4310-bd0c-4763512b24c3_1000.jpg)
* coffee filter from [bp.blogspot.com](http://1.bp.blogspot.com/-zRRZha-h3NI/UKLXMUg9rrI/AAAAAAAAALI/KTVz54pr1-s/s1600/coffee-filters.jpg)
* tea-strainer from [personalised-jewellery.co.uk](http://www.personalised-jewellery.co.uk/user/products/large/revolving-tea-strainer-silver-plated-7247.jpg)
* espresso tamper from [espressoparts.com](http://www.espressoparts.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/3/0/30ep5_bocote-2.jpg)
* coffee-grounds from [mshcdn.com](http://rack.3.mshcdn.com/media/ZgkyMDEzLzEwLzE0LzAwL2NvZmZlZWdyb3VuLmRhZTI2LmpwZwpwCXRodW1iCTg1MHg4NTA-CmUJanBn/ec2797f3/db8/coffee-grounds.jpg)
* tea leaves from [englishteastore.com](http://www.englishteastore.com/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/T/O/TOLSLL_EEV_-00_English-Evening-Tea-Loose-Leaf.jpg)
* espresso beans from [hdwallpapers3d.com](http://www.hdwallpapers3d.com/wp-content/uploads/2013/04/Coffee-Beans-Wallpaper-brown-28239137-1920-1200.jpg)
