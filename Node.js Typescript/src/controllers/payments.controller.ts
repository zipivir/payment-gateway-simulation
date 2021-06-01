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
            if (result === "OK") {
                res.status(200).json();
            }
            else
                res.status(200).json(result);
        } 
        catch (err) {
            console.log('paymentController error: ', err);
            res.status(400).json({
                error: err.message
            });
        }        
    },

    chargeStatuses: (req: Request, res: Response) => {
        try {

        }
        catch (err) {
            console.log('paymentController error: ', err);
            res.status(400).json({
                error: err.message
            });
        } 
    }
};


export default paymentsController;
