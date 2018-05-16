// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '195130731096693', // your App ID
        'clientSecret'    : 'd5bdbb3bf0603f54bb287e24f3ae3db9', // your App Secret
        'callbackURL'     : 'http://deliverykings.co.in/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '1068669269960-k8cv80pvpcqpiml3akuc1uaadtshuf5o.apps.googleusercontent.com',
        'clientSecret'     : 'bH231gg6vgbWcQxQ24ZR--N4',
        'callbackURL'      : 'http://deliverykings.co.in/auth/google/callback'
    }

};
