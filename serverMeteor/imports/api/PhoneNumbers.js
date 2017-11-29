export const PhoneNumbers = new Mongo.Collection('phoneNumbers')

Meteor.methods({
    // This is an object being passed to the Metoer.methods funciton
    // Everything in here needs to be in key value pairs
    addPhoneNumber: function(data) {
        PhoneNumbers.insert({
            name: data.name,
            number: data.number
        }, err => {
            if (err) {
                return err
            } else {
                return null
            }
        })
    }
});