﻿var services = [
    require('./externalApis/bestBuy')
    ,require('./externalApis/zappos')
    ,require('./externalApis/crunchbase')
];

exports.getTrackList = function(callback) {
    var productRequest = require('./productRequest')
        , jsonParse = []
        , async_count = 0;

    productRequest = new productRequest();
    productRequest.productName = "mac";
    productRequest.productModel = "MGX82LL/A";
    productRequest.companyName = '';
    productRequest.personName = '';

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
