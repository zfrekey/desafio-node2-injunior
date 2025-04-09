import nodemailer from "nodemailer";

export async function likedPostEmail(email: string, userWhoLiked: string) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "filype.abreu@injunior.com.br",
      pass: process.env.EMAIL_PASSWORD
    },
    secure: true,
    port: 465,
  });

  await transporter.sendMail({
    from: "Filype Abreu <filype.abreu@injunior.com.br>",
    to: `${email}`,
    subject: "Opa, seu post recebeu um like",
    html: `O usuário ${userWhoLiked} curtiu seu post!`,
  });
}