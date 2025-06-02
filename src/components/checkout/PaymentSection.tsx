import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface PaymentSectionProps {
  className?: string
  onPaymentComplete?: () => void
}

type PaymentMethod = "card" | "khalti" | "esewa"

export function PaymentSection({ className, onPaymentComplete }: PaymentSectionProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")

  const handlePayment = () => {
    // Handle payment logic here
    onPaymentComplete?.()
  }

  return (
    <Card className={cn("p-6", className)}>
      <h3 className="text-lg font-medium mb-4">Payment Method</h3>
      <RadioGroup
        defaultValue="card"
        onValueChange={(value: string) => setPaymentMethod(value as PaymentMethod)}
        className="space-y-4"
      >
        <div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card">Credit/Debit Card</Label>
          </div>
          {paymentMethod === "card" && (
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="card-number">Card number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 1234 1234 1234"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="expiry">Expiry date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="khalti" id="khalti" />
            <Label htmlFor="khalti">Khalti</Label>
          </div>
          {paymentMethod === "khalti" && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                You will be redirected to Khalti to complete your payment.
              </p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="esewa" id="esewa" />
            <Label htmlFor="esewa">eSewa</Label>
          </div>
          {paymentMethod === "esewa" && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                You will be redirected to eSewa to complete your payment.
              </p>
            </div>
          )}
        </div>
      </RadioGroup>

      <Button onClick={handlePayment} className="w-full mt-6">
        {paymentMethod === "card"
          ? "Pay Now"
          : `Pay with ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}`}
      </Button>
    </Card>
  )
} 