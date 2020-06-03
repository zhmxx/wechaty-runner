import { Contact, Message, Wechaty } from 'wechaty'
import { ScanStatus } from 'wechaty-puppet'
import { PuppetPadplus } from 'wechaty-puppet-padplus'
import QrcodeTerminal from 'qrcode-terminal'
import { MessageHandler } from './message-handlers/message-handler'

const puppet = new PuppetPadplus({
  token: process.env.WECHATY_TOKEN
})

const name  = 'Assistant-1'

const bot = new Wechaty({
  puppet,
  name, // generate xxxx.memory-card.json and save login data for the next login
})

const messageHandler = new MessageHandler()

bot
  .on('scan', (qrcode, status) => {
    if (status === ScanStatus.Waiting) {
      QrcodeTerminal.generate(qrcode, {
        small: true
      })
    }
  })
  .on('login', (user: Contact) => {
    console.log(`login success, user: ${user}`)
  })
  .on('message', (msg: Message) => {
    console.log(`msg : ${msg}`)

    if (!msg.room()) {  // Ignore messages coming from groups
      messageHandler.onMessage(msg)
    }
  })
//   .on('logout', (user: Contact, reason: string) => {
//     console.log(`logout user: ${user}, reason : ${reason}`)
//   })
  .start()