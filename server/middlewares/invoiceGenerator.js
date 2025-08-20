const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");

const generateInvoice = async (order) => {
  return new Promise(async (resolve, reject) => {
    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const invoiceNumber = `INV-${order._id.toString().slice(-6).toUpperCase()}`;
    const invoicePath = path.join(tempDir, `../temp/invoice-${order._id}.pdf`);
    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(invoicePath);

    doc.pipe(writeStream);

    const logoPath = path.join(__dirname, "../view/image.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 40, { width: 100 });
    }

    doc
      .fontSize(12)
      .text(`Invoice No: ${invoiceNumber}`, { align: "right" })
      .text(`Date: ${new Date(order.createdAt).toDateString()}`, {
        align: "right",
      })
      .moveDown();

    doc
      .fontSize(12)
      .text(`Name: ${order.name}`)
      .text(`Email: ${order.email}`)
      .text(`Order ID: ${order._id}`)
      .text(`Payment: ${order.paymentMethod}`)
      .text(`Status: ${order.status}`)
      .text(`Tel: ${order.phone}`)
      .moveDown();

    doc
      .fontSize(12)
      .text("Product", 50, doc.y, { continued: true })
      .text("Qty", 250, doc.y, { continued: true })
      .text("Price", 300, doc.y, { continued: true })
      .text("Total", 400, doc.y)
      .moveTo(50, doc.y + 5)
      .lineTo(550, doc.y + 5)
      .stroke()
      .moveDown();

    console.log("the order", order);
    console.log("products of the order", order.products);

    for (const item of order.products) {
      console.log(item);
      const product = await Product.findById(item.productId);
      console.log(product);

      if (!product) {
        console.error(`Product not found for id: ${item.productId}`);
        continue;
      }

      const price = Number(product.price && product.price.toString()) || 0;
      const qty = Number(item.quantity) || 0;
      const total = price * qty;

      doc
        .text(product.name, 50, doc.y, { continued: true })
        .text(qty.toString(), 250, doc.y, { continued: true })
        .text(`₦${price.toLocaleString()}`, 300, doc.y, { continued: true })
        .text(`₦${total.toLocaleString()}`, 400, doc.y);

      doc.moveDown();
    }

    const totalAmount = Number(order.amount && order.amount.toString()) || 0;

    doc
      .moveDown()
      .fontSize(14)
      .text(`Total Amount: ₦${totalAmount.toLocaleString()}`, {
        align: "right",
        underline: true,
      });

    doc.end();

    writeStream.on("finish", () => resolve(invoicePath));
    writeStream.on("error", reject);
  });
};

module.exports = { generateInvoice };
