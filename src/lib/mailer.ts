import * as nodemailer from 'nodemailer';
import { getEnvVariable } from './helpers';

export class Mailer {
  private readonly transporter: nodemailer.Transporter;
  constructor(){
    this.transporter = nodemailer.createTransport({
      host: getEnvVariable('EMAIL_HOST'),
      secure: true,
      auth: {
        user: getEnvVariable('EMAIL_USER'),
        pass: getEnvVariable('EMAIL_PASS'),
      },
    });
  };
  
  async sendConfirmationEmail(
    name: string, 
    email: string, 
    token: string
  ) {
    await this.transporter.sendMail({
      from: getEnvVariable('EMAIL_USER'),
      to: email,
      subject: `Подтверждение электронной почты`,
      html: `
        <h1>Привет, ${name},</h1>
        <p>для завершения регистрации на сайте VoiakaGM-shop</p>
        <p>осталось подтвердить адрес электронной почты</p>
        <a href="${getEnvVariable('HOST_URL').concat('auth/confirm/', token)}">Подтвердить</a>
      `,
    });
  }
}