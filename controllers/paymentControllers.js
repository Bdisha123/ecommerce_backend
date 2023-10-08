const catchAsyncErrors=require("../middleware/catchAsyncErrors")
const stripe=require("stripe")("sk_test_51NMSijSBsX59oqJjVKjNycYI0v87tuiKUxKxJVYaRpmYo4igoXguDPKUohxRSSZ4KTNc8SVJmKGa2H31CPo2orXi00W9yqtZCa")
// (process.env.STRIPE_SECRET_KEY)
const STRIPE_API_KEY = "pk_test_51NMSijSBsX59oqJj16DQEM71yyBvQjRGFkVrLO2T03jT8Fmua1XCPJN2671TAlyyY5dZS0bDi7cwAKfyDJzJSAkD00fxWSM3VG"
// const STRIPE_SECRET_KEY = 
exports.processPayment=catchAsyncErrors(async (req, res, next) => {
    const myPayment=await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "Ecommerce",
        },
    });

    res
        .status(200)
        .json({success: true, client_secret: myPayment.client_secret});
});
exports.sendStripeApiKey=catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({stripeApiKey:STRIPE_API_KEY});
});