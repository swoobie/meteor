PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  //this code only runs on the client
  Template.leaderboard.helpers({
    'player' : function(){
      return PlayersList.find({}, {sort: {score: -1, name: 1}});
    },
    'selectedClass' : function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId === selectedPlayer)
        return "selected";
    },
    'showSelectedPlayer' : function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }

  });

  Template.leaderboard.events({
    //events go hear

    'click .player' : function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },

    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5}});
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5}});
    },
    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event){
      event.preventDefault();
      var playerNameToAdd = event.target.playerName.value;
      PlayersList.insert({name: playerNameToAdd, score: 0});

    }
  });
}
if(Meteor.isServer){
  //this code only runs on the server
}
