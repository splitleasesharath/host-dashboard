// Guests Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeGuestRows();
    initializeFilterTabs();
    initializeDateFilter();
    initializeSearch();
    initializeQuickActions();
    initializeAddGuestButton();
    initializeAIPanel();
});

// Initialize Tab Switching
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const targetContent = document.getElementById(targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Show notification
            showNotification(`Showing ${this.textContent}`);
        });
    });
}

// Initialize AI Panel
function initializeAIPanel() {
    const aiBtn = document.getElementById('aiSuggestBtn');
    const aiPanel = document.getElementById('aiSuggestionsPanel');
    
    if (aiBtn && aiPanel) {
        aiBtn.addEventListener('click', function() {
            aiPanel.classList.toggle('active');
        });
        
        // Handle AI suggestions
        document.querySelectorAll('.apply-suggestion').forEach(btn => {
            btn.addEventListener('click', function() {
                const suggestion = this.closest('.suggestion-item');
                const title = suggestion.querySelector('h4').textContent;
                showNotification(`Applying: ${title}`);
                
                setTimeout(() => {
                    aiPanel.classList.remove('active');
                }, 1000);
            });
        });
    }
}

// Initialize Guest Rows
function initializeGuestRows() {
    // Lease buttons
    document.querySelectorAll('.lease-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('.guest-row');
            const guestName = row.querySelector('.guest-name').textContent.replace('VIP', '').trim();
            showNotification(`Opening lease for ${guestName}...`);
            
            // Simulate opening lease
            setTimeout(() => {
                showNotification('Lease document loaded');
            }, 1000);
        });
    });
    
    // Action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('.guest-row');
            const guestName = row.querySelector('.guest-name').textContent.replace('VIP', '').trim();
            
            if (this.classList.contains('message')) {
                openMessageDialog(guestName);
            } else if (this.classList.contains('call')) {
                initiateCall(guestName);
            } else if (this.classList.contains('send')) {
                sendInstructions(guestName);
            } else if (this.classList.contains('review')) {
                requestReview(guestName);
            } else if (this.classList.contains('invite')) {
                inviteAgain(guestName);
            } else if (this.classList.contains('more')) {
                showGuestMenu(this, guestName);
            }
        });
    });
    
    // Row click to expand details
    document.querySelectorAll('.guest-row').forEach(row => {
        row.addEventListener('click', function(e) {
            if (!e.target.closest('button')) {
                toggleGuestDetails(this);
            }
        });
    });
}

// Open message dialog
function openMessageDialog(guestName) {
    showNotification(`Opening chat with ${guestName}...`);
    
    // Create message modal
    const modal = document.createElement('div');
    modal.className = 'message-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Message ${guestName}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="message-history">
                    <div class="message received">
                        <p>Hi, what's the WiFi password?</p>
                        <span class="time">2 hours ago</span>
                    </div>
                    <div class="message sent">
                        <p>Hello! The WiFi password is NYC2025fix</p>
                        <span class="time">1 hour ago</span>
                    </div>
                </div>
                <div class="message-input">
                    <input type="text" placeholder="Type your message...">
                    <button class="send-message">Send</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: white;
        border-radius: 12px;
        width: 90%;
        max-width: 500px;
        max-height: 70vh;
        display: flex;
        flex-direction: column;
    `;
    
    const header = modal.querySelector('.modal-header');
    header.style.cssText = `
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    `;
    
    const body = modal.querySelector('.modal-body');
    body.style.cssText = `
        padding: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
    `;
    
    const history = modal.querySelector('.message-history');
    history.style.cssText = `
        flex: 1;
        overflow-y: auto;
        margin-bottom: 20px;
    `;
    
    modal.querySelectorAll('.message').forEach(msg => {
        msg.style.cssText = `
            margin: 10px 0;
            padding: 10px;
            border-radius: 8px;
            ${msg.classList.contains('sent') ? 
                'background: #6B46C1; color: white; margin-left: auto; max-width: 70%;' : 
                'background: #f5f5f5; max-width: 70%;'}
        `;
    });
    
    const inputArea = modal.querySelector('.message-input');
    inputArea.style.cssText = `
        display: flex;
        gap: 10px;
    `;
    
    const input = inputArea.querySelector('input');
    input.style.cssText = `
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        outline: none;
    `;
    
    const sendBtn = inputArea.querySelector('.send-message');
    sendBtn.style.cssText = `
        padding: 10px 20px;
        background: #6B46C1;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Send message
    sendBtn.addEventListener('click', () => {
        const message = input.value.trim();
        if (message) {
            showNotification('Message sent!');
            input.value = '';
        }
    });
}

// Initiate call
function initiateCall(guestName) {
    showNotification(`Calling ${guestName}...`);
    
    // Simulate call interface
    setTimeout(() => {
        showNotification('Call connected');
    }, 2000);
}

// Send instructions
function sendInstructions(guestName) {
    showNotification(`Sending check-in instructions to ${guestName}...`);
    
    setTimeout(() => {
        showNotification('Instructions sent successfully!');
    }, 1500);
}

// Request review
function requestReview(guestName) {
    showNotification(`Sending review request to ${guestName}...`);
    
    setTimeout(() => {
        showNotification('Review request sent!');
    }, 1500);
}

// Invite again
function inviteAgain(guestName) {
    showNotification(`Sending invitation to ${guestName} for future stays...`);
    
    setTimeout(() => {
        showNotification('Invitation sent with 10% returning guest discount!');
    }, 1500);
}

// Show guest context menu
function showGuestMenu(button, guestName) {
    // Remove existing menus
    document.querySelectorAll('.guest-context-menu').forEach(menu => menu.remove());
    
    const menu = document.createElement('div');
    menu.className = 'guest-context-menu';
    menu.innerHTML = `
        <div class="menu-item">View Details</div>
        <div class="menu-item">Send Manual</div>
        <div class="menu-item">Add Note</div>
        <div class="menu-item">Mark as VIP</div>
        <div class="menu-item">Export History</div>
        <div class="menu-item danger">Block Guest</div>
    `;
    
    // Position menu
    const rect = button.getBoundingClientRect();
    menu.style.cssText = `
        position: absolute;
        top: ${rect.bottom}px;
        right: ${window.innerWidth - rect.right}px;
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
        padding: 8px 0;
        z-index: 1000;
        min-width: 150px;
    `;
    
    document.body.appendChild(menu);
    
    // Style menu items
    menu.querySelectorAll('.menu-item').forEach(item => {
        item.style.cssText = `
            padding: 10px 16px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s;
            ${item.classList.contains('danger') ? 'color: #dc3545;' : ''}
        `;
        
        item.addEventListener('mouseenter', function() {
            this.style.background = '#f5f5f5';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
        
        item.addEventListener('click', function() {
            handleGuestMenuAction(this.textContent, guestName);
            menu.remove();
        });
    });
    
    // Close menu on click outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}

// Handle guest menu actions
function handleGuestMenuAction(action, guestName) {
    switch(action) {
        case 'View Details':
            showNotification(`Loading details for ${guestName}...`);
            break;
        case 'Send Manual':
            showNotification(`Sending house manual to ${guestName}...`);
            break;
        case 'Add Note':
            showNotification(`Opening notes for ${guestName}...`);
            break;
        case 'Mark as VIP':
            markAsVIP(guestName);
            break;
        case 'Export History':
            showNotification(`Exporting ${guestName}'s stay history...`);
            break;
        case 'Block Guest':
            if (confirm(`Are you sure you want to block ${guestName}?`)) {
                showNotification(`${guestName} has been blocked`);
            }
            break;
    }
}

// Mark guest as VIP
function markAsVIP(guestName) {
    const rows = document.querySelectorAll('.guest-row');
    rows.forEach(row => {
        const name = row.querySelector('.guest-name');
        if (name && name.textContent.includes(guestName)) {
            if (!name.querySelector('.vip-badge')) {
                const vipBadge = document.createElement('span');
                vipBadge.className = 'vip-badge';
                vipBadge.textContent = 'VIP';
                vipBadge.style.cssText = `
                    background: linear-gradient(135deg, #FFD700, #FFA000);
                    color: white;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 10px;
                    font-weight: 600;
                    margin-left: 8px;
                `;
                name.appendChild(vipBadge);
                
                const avatar = row.querySelector('.guest-avatar');
                if (avatar) {
                    avatar.classList.add('vip');
                }
            }
        }
    });
    showNotification(`${guestName} marked as VIP guest!`);
}

// Toggle guest details expansion
function toggleGuestDetails(row) {
    const isExpanded = row.classList.contains('expanded');
    
    // Close all other expanded rows
    document.querySelectorAll('.guest-row.expanded').forEach(r => {
        r.classList.remove('expanded');
        const details = r.querySelector('.guest-details-expanded');
        if (details) details.remove();
    });
    
    if (!isExpanded) {
        row.classList.add('expanded');
        // Could add expanded details here
    }
}

// Initialize Filter Tabs
function initializeFilterTabs() {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            filterGuests(filter);
        });
    });
}

// Filter guests
function filterGuests(filter) {
    const rows = document.querySelectorAll('.guest-row');
    let visibleCount = 0;
    
    rows.forEach(row => {
        let show = false;
        
        switch(filter) {
            case 'all guests':
                show = true;
                break;
            case 'current':
                show = row.classList.contains('current');
                break;
            case 'upcoming':
                show = row.classList.contains('upcoming');
                break;
            case 'past':
                show = row.classList.contains('past');
                break;
            case 'vip':
                show = row.classList.contains('vip');
                break;
            default:
                show = true;
        }
        
        row.style.display = show ? 'table-row' : 'none';
        if (show) visibleCount++;
    });
    
    showNotification(`Showing ${visibleCount} ${filter}`);
}

// Initialize Date Filter
function initializeDateFilter() {
    const dateInputs = document.querySelectorAll('.date-filter input[type="date"]');
    
    dateInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fromDate = dateInputs[0].value;
            const toDate = dateInputs[1].value;
            
            if (fromDate && toDate) {
                showNotification(`Filtering guests from ${fromDate} to ${toDate}`);
                // Implement date filtering logic here
            }
        });
    });
}

// Initialize Search
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.guest-row');
            
            rows.forEach(row => {
                const guestName = row.querySelector('.guest-name').textContent.toLowerCase();
                const propertyName = row.querySelector('.property-name').textContent.toLowerCase();
                const visible = guestName.includes(searchTerm) || propertyName.includes(searchTerm);
                
                row.style.display = visible ? 'table-row' : 'none';
            });
        });
    }
}

// Initialize Quick Actions
function initializeQuickActions() {
    document.querySelectorAll('.quick-action-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            
            switch(title) {
                case 'Send Message':
                    showNotification('Opening bulk message composer...');
                    break;
                case 'Share Manual':
                    showNotification('Select guests to share manual with...');
                    break;
                case 'Request Review':
                    showNotification('Opening review request template...');
                    break;
                case 'Schedule Check-in':
                    showNotification('Opening check-in scheduler...');
                    break;
            }
            
            // Animate card
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Initialize Add Guest Button
function initializeAddGuestButton() {
    const addBtn = document.querySelector('.add-guest-btn');
    
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            showNotification('Opening guest registration form...');
            
            // Simulate opening form
            setTimeout(() => {
                showNotification('Enter guest details and lease information');
            }, 500);
        });
    }
}

// Show notification
function showNotification(message) {
    // Remove existing notifications
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideUp 0.3s ease forwards, slideDown 0.3s ease 2.7s forwards;
    `;
    
    document.body.appendChild(toast);
    
    // Add animation styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
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
    setTimeout(() => toast.remove(), 3000);
}