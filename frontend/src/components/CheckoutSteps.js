import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Sign-In Success</div>
      <div className={props.step2 ? 'active' : ''}>Shipping Info</div>
      <div className={props.step3 ? 'active' : ''}>Payment Process</div>
      <div className={props.step4 ? 'active' : ''}>Place Order</div>
    </div>
  );
}