# Just Die

![Just Die JS logo](https://raw.github.com/jenshedqvist/justdie/master/JustDie_Logo_128x128.png)

> Just a die roller library written in ES6 ES2015, use for whatever obscure purpose.



## Installation

```bash
npm install --save justdie
```

To use directly in the browser:

```html
<script src="path/to/yourCopyOf/justdie.js"></script>
```

or the minified version:

```html
<script src="path/to/yourCopyOf/justdie.min.js"></script>
```

## Build
On install a Node compliant `index.js` will be created automatically:

```bash
npm install
```

but you can run it manually as well to create a `index.js`:

```bash
npm run build
```


## Documentation

Create a die and roll it:
```javascript
let die6 = die(6);
die6() // 1-6
```

Or use the roll function
```javascript
let die6 = die(6);
roll(die6) // 1-6
```

The roll function can take a pool of dice:
```javascript
roll(die(10), die(10), die(10)) // 3-30
```

and ofc mixed dice pools:
```javascript
roll(die(8), die(12), die(4)) // 3-24
```

You can make more verbose rolls:
```javascript
let d20 = die(20);
verbose(d20) // { "result": 1-20, "minmax": [1, 20], "sides": 20 }
roll_verbose(d20, d20, d20) // [{ "result": 1-20, "minmax": [1, 20], "sides": 20 }, ...]
```


## Running The Test Suite

In the terminal run:

```bash
npm test
```

## FAQ

- (**`?`**) But couldn't all this be achieved using a random_num util?
- (**`!`**) You are correct, it could! And you are boring. Please stop talking.

## Disclaimer
This project is currently in development state. Use at your own risk.

## License
MIT
