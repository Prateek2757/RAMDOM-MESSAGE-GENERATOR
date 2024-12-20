import { dbConnect } from "@/lib/dbConnect";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentails",
      name: "credentails",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentails: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              {
                email: credentails.identifier,
              },
              {
                username: credentails.identifier,
              },
            ],
          });
          if (!user) {
            throw new Error("Invalid Email Provided");
          }
          if (!user.isVerfied) {
            throw new Error("Try to Verified First YourSelf");
          }
          const passwordChecking = await bcrypt.compare(
            credentails.password,
            user.password
          );
          if(passwordChecking){
            return user
          }else{
            throw new Error("Incorrect Password")
          }

        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token,user}){
          if(user){
            token._id = user._id ?.toString()
            token.isVerified = user.isVerified
          }

         return token
    },
    async session ({session,token}){
        return session
    }
  },
  pages : {
    signIn : '/sign-in'
  },
  session : {
    strategy : "jwt"
  },
  secret : process.env.NEXTAUTH_SECRET
  
};
