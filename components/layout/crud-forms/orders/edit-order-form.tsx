"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { editOrderSchema } from "@/schemas"
import { Order } from "@prisma/client"
import { editOrder } from "@/actions/order/editOrder"

export const EditOrderForm = ({ order, setIsOpen }: { order: Order, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof editOrderSchema>>({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      customer_name: order?.customer_name || undefined,
      email: order?.email || undefined,
    }
  })

  const onSubmit = (payload: z.infer<typeof editOrderSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      editOrder(payload, order.id)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }
          if (data.success) {
            setSuccess(data.success)
            router.refresh()
            try {
              setIsOpen(false);
            } catch (error) {
              console.log(error);
            }
          }
        })
        .catch(() => setError('Something went wrong!'))
    })
  }
  return (
    <Form {...form}>
      <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField control={form.control} name="customer_name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}>
          </FormField>
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="email@example.com" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}>
          </FormField>
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
        <div className="w-full flex justify-center sm:space-x-6">
          <Button
            size="lg"
            variant="outline"
            disabled={isPending}
            className="w-full hidden sm:block"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full "
          >
            <>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Editing...
                </>
              ) : (
                'Edit'
              )}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
}
