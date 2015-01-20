exports.getProduct  = function (productRequest, callback){
    var request = require('request')
        , productResponse = require('../productResponse')
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
        , productData = [];

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body)
                , products = [];
            for (var i = 0; i < json_data.products.length; i++){
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

                urlProduct = 'http://api.zappos.com/Product/id/' + products[i].productId + '?includes=[' + showProduct.join() + ']&key=' + apiKey;
                urlImage = 'http://api.zappos.com/Image?productId=' + products[i].productId + '?includes=[' + showImage.join() + ']&key=' + apiKey;

                async.parallel([
                    function(callback){
                        request(urlProduct, function (error, response, body){
                            if (!error && response.statusCode == 200) {
                                var json_data = JSON.parse(body)
                                    , products = {};
                                for (var i = 0; i < json_data.products.length; i++){
                                    //default product URl
                                    products.defaultProductUrl = json_data.product.defaultProductUrl;
                                    //default pretty product URL
                                    products.defaultPrettyProductUrl = json_data.product.defaultPrettyProductUrl;
                                    //default image URL
                                    products.defaultImageUrl = json_data.product.defaultImageUrl;
                                    //product gender
                                    products.gender = json_data.product.gender;
                                    //products weight
                                    products.weight = json_data.product.weight;
                                    //products video
                                    products.videos = json_data.product.videos;
                                    //products szxe Fit
                                    products.sizeFit = json_data.product.sizeFit;
                                    //products width Fit
                                    products.widthFit = json_data.product.widthFit;
                                    //arch Fit
                                    products.archFit = json_data.product.archFit;
                                    //overall Rating
                                    products.overallRating = json_data.product.overallRating;
                                    //comfort Rating
                                    products.comfortRating = json_data.product.comfortRating;
                                    //look Rating
                                    products.lookRating = json_data.product.lookRating ;
                                    //products style
                                    products.styles = json_data.product.styles;
                                    //products isNeww
                                    products.isNew = json_data.product.isNew;
                                    //products measurements
                                    products.measurements = json_data.product.measurements;
                                    //products type
                                    products.defaultProductType = json_data.product.defaultProductType;
                                    //default products type
                                    products.defaultCategory = json_data.product.defaultCategory;
                                    //default products sub categories
                                    products.defaultSubCategory = json_data.product.defaultSubCategory;
                                    //
                                    products.attributeFacetFields = json_data.product.attributeFacetFields;
                                }
                            }
                            callback (products);
                        })
                    },
                    function(callback){
                        request(url, function (error, response, body){
                            if (!error && response.statusCode == 200) {
                                var json_data = JSON.parse(body)
                                    , products = {};
                                for (var i = 0; i < json_data.products.length; i++){
                                    products.type = json_datas.images.type;
                                    //image type
                                    products.recipeName = json_datas.images.recipeName;
                                    //recipe name
                                    products.format = json_datas.images.format;
                                    //format
                                    products.filename = json_datas.images.filename;
                                    //color ID
                                    products.colorId = json_datas.images.colorId;
                                    //width
                                    products.width = json_datas.images.width;
                                    //height
                                    products.height = json_datas.images.height;
                                    //upload data
                                    products.uploadDate = json_datas.images.uploadDate;
                                    //Resolution
                                    products.isHighResolution = json_datas.images.isHighResolution;
                                    //title
                                    products.tiles = json_datas.images.tiles;
                                }
                            }
                            callback (products);
                        })
                    }],
                function(err, results){
                    productData.push(results)
                });
                products[i].push(productData);
            }
        }
        callback (products);
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