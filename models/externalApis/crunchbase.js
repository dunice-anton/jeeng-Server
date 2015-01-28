var request = require ('request')
    ,apiKey = "318cc6e3626df239a596ccb30b39cb1f";

exports.getProduct  = function (productRequest, callback) {
    var productResponse = require ('../productResponse')

        ,url = 'https://api.crunchbase.com/v/2/product/' + productRequest.productName + '?user_key=' + apiKey
        ,products = [];

    request (url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body);
            if(json_data.data.response == false) callback();
            products[0] = new productResponse();
            //store name
            products[0].storeName = "CrunchBase";
            //product name
            products[0].Name = json_data.data.properties.name;
            //
            products[0].Short_description = json_data.data.properties.short_description;
            //
            products[0].Description = json_data.data.properties.description;
            //
            products[0].Homepage_url = json_data.data.properties.homepage_url;
            //
            products[0].Owner_name = json_data.data.properties.owner_name;
            //
            products[0].Owner_path = json_data.data.properties.owner_path;
            //
            products[0].Category = json_data.data.relationships.categories.items.name;
            callback(products);
        }
        else callback();
    });
};


exports.getCompany  = function (productRequest, callback) {
    var productResponse = require ('../productResponse')
        ,url = 'https://api.crunchbase.com/v/2/organization/' + productRequest.companyName + '?user_key=' + apiKey
        ,products = [];

    request (url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body);
            if(json_data.data.response == false) callback();
            products[0] = new productResponse();
            //store name
            products[0].storeName = "CrunchBase";
            callback(products);
        }
        else callback();
    });
};


exports.getCompany  = function (productRequest, callback) {
    var productResponse = require ('../productResponse')
        ,url = 'https://api.crunchbase.com/v/2/person/' + productRequest.personName + '?user_key=' + apiKey
        ,products = [];

    request (url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body);
            if(json_data.data.response == false) callback();
            products[0] = new productResponse();
            //store name
            products[0].storeName = "CrunchBase";
            callback(products);
        }
        else callback();
    });
};