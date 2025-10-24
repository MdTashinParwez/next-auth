import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
export const  sendEmail = async ({email,emailType,userId}:any) =>{
    try {
     const hashedToken = await bcrypt.hash(userId.toString(), 10);
      
      if(emailType==="VERIFY"){
        // send verification email
        await User.findByIdAndUpdate(userId,{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000, isVerified: false,});
      }
      else if(emailType==="RESET"){
        await User.findByIdAndUpdate(userId,{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000, isVerified: false,});
      }

       // Looking to send emails in production? Check out our Email API/SMTP product!
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f613836a524ad2",  //  
          pass: "356cff93fe7637"
        }
      });

  const info = await transport.sendMail({
    from: 'tashin@auth',
    to: email,
    subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
            emailType === "VERIFY" ? "verify your email" :
            "reset your password"}
            or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // HTML body

  });
  return info;

    } catch (error) {
        throw new Error('Email not sent');
        
    } 
}