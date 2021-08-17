import axios from 'axios';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay(checkoutData) {
    // console.log('show rzpay');
    try{
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post("http://localhost:8000/payments", checkoutData);
        console.log('result of payment: ', result);
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data.order;

        const options = {
            key: "rzp_test_JegdRzEElERdpF", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Shop-Wisp",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:8000/payments/success", data);

                // console.log('result of paymentverify: ', result);

                alert(result.data.msg);
            },
            prefill: {
                name: "",
                email: "",
                contact: "",
            },
            notes: {
                address: "Shop-Wisp corporate office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    catch(error){
        console.log('error in payment gateway: ', error.message);
    }
}

export default displayRazorpay;