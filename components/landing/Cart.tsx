'use client';

// Libraries
import { PropsWithChildren } from 'react';
import { useCart } from '@/components/contexts/cart-context';

// Components
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';

type CartProps = PropsWithChildren & {
  editable?: boolean;
};

export function Cart({ editable = false }: CartProps) {
  const { cart, updateItem, deleteItem } = useCart();

  return (
    <div className="flex flex-col gap-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            {editable && <TableHead></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={`image of ${item.title}`}
                    sizes="10vw"
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <span className="font-medium">{item.title}</span>
                </div>
              </TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                {editable ? (
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, parseInt(e.target.value))
                    }
                    className="w-20"
                  />
                ) : (
                  item.quantity
                )}
              </TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
              {editable && (
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {cart.length === 0 && (
        <div className="w-full mt-4 text-center text-gray-500">
          Your cart is empty!
        </div>
      )}
    </div>
  );
}
