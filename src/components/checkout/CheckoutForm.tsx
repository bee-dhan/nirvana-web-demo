import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"

interface CheckoutFormProps {
  onSubmit?: () => void
}

const formSchema = z.object({
  email: z.string().email(),
  shipping: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    address: z.string().min(5),
    apartment: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    postalCode: z.string().min(5),
    phone: z.string().min(10),
  }),
  sameAsBilling: z.boolean().default(true),
  billing: z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      address: z.string().min(5),
      apartment: z.string().optional(),
      city: z.string().min(2),
      state: z.string().min(2),
      postalCode: z.string().min(5),
    })
    .optional(),
})

type FormValues = z.infer<typeof formSchema>

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sameAsBilling: true,
      email: "",
      shipping: {
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
      },
    },
  })

  function handleSubmit(values: FormValues) {
    console.log(values)
    onSubmit?.()
  }

  const AddressFields = ({ prefix }: { prefix: "shipping" | "billing" }) => (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name={`${prefix}.firstName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>First name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.lastName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.address`}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.apartment`}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Apartment, suite, etc.</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.city`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.state`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>State / Province</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.postalCode`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal code</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {prefix === "shipping" && (
        <FormField
          control={form.control}
          name="shipping.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
          <AddressFields prefix="shipping" />
        </Card>

        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="sameAsBilling"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Billing address is same as shipping
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        {!form.watch("sameAsBilling") && (
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Billing Information</h3>
            <AddressFields prefix="billing" />
          </Card>
        )}

        <Button type="submit" className="w-full">
          Continue to Payment
        </Button>
      </form>
    </Form>
  )
} 