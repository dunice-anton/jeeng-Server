exports.getProduct  = function (productRequest, callback){
    console.log('start');
    var request = require('request')
        , productResponse = require('../productResponse')
        , apiKey = ""
        , show = ["gender","description"]
        , url = 'http://api.zappos.com/Search/term/' + productRequest.productName + '?includes=[' + show.join() + ']&key=' + apiKey;

    request(url, function (error, response, body) {
        console.log('request', response.statusCode);
        if (!error && response.statusCode == 200) {
            console.log('if');
            var json_data = JSON.parse(body)
                , products = []
                , mappedFields = ['styled', "productld", "colorld", 'brandName', 'productName',
                                  "productUrl", "thumbnailImageUrl", "price", "originalPrice",
                                  "percentOff", "description", "currentResultCount", "totalResultCount",
                                  "facetField", "facetFieldDisplayName", "values", "name", "count"];
            for (var i = 0; i < json_data.products.length; i++){
                products[i] = new productResponse();
                //store name
                products[i].storeName = "Zappos";
                mappedFields.forEach(function(elem){
                    products[i][elem] =  json_data.products[i][elem];
                });
            }
        }
        callback (products);
    });
};



