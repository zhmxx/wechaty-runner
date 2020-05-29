import { Util } from "./util";

export class MessageHandler {
    /**
     * Define some chitty chats to make the bot more like a human
     */
    private readonly chittyChat = [
        'What do you mean? I don\'t quite understand',
        'I\'m not sure what you are saying. Can you repeat?',
        'If you are bored/lonely, you should find a girl. Not wasting your time chatting with me. 😂'
    ];

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

        if (msg.indexOf('run ') === 0) {
            return this.runAutomationTest(msg.substring(msg.indexOf(' ') + 1))
        } else {
            return this.chittyChat[Util.randInt(0, this.chittyChat.length - 1)];
        }
    }

    private runAutomationTest(param: string) {
        console.log('Running automation test: ', param)

        return 'Testing is running. You will get a notification when done.'
    }
}