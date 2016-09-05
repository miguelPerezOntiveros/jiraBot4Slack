var webPage = require('webpage');
var page = webPage.create();
var system = require('system');

var page = new WebPage(), testindex = 0, loadInProgress = false;

page.injectJs('jquery-1.6.1.min.js');
//console.log('finished loading jQuery');

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  //console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  //console.log("load finished");
};

var steps = [
	{
		desc: 'loading page',
  		toExecute: function(arg1) {  
				page.open("http://www.ssn.unam.mx/sismicidad/ultimos/");
		}
	},
  	{
  		desc: 'printing table',
  		toExecute: function(arg1) {
    		page.evaluate(function(arg1) {
				$('.table-condensed  > tbody').find('tr').not('.hidden').each(function(k, v){
                    console.log( $(v).text().replace(/\s\s+/g, ' ') );
                })
			});
		}
	}
];
var stepsNL = [
    {
        desc: 'loading page',
        toExecute: function(arg1) {  
                page.open("http://www.ssn.unam.mx/sismicidad/ultimos/");
        }
    },
    {
        desc: 'printing table',
        toExecute: function(arg1) {
            page.evaluate(function(arg1) {
                $('.table-condensed  > tbody').find('tr').not('.hidden').each(function(k, v){
                    if( $(v).text().indexOf('NL') != -1) 
                        console.log( $(v).text().replace(/\s\s+/g, ' ') );
                })
            });
        }
    }
];

if(system.args[1] == 'NL')
    steps = stepsNL;

interval = setInterval(function() {
  if (!loadInProgress) {
    //console.log("\nStep " + (testindex+1) + '/' + steps.length +': ' + steps[testindex].desc);
    setTimeout(steps[testindex].toExecute(system.args[1]), 0);
    if(steps.length-1 < ++testindex)
    	phantom.exit();
  }
}, 50);