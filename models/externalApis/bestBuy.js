exports.getProduct= function (productRequest, callback){
    var request = require('request');
    var productResponse = require('../productResponse');
    var apiKey = "p9kvbe5mhrwegbake2zkc64b";

    var url;
    var show = "largeImage,onSale,description,condition,color,name,sku,manufacturer,modelNumber,upc,shortDescription,salePrice";
    if (productRequest.productModel.length == 0)
        url = "http://api.remix.bestbuy.com/v1/products(name=" + productRequest.productName + "*)?format=json&show=" + show + "&apiKey=" + apiKey;
    else
        url = "http://api.remix.bestbuy.com/v1/products(modelNumber='" + productRequest.productModel + "')?show=" + show + "&format=json&apiKey=" + apiKey;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body);
            var products = [],
                mappedFields = ['name', 'manufacturer', 'modelNumber', 'shortDescription', 'salePrice', 'color', 'condition', 'onSale', 'largeImage'];
            for (var i = 0; i < json_data.products.length; i++){
                products[i] = new productResponse();
                //store name
                products[i].storeName = "BestBuy";
                mappedFields.forEach(function(element){
                    products[i][element] =  json_data.products[i][element];
                });
            }
        }
        callback (products);
    });
};

//Store information for all stores
//http://api.remix.bestbuy.com/v1/stores?format=json&apiKey=YourAPIKey

//Store information for a single store using a store identifier
//http://api.remix.bestbuy.com/v1/stores(storeId=281)?format=json&apiKey=YourAPIKey

//Returns all reviews
//http://api.remix.bestbuy.com/v1/reviews?format=json&apiKey=YourAPIKey



