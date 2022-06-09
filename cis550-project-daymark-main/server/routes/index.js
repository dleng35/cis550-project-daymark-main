const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.send('Daymark API is working properly');
});


module.exports = router;