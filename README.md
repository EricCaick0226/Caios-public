# CaiOS Public

Live Site: https://caios-public.vercel.app/

## Overview

CaiOS Public is an interactive personal website for Chengkai. It is not a normal portfolio page. It is a small personal operating system, digital diary, and interactive zine where visitors can explore different sides of me, ask questions by mode, take a casual quiz, and leave a message.

The goal is to make the site feel warm, personal, and easy to explore, like a public little map of how I think, live, learn, worry, rest, and grow.

## Why I Built This

I wanted a website that feels more honest than a resume and more interactive than a static personal page. CaiOS Public gives visitors small entry points into different parts of me: school life, anxiety, rest, memory, food, humor, and future plans.

Instead of only showing achievements, this project tries to show personality, process, and the ordinary details that explain a person.

## Features

- Hero / intro section for CaiOS Public
- Explore Me cards for different personal modes
- Ask Me by Mode with questions and answers for each mode
- "How well do you know Chengkai?" nickname quiz
- CaiOS level result based on quiz score
- Leave Chengkai a Message button powered by Tally
- Soft light UI with warm off-white background
- Floating cards, subtle accent colors, and gentle animations

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Tally form for the message link

## Project Structure

- `src/App.jsx`: Main React component. It renders the hero, Explore Me section, Ask Me by Mode section, quiz, and message section.
- `src/data.js`: Stores the Explore Me cards, mode questions, and quiz questions.
- `src/index.css`: Global Tailwind import plus small custom styles for the light theme, cards, buttons, and animations.

## How to Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Current Version

- V1 Explore Me
- V2 Ask Me by Mode
- V3 Nickname Quiz
- V4 Tally Message Link
- UI polish with a soft personal OS / digital diary style

## Future Vision

- Real message wall
- CaiOS Chat
- AI assistant based on public profile documents
- No private data and no fake "AI clone"
- The AI should only answer based on public learning path, projects, writing interests, and goals

## Notes

This project does not currently use a backend, database, authentication, or AI API.
