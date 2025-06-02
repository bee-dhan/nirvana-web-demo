import { useState } from "react"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { CheckoutForm } from "@/components/checkout/CheckoutForm"
import { PaymentSection } from "@/components/checkout/PaymentSection"

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment">("shipping")

  const handleContinueToPayment = () => {
    setStep("payment")
  }

  const handlePaymentComplete = () => {
    // Handle payment completion
    console.log("Payment completed")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="lg:col-span-8 px-4 py-8">
            <h1 className="text-2xl font-semibold mb-8">Checkout</h1>
            
            {step === "shipping" ? (
              <CheckoutForm onSubmit={handleContinueToPayment} />
            ) : (
              <PaymentSection 
                className="max-w-2xl" 
                onPaymentComplete={handlePaymentComplete}
              />
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-4 bg-white">
            <OrderSummary className="lg:sticky lg:top-8" />
          </div>
        </div>
      </div>
    </div>
  )
} 