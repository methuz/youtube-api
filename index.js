// Dependencies
var Google = require("../google-api-nodejs-client/lib/googleapis.js");

// Create YoutTube client
var Client = module.exports = function(config) {};

module.exports = function() {
    var google = new Google();
    var config = {};
    /**
     * authenticate
     * Sets an authentication method to have access to protected resources.
     *
     * @name authenticate
     * @function
     * @param {Object} options An object containing the authentication information.
     * @return {Object} The authentication object
     */
    this.authenticate = function (options) {
        if (!options) {
            config.auth = undefined;
            return;
        }

        var authObj = null;
        switch (options.type) {
            case "oauth":
                authObj = new  google.auth.OAuth2();
                authObj.setCredentials({
                    access_token: options.access_token || options.token
                  , refresh_token: options.refresh_token
                });
                break;
            case "key":
                authObj = options.key;
                break;
            case "jwt":
                authObj = new google.auth.JWT(
                    options.email
                  , options.keyFile
                  , options.key
                  , options.scopes
                  , options.subject
                );
                break;
        }

        google.options({ auth: authObj });
        config.auth = options;

        return authObj;
    };

    /**
     * getConfig
     * Returns Client configuration object
     *
     * @name getConfig
     * @function
     * @return {Object} Client configuration object
     */
    this.getConfig = function () {
        return config;
    };

    // Add Google YouTube API functions
    var GoogleYoutube = google.youtube("v3");
    for (var f in GoogleYoutube) {
        this[f] = GoogleYoutube[f];
    }
};
