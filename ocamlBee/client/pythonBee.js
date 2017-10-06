MINUTES = 4;
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
                    Meteor.call('PythonCode.Update', {
                        newStr: newStr,
                        last_wrote: id
                    });
                }
            } else if (event.srcElement.defaultValue == "SetTimer") {
                Template.hello.updateHandler();
            } else if (event.srcElement.defaultValue == "NextProblem") {
                Meteor.call('CurrNum.Update');
            }
        }
    });

    Template.hello.updateHandler = function() {
        // Updating the timer
        Meteor.call('Timers.Update', {
            mins: MINUTES, 
            secs: SECONDS,
            userId: Meteor.user().emails[0].address
        });

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
            Meteor.call('Timers.Update', {
                mins: newMin, 
                secs: newSec,
                userId: Meteor.user().emails[0].address
            });
        }, 1000);
    }

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
        var obj = Template.hello.getDBCodeObj();
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
        return u.emails[0].address == 'admin@ocamlbee.com';
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
                            Meteor.call('PythonCode.Update', {
                                newStr: newStr,
                                last_wrote: id
                            });
                        }
                    }
                });
            });
        }
    }
}