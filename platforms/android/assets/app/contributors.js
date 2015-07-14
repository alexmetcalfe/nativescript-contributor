var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");
var dialogs = require("ui/dialogs");
var frames = require("ui/frame");
var http = require("http");

var contributors = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;

http.getJSON("https://api.github.com/repos/NativeScript/NativeScript/contributors").then(function (r) {
    // Argument (r) is JSON!
    for (var i = 0; i < r.length; i++) {
      contributors.push({ login: r[i].login, contributions: r[i].contributions });
    }
}, function (e) {
    // Argument (e) is Error!
    console.log(e);
});

exports.onPageLoaded = function(args) {
    page = args.object;
    pageData.set("contributors", contributors);
    page.bindingContext = pageData;

    if (page.ios) {
      frames.topmost().ios.navBarVisibility = "always";
      page.ios.title = 'NativeScript contributors';
    }

    // get the view controller navigation item
    var navigationItem = controller.visibleViewController.navigationItem;

    // hide back button
    navigationItem.setHidesBackButtonAnimated(false, true);
};

function contributorSelected(args) {
  var itemIndex = args.index;

  frames.topmost().navigate({
      moduleName: "view-contributor",
      context: {
        contributor: contributors.getItem(args.index)
      }
  });
}
exports.contributorSelected = contributorSelected;
