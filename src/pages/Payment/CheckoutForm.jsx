import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const price = 29.9;

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);

  const handleSubmit = async (event) => {
    const onTime = moment().format("dddd, MMMM D, YYYY");
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user.email,
          price,
          onTime,
          transactionId: paymentIntent.id,
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("Payment Save", res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="border p-2 w-2/3"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-6"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
