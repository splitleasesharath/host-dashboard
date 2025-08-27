// Manuals Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    initializeManualCards();
    initializeFilterTabs();
    initializeSearch();
    initializeAIPanel();
    initializeTemplateOptions();
    initializeCreateButton();
});

// Initialize Manual Cards
function initializeManualCards() {
    // Manual action buttons
    document.querySelectorAll('.manual-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.manual-card');
            const title = card.querySelector('.manual-title')?.textContent || 'Manual';
            const action = this.textContent.toLowerCase();
            
            switch(action) {
                case 'edit':
                case 'continue editing':
                    showNotification(`Opening editor for: ${title}`);
                    // Simulate opening editor
                    setTimeout(() => {
                        window.location.href = '#editor';
                    }, 500);
                    break;
                    
                case 'preview':
                    showNotification(`Loading preview...`);
                    // Open guest manual in new tab
                    setTimeout(() => {
                        window.open('../guest-house-manual/index.html', '_blank');
                    }, 500);
                    break;
                    
                case 'share':
                    copyShareLink(title);
                    break;
                    
                case 'publish':
                    publishManual(card, title);
                    break;
            }
        });
    });
    
    // Manual menu buttons
    document.querySelectorAll('.manual-menu-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showManualMenu(this);
        });
    });
}

// Copy share link
function copyShareLink(title) {
    const link = `https://house-manual.app/view/${title.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Create temporary input to copy
    const tempInput = document.createElement('input');
    tempInput.value = link;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    showNotification('Share link copied to clipboard!');
    
    // Update button temporarily
    const shareBtn = event.target;
    const originalText = shareBtn.textContent;
    shareBtn.textContent = 'Copied!';
    shareBtn.style.background = '#4CAF50';
    shareBtn.style.borderColor = '#4CAF50';
    
    setTimeout(() => {
        shareBtn.textContent = originalText;
        shareBtn.style.background = '';
        shareBtn.style.borderColor = '';
    }, 2000);
}

// Publish manual
function publishManual(card, title) {
    showNotification(`Publishing ${title}...`);
    
    // Simulate publishing
    setTimeout(() => {
        // Update status
        const statusBadge = card.querySelector('.manual-status');
        statusBadge.textContent = 'Active';
        statusBadge.className = 'manual-status active';
        
        // Update card data attribute
        card.dataset.status = 'active';
        
        // Update buttons
        const publishBtn = card.querySelector('.manual-btn.publish');
        if (publishBtn) {
            publishBtn.textContent = 'Share';
            publishBtn.className = 'manual-btn share primary';
        }
        
        showNotification(`${title} has been published successfully!`);
    }, 1500);
}

// Show manual context menu
function showManualMenu(button) {
    // Remove existing menus
    document.querySelectorAll('.manual-context-menu').forEach(menu => menu.remove());
    
    const menu = document.createElement('div');
    menu.className = 'manual-context-menu';
    menu.innerHTML = `
        <div class="menu-item">Duplicate</div>
        <div class="menu-item">Archive</div>
        <div class="menu-item">Export PDF</div>
        <div class="menu-item">View Analytics</div>
        <div class="menu-item danger">Delete</div>
    `;
    
    // Position menu
    const rect = button.getBoundingClientRect();
    menu.style.position = 'absolute';
    menu.style.top = rect.bottom + 'px';
    menu.style.right = (window.innerWidth - rect.right) + 'px';
    menu.style.background = 'white';
    menu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    menu.style.borderRadius = '8px';
    menu.style.padding = '8px 0';
    menu.style.zIndex = '1000';
    menu.style.minWidth = '150px';
    
    document.body.appendChild(menu);
    
    // Add menu item styles
    menu.querySelectorAll('.menu-item').forEach(item => {
        item.style.padding = '10px 16px';
        item.style.cursor = 'pointer';
        item.style.fontSize = '14px';
        item.style.transition = 'background 0.2s';
        
        if (item.classList.contains('danger')) {
            item.style.color = '#dc3545';
        }
        
        item.addEventListener('mouseenter', function() {
            this.style.background = '#f5f5f5';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
        
        item.addEventListener('click', function() {
            const action = this.textContent;
            const card = button.closest('.manual-card');
            const title = card.querySelector('.manual-title').textContent;
            
            handleMenuAction(action, card, title);
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

// Handle menu actions
function handleMenuAction(action, card, title) {
    switch(action) {
        case 'Duplicate':
            showNotification(`Creating duplicate of ${title}...`);
            break;
        case 'Archive':
            showNotification(`Archiving ${title}...`);
            card.style.opacity = '0.5';
            break;
        case 'Export PDF':
            showNotification(`Exporting ${title} to PDF...`);
            break;
        case 'View Analytics':
            showNotification(`Loading analytics for ${title}...`);
            break;
        case 'Delete':
            if (confirm(`Are you sure you want to delete "${title}"?`)) {
                card.style.transform = 'scale(0.9)';
                card.style.opacity = '0';
                setTimeout(() => card.remove(), 300);
                showNotification(`${title} has been deleted`);
            }
            break;
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
            filterManuals(filter);
        });
    });
}

// Filter manuals
function filterManuals(filter) {
    const cards = document.querySelectorAll('.manual-card:not(.template-card)');
    
    cards.forEach(card => {
        const status = card.dataset.status;
        let show = false;
        
        switch(filter) {
            case 'all manuals':
                show = true;
                break;
            case 'active':
                show = status === 'active';
                break;
            case 'draft':
                show = status === 'draft';
                break;
            case 'archived':
                show = status === 'archived';
                break;
            default:
                show = true;
        }
        
        card.style.display = show ? 'block' : 'none';
    });
    
    showNotification(`Showing ${filter} manuals`);
}

// Initialize Search
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.manual-card:not(.template-card)');
            
            cards.forEach(card => {
                const title = card.querySelector('.manual-title').textContent.toLowerCase();
                const property = card.querySelector('.manual-property').textContent.toLowerCase();
                const visible = title.includes(searchTerm) || property.includes(searchTerm);
                
                card.style.display = visible ? 'block' : 'none';
            });
        });
    }
}

// Initialize AI Panel
function initializeAIPanel() {
    // AI suggestion cards
    document.querySelectorAll('.suggestion-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showNotification(`Starting AI task: ${title}`);
            
            // Animate card
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // AI input
    const aiInput = document.querySelector('.ai-input input');
    const aiSend = document.querySelector('.ai-send');
    
    if (aiInput && aiSend) {
        const sendMessage = () => {
            const message = aiInput.value.trim();
            if (message) {
                showNotification(`AI Processing: "${message}"`);
                aiInput.value = '';
                
                // Update AI status
                const aiStatus = document.querySelector('.ai-status');
                if (aiStatus) {
                    aiStatus.textContent = 'Processing...';
                    aiStatus.style.color = '#FF9800';
                    
                    setTimeout(() => {
                        aiStatus.textContent = 'Ready to help';
                        aiStatus.style.color = '#4CAF50';
                        showNotification('AI suggestion applied to manual');
                    }, 2000);
                }
            }
        };
        
        aiSend.addEventListener('click', sendMessage);
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Initialize Template Options
function initializeTemplateOptions() {
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const template = this.textContent;
            showNotification(`Creating ${template} manual from template...`);
            
            // Simulate template creation
            setTimeout(() => {
                showNotification(`${template} manual created! Opening editor...`);
            }, 1000);
        });
    });
}

// Initialize Create Button
function initializeCreateButton() {
    const createBtn = document.querySelector('.create-manual-btn');
    
    if (createBtn) {
        createBtn.addEventListener('click', function() {
            showNotification('Opening manual creator...');
            
            // Simulate opening creator modal/page
            setTimeout(() => {
                showNotification('Choose a template or start from scratch');
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