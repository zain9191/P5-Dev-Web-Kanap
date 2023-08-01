// Define the generateOrderId function
function generateOrderId() {
    // Implement your logic to generate a unique order ID here
    // You can use a random number, timestamp, or any other method to create a unique ID
    return 'ORDER-' + Math.floor(Math.random() * 1000000);
  }
  
  // Retrieve order details from localStorage
  let orderDetails = localStorage.getItem('orderDetails');
  orderDetails = JSON.parse(orderDetails);
  
  if (orderDetails) {
    // Display the order details on the confirmation page
    const orderIdElement = document.getElementById("orderId");
    orderIdElement.textContent = generateOrderId(); // Set the generated order ID
  }
  