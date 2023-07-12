import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {prisma} from '../repository/prisma'
import sgMail from '@sendgrid/mail'

const mailApiKey = process.env.EMAIL_API_KEY ?? ''
sgMail.setApiKey(mailApiKey)

const access_token_secret =  process.env.ACCESS_TOKEN_SECRET ?? ''
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET ?? ''

export type loginResponse = {accessToken:string,refreshToken:string}

export const login = async (email: string, password: string): Promise<loginResponse> =>{ 
    try {
        const user = await prisma().users.findUnique({ where: { email: email } });
        if (user === null) {
          throw new Error("User not found");
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          const accessToken = jwt.sign(
            { email: email, role: "USER", userId: user.id },
            access_token_secret,
            {
              expiresIn: "1h",
            }
          );
          const refreshToken = jwt.sign({ email: email }, refresh_token_secret, {
            expiresIn: "72h",
          });
          return { accessToken: accessToken, refreshToken: refreshToken };
        }
        throw new Error("Invalid password");
      } catch (err) {
       throw err;
      }
}

export const register = async (email: string, password: string): Promise<any> => {
// validar que el email no exista!
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma().users.create({
      data: {
        email: email,
        password: hash,
      },
    });
    // mandar mail de bienvenida 
    // luego se podria transformar en mail de verifiacion del email
    sgMail.send( {
      to: email, // Change to your recipient
      from: 'rojiwe8738@eimatro.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: `<strong>Hello ${email} and easy to do anywhere, even with Node.js</strong>`,
    })
    return user
  } catch (err) {
    throw err
  }
}

export const refreshToken = async (token: string): Promise<loginResponse> => {
  try {
    const data = jwt.verify(token, refresh_token_secret);
    if (data) {
      const dataparsed = data as unknown as {email:string};

      const user = await prisma().users.findUnique({
        where: { email: dataparsed.email },
      });
      if (user === null) {
       throw new Error('USER NOT FOUND')
      }
      const accessToken = jwt.sign(
        { email: user.email, role: "ADMIN" },
        access_token_secret,
        {
          expiresIn: "1h",
        }
      );
      const refreshToken = jwt.sign({ email: user.email }, refresh_token_secret, {
        expiresIn: "72h",
      });
      return { accessToken: accessToken, refreshToken: refreshToken };
      
    }
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      throw new Error( "NOT AUTHORIZED: TOKEN EXPIRED" );
    }
    throw new Error("NOT AUTHORIZED: TOKEN NOT VALID" );
  }
  throw new Error( "NOT AUTHORIZED: TOKEN NOT VALID" );
}