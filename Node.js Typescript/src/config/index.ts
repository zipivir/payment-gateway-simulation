const config = {
    port: process.env.PORT || 8000,
    logLevel: process.env.LOG_LEVEL || 'debug',

    app: {
        identifier: 'Zipi',
        visa: 'https://interview.riskxint.com/visa/api/chargeCard',
        mastercard: 'https://interview.riskxint.com/mastercard/capture_card'
    }
};


export default config;
