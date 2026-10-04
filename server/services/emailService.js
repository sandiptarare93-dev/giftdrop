export const emailTemplates = {
  welcome: (userName) => ({
    subject: "Welcome to GiftDrop — Let's Make Moments Unforgettable! 🎁",
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #e11d48, #fb7185); padding: 36px 24px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">GiftDrop</h1>
          <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Make moments unforgettable.</p>
        </div>
        <div style="padding: 32px 24px; color: #334155; line-height: 1.6;">
          <h2 style="color: #0f172a; margin-top: 0;">Welcome, ${userName}! 👋</h2>
          <p>We're thrilled to have you here. With GiftDrop, you can turn any birthday, anniversary, or special milestone into a magical personalized digital experience.</p>
          <div style="background: #fff1f2; border-left: 4px solid #e11d48; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0; font-weight: 600; color: #9f1239;">🎉 Special Welcome Gift for You:</p>
            <p style="margin: 6px 0 0 0; font-size: 14px; color: #be123c;">Use coupon code <strong>WELCOME20</strong> at checkout to get 20% off your first surprise!</p>
          </div>
          <div style="text-align: center; margin: 32px 0;">
            <a href="http://localhost:5173/explore" style="background: #e11d48; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 9999px; font-weight: 600; font-size: 15px; display: inline-block;">Create Your First Surprise</a>
          </div>
          <p style="font-size: 14px; color: #64748b;">Warm regards,<br/>The GiftDrop Team</p>
        </div>
      </div>
    `
  }),

  paymentSuccessful: ({ userName, orderNumber, productName, amount, surpriseSlug }) => ({
    subject: `Payment Successful: Order ${orderNumber} 🎉`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 32px 24px; text-align: center; color: white;">
          <div style="font-size: 40px; margin-bottom: 8px;">✓</div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Payment Confirmed!</h1>
          <p style="margin: 6px 0 0 0; font-size: 15px; opacity: 0.9;">Order #${orderNumber}</p>
        </div>
        <div style="padding: 32px 24px; color: #334155; line-height: 1.6;">
          <p>Hi ${userName},</p>
          <p>Thank you for choosing GiftDrop! Your payment of <strong>₹${amount}</strong> for <strong>${productName}</strong> has been received and verified.</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #64748b;">Surprise Live URL:</p>
            <a href="http://localhost:5173/s/${surpriseSlug}" style="color: #e11d48; font-weight: 600; font-size: 16px; word-break: break-all;">http://localhost:5173/s/${surpriseSlug}</a>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:5173/payment-success/${orderNumber}" style="background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;">View Shareable QR & WhatsApp Link</a>
          </div>
        </div>
      </div>
    `
  }),

  surpriseCreated: ({ senderName, receiverName, occasion, editUrl }) => ({
    subject: `Your Surprise for ${receiverName} is Ready to Preview! 🎁`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #e11d48, #9333ea); padding: 32px 24px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Almost Ready to Send! ✨</h1>
        </div>
        <div style="padding: 32px 24px; color: #334155; line-height: 1.6;">
          <p>Hi ${senderName},</p>
          <p>Your ${occasion} surprise for <strong>${receiverName}</strong> has been crafted. You can review your photos, love notes, and soundtrack before publishing.</p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${editUrl}" style="background: #e11d48; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;">Preview & Finalize Surprise</a>
          </div>
        </div>
      </div>
    `
  }),

  surpriseLink: ({ receiverName, senderName, surpriseUrl }) => ({
    subject: `${senderName} has sent you a special surprise on GiftDrop! 🎁`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; overflow: hidden; text-align: center;">
        <div style="background: linear-gradient(135deg, #e11d48, #f43f5e); padding: 48px 24px; color: white;">
          <div style="font-size: 54px; margin-bottom: 12px;">🎁</div>
          <h1 style="margin: 0; font-size: 26px; font-weight: 800;">Hey ${receiverName},</h1>
          <p style="margin: 10px 0 0 0; font-size: 17px; opacity: 0.95;">${senderName} has crafted a personalized surprise experience just for you!</p>
        </div>
        <div style="padding: 40px 24px;">
          <p style="font-size: 16px; color: #475569; margin-bottom: 30px;">Put on your earphones and tap the button below to open your gift:</p>
          <a href="${surpriseUrl}" style="background: #e11d48; color: #ffffff; text-decoration: none; padding: 16px 36px; border-radius: 9999px; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 10px 25px -5px rgba(225, 29, 72, 0.4);">Open Your Surprise 🎁</a>
          <p style="margin-top: 36px; font-size: 13px; color: #94a3b8;">Created with ❤️ using GiftDrop</p>
        </div>
      </div>
    `
  }),

  passwordReset: ({ userName, resetUrl }) => ({
    subject: "Reset your GiftDrop Password 🔑",
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 32px 24px;">
        <h2 style="color: #0f172a; margin-top: 0;">Password Reset Request</h2>
        <p style="color: #334155;">Hi ${userName},</p>
        <p style="color: #334155;">We received a request to reset your password. Tap the link below to choose a new password. If you did not make this request, you can safely ignore this email.</p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="${resetUrl}" style="background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;">Reset Password</a>
        </div>
      </div>
    `
  })
};

export const sendEmail = async ({ to, templateName, data }) => {
  const templateFn = emailTemplates[templateName];
  if (!templateFn) {
    throw new Error(`Email template ${templateName} not found`);
  }
  const emailContent = templateFn(data);
  console.log(`[EmailService] Simulated dispatch to <${to}> | Subject: "${emailContent.subject}"`);
  return {
    success: true,
    to,
    subject: emailContent.subject,
    previewHtml: emailContent.html,
    timestamp: new Date().toISOString()
  };
};
