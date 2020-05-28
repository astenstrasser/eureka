const axios = require('axios')
const exchangeApi = require('./exchange-api')

jest.mock('axios');

test('Calls exchange rate api', async() => {

    const apiUrl = `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/latest/EUR`
    exchangeApi.getCurrencyRate('EUR');
    expect(axios.get).toHaveBeenCalledWith(apiUrl);
    expect(axios.get).toHaveBeenCalled();

});

test('Gets currency value from api response', async() => {
    const mocked_response = { data: { conversion_rates: { BRL: 5.342 } } }
    axios.get.mockResolvedValue(mocked_response);
    const value = await exchangeApi.getCurrencyRate('EUR');

    expect(value).toEqual(5.342)
})