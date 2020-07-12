const express = require('express');
const axios = require('axios');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => res.render('index', { title: 'Express' }));

router.get('/healtcheck', async (req, res, next) => {
  try {
    const mockServerHealtcheckResponse = await axios.get(`${req.configuration.mockServerUrl}/healthcheck`);
    console.log(`Mock server responded to healtcheck with the following response: ${mockServerHealtcheckResponse.data}`);
    
    return res.json({ status: 'OK'})
  }
  catch(err) {
    console.log(err);
    return res.json({ status: 'ERR', message: err.response.statusText})
  }
});

module.exports = router;
