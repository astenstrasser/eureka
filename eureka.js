require('dotenv').config();

console.log('Running Bot!')

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)


bot.start(ctx => ctx.reply(`Hey ${ctx.message.from.first_name}!`));

bot.help(ctx => { ctx.reply('Some help message') });

bot.on('sticker', (ctx) => {
    console.log(ctx.message.from.first_name)
    return ctx.reply('I could also send a sticker, but I won\'t')
});

bot.hears('euro', (ctx) => {
    console.log(ctx)
    return ctx.reply('I can\'t answer that yet.')
});

bot.hears(/([a-z])/, ({ reply }) => { reply('Invalid command. Type /help for my list of commands.') });

bot.launch();