import nodemailer from "nodemailer";

export async function registerEmail(email: string) {

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
    subject: "Usuário registrado",
    html: "Parabéns seu usuário foi registrado!",
  });
}
