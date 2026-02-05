# Unified Operations Management Dashboard

A modern React dashboard for monitoring operations, service health, analytics, and task execution in one place. It provides an at-a-glance view of system KPIs, live status, and actionable task lists.

## What is this website used for?

This dashboard is used by operations teams to:

- Monitor critical system health (uptime, response time, error rate)
- Track operational services and resource usage (CPU, memory, disk, network)
- Review analytics trends and performance metrics
- Manage tasks and operational alerts from a single interface
- Switch views quickly for different operational functions

## Key Features

- KPI cards with animated values and trend indicators
- Interactive charts (bar, line, area, donut)
- Tasks and alerts panels
- Responsive layout for desktop/tablet/mobile
- Sidebar navigation between modules
- User menu with logout action
- Theme toggle (dark/light)

## Workflow (How it Works)

1. App loads and shows the main dashboard UI.
2. The sidebar controls which module is visible (Dashboard, Operations, Analytics, Tasks).
3. Each module renders its own data set and interactive widgets.
4. Task items can be toggled to mark completion.
5. Alerts display system issues and recent events.
6. Theme toggle switches the UI between dark and light modes.

## Project Structure

src/
  App.jsx                 Main app router and layout
  main.jsx                App entry point
  components/             UI components and pages
  context/                Auth and theme context providers
  styles/                 All component styles

## Run Locally

1. Install dependencies
   npm install

2. Start the development server
   npm run dev

3. Open in browser
   http://localhost:5173

## Notes

- This is a front-end only dashboard. Data is currently static and can be replaced with live API calls.
- You can extend modules or add new ones inside src/components.

## Future Enhancements (Optional)

- Connect real APIs for live monitoring
- Add role-based authentication and permissions
- Export analytics reports (CSV/PDF)
- Real-time alerts via WebSockets
