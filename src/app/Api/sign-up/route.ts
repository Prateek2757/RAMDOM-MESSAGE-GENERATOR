import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUSername = await UserModel.findOne({
      username,
      isVerfied: true,
    });

    if (existingUserVerifiedByUSername) {
      return Response.json({
        success: false,
        message: "User is already Register In that USer Name",
      });
    }
    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerfied) {
        return Response.json(
          {
            success: false,
            message: "User Already exist with this email",
          },
          {
            status: 404,
          }
        );
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      //const didnot change it value but what it holds like array/object its value can be change because the object it self is mutable
      const hashPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerfied: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.SUCCESS) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: " Email Sent Successfully and verify your email",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Registering User", error);
    return Response.json({
      success: false,
      message: "Error Registering User",
    });
  }
}
