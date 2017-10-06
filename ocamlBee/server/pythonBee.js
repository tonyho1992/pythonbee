if (Meteor.isServer) {
    Meteor.startup(function() {
        PythonCode.remove({});
        for (j = 0; j < 10; j ++) {
            for(i = 0; i < 40; i++) {
                PythonCode.insert({prob: j, team: 'team' + i, code: '', last_wrote: ''});
      	    }
            PythonCode.insert({prob: j, team: 'nrt', code: '', last_wrote: ''});
        }
        Timers.remove({});
        Timers.insert({prob: 0, min: 0, sec: 0});
        CurrNum.remove({});
        CurrNum.insert({num: 0});
        Meteor.methods({
            'Timers.Update': function(args) {
                var timer = Timers.findOne({"prob" : 0});
                Timers.update({"_id": timer['_id']}, {$set : {"min": args.mins, "sec": args.secs}});
                return false;
            },
            'PythonCode.Update': function(args) {
                var id = Meteor.user().emails[0].address;
                var teamN = id.split('_')[0];
                var code = PythonCode.findOne({prob: args.num, team: teamN});
                PythonCode.update({"_id" : code['_id']}, {prob: args.num, team: args.teamN, code: args.newStr, last_wrote: args.id});
            },
            'CurrNum.Update': function() {
                // Updating to the next problem
                var obj = CurrNum.findOne({});
                CurrNum.update({_id : obj['_id']}, {num: obj['num'] + 1});
            }
        });
        PythonCode.deny({
            insert: function() {
                return true;
            },
            update: function() {
                return true;
            }
        });
        CurrNum.deny({
            insert: function() {
                return true;
            },
            update: function() {
                return true;
            }
        });
        Timers.deny({
            insert: function () {
                return true;
            },
            update: function() {
                return true;
            }
        });
    });
}
