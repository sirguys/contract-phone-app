import { Meteor } from 'meteor/meteor';
// You have to import the Phone numbers collection or else the server won't really know where it is.
import { PhoneNumbers } from '../imports/api/PhoneNumbers';

Meteor.startup(() => {
  // code to run on server at startup
  // Publicaitons need to go inside of here.
  Meteor.publish('getAllNumbers', function() {
    // This is clearly a part of some tutorial but still make sure you learn how to authenticate users and
    // validate requests
    return PhoneNumbers.find({});
  });
});
