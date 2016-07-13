eval(require('fs').readFileSync('secret.js')+'');

var Botkit = require('botkit');

var controller = Botkit.slackbot({
  debug: false
});

// connect the bot to a stream of messages
controller.spawn({
  token: token,
}).startRTM()

controller.hears(["hello"],['direct_message','direct_mention','mention'],function(bot,message) {
	bot.reply(message,'Hey.');
});

/*
rtm.start //opens websocket 


https://api.slack.com/methods/chat.postMessage //for more complex answers. Be sure and set as_user to true and use your bot user token xoxb-58751128276-oRNHNwrAzj6bRMtFQiNVqt6s.
for buttons, you nees a slack app

to post the text "Hello world" to a channel, you can send this JSON:
{
    "id": 1,
    "type": "message",
    "channel": "C024BE91L",
    "text": "Hello world"
}
*/

/*

http.get({
		host: 'api.wunderground.com',
		path: url
	}, function(response){
		var body = '';
		response.on('data',function(d){
			body += d;
		})
		response.on('end', function(){
			var data = JSON.parse(body);
			var days = data.forecast.simpleforecast.forecastday;
			for(i = 0;i<days.length;i++)
			{
				bot.reply(message, days[i].date.weekday + 
					' high: ' + days[i].high.fahrenheit + 
					' low: ' + days[i].low.fahrenheit + 
					' condition: ' + days[i].conditions);
				bot.reply(message, days[i].icon_url);
			}
		})
	})
*/

/*
- Jirabot exist as a user you can talk to and ask reports from:
 — What are ​*my issues*​? 
 — What are my issues on ​*project name*​?
 — New Issue
 	(it responds with a prompt - buttons or radio buttons)
    - Which project? (list of project you are on)
    - Title?
    - Description?
    - Do you want to add a screenshot? y/n if y (drag it in)
    - Issue posted you can add more details here: (link to issue in jira)
if you invite that bot to a channel it says:
 	- Nice channel. Which project is this channel about? List projects (checkboxs to multiselect)
- You can ask me to:
    List blockers, List my issues (this project(s) is inferred), List open items, list items due today, list items past due,

[10:17]  
show burndown
*/

/*
https://api.slack.com/methods/chat.postMessage
https://howdy.ai/botkit/
https://github.com/howdyai/botkit
*/