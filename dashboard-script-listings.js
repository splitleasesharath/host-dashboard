// Load full listings content function (extracted for better management)
function loadListingsContent() {
    const listingsSection = document.querySelector('.listings-section');
    if (!listingsSection) return;
    
    // Load exact content from listings.html (main content only, without sidebar/header)
    const listingsHTML = `
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

        <!-- Tab Content -->
        <div class="tabs-content">
            <!-- Overview Tab -->
            <div class="tab-pane active" id="overview">
                <div class="overview-grid">
                    <div class="overview-card">
                        <h3>Quick Stats</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-value">2</span>
                                <span class="stat-label">Bedrooms</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">2</span>
                                <span class="stat-label">Bathrooms</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">4</span>
                                <span class="stat-label">Max Guests</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">$160</span>
                                <span class="stat-label">Per Night</span>
                            </div>
                        </div>
                    </div>

                    <div class="overview-card">
                        <h3>Lease Style</h3>
                        <div class="lease-style">
                            <span class="lease-type">Nightly</span>
                            <span class="lease-range">2-7 nights/week</span>
                        </div>
                        <div class="occupancy-rates">
                            <div class="rate-item">
                                <span>2 nights/wk:</span>
                                <strong>$500</strong>
                            </div>
                            <div class="rate-item">
                                <span>3 nights/wk:</span>
                                <strong>$600</strong>
                            </div>
                            <div class="rate-item">
                                <span>4 nights/wk:</span>
                                <strong>$700</strong>
                            </div>
                        </div>
                    </div>

                    <div class="overview-card">
                        <h3>Description</h3>
                        <p class="description-text">
                            Experience comfort and convenience in this welcoming two-bedroom private room in Milford, OH. Perfect for those seeking a peaceful retreat, this thoughtfully designed space offers a cozy bed, two full bathrooms, and a practical kitchenette—ideal for preparing quick meals...
                        </p>
                        <button class="edit-description">Edit Description</button>
                    </div>
                </div>
            </div>

            <!-- Pricing & Availability Tab -->
            <div class="tab-pane" id="pricing">
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <h3>Pricing Structure</h3>
                        <div class="price-inputs">
                            <div class="price-row">
                                <label>Base Nightly Rate</label>
                                <input type="number" value="160" class="price-input">
                            </div>
                            <div class="price-row">
                                <label>Damage Deposit</label>
                                <input type="number" value="800" class="price-input">
                            </div>
                            <div class="price-row">
                                <label>Maintenance Fee</label>
                                <input type="number" value="0" class="price-input">
                            </div>
                        </div>
                    </div>

                    <div class="availability-calendar">
                        <h3>Availability Calendar</h3>
                        <div class="calendar-controls">
                            <button class="cal-nav prev">‹</button>
                            <span class="cal-month">August 2025</span>
                            <button class="cal-nav next">›</button>
                        </div>
                        <div class="calendar-grid">
                            <div class="cal-header">Sun</div>
                            <div class="cal-header">Mon</div>
                            <div class="cal-header">Tue</div>
                            <div class="cal-header">Wed</div>
                            <div class="cal-header">Thu</div>
                            <div class="cal-header">Fri</div>
                            <div class="cal-header">Sat</div>
                            
                            <div class="cal-day available">26</div>
                            <div class="cal-day blocked">27</div>
                            <div class="cal-day blocked">28</div>
                            <div class="cal-day blocked">29</div>
                            <div class="cal-day blocked">30</div>
                            <div class="cal-day blocked">31</div>
                            <div class="cal-day available">01</div>
                        </div>
                        <div class="calendar-legend">
                            <span><span class="dot available"></span> Available</span>
                            <span><span class="dot blocked"></span> Blocked</span>
                            <span><span class="dot restricted"></span> Restricted</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Other tabs continue... -->
        </div>

        <!-- Co-Host Request Section -->
        <div class="cohost-section">
            <h3>Co-Host Management</h3>
            <button class="request-cohost-btn">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                </svg>
                Request Co-Host
            </button>
        </div>
    `;
    
    listingsSection.innerHTML = listingsHTML;
    
    // Initialize listings functionality
    initializeListingsTabs();
    initializeListingsInteractions();
}

function initializeListingsTabs() {
    const tabBtns = document.querySelectorAll('.listings-section .tab-btn');
    const tabPanes = document.querySelectorAll('.listings-section .tab-pane');
    
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

function initializeListingsInteractions() {
    // AI Suggestions button
    const aiBtn = document.querySelector('.listings-section .ai-suggest-btn');
    const panel = document.querySelector('.listings-section #aiSuggestionsPanel');
    
    if (aiBtn && panel) {
        aiBtn.addEventListener('click', () => {
            panel.classList.toggle('active');
        });
    }
    
    // Other interactions can be added here
}