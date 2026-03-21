# Discrete Math Truth Table Generator

A lightweight, web-based logic engine that parses propositional logic expressions and dynamically generates step-by-step truth tables. Built as a final project for Discrete Mathematics 2.

**[View Live Demo](https://whyburrito.github.io/Truth-Table-Generator/)**

## Features

* **Custom Logic Parser:** Implements Edsger Dijkstra's Shunting-yard algorithm to convert standard infix notation into Reverse Polish Notation (Postfix) for accurate evaluation of logical precedence.
* **Step-by-Step Evaluation:** Doesn't just show the final answer. The engine breaks down complex propositions and displays intermediate sub-expressions as individual columns.
* **Automatic Classification:** Analyzes the final output column to automatically classify the proposition as a **Tautology**, **Contradiction**, or **Contingency**.
* **On-Screen Keyboard:** Ensures strict syntax control and prevents input errors by providing dedicated buttons for standard discrete math symbols (`¬`, `∧`, `∨`, `→`, `↔`).
* **Clipboard Export:** Formats the generated truth table into a clean, plain-text layout that can be copied to the clipboard with one click for easy pasting into homework documents.

## Tech Stack

* **HTML5:** Semantic structure.
* **CSS3:** Custom "Pastel Cloud" UI featuring soft gradients, glassmorphism, and responsive design without external CSS frameworks.
* **Vanilla JavaScript:** All tokenization, parsing, and truth table generation logic is handled natively on the client side.

## How to Run Locally

Since this application is entirely client-side, it requires no build tools, dependencies, or local servers.

1. Clone the repository or download the `.zip` file.
2. Ensure `index.html`, `styles.css`, and `logic.js` are in the same directory.
3. Open `index.html` in any modern web browser.

## Logic Symbol Key

| Symbol | Operation | Precedence |
| :---: | :--- | :---: |
| `¬` | NOT (Negation) | Highest (4) |
| `∧` | AND (Conjunction) | High (3) |
| `∨` | OR (Disjunction) | Medium (2) |
| `→` | IMPLIES (Conditional) | Low (1) |
| `↔` | IFF (Biconditional) | Lowest (0) |
