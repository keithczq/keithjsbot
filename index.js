///////////////////// Imports
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');

///////////////////// Global constants
const token = config.token;
const bot = new TelegramBot(token, {
  polling: true
});
const botName = "@keithjsbot";

///////////////////// Commands handlers
// Greeting message when user starts initial chat with bot
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome! My name is the Keith JS Bot 1.0 and it is nice to meet you!");
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Says a random line that actual Keith Says
bot.onText(/\/keithsays/, (msg) => {
  bot.sendMessage(msg.chat.id, "pew pew pew!");
});

// just to repeat 1 2 3 to the user
bot.onText(/\/testing/, (msg) => {
  bot.sendMessage(msg.chat.id, "1.. 2.. 3..😜");
  return;
});

/////////////////////  All other message handlers
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.chat.first_name;
  const lastName = msg.chat.last_name;
  const msgContents = msg.text.toString().toLowerCase();
  // // send a message to the chat acknowledging receipt of their message
  bot.sendChatAction(msg.chat.id, "typing");

  // Escaping command handlers
  // TODO: change to a list that checks against existing commands instead!!
  if (msgContents.indexOf("/") === 0) {
    return;
  }

  // Greetings handlers
  if (msgContents.includes("hi") || msgContents.includes("hello") || msgContents.includes("yo")) {
    bot.sendMessage(msg.chat.id, `Hello dear ${firstName} ${lastName}\nFor your information, your Chat ID is: ${chatId}`);
    return;
  }

  if (msgContents.includes("bye")) {
    bot.sendMessage(msg.chat.id, `Bye ${firstName}, Hope to see you soon`);
    bot.sendMessage(msg.chat.id, `You can always chat with me again <b>${botName}</b> `, {
      parse_mode: "HTML"
    });
    bot.sendMessage(msg.chat.id, `Otherwise, feel free to check out my creator's <b><a href="https://keithczq.github.io/">website</a></b>`, {
      parse_mode: "HTML"
    });
    return;
  }

  // Profanity handlers
  // FIXME: not working!
  if (msg.text.includes("shit")) {
    bot.kickChatMember(msg.chat.id, msg.from.id);
    return;
  }

  // Exception handler
  bot.sendMessage(msg.chat.id, `Sorry, I don't quite understand. I've got nothing...😅`);
  bot.sendMessage(msg.chat.id, `It is going to take as well to be as smart as Keith but I am getting there!🤓`);

  // bot.sendMessage(nonExistentUserId, 'text').catch((error) => {
  //   console.log(error.code); // => 'ETELEGRAM'
  //   console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
  // });

});
