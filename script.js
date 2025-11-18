// Sample Donation Items (You must manually update this array)
const donationItems = [
    {
        id: 1,
        name: "Morandi Blue Sweater",
        description: "Warm and soft sweater, size M, 90% new, great for winter.",
        category: "Apparel",
        status: "available", // available, reserved, claimed
        contact: "john.doe@email.com", // Hidden, used for button action
        image: "https://via.placeholder.com/400x200/9CAFB7/FFFFFF?text=Item+Image+1" // Replace with actual image link
    },
    {
        id: 2,
        name: "Classic Fairy Tale Book Set",
        description: "Set of five books, no scribbles, suitable for 3-6 year olds, well-preserved.",
        category: "Books",
        status: "reserved",
        contact: "jane.smith@email.com",
        image: "https://via.placeholder.com/400x200/C5A3A0/FFFFFF?text=Item+Image+2"
    },
    {
        id: 3,
        name: "Small Tabletop Blender",
        description: "In working condition, ideal for beginner bakers, comes with original box.",
        category: "Appliances",
        status: "available",
        contact: "mike.jones@email.com",
        image: "https://via.placeholder.com/400x200/D9CFCF/4A4A4A?text=Item+Image+3"
    },
    {
        id: 4,
        name: "New Unopened Building Blocks Toy",
        description: "1000 pieces of blocks, suitable for ages 8+, vibrant colors, fosters creativity.",
        category: "Others",
        status: "available",
        contact: "sara.lee@email.com",
        image: "https://via.placeholder.com/400x200/9CAFB7/FFFFFF?text=Item+Image+4"
    }
];

const itemListContainer = document.getElementById('item-list');

/**
 * Returns the status text and corresponding CSS class based on the item status.
 * @param {string} status 
 * @returns {object}
 */
function getStatusInfo(status) {
    switch (status) {
        case 'reserved':
            return { text: 'Reserved', class: 'status-reserved' };
        case 'claimed':
            return { text: 'Claimed', class: 'status-claimed' }; // Add CSS style for claimed if needed
        case 'available':
        default:
            return { text: 'Available', class: 'status-available' };
    }
}

/**
 * Creates the HTML structure for a single item card.
 * @param {object} item 
 * @returns {string} HTML string
 */
function createItemCard(item) {
    const statusInfo = getStatusInfo(item.status);
    const isAvailable = item.status === 'available';

    return `
        <div class="donation-card">
            <img src="${item.image}" alt="${item.name}" class="card-image">
            <span class="item-status ${statusInfo.class}">${statusInfo.text}</span>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p><strong>Category:</strong> ${item.category}</p>
                <p>${item.description}</p>
                ${isAvailable ? 
                    `<button class="contact-btn" onclick="alert('To claim this item, please contact the donor at: ${item.contact}')">I Want This</button>` 
                    : `<button class="contact-btn" disabled>View Details</button>`
                }
            </div>
        </div>
    `;
}

/**
 * Renders all items to the page.
 * @param {Array} items 
 */
function renderItems(items) {
    itemListContainer.innerHTML = ''; // Clear existing content
    if (items.length === 0) {
        itemListContainer.innerHTML = '<p>Currently, there are no items available for donation.</p>';
        return;
    }
    
    items.forEach(item => {
        itemListContainer.innerHTML += createItemCard(item);
    });
}

// Renders the initial item list and sets up filter functionality
document.addEventListener('DOMContentLoaded', () => {
    renderItems(donationItems);
    
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Update active state
            document.querySelector('.filter-btn.active').classList.remove('active');
            e.target.classList.add('active');

            const filterCategory = e.target.textContent;
            
            if (filterCategory === 'All Items') {
                renderItems(donationItems);
            } else {
                const filteredItems = donationItems.filter(item => item.category === filterCategory);
                renderItems(filteredItems);
            }
        });
    });
});
