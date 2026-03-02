# Dean Weston — Personal Website

## Source code for deanweston.co.uk.

This site is intentionally simple in its output, but deliberate in its structure and performance characteristics. It acts both as a personal portfolio and as a sandbox for architectural thinking around scalable front-end systems.

______

## Overview

This project represents a shift from page-level front-end work toward system-level thinking:

- Sustainable CSS architecture
- Performance-first asset strategy
- Progressive enhancement
- Accessible component patterns
- Minimal JavaScript by default
- The goal is not complexity — it is clarity, maintainability and longevity.

## Philosophy

Good digital work isn’t just how something looks on launch day.
It’s how well it adapts and survives in year three.

This site follows a few core principles:

- No unnecessary frameworks
- Minimal runtime JavaScript
- Lean CSS with clear responsibility
- Static-first architecture
- Build tooling only where it adds real value

The current implementation is intentionally static. Future iterations may explore Astro or 11ty, but only where content modelling or maintainability justifies it.

## Performance Approach

- Optimised image formats (WebP)
- Intentional preload strategy for critical assets
- No heavy JS frameworks
- Avoidance of unnecessary polyfills (Modernizr removed)
- Minimal dependency footprint

The aim is predictable, fast loading across real-world networks.

## Accessibility

- Semantic HTML structure
- Sensible heading hierarchy
- Progressive enhancement principles
- Avoidance of JS-dependent core interactions

Accessibility is treated as a baseline requirement, not an afterthought.

## Tech Stack

Current stack:

- HTML5
- Modern CSS (custom properties, grid, flexbox)
- Vanilla JavaScript
- Git for version control

Deliberately no:

- jQuery
- CSS frameworks
- UI libraries
- Runtime-heavy tooling

This is intentional restraint rather than omission.

## License

All rights reserved.
Content and design are not licensed for reuse.
