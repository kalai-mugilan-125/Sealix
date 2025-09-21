import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../config/logger';

const transporter = nodemailer.createTransport({
  service: env.EMAIL_SERVICE,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const emailService = {
  async sendVerificationRequestEmail(recipientEmail: string, documentTitle: string) {
    const mailOptions = {
      from: env.EMAIL_USER,
      to: recipientEmail,
      subject: 'New Document Verification Request',
      html: `<p>A new document titled "${documentTitle}" requires your verification.</p>`,
    };
    await transporter.sendMail(mailOptions);
    logger.info(`Verification request email sent to ${recipientEmail}`);
  },

  async sendVerificationResultEmail(recipientEmail: string, documentTitle: string, status: string) {
    const mailOptions = {
      from: env.EMAIL_USER,
      to: recipientEmail,
      subject: 'Document Verification Status Update',
      html: `<p>The verification for your document "${documentTitle}" has been updated to "${status}".</p>`,
    };
    await transporter.sendMail(mailOptions);
    logger.info(`Verification result email sent to ${recipientEmail}`);
  },
};