require('dotenv').config();
const Telegraf = require('telegraf')
require('telegraf/extra');
const Markup = require('telegraf/markup');

const exchangeApi = require('./exchange-api');

const bot = new Telegraf(process.env.BOT_TOKEN)
console.log('Running Bot!')

const commandsKeyboard = Markup.inlineKeyboard([
    Markup.callbackButton("EUR-BRL exchange rate", "euro"),
    Markup.callbackButton("USD-BRL exchange rate", "dolar")
], { columns: 1 }).extra();

bot.start(ctx => { ctx.reply(`Bom dia, ${ctx.message.from.first_name}!`, commandsKeyboard) });

bot.action("euro", (ctx) => {
    exchangeApi.getCurrencyRate('EUR').then((euro) => {
        ctx.reply(`Cotação atual do Euro: R$${euro}`, commandsKeyboard)
    })
});

bot.action("dolar", (ctx) => {
    exchangeApi.getCurrencyRate('USD').then((dolar) => {
        ctx.reply(`Cotação atual do Dolar: R$${dolar}`, commandsKeyboard)
    })
});

bot.on('sticker', (ctx) => {
    console.log(ctx.message.from.first_name)
    return ctx.reply('I could also send a sticker, but I won\'t')
});

bot.hears(/([a-z])/, ({ reply }) => {
    reply('Invalid command. Try one of these:', commandsKeyboard)
});

bot.launch();