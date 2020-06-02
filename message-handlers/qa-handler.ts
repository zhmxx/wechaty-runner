import { Message } from 'wechaty'

export class QaHandler {
    /**
     * Help list of role=qa
     */
    private readonly help = [
        'Run test: run [test name|path]',
        'Check last report: report [test name|ID]',
        'Back to main menu: back/exit',
        'Show examples of command: example [command name]'
    ]

    onMessage(msg: Message): string {
        console.log('QaHandler receives: ', msg)
        const cmd = msg.text().toLowerCase()
        if (cmd.indexOf('run ') === 0) {    // Run automation test
            return this.runAutomationTest(cmd.substring(cmd.indexOf(' ') + 1))
        } else if (cmd.indexOf('list ') === 0) {
            console.log('listing tests...')
            return 'Your test list:\n' + this.getUserTestList(msg).join('\n')
        } else {
            return ''
        }
    }

    private runAutomationTest(param: string): string {
        console.log('Running automation test: ', param)

        // Run UFT test in vbs
        // http://testingfreak.com/run-qtp-script-using-batch-file/
        const spawn = require('child_process').spawnSync
        const result = spawn('cscript.exe', ['./run-test.vbs', param])

        return 'Testing is running. You will get a notification when done.'
    }

    private getUserTestList(msg: Message) {
        return ['GUITest1', 'GUITest2', 'GUITest3', 'GUITest4', 'GUITest5']
    }
}