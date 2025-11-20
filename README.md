# Six Seven Days From Now

A single-page web application that displays historical events from Wikipedia for a date 67 days in the future.

## What It Does

- Calculates the date 67 days from today
- Fetches historical events from the Wikipedia "On This Day" API for that date
- Displays events in four categories:
  - Holidays & Observances
  - Notable Births
  - Notable Deaths
  - Historical Events
- Shows images from Wikipedia when available
- Caches data in localStorage to minimize API calls

## Features

- **Responsive Design**: Masonry grid layout on desktop that collapses to single column on mobile
- **Accordion Interface**: Expand/collapse each category (Holidays expanded by default)
- **Smart Image Placement**: Events with images are sorted first to create a visually cohesive layout
- **Daily Auto-Update**: Automatically clears old cached data when the date changes
- **Custom Web Component**: Built with vanilla JavaScript using Shadow DOM for encapsulation

## Tech Stack

- Vanilla JavaScript (no frameworks)
- Web Components API
- Wikipedia REST API
- localStorage for caching
- CSS Grid for responsive layout
- Hosted on Vercel

## Project Structure

```
/public
  ├── index.html              # Minimal wrapper
  └── six-seven-days-from-now.js  # Custom web component
vercel.json                   # Vercel configuration
```

## Deployment

This project is configured for deployment on Vercel as a static site.
