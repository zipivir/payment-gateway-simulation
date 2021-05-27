import { Request, Response } from 'express';
import logger from '../util/logger';
import config from "../config";
import { IPaymentModel } from '../models/payment.model';
import { reject } from 'bluebird';

const httpUtil = require('../util/http');

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
        expiration: body.expirationDate, 
        cvv: body.cvv,
        charge_amount: body.amount
    }
}

const paymentsService = {
    charge: async (req: Request) => {
        logger.info('chargePayment service');
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

            return result;
        }
        catch (err) {
            console.log('paymentsService error:', err.message);
            throw(err.message);
        }  
    },
};


export default paymentsService;
