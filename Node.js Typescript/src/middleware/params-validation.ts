import { Request, Response } from 'express';
import logger from '../util/logger';
const fs = require('fs');
const JoiBase = require('@hapi/joi');
const JoiDate = require("@hapi/joi-date");

const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

// schema options
const OPTIONS = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

const merchantsFile = "src/config/merchants.json"

function loadMerchants() {
    logger.info("loading merchants details");
    const fileContent = fs.readFileSync(merchantsFile);
    const result = JSON.parse(fileContent);
    Object.freeze(result);
    return result;
}
const MERCHANTS = loadMerchants();

const paramsValidation = {
    auth: (req: Request, res: Response, next: Function) => {
        if (req.headers['merchant-identifier']) {
            //check if merchant signed up?
            if (MERCHANTS[`${req.headers['merchant-identifier']}`])
                next();
        }
        return res.status(400).end('');
    },

    chargeSchema: async (req: Request, res: Response, next: Function): Promise<any> => {
        // create schema object
        const schema = Joi.object({
            fullName: Joi.string().required(),
            creditCardNumber: Joi.string().required(),
            creditCardCompany: Joi.string().valid('visa', 'mastercard').required(),
            expirationDate: Joi.date().format('MM/YY').required(),
            cvv: Joi.string().length(3).required(),
            amount: Joi.number().required(),
        });    

        const { error, value } = await schema.validateAsync(req.body, OPTIONS);
    
        if (error) {
            next(`Validation error: ${error.details.map((x: { message: any; }) => x.message).join(', ')}`);
        } else {
            // req.body = value;
            next();
        }
    }
}

export default paramsValidation;
 