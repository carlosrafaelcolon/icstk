"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
// Import environment variables
const index_1 = require("../config/index");
exports.default = {
    sendMail(req, res) {
        const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Type of Inquiry: ${req.body.type}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: index_1.default.EMAIL_USER,
                pass: index_1.default.EMAIL_PASS // generated ethereal password
            },
            tls: {
                ciphers: 'SSLv3'
            },
            requireTLS: true
        });
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"ISCUW Contact" <support@iscuw.org>',
            to: index_1.default.EMAIL_RECIEVER,
            subject: req.body.subject,
            html: output // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
    }
};
//# sourceMappingURL=email_controller.js.map
