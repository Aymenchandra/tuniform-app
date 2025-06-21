"use server"
import * as z from "zod"

import { deleteSchema } from "@/schemas";


export const deleteOrder = async (payload: z.infer<typeof deleteSchema>) => {

    const validatedFields = deleteSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const id = validatedFields.data.id
    // update order
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        return { success: "Deleted Successfully!" }
      } else {
        return { error: "Something went wrong!" }
      }
    } catch (error) {
        return { error: "Failed to send request." }
    }
}