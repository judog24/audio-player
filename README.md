# audio-player
A custom HTML5 audio player

![Screenshot of audio-player](http://i.imgur.com/213M13l.png)

This is an HTML5 audio player inspired by [an example created by Alex Katz](http://www.alexkatz.me/html5-audio/building-a-custom-html5-audio-player-with-javascript/).

Features that have been added:
- A volume icon and volume slider.  Click the icon to mute audio or use the slider to make fine adjustments.  

  I probably could have gotten fancy and made the volume slider only be revealed when the user hovers over the volume icon, but I decided against it because I figure that if a user needs to adjust the volume, they REALLY need to adjust the volume.

- Current time/audio duration display.

  As published, the time is set to display in hours:minutes:seconds.  I plan on using this for a podcast manager web app where audio files are frequently longer than an hour.  If tracking hours is irrelevant, alter the following line in the formatTime (seconds) function in main.js:

  ```
  return hours + ':' + minutes + ':' + seconds
  ```

  to:

  ```
  return minutes + ':' + seconds
  ```

- Rewind/Fast forward buttons

  These buttons will rewind or the jump the audio ahead by 10 seconds.  This is a feature that is mostly useful for podcasts where trying to skip around in small increments is harder to do, which brings me to the next feature.

- Player timeline has a tooltip

  Hover your mouse across the timeline to get a better idea of where in the track you are about to skip to.  

- A more colorful timeline:

  The example that this was inspired by simply had a playhead moving across the timeline.  I wanted something a bit more colorful so the timeline so I switched things up so that the timeline continually becomes blue as the audio plays.  Hovering over the timeline will show the playhead.

- Title display

  The title is displayed at the bottom of the audio player.  If the title of the track is too long, the title will begin to scroll.  The title will stop displaying if the window is smaller than 570 pixels.

  Unfortunately, you will have to provide a way of obtaining the title for the track that is being played.  Here the title has been hardcoded.  In the project I am working on that will be utilizing this player, I am passing custom HTML5 data attributes.











