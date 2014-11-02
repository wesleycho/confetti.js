# Confetti.js

A library to meet your confetti needs.

## Example

Check out [this plunker](http://plnkr.co/edit/JeFlnHmj6gjo4NG3Do75?p=preview) for a live example of this library.

## About

Need a festive celebration on your page?  Confetti.js gives you the ability to control the confetti on your canvas tag with animation functions of your choosing for each piece of confetti while avoiding having to do the messy recursive logic of animating and garbage collecting.

## Usage

-  Include confetti.js script
-  Follow `demo/demo.js` example for how to use the library
-  ????
-  Profit!

## API

-  `Confetti.DEFAULT_NUM`: Default number of confetti pieces to assume - default value is 500
-  `Confetti.color()`: A helper function for randomly generating an rgba color using the `Math.random` function
-  `Confetti.randomFrom(a, b)`: A helper function which takes two numbers and returns a random number from a to b, not including b
-  `Confetti.createCanvas(element, canvas)`:
  Takes two arguments, the DOM node for the canvas to base its dimensions off of (or an object with `offsetWidth` & `offsetHeight` keys), and the canvas DOM node.
  Returns a `Canvas` instance, which has properties:
  -  `element`: the first argument from `createCanvas`
  -  `canvas`: the second argument from `createCanvas`
  -  `context`: the 2d context of the canvas element
  -  `width`: the width from the element
  -  `height`: the height from the element
  -  `setDimensions()`: a function that sets the canvas width and height to the same values as the element width and height
  -  `destroy()`: a function that prepares the canvas for garbage collecting
  -  `step(confettiArray, config)`
    -  Arguments
      -  `confettiArray`: array of `ConfettiClass` instances
      -  `config`: object of key/values that are to be used to update the confetti
        -  `draw(confetti)`: function that takes `ConfettiClass` instance and renders confetti on canvas
        -  `updatePosition(confetti, index)`: function that takes `ConfettiClass` instance and index in confettiArray.  It's purpose is to update the position of each confetti piece
        -  `updateState()`: (optional) function whose purpose is to update the state before render
- `Confetti.create(config)`: Takes a config object and returns a new `ConfettiClass` instance
  -  `config.color`: (optional) the color for the piece of confetti - defaults to `Confetti.color()`
  -  `config.d`: (optional) the density for the piece of confetti - defaults to `Confetti.randomFrom(10, 10 + Confetti.DEFAULT_NUM)`
  -  `isFlakeExiting(canvas)`: Takes a `Canvas` instance and checks whether the confetti is exiting the canvas on the left, right, or bottom
