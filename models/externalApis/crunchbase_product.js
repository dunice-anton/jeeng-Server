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
            //product Short_description
            products[0].Short_description = json_data.data.properties.short_description;
            //product Description
            products[0].Description = json_data.data.properties.description;
            //product Homepage_url
            products[0].Homepage_url = json_data.data.properties.homepage_url;
            //product Owner_name
            products[0].Owner_name = json_data.data.properties.owner_name;
            //product Owner_path
            products[0].Owner_path = json_data.data.properties.owner_path;
            //product Category
            products[0].Category = json_data.data.relationships.categories.items;
            //product primary_image
            products[0].primary_image = json_data.data.relationships.primary_image.items;
            //product images
            products[0].images = json_data.data.relationships.images.items;
            //product websites
            products[0].websites = json_data.data.relationships.websites.items;
            callback(products);
        }
        else callback();
    });
};

//FundingRound. This operation returns the properties and relationships of the Funding Round for the given uuid.
//https://api.crunchbase.com/v/2/funding-round/<uuid>?user_key=<apiKey>

//Acquisition. This operation returns the properties and relationships of the Acquisition for the given uuid.
//https://api.crunchbase.com/v/2/acquisition/{uuid}?user_key=<apiKey>

//IPO. This operation returns the properties and relationships of the IPO for the given uuid.
//https://api.crunchbase.com/v/2/ipo/{uuid}?user_key=<apiKey>

//FundRaise. This operation returns the properties and relationships of the Fund Raise for the given uuid.
//https://api.crunchbase.com/v/2/fund-raise/{uuid}?user_key=<apiKey>

//Locations. This operation returns a paginated list of all active Locations in CrunchBase.
//https://api.crunchbase.com/v/2/locations?user_key=<apiKey>&page=1"

//Categories. This operation returns a paginated list of all active Categories in CrunchBase.
//https://api.crunchbase.com/v/2/categories?user_key=<apiKey>&page=1

