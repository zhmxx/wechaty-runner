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
        if (cmd.indexOf('run ') === 0 || cmd.indexOf('run') === 0) {    // Run automation test
            return this.runAutomationTest(cmd.substring(cmd.indexOf(' ') + 1))
        } else if (cmd.indexOf('list ') === 0 || cmd.indexOf('list') === 0) {
            console.log('listing tests...')
            return 'Your test list:\n' + this.getUserTestList(msg).join('\n')
        } else if(cmd.indexOf('help ') === 0 || cmd.indexOf('help') === 0) {
            console.log('DESCRIPTION: \n');
            var result = '';
            for(var i in this.help) {
                result += this.help[i] + '\n';
            }
            return result;
        } else {
            return ''
        }
    }

    private runAutomationTest(param: string): string {
        console.log('Running automation test: ', param)

        // Run UFT test in vbs
        // http://testingfreak.com/run-qtp-script-using-batch-file/
        const spawn = require('child_process').spawnSync
        const result = spawn('cscript.exe', ['./message-handlers/run-test.vbs', param])

        return 'Testing is running. You will get a notification when done.'
    }

    private getUserTestList(msg: Message) {
        var fs = require("fs");
        const path = require('path');
        var pathDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
        var userPath = path.resolve(pathDir)+ "/Documents/Unified Functional Testing/";
        var result = fs.readdirSync(userPath);
        return result;
    }
}