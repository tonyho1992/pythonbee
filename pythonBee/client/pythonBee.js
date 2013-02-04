if (Meteor.isClient) {
  Template.hello.events({
    'click input' : function (e) {
      if (e.srcElement.defaultValue == "ClearLine") {
        if(!Meteor.user() || !Meteor.user().emails)
          return;
        var num = CurrNum.findOne({})['num'];
        var id = Meteor.user().emails[0].address;
        var teamN = id.split('_')[0];
        var obj = PythonCode.findOne({prob : num, team: teamN});
        if (obj && obj['last_wrote'] != id) {
          var codeStr = obj['code'];
          var index = codeStr.lastIndexOf('\n') == -1 ? 0 : obj['code'].lastIndexOf('\n');
          var newStr = codeStr.substring(0, index);
          PythonCode.update({prob : num, team: teamN}, {prob : num, team: teamN, code : newStr, last_wrote: id});
        }
      } else if (e.srcElement.defaultValue == "SetTime") {
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
        var obj = CurrNum.findOne({});
        CurrNum.update({}, {num:obj['num']+1});
      }
    }
  });

  Template.hello.time = function () {
    var obj = Timers.findOne({prob:0});
    if (!obj) {
      return ''
    }
    return obj['min'] + ":" + (obj['sec'] < 10 ? "0" + obj['sec'] : obj['sec']);
  }

  Template.hello.code = function () {
    if(!Meteor.user() || !Meteor.user().emails)
      return '';
    var num = CurrNum.findOne({})['num'];
    var id = Meteor.user().emails[0].address;
    var teamN = id.split('_')[0];
    var obj = PythonCode.findOne({prob : num, team : teamN});
    if (!obj) {
        return ''
    }
    return obj['code'].replace('\t', '  ');
  };

  Template.hello.turn = function () {
    if(!Meteor.user() || !Meteor.user().emails)
      return 'nogo';
    var num = CurrNum.findOne({})['num'];
    var id = Meteor.user().emails[0].address;
    var teamN = id.split('_')[0];
    var obj = PythonCode.findOne({prob : 0, team : teamN});
    if (obj && obj['last_wrote'] == Meteor.user().emails[0].address) {
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
            this.value = '\t'
          } else if (keyCode == 13) {
            this.value = '\n'
          }

          if(!Meteor.user() || !Meteor.user().emails)
            return;
          var num = CurrNum.findOne({})['num'];
          var id = Meteor.user().emails[0].address;
          var teamN = id.split('_')[0];
          var obj = PythonCode.findOne({prob : num, team: teamN});
          if (obj && obj['last_wrote'] != id) {
              var newStr = obj['code'] + this.value;
            if (newStr.length == obj['code'].length + 1) {
              console.log(num);
              console.log(teamN);
              console.log(newStr);
              console.log(id);
              PythonCode.update({prob : num, team: teamN}, {prob : num, team:teamN, code : newStr, last_wrote: id});
            }
          }
          this.value='';
        });
      });
    }
  }
}

