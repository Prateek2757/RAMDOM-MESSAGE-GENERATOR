import {z} from "zod"

export const signinSchema = z.object({
    userName : z.string(),
    password: z.string()
})