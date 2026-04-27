# caIos Public

Live Site: https://caios-public.vercel.app/

GitHub Repo: https://github.com/EricCaick0226/Caios-public

## Overview

caIos Public is a warm interactive personal space for Chengkai. It is not a corporate portfolio. It is closer to a soft personal OS, digital diary, and interactive zine where visitors can explore small parts of Chengkai through cards, prompts, a friend-check quiz, unlocks, and a message form.

Think: public save file, soft iOS widget, tiny Nintendo menu, and a little bit of daily-life lore.

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Tally form
- GitHub
- Vercel

## Features

- Hero / Intro with the `caIos` brand and styled `I` logo detail
- Explore Me widget cards:
  - NYU Map
  - Background App
  - Recovery Protocol
  - Old Save File
  - Food Battery
- Ask Me by Mode with small Chengkai-specific prompts and answers
- Friend Check Quiz with nickname input and 10 casual questions
- Quiz result levels:
  - caIos Visitor
  - caIos Observer
  - caIos Friend
  - caIos Core Member
- caIos Unlocks:
  - session-only hidden achievements
  - Nintendo-style achievement toast
  - achievement log section
  - resets on refresh
- Message section powered by Tally:
  - https://tally.so/r/ODjV6k
- Subtle scroll reveal animations using IntersectionObserver
- Reduced-motion support through `prefers-reduced-motion`

## Design Direction

- Minimal Nintendo + soft iOS feeling
- Warm off-white background
- Floating soft cards
- Gentle amber, sky, rose, and sage accents
- Personal, warm, funny, and simple
- No cyberpunk dashboard
- No AI startup landing page energy

## Local Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Current Status

The current version includes the hero, Explore Me, Ask Me by Mode, Friend Check Quiz, caIos Unlocks, Tally message link, and scroll animations.

This project intentionally has:

- No backend
- No database
- No AI API
- No authentication
- No persistent tracking
- No `localStorage` for unlocks

Unlocks only live during the current visit and reset on refresh.

## Deployment

The project is pushed to GitHub `main` and deployed through Vercel.
