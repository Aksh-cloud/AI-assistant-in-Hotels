const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
const totalPrice = localStorage.getItem('totalPrice');

function displayOrderSummary() {
    const orderSummaryDiv = document.getElementById('order-summary');

    if (orderDetails && orderDetails.length > 0) {
        let orderHTML = '';

        orderDetails.forEach(order => {
            orderHTML += `<p>${order.quantity} x ${order.item} - ₹${order.price.toFixed(2)}</p>`;
        });

        orderHTML += `<h2>Total: ₹${totalPrice}</h2>`;
        orderSummaryDiv.innerHTML = orderHTML;
    } else {
        orderSummaryDiv.innerHTML = '<p>No order details found.</p>';
    }
}


displayOrderSummary();


function payNow() {
    localStorage.removeItem('orderDetails');
    localStorage.removeItem('totalPrice');
    window.location.href = 'pay.html'; 
}


function goBack() {
    localStorage.removeItem('orderDetails');
    localStorage.removeItem('totalPrice');
    window.location.href = 'index.html'; 
}
