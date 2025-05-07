import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({ amount, onsucess, onerror }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AUhL6o2JNvXGMTyuOa6A9-AKw1rnLzip6ydxe21KqflZzfYhKJ12LPFisMjulyf4RF1HUcR94zes-7Uv",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) =>{
          return actions.order.create({
            purchase_units : [{amount :{value :amount}}],
          });
        }}
        onApprove={(data, action) =>{
            return action.order.capture().then(onsucess);
        }}
        onError={onerror}

      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
