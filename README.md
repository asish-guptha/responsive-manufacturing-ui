# Mangalam Pipes - Responsive Frontend UI

A fully responsive, pixel-perfect frontend landing page built from scratch based on strict Figma design specifications. This project demonstrates advanced frontend architecture, fluid CSS grid layouts, and complex DOM manipulation using pure vanilla HTML, CSS, and JavaScript (No frameworks or libraries).


## ✨ Key Features

* **Smart Sticky Action Bar:** A custom JavaScript scroll-tracker that intelligently hides the main navigation on down-scrolls to maximize reading space, and smoothly docks a "Quick Action" product bar to the top of the screen.
* **E-Commerce Image Zoom:** Built a custom JavaScript event listener that tracks cursor coordinates (`getCursorPos`) to render a high-resolution, magnifying-glass zoom effect over product images.
* **Infinite Marquee Carousel:** Utilized CSS keyframes and JavaScript to create an auto-looping, interactive testimonials track.
* **Advanced Responsiveness:** Engineered fluid layouts that scale perfectly across 6 specific design breakpoints (1240px, 1200px, 1080px, 800px, 480px, and 360px).
* **Component Morphing:** Used CSS media queries and `isolation: isolate` to completely transform horizontal desktop flowchart UI elements into vertical, swipeable mobile cards.
* **Dynamic Form Validation:** JavaScript-driven modals that evaluate input validity in real-time, enforcing constraints before enabling submission actions.

## 🛠️ Tech Stack

* **HTML5:** Semantic architecture and accessible form inputs.
* **CSS3:** Custom variables, CSS Grid, Flexbox, hardware-accelerated animations (`transform`, `transition`), and strict `aspect-ratio` enforcement.
* **JavaScript (ES6+):** Pure vanilla JS for state management, scroll detection, mathematical coordinate mapping, and DOM manipulation.

## 📂 File Structure

```text
├── index.html        # Main HTML structure
├── css/
│   └── styles.css    # All styling, responsiveness, and overrides
├── js/
│   └── script.js     # Interactivity, modals, zoom, and carousels
└── assets/
    ├── images/       # Product and background images
    └── icons/        # SVG and PNG icons
    

⚙️ Local Installation & Setup
To view this project locally on your machine:

1. Clone this repository: git clone [https://github.com/asish-guptha/responsive-manufacturing-ui.git](https://github.com/asish-guptha/responsive-manufacturing-ui.git)

2. Navigate into the project directory: cd responsive-manufacturing-ui

3. Open index.html in your browser, or for the best experience, use a local server like the Live Server extension in VS Code.

🧠 Technical Challenges Overcome
Browser Clipping Bugs: Successfully bypassed Webkit hardware-acceleration bugs where images bleed through border-radius wrappers by utilizing CSS isolation: isolate and !important rule overrides.

Positioning Escapes: Managed complex z-index stacking contexts to ensure the frosted-glass modals perfectly overlay the smart-sticky headers without visual clipping.