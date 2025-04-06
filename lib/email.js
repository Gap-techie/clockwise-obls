import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API key in .env.local

export const sendEmail = async (to, subject, text) => {
    const msg = {
        to,
        from: 'your_email@example.com', // Use your verified SendGrid email
        subject,
        text,
    };

    try {
        await sgMail.send(msg);
        return true; // Email sent successfully
    } catch (error) {
        console.error('Error sending email:', error);
        return false; // Email sending failed
    }
};
