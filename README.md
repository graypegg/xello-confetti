
# xello-confetti
A pre-baking animation that performantly add's some fun confetti magic to your app. 

![An example of the confetti effect](https://github.com/toish/xello-confetti/raw/master/example.gif)

## Performance
You can skip this blurb. I wanted to play around with web performance, so here's some notes on the optimizations:

The animation frames are pre-baked as particles in a super over-simplified particle system. The element starts with the Baker determining the initial random force vectors for every single particle (750 of them) and compiling those into the first screen frame. Then, it passes that first frame to the Bake Worker, (a separate web-worker that keeps all of this frame generation off of the main thread) which calculates the next 25 screen frames, marking some particles for removal if they fall of the screen. Meanwhile, the main thread is free to continue doing UI things. Those 25 screen frames are then passed back (via a non-blocking event) to the Baker that saves them and asks for the next 25. This process goes on till all frames are rendered with all particles removed from the last frame.

The Baker now has all of the screen frames, so those can be passed to the FrameRenderer, one by one, in time, by the Animation manager. Particle objects are reused but ones that are marked as removed for that frame are removed from the scene to save a bit of time when looping over everything in the scene during the next frame.

> The Baker can also be asked for screen frames when it doesn't have all of them yet. This allows for it to catch up while the animation plays. I haven't come across a case where things are naturally processed slow enough for this to happen, but it can be emulated by using chrome's dev tools to virtually slow the CPU clock speed down 4X. The FrameRenderer also caches a copy of the current frame when rendering a new one, so if the Animation manager runs out of frames while the Baker catches up, the Frame Renderer will just render the last frame till it's ready. Again, haven't seen that happen in the wild, but still a possibility.

## Installation
```
$ npm install xello-confetti
```

## How to use
Just include this package in your project. (Ideally right when things are starting. In angular this means in `main.ts`.)

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

## Theming and Options
The look of the particles can be adjusted! By default, they are colourful rectangles in Xello's brand colours, but can be changed to other colours or textured with images.

Themes are passed in using the `setTheme({ options })` instance method. Below is a list of the options you can include. **All of the top level options are optional and get replaced by a sane default, however, the size object needs to be supplied in full if you do supply a size setting.**

### `size`
This sets the size ranges for confetti particles. All values are in THREE.js's device-independent dimensions and do not represent a pixel value.
```javascript
xellofetti.setTheme({
	size: {
		base: 0.6,      // The base size for a confetti height.
		variation: 0.2, // Up to this amount will be added to the base size randomly per particle.
		ratio: 0.4.     // The ratio of each confetti's width to it's height.
	}, ...
})
```

### `textures: ConfettiTexture[]`
A library of textures (images) to use on materials. This allows you to texture and mask the confetti. Regular textures can be full colour. Alpha textures, used for masking, should only use shades of grey. *(There's nothing special to declare if a texture is a regular texture vs alpha texture.)* All textures are downloaded and cached when setting the theme so consider file size when adding many textures. **Past textures are NOT deleted when running `setTheme` unless you overwrite one using the same `id`. When possible, don't *redeclare* textures if you don't have to. It downloads them again.**
```javascript
xellofetti.setTheme({
	textures: [
		{
			id: 'money',     // A unique ID to refer to this texture in any materials
			url: '/bill.png' // The image URL to download from. (Needs CORS headers if it's NOT on the origin!)
					 // Note: You can also use 'data:...' urls here.
		}, ...
	], ...
})
```

### `materials: ConfettiMaterial[]`
A set of materials that will be randomly selected from when drawing the confetti. The list of materials that confettis are assigned is ALWAYS deleted and replaced with the one you supply.
```javascript
xellofetti.setTheme({
	materials: [
		{
			colour: '#FF0000',           // The base colour for the material
			textureMap: 'someTextureID', // The `id` from the texture for the "outside" of the confetti
			alphaMap: 'anotherTextureID' // The `id` from the texture for alpha-masking the confetti.
		}, ...
	], ...
})
```

## Instance Methods
The `<xello-confetti>` web component has a number of instance methods you can use once it's connected.

### `.play()`
Starts the animation. It plays for 350 frames, and will scale to the size of the screen.

### `.clear()`
Stops the animation. Clears up the confetti. 🧹 Unregisters event listeners and puts everything back where it started.

### `.setTheme(options)`
Sets the theme for the confetti. This does not re-bake the animation and is generally a low-load task. See section above for details about the `options` parameter.

## Accessibility Notes
1. Element should be marked as `role="presentation"` since this effect doesn't mean anything to the accessibility tree.
2. The animation automatically disables if the user has a preference for less motion.

## Deployment
Use the `npm run release` script to make a release. It creates a tag, don't forget to push those!

## Development
Use the `npm run start` script to start watching for changes on source files. It will make a development build in `/dist`. Serve `/dist` somehow to view in a browser.
