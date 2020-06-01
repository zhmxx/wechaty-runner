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

    onMessage(msg: string) {
        if (msg.indexOf('run ') === 0) {
            return this.runAutomationTest(msg.substring(msg.indexOf(' ') + 1))
        }
    }

    private runAutomationTest(param: string) {
        console.log('Running automation test: ', param)

        // Run UFT test in vbs
        // http://testingfreak.com/run-qtp-script-using-batch-file/
        const spawn = require('child_process').spawnSync
        const result = spawn('cscript.exe', ['../run-test.vbs', param])

        return 'Testing is running. You will get a notification when done.'
    }
}