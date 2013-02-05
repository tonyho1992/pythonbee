MINUTES = 5;
SECONDS = 0;

if (Meteor.isClient) {
    Template.hello.events({
        'click input' : function(event) {
            if (event.srcElement.defaultValue == "ClearLine") {
                // Running the clearline operation
                var obj = Template.hello.getDBCodeObj();
                if (obj && obj['last_wrote'] != id && Template.hello.time() != "0:00") {
                    var codeStr = obj['code'];
                    var index = codeStr.lastIndexOf('\n') == -1 ? 0 : obj['code'].lastIndexOf('\n');
                    var newStr = index == 0 ? "" : codeStr.substring(0, index);
                    PythonCode.update({prob: num, team: teamN}, {prob: num, team: teamN, code: newStr, last_wrote: id});
                }
            } else if (event.srcElement.defaultValue == "SetTimer") {
                // Updating the timer
                Timers.update({prob: 0}, {prob: 0, min: MINUTES, sec: SECONDS});
                var intervalID = Meteor.setInterval(function() {
                    var obj = Timers.findOne({prob: 0});
                    var newSec, newMin;
                    if (obj['sec'] == 0 && obj['min'] == 0) {
                        Meteor.clearInterval(intervalID);
                        return;
                    } else if (obj['sec'] == 0) {
                        newSec = 59;
                        newMin = obj['min'] - 1;
                    } else {
                        newSec = obj['sec'] - 1;
                        newMin = obj['min'];
                    }
                    Timers.update({prob: 0}, {prob: 0, min: newMin, sec: newSec});
                }, 1000);
            } else if (event.srcElement.defaultValue == "NextProblem") {
                // Updating to the next problem
                var obj = CurrNum.findOne({});
                CurrNum.update({}, {num: obj['num'] + 1});
            }
        }
    });

    Template.hello.lastChar = function() {
        var obj = Template.hello.getDBCodeObj();
        if (!obj) {
            return '';
        }
        var str = obj['code'];
        var ch = str.charAt(str.length - 1);
        if (ch == '\n') {
            return 'NEWLINE';
        } else if (ch == '\t') {
            return 'TAB';
        } else if (ch == ' ') {
            return 'SPACE';
        }
        return ch;
    }

    Template.hello.time = function() {
        var obj = Timers.findOne({prob: 0});
        if (!obj) {
            return '';
        }
        return obj['min'] + ":" + (obj['sec'] < 10 ? "0" + obj['sec'] : obj['sec']);
    }

    Template.hello.getDBCodeObj = function() {
        if (!Meteor.user() || !Meteor.user().emails)
            return undefined;
        num = CurrNum.findOne({})['num'];
        id = Meteor.user().emails[0].address;
        teamN = id.split('_')[0];
        return PythonCode.findOne({prob: num, team: teamN});
    }

    Template.hello.code = function() {
        var obj = Template.hello.getDBCodeObj();
        if (!obj) {
            return '';
        }
        return obj['code'].split('\t').join('    ');
    };

    Template.hello.turn = function() {
        if (!Meteor.user() || !Meteor.user().emails)
            return 'nogo';
        var num = CurrNum.findOne({})['num'];
        var id = Meteor.user().emails[0].address;
        var teamN = id.split('_')[0];
        var obj = PythonCode.findOne({prob: num, team: teamN});
        if (obj && obj['last_wrote'] == id) {
            return 'nogo';
        } else {
            return 'go';
        }
    };

    Template.hello.isTonyAcc = function() {
        u = Meteor.user();
        if (!u)
            return false;
        if (!u.emails)
            return false;
        return u.emails[0].address == 'admin@nealwu.com';
    }

    Template.hello.getProb = function() {
        var obj = CurrNum.findOne({});
        if (obj) {
            return obj['num'];
        }
        return 0;
    }

    Template.hello.rendered = function() {
        var self = this;
        if (!self.handle) {
            self.handle = Meteor.autorun(function() {
                $('#player').keydown(function(event) {
                    var keyCode = event.which;
                    if (keyCode == 9 || keyCode == 13) { 
                        event.preventDefault();
                    }
                });
                $('#player').keyup(function(event) { 
                    var keyCode = event.which;
                    var val = this.value.charAt(0);
                    this.value = '';
                    if (keyCode == 9) {
                        val = '\t';
                    } else if (keyCode == 13) {
                        val = '\n';
                    }
                    var obj = Template.hello.getDBCodeObj();
                    if (obj && obj['last_wrote'] != id && Template.hello.time() != "0:00") {
                        var newStr = obj['code'] + val;
                        if (newStr.length == obj['code'].length + 1) {
                            PythonCode.update({prob: num, team: teamN}, {prob: num, team: teamN, code: newStr, last_wrote: id});
                        }
                    }
                });
            });
        }
    }
}