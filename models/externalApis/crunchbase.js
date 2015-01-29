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

exports.getCompany  = function (productRequest, callback) {
    var productResponse = require ('../productResponse')
        ,url = 'https://api.crunchbase.com/v/2/organization/' + productRequest.companyName + '?user_key=' + apiKey
        ,company = [];

    request (url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body);
            if(json_data.data.response == false) callback();
            company[0] = new productResponse();
            //store name
            company[0].storeName = "CrunchBase";
            //company name
            company[0].Name = json_data.data.properties.name;
            //company type
            company[0].Type = json_data.data.type;
            //company primary role
            company[0].Primary_role = json_data.data.properties.primary_role;
            //company founded on
            company[0].Founded_on = json_data.data.properties.founded_on;
            //company closed on
            company[0].Closed_on = json_data.data.properties.closed_on;
            //company short_description
            company[0].Short_description = json_data.data.properties.short_description;
            //company short_description
            company[0].Description = json_data.data.properties.short_description;
            //company short_description
            company[0].Homepage_url = json_data.data.properties.homepage_url;
            //company short_description
            company[0].Phone_number = json_data.data.properties.phone_number;
            //company short_description
            company[0].Stock_symbol = json_data.data.properties.stock_symbol;
            //company past_team
            company[0].past_team = json_data.data.relationships.past_team.items;
            //company board_members_and_advisors
            company[0].board_members_and_advisors = json_data.data.relationships.board_members_and_advisors.items;
            //company current_team
            company[0].current_team = json_data.data.relationships.current_team.items;
            //company acquisitions
            company[0].acquisitions = json_data.data.relationships.acquisitions.items;
            //company competitors
            company[0].competitors = json_data.data.relationships.competitors.items;
            //company offices
            company[0].offices = json_data.data.relationships.offices.items;
            //company headquarters
            company[0].headquarters = json_data.data.relationships.headquarters.items;
            //company categories
            company[0].categories = json_data.data.relationships.categories.items;
            //company members
            company[0].members = json_data.data.relationships.members.items;
            //company customers
            company[0].customers = json_data.data.relationships.customers.items;
            //company investments
            company[0].investments = json_data.data.relationships.investments.items;
            //company founders
            company[0].founders = json_data.data.relationships.founders.items;
            //company ipo
            company[0].ipo = json_data.data.relationships.ipo.items;
            //company products
            company[0].products = json_data.data.relationships.products.items;
            //company primary_image
            company[0].primary_image = json_data.data.relationships.primary_image.items;
            //company images
            company[0].images = json_data.data.relationships.images.items;
            //company videos
            company[0].videos = json_data.data.relationships.videos.items;
            //company websites
            company[0].websites = json_data.data.relationships.websites.items;
            //company news
            company[0].news = json_data.data.relationships.news.items;
            callback(company);
        }
        else callback();
    });
};

exports.getPerson  = function (productRequest, callback) {
    var productResponse = require ('../productResponse')
        ,url = 'https://api.crunchbase.com/v/2/person/' + productRequest.personName + '?user_key=' + apiKey
        ,person = [];

    request (url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body);
            if(json_data.data.response == false) callback();
            person[0] = new productResponse();
            //store name
            person[0].storeName = "CrunchBase";
            //person First_name
            person[0].First_name = json_data.data.properties.first_name;
            //person Last_name
            person[0].Last_name = json_data.data.properties.last_name;
            //person Type
            person[0].Type = json_data.data.type;
            //person Died_on
            person[0].Died_on = json_data.data.properties.died_on;
            //person experience
            person[0].experience = json_data.data.relationships.experience.items;
            //person primary_location
            person[0].primary_location = json_data.data.relationships.primary_location.items;
            //person primary_affiliation
            person[0].primary_affiliation = json_data.data.relationships.primary_affiliation.items;
            callback(person);
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

