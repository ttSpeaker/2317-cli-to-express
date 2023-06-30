import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {prisma} from '../repository/prisma'

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
            { email: email, role: "USER" },
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