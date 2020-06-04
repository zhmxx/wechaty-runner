import { Message } from 'wechaty'

export class QaHandler {
    /**
     * Help list of role=qa
     */
    private readonly help = [
        'Run test: run [test name|path]',
        'Check last report: report [test name|ID]',
        'Back to main menu: back/exit',
        'Show examples of command: sh: [command name]',
        'Show your Octance Internal Info: Oct',
    ]

    async onMessage(msg: Message) {
        console.log('QaHandler receives: ', msg)
        const cmd = msg.text().toLowerCase()
        if (cmd.indexOf('run ') === 0) {    // Run automation test
            return this.runAutomationTest(msg, cmd.substring(cmd.indexOf(' ') + 1))
        } else if (cmd.indexOf('list') === 0) {
            console.log('listing tests...')
            return 'Your test list:\n' + this.getUserTestList(msg).join('\n')
        } else if(cmd.indexOf('help') === 0) {
            console.log('DESCRIPTION: \n');
            var result = '';
            for(var i in this.help) {
                result += this.help[i] + '\n';
            }
            return result;
        } else if(cmd.indexOf('sh:') === 0) {
            //to be executed command
            var index = cmd.indexOf(':');
            var cli = cmd.substring(index + 1);
            console.log('received command: ' + cli);
            var exec = require('child_process').exec;

            exec(cli,{encoding:'utf8'},function (err: string, stdout: string, stderr: string){
                if (err){
                    console.log(err);
                    msg.say(stderr);
                    return stderr;
                }
                console.log(stdout);
                msg.say(stdout);
                return stdout;
            })
        } else if(cmd.indexOf('oct') === 0) {
            msg.say('Here is your Octance Info: ' +
            'https://internal.almoctane.com/ui/?p=45001%2F6001&idpId=https%3A%2F%2Fauthenticate.microfocus.net%2Fnidp%2Fsaml2%2Fmetadata#/team-backlog/stories');
        } else {
            return ''
        }
    }

    private async runAutomationTest(msg: Message, param: string) {
        console.log('Running automation test: ', param)

        await msg.say('Test is running. You will get a notification when done.')

        // Run UFT test in vbs
        // http://testingfreak.com/run-qtp-script-using-batch-file/
        const spawn = require('child_process').spawnSync
        spawn('cscript.exe', ['./message-handlers/run-test.vbs', param])

        msg.say('Here is your report: http://172.20.10.2:8000/Report/run_results.html')
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