import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
): Promise<ApiResponse> {
    try {
          await resend.emails.send({
          from : 'onboarding@resend.dev' ,
          to : email,
          subject :  "Mystry Message | Verification Code" ,
          react : VerificationEmail({username, otp : verifyCode
            
          })
          });
          return {SUCCESS : true , message : ' Successfully Send Verification'}
    } catch (error) {
        console.log("Error Sending Verification Email",error);
        return { SUCCESS : false , message : 'Failed To send Verification email' }
        
    }
}