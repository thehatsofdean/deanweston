---
title: "A Weight Off My Website: Reducing the Performance Burden of Google Fonts"
description: "How self-hosting fonts with Astro 6 improved performance, reduced dependencies, and gave me more control."
pubDate: 2026-03-24
author: "Dean Weston"
readTime: "7"
tags: ["Fonts", "Performance", "Web Development", "Astro"]
---

My website is fairly lean. It’s small, static, and built with performance in mind — as you’d probably expect from a front-end developer. PageSpeed scores are strong, interactions are quick, and there’s very little unnecessary overhead.

Like most websites, there are still a few stubborn bottlenecks. The kind that sit right at the intersection of design and performance. Font loading is one of them and most people seem happy to offload handling to 3rd parties.

I currently use two Google Fonts — Merriweather and Oswald — with multiple weights for readability and hierarchy. They’re an important part of the site’s visual identity. But they also introduce a familiar set of trade-offs: additional requests, render delays, privacy issues and the ever-present risk of layout shift.

It’s frustrating. Typography is a core part of good design, yet implementing it well on the web often comes at a hidden cost.

So when Astro 6 introduced it's [built-in Fonts API](https://astro.build/blog/astro-6/#built-in-fonts-api) — promising simplified self-hosting, better defaults, and fewer moving parts — it immediately caught my attention.

## The hidden cost of Google Fonts

My background is in design, but I don’t do it day in, day out anymore — so I try not to overcomplicate things. I stick to the basics: a simple pairing of two typefaces and a limited set of weights.
Keep it simple.
There are so many beautiful, freely available typefaces now — a dream for type nerds. Google alone offers a huge catalogue. With just a couple of lines of code, you can add personality and identity to an otherwise plain website.
My initial, out-of-the-box implementation looked like this:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap"
  rel="stylesheet"
/>
```

It works. It looks good. It’s easy.

But it comes at a cost.

Anyone who has run a PageSpeed Insights report will have seen it — third-party fonts quietly showing up as one of the more stubborn performance bottlenecks.

- Additional network requests on the critical rendering path
- Delayed text rendering while fonts are fetched
- [Layout shifts as fallback fonts are swapped out](https://www.debugbear.com/blog/web-font-layout-shift)

Individually, none of these feel catastrophic. Together, they chip away at performance in ways that are easy to ignore — especially when everything still looks fine on your own machine.

That’s the trap.

Because the impact isn’t always obvious. It shows up on slower connections, less powerful devices, or under real-world conditions that don’t match your local setup.

## Design vs performance

Typography isn’t decoration. It does real work.

It defines hierarchy, sets tone, and shapes how content is read and understood. A well-chosen typeface can make a site feel calm, authoritative, playful — or completely forgettable.

That’s why designers care about it, but every typographic decision carries weight — quite literally. Each additional weight, style, or typeface increases the cost of delivering the page. More to download, more to process, more opportunity for things to arrive late or shift unexpectedly.

The more expressive your typography becomes, the more expensive it is to deliver. That creates a tension.

On one side, there’s the desire for craft — nuance, hierarchy, identity. On the other, there’s the reality of performance budgets and rendering behaviour that isn’t entirely under your control.

Most of the time, we resolve that tension by not really thinking about it. We reach for something like Google Fonts because it’s easy. It abstracts away the complexity and lets us focus on how things look, but in doing so, we also give up a degree of control.
Fonts become something that are fetched, rather than something that are part of the site itself. Once you notice that shift, it changes how you think about them.

## What I was actually loading

These observations really came from trying to understand what my own site was doing — so I took a closer look.

I was using Merriweather for body copy and Oswald for headings — a fairly [classic pairing](https://www.nngroup.com/articles/pairing-typefaces/). Clean, readable, and just enough contrast to create hierarchy.

On the surface, it felt lightweight. Just two fonts, a handful of weights.
Under the hood, it told a slightly different story.

That single `<link>` to Google Fonts doesn’t return a font file — it returns a stylesheet, which then references multiple font files. Each weight is a separate asset. Each one has to be requested, downloaded, and processed by the browser.

By the time everything had loaded, I wasn’t dealing with one request — but several.
And because those requests sit on the critical path, they directly influence how quickly the page settles into its final state.

Open DevTools and filter by “font”, and it becomes more obvious:

- Multiple .woff2 files for different weights
- Requests triggered after the initial stylesheet is fetched
- Fonts arriving just late enough to cause a visible text twitch

None of this is unusual. It’s just how web fonts work, but it does highlight something important: even a “simple” setup isn’t quite as simple as it looks.

And that’s where the doubt creeps in.

Did I really need three weights for body text?
Was I loading character sets I’d never use?
Was I optimising for flexibility rather than actual usage?

Probably.

For a site that’s otherwise small, static, and performance-focused, font loading was one of the few areas where I’d quietly accepted a bit of inefficiency — largely because it was easy to ignore.

## Astro to the rescue

At this point I think I was happy to accept that ineffiency indefinitely and seek improvements elsewhere – That was until I came across the built-in Fonts API that ships with Astro 6.

It immediately appealed — not because it introduced anything radically new, but because it removed friction. Fonts could be treated as part of the site itself, rather than something fetched from elsewhere.

No external requests. No extra moving parts. Just assets, bundled alongside everything else.
So I decided to try it.

The change itself was surprisingly small. I removed the Google Fonts `<link>` and installed the font packages locally:

```Bash
npm install @fontsource/merriweather @fontsource/oswald
```

Then imported only the weights I was actually using:

```Javascript
---
import "@fontsource/merriweather/300.css";
import "@fontsource/merriweather/400.css";
import "@fontsource/oswald/300.css";
---
```

That was essentially it.

No runtime requests to third-party services. No external stylesheets. Just fonts, served with the rest of the site.

It’s a subtle shift, but an important one. One that aligns with a broader principle of [keeping critical assets close to the site](https://csswizardry.com/2019/05/self-host-your-static-assets/) itself.

The fonts are no longer something the browser has to go out and find. They’re already there — part of the build, delivered in the same way as any other asset.

I can choose exactly which weights to include. I can avoid loading unnecessary subsets. I can see, in a very literal sense, what my typography actually costs.

It also makes the behaviour more predictable. There are fewer unknowns, fewer dependencies, fewer chances for something external to introduce delay or variability.

That doesn’t mean everything is magically perfect.

Switching to self-hosted fonts made one thing more noticeable: the font swap itself. In development, there’s a brief moment where the fallback font is replaced — a small visual twitch that wasn’t as obvious before.

But that’s not a regression. It’s just more honest.

It’s the browser doing exactly what it was always doing — just without the abstraction layer hiding it.

## Was it worth it?

From a purely technical perspective, yes.

Font loading is now simpler and more predictable. There are fewer external dependencies, fewer moving parts, and a clearer understanding of what’s actually being delivered to the browser. The fonts are part of the site — versioned, bundled, and controlled in the same way as everything else.

That alone feels like a win.

But it gets better.

I saw around a 10% improvement in [my PageSpeed Insights performance score](https://pagespeed.web.dev/analysis/https-deanweston-co-uk/6tbrihh4f7?form_factor=mobile). For a site that was already nudging the ceiling, that’s significant. A small bump I’d previously accepted as inevitable suddenly became barely noticeable.

I’m always talking about reducing reliance on third-party integrations — but often without a clear, immediate way to do it.

This was one.

Before, fonts were something I included. A line of code pointing somewhere else, abstracted behind a service designed to make it all feel effortless.

Now, they’re something I own.

I decide which weights are included. I decide what gets loaded and when. I can see the cost of those decisions more clearly — and that makes me more deliberate about them.
It’s a small change, but it removes a layer of distance between design and delivery.
And that feels important.

The modern web is full of these small abstractions. Individually, they make things easier. Collectively, they can make it harder to understand what’s really happening.

This doesn’t fix that.
But it nudges things in the right direction.
