# EventEcho Frontend

A modern, responsive frontend for the EventEcho application built with vanilla HTML, CSS, JavaScript, python, and more.

## Features

- **Homepage**: Welcome page with login and register buttons
- **Login Page**: User authentication form
- **Register Page**: User registration form  
- **Dashboard**: User dashboard accessible after login/registration
- **Client-side Routing**: Seamless navigation without page reloads
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations

## Quick Start

### Option 1: Using the Batch File (Windows)
1. Double-click `start-server.bat`
2. Open your browser and go to `http://localhost:8080`

### Option 2: Using Python
1. Open a terminal/command prompt
2. Navigate to the Frontend directory
3. Run: `python server.py`
4. Open your browser and go to `http://localhost:8080`

### Option 3: Using any HTTP Server
You can use any HTTP server to serve the files:
- Live Server (VS Code extension)
- `python -m http.server 8080`
- `npx serve . -p 8080`

## File Structure

```
Frontend/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All CSS styles
├── js/
│   ├── router.js       # Client-side routing logic
│   └── app.js          # Application logic and form handling
├── server.py           # Python HTTP server
├── start-server.bat    # Windows batch file to start server
└── README.md           # This file
```

## How It Works

1. **Single Page Application**: The app uses a single HTML file with dynamic content loading
2. **Client-side Routing**: Navigation is handled by JavaScript without page reloads
3. **Form Handling**: Login and registration forms include validation and user feedback
4. **Responsive Design**: CSS Grid and Flexbox ensure the app works on all devices

## Pages

- `/` - Homepage with welcome message and navigation buttons
- `/login` - Login form (redirects to `/home` after submission)
- `/register` - Registration form (redirects to `/home` after submission)
- `/home` - Dashboard page (accessible after login/registration)

## Development

The frontend is built with vanilla web technologies for simplicity and performance:

- **HTML5**: Semantic markup and modern features
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript (ES6+)**: Modern JavaScript with classes and modules

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Next Steps

This is a basic wireframe. For production, consider:

1. **Backend Integration**: Connect forms to actual authentication APIs
2. **State Management**: Implement proper user session handling
3. **Error Handling**: Add comprehensive error handling and validation
4. **Testing**: Add unit and integration tests
5. **Build Process**: Implement bundling and optimization
6. **Accessibility**: Ensure WCAG compliance
