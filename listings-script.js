// Listings Page Scripts

// Only initialize automatically if this is the standalone listings page
if (window.location.pathname.includes('listings.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeTabs();
        initializeAISuggestions();
        initializeEditable();
        initializeCalendar();
        initializePhotoUpload();
        initializeRulesManager();
        initializeManualGeneration();
    });
}

// Tab Navigation
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
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
}

// AI Suggestions Panel
function initializeAISuggestions() {
    const aiBtn = document.getElementById('aiSuggestBtn');
    const panel = document.getElementById('aiSuggestionsPanel');
    
    if (aiBtn && panel) {
        aiBtn.addEventListener('click', () => {
            panel.classList.toggle('active');
            
            // Generate suggestions if opening
            if (panel.classList.contains('active')) {
                generateAISuggestions();
            }
        });
    }
    
    // Apply suggestion buttons
    document.querySelectorAll('.apply-suggestion').forEach(btn => {
        btn.addEventListener('click', function() {
            const suggestion = this.closest('.suggestion-item');
            const content = suggestion.querySelector('p').textContent;
            
            // Show notification
            showNotification(`Suggestion applied: ${content.substring(0, 50)}...`);
            
            // Animate the button
            this.textContent = 'Applied ✓';
            this.style.background = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = 'Apply';
                this.style.background = '';
            }, 2000);
        });
    });
}

// Generate AI Suggestions (Mock)
function generateAISuggestions() {
    const suggestions = [
        {
            icon: '💡',
            title: 'Improve SEO',
            text: 'Add location-specific keywords like "Near University" or "Downtown Access"'
        },
        {
            icon: '📸',
            title: 'Photo Recommendation',
            text: 'Properties with 10+ photos get 40% more views. Add 5 more photos.'
        },
        {
            icon: '💰',
            title: 'Dynamic Pricing',
            text: 'Enable weekend pricing - increase Friday/Saturday rates by 20%'
        }
    ];
    
    // Could dynamically add suggestions here
    console.log('AI Suggestions generated:', suggestions);
}

// Make elements editable
function initializeEditable() {
    const editables = document.querySelectorAll('.editable');
    
    editables.forEach(element => {
        element.addEventListener('blur', function() {
            const newValue = this.textContent.trim();
            console.log('Updated:', newValue);
            showNotification('Changes saved automatically');
        });
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.blur();
            }
        });
    });
}

// Calendar Functionality
function initializeCalendar() {
    const prevBtn = document.querySelector('.cal-nav.prev');
    const nextBtn = document.querySelector('.cal-nav.next');
    const monthDisplay = document.querySelector('.cal-month');
    
    let currentMonth = 7; // August (0-indexed)
    let currentYear = 2025;
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar(currentMonth, currentYear);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar(currentMonth, currentYear);
        });
    }
    
    // Click on calendar days
    document.querySelectorAll('.cal-day').forEach(day => {
        day.addEventListener('click', function() {
            // Toggle between available/blocked
            if (this.classList.contains('available')) {
                this.classList.remove('available');
                this.classList.add('blocked');
            } else if (this.classList.contains('blocked')) {
                this.classList.remove('blocked');
                this.classList.add('available');
            }
            
            showNotification('Calendar updated');
        });
    });
}

function updateCalendar(month, year) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    const monthDisplay = document.querySelector('.cal-month');
    if (monthDisplay) {
        monthDisplay.textContent = `${months[month]} ${year}`;
    }
    
    // Here you would regenerate the calendar grid
    console.log(`Calendar updated to ${months[month]} ${year}`);
}

// Photo Upload
function initializePhotoUpload() {
    const uploadArea = document.querySelector('.upload-area');
    const uploadBtn = document.querySelector('.upload-btn');
    
    if (uploadArea) {
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-purple)';
            uploadArea.style.background = 'white';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '';
            uploadArea.style.background = '';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            uploadArea.style.background = '';
            
            const files = e.dataTransfer.files;
            handleFileUpload(files);
        });
        
        // Click to upload
        uploadArea.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = 'image/*';
            input.onchange = (e) => {
                handleFileUpload(e.target.files);
            };
            input.click();
        });
    }
    
    // Delete photo buttons
    document.querySelectorAll('.photo-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const photoItem = this.closest('.photo-item');
            photoItem.style.transform = 'scale(0)';
            setTimeout(() => {
                photoItem.remove();
                showNotification('Photo removed');
            }, 300);
        });
    });
}

function handleFileUpload(files) {
    const fileCount = files.length;
    console.log(`Uploading ${fileCount} files`);
    
    // Mock upload
    showNotification(`${fileCount} photo(s) uploaded successfully`);
    
    // Add photos to grid (mock)
    const photosGrid = document.querySelector('.photos-grid');
    if (photosGrid) {
        for (let i = 0; i < fileCount; i++) {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.innerHTML = `
                <img src="https://via.placeholder.com/300x200?text=New+Photo" alt="New">
                <button class="photo-delete">×</button>
            `;
            photoItem.style.opacity = '0';
            photosGrid.appendChild(photoItem);
            
            setTimeout(() => {
                photoItem.style.transition = 'opacity 0.3s ease';
                photoItem.style.opacity = '1';
            }, 100 * i);
        }
    }
}

// Rules Manager
function initializeRulesManager() {
    const addRuleBtn = document.querySelector('.add-rule');
    const ruleInput = document.querySelector('.rule-input');
    const rulesList = document.querySelector('.rules-list');
    
    if (addRuleBtn && ruleInput) {
        addRuleBtn.addEventListener('click', () => {
            const ruleText = ruleInput.value.trim();
            if (ruleText) {
                addRule(ruleText);
                ruleInput.value = '';
            }
        });
        
        ruleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const ruleText = ruleInput.value.trim();
                if (ruleText) {
                    addRule(ruleText);
                    ruleInput.value = '';
                }
            }
        });
    }
    
    // Remove rule buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-rule')) {
            const rule = e.target.closest('.rule');
            rule.style.transform = 'translateX(-100%)';
            rule.style.opacity = '0';
            setTimeout(() => {
                rule.remove();
                showNotification('Rule removed');
            }, 300);
        }
    });
}

function addRule(text) {
    const rulesList = document.querySelector('.rules-list');
    if (rulesList) {
        const rule = document.createElement('div');
        rule.className = 'rule';
        rule.innerHTML = `
            <span>${text}</span>
            <button class="remove-rule">×</button>
        `;
        rule.style.opacity = '0';
        rule.style.transform = 'translateY(-10px)';
        rulesList.appendChild(rule);
        
        setTimeout(() => {
            rule.style.transition = 'all 0.3s ease';
            rule.style.opacity = '1';
            rule.style.transform = 'translateY(0)';
        }, 10);
        
        showNotification('Rule added');
    }
}

// Manual Generation
function initializeManualGeneration() {
    const generateBtn = document.querySelector('.generate-manual-btn');
    const previewBtn = document.querySelector('.preview-manual-btn');
    const editBtn = document.querySelector('.edit-manual-btn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            // Animate button
            generateBtn.innerHTML = '<span>Generating...</span>';
            generateBtn.disabled = true;
            
            // Simulate AI generation
            setTimeout(() => {
                generateBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"/>
                    </svg>
                    Generated!
                `;
                
                // Update manual preview
                updateManualPreview();
                
                setTimeout(() => {
                    generateBtn.innerHTML = `
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" fill="currentColor"/>
                        </svg>
                        AI Generate
                    `;
                    generateBtn.disabled = false;
                }, 2000);
            }, 2000);
        });
    }
    
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            // Open in new window or modal
            window.open('../index.html', '_blank');
        });
    }
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            showNotification('Opening manual editor...');
            // Would navigate to manual editor
        });
    }
    
    // Format buttons
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.textContent;
            showNotification(`Exporting as ${format}...`);
            
            // Animate button
            this.style.background = 'var(--primary-purple)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
                showNotification(`${format} ready for download`);
            }, 1500);
        });
    });
}

function updateManualPreview() {
    const manualContent = document.querySelector('.manual-content');
    if (manualContent) {
        // Add animation
        manualContent.style.opacity = '0.5';
        
        setTimeout(() => {
            manualContent.innerHTML = `
                <h4>Welcome to Your Cozy 2BR Retreat</h4>
                <div class="manual-section">
                    <h5>Check-in Instructions</h5>
                    <p>Building entry code: 5165</p>
                    <p>Unit: 4B (Fourth Floor)</p>
                    <p>Check-in time: 2:00 PM</p>
                </div>
                <div class="manual-section">
                    <h5>WiFi & Connectivity</h5>
                    <p>Network: Apt4B_Guest</p>
                    <p>Password: NYC2025fix</p>
                </div>
                <div class="manual-section">
                    <h5>Amenities & Features</h5>
                    <ul>
                        <li>Full kitchenette with all essentials</li>
                        <li>Two full bathrooms with towels provided</li>
                        <li>Gym access - Ground floor, code: 1234</li>
                        <li>Laundry room - 3rd floor, coins required</li>
                        <li>Bike storage available in basement</li>
                    </ul>
                </div>
                <div class="manual-section">
                    <h5>House Rules</h5>
                    <ul>
                        <li>No smoking in the unit</li>
                        <li>No parties or events</li>
                        <li>Quiet hours: 10 PM - 8 AM</li>
                        <li>Maximum 4 guests</li>
                    </ul>
                </div>
            `;
            
            manualContent.style.transition = 'opacity 0.3s ease';
            manualContent.style.opacity = '1';
        }, 500);
    }
}

// Show notification (reuse from dashboard)
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