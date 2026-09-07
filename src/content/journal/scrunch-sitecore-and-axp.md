---
title: "Scrunch, Sitecore and AXP: When Your Website Isn't Really One Website"
description: "A look at Sitecore’s Scrunch acquisition and its AXP platform, exploring AI visibility, content architecture, CMS integration and the risks of creating another version of the web."
pubDate: 2026-09-05
author: "Dean Weston"
readTime: "7"
tags: ["AI", "Content Management", "Web Governance", "Sitecore"]
---

[Sitecore acquired Scrunch](https://www.sitecore.com/company/newsroom/press-releases/2026/06/sitecore-acquires-scrunch-to-help-brands-influence-discovery--and-buying-decisions) in June 2026, and it caught my attention.

Not because I'm particularly excited by another AI acquisition — there are enough of those to keep LinkedIn supplied with rocket emojis for several years — but because [Scrunch](https://scrunch.com/) is trying to solve a genuinely interesting problem.

As more discovery moves into ChatGPT, Gemini, Perplexity and other AI platforms, organisations need to understand not only where they rank in search engines, but what AI systems actually _know_ about them.

Are you mentioned? Are competitors mentioned instead? Which sources are being cited? Is the information accurate? And, perhaps most importantly, what can you do about it?

Having recently seen Scrunch demonstrated, there's a lot I like about it.

But there's also one part that raises some interesting architectural questions: **AXP, Scrunch's Agent Experience Platform**.

## First, Scrunch looks good

The monitoring side of Scrunch makes immediate sense.

Traditional search tooling gives us a reasonably mature understanding of organic search performance. AI-generated answers are much less transparent.

Scrunch provides visibility into that emerging landscape: monitoring prompts, brand mentions, citations, competitors and the sources being used by AI platforms.

For organisations with large content estates, that's potentially very useful.

It moves the conversation beyond "we need to optimise for AI" into something measurable:

- What questions are people asking?
- What answers are they getting?
- Where does our content feature?
- Why does somebody else's content feature instead?

Scrunch describes this as observing what AI agents say and do, understanding their behaviour and then [delivering content that helps agents understand and reference a brand](https://scrunch.com/blog/agent-experience-platform).

So far, so good.

Then there's AXP.

## A website for robots

The [Scrunch Agent Experience Platform (AXP)](https://scrunch.com/platform/agent-experience/) takes things a step further.

Rather than expecting an AI agent to consume the same web page we've carefully designed for a human, AXP can detect AI traffic and deliver a version of the content specifically optimised for AI consumption.

Conceptually, it looks something like this:

**CMS → website → human**

while also providing:

**CMS → AXP → AI agent**

Scrunch describes this as delivering token-light, optimised content to AI agents at the edge while leaving the human-facing website unchanged.

There's quite a lot to like about that idea.

Modern websites aren't necessarily great sources of structured information. Navigation, presentation components, JavaScript, personalisation, tracking and decades of accumulated web cruft can sit between an agent and the information it actually wants.

Providing agents with something cleaner and more explicit is a logical evolution of structured content.

But it also creates something we need to think carefully about.

We've created **another representation of the content**.

## A slight sense of déjà vu

There's something about the idea of an AXP page that gives me a slight sense of déjà vu.

Anyone remember [AMP](https://amp.dev/)?

The problems are different and I'm not suggesting AXP is simply AMP with an AI-friendly acronym. But there's a familiar architectural pattern:

**Our existing web pages aren't ideal for a particular consumer, so we'll create another representation specifically for them.**

With AMP, the consumer was primarily the mobile web ecosystem. With AXP, it's AI agents.

And, of course, AMP worked.

What became questionable over time was whether maintaining another version of the web was the right long-term answer to the problem.

The incentives around AMP eventually changed. In 2021, [Google removed AMP as a requirement for eligibility for its Top Stories carousel](https://developers.google.com/search/blog/2021/04/more-details-page-experience), allowing ordinary web pages to appear instead.

Suddenly, maintaining a parallel representation of content became considerably less attractive.

That's worth remembering as we enter the AI-agent era.

We don't yet know what the web's relationship with AI agents will look like in five years. Today's preferred mechanism for exposing content to an agent may turn out to be foundational, transitional or completely unnecessary.

That doesn't mean we shouldn't experiment with AXP.

It does mean I'd be wary of creating too much architecture around the assumption that a separate AI-specific representation of every page is inevitably the end state.

Especially when creating that representation introduces another problem.

## Which version is the truth?

The CMS remains the source of truth.

An editor changes a piece of information, publishes it and the website updates. With AXP in the mix, the AI-facing representation also needs to update. That gives us another publishing chain:

**CMS → publish → webhook → Scrunch → regenerate AXP content**

And that's where I start putting on my slightly less fashionable architecture hat.

What happens when the webhook doesn't fire?

What happens when it fires but Scrunch doesn't receive it?

What happens when the CMS successfully publishes the human-facing page but AXP regeneration fails?

Does the previous AXP version continue to be served?

And, most importantly, **how would anybody know?**

For a marketing article that's probably an inconvenience.

For content such as prices, deadlines, entry requirements, eligibility criteria or other transactional information, it becomes a governance issue.

The rather uncomfortable possibility is:

**Human visits website → receives current information**

**AI agent requests same URL → receives yesterday's information**

That's not necessarily an argument against AXP. Distributed systems deal with synchronisation all the time.

But synchronisation needs to be designed as part of the architecture rather than treated as an implementation detail.

## Webhooks aren't the problem

I don't think webhooks themselves are particularly concerning.

They're a perfectly reasonable way of notifying another system that something has changed.

The concern is making them the **only guarantee of consistency**.

I'd want a second mechanism.

Something capable of periodically establishing:

- **This is what the authoritative website currently says.**
- **This is what AXP currently says.**
- **Do they still agree?**

That might involve recrawling, timestamps, hashes, reconciliation jobs or another approach entirely.

The implementation is less important than having a reliable fallback:

> A webhook can tell you when something has changed, but you still need a way to check that nothing has been missed.

If you're going to deliberately maintain a machine-facing representation of authoritative content, being able to detect when the two have drifted apart feels fairly fundamental.

## And then there's the small matter of the website

Enterprise websites have an unfortunate habit of not actually being _a website_.

A domain might look beautifully consistent from the outside: `www.example.com`.

Underneath it could be considerably less elegant.

There might be a traditional enterprise CMS serving most pages, a headless CMS gradually replacing it, a few React applications, WordPress installations, legacy applications nobody wants to touch and that one application running somewhere mysterious which apparently belongs to Dave.

Add a CDN such as [Cloudflare](https://www.cloudflare.com/) and the diagram starts getting interesting.

This matters because AXP content can be delivered to agents at the edge.

That's straightforward if:

**Internet → CDN → one CMS**

It's less straightforward if reality looks more like:

**Internet → CDN → several routing mechanisms → several platforms → several origins**

Some applications may follow the expected CDN route. Others may not.

And during a multi-year CMS migration, those routes are changing.

A URL served by one CMS today might be served by another tomorrow without the public URL changing at all.

From the user's perspective, nothing happened.

Architecturally, quite a lot happened.

Cloudflare itself now makes an interesting distinction between different forms of [AI bot traffic](https://developers.cloudflare.com/bots/concepts/bot/): **Search** crawlers that index content for answers, **Agents** acting in real time on behalf of users, and **Training** crawlers collecting content for model development.

That distinction matters. "AI traffic" is already becoming several different consumers with different purposes rather than a single new type of web crawler.

## CMS independence matters

This is where I think AXP becomes particularly interesting.

The ideal model shouldn't really care which CMS produced the content.

If `/products/widget` is authoritative today, it shouldn't matter whether the HTML behind it came from Sitecore, Contensis, WordPress or a small army of highly trained carrier pigeons.

AXP ultimately needs to understand that **the resource changed**, not that **Sitecore changed**.

That distinction becomes important for organisations running multiple publishing platforms or migrating between them.

A beautifully engineered CMS-specific webhook integration is considerably less beautiful if you're actively moving thousands of pages out of that CMS.

You don't want to finish one CMS migration having accidentally created the integration requirements for the next one.

## AI optimisation introduces a new governance problem

There's a wider point here beyond Scrunch.

We've spent years establishing CMS governance around the idea of a **single source of truth**.

Structured content strengthens that model.

Content lives once and is delivered to multiple places.

AI agent experiences potentially introduce another layer:

**Authoritative content → human representation**

**Authoritative content → search representation**

**Authoritative content → AI representation**

There's nothing inherently wrong with that.

Arguably, it's exactly what structured content should enable.

But each representation needs a clear and dependable relationship with the authoritative source.

Otherwise, in our enthusiasm to make content easier for machines to understand, we risk recreating a problem CMS platforms were supposed to solve in the first place:

**multiple versions of the same information.**

There's another important consideration here too: making content available to "AI" isn't necessarily a single yes/no decision.

Tools such as [Cloudflare AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/) increasingly allow website owners to see which AI services access their content and distinguish between different crawler behaviours.

That suggests the future may be less about simply making a special website for AI and more about deciding **which machines can access which authoritative content, for what purpose, and in what representation**.

## Where I've landed

I'm positive about Scrunch.

The ability to understand how organisations appear within AI-generated answers feels increasingly important, and its monitoring and analysis capabilities address a problem that traditional analytics and SEO tooling don't completely cover.

AXP is arguably the more interesting idea.

I don't think the architectural questions are reasons not to use it. They're reasons to treat it as an architectural component rather than simply switching on another marketing tool.

Before deploying something like AXP across a complex estate, I'd want to prove three things:

1. **Coverage** — can it operate consistently across all the different technologies sitting behind the domain?

2. **Freshness** — can we guarantee that AI-facing content remains synchronised with its authoritative source?

3. **Portability** — can the architecture survive the CMS underneath a URL changing?

If those answers are good, the proposition becomes considerably stronger.

But the ghost of AMP is a useful reminder not to assume that today's solution to a new class of consumer will necessarily become tomorrow's web standard.

My preference would still be for the boring answer:

**make the authoritative content well structured, machine-readable and accessible enough that different consumers can reliably derive the representation they need.**

Because the really interesting future isn't creating separate content for humans and AI.

It's creating **authoritative, structured content once and being confident that every consumer — browser, search engine, application or AI agent — receives the right representation of it.**

Which sounds suspiciously like what good content architecture was supposed to be doing all along.

And I don't particularly fancy migrating thousands of AXP pages in 2031.
