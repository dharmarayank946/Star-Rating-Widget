# VEDA Technology Web Development Internship Task 19 — Star Rating Widget

A clean, responsive, and accessible **Star Rating Widget** built strictly with **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. Designed with an elegant **light pastel green and white theme** and featuring **five large golden-yellow stars**, this widget delivers an interactive user rating experience with real-time hover previews, persistent selection, instant score feedback, keyboard navigation, and full reset capabilities. The component is 100% dependency-free, lightweight, and ready for deployment on **GitHub Pages**.

---

## 📌 Project Overview
- **Project Title:** VEDA Technology Web Development Internship Task 19 — Star Rating Widget
- **Internship Program:** VEDA Technology Web Development Internship
- **Developer:** Nagalambika D Koralli
- **Core Technologies:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Build Tools / Dependencies:** None (Zero npm, Node.js, terminal, or external third-party library dependencies)
- **Deployment Platform:** GitHub Pages
- **GitHub Repository:** [https://github.com/dharmarayank946/Star-Rating-Widget.git](https://github.com/dharmarayank946/Star-Rating-Widget.git)
- **Live Demo (GitHub Pages):** [https://dharmarayank946.github.io/Star-Rating-Widget/](https://dharmarayank946.github.io/Star-Rating-Widget/)
- **Theme Palette (Light Pastel Green & White):**
  - **Page Background:** `#F4F8F5` (Soft mint background tint)
  - **Card Background:** `#FFFFFF` (Pristine clean white)
  - **Primary Pastel Green:** `#2D6A4F` (High-contrast Forest/Sage Green, WCAG AAA compliant)
  - **Primary Hover:** `#21543E`
  - **Pastel Badge / Card Accent:** `#EAF5EE`
  - **Card & Element Borders:** `#D0E7D7` / `#E2EFE6`
  - **Focus Ring:** `0 0 0 3px rgba(45, 106, 79, 0.28)`
  - **Primary Text:** `#1C2B21` (High-contrast deep charcoal green)
  - **Secondary Text:** `#526659` (Slate green)
  - **Golden-Yellow Filled Star:** `#F59E0B` (Rich amber gold)
  - **Golden-Yellow Hover Star:** `#FBBF24` (Luminous bright gold)
  - **Golden Star Glow:** `rgba(245, 158, 11, 0.35)`
  - **Empty Star Stroke / Fill:** `#C5D8CC` stroke / `#F3F7F4` fill

---

## 🎯 Objectives
1. **Interactive Star Rating:** Display five distinct, clickable stars corresponding to integer ratings from 1 to 5.
2. **Hover Preview:** Dynamically highlight stars when the pointer hovers over any star from 1 through the hovered value.
3. **Persistent Selection:** Retain the selected star rating even after the mouse leaves the widget area.
4. **Dynamic Rating Display:** Display the active rating clearly (e.g., “Your rating: 4/5”) with contextual sentiment text.
5. **Flexible Modification:** Allow users to change or update their rating at any time by simply clicking a different star.
6. **Reset Rating:** Include a dedicated Reset Rating button that restores the widget to its unselected state.
7. **Semantic `data-value` Attributes:** Store and query star rating numbers using standard HTML5 `data-value` attributes.
8. **State Separation:** Maintain a strict architectural separation between transient hover state and committed selection state.
9. **Accessibility & Keyboard Navigation:** Provide full keyboard accessibility with arrow keys, Enter, Space, Home, and End, paired with clear focus indicators.
10. **Friendly Initial Message:** Present an inviting welcome message when no rating has yet been chosen.

---

## 🛠️ Technologies Used
- **HTML5:** Semantic architecture (`<main>`, `<section>`, `<header>`, `<footer>`, `<button>`), accessible WAI-ARIA radio group semantics (`role="radiogroup"`, `role="radio"`, `aria-checked`, `aria-label`), and inline scalable vector graphics (`<svg>`).
- **CSS3:** Custom properties (CSS variables), CSS Flexbox and Grid, high-contrast states, smooth micro-interactions, responsive media queries, and touch-optimized button targets without heavy animation overhead.
- **JavaScript (Vanilla ES6+):** Pure client-side DOM manipulation, state management, event delegation, keyboard listener events, and dynamic CSS class updates using `classList`.
- **Google Fonts:** `Plus Jakarta Sans` for clean UI typography and `JetBrains Mono` for tabular metrics and badges.

---

## ✨ Features & Requirements Breakdown

### 1. Five Clickable Stars (1 to 5)
The widget renders 5 prominent, accessible buttons representing scores 1 through 5. Each button contains an SVG vector star icon that renders crisply on any display resolution or pixel density.

### 2. Real-Time Hover Preview
Moving the cursor over any star instantly illuminates all stars from position 1 up to the targeted star in a luminous golden yellow (`#FBBF24`), providing immediate visual preview feedback without altering the previously committed rating.

### 3. Persistent Rating on Mouse Leave
When the cursor exits the stars container, the hover state resets to 0, and the widget automatically restores the user's committed rating, keeping stars 1 through `currentRating` filled in rich golden yellow (`#F59E0B`).

### 4. Live Rating & Sentiment Feedback
Below the stars, a dedicated status card updates in real time:
- **Initial:** "Please click or tap a star to set your rating"
- **1 Star:** "Your rating: 1/5" — Poor (We are sorry to hear that. We will work hard to improve!)
- **2 Stars:** "Your rating: 2/5" — Fair (Thank you for your feedback. We have room for improvement.)
- **3 Stars:** "Your rating: 3/5" — Good (Glad to know you had a positive experience!)
- **4 Stars:** "Your rating: 4/5" — Very Good (Awesome! Thank you for the positive rating.)
- **5 Stars:** "Your rating: 5/5" — Excellent (Outstanding! Thank you so much for the 5-star support!)

### 5. Seamless Rating Modification
Users can change their rating at any time by clicking any other star or pressing an arrow key. The widget smoothly updates the count, text, badge, and guide table.

### 6. Reset Rating Action
A dedicated **Reset Rating** button allows users to revert their rating back to zero. When no rating is selected, the button is gracefully disabled. When clicked, it restores the initial friendly message, resets all stars, and presents a non-intrusive confirmation toast.

### 7. HTML5 `data-value` Attributes
Each star button uses `data-value="1"` through `data-value="5"`. JavaScript reads these attributes using `getAttribute('data-value')` or `dataset.value` for clean, modular event processing.

### 8. Strict Separation of Hover and Selection States
The component architecture stores two distinct state variables:
```javascript
let currentRating = 0; // Committed rating (1-5 or 0)
let hoverRating = 0;   // Temporary preview rating (1-5 or 0)
```
Hovering never mutates `currentRating`. Only an explicit click, Space/Enter press, or arrow selection commits the new value.

### 9. Keyboard Accessibility & Clear Focus Rings
Full keyboard support complies with W3C WAI-ARIA Radio Group guidelines:
- **Tab / Shift+Tab:** Move focus smoothly into and out of the star rating component.
- **Right Arrow (→) / Down Arrow (↓):** Increment rating to next star.
- **Left Arrow (←) / Up Arrow (↑):** Decrement rating to previous star.
- **Home:** Jump immediately to Star 1.
- **End:** Jump immediately to Star 5.
- **Enter / Space:** Commit the currently focused star.
- **Focus Rings:** High-contrast `outline: 2px solid #2D6A4F` and `box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.28)` ensure clear visibility.

### 10. Friendly Initial Message & Scale Guide
Before any rating is selected, the widget displays an inviting prompt: *"Please click or tap a star to set your rating"*. In addition, a reference guide explains the meaning of each star rating level from Poor (1★) to Excellent (5★).

---

## 📂 File Structure
```
Task19-Star-Rating-Widget/
├── index.html       # Semantic HTML5 structure, ARIA radiogroup, SVG stars
├── style.css        # Pastel green & white theme, golden star styles, responsive layouts
├── script.js        # State logic, hover preview, keyboard handlers, reset
└── README.md        # Comprehensive documentation, testing steps & deployment
```

---

## 🧪 Testing & Verification Guide

Follow these step-by-step procedures to thoroughly verify all features:

### Test 1: Initial State Verification
1. Open `index.html` in your web browser.
2. Confirm the page displays with the **light pastel green background (`#F4F8F5`)** and a centered white card.
3. Verify that all 5 stars are empty (soft gray-green outline and neutral fill).
4. Verify the initial message reads: *"Please click or tap a star to set your rating"*.
5. Verify the **Reset Rating** button is disabled (`disabled="true"`).

### Test 2: Hovering to Preview Ratings
1. Move your cursor over Star 3:
   - Stars 1, 2, and 3 should turn golden yellow (`#FBBF24`) with a soft glow.
   - Stars 4 and 5 should remain empty.
   - A subtle hover preview indicator displays *"Hover Preview: 3 / 5"*.
2. Move your cursor over Star 5:
   - All 5 stars light up golden yellow.
3. Move your cursor outside the star widget:
   - All stars revert to their empty state.
   - The initial message remains unchanged.

### Test 3: Selecting a Rating (1 to 5)
1. Click **Star 4**:
   - Stars 1, 2, 3, and 4 turn solid golden yellow (`#F59E0B`).
   - The status text immediately updates to: **“Your rating: 4/5”**.
   - The sentiment text shows: **“Very Good — Awesome! Thank you for the positive rating.”**
   - The **Reset Rating** button becomes enabled.
   - Star 4 in the Rating Scale Guide is highlighted.
   - A brief green toast notification confirms: *"Rating confirmed: 4 of 5 stars!"*.
2. Move your mouse outside the card:
   - Confirm that stars 1 to 4 **remain selected** and golden yellow.

### Test 4: Changing a Rating
1. With Star 4 currently selected, click **Star 2**:
   - Stars 1 and 2 remain golden yellow; Stars 3, 4, and 5 return to empty.
   - The display updates to: **“Your rating: 2/5”** with Fair feedback.
2. Click **Star 5**:
   - All 5 stars turn golden yellow; status updates to **“Your rating: 5/5”**.

### Test 5: Reset Rating Action
1. With any rating selected, click the **Reset Rating** button.
2. Verify that:
   - All stars immediately return to their unselected state.
   - The display reverts to *"Please click or tap a star to set your rating"*.
   - The **Reset Rating** button becomes disabled again.
   - A toast notification confirms: *"Rating reset to initial state."*.

### Test 6: Keyboard Navigation & Accessibility
1. Reload the page and press <kbd>Tab</kbd> until focus enters the first star.
2. Verify the high-contrast green focus ring is clearly visible.
3. Press <kbd>→</kbd> (Right Arrow) twice to move to Star 3:
   - Focus advances and Star 3 is automatically selected.
4. Press <kbd>End</kbd>:
   - Focus jumps to Star 5 and rating is set to 5/5.
5. Press <kbd>Home</kbd>:
   - Focus jumps to Star 1 and rating is set to 1/5.
6. Press <kbd>Tab</kbd> to reach the Reset Rating button and press <kbd>Enter</kbd>:
   - The widget resets properly.

### Test 7: Mobile Responsiveness
1. Open Developer Tools (<kbd>F12</kbd>) and switch to Device Mode.
2. Test viewport widths at **375px (iPhone SE/13)**, **414px (iPhone XR)**, and **768px (iPad)**.
3. Verify stars remain comfortably sized (minimum 40px touch targets), text wraps cleanly, and no horizontal scrollbars appear.

---

## 🚀 GitHub Pages Deployment Instructions

To publish this project to GitHub Pages:

1. **Initialize Git Repository (if not already initialized):**
   ```bash
   cd Task19-Star-Rating-Widget
   git init
   git add .
   git commit -m "feat: initial commit for Task 19 Star Rating Widget"
   ```

2. **Add Remote GitHub Repository:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/dharmarayank946/Star-Rating-Widget.git
   ```

3. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Navigate to your repository on GitHub: `https://github.com/dharmarayank946/Star-Rating-Widget`
   - Go to **Settings** > **Pages** (under Code and automation).
   - Under **Build and deployment** > **Branch**, select `main` and `/ (root)` folder.
   - Click **Save**.
   - Your live website will be accessible within 1–2 minutes at:
     **`https://dharmarayank946.github.io/Star-Rating-Widget/`**

---

## 👨‍💻 Developer Information
- **Intern:** Nagalambika D Koralli
- **Organization:** VEDA Technology
- **Internship Track:** Web Development Internship
- **Task Number:** Task 19 — Star Rating Widget
- **Submission Date:** October 2026
