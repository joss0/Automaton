# Automaton

A simple browser-based visualization of a 1‑D cellular automaton. The page
renders generations to an HTML5 canvas.

## Usage

1. Open `index.html` in any modern web browser.
2. Use the form above the canvas to choose the rule (0–255), starting
   configuration (centered single cell or random), update speed in
   milliseconds, and whether the visualization scrolls or continuously wraps.
3. Press **Start** to begin. Press **Start** again to restart with the current
   settings.

## How it Works

The automaton follows the standard elementary cellular automaton rules where a
rule number between 0 and 255 defines the next state of a cell based on its two
neighbors. Each generation is drawn as a single row of pixels on the canvas.

## Dependencies

There are no runtime dependencies. Any recent browser with canvas support should
work (Chrome, Firefox, Edge, Safari). Older versions of Internet Explorer are
not supported.

## Development

A basic ESLint configuration is included for linting the JavaScript. Run

```bash
npm install
npm run lint
```

## License

See [LICENSE](LICENSE) for license information.
