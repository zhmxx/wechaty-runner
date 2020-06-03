import { Util } from "../util"
import { QaHandler } from "./qa-handler"
import { Message } from 'wechaty'

export class MessageHandler {

    constructor() {
        this.userConfig = new Map<string, string>()
    }

    /**
     * Define some chitty chats to make the bot more like a human
     */
    private readonly chittyChat = [
        'What do you mean? I don\'t quite understand',
        'I\'m not sure what you are saying. Can you repeat?',
        'If you are bored/lonely, you should find a girl. Not wasting your time chatting with me. 😂'
    ]

    private userConfig: Map<string, string>
    private help = [
        'Set your role: set role [qa|dev|manager]',
        'Set an alarm clock: alarm [30s|5min|1h]',
        'Turn off the alarm: alarm off',
        'Make a suggestion: suggest [content]'
    ]

    /**
     * Message handler function
     * @param msg Message received
     *
     * Supported message format (case insensitive):
     *      run <automation test name/path>
     */
    async onMessage(msg: Message) {
        console.log('Received message: ', msg)

        if (this.getUserRole(msg) === 'qa') {
            const qaHandler = new QaHandler()
            qaHandler.onMessage(msg)
        } else {
            msg.say(this.chittyChat[Util.randInt(0, this.chittyChat.length - 1)])
        }
    }

    private registerUser(wechatId: string, role: string) {
        this.userConfig.set(wechatId, role)
    }

    private getUserRole(msg: Message) {
        return 'qa';
    }
}