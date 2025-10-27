import jwt from "jsonwebtoken"

const JWTSECRET='sftyforst'
export const generateToken=(payload:any):string=>{
    return jwt.sign(payload,JWTSECRET,{expiresIn:'60m'})


}

export const verifyToken=(token:string)=>{
    return jwt.verify(token,JWTSECRET)
}