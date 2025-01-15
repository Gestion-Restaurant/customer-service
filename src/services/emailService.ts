import { createEmailTransporter } from '../config/emailConfig';
import { CONSTANTS } from '../utils/constants';
import IEmailDetails from '../interfaces/emailDetails';

export const sendVerificationEmail = async ({ to, token }: IEmailDetails): Promise<void> => {
    const transporter = createEmailTransporter();
    
    const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject: CONSTANTS.EMAIL_SUBJECT,
        text: `${CONSTANTS.VERIFICATION_URL}/${to}/${token}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });
};