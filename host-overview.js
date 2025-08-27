// Host Overview JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // User menu dropdown
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            // Add dropdown functionality here if needed
        });
    }
    
    // Create New Listing button
    const addListingBtn = document.querySelector('.add-listing-btn');
    if (addListingBtn) {
        addListingBtn.addEventListener('click', function() {
            alert('Create New Listing feature will be available soon!');
            // Future: Open create listing modal or redirect to listing creation page
        });
    }
    
    // Import Listing button
    const importListingBtn = document.querySelector('.import-listing-btn');
    if (importListingBtn) {
        importListingBtn.addEventListener('click', function() {
            alert('Import Listing feature will be available soon!');
            // Future: Open import dialog or integration with external platforms
        });
    }
    
    // Action buttons for each listing
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.classList[1]; // get create, edit, or manage class
            const listingCard = this.closest('.listing-card');
            const listingTitle = listingCard.querySelector('.listing-title').textContent;
            
            switch(action) {
                case 'create':
                    console.log('Creating manual for:', listingTitle);
                    // Redirect to manual creation page
                    window.location.href = 'dashboard.html#create-manual';
                    break;
                case 'edit':
                    console.log('Editing manual for:', listingTitle);
                    // Redirect to manual editing page
                    window.location.href = 'manuals.html#edit';
                    break;
                case 'manage':
                    console.log('Managing listing:', listingTitle);
                    // Already has onclick in HTML to go to dashboard
                    break;
            }
        });
    });
    
    // Listing card click handler
    const listingCards = document.querySelectorAll('.listing-card');
    listingCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking on action buttons
            if (!e.target.closest('.action-btn')) {
                const listingTitle = this.querySelector('.listing-title').textContent;
                console.log('Viewing listing details:', listingTitle);
                // Future: Show listing details modal or page
            }
        });
    });
    
    // Stats cards click handlers
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            const statLabel = this.querySelector('.stat-label').textContent;
            console.log('Viewing', statLabel);
            
            // Navigate based on stat type
            if (statLabel.includes('Listings')) {
                window.location.href = 'listings.html';
            } else if (statLabel.includes('Proposals')) {
                window.location.href = 'dashboard.html#proposals';
            } else if (statLabel.includes('Leases')) {
                window.location.href = 'dashboard.html#leases';
            } else if (statLabel.includes('Manuals')) {
                window.location.href = 'manuals.html';
            }
        });
    });
    
    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            console.log('Opening notifications');
            // Future: Show notifications dropdown
        });
    }
    
    // Help link
    const helpLink = document.querySelector('.help-link');
    if (helpLink) {
        helpLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Co-host specialist support coming soon!');
            // Future: Open help/support modal or chat
        });
    }
    
    // Animate stats on scroll into view
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.5s ease-out';
            }
        });
    }, observerOptions);
    
    // Observe stat cards
    statCards.forEach(card => {
        observer.observe(card);
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .stat-card {
        cursor: pointer;
    }
    
    .listing-card {
        cursor: pointer;
    }
`;
document.head.appendChild(style);