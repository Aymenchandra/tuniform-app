"use server"
import * as z from "zod"

import { deleteManySchema } from "@/schemas";

export const deleteManyOrder = async (payload: z.infer<typeof deleteManySchema>) => {

    const validatedFields = deleteManySchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    console.log("action",validatedFields.data)
    try {
    const res = await fetch('http://localhost:3000/api/orders/delete-many', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data.ids),
    });

    if (res.ok) {
      return { success: 'Orders deleted successfully' };
    } else {
      return { error: 'Something went wrong!' };
    }
  } catch (error) {
    return { error: 'Failed to send request.' };
  }

}