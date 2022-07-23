import Player from '@vimeo/player';
let throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem('videoplayer-current-time', data.seconds);
    console.log(localStorage.getItem('videoplayer-current-time'));
  }, 1000)
);
player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
