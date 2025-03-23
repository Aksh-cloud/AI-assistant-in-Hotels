let userName = '';
let orderDetails = [];
let totalPrice = 0;

const menu = [
    { item: "Dosa", price: 90.00 },
    { item: "Idli", price: 60.00 },
    { item: "Vada", price: 50.00 },
    { item: "Upma", price: 70.00 },
    { item: "Pongal", price: 80.00 },
    { item: "Samosa", price: 40.00 },
    { item: "Bhaji Pav", price: 60.00 },
    { item: "Pav Bhaji", price: 80.00 },
    { item: "Masala Dosa", price: 100.00 },
    { item: "Chole Bhature", price: 120.00 },
    { item: "Aloo Paratha", price: 80.00 },
    { item: "Paneer Butter Masala", price: 150.00 },
    { item: "Veg Biryani", price: 130.00 },
    { item: "Gobi Manchurian", price: 90.00 },
    { item: "Palak Paneer", price: 140.00 },
    { item: "Burger", price: 135.00 },
    { item: "Pizza", price: 199.99 },
    { item: "Ice Cream", price: 70.00 }
];

function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
}


function greetUser() {
    userName = document.getElementById('user-name').value;
    if (!userName) {
        speak("Please enter your name to start.");
        return;
    }

    document.getElementById('greeting-container').style.display = 'none';
    document.getElementById('menu-container').style.display = 'block';

    speak(`Welcome to Akshobhya's Restaurant, ${userName}! Let me show you the menu.`);
    displayMenu();
}


function displayMenu() {
    const menuListDiv = document.getElementById('menu-list');
    menuListDiv.innerHTML = ''; // Clear existing menu

    menu.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.classList.add('menu-item');

        menuItemDiv.innerHTML = `
            <input type="checkbox" id="${item.item}" onchange="toggleQuantity('${item.item}')">
            <label for="${item.item}">${item.item} - ₹${item.price}</label>
            <div id="${item.item}-quantity" class="quantity-container">
                <button type="button" class="INDE" onclick="changeQuantity('${item.item}', 'decrease')">-</button>
                <input type="number" class="INDE" id="${item.item}-qty" value="1" min="1" />
                <button type="button" class="INDE" onclick="changeQuantity('${item.item}', 'increase')">+</button>
            </div>
        `;

        menuListDiv.appendChild(menuItemDiv);
    });

    speak("Here is the menu. Please select the items you'd like to order.");
}

function toggleQuantity(itemName) {
    const quantityContainer = document.getElementById(`${itemName}-quantity`);
    const checkbox = document.getElementById(itemName);

    if (checkbox.checked) {
        quantityContainer.style.display = 'block';
        speak(`How many ${itemName}s would you like to order?`);
    } else {
        quantityContainer.style.display = 'none';
    }
}


function changeQuantity(itemName, action) {
    const qtyInput = document.getElementById(`${itemName}-qty`);
    let currentQty = parseInt(qtyInput.value);
    
    if (action === 'increase') {
        currentQty++;
    } else if (action === 'decrease' && currentQty > 1) {
        currentQty--;
    }
    
    qtyInput.value = currentQty;
}


function addToOrder() {
    const menuItems = document.querySelectorAll('.menu-item input[type="checkbox"]:checked');
    menuItems.forEach(item => {
        const itemName = item.id;
        const quantityInput = document.getElementById(`${itemName}-qty`);
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        const menuItem = menu.find(m => m.item === itemName);

        if (menuItem) {
            const orderItem = {
                item: itemName,
                quantity: quantity,
                price: menuItem.price * quantity
            };
            orderDetails.push(orderItem);
            totalPrice += orderItem.price;
            speak(`${quantity} ${itemName}(s) added to your order.`);
        }
    });

    updateOrderSummary();
}


function updateOrderSummary() {
    const orderContainer = document.getElementById('order-container');
    const orderDetailsContainer = document.getElementById('order-details');

    orderDetailsContainer.innerHTML = '';
    orderDetails.forEach(order => {
        orderDetailsContainer.innerHTML += `${order.quantity} x ${order.item} - ₹${order.price.toFixed(2)}<br>`;
    });

    orderDetailsContainer.innerHTML += `<strong>Total: ₹${totalPrice.toFixed(2)}</strong>`;

    orderContainer.style.display = 'block';
    speak("Here's a summary of your order.");
}


function finishOrder() {
    if (orderDetails.length > 0) {
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        localStorage.setItem('totalPrice', totalPrice);
        window.location.href = 'order-details.html'; 
    } else {
        speak("You haven't selected any items. Please add items to your order.");
    }
}


function resetOrder() {
    orderDetails = [];
    totalPrice = 0;
    document.getElementById('order-container').style.display = 'none';
    speak("Your order has been reset. You can start a new order.");
}

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission
    
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');

    if (!selectedPaymentMethod) {
        alert('Please select a payment method.');
    } else {
        alert(`Payment method selected: ${selectedPaymentMethod.value} \nPayment Done.`);
        window.location.href = 'index.html'; 
    }
});
