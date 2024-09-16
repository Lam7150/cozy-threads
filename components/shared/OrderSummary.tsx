type OrderSummaryProps = {
  total: number;
  shipping: number;
  footer?: React.ReactNode;
};

export function OrderSummary({
  total,
  shipping,
  footer = null
}: OrderSummaryProps) {
  return (
    <div className="p-6 rounded-lg bg-gray-50">
      <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${total.toFixed(2) || 'Free'}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>{shipping || 'Free'}</span>
      </div>
      <div className="pt-2 mt-2 border-t">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>
      {footer}
    </div>
  );
}
