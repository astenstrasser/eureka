const axios = require('axios');


const getCurrencyRate = (currency) =>  {
    const requestUrl = `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/latest/${currency}`

    const value = async() => {
        let res = await axios.get(requestUrl)
        return res.data.conversion_rates.BRL;
    }

    return value()
}

exports.getCurrencyRate = getCurrencyRate;