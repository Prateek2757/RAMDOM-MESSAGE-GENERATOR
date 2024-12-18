import { z } from "zod";

export const messageSchema = z.object({
  message: z
    .string()
    .min(10, { message: "Message must be more than 10 characters" })
    .max(300, { message: " Message should not be more than 300 characters" }),
});
