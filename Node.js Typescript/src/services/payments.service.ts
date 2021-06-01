import { NextFunction, Request, Response } from 'express';
import logger from '../util/logger';
import config from "../config";
import { IPaymentModel } from '../models/payment.model';

const httpUtil = require('../util/http');
const MAX_RETRIES = 3;
const BUSINESS_ERRORS = ["card declined", "insufficient funds"];

const mapBodyForVisa = (body: IPaymentModel): object => {
    return {
        fullName: body.fullName,
        number: body.creditCardNumber,
        expiration: body.expirationDate, 
        cvv: body.cvv,
        totalAmount: body.amount
    }
}

const mapBodyForMastercard = (body: IPaymentModel): object => {
    const [first_name, last_name] = body.fullName.split(" ");
    
    return {
        first_name,
        last_name,
        card_number: body.creditCardNumber,
        expiration: body.expirationDate.replace('/', '-'), 
        cvv: body.cvv,
        charge_amount: body.amount
    }
}

const charge = async (req: Request, retries: number = 1): Promise<any> => {
    logger.info('chargePayment service, retries: ', retries);
    let url: string = "";
    let mappedBody: object = {};

    try {
        switch (req.body.creditCardCompany) {
            case "visa": {
                url = config.app.visa;
                mappedBody = mapBodyForVisa(req.body);
                break;
            }
            case "mastercard": {
                url = config.app.mastercard;
                mappedBody = mapBodyForMastercard(req.body);
                break;
            }

        }

        const result = await httpUtil.post(url, req.headers, mappedBody)
        console.log('paymentsService result:', result);

        if (result.chargeResult) {
            if (result.chargeResult === 'Failure')
                return { error: result.resultReason };
            else 
                return "OK";
        } 
        
        return result;
    }
    catch (err) {
        console.log('paymentsService error:', err.message, typeof err.message);

        if (err.message.includes('decline_reason')) { /// masterCard - error
            let error = err.message.split(' - ');
            error = JSON.parse(error[1]);
            return { error: error.decline_reason };
        }
        else if (retries < MAX_RETRIES) {
            setInterval(await charge(req, retries + 1), retries**2);
        }
        else
            throw(err.message);
    }  
}

const paymentsService = { charge: charge};

export default paymentsService;
