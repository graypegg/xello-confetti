# xello-confetti
Confetti for Xello!

![An example of the confetti effect](https://github.com/toish/xello-confetti/raw/master/example.gif)

## Installation
```
$ npm install xello-confetti
```

## How to use
Just include this package in your project. (Ideally at boot. In angular this means in `main.ts`)

```typescript
import 'xello-confetti'
```

then use this web component anywhere! (It's registered on the nearest `DocumentFragment` or `ShadowRoot`) In this case, we're also including a `#confetti` for use with `@ViewChild`

```html
<xello-confetti role="presentation" #confetti />
```

Use a element reference to it (using `@ViewChild` in angular) to run the `.play()` instance method to start the animation!

```typescript
@ViewChild('confetti') confettiEl: ElementRef;
...
confettiEl.play() // Yay! 🎉
```

## Instance Methods
The `<xello-confetti>` web component has a number of instance methods you can use once it's connected.

### `.play()`
Starts the animation. It plays for 350 frames, and will scale to the size of the screen.

### `.clear()`
Stops the animation. Clears up the confetti. 🧹 Unregisters event listeners and puts everything back where it started.

## Accessibility Notes
1. Element should be marked as `role="presentation"` since this effect doesn't mean anything to the accessiblity tree.
2. The animation automatically disables if the user has a preference for less motion.

## Deployment
Use the `npm run release` script to make a release. It creates a tag, don't forget to push those!

## Development
Use the `npm run start` script to start watching for changes on source files. It will make a development build in `/dist`. Serve `/dist` somehow to view in a browser.
