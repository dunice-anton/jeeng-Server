var services = [
    require('./externalApis/bestBuy')
    ,require('./externalApis/zappos')
    ,require('./externalApis/crunchbase_product')
    ,require('./externalApis/crunchbase_person')
    ,require('./externalApis/crunchbase_company')
];

exports.getTrackList = function(callback) {
    var productRequest = require('./productRequest')
        , jsonParse = []
        , async_count = 0;

    productRequest = new productRequest();
    productRequest.productName = "mac";
    productRequest.productModel = "MGX82LL/A";
    productRequest.companyName = 'apple';
    productRequest.personName = 'steven-owen';

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


