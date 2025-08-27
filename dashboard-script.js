// Dashboard Scripts - Host Portal

document.addEventListener('DOMContentLoaded', function() {
    initializeVoiceInput();
    initializeMockNotifications();
    initializeQuickActions();
    initializeFilters();
    simulateAIActivity();
    initializeMobileMenu();
    handleResponsiveFeatures();
    initializeGuestCards();
    initializeManualCards();
    initializeSidebarNavigation();
    initializeSectionToggle();
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
            if (aiState) {
                aiState.textContent = 'Listening...';
                aiState.style.color = '#321662';
            }
            
            // Simulate voice recognition
            simulateVoiceRecognition(transcript);
        });
    }
    
    if (stopVoiceBtn) {
        stopVoiceBtn.addEventListener('click', () => {
            voiceOverlay.classList.remove('active');
            if (aiState) {
                aiState.textContent = 'Ready to help';
                aiState.style.color = '';
            }
            
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
                background: #321662;
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
            
            if (title.includes('Proposals')) {
                showProposals();
            } else if (title.includes('Manual')) {
                showManualCreator();
            } else if (title.includes('Leases')) {
                showLeases();
            }
        });
    });
}

// Show proposals
function showProposals() {
    showNotification('Opening lease proposals...');
    // In a real app, this would navigate to proposals page
    setTimeout(() => {
        showNotification('3 pending proposals to review');
    }, 500);
}

// Show leases
function showLeases() {
    showNotification('Navigating to active leases...');
    // In a real app, this would navigate to leases page
    setTimeout(() => {
        showNotification('2 active leases found');
    }, 500);
}

// Show manual creator
function showManualCreator() {
    const aiState = document.getElementById('aiState');
    if (aiState) {
        aiState.textContent = 'Preparing manual creator...';
        setTimeout(() => {
            if (aiState) {
                aiState.textContent = 'Ready to create manual';
            }
            showNotification('Manual creator opened. Start by describing your property.');
        }, 1000);
    } else {
        showNotification('Manual creator opened. Start by describing your property.');
    }
}

// Handle guest card actions
function initializeGuestCards() {
    // Go to Lease buttons
    document.querySelectorAll('.guest-btn.primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const guestCard = this.closest('.guest-card');
            const guestName = guestCard.querySelector('.guest-name').textContent;
            showNotification(`Opening lease for ${guestName}...`);
        });
    });
    
    // Contact buttons
    document.querySelectorAll('.guest-btn:not(.primary)').forEach(btn => {
        if (btn.textContent === 'Contact') {
            btn.addEventListener('click', function() {
                const guestCard = this.closest('.guest-card');
                const guestName = guestCard.querySelector('.guest-name').textContent;
                showNotification(`Opening chat with ${guestName}...`);
            });
        } else if (btn.textContent === 'Send Manual') {
            btn.addEventListener('click', function() {
                const guestCard = this.closest('.guest-card');
                const guestName = guestCard.querySelector('.guest-name').textContent;
                showNotification(`Sending house manual to ${guestName}...`);
                
                // Animate button
                this.textContent = 'Sent ✓';
                this.style.background = '#321662';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.textContent = 'Send Manual';
                    this.style.background = '';
                    this.style.color = '';
                }, 2000);
            });
        }
    });
}

// Handle manual card actions
function initializeManualCards() {
    // Edit buttons
    document.querySelectorAll('.manual-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.toLowerCase();
            const manualCard = this.closest('.manual-card');
            const manualTitle = manualCard.querySelector('.manual-title').textContent;
            
            if (action === 'edit') {
                showNotification(`Opening editor for: ${manualTitle}`);
            } else if (action === 'preview') {
                window.open('../index.html', '_blank');
            } else if (action === 'share') {
                showNotification(`Sharing link generated for: ${manualTitle}`);
                // Animate button
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Share';
                }, 1500);
            }
        });
    });
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
    if (!aiState) return; // Exit if aiState element doesn't exist
    
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
        if (aiState) { // Double check before setting textContent
            aiState.textContent = states[stateIndex];
            stateIndex = (stateIndex + 1) % states.length;
        }
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
                const aiState = document.getElementById('aiState');
                if (aiState) {
                    aiState.textContent = 'Ready to help';
                }
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

// Helper function to hide all sections
function hideAllSections() {
    const allSections = document.querySelectorAll('.quick-actions, .activity-section, .guests-section, .manuals-section, .listings-section');
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Also hide back button
    const backBtn = document.getElementById('back-button-container');
    if (backBtn) backBtn.style.display = 'none';
    
    // Hide AI assistant bar
    const aiBar = document.querySelector('.ai-assistant-bar');
    if (aiBar) aiBar.style.display = 'none';
}

// Initialize sidebar navigation
function initializeSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const linkText = this.querySelector('span').textContent;
            
            // Handle Guests and Manuals links specially
            if (href === 'guests.html' || linkText === 'Guests') {
                e.preventDefault();
                
                // Hide all sections first
                hideAllSections();
                
                // Show guests section specifically
                const guestsSection = document.getElementById('guests-section');
                if (guestsSection) {
                    guestsSection.style.display = 'block';
                }
                
                // Update active state
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Update header
                const propertyName = document.querySelector('.property-name');
                if (propertyName) {
                    propertyName.textContent = 'Lexington Avenue Residence - Guests';
                }
                
                return;
            }
            
            if (href === 'manuals.html' || linkText === 'Manuals' || linkText === 'House Manuals') {
                e.preventDefault();
                
                // Hide all sections first
                hideAllSections();
                
                // Create or show back button
                const backButtonContainer = document.getElementById('back-button-container') || createBackButton();
                backButtonContainer.style.display = 'block';
                
                // Show manuals section
                const manualsSection = document.querySelector('.manuals-section');
                if (manualsSection) {
                    manualsSection.style.display = 'block';
                    loadManualsContent();
                }
                
                // Update header
                const propertyName = document.querySelector('.property-name');
                if (propertyName) {
                    propertyName.textContent = 'Lexington Avenue Residence - House Manuals';
                }
                
                // Update active state
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                return;
            }
            
            if (href === 'listings.html' || linkText === 'My Listings') {
                e.preventDefault();
                
                // Hide all sections first
                hideAllSections();
                
                // Create or show back button
                const backButtonContainer = document.getElementById('back-button-container') || createBackButton();
                backButtonContainer.style.display = 'block';
                
                // Remove existing listings section if it exists to start fresh
                let existingListings = document.querySelector('.listings-section');
                if (existingListings) {
                    existingListings.remove();
                }
                
                // Create new listings section
                let listingsSection = document.createElement('div');
                listingsSection.className = 'listings-section';
                
                const mainContent = document.querySelector('.dashboard-main');
                if (mainContent) {
                    // Insert after back button or at the beginning of main content
                    const backBtn = document.getElementById('back-button-container');
                    if (backBtn && backBtn.nextSibling) {
                        mainContent.insertBefore(listingsSection, backBtn.nextSibling);
                    } else {
                        mainContent.appendChild(listingsSection);
                    }
                }
                
                listingsSection.style.display = 'block';
                loadListingsContent();
                
                // Hide AI assistant bar
                const aiBar = document.querySelector('.ai-assistant-bar');
                if (aiBar) aiBar.style.display = 'none';
                
                // Show back button
                backButtonContainer.style.display = 'block';
                
                // Update header
                const propertyName = document.querySelector('.property-name');
                if (propertyName) {
                    propertyName.textContent = 'Property Management - My Listings';
                }
                
                // Update active state
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                return;
            }
            
            if (href === 'dashboard.html' || linkText === 'Dashboard') {
                e.preventDefault();
                
                // Reset to dashboard view
                const allSections = document.querySelectorAll('.quick-actions, .activity-section, .guests-section, .manuals-section, .listings-section');
                const backButtonContainer = document.getElementById('back-button-container');
                
                // Show original sections with proper display types
                allSections.forEach(section => {
                    if (section.classList.contains('listings-section')) {
                        section.style.display = 'none';
                    } else if (section.classList.contains('guests-section') || section.id === 'guests-section') {
                        section.style.display = 'none'; // Keep guests section hidden on dashboard
                    } else if (section.classList.contains('quick-actions')) {
                        section.style.display = 'grid'; // Quick actions needs grid display
                    } else {
                        section.style.display = 'block';
                    }
                });
                
                // Show AI assistant bar
                const aiBar = document.querySelector('.ai-assistant-bar');
                if (aiBar) aiBar.style.display = 'flex';
                
                // Hide back button
                if (backButtonContainer) {
                    backButtonContainer.style.display = 'none';
                }
                
                // Reset header
                const propertyName = document.querySelector('.property-name');
                if (propertyName) {
                    propertyName.textContent = 'Lexington Avenue Residence';
                }
                
                // Update active state
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Reload if we're not on the original content
                const guestsSection = document.querySelector('.guests-section');
                const listingsSection = document.querySelector('.listings-section');
                if ((guestsSection && guestsSection.innerHTML.includes('Guest Management')) ||
                    (listingsSection && listingsSection.innerHTML.includes('Property Listings'))) {
                    location.reload();
                }
                
                return;
            }
            
            // Only handle internal section links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active state
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Close mobile menu if open
                    const sidebar = document.querySelector('.dashboard-sidebar');
                    const mobileMenu = document.querySelector('.mobile-menu-btn');
                    if (sidebar && sidebar.classList.contains('show-mobile')) {
                        sidebar.classList.remove('show-mobile');
                        if (mobileMenu) {
                            mobileMenu.classList.remove('active');
                        }
                    }
                    
                    // Show notification
                    const sectionName = this.querySelector('span').textContent;
                    showNotification(`Navigated to ${sectionName}`);
                }
            }
        });
    });
}

// Helper function to create back button
function createBackButton() {
    const backButtonContainer = document.createElement('div');
    backButtonContainer.id = 'back-button-container';
    backButtonContainer.style.cssText = 'display: none; margin-bottom: 20px;';
    backButtonContainer.innerHTML = `
        <button class="btn-secondary" id="back-to-dashboard">
            <svg viewBox="0 0 24 24" width="16" height="16" style="margin-right: 8px;">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
            Back to Dashboard
        </button>
    `;
    
    const mainContent = document.querySelector('.dashboard-main');
    if (mainContent && mainContent.firstChild) {
        mainContent.insertBefore(backButtonContainer, mainContent.firstChild.nextSibling);
    }
    
    // Add event listener to the back button
    const backBtn = backButtonContainer.querySelector('#back-to-dashboard');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // Show all sections
            const allSections = document.querySelectorAll('.quick-actions, .activity-section, .guests-section, .manuals-section');
            allSections.forEach(section => {
                section.style.display = 'block';
            });
            
            // Show AI assistant bar
            const aiBar = document.querySelector('.ai-assistant-bar');
            if (aiBar) aiBar.style.display = 'flex';
            
            // Hide back button
            backButtonContainer.style.display = 'none';
            
            // Reset header
            const propertyName = document.querySelector('.property-name');
            if (propertyName) {
                propertyName.textContent = 'Lexington Avenue Residence';
            }
            
            // Reload original sections content
            location.reload();
        });
    }
    
    return backButtonContainer;
}

// Initialize section toggle functionality
function initializeSectionToggle() {
    const viewGuestsBtn = document.querySelector('.guests-section .section-action');
    const viewManualsBtn = document.querySelector('.manuals-section .section-header');
    const allSections = document.querySelectorAll('.quick-actions, .activity-section, .guests-section, .manuals-section');
    
    // Add a "View All" button to manuals section if it doesn't exist
    const manualsHeader = document.querySelector('.manuals-section .section-header');
    if (manualsHeader && !manualsHeader.querySelector('.section-action')) {
        const viewAllManualsBtn = document.createElement('button');
        viewAllManualsBtn.className = 'section-action';
        viewAllManualsBtn.textContent = 'View All Manuals';
        manualsHeader.appendChild(viewAllManualsBtn);
    }
    
    // Get the new manuals button
    const viewAllManualsBtn = document.querySelector('.manuals-section .section-action');
    
    // Add back button container if it doesn't exist
    let backButtonContainer = document.getElementById('back-button-container');
    if (!backButtonContainer) {
        backButtonContainer = document.createElement('div');
        backButtonContainer.id = 'back-button-container';
        backButtonContainer.style.cssText = 'display: none; margin-bottom: 20px;';
        backButtonContainer.innerHTML = `
            <button class="btn-secondary" id="back-to-dashboard">
                <svg viewBox="0 0 24 24" width="16" height="16" style="margin-right: 8px;">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                </svg>
                Back to Dashboard
            </button>
        `;
        const mainContent = document.querySelector('.dashboard-main');
        if (mainContent && mainContent.firstChild) {
            mainContent.insertBefore(backButtonContainer, mainContent.firstChild.nextSibling);
        }
    }
    
    // Handle View All Guests click
    if (viewGuestsBtn) {
        viewGuestsBtn.addEventListener('click', function() {
            // Hide all sections except guests
            allSections.forEach(section => {
                if (section.classList.contains('guests-section')) {
                    section.style.display = 'block';
                    // Load guests content
                    loadGuestsContent();
                } else {
                    section.style.display = 'none';
                }
            });
            
            // Hide AI assistant bar
            const aiBar = document.querySelector('.ai-assistant-bar');
            if (aiBar) aiBar.style.display = 'none';
            
            // Show back button
            backButtonContainer.style.display = 'block';
            
            // Update header
            const propertyName = document.querySelector('.property-name');
            if (propertyName) {
                propertyName.textContent = 'Lexington Avenue Residence - Guests';
            }
        });
    }
    
    // Handle View All Manuals click
    if (viewAllManualsBtn) {
        viewAllManualsBtn.addEventListener('click', function() {
            // Hide all sections except manuals
            allSections.forEach(section => {
                if (section.classList.contains('manuals-section')) {
                    section.style.display = 'block';
                    // Load manuals content
                    loadManualsContent();
                } else {
                    section.style.display = 'none';
                }
            });
            
            // Hide AI assistant bar
            const aiBar = document.querySelector('.ai-assistant-bar');
            if (aiBar) aiBar.style.display = 'none';
            
            // Show back button
            backButtonContainer.style.display = 'block';
            
            // Update header
            const propertyName = document.querySelector('.property-name');
            if (propertyName) {
                propertyName.textContent = 'Lexington Avenue Residence - House Manuals';
            }
        });
    }
    
    // Handle Back to Dashboard
    const backBtn = document.getElementById('back-to-dashboard');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // Show all sections
            allSections.forEach(section => {
                section.style.display = 'block';
            });
            
            // Show AI assistant bar
            const aiBar = document.querySelector('.ai-assistant-bar');
            if (aiBar) aiBar.style.display = 'flex';
            
            // Hide back button
            backButtonContainer.style.display = 'none';
            
            // Reset header
            const propertyName = document.querySelector('.property-name');
            if (propertyName) {
                propertyName.textContent = 'Lexington Avenue Residence';
            }
            
            // Reload original sections content
            location.reload();
        });
    }
}

// Load full guests content
function loadGuestsContent() {
    const guestsSection = document.querySelector('.guests-section');
    if (!guestsSection) return;
    
    // Update the section with full guests interface
    guestsSection.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Guest Management</h2>
            <div class="tabs-nav-wrapper">
                <div class="tabs-nav">
                    <button class="tab-btn active" data-tab="overview">Overview</button>
                    <button class="tab-btn" data-tab="current">Current Guests</button>
                    <button class="tab-btn" data-tab="upcoming">Upcoming</button>
                    <button class="tab-btn" data-tab="past">Past Guests</button>
                    <button class="tab-btn" data-tab="messages">Messages</button>
                    <button class="tab-btn" data-tab="reviews">Reviews</button>
                </div>
                <button class="btn-primary add-guest">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="white"/>
                    </svg>
                    Add Guest
                </button>
            </div>
        </div>
        
        <div class="tab-content active" id="overview-tab">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#321662"/>
                        </svg>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">2</div>
                        <div class="stat-label">Current Guests</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" fill="#D4A574"/>
                        </svg>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">5</div>
                        <div class="stat-label">Upcoming Arrivals</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="#6B46C1"/>
                        </svg>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">12</div>
                        <div class="stat-label">Messages</div>
                    </div>
                </div>
            </div>
            
            <div class="guests-grid">
                <div class="guest-card">
                    <div class="guest-icon">
                        <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=321662&color=fff" alt="Guest">
                    </div>
                    <div class="guest-content">
                        <h3 class="guest-title">Sarah Johnson</h3>
                        <p class="guest-desc">2BR Suite • Currently Staying</p>
                        <div class="guest-meta">
                            <span class="meta-item">Aug 26 - Sep 2</span>
                            <span class="meta-item">7 nights</span>
                        </div>
                    </div>
                    <div class="guest-actions">
                        <button class="guest-btn primary">View</button>
                        <button class="guest-btn">Contact</button>
                    </div>
                </div>
                
                <div class="guest-card">
                    <div class="guest-icon">
                        <img src="https://ui-avatars.com/api/?name=Mike+Chen&background=D4A574&color=fff" alt="Guest">
                    </div>
                    <div class="guest-content">
                        <h3 class="guest-title">Mike Chen</h3>
                        <p class="guest-desc">2BR Suite • Arriving Tomorrow</p>
                        <div class="guest-meta">
                            <span class="meta-item">Aug 27 - 30</span>
                            <span class="meta-item">3 nights</span>
                        </div>
                    </div>
                    <div class="guest-actions">
                        <button class="guest-btn primary">Prepare</button>
                        <button class="guest-btn">Manual</button>
                    </div>
                </div>
                
                <div class="guest-card">
                    <div class="guest-icon">
                        <img src="https://ui-avatars.com/api/?name=Emily+Davis&background=6B46C1&color=fff" alt="Guest">
                    </div>
                    <div class="guest-content">
                        <h3 class="guest-title">Emily Davis</h3>
                        <p class="guest-desc">Master Suite • Upcoming</p>
                        <div class="guest-meta">
                            <span class="meta-item">Sep 5 - 12</span>
                            <span class="meta-item">7 nights</span>
                        </div>
                    </div>
                    <div class="guest-actions">
                        <button class="guest-btn primary">View</button>
                        <button class="guest-btn">Contact</button>
                    </div>
                </div>
                
                <div class="guest-card">
                    <div class="guest-icon">
                        <img src="https://ui-avatars.com/api/?name=Robert+Lee&background=D4A574&color=fff" alt="Guest">
                    </div>
                    <div class="guest-content">
                        <h3 class="guest-title">Robert Lee</h3>
                        <p class="guest-desc">1BR Suite • Past Guest</p>
                        <div class="guest-meta">
                            <span class="meta-item">Aug 15 - 22</span>
                            <span class="meta-item">Checked out</span>
                        </div>
                    </div>
                    <div class="guest-actions">
                        <button class="guest-btn primary">Review</button>
                        <button class="guest-btn">Invoice</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize tabs for guests
    initializeGuestTabs();
}

// Load full manuals content
function loadManualsContent() {
    const manualsSection = document.querySelector('.manuals-section');
    if (!manualsSection) return;
    
    // Update the section with full manuals interface
    manualsSection.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">House Manual Management</h2>
            <button class="btn-primary">
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="white"/>
                </svg>
                Create New Manual
            </button>
        </div>
        
        <div class="section-filters" style="margin: 20px 0;">
            <button class="filter-btn active">All Manuals</button>
            <button class="filter-btn">Guest Manuals</button>
            <button class="filter-btn">Contractor Manuals</button>
            <button class="filter-btn">Cleaning Instructions</button>
            <button class="filter-btn">Emergency Procedures</button>
        </div>
        
        <div class="manuals-grid">
            <div class="manual-card">
                <div class="manual-icon">
                    <svg viewBox="0 0 24 24" width="40" height="40">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="#321662" opacity="0.6"/>
                    </svg>
                </div>
                <div class="manual-content">
                    <h3 class="manual-title">Standard Guest Manual</h3>
                    <p class="manual-desc">Complete guide with WiFi, check-in instructions, and house rules</p>
                    <div class="manual-meta">
                        <span class="meta-item">15 sections</span>
                        <span class="meta-item">3 languages</span>
                        <span class="meta-item">247 views</span>
                    </div>
                </div>
                <div class="manual-actions">
                    <button class="manual-btn">Edit</button>
                    <button class="manual-btn secondary">Preview</button>
                    <button class="manual-btn primary">Share</button>
                </div>
            </div>
            
            <div class="manual-card">
                <div class="manual-icon">
                    <svg viewBox="0 0 24 24" width="40" height="40">
                        <path d="M9 3v1H4v2h1v13a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8z" fill="#D4A574" opacity="0.6"/>
                    </svg>
                </div>
                <div class="manual-content">
                    <h3 class="manual-title">Cleaning Instructions</h3>
                    <p class="manual-desc">Detailed guide for cleaning staff with supply locations</p>
                    <div class="manual-meta">
                        <span class="meta-item">8 sections</span>
                        <span class="meta-item">Weekly use</span>
                        <span class="meta-item">52 views</span>
                    </div>
                </div>
                <div class="manual-actions">
                    <button class="manual-btn">Edit</button>
                    <button class="manual-btn secondary">Preview</button>
                    <button class="manual-btn primary">Share</button>
                </div>
            </div>
            
            <div class="manual-card">
                <div class="manual-icon">
                    <svg viewBox="0 0 24 24" width="40" height="40">
                        <path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.59 2.08-3.61 5.75-2.39 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.23.1-.47.04-.66-.12a.58.58 0 01-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5.14.6.41 1.2.71 1.73 1.08 1.73 2.95 2.97 4.96 3.22 2.14.27 4.43-.12 6.07-1.6 1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26zm-3.16 6.3c-.28.24-.74.5-1.1.6-1.12.4-2.24-.16-2.9-.82 1.19-.28 1.9-1.16 2.11-2.05.17-.8-.15-1.46-.28-2.23-.12-.74-.1-1.37.17-2.06.19.38.39.76.63 1.06.77 1 1.98 1.44 2.24 2.8.04.14.06.28.06.43.03.82-.33 1.72-.93 2.27z" fill="#6B46C1" opacity="0.6"/>
                    </svg>
                </div>
                <div class="manual-content">
                    <h3 class="manual-title">Emergency Procedures</h3>
                    <p class="manual-desc">Fire safety, medical emergencies, and evacuation plans</p>
                    <div class="manual-meta">
                        <span class="meta-item">6 sections</span>
                        <span class="meta-item">All users</span>
                        <span class="meta-item">189 views</span>
                    </div>
                </div>
                <div class="manual-actions">
                    <button class="manual-btn">Edit</button>
                    <button class="manual-btn secondary">Preview</button>
                    <button class="manual-btn primary">Share</button>
                </div>
            </div>
            
            <div class="manual-card">
                <div class="manual-icon">
                    <svg viewBox="0 0 24 24" width="40" height="40">
                        <path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z" fill="#321662" opacity="0.6"/>
                    </svg>
                </div>
                <div class="manual-content">
                    <h3 class="manual-title">HVAC & Utilities Guide</h3>
                    <p class="manual-desc">Thermostat settings, water shutoff locations, and maintenance</p>
                    <div class="manual-meta">
                        <span class="meta-item">10 sections</span>
                        <span class="meta-item">Contractors</span>
                        <span class="meta-item">45 views</span>
                    </div>
                </div>
                <div class="manual-actions">
                    <button class="manual-btn">Edit</button>
                    <button class="manual-btn secondary">Preview</button>
                    <button class="manual-btn primary">Share</button>
                </div>
            </div>
        </div>
    `;
}

// Initialize guest tabs
function initializeGuestTabs() {
    const tabButtons = document.querySelectorAll('.tabs-nav .tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // For now, just show a notification
            showNotification(`Switched to ${this.textContent} tab`);
        });
    });
}

// Load full listings content
function loadListingsContent() {
    const listingsSection = document.querySelector('.listings-section');
    if (!listingsSection) {
        console.error('Listings section not found');
        return;
    }
    
    console.log('Loading listings content...');
    
    // Check if the function exists and use it
    if (typeof getListingsHTMLContent === 'function') {
        console.log('getListingsHTMLContent function found, loading content...');
        const content = getListingsHTMLContent();
        listingsSection.innerHTML = content;
        console.log('Content loaded, length:', content.length);
    } else {
        console.error('getListingsHTMLContent function not found');
        // Try to load the script if not loaded
        if (!document.querySelector('script[src="listings-content.js"]')) {
            console.log('Loading listings-content.js...');
            const script = document.createElement('script');
            script.src = 'listings-content.js';
            script.onload = function() {
                console.log('Script loaded, retrying...');
                if (typeof getListingsHTMLContent === 'function') {
                    const content = getListingsHTMLContent();
                    listingsSection.innerHTML = content;
                    initializeListingsFunctionality();
                }
            };
            document.body.appendChild(script);
            return;
        }
    }
    
    // Initialize functionality after a short delay
    setTimeout(() => {
        initializeListingsFunctionality();
    }, 100);
}

function initializeListingsFunctionality() {
    console.log('Initializing listings functionality...');
    
    // Initialize tabs
    const tabBtns = document.querySelectorAll('.listings-section .tab-btn');
    const tabPanes = document.querySelectorAll('.listings-section .tab-pane');
    
    console.log('Found tab buttons:', tabBtns.length);
    console.log('Found tab panes:', tabPanes.length);
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked
            btn.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
    
    // Initialize AI suggestions
    const aiBtn = document.querySelector('.listings-section #aiSuggestBtn');
    const panel = document.querySelector('.listings-section #aiSuggestionsPanel');
    
    if (aiBtn && panel) {
        aiBtn.addEventListener('click', () => {
            panel.classList.toggle('active');
        });
    }
}

// Temporary function to load listings content inline
function loadListingsFullContent() {
    const listingsSection = document.querySelector('.listings-section');
    if (!listingsSection) return;
    
    // Load exact content from listings.html (main content only)
    listingsSection.innerHTML = `
        <!-- AI Suggestions Panel -->
        <div class="ai-suggestions-panel" id="aiSuggestionsPanel">
            <div class="ai-panel-header">
                <h3>AI-Powered Suggestions</h3>
                <button class="close-panel" onclick="document.getElementById('aiSuggestionsPanel').classList.remove('active')">×</button>
            </div>
            <div class="ai-suggestions-content">
                <div class="suggestion-item">
                    <div class="suggestion-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="suggestion-content">
                        <h4>Optimize Your Title</h4>
                        <p>Consider: "Spacious 2BR Haven | Full Kitchen, Gym Access & Fast WiFi | Milford Gem"</p>
                        <button class="apply-suggestion">Apply</button>
                    </div>
                </div>
                <div class="suggestion-item">
                    <div class="suggestion-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="suggestion-content">
                        <h4>Pricing Optimization</h4>
                        <p>Your pricing is 15% below market average. Consider increasing nightly rates by $10-15.</p>
                        <button class="apply-suggestion">Review Pricing</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Listing Header -->
        <div class="listing-header">
            <div class="listing-status">
                <span class="status-badge review">In Split Lease Review</span>
                <span class="created-date">Created: Jul 24, 2025</span>
            </div>
            <div class="listing-actions">
                <button class="action-btn share-btn">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" fill="currentColor"/>
                    </svg>
                    Share
                </button>
                <button class="action-btn manual-btn">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/>
                    </svg>
                    View/Edit Manual
                </button>
                <button class="action-btn primary">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" fill="currentColor"/>
                    </svg>
                    Save Changes
                </button>
            </div>
        </div>

        <!-- Property Title Section -->
        <div class="property-section">
            <h1 class="property-title editable" contenteditable="true" spellcheck="true">
                Cozy 2BR Retreat with Kitchenette, 2 Baths, Gym & WiFi in Milford
            </h1>
            <div class="property-address">
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
                <span class="editable" contenteditable="true">1234 Boulevard, Westfield, NJ 07090, USA</span>
                <button class="edit-btn">Edit</button>
            </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="tabs-navigation">
            <button class="tab-btn active" data-tab="overview">Overview</button>
            <button class="tab-btn" data-tab="pricing">Pricing & Availability</button>
            <button class="tab-btn" data-tab="details">Details & Amenities</button>
            <button class="tab-btn" data-tab="photos">Photos & Tours</button>
            <button class="tab-btn" data-tab="rules">Rules & Policies</button>
            <button class="tab-btn" data-tab="manual">House Manual</button>
        </div>
        
        <div class="stats-grid" style="margin: 30px 0;">
            <div class="stat-card">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 2l-5.5 9h11z M12 2l5.5 9H17l-5-8.5L7 11H6.5z" fill="#321662"/>
                        <circle cx="12" cy="17" r="4" fill="#321662"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">92%</div>
                    <div class="stat-label">Occupancy Rate</div>
                    <div class="stat-trend positive">+5% vs last month</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="#D4A574"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">$4,250</div>
                    <div class="stat-label">Monthly Revenue</div>
                    <div class="stat-trend positive">+12% vs last month</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#6B46C1"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">4.8</div>
                    <div class="stat-label">Average Rating</div>
                    <div class="stat-trend">23 reviews</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#321662"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">Active</div>
                    <div class="stat-label">Listing Status</div>
                    <div class="stat-trend">Listed 6 months ago</div>
                </div>
            </div>
        </div>
        
        <div class="listing-details">
            <div class="detail-section">
                <h3>Property Details</h3>
                <div class="property-info-grid">
                    <div class="info-item">
                        <span class="info-label">Type:</span>
                        <span class="info-value">2 Bedroom Apartment</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Location:</span>
                        <span class="info-value">Lexington Avenue, NYC</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Size:</span>
                        <span class="info-value">1,200 sq ft</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Max Guests:</span>
                        <span class="info-value">4 people</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Bathrooms:</span>
                        <span class="info-value">2</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Minimum Stay:</span>
                        <span class="info-value">3 nights</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Recent Bookings</h3>
                <div class="bookings-list">
                    <div class="booking-item">
                        <div class="booking-guest">
                            <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=321662&color=fff" alt="Guest">
                            <div>
                                <div class="guest-name">Sarah Johnson</div>
                                <div class="booking-dates">Aug 26 - Sep 2, 2025</div>
                            </div>
                        </div>
                        <div class="booking-status confirmed">Confirmed</div>
                    </div>
                    <div class="booking-item">
                        <div class="booking-guest">
                            <img src="https://ui-avatars.com/api/?name=Mike+Chen&background=D4A574&color=fff" alt="Guest">
                            <div>
                                <div class="guest-name">Mike Chen</div>
                                <div class="booking-dates">Aug 27 - Aug 30, 2025</div>
                            </div>
                        </div>
                        <div class="booking-status pending">Pending</div>
                    </div>
                    <div class="booking-item">
                        <div class="booking-guest">
                            <img src="https://ui-avatars.com/api/?name=Emily+Davis&background=6B46C1&color=fff" alt="Guest">
                            <div>
                                <div class="guest-name">Emily Davis</div>
                                <div class="booking-dates">Sep 5 - Sep 12, 2025</div>
                            </div>
                        </div>
                        <div class="booking-status confirmed">Confirmed</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Quick Actions</h3>
                <div class="quick-actions-grid">
                    <button class="action-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" fill="currentColor"/>
                        </svg>
                        Update Calendar
                    </button>
                    <button class="action-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                        </svg>
                        View Reviews
                    </button>
                    <button class="action-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
                        </svg>
                        Guest Messages
                    </button>
                    <button class="action-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/>
                        </svg>
                        House Manual
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for listings content
    const styles = `
        .listings-section {
            padding: 20px 0;
        }
        
        .listings-section .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .listings-section .section-title {
            font-size: 28px;
            color: #321662;
            font-weight: 700;
            margin: 0;
        }
        
        .listings-section .tabs-nav-wrapper {
            display: flex;
            align-items: center;
            gap: 20px;
            background: white;
            padding: 8px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .listings-section .tabs-nav {
            display: flex;
            gap: 8px;
        }
        
        .listings-section .tab-btn {
            padding: 8px 16px;
            background: transparent;
            border: none;
            color: #666;
            font-weight: 600;
            font-size: 14px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .listings-section .tab-btn:hover {
            background: #f5f5f5;
        }
        
        .listings-section .tab-btn.active {
            background: linear-gradient(135deg, #6B46C1 0%, #321662 100%);
            color: white;
        }
        
        .listings-section .btn-primary {
            padding: 10px 20px;
            background: linear-gradient(135deg, #6B46C1 0%, #321662 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .listings-section .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);
        }
        
        .property-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .property-stats .stat-card {
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
        }
        
        .property-stats .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
        
        .property-stats .stat-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, rgba(107, 70, 193, 0.1) 0%, rgba(50, 22, 98, 0.1) 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
        }
        
        .property-stats .stat-content {
            display: flex;
            flex-direction: column;
        }
        
        .property-stats .stat-value {
            font-size: 32px;
            font-weight: 700;
            color: #321662;
            margin-bottom: 4px;
        }
        
        .property-stats .stat-label {
            font-size: 14px;
            color: #666;
            font-weight: 500;
        }
        
        .stat-trend {
            font-size: 12px;
            color: #666;
            margin-top: 8px;
            font-weight: 500;
        }
        
        .stat-trend.positive {
            color: #321662;
        }
        
        .listing-details {
            display: grid;
            gap: 30px;
            margin-top: 30px;
        }
        
        .detail-section {
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .detail-section h3 {
            margin: 0 0 20px 0;
            color: #321662;
            font-size: 20px;
            font-weight: 700;
        }
        
        .property-info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 12px 16px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }
        
        .info-label {
            font-weight: 600;
            color: #666;
            font-size: 14px;
        }
        
        .info-value {
            color: #321662;
            font-weight: 600;
            font-size: 14px;
        }
        
        .bookings-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .booking-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
            transition: all 0.2s ease;
        }
        
        .booking-item:hover {
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .booking-guest {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .booking-guest img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        
        .guest-name {
            font-weight: 600;
            color: #321662;
            font-size: 15px;
        }
        
        .booking-dates {
            font-size: 13px;
            color: #666;
            margin-top: 2px;
        }
        
        .booking-status {
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .booking-status.confirmed {
            background: #e8f5e9;
            color: #321662;
        }
        
        .booking-status.pending {
            background: #fff3e0;
            color: #ff9800;
        }
        
        .quick-actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
        }
        
        .quick-actions-grid .action-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 14px;
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            color: #321662;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .quick-actions-grid .action-btn:hover {
            background: linear-gradient(135deg, #6B46C1 0%, #321662 100%);
            border-color: transparent;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);
        }
        
        .quick-actions-grid .action-btn:hover svg path {
            fill: white;
        }
    `;
    
    // Add styles if not already present
    if (!document.getElementById('listings-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'listings-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    // Initialize listings tabs
    initializeListingsTabs();
}

// Initialize listings tabs
function initializeListingsTabs() {
    const tabButtons = document.querySelectorAll('.listings-section .tabs-nav .tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // For now, just show a notification
            showNotification(`Switched to ${this.textContent} tab`);
        });
    });
}

// Modal functionality
let currentStep = 1;
let selectedUseCase = null;
let isGenerating = false;
let generationTimer = null;
let generationStartTime = null;

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('creation-modal');
    const modalClose = document.querySelector('.modal-close');

    // Open modal when "Begin Creation" is clicked
    const beginCreationBtns = document.querySelectorAll('.action-btn.creation');
    beginCreationBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal
    modalClose?.addEventListener('click', function() {
        closeModal(false); // Don't reset if still generating
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(false);
        }
    });

    function openModal() {
        modal.classList.add('show');
        
        // If generation is in progress, show loading screen
        if (isGenerating) {
            currentStep = 3;
            showStep(3);
            updateLoadingProgress();
        } else {
            currentStep = 1;
            showStep(1);
        }
    }

    function closeModal(resetGeneration = true) {
        modal.classList.remove('show');
        
        if (resetGeneration && !isGenerating) {
            currentStep = 1;
            selectedUseCase = null;
        }
        
        // If generating, keep the card in loading state
        if (isGenerating) {
            showCardLoading(true);
        }
    }

    function showCardLoading(show) {
        const createCard = document.querySelector('.action-card:first-child');
        const button = createCard.querySelector('.action-btn.creation');
        const titleElement = createCard.querySelector('.action-title');
        const descElement = createCard.querySelector('.action-desc');
        
        if (show) {
            // Change button to loading state
            button.innerHTML = '<span class="loading-dots">Generating<span>.</span><span>.</span><span>.</span></span>';
            button.classList.add('loading');
            button.disabled = false; // Keep clickable to reopen modal
            
            // Update text
            titleElement.textContent = 'Manual in Progress';
            descElement.textContent = 'Click to view progress';
            
            // Add loading animation to icon
            const iconDiv = createCard.querySelector('.action-icon');
            if (!iconDiv.querySelector('.card-spinner')) {
                const spinner = document.createElement('div');
                spinner.className = 'card-spinner';
                spinner.innerHTML = `
                    <svg viewBox="0 0 50 50" width="40" height="40">
                        <circle cx="25" cy="25" r="20" stroke="#321662" stroke-width="3" fill="none" opacity="0.2"/>
                        <circle cx="25" cy="25" r="20" stroke="#321662" stroke-width="3" fill="none" 
                                stroke-dasharray="80" stroke-dashoffset="60" class="spinner-path"/>
                    </svg>`;
                iconDiv.innerHTML = '';
                iconDiv.appendChild(spinner);
            }
        } else {
            // Reset to original state
            button.innerHTML = 'Begin Creation';
            button.classList.remove('loading');
            button.disabled = false;
            
            titleElement.textContent = 'Create New Manual';
            descElement.textContent = 'Start fresh or import existing';
            
            // Reset icon
            const iconDiv = createCard.querySelector('.action-icon');
            iconDiv.innerHTML = `
                <svg viewBox="0 0 24 24" width="40" height="40">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#321662" opacity="0.7"/>
                </svg>`;
        }
    }

    function updateLoadingProgress() {
        if (!isGenerating) return;
        
        const elapsed = Date.now() - generationStartTime;
        const progress = Math.min((elapsed / 60000) * 100, 100); // 60 seconds
        
        // Update loading text with progress
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            const seconds = Math.floor(elapsed / 1000);
            loadingText.textContent = `Creating a beautiful, easy-to-read manual... (${seconds}s / 60s)`;
        }
        
        // Continue updating if still generating
        if (progress < 100) {
            requestAnimationFrame(updateLoadingProgress);
        }
    }

    function showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.modal-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        const currentStepElement = document.getElementById(`step-${stepNumber}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
    }

    // Handle use case selection
    document.querySelectorAll('.use-case-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectedUseCase = this.dataset.case;
            currentStep = 2;
            showStep(2);
        });
    });

    // Navigation functions
    window.previousStep = function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    };

    window.nextStep = function() {
        if (currentStep === 2) {
            // Move to loading screen
            currentStep = 3;
            showStep(3);
            
            // Start generation process
            isGenerating = true;
            generationStartTime = Date.now();
            showCardLoading(true);
            updateLoadingProgress();
            
            // Complete after 60 seconds
            generationTimer = setTimeout(() => {
                isGenerating = false;
                currentStep = 4;
                showStep(4);
                showCardLoading(false);
            }, 60000);
        }
    };

    // Preview manual function
    window.previewManual = function() {
        window.open('https://splitleasesharath.github.io/guest-house-manual/', '_blank');
    };

    window.closeModal = closeModal;

    // AI tool buttons (mock functionality)
    document.querySelectorAll('.ai-tool-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const toolName = this.querySelector('span').textContent;
            console.log(`${toolName} clicked - functionality coming soon`);
            
            // Visual feedback
            this.style.background = 'var(--light-purple)';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });
});

