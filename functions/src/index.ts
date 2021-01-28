import * as functions from "firebase-functions";
import { nodemailerCredentials } from "../../credentials";

const nodemailer = require("nodemailer");

exports.sendEmail = functions.https.onRequest((req, res) => {
    const { body } = req;
    const { message, emailAddresses } = body;
  
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: nodemailerCredentials.user, 
        pass: nodemailerCredentials.pass
      }
    });
  
    const mailOptions = {
      to: emailAddresses,
      subject: "BTC %",
      text: message
    };
  
    transporter.sendMail(mailOptions).then((response: any) => {
      const success = "Email to User sucessfully sent";
      res.send(success);
    }).catch((error: any) => {
      res.send('error');
    });
  });
