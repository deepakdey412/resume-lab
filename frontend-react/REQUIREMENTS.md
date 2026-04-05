# Frontend Requirements

## System Requirements

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (comes with Node.js)
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## Dependencies

All dependencies are managed through npm (package.json). Key dependencies include:

### Core Framework
- **React**: ^18.2.0
- **React DOM**: ^18.2.0
- **React Router DOM**: ^6.20.0 (routing)

### UI Framework & Styling
- **Bootstrap**: ^5.3.2
- **React Bootstrap**: ^2.9.1

### HTTP Client
- **Axios**: ^1.6.2 (API requests)

### Data Visualization
- **Recharts**: ^2.10.3 (charts and graphs)

### Animations
- **@lottiefiles/dotlottie-react**: ^0.6.0 (Lottie animations)
- **react-type-animation**: ^3.2.0 (typing animations)

### Build Tools (Dev Dependencies)
- **Vite**: ^5.0.8 (build tool and dev server)
- **@vitejs/plugin-react**: ^4.2.1
- **@types/react**: ^18.2.43
- **@types/react-dom**: ^18.2.17

## Installation

Install all dependencies by running:

```bash
npm install
```

## Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` or `http://localhost:5174`

## Build for Production

Create a production build:

```bash
npm run build
```

The build output will be in the `dist` folder.

## Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Browser Compatibility

The application is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Configuration

- API base URL is configured in `src/api/axiosConfig.js`
- Default backend URL: `http://localhost:8081`
- Update this if your backend runs on a different port
