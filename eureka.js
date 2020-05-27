require('dotenv').config();
const axios = require('axios');
require('telegraf/extra')
const Markup = require('telegraf/markup')

console.log('Running Bot!')

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => ctx.reply(`Bom dia, ${ctx.message.from.first_name}!`, Markup.inlineKeyboard([
    // Markup.callbackButton("/start: start conversation with Eureka", "/start"),
    Markup.callbackButton("EUR-BLR exchange rate", "euro")
]).extra()));

bot.action("euro", (ctx) => {
    getEuroRates(ctx)
});

bot.on('sticker', (ctx) => {
    console.log(ctx.message.from.first_name)
    return ctx.reply('I could also send a sticker, but I won\'t')
});

function getEuroRates(ctx) {
    const requestUrl = `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/latest/EUR`

    const euro = async() => {
        let res = await axios.get(requestUrl)
        ctx.reply(`Euro hoje: R$${res.data.conversion_rates.BRL}`, Markup.inlineKeyboard([
            // Markup.callbackButton("/start: start conversation with Eureka", "/start"),
            Markup.callbackButton("EUR-BLR exchange rate", "euro")
        ]).extra());
    }

    return euro()
}

bot.hears(/([a-z])/, ({ reply }) => {
    reply('Invalid command. Try one of these:', Markup.inlineKeyboard([
        // Markup.callbackButton("/start: start conversation with Eureka", "/start"),
        Markup.callbackButton("EUR-BLR exchange rate", "euro")
    ]).extra());
});

bot.launch();