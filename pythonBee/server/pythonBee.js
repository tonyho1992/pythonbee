if (Meteor.isServer) {
    Meteor.startup(function() {
        PythonCode.remove({});
        for (j = 0; j < 10; j ++) {
            for(i = 0; i < 40; i++) {
                PythonCode.insert({prob: j, team: 'team' + i, code: 'let camel x y = x + y', last_wrote: ''});
      	    }
            PythonCode.insert({prob: j, team: 'nrt', code: '', last_wrote: ''});
        }
        Timers.remove({});
        Timers.insert({prob: 0, min: 0, sec: 0});
        CurrNum.remove({});
        CurrNum.insert({num: 0});
    });
}