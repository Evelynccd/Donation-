// Sample Donation Items (Your data source - manually update this array)
const donationItems = [
    {
        id: 1,
        name: "Morandi Blue Sweater",
        description: "Warm and soft sweater, size M, 90% new, great for winter. Made of cashmere blend. Only washed once with gentle detergent.",
        category: "Apparel",
        status: "available", // available, reserved, claimed
        contact: "Donor's Email: john.doe@email.com", // This is the detail shown in the modal
        image: "https://via.placeholder.com/600x300/9CAFB7/FFFFFF?text=Sweater+Image" 
    },
    {
        id: 2,
        name: "Classic Fairy Tale Book Set",
        description: "Set of five books: Cinderella, Snow White, etc. No scribbles, suitable for 3-6 year olds, well-preserved. Minor wear on the corners of the box.",
        category: "Books",
        status: "reserved",
        contact: "Line ID: Jane123",
        image: "https://via.placeholder.com/600x300/C5A3A0/FFFFFF?text=Book+Set+Image"
    },
    {
        id: 3,
        name: "Small Tabletop Blender",
        description: "Brand X blender, 300W. Functioning normally, perfect for smoothies or sauces. Comes with original box and instruction manual.",
        category: "Appliances",
        status: "available",
        contact: "WeChat ID: MikeJones88",
        image: "https://via.placeholder.com/600x300/D9CFCF/4A4A4A?text=Blender+Image"
    }
    // Add more items here...
];

const itemListContainer = document.getElementById('item-list');
const itemModal = document.getElementById('item-modal');
const modalDetailsContent = document.getElementById('modal-details-content');
const closeModalBtn = document.querySelector('.close-btn');

/**
 * Returns the status text and corresponding CSS class.
 */
function getStatusInfo(status) {
    switch (status) {
        case 'reserved':
            return { text: 'Reserved', class: 'status-reserved' };
        case 'claimed':
            return { text: 'Claimed', class: 'status-claimed' };
        case 'available':
        default:
            return { text: 'Available', class: 'status-available' };
    }
}

/**
 * Creates the HTML structure for a single item card (The summary view).
 */
function createItemCard(item) {
    const statusInfo = getStatusInfo(item.status);

    return `
        <div class="donation-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="card-image">
            <span class="item-status ${statusInfo.class}">${statusInfo.text}</span>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p><strong>Category:</strong> ${item.category}</p>
                <p>${item.description.substring(0, 50)}...</p>
                <button class="contact-btn" style="pointer-events: none;">View Details</button>
            </div>
        </div>
    `;
}

/**
 * Opens the modal and injects the selected item's detailed information.
 */
function showModal(itemId) {
    const item = donationItems.find(i => i.id === itemId);
    if (!item) return;

    const statusInfo = getStatusInfo(item.status);
    
    // Construct the detailed HTML content for the modal
    modalDetailsContent.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}" />
        <p class="item-status ${statusInfo.class}" style="position: static; display: inline-block;">${statusInfo.text}</p>
        
        <h3>Full Description:</h3>
        <p>${item.description}</p>
        
        <h3>Category:</h3>
        <p>${item.category}</p>
        
        <div class="modal-contact-info">
            <h4>Contact Donor:</h4>
            ${item.status === 'available' ? 
                `<p>Please use this info to coordinate pickup:</p>
                 <p><strong>${item.contact}</strong></p>
                 <small>Note: Site owner is not responsible for the handover.</small>` 
                : `<p>This item is currently **${statusInfo.text.toUpperCase()}**.</p>`
            }
        </div>
    `;

    itemModal.style.display = "block";
}

/**
 * Closes the modal.
 */
function closeModal() {
    itemModal.style.display = "none";
}

/**
 * Renders all items to the page and attaches event listeners.
 */
function renderItems(items) {
    itemListContainer.innerHTML = '';
    if (items.length === 0) {
        itemListContainer.innerHTML = '<p>Currently, there are no items available for donation.</p>';
        return;
    }
    
    items.forEach(item => {
        itemListContainer.innerHTML += createItemCard(item);
    });

    // Attach click listener to each card for modal opening
    document.querySelectorAll('.donation-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const itemId = parseInt(e.currentTarget.dataset.id);
            showModal(itemId);
        });
    });
}

// --- Initialization and Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    renderItems(donationItems);
    
    // 1. Filter button logic
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
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

    // 2. Modal Close Listeners
    closeModalBtn.addEventListener('click', closeModal);

    // Close the modal if the user clicks anywhere outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === itemModal) {
            closeModal();
        }
    });

    // Close the modal when the ESC key is pressed
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && itemModal.style.display === 'block') {
            closeModal();
        }
    });
});
// --- (放在 script.js 的最下方，DOMContentLoaded 區塊內) ---

    // 3. Form Submission Success Check (處理表單提交後的成功提示)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submission') === 'success') {
        // 彈出一個提示框 (Alert box) 告知使用者提交成功
        alert("Thank you! Your donation item has been submitted successfully. We will review it soon!");
        
        // 清除 URL 中的參數，保持網址列乾淨
        history.replaceState(null, '', window.location.pathname);
    }
}); // 這是 DOMContentLoaded 的結尾
