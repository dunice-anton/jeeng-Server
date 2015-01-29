var request = require ('request')
    ,apiKey = "318cc6e3626df239a596ccb30b39cb1f";

exports.getProduct  = function (productRequest, callback) {
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
