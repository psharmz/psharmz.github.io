# StudyHall Design System

Phosphor-green terminal aesthetic: near-black surfaces, one accent colour,
hard pixel corners, a pixel face for headings and a monospace face for UI.
Extracted from the StudyHall game (`src/styles.css`).

## Files

| File | What it is |
| --- | --- |
| `index.html` | Live style guide: open in a browser. Colours, type, buttons, components, click-to-replay animations. |
| `tokens.css` | CSS custom properties (colour, type, spacing, radius, elevation, motion) + Google Fonts import. |
| `tokens.json` | The same tokens as JSON, for Figma / Style Dictionary / JS. |
| `animations.css` | All 34 `@keyframes` from the game plus `.anim-*` utility classes. Respects `prefers-reduced-motion`. |
| `illustrations.css` | Animation hooks for the inline-SVG illustrations (wheel spin, ear twitch, drink drain, flower bloom). |
| `illustrations/` | 18 pixel-art illustrations and icons as standalone SVG (hamsters, soda cup, thought bubble, classroom, dial, card sprite, icons). |
| `png/` | The same 18 as transparent PNGs, scaled up with hard pixel edges. |
| `photos/` | `image-no-text.png`: the raster photo asset. |
| `components.css` | Card, title bar, buttons, tabs, option list, timer, chips, bubble, pop-up window, CRT backdrop (`sh-` prefixed). |

## Use in another project

```html
<link rel="stylesheet" href="design-system/tokens.css">
<link rel="stylesheet" href="design-system/animations.css">
<link rel="stylesheet" href="design-system/components.css">

<button class="sh-btn">Start</button>
<h1 class="pixel anim-heading-boot">HELLO</h1>
```

Add `<div class="sh-crt"></div>` as the first child of `<body>` for the CRT
scanline backdrop.

## Principles

- **One accent.** Green (`--green`) is text, border and hover fill. Red and amber only signal time pressure or score tone. Purple is for pop-up windows.
- **Hover inverts.** Outlined control → filled green with black text, 0.15s.
- **Hard edges.** Radius is 0 by default; 6px for windows and bubbles; pills only for chips.
- **Stepped motion.** Most loops use `steps()` easing for a low-frame-rate feel. Entrances are short (0.2–0.4s) fade + 2–6px rise.
- **Pixel type is for headings and numerals only.** Body copy is always JetBrains Mono.

## Illustrations

All pixel art is a grid of `<rect>` elements with `shape-rendering: crispEdges`.
Use the `.svg` files with `<img>` for static display. To animate, inline the
SVG and add `illustrations.css`: wrap `hamster-wheel` as-is for the spinning
wheel, add `.is-twitching` on the wrapper for the mini hamster's ear/nose, and
the soda cup, thought bubble and flowers animate on their own classes.
Scale rasters with `image-rendering: pixelated`.

The card artwork (Study_Hall_Cards.zip, the PDF offline guide) is not part of this package.
