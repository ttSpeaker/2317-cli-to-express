const getAcessToken = ():string => {
    if (process.env.ACCESS_TOKEN_SECRET){
        return process.env.ACCESS_TOKEN_SECRET
    }
    throw new Error("ACCES TOKEN SECRET NOT PRESENT");
}
const getRefreshToken = () => {
    if (process.env.REFRESH_TOKEN_SECRET){
        return process.env.REFRESH_TOKEN_SECRET
    }
    throw new Error("REFRESH TOKEN SECRET NOT PRESENT");
}

const getEmailApiKey = () => {
    if (process.env.EMAIL_API_KEY){
        return process.env.EMAIL_API_KEY
    }
    throw new Error("REFRESH TOKEN SECRET NOT PRESENT");
}

export const getConfig = ():config => {
   return {
    accesTokenSecret: getAcessToken(),
    refreshTokenSecret: getRefreshToken(),
    emailApiKey: getEmailApiKey()
}

}
export type config = {
    accesTokenSecret:string
    refreshTokenSecret: string
    emailApiKey: string
}
