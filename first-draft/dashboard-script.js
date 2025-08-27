// Dashboard Scripts - Host Portal

document.addEventListener('DOMContentLoaded', function() {
    initializeVoiceInput();
    initializeMockNotifications();
    initializeQuickActions();
    initializeFilters();
    simulateAIActivity();
    initializeMobileMenu();
    handleResponsiveFeatures();
});

// Voice Input Functionality
function initializeVoiceInput() {
    const voiceBtn = document.getElementById('voiceInputBtn');
    const voiceOverlay = document.getElementById('voiceOverlay');
    const stopVoiceBtn = document.getElementById('stopVoiceBtn');
    const transcript = document.getElementById('voiceTranscript');
    const aiState = document.getElementById('aiState');
    
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            voiceOverlay.classList.add('active');
            aiState.textContent = 'Listening...';
            aiState.style.color = '#4CAF50';
            
            // Simulate voice recognition
            simulateVoiceRecognition(transcript);
        });
    }
    
    if (stopVoiceBtn) {
        stopVoiceBtn.addEventListener('click', () => {
            voiceOverlay.classList.remove('active');
            aiState.textContent = 'Ready to help';
            aiState.style.color = '';
            
            // Process the "recorded" text
            processVoiceInput(transcript.textContent);
        });
    }
}

// Simulate voice recognition (mockup)
function simulateVoiceRecognition(transcriptElement) {
    const sampleTexts = [
        "Contractors must remove shoes at entrance",
        "The WiFi password is NYC2025fix",
        "Check-in time is after 3 PM",
        "The plumber needs access to unit 4B tomorrow",
        "Add a rule about quiet hours after 10 PM",
        "The thermostat should stay between 68 and 72 degrees"
    ];
    
    let currentText = "";
    const targetText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (charIndex < targetText.length) {
            currentText += targetText[charIndex];
            transcriptElement.textContent = currentText;
            charIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
}

// Process voice input
function processVoiceInput(text) {
    if (!text) return;
    
    // Add to activity list
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        const newActivity = document.createElement('div');
        newActivity.className = 'activity-item';
        newActivity.innerHTML = `
            <div class="activity-icon voice">
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="white"/>
                </svg>
            </div>
            <div class="activity-content">
                <div class="activity-title">Voice note added</div>
                <div class="activity-desc">"${text}"</div>
                <div class="activity-time">Just now</div>
            </div>
            <button class="activity-action">Apply</button>
        `;
        
        activityList.insertBefore(newActivity, activityList.firstChild);
        
        // Add fade-in animation
        newActivity.style.opacity = '0';
        newActivity.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            newActivity.style.transition = 'all 0.3s ease';
            newActivity.style.opacity = '1';
            newActivity.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // Show success notification
    showNotification('Voice note captured successfully');
}

// Mock notifications
function initializeMockNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            showNotificationPanel();
        });
    }
}

// Show notification panel
function showNotificationPanel() {
    const panel = document.createElement('div');
    panel.className = 'notification-panel';
    panel.innerHTML = `
        <div class="notification-header">
            <h3>Notifications</h3>
            <button onclick="this.closest('.notification-panel').remove()">×</button>
        </div>
        <div class="notification-list">
            <div class="notification-item">
                <div class="notification-icon contractor">C</div>
                <div class="notification-content">
                    <div class="notification-title">Plumber arrived</div>
                    <div class="notification-text">John from ABC Plumbing checked in at 9:15 AM</div>
                    <div class="notification-time">15 minutes ago</div>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon guest">G</div>
                <div class="notification-content">
                    <div class="notification-title">New booking confirmed</div>
                    <div class="notification-text">Sarah Johnson - March 15-20</div>
                    <div class="notification-time">1 hour ago</div>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon system">S</div>
                <div class="notification-content">
                    <div class="notification-title">Manual updated</div>
                    <div class="notification-text">AI suggested 3 improvements to your house rules</div>
                    <div class="notification-time">3 hours ago</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
    
    // Add styles
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification-panel {
                position: fixed;
                top: 70px;
                right: 20px;
                width: 380px;
                background: white;
                border: 1px solid var(--border-subtle);
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                z-index: 999;
                animation: slideDown 0.3s ease;
            }
            
            @keyframes slideDown {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .notification-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                border-bottom: 1px solid var(--border-subtle);
            }
            
            .notification-header h3 {
                font-size: 16px;
                color: var(--primary-purple);
                font-weight: 300;
            }
            
            .notification-header button {
                background: none;
                border: none;
                font-size: 24px;
                color: var(--text-secondary);
                cursor: pointer;
            }
            
            .notification-list {
                max-height: 400px;
                overflow-y: auto;
            }
            
            .notification-item {
                display: flex;
                gap: 12px;
                padding: 16px 20px;
                border-bottom: 1px solid var(--border-subtle);
                transition: background 0.3s ease;
            }
            
            .notification-item:hover {
                background: var(--parchment);
            }
            
            .notification-item:last-child {
                border-bottom: none;
            }
            
            .notification-icon {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: bold;
                color: white;
            }
            
            .notification-icon.contractor {
                background: var(--sacred-gold);
            }
            
            .notification-icon.guest {
                background: var(--primary-purple);
            }
            
            .notification-icon.system {
                background: #4CAF50;
            }
            
            .notification-content {
                flex: 1;
            }
            
            .notification-title {
                font-size: 14px;
                color: var(--text-primary);
                margin-bottom: 4px;
                font-weight: 500;
            }
            
            .notification-text {
                font-size: 13px;
                color: var(--text-secondary);
                margin-bottom: 4px;
            }
            
            .notification-time {
                font-size: 11px;
                color: #999;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto-close on outside click
    setTimeout(() => {
        document.addEventListener('click', function closePanel(e) {
            if (!panel.contains(e.target) && !e.target.closest('#notificationBtn')) {
                panel.remove();
                document.removeEventListener('click', closePanel);
            }
        });
    }, 100);
}

// Quick Actions
function initializeQuickActions() {
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.action-card');
            const title = card.querySelector('.action-title').textContent;
            
            if (title.includes('Emergency')) {
                showEmergencyShare();
            } else if (title.includes('Manual')) {
                showManualCreator();
            } else if (title.includes('Schedule')) {
                showScheduler();
            }
        });
    });
}

// Show emergency share modal
function showEmergencyShare() {
    showNotification('Emergency access link copied: rod.house/emergency/4B-temp-2h');
}

// Show manual creator
function showManualCreator() {
    const aiState = document.getElementById('aiState');
    aiState.textContent = 'Preparing manual creator...';
    setTimeout(() => {
        aiState.textContent = 'Ready to create manual';
        showNotification('Manual creator opened. Start by describing your property.');
    }, 1000);
}

// Show scheduler
function showScheduler() {
    showNotification('Calendar view opened for scheduling');
}

// Initialize filters
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            // Filter logic would go here
            const filter = this.textContent.toLowerCase();
            showNotification(`Filtering by: ${filter}`);
        });
    });
}

// Simulate AI activity
function simulateAIActivity() {
    const aiState = document.getElementById('aiState');
    const states = [
        'Ready to help',
        'Processing updates...',
        'Analyzing patterns...',
        'Learning preferences...',
        'Optimizing manual...',
        'Ready to help'
    ];
    
    let stateIndex = 0;
    setInterval(() => {
        aiState.textContent = states[stateIndex];
        stateIndex = (stateIndex + 1) % states.length;
    }, 5000);
}

// Show notification toast
function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Add styles if not present
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .notification-toast {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: var(--primary-purple);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 9999;
                animation: slideUp 0.3s ease forwards, slideDown 0.3s ease 2.7s forwards;
            }
            
            @keyframes slideUp {
                to { transform: translateX(-50%) translateY(0); }
            }
            
            @keyframes slideDown {
                to { transform: translateX(-50%) translateY(100px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Handle PDF upload
document.addEventListener('click', function(e) {
    if (e.target.closest('#uploadBtn')) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf';
        input.onchange = function(event) {
            const file = event.target.files[0];
            if (file) {
                showNotification(`Processing ${file.name}...`);
                
                // Simulate processing
                setTimeout(() => {
                    const activityList = document.querySelector('.activity-list');
                    if (activityList) {
                        const newActivity = document.createElement('div');
                        newActivity.className = 'activity-item';
                        newActivity.innerHTML = `
                            <div class="activity-icon pdf">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z" fill="white"/>
                                </svg>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">PDF imported</div>
                                <div class="activity-desc">${file.name} processed successfully</div>
                                <div class="activity-time">Just now</div>
                            </div>
                            <button class="activity-action">Review</button>
                        `;
                        
                        activityList.insertBefore(newActivity, activityList.firstChild);
                    }
                    
                    showNotification('PDF successfully imported and analyzed');
                }, 2000);
            }
        };
        input.click();
    }
    
    if (e.target.closest('#phoneBtn')) {
        showNotification('Phone mode activated. Dial: 1-800-RODHOUSE');
    }
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    // Show/hide menu toggle based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
    
    // Initial check
    checkScreenSize();
    
    // Check on resize
    window.addEventListener('resize', checkScreenSize);
    
    // Toggle menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Change icon
            const isOpen = sidebar.classList.contains('active');
            this.innerHTML = isOpen ? 
                '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' :
                '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
        });
    }
    
    // Close menu on overlay click
    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            menuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
        });
    }
    
    // Close menu when clicking nav items on mobile
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                menuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
            }
        });
    });
}

// Handle Responsive Features
function handleResponsiveFeatures() {
    // Touch swipe for mobile menu
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const sidebar = document.querySelector('.dashboard-sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const menuToggle = document.getElementById('mobileMenuToggle');
        
        if (window.innerWidth <= 768) {
            // Swipe right to open menu
            if (touchEndX - touchStartX > 50 && touchStartX < 50) {
                sidebar.classList.add('active');
                overlay.classList.add('active');
                menuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
            }
            
            // Swipe left to close menu
            if (touchStartX - touchEndX > 50 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                menuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
            }
        }
    }
    
    // Improve scroll performance on mobile
    const scrollElements = document.querySelectorAll('.dashboard-main, .activity-list, .manuals-grid');
    scrollElements.forEach(element => {
        if (element) {
            element.addEventListener('touchstart', function() {
                this.style.overflow = 'auto';
            });
        }
    });
    
    // Adjust voice modal for mobile
    const voiceOverlay = document.getElementById('voiceOverlay');
    if (voiceOverlay && window.innerWidth <= 480) {
        voiceOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.getElementById('aiState').textContent = 'Ready to help';
            }
        });
    }
    
    // Mobile-optimized notifications
    if (window.innerWidth <= 768) {
        const originalShowNotification = window.showNotification;
        window.showNotification = function(message) {
            const toast = document.createElement('div');
            toast.className = 'notification-toast mobile';
            toast.textContent = message;
            
            document.body.appendChild(toast);
            
            // Add mobile-specific styles
            toast.style.bottom = '60px';
            toast.style.width = 'calc(100% - 40px)';
            toast.style.left = '20px';
            toast.style.right = '20px';
            toast.style.transform = 'translateY(100px)';
            
            setTimeout(() => {
                toast.style.transition = 'transform 0.3s ease';
                toast.style.transform = 'translateY(0)';
            }, 10);
            
            setTimeout(() => {
                toast.style.transform = 'translateY(100px)';
                setTimeout(() => toast.remove(), 300);
            }, 2700);
        };
    }
    
    // Optimize images for mobile
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar && window.innerWidth <= 480) {
        userAvatar.src = userAvatar.src.replace('w=48', 'w=32');
    }
    
    // Add pull-to-refresh on mobile (visual feedback only for mockup)
    let pullStartY = 0;
    const mainContent = document.querySelector('.dashboard-main');
    
    if (mainContent && 'ontouchstart' in window) {
        mainContent.addEventListener('touchstart', function(e) {
            if (this.scrollTop === 0) {
                pullStartY = e.touches[0].clientY;
            }
        });
        
        mainContent.addEventListener('touchmove', function(e) {
            if (this.scrollTop === 0) {
                const pullDistance = e.touches[0].clientY - pullStartY;
                if (pullDistance > 0 && pullDistance < 100) {
                    this.style.transform = `translateY(${pullDistance * 0.5}px)`;
                    this.style.opacity = 1 - (pullDistance / 200);
                }
            }
        });
        
        mainContent.addEventListener('touchend', function() {
            const currentTransform = this.style.transform;
            this.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            this.style.transform = 'translateY(0)';
            this.style.opacity = '1';
            
            // Check if pulled enough to refresh
            if (currentTransform && parseInt(currentTransform.match(/\d+/)) > 30) {
                showNotification('Refreshing...');
                setTimeout(() => {
                    showNotification('Content updated');
                }, 1000);
            }
            
            setTimeout(() => {
                this.style.transition = '';
            }, 300);
        });
    }
}