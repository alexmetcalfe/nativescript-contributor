var observableModule = require("data/observable");

var contributor;
var page;

var pageData = new observableModule.Observable();

exports.onPageLoaded = function(args) {
    page = args.object;

    contributor = page.navigationContext.contributor;

    pageData.set("contributor", contributor);
    page.bindingContext = pageData;
};
