if (Meteor.isServer) {
    Meteor.startup(function() {
        PythonCode.remove({});
        for(i = 0; i < 25; i++) {
          	PythonCode.insert({prob: 0, team: 'team' + i, code: '', last_wrote: ''});
  	    }
        Timers.remove({});
        Timers.insert({prob: 0, min: 0, sec: 0});
        CurrNum.remove({});
        CurrNum.insert({num: 0});
    });
}