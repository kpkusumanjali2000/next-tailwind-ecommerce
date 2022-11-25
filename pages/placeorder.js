import Link from 'next/link';
import React, { useContext } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function PlaceORder() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, PaymentMethod } = cart;
  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb- text-xl">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address}, {''}
                {shippingAddress.city}, {shippingAddress.postalCode}, {''}
                {shippingAddress.country}
              </div>
              <Link href="/shipping">Edit</Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
