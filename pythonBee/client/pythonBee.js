if (Meteor.isClient) {
  Template.hello.events({
    'click input' : function (e) {
      if (e.srcElement.defaultValue == "ClearLine") {
        // Running the Clearline Operation
        var obj = Template.hello.getDBCodeObj();
        if (obj && obj['last_wrote'] != id) {
          var codeStr = obj['code'];
          var index = codeStr.lastIndexOf('\n') == -1 ? 0 : obj['code'].lastIndexOf('\n');
          var newStr = codeStr.substring(0, index);
          PythonCode.update({prob : num, team: teamN}, {prob : num, team: teamN, code : newStr, last_wrote: id});
        }
      } else if (e.srcElement.defaultValue == "SetTimer") {
        // Updating the Timer
        Timers.update({prob:0}, {prob:0, min:0, sec:10});
        intervalid = Meteor.setInterval(function() {
          var obj = Timers.findOne({prob:0});
          var newSec, newMin;
          if (obj['sec'] == 0 && obj['min']==0) {
            Meteor.clearInterval(intervalid);
            return;
          } else if (obj['sec'] == 0) {
            newSec = 59;
            newMin = obj['min']-1;
          } else {
            newSec = obj['sec']-1;
            newMin = obj['min'];
          }
          Timers.update({prob:0}, {prob:0, min:newMin, sec:newSec});
        }, 1000);
      } else if (e.srcElement.defaultValue == "NextProblem") {
        // Updating To the Next Timer
        var obj = CurrNum.findOne({});
        CurrNum.update({}, {num:obj['num']+1});
      }
    }
  });

  Template.hello.lastChar = function() {
    var str = Template.hello.code();
    var ch = str.charAt(str.length - 1);
    if (ch == '\n') {
      return 'NEWLINE';
    } else if (ch == '\t') {
      return 'TAB';
    } else if (ch == ' ') {
      return 'SPACE'
    }
    return ch;
  }

  Template.hello.time = function () {
    var obj = Timers.findOne({prob:0});
    if (!obj) {
      return '';
    }
    return obj['min'] + ":" + (obj['sec'] < 10 ? "0" + obj['sec'] : obj['sec']);
  }

  Template.hello.getDBCodeObj = function() {
    if(!Meteor.user() || !Meteor.user().emails)
      return undefined;
    num = CurrNum.findOne({})['num'];
    id = Meteor.user().emails[0].address;
    teamN = id.split('_')[0];
    return PythonCode.findOne({prob : num, team : teamN});
  }

  Template.hello.code = function () {
    var obj = Template.hello.getDBCodeObj();
    if (!obj) {
        return ''
    }
    return obj['code'];
  };

  Template.hello.turn = function () {
    if(!Meteor.user() || !Meteor.user().emails)
      return 'nogo';
    var num = CurrNum.findOne({})['num'];
    var id = Meteor.user().emails[0].address;
    var teamN = id.split('_')[0];
    var obj = PythonCode.findOne({prob : num, team : teamN});
    if (obj && obj['last_wrote'] == id) {
      return 'nogo';
    } else {
      return 'go'
    }
  };

  Template.hello.isTonyAcc = function() {
    u = Meteor.user();
    if(!u)
      return false
    if (!u.emails)
      return false
    return u.emails[0].address == 'admin@nealwu.com';
  }

  Template.hello.getProb = function() {
    var obj = CurrNum.findOne({});
    if (obj) {
      return obj['num'];
    }
    return -1;
  }

  Template.hello.rendered = function() {
    var self = this;
    if (! self.handle) {
      self.handle = Meteor.autorun(function() {
        $('#player').keydown(function(e) {
          var keyCode = e.which;

          if (keyCode == 9 || keyCode == 13) { 
            e.preventDefault();
          }
        });
        $('#player').keyup(function(e) { 
          var keyCode = e.which;
          if (keyCode == 9) {
            this.value = '    '
          } else if (keyCode == 13) {
            this.value = '\n'
          }
          var obj = Template.hello.getDBCodeObj();
          if (obj && obj['last_wrote'] != id) {
            var newStr = obj['code'] + this.value;
            if (newStr.length == obj['code'].length + 1) {
              PythonCode.update({prob : num, team: teamN}, {prob : num, team:teamN, code : newStr, last_wrote: id});
            }
          }
          this.value='';
        });
      });
    }
  }
}
