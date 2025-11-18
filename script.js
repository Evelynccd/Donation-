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
    // 您可以在此處加入更多商品。記得手動調整 status: "available" 或 "reserved"
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
 * 這是點擊卡片後，會彈出的視窗
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

    itemModal.style.display = "block"; // 顯示模態視窗
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
            showModal(itemId); // <--- 點擊卡片，會執行 showModal 函數
        });
    });
}

// --- Initialization and Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // 初始載入所有商品
    renderItems(donationItems);
    
    // 1. Filter button logic (篩選按鈕功能)
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // 切換按鈕的 active 狀態
            document.querySelector('.filter-btn.active').classList.remove('active');
            e.target.classList.add('active');

            const filterCategory = e.target.textContent;
            
            // 根據篩選條件重新渲染商品列表
            if (filterCategory === 'All Items') {
                renderItems(donationItems);
            } else {
                const filteredItems = donationItems.filter(item => item.category === filterCategory);
                renderItems(filteredItems);
            }
        });
    });

    // 2. Modal Close Listeners (模態視窗關閉功能)
    closeModalBtn.addEventListener('click', closeModal); // 點擊 X 關閉

    // 點擊視窗外圍關閉
    window.addEventListener('click', (event) => {
        if (event.target === itemModal) {
            closeModal();
        }
    });

    // 按下 ESC 鍵關閉
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && itemModal.style.display === 'block') {
            closeModal();
        }
    });
    
    // 3. Form Submission Success Check (表單成功提交後的提示)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submission') === 'success') {
        // 彈出成功提示框
        alert("Thank you! Your donation item has been submitted successfully. We will review it soon!");
        
        // 清理 URL 參數
        history.replaceState(null, '', window.location.pathname);
    }
});
