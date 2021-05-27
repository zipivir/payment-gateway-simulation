import { Request, Response } from 'express';
import logger from '../util/logger';
import paymentsService from '../services/payments.service';


const paymentsController = {
    //// req ////
    // Header:
    //     merchant-identifier: String
    // Body: {
    //     fullName: String,
    //     creditCardNumber: String,
    //     creditCardCompany: String, // One of - “visa”/”mastercard”
    //     expirationDate: String, // Formatted as “MM/YY”
    //     cvv: String
    //     amount: Decimal
    // }
    charge: async (req: Request, res: Response) => {
        logger.info('chargePayment', req.body);
        
        try {
            const result = await paymentsService.charge(req);
            console.log('paymentController result: ', result);
            res.json();
        } 
        catch (err) {
            console.log('paymentController error: ', err);
            res.json({
                decline_reason: err.message
            });
        }

        
    },
};


export default paymentsController;
