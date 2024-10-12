import { createTransport } from "nodemailer";

export const sendMail = async (sender, appPassword, receiver, subject, body) => {


    const transporter = createTransport({
        service : "gmail",
        auth : {
            user : sender,
            pass : appPassword,
        },
    });

    console.log(sender,receiver,subject,body);
    
    const mailOptions = {
        from : sender,
        to : receiver,
        subject,
        text : body.toString()
    }

    await transporter.sendMail(mailOptions)
}