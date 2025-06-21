"use server"

import { AddOrderSchema } from "@/schemas";
import * as z from "zod"


export const addOrder = async (payload: z.infer<typeof AddOrderSchema>) => {
    console.log("ok")
    const validatedFields = AddOrderSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    
    // create new order
    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
      });

      if (res.ok) {
        return { success: "Order Added Successfully!" }
      } else {
        return { error: "Something went wrong!" }
      }
    } catch (error) {
        return { error: "Failed to send request." }
    }

}