export const createPaymentService = async (amount:number, currency:string) => {

    const payment = {
        id:  `payment_${Date.now()}`,
        amount,
        currency,
        status: "pending"
    }

    return payment;

}