// Complete listings content from listings.html
function getListingsHTMLContent() {
    return `
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

            <!-- Details & Amenities Tab -->
            <div class="tab-pane" id="details">
                <div class="details-grid">
                    <div class="amenities-section">
                        <h3>In-Unit Amenities</h3>
                        <div class="amenities-list">
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Air Conditioned</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>WiFi</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>TV</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Kitchenette</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Closet</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Towels and Linens</span>
                            </label>
                        </div>
                    </div>

                    <div class="amenities-section">
                        <h3>Building Amenities</h3>
                        <div class="amenities-list">
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Gym</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Elevator</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Laundry Room</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Bike Storage</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Gated</span>
                            </label>
                        </div>
                    </div>

                    <div class="safety-section">
                        <h3>Safety Features</h3>
                        <div class="amenities-list">
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Smoke Detector</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>Carbon Monoxide Detector</span>
                            </label>
                            <label class="amenity-item">
                                <input type="checkbox" checked>
                                <span>First Aid Kit</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Photos & Tours Tab -->
            <div class="tab-pane" id="photos">
                <div class="photos-section">
                    <div class="upload-area">
                        <svg viewBox="0 0 24 24" width="48" height="48">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="none" stroke="currentColor" stroke-width="2"/>
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                        </svg>
                        <h3>Upload Photos</h3>
                        <p>Drag & drop images here or click to browse</p>
                        <button class="upload-btn">Choose Files</button>
                    </div>
                    
                    <div class="photos-grid">
                        <div class="photo-item cover">
                            <img src="https://via.placeholder.com/300x200" alt="Cover">
                            <span class="photo-badge">Cover Photo</span>
                            <button class="photo-delete">×</button>
                        </div>
                        <div class="photo-item">
                            <img src="https://via.placeholder.com/300x200" alt="Room">
                            <button class="photo-delete">×</button>
                        </div>
                    </div>

                    <div class="virtual-tour-section">
                        <h3>Virtual Tour</h3>
                        <button class="upload-tour-btn">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/>
                            </svg>
                            Upload Virtual Tour
                        </button>
                    </div>
                </div>
            </div>

            <!-- Rules & Policies Tab -->
            <div class="tab-pane" id="rules">
                <div class="rules-section">
                    <h3>House Rules</h3>
                    <div class="rules-editor">
                        <div class="rule-item">
                            <input type="text" placeholder="Add a house rule..." class="rule-input">
                            <button class="add-rule">+</button>
                        </div>
                        <div class="rules-list">
                            <div class="rule">
                                <span>No smoking</span>
                                <button class="remove-rule">×</button>
                            </div>
                            <div class="rule">
                                <span>No parties or events</span>
                                <button class="remove-rule">×</button>
                            </div>
                        </div>
                    </div>

                    <div class="policies-section">
                        <h3>Guest Policies</h3>
                        <div class="policy-item">
                            <label>Maximum Guests</label>
                            <input type="number" value="4" class="policy-input">
                        </div>
                        <div class="policy-item">
                            <label>Check-in Time</label>
                            <input type="time" value="14:00" class="policy-input">
                        </div>
                        <div class="policy-item">
                            <label>Check-out Time</label>
                            <input type="time" value="11:00" class="policy-input">
                        </div>
                        <div class="policy-item">
                            <label>Cancellation Policy</label>
                            <select class="policy-input">
                                <option>Flexible</option>
                                <option>Moderate</option>
                                <option>Strict</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- House Manual Tab -->
            <div class="tab-pane" id="manual">
                <div class="manual-integration">
                    <div class="manual-header">
                        <h3>House Manual</h3>
                        <div class="manual-actions">
                            <button class="generate-manual-btn">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" fill="currentColor"/>
                                </svg>
                                AI Generate
                            </button>
                            <button class="preview-manual-btn">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                                </svg>
                                Preview
                            </button>
                            <button class="edit-manual-btn">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                                </svg>
                                Edit Manual
                            </button>
                        </div>
                    </div>
                    
                    <div class="manual-preview">
                        <div class="manual-content">
                            <h4>Welcome to Your Cozy Retreat</h4>
                            <div class="manual-section">
                                <h5>Check-in Instructions</h5>
                                <p>Building entry code: [Generated from listing data]</p>
                                <p>Unit: 2BR Suite</p>
                                <p>Check-in time: 2:00 PM</p>
                            </div>
                            <div class="manual-section">
                                <h5>WiFi & Connectivity</h5>
                                <p>Network: Guest_WiFi</p>
                                <p>Password: [Auto-generated secure password]</p>
                            </div>
                            <div class="manual-section">
                                <h5>Amenities</h5>
                                <ul>
                                    <li>Kitchenette with microwave and mini-fridge</li>
                                    <li>Gym access on ground floor</li>
                                    <li>Laundry room - 3rd floor</li>
                                </ul>
                            </div>
                        </div>
                        <div class="manual-formats">
                            <h5>Export Formats</h5>
                            <button class="format-btn">PDF</button>
                            <button class="format-btn">Web Link</button>
                            <button class="format-btn">QR Code</button>
                        </div>
                    </div>
                </div>
            </div>
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
}