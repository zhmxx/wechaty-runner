import { Util } from "../util"

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
        'Make a suggestion: suggest [content]'
    ]

    /**
     * Message handler function
     * @param msg Message received
     *
     * Supported message format (case insensitive):
     *      run <automation test name/path>
     */
    onMessage(msg: string) : string {
        console.log('Received message: ', msg)
        msg = msg.toLowerCase()

        return this.chittyChat[Util.randInt(0, this.chittyChat.length - 1)]
    }

    private registerUser(wechatId: string, role: string) {
        this.userConfig.set(wechatId, role)
    }
}