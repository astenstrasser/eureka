require('dotenv').config();
const Telegraf = require('telegraf')
require('telegraf/extra');
const Markup = require('telegraf/markup');

const exchangeApi = require('./exchange-api');

const bot = new Telegraf(process.env.BOT_TOKEN)
console.log('Running Bot!')

const commandsKeyboard = Markup.inlineKeyboard([
    Markup.callbackButton("Cotação EUR-BRL", "euro"),
    Markup.callbackButton("Cotação USD-BRL", "dollar")
], { columns: 1 }).extra();

bot.start(ctx => { ctx.reply(`Bom dia, ${ctx.message.from.first_name}!`, commandsKeyboard) });

bot.action("euro", (ctx) => {
    exchangeApi.getCurrencyRate('EUR').then((euro) => {
        euro && ctx.reply(`Cotação atual do Euro: R$${euro}`, commandsKeyboard)
    })
});

bot.action("dollar", (ctx) => {
    exchangeApi.getCurrencyRate('USD').then((dollar) => {
        dollar && ctx.reply(`Cotação atual do Dólar: R$${dollar}`, commandsKeyboard)
    })
});

bot.on('sticker', (ctx) => {
    return ctx.replyWithSticker('CAACAgUAAxkBAAEDOoBez8sHE_Ms8gERf0Vh6H6oARN0UwACzgMAAukKyAM5WmqeDxUOuBkE')
});

bot.hears(/([a-z])/, ({ reply }) => {
    reply('Comando inválido. Tente um desses:', commandsKeyboard)
});

bot.launch();