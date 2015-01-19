exports.getProductZappos = function (productRequest, callback){
    var request = require('request');
    var productResponse = require('../productResponse');
    var apiKey = "";

    var url = 'http://api.zappos.com/Product/' + productRequest.productId + '?includes=["gender","styles","stocks","description", "weight", "video", "sizeFit", "widthFit", "archFit", "productRating", "overrallRating", "comfortRating", "lookRating", "sortedSizes", "sortedWidths", "measurements", "defaultCategory", "defaultSubCategory", "attributeFacetFields"]' + apiKey;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body);
            var products = []
                , mappedFields = ['storeName','productId','brandName','productName','defaultProductUrl','defaultPrettyProductUrl','defaultImageUrl',
                    'defaultProductType','description','gender','weight','videos','videoFileName','videoUrl','videoUploadedDate','sizeFit',
                    'widthFit','archFit','productRating','overallRating','comfortRating','lookRating','styles','sortedSizes','sortedWidths',
                    'isNew', 'measurements', 'defaultCategory', 'defaultSubCategory', 'attributeFacetFields'];
            for (var i = 0; i < json_data.products.length; i++){
                products[i] = new productResponse();
                //store name
                products[i].storeName = "Zappos";
                mappedFields.forEach(function(elem){
                    products[i][elem] =  json_data.products[i][elem];
                });
            }
            callback (products);
        }
    });
};