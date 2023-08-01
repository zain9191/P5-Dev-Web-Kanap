document.addEventListener('DOMContentLoaded', function () {
    // Retrieve order details from localStorage
    let orderDetails = localStorage.getItem('orderDetails');
    orderDetails = JSON.parse(orderDetails);
  
    if (orderDetails) {
        console.log(orderDetails)
      // Display the order details on the confirmation page
      const orderIdElement = document.getElementById("orderId");
      orderIdElement.textContent = orderDetails.orderId; // Display the order ID received from the API
  
      const confirmationElement = document.querySelector(".confirmation");
      const confirmationMessage = `Merci, ${orderDetails.firstName} ${orderDetails.lastName}, pour votre commande ! Votre commande a été confirmée avec l'identifiant : ${orderDetails.orderId}. Un e-mail a été envoyé à ${orderDetails.email} avec les détails de la commande.`;
      
      // Update the confirmation message on the page
      confirmationElement.textContent = confirmationMessage;
    }
  });
  