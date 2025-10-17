// Simple Client-Side Router
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
        this.init();
    }

    init() {
        // Define routes
        this.routes = {
            '/': this.homePage,
            '/login': this.loginPage,
            '/register': this.registerPage,
            '/home': this.dashboardPage,
            '/calendar': this.calendarPage,
            '/events': this.eventsPage,
            '/profile': this.profilePage,
            '/settings': this.settingsPage
        };

        // Handle initial route
        this.handleRoute();
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
    }

    navigate(path) {
        // Update URL without page reload
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        this.currentRoute = path;
        
        // Get the route handler
        const handler = this.routes[path];
        
        if (handler) {
            handler.call(this);
        } else {
            // Default to home page for unknown routes
            this.homePage();
        }
    }

    homePage() {
        this.renderNavigation(['login', 'register']);
        this.renderPage('homepage');
    }

    loginPage() {
        this.renderNavigation(['home', 'register']);
        this.renderPage('login');
    }

    registerPage() {
        this.renderNavigation(['home', 'login']);
        this.renderPage('register');
    }

    dashboardPage() {
        this.renderNavigation(['logout']);
        this.renderDashboardLayout('dashboard');
    }

    calendarPage() {
        this.renderNavigation(['logout']);
        this.renderDashboardLayout('calendar');
    }

    eventsPage() {
        this.renderNavigation(['logout']);
        this.renderDashboardLayout('events');
    }

    profilePage() {
        this.renderNavigation(['logout']);
        this.renderDashboardLayout('profile');
    }

    settingsPage() {
        this.renderNavigation(['logout']);
        this.renderDashboardLayout('settings');
    }

    renderNavigation(links) {
        const nav = document.getElementById('navigation');
        const isLoggedIn = links.includes('logout');
        
        let navHTML = `
            <div class="nav-container">
                <a href="/" class="logo" onclick="router.navigate('/'); return false;">EventEcho</a>
                <ul class="nav-links">
        `;

        if (isLoggedIn) {
            navHTML += `
                <li><a href="/" onclick="router.navigate('/'); return false;">Logout</a></li>
            `;
        } else {
            links.forEach(link => {
                const linkText = link.charAt(0).toUpperCase() + link.slice(1);
                navHTML += `
                    <li><a href="/${link}" onclick="router.navigate('/${link}'); return false;">${linkText}</a></li>
                `;
            });
        }

        navHTML += `
                </ul>
            </div>
        `;

        nav.innerHTML = navHTML;
    }

    renderPage(pageName) {
        const mainContent = document.getElementById('main-content');
        
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));

        // Show the correct page
        let pageElement = document.getElementById(pageName);
        if (pageElement) {
            pageElement.classList.add('active');
        } else {
            // Create and show the page if it doesn't exist
            pageElement = this.createPage(pageName);
            mainContent.appendChild(pageElement);
            pageElement.classList.add('active');
        }
    }

    renderDashboardLayout(pageName) {
        const mainContent = document.getElementById('main-content');
        
        // Clear existing content
        mainContent.innerHTML = '';
        
        // Create dashboard layout
        const dashboardLayout = document.createElement('div');
        dashboardLayout.className = 'dashboard-layout';
        
        // Create sidebar
        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar';
        sidebar.innerHTML = this.getSidebarHTML(pageName);
        
        // Create main content area
        const contentArea = document.createElement('div');
        contentArea.className = 'main-content';
        
        // Create page content
        const pageContent = document.createElement('div');
        pageContent.id = pageName;
        pageContent.className = 'page active';
        pageContent.innerHTML = this.getPageContent(pageName);
        
        contentArea.appendChild(pageContent);
        
        // Assemble layout
        dashboardLayout.appendChild(sidebar);
        dashboardLayout.appendChild(contentArea);
        mainContent.appendChild(dashboardLayout);
        
        // Initialize page-specific functionality
        this.initializePage(pageName);
    }

    createPage(pageName) {
        const page = document.createElement('div');
        page.id = pageName;
        page.className = 'page';

        switch(pageName) {
            case 'homepage':
                page.innerHTML = this.getHomepageHTML();
                break;
            case 'login':
                page.innerHTML = this.getLoginHTML();
                break;
            case 'register':
                page.innerHTML = this.getRegisterHTML();
                break;
            case 'dashboard':
                page.innerHTML = this.getDashboardHTML();
                break;
            default:
                page.innerHTML = '<h1>Page not found</h1>';
        }

        return page;
    }

    getHomepageHTML() {
        return `
            <div class="hero">
                <h1>Welcome to EventEcho</h1>
                <p>Your premier platform for discovering and managing events. Connect with amazing experiences and create memories that last a lifetime.</p>
                <div class="button-group">
                    <a href="/login" class="btn btn-primary" onclick="router.navigate('/login'); return false;">Login</a>
                    <a href="/register" class="btn btn-secondary" onclick="router.navigate('/register'); return false;">Register</a>
                </div>
            </div>
        `;
    }

    getLoginHTML() {
        return `
            <div class="form-container">
                <h2 class="form-title">Login to EventEcho</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary form-submit">Login</button>
                </form>
                <div class="form-links">
                    <p>Don't have an account? <a href="/register" onclick="router.navigate('/register'); return false;">Register here</a></p>
                </div>
            </div>
        `;
    }

    getRegisterHTML() {
        return `
            <div class="form-container">
                <h2 class="form-title">Create Account</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required>
                    </div>
                    <button type="submit" class="btn btn-primary form-submit">Create Account</button>
                </form>
                <div class="form-links">
                    <p>Already have an account? <a href="/login" onclick="router.navigate('/login'); return false;">Login here</a></p>
                </div>
            </div>
        `;
    }

    getSidebarHTML(activePage) {
        const navItems = [
            { id: 'calendar', name: 'Calendar', icon: '📅' },
            { id: 'events', name: 'Events', icon: '🎉' },
            { id: 'profile', name: 'Profile', icon: '👤' },
            { id: 'settings', name: 'Settings', icon: '⚙️' }
        ];

        let sidebarHTML = `
            <div class="sidebar-header">
                <h2>EventEcho</h2>
                <p>Dashboard</p>
            </div>
            <ul class="sidebar-nav">
        `;

        navItems.forEach(item => {
            const activeClass = item.id === activePage ? 'active' : '';
            sidebarHTML += `
                <li>
                    <a href="/${item.id}" class="${activeClass}" onclick="router.navigate('/${item.id}'); return false;">
                        <span style="margin-right: 10px;">${item.icon}</span>
                        ${item.name}
                    </a>
                </li>
            `;
        });

        sidebarHTML += `</ul>`;
        return sidebarHTML;
    }

    getPageContent(pageName) {
        switch(pageName) {
            case 'dashboard':
                return this.getDashboardHTML();
            case 'calendar':
                return this.getCalendarHTML();
            case 'events':
                return this.getEventsHTML();
            case 'profile':
                return this.getProfileHTML();
            case 'settings':
                return this.getSettingsHTML();
            default:
                return '<h1>Page not found</h1>';
        }
    }

    initializePage(pageName) {
        if (pageName === 'calendar') {
            // Initialize FullCalendar
            setTimeout(() => {
                const calendarEl = document.getElementById('calendarContainer');
                console.log('Calendar element found:', calendarEl);
                
                if (calendarEl) {
                    // Clear any existing FullCalendar instance
                    if (window.calendarInstance) {
                        console.log('Destroying existing calendar instance');
                        window.calendarInstance.destroy();
                    }
                    
                    // Ensure the calendar element is empty
                    calendarEl.innerHTML = '';
                    
                    console.log('Creating new calendar instance');
                    
                    // Create new FullCalendar instance
                    window.calendarInstance = new FullCalendar.Calendar(calendarEl, {
                        initialView: 'dayGridMonth',
                        
                        headerToolbar: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        },

                        buttonText: {
                            today: 'Today',
                            month: 'Month',
                            week: 'Week',
                            day: 'Day'
                        },
                        height: 'auto',
                        aspectRatio: 1.8,

                        // TODO: TEST EVENTS
                        events: [
                            {
                                title: 'Team Meeting',
                                start: '2025-10-14T10:00:00',
                                backgroundColor: '#dc2626',
                                borderColor: '#b91c1c'
                            },
                            {
                                title: 'Conference',
                                start: '2025-10-14T07:00:00',
                                end: '2025-10-14T07:00:00',
                                backgroundColor: '#dc2626',
                                borderColor: '#b91c1c'
                            }
                        ],
                        eventClick: function(info) {
                            alert('Event: ' + info.event.title);
                        }
                    });
                    
                    // Render the calendar
                    window.calendarInstance.render();

                    console.log('Calendar rendered successfully');
                } else {
                    console.error('Calendar element not found!');
                }
                
                // Initialize modal handlers for calendar page
                if (typeof initializeModalHandlers === 'function') {
                    initializeModalHandlers();
                }
            }, 300);
        }
    }

    getDashboardHTML() {
        return `
            <div class="dashboard-header">
                <h1>Welcome to EventEcho!</h1>
                <p>Your personalized event management dashboard</p>
            </div>
            <div class="content-grid">
                <div class="content-box" onclick="router.navigate('/calendar'); return false;">
                    <h3>
                        <div class="content-box-icon">📅</div>
                        Calendar
                    </h3>
                    <p>View and manage your events calendar. See all your upcoming events in one place.</p>
                    <div class="content-box-footer">
                        <span>View Calendar</span>
                        <span class="content-box-arrow">→</span>
                    </div>
                </div>
                <div class="content-box" onclick="router.navigate('/events'); return false;">
                    <h3>
                        <div class="content-box-icon">🎉</div>
                        Events
                    </h3>
                    <p>Create, edit, and manage your events. Discover new events happening around you.</p>
                    <div class="content-box-footer">
                        <span>Manage Events</span>
                        <span class="content-box-arrow">→</span>
                    </div>
                </div>
                <div class="content-box" onclick="router.navigate('/profile'); return false;">
                    <h3>
                        <div class="content-box-icon">👤</div>
                        Profile
                    </h3>
                    <p>Update your profile information, preferences, and account settings.</p>
                    <div class="content-box-footer">
                        <span>Edit Profile</span>
                        <span class="content-box-arrow">→</span>
                    </div>
                </div>
                <div class="content-box" onclick="router.navigate('/settings'); return false;">
                    <h3>
                        <div class="content-box-icon">⚙️</div>
                        Settings
                    </h3>
                    <p>Configure your application preferences and notification settings.</p>
                    <div class="content-box-footer">
                        <span>Open Settings</span>
                        <span class="content-box-arrow">→</span>
                    </div>
                </div>
            </div>
        `;
    }

    getCalendarHTML() {
        return `
            <div class="dashboard-header">
                <h1>Calendar</h1>
                <p>Manage your events and view your schedule</p>
            </div>

            <!-- Calendar Controls -->
            <div class="calendar-controls">
                <button id="addEventBtn" class="btn btn-primary">Add Event</button>
                <div class="calendar-actions">
                    <button class="btn btn-secondary" onclick="router.navigate('/events'); return false;">Manage Events</button>
                    <button class="btn btn-secondary">Export Calendar</button>
                </div>
            </div>

            <!-- FIXED: Changed ID from 'calendar' to 'calendarContainer' -->
            <div class="calendar-container">
                <div class="calendar-wrapper">
                    <div id="calendarContainer"></div>
                </div>
            </div>

            <div class="calendar-info">
                <p>Click on a date to add a new event, or click on an existing event to view/edit details.</p>
            </div>
        `;
    }

    getEventsHTML() {
        return `
            <div class="dashboard-header">
                <h1>Events</h1>
                <p>Create and manage your events</p>
            </div>
            <div style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <h2>My Events</h2>
                <p>Event management features coming soon...</p>
            </div>
        `;
    }

    getProfileHTML() {
        return `
            <div class="dashboard-header">
                <h1>Profile</h1>
                <p>Manage your account information</p>
            </div>
            <div style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <h2>Profile Settings</h2>
                <p>Profile management features coming soon...</p>
            </div>
        `;
    }

    getSettingsHTML() {
        return `
            <div class="dashboard-header">
                <h1>Settings</h1>
                <p>Configure your application preferences</p>
            </div>
            <div style="background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <h2>Application Settings</h2>
                <p>Settings management features coming soon...</p>
            </div>
        `;
    }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.router = new Router();
});
