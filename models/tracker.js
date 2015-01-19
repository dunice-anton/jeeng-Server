var services = [
        require('./externalApis/bestBuy'),
        require('./externalApis/zappos')
    ];

exports.getTrackList = function(callback) {
    var productRequest = require('./productRequest')
        , jsonParse = []
        , async_count = 0;

    productRequest = new productRequest();
    productRequest.productName = "macbook pro";
    productRequest.productModel = "MGX82LL/A";


    services.forEach(function(service){
        service.getProduct(productRequest, function(product){
            jsonParse.push.apply(jsonParse, product);
            async_count++;
            if (async_count == services.length){
                callback(jsonParse);
            }
        });
    });

};
