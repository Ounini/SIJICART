const Order = require("../models/Order");
const { sendOrderStatusMail } = require("../middlewares/mailer");
const { generateInvoice } = require("../middlewares/invoiceGenerator");
const fs = require("fs");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      amount,
      address,
      paymentMethod,
      paymentId,
      name,
      email,
      phone,
    } = req.body;

    console.log(products);

    const transformedProducts = products.map((product) => ({
      productName: product.name,
      quantity: product.quantity,
      color: product.selectedColor,
      productId: product._id,
    }));

    const isPaid = req.body.paymentMethod !== "Pay on Delivery";

    const newOrder = new Order({
      userId,
      products: transformedProducts,
      amount,
      address,
      paymentMethod,
      isPaid,
      paymentId,
      name,
      email,
      phone,
    });

    const invoicePath = await generateInvoice(newOrder);

    const status = newOrder.status;
    // Send status update email
    console.log("user", newOrder.userId);
    const subject = `🛍️ Thank you for your order, ${name}`;
    const html = `
      <h3>Hi ${name},</h3><p>Thank you for shopping with us! 🎉</p><p>Your order has been <strong>successfully placed</strong> and is now being processed. We'll notify you as soon as it ships.</p><p><strong>Order Status:</strong> ${status}</p><p>You can find your invoice attached below for your records.</p><p>If you have any questions, feel free to reply to this email or reach out to our support team.</p><p>We truly appreciate your trust in us and can't wait to deliver your order. 💛</p><p>— Sijicart</p>
    `;

    await sendOrderStatusMail(email, subject, html, invoicePath);

    fs.unlink(invoicePath, () => {});

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "name price");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("products.productId", "name price");
    if (!order) return res.status(404).json("Order not found");
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate(
      "products.productId",
      "name price"
    );

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    console.log(req.body);
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    const status = updatedOrder.status;
    // Send status update email
    console.log("user", updatedOrder.userId);
    const email = updatedOrder.email;
    const name = updatedOrder.name;
    const subject = "🛍️ Update On Your Order Status";
    const html = `
      <h3>Dear ${name},</h3><p>Your order status has been updated to: <strong>${status}</strong>.</p><p>Thanks for Shopping with us!</p>=
    `;

    await sendOrderStatusMail(email, subject, html);

    res.status(200).json("Order status updated and email sent successfully");
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json("Error updating order status");
  }
};

// const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const order = await Order.findById(orderId).populate(
//       "userId",
//       "name email phone"
//     );

//     if (!order) return res.status(404).json("Order not found");

//     order.status = status;
//     await order.save();

//     const invoicePath = await generateInvoice(order, order.userId);

//     // Send status update email
//     const email = order.userId.email;
//     const name = order.userId.name;
//     const subject = "🛍️ Update On Your Order Status";
//     const html = `
//       <h3>Dear ${name},</h3><p>Your order status has been updated to: <strong>${status}</strong>.</p><p>Thanks for Shopping with us!</p><p>Please find your invoice attached below.</p>
//     `;

//     await sendOrderStatusMail(email, subject, html, invoicePath);

//     fs.unlink(invoicePath, () => {});

//     res.status(200).json("Order status updated and email sent successfully");
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json("Error updating order status");
//   }
// };

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrder,
  deleteOrder,
};
