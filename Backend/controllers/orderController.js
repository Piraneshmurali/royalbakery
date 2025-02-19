const twilio = require('twilio');
const Order = require("../models/Order");

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.createOrder = async (req, res) => {
  try {
    const {
      cakeId,
      toppings,
      message,
      occasion,
      customerName,
      customerPhone,
      address,
    } = req.body;

    const order = new Order({
      cakeId,
      toppings,
      message,
      occasion,
      customerName,
      customerPhone,
      address,
    });
    
    await order.save();

    // Admin phone number
    const adminPhone = '+94766203349'; // Admin phone number
    
    // Send WhatsApp message to admin
    const adminMessage = `New order received:
      Customer Name: ${customerName}
      Cake: ${cakeId}
      Occasion: ${occasion}
      Message: ${message}
      Address: ${address}`;
    
    await client.messages.create({
      body: adminMessage,
      from: process.env.TWILIO_WHATSAPP_SANDBOX_NUMBER,  // Twilio WhatsApp sandbox number
      to: `whatsapp:${adminPhone}`,
    });

    // Send WhatsApp message to customer
    const customerMessage = `Hello ${customerName}, your order has been received and is being processed. We will contact you soon.`;
    
    await client.messages.create({
      body: customerMessage,
      from: process.env.TWILIO_WHATSAPP_SANDBOX_NUMBER,  // Twilio WhatsApp sandbox number
      to: `whatsapp:${customerPhone}`,  // Customer's phone number
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
