var request = require('request')
    ,async = require('async')
    , Q = require('Q');

exports.getProduct  = function (productRequest, callback){
    var productResponse = require('../productResponse')
    , apiKey = ""
    , showSearch = ["description", "videoUrl", "videoFileName", "videoUploadedDate", "productRating", "brandId",
        "categoryFacet", "heelHeight", "subCategoryFacet", "txAttrFacet_Gender"]
    , showProduct = ["defaultPrettyProductUrl", "description", "gender", "weight", "videos", "videoFileName",
        "videoUrl", "videoUploadedDate", "sizeFit", "widthFit", "archFit", "productRating",
        "overallRating", "comfortRating", "lookRating", "styles", "isNew", "measurements",
        "defaultCategory", "defaultSubCategory", "attributeFacetFields"]
    , showImage = ["colorId", "width", "height", "uploadDate", "isHighResolution", "tiles"]
    , url = 'http://api.zappos.com/Search/term/' + productRequest.productName + '?includes=[' + showSearch.join() + ']&key=' + apiKey
    ,urlProduct
    ,urlImage
    , productsResult = [];

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body)
                , products = [];
            for (var i = 0; i < json_data.products.length; i++) {
                products[i] = new productResponse();
                //store name
                products[i].storeName = "Zappos";
                //style ID
                products[i].styleId = json_data.results[i].styleId;
                //product ID
                products[i].productId = json_data.results[i].productId;
                //color ID
                products[i].colorId = json_data.results[i].colorId;
                //product brand name
                products[i].brandName = json_data.results[i].brandName;
                //product name
                products[i].productName = json_data.results[i].productName;
                //product URL
                products[i].productUrl = json_data.results[i].productUrl;
                //product thumbnail image URL
                products[i].thumbnailImageUrl = json_data.results[i].thumbnailImageUrl;
                //product price
                products[i].price = json_data.results[i].price;
                //product origin price
                products[i].originalPrice = json_data.results[i].originalPrice;
                //product percentOff
                products[i].percentOff = json_data.results[i].percentOff;
                //product description
                products[i].description = json_data.results[i].description;
                //video ID
                products[i].videoUrl = json_data.results[i].videoUrl;
                //video file name
                products[i].videoFileName = json_data.results[i].videoFileName;
                //video upload date
                products[i].videoUploadedDate = json_data.results[i].videoUploadedDate;
                //product rating
                products[i].productRating = json_data.results[i].productRating;
                //brand ID
                products[i].brandId = json_data.results[i].brandId;
                //category Facet
                products[i].categoryFacet = json_data.results[i].categoryFacet;
                //heel Height
                products[i].heelHeight = json_data.results[i].heelHeight;
                //sub Category Facet
                products[i].subCategoryFacet = json_data.results[i].subCategoryFacet;
                //Facet Gender
                products[i].txAttrFacet_Gender = json_data.results[i].txAttrFacet_Gender;
            }

            var getAdditionProps = function () {
                var deferred = Q.defer()
                    , curProduct = products.shift();

                urlProduct = 'http://api.zappos.com/Product/id/' + curProduct.productId + '?includes=[' + showProduct.join() + ']&key=' + apiKey;
                urlImage = 'http://api.zappos.com/Image?productId=' + curProduct.productId + '?includes=[' + showImage.join() + ']&key=' + apiKey;

                async.parallel([
                    function (callback) {
                        request(urlProduct, function (error, response, body){
                                if (!error && response.statusCode == 200) {
                                    var first_data = JSON.parse(body);
                                }
                                callback (null, first_data);
                            })
                    },
                    function (callback) {
                        request(url, function (error, response, body){
                            if (!error && response.statusCode == 200) {
                                var second_data = JSON.parse(body);
                            }
                            callback (null, second_data );
                        })
                    }],
                function (err, results) {
                    //default product URl
                    curProduct.defaultProductUrl = results[0].product.defaultProductUrl;
                    //default pretty product URL
                    curProduct.defaultPrettyProductUrl = results[0].product.defaultPrettyProductUrl;
                    //default image URL
                    curProduct.defaultImageUrl = results[0].product.defaultImageUrl;
                    //product gender
                    curProduct.gender = results[0].product.gender;
                    //products weight
                    curProduct.weight = results[0].product.weight;
                    //products video
                    curProduct.videos = results[0].product.videos;
                    //products szxe Fit
                    curProduct.sizeFit = results[0].product.sizeFit;
                    //products width Fit
                    curProduct.widthFit = results[0].product.widthFit;
                    //arch Fit
                    curProduct.archFit = results[0].product.archFit;
                    //overall Rating
                    curProduct.overallRating = results[0].product.overallRating;
                    //comfort Rating
                    curProduct.comfortRating = results[0].product.comfortRating;
                    //look Rating
                    curProduct.lookRating = results[0].product.lookRating ;
                    //products style
                    curProduct.styles = results[0].product.styles;
                    //products isNeww
                    curProduct.isNew = results[0].product.isNew;
                    //products measurements
                    curProduct.measurements = results[0].product.measurements;
                    //products type
                    curProduct.defaultProductType = results[0].product.defaultProductType;
                    //default products type
                    curProduct.defaultCategory = results[0].product.defaultCategory;
                    //default products sub categories
                    curProduct.defaultSubCategory = results[0].product.defaultSubCategory;
                    //attribute facet field
                    curProduct.attributeFacetFields = results[0].product.attributeFacetFields;
                    //image type
                    curProduct.type = results[1].images.type;
                    //recipe name
                    curProduct.recipeName = results[1].images.recipeName;
                    //format
                    curProduct.format = results[1].images.format;
                    //image file name
                    curProduct.filename = results[1].images.filename;
                    //color ID
                    curProduct.colorId = results[1].images.colorId;
                    //width
                    curProduct.width = results[1].images.width;
                    //height
                    curProduct.height = results[1].images.height;
                    //upload data
                    curProduct.uploadDate = results[1].images.uploadDate;
                    //Resolution
                    curProduct.isHighResolution = results[1].images.isHighResolution;
                    //title
                    curProduct.tiles = results[1].images.tiles;

                    deferred.resolve(curProduct);
                    //deferred.reject();
                });

                return deferred.promise;
            };

            var success = function (product) {
                productsResult.push(product);
                if (products.length) getAdditionProps().then(success);
                else callback(productsResult);
            };

            getAdditionProps().then(success)
        }
        else callback();
    });
};

//Statistics	Our fun api! Get cool stats about Zappos purchases.
//http://api.zappos.com/Statistics?type=<TYPE>&key=<YourApiKey>

//Brand	Did you know we carry almost 1000 brands? Get more details on specific brands with this API
//http://api.zappos.com/Brand/<BRAND_ID>&key=<YourApiKey>

//Review	Zappos has thousands of reviews from our amazing customers. Find out what our customer's are saying about our products
//http://api.zappos.com/Review?productId=<PRODUCT_ID>&key=<YourApiKey>

//AutoComplete	The AutoComplete API will let you implement search auto-complete on your own site.
//http://api.zappos.com/AutoComplete?term=<TERM>&key=<YourApiKey>

//CoreValue New!	Nothing screams Zappos like our Core Values
//http://api.zappos.com/CoreValue&key=<YourApiKey>

//Similarity New & BETA!	Want to find out what products look or are similar to a given style? Now you can!
//http://api.zappos.com/Search/Similarity?type=visualSearch&limit=5&styleId=<STYLE_ID>[&emphasis=<OPTIONS>]&key=<YourApiKey>
