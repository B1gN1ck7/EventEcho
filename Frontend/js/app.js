// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form handlers
    initializeFormHandlers();
});

function initializeFormHandlers() {
    // We'll add event listeners dynamically when forms are created
    // This ensures forms work even when loaded via router
    document.addEventListener('submit', handleFormSubmit);
    
    // Initialize modal functionality
    initializeModalHandlers();
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formId = form.id;
    
    if (formId === 'loginForm') {
        handleLogin(form);
    } else if (formId === 'registerForm') {
        handleRegister(form);
    } else if (formId === 'eventForm') {
        handleCreateEvent(form);
    }
}

function handleLogin(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Basic validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Simulate login process
    showLoading('Logging in...');
    
    // Simulate API call delay
    setTimeout(() => {
        hideLoading();
        
        // For demo purposes, always redirect to dashboard
        // In a real app, you would validate credentials with the backend
        window.router.navigate('/home');
        
        // Show success message
        showSuccess('Login successful! Welcome to EventEcho.');
        
    }, 1500);
}

function handleRegister(form) {
    const formData = new FormData(form);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    // Simulate registration process
    showLoading('Creating account...');
    
    // Simulate API call delay
    setTimeout(() => {
        hideLoading();
        
        // For demo purposes, always redirect to dashboard
        // In a real app, you would create the account via the backend
        window.router.navigate('/home');
        
        // Show success message
        showSuccess('Account created successfully! Welcome to EventEcho.');
        
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.error-toast');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error toast
    const errorToast = document.createElement('div');
    errorToast.className = 'error-toast toast';
    errorToast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">❌</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(errorToast);
    
    // Show toast
    setTimeout(() => {
        errorToast.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorToast.classList.remove('show');
        setTimeout(() => {
            errorToast.remove();
        }, 300);
    }, 5000);
}

function showSuccess(message) {
    // Remove any existing success messages
    const existingSuccess = document.querySelector('.success-toast');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Create success toast
    const successToast = document.createElement('div');
    successToast.className = 'success-toast toast';
    successToast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">✅</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(successToast);
    
    // Show toast
    setTimeout(() => {
        successToast.classList.add('show');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        successToast.classList.remove('show');
        setTimeout(() => {
            successToast.remove();
        }, 300);
    }, 3000);
}

function showLoading(message) {
    // Remove any existing loading messages
    const existingLoading = document.querySelector('.loading-toast');
    if (existingLoading) {
        existingLoading.remove();
    }
    
    // Create loading toast
    const loadingToast = document.createElement('div');
    loadingToast.className = 'loading-toast toast';
    loadingToast.innerHTML = `
        <div class="toast-content">
            <span class="toast-spinner"></span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(loadingToast);
    
    // Show toast
    setTimeout(() => {
        loadingToast.classList.add('show');
    }, 100);
}

function hideLoading() {
    const loadingToast = document.querySelector('.loading-toast');
    if (loadingToast) {
        loadingToast.classList.remove('show');
        setTimeout(() => {
            loadingToast.remove();
        }, 300);
    }
}

// Add toast styles to the page
const toastStyles = `
    .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        padding: 1rem 1.5rem;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        min-width: 300px;
    }
    
    .toast.show {
        transform: translateX(0);
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .toast-icon {
        font-size: 1.2rem;
    }
    
    .toast-message {
        font-weight: 500;
        color: #333;
    }
    
    .error-toast {
        border-left: 4px solid #e74c3c;
    }
    
    .success-toast {
        border-left: 4px solid #27ae60;
    }
    
    .loading-toast {
        border-left: 4px solid #dc2626;
    }
    
    .toast-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #dc2626;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject toast styles
const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

// Modal functionality
function initializeModalHandlers() {
    // Handle Add Event button click
    document.addEventListener('click', (e) => {
        if (e.target.id === 'addEventBtn') {
            openEventModal();
        }
        
        // Handle close button
        if (e.target.classList.contains('close') || e.target.id === 'cancelBtn') {
            closeEventModal();
        }
        
        // Handle modal backdrop click
        if (e.target.id === 'eventModal') {
            closeEventModal();
        }
        
        // Handle toggle buttons
        if (e.target.classList.contains('toggle-btn')) {
            handleToggleButton(e.target);
        }
    });
}

function openEventModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function handleToggleButton(button) {
    const dataFormat = button.getAttribute('data-format');
    const dataToggle = button.getAttribute('data-toggle');
    
    if (dataFormat) {
        // Handle time format toggle
        const formatButtons = document.querySelectorAll(`[data-format="${dataFormat}"]`);
        const otherFormatButtons = document.querySelectorAll(`[data-format]:not([data-format="${dataFormat}"])`);
        
        formatButtons.forEach(btn => btn.classList.add('active'));
        otherFormatButtons.forEach(btn => btn.classList.remove('active'));
    } else if (dataToggle) {
        // Handle other toggles (All day, RSVP)
        button.classList.toggle('active');
    }
}

function handleCreateEvent(form) {
    const formData = new FormData(form);
    const eventTitle = formData.get('eventTitle');
    const eventDescription = formData.get('eventDescription');
    const eventDate = formData.get('eventDate');
    const eventLocation = formData.get('eventLocation');
    const startTime = formData.get('startTime');
    const endTime = formData.get('endTime');
    
    // Basic validation
    if (!eventTitle || !eventDate) {
        showError('Please fill in required fields');
        return;
    }
    
    // Simulate event creation
    showLoading('Creating event...');
    
    setTimeout(() => {
        hideLoading();
        showSuccess('Event created successfully!');
        form.reset();
        closeEventModal();
        
        // Here you would typically refresh the calendar or add the event to it
        // For now, we'll just show a success message
    }, 1500);
}
