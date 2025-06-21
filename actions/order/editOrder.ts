"use server"
import { editOrderSchema } from "@/schemas";
import * as z from "zod"



export const editOrder = async (payload: z.infer<typeof editOrderSchema>, id: Number) => {

    const validatedFields = editOrderSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    // update order
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
      });

      if (res.ok) {
        return { success: "Order Updated Successfully!" }
      } else {
        return { error: "Something went wrong!" }
      }
    } catch (error) {
        return { error: "Failed to send request." }
    }
}