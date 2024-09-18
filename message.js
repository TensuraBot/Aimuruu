     require('./systems/owner/settings.js')
     require('./systems/owner/logic.js') 
     const fs = require('fs')
     const util = require('util')
     const axios = require('axios')
     const chalk = require('chalk')
     const fetch = require('node-fetch')
     const { englishAi } = require('./systems/function/chatAi.js') 
     
     //=================================================//
     
     module.exports = client = async (client, m, chatUpdate, store) => {
     try {        
     const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
     const sender = m.key.fromMe ? (client.user.id.split(':')[0]+'@s.whatsapp.net' || client.user.id) : (m.key.participant || m.key.remoteJid)
     const budy = (typeof m.text == 'string' ? m.text : '')
     const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
     const args = body.trim().split(/ +/).slice(1);
     const { fromMe } = m
     const pushname = m.pushName || "No Name"
     const text = q = args.join(" ")
     const quoted = m.quoted ? m.quoted : m
     const mime = (quoted.msg || quoted).mimetype || ''
     
     // ====================================== //	
     
     global.db.data = JSON.parse(fs.readFileSync('./systems/database/database.json'))
      if (global.db.data) global.db.data = {
        chats: {},
       ...(global.db.data || {})
       }
     
     
     let chats = global.db.data.chats[m.chat]
      if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
       if (chats) {
        if (!('autoai' in chats)) chats.autoai = true
       } else global.db.data.chats[m.chat] = {
      autoai: true
      }
         
         
     switch (command) {
     case 'ping':{
     m.reply('pongg!')
     }
     break

     //=================================================// 
     
     default:
     if (db.data.chats[m.chat].autoai) {
     if (m.fromMe) return;
     if (!m.text) return
      (async () => {
      const system = `${sifat}`
      const question = m.text
     
      if(!global.db.data.chats[m.chat]?.dbai) global.db.data.chats[m.chat].dbai = []
     
      const dbai = global.db.data.chats[m.chat].dbai.length > 0 ? global.db.data.chats[m.chat].dbai : [
        {
            content : system,
            role  : "user"
        },
        {
            content : "Hi! apa yang bisa saya bantu?",
            role  : "assistant"
        },
        ]
     
        dbai.push(
        {
            content : question,
            role : "user"
         }
       )
    
      const ai = await englishAi(dbai)
      dbai.push(ai.history.pop())
      global.db.data.chats[m.chat].dbai = dbai
      console.log(dbai)
       m.reply(ai.response) 
     })();
        }
     }
     } catch (err) {
     console.log(util.format(err))
     let e = String(err)
     client.sendMessage(`${owner}@s.whatsapp.net`, { text: "err:" + util.format(e), 
     contextInfo:{
     forwardingScore: 5, 
     isForwarded: true
     }})
     }
     } 
     let file = require.resolve(__filename)
     fs.watchFile(file, () => {
     fs.unwatchFile(file)
     console.log(chalk.redBright(`Update ${__filename}`))
     delete require.cache[file]
     require(file)
     })