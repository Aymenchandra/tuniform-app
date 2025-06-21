import * as z from "zod"

//this schema can be used for all models
export const deleteSchema = z.object({
    id: z.number()
});

export const deleteManySchema = z.object({
    ids: z.number().array()
});

export const AddOrderSchema = z.object({
    customer_name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
})

export const editOrderSchema = z.object({
    customer_name: z.optional(z.string()),
    email: z.optional(z.string().email()),
});

