# Weather Dashboard

A modern, responsive weather dashboard built with **React (Vite)**, **Tailwind CSS**, and **React Query**, providing real-time weather and forecast data for any city in the world.  
This app features offline support via a **Service Worker (PWA)** and caches results for improved performance.

---

## Live Demo
[View on Vercel](https://capstone-project-sigma-eight.vercel.app/)

---

## Features

**Search by City** — Fetch current weather and 5-day forecast data  
**Real-Time Updates** — Uses OpenWeather API for live data  
**Offline Mode (PWA)** — Works even when network is lost  
**Caching** — React Query + custom caching for API optimization  
**Responsive UI** — Built with Tailwind CSS  
**Error Handling** — Graceful fallback for failed requests  
**Routing** — Multi-page setup using React Router (`Home`, `About`, `NotFound`)  

---

## Tech Stack

| Category | Tools |
|-----------|--------|
| **Frontend Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **UI Styling** | [Tailwind CSS](https://tailwindcss.com/) + [Autoprefixer](https://github.com/postcss/autoprefixer) |
| **Data Fetching** | [Axios](https://axios-http.com/) + [@tanstack/react-query](https://tanstack.com/query/latest) |
| **Routing** | [React Router DOM](https://reactrouter.com/) |
| **PWA** | Custom Service Worker (`sw.js`) + `manifest.json` |
| **Build Tool** | Vite |
| **Hosting** | [Vercel](https://vercel.com/) |

---

## Installation

### Clone this repository
```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
