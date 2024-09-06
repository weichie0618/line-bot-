const line = require("@line/bot-sdk");
const express = require("express");

// 配置
const config = {
  channelAccessToken:
    "NNfv5SZ00imSmqi5bzxs8SJNR02MKDGptCe+LB3xt1non2TxsADP/VXUuxhJ2oQayTyEXdnxo1Mx3UPvz06eFIm6lo2J9hrv2mfZKz59LlnvoxGUntmowj2BGtfhjU7uHS9lA3SwyLVDZ/Xh/nMt1wdB04t89/1O/w1cDnyilFU=",
  channelSecret: "bc85b2539cf4a4e4ca5883f976aecf9c",
};

// 創建 LINE SDK 客戶端
const client = new line.Client(config);

// 創建 Express 應用
const app = express();

// 註冊一個路由來處理 webhook
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// 事件處理函數
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  // 創建回覆消息
  const echo = { type: "text", text: event.message.text };

  // 使用 reply API
  return client.replyMessage(event.replyToken, echo);
}

// 監聽端口
const port = process.env.PORT || 6060;
app.listen(port, () => {
  console.log(`聊天機器人服務器正在監聽端口 ${port}`);
});
