// Login Page Scripts - Mockup Version

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const voiceLoginBtn = document.getElementById('voiceLogin');
    const googleLoginBtn = document.getElementById('googleLogin');
    
    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading animation
            const submitBtn = this.querySelector('.login-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Entering Portal...</span>';
            submitBtn.disabled = true;
            
            // Simulate login delay
            setTimeout(() => {
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
    
    // Voice Login
    if (voiceLoginBtn) {
        voiceLoginBtn.addEventListener('click', function() {
            // Create voice authentication modal
            showVoiceAuth();
        });
    }
    
    // Google Login (instant for mockup)
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            this.innerHTML = '<span>Authenticating...</span>';
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 800);
        });
    }
    
    // Add "Continue as Guest" option for mockup
    addGuestOption();
});

// Add guest continue option
function addGuestOption() {
    const loginFooter = document.querySelector('.login-footer');
    if (loginFooter) {
        const guestDiv = document.createElement('div');
        guestDiv.className = 'guest-continue';
        guestDiv.innerHTML = `
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(50, 22, 98, 0.1);">
                <button class="guest-btn" onclick="continueAsGuest()">
                    <svg viewBox="0 0 24 24" width="16" height="16" style="margin-right: 8px;">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                    </svg>
                    Continue to Demo Dashboard
                </button>
                <p style="margin-top: 10px; font-size: 11px; color: #999; text-align: center;">
                    This is a mockup demonstration
                </p>
            </div>
        `;
        loginFooter.appendChild(guestDiv);
    }
}

// Continue as guest function
function continueAsGuest() {
    const btn = event.target.closest('.guest-btn');
    btn.innerHTML = '<span>Loading Demo...</span>';
    btn.disabled = true;
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 500);
}

// Voice Authentication Modal
function showVoiceAuth() {
    const modal = document.createElement('div');
    modal.className = 'voice-auth-modal';
    modal.innerHTML = `
        <div class="voice-auth-content">
            <div class="voice-auth-animation">
                <div class="pulse-ring"></div>
                <div class="pulse-ring" style="animation-delay: 0.5s"></div>
                <div class="pulse-ring" style="animation-delay: 1s"></div>
                <svg viewBox="0 0 24 24" width="48" height="48">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="#321662"/>
                </svg>
            </div>
            <h3>Say "This is [Your Name]"</h3>
            <p>Voice authentication in progress...</p>
            <button class="cancel-voice-btn" onclick="closeVoiceAuth()">Cancel</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-authenticate after 3 seconds (mockup)
    setTimeout(() => {
        const content = modal.querySelector('.voice-auth-content');
        content.innerHTML = `
            <div class="voice-success">
                <svg viewBox="0 0 24 24" width="64" height="64">
                    <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
                    <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" fill="none"/>
                </svg>
                <h3>Voice Recognized</h3>
                <p>Welcome back, Rod</p>
            </div>
        `;
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 3000);
}

function closeVoiceAuth() {
    const modal = document.querySelector('.voice-auth-modal');
    if (modal) {
        modal.remove();
    }
}

// Add styles for guest button and voice modal
const style = document.createElement('style');
style.textContent = `
    .guest-btn {
        width: 100%;
        padding: 12px 20px;
        background: transparent;
        color: var(--primary-purple);
        border: 2px dashed var(--primary-purple);
        border-radius: 8px;
        font-size: 14px;
        font-family: 'Georgia', serif;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .guest-btn:hover {
        background: var(--primary-purple);
        color: white;
        border-style: solid;
    }
    
    .guest-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .voice-auth-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    }
    
    .voice-auth-content {
        background: white;
        padding: 48px;
        border-radius: 16px;
        text-align: center;
        max-width: 400px;
        animation: slideUp 0.3s ease;
    }
    
    .voice-auth-animation {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto 24px;
    }
    
    .pulse-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        border: 2px solid var(--primary-purple);
        border-radius: 50%;
        animation: pulse 2s ease-out infinite;
        opacity: 0;
    }
    
    .voice-auth-animation svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
    
    .voice-auth-content h3 {
        color: var(--primary-purple);
        margin-bottom: 8px;
        font-weight: 300;
        font-size: 24px;
    }
    
    .voice-auth-content p {
        color: var(--text-secondary);
        margin-bottom: 24px;
    }
    
    .cancel-voice-btn {
        padding: 10px 24px;
        background: transparent;
        border: 1px solid var(--border-subtle);
        border-radius: 6px;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .cancel-voice-btn:hover {
        background: var(--parchment);
        border-color: var(--primary-purple);
    }
    
    .voice-success {
        animation: fadeIn 0.3s ease;
    }
    
    .voice-success svg {
        margin-bottom: 16px;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
        100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
    }
`;
document.head.appendChild(style);