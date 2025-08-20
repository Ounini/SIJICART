const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SIJT_MAIL,
    pass: process.env.SIJT_MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendOrderStatusMail = async (
  to,
  subject,
  htmlContent,
  attachmentPath = null
) => {
  const mailOptions = {
    from: `"Sijicart" <${process.env.SIJI_MAIL}>`,
    to,
    subject,
    html: htmlContent,
  };

  if (attachmentPath) {
    mailOptions.attachments = [
      {
        filename: "invoice.pdf",
        path: attachmentPath,
      },
    ];
  }
  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully");
  } catch (err) {
    console.error("Mail sending failed:", err.message);
  }
};

const sendPasswordRest = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: `"Sijicart" <${process.env.SIJI_MAIL}>`,
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully");
  } catch (err) {
    console.error("Mail sending failed:", err.message);
  }
};

const sendEmailVerification = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: `"Sijicart" <${process.env.SIJI_MAIL}>`,
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully");
  } catch (err) {
    console.error("Mail sending failed:", err.message);
  }
};

module.exports = {
  sendOrderStatusMail,
  sendPasswordRest,
  sendEmailVerification,
};
