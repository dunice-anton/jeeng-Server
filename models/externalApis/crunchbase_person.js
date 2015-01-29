var request = require ('request')
    ,apiKey = "318cc6e3626df239a596ccb30b39cb1f";

exports.getProduct  = function (productRequest, callback) {
    var productResponse = require ('../productResponse')
        ,url = 'https://api.crunchbase.com/v/2/person/' + productRequest.personName + '?user_key=' + apiKey
        ,person = [];

    request (url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body);
            if(json_data.data.response == false) callback();
            person[0] = new productResponse();
            //store name
            person[0].storeName = "CrunchBase";
            //person First_name
            person[0].First_name = json_data.data.properties.first_name;
            //person Last_name
            person[0].Last_name = json_data.data.properties.last_name;
            //person Type
            person[0].Type = json_data.data.type;
            //person Died_on
            person[0].Died_on = json_data.data.properties.died_on;
            //person experience
            person[0].experience = json_data.data.relationships.experience.items;
            //person primary_location
            person[0].primary_location = json_data.data.relationships.primary_location.items;
            //person primary_affiliation
            person[0].primary_affiliation = json_data.data.relationships.primary_affiliation.items;
            callback(person);
        }
        else callback();
    });
};