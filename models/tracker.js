var servicesBestBuy = [],
    servicesZappos = [];
servicesBestBuy.push(require('./externalApis/bestBuy'));
servicesZappos.push(require('./externalApis/zappos'));

exports.getTrackList = function(callback) {
    var productRequest = require('./productRequest');

    productRequest = new productRequest();
    productRequest.productName = "macbook pro";
    productRequest.productModel = "MGX82LL/A";
    productRequest.productId = "";

    var jsonParse = [];
    var async_count = 0;

    servicesBestBuy.forEach(function(service){
        service.getProductBestBuy(productRequest, function(product){
            jsonParse.push.apply(jsonParse, product);
            async_count++;
            if (async_count == servicesBestBuy.length){
                callback(jsonParse);
            }
        });
    });

    async_count = 0;
    servicesZappos.forEach(function(service){
        service.getProductZappos(productRequest, function(product){
            jsonParse.push.apply(jsonParse, product);
            async_count++;
            if (async_count == servicesZappos.length){
                callback(jsonParse);
            }
        });
    });
};
