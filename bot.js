eval(require('fs').readFileSync('secret.js')+'');

//Cleverbot
// var cleverbot = require("cleverbot.io"),  
// cleverbot = new cleverbot('LqJruH49qbDKhyQD','3jjbLxQjBAyln50l1dohUihB9Us4FD1p');
// cleverbot.setNick("Bob");  
// cleverbot.create(function (err, session) {  
//     if (err) {
//         console.log('cleverbot create fail.');
//     } else {
//         console.log('cleverbot create success.');
//     }
// });

var Botkit = require('botkit');

var controller = Botkit.slackbot({
  debug: false
});

var request = require('request');


var bot = controller.spawn({
  token: token,
}).startRTM();

var logChannel = 'C1RQ24SBH';

function reply(bot, message, response){
	// log to console
	console.log('Recieved: ' + message.text + 
				'\nFrom: ' + message.user + 
				'\nThrough channel: ' + message.channel + 
				'\nResponse: ' + response + 
				'\n\n' );
	// reply
	bot.reply(message, response);
	// log to channel
	bot.say({
			text: 	'---------------' +
				 	'\nRecieved: ' + message.text + 
					'\nFrom: ' + message.user + 
					'\nThrough channel: ' + message.channel + 
					'\nResponse: ' + response,
			channel: logChannel
	});

}

controller.hears(['hello', 'hi', 'hey'],['direct_message','direct_mention','mention'],function(bot,message) {
	reply(bot, message, 'Hey.');
});


controller.hears(['create issue', 'open issue'],['direct_message','direct_mention','mention'],function(bot,message) {
	reply(bot, message, 'What project is it for (project key | "list keys")?');
});

controller.hears(['list (.*) tasks for (.*)'],['direct_message','direct_mention','mention'],function(bot,message) {
	var status = message.match[1];
	if(status == 'in progress')
		status = '"In%20Progress"';
	var assignee = message.match[2];

	request({
		    url: 'https://jira.base22.com/rest/api/2/search?jql=assignee=' + assignee + '%20AND%20status%20%3D%20' + status,
		    headers: {
		      'Authorization':'Basic bWlndWVsLnBlcmV6OngxWDQ4YmMwV3NtMS4=',
		      'Content-Type':'application/json'
	    	}
	  	}, 
		(error, response, body) => {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				var total = data.total;
				data = data.issues.map(e => {return e.key + ".\n" + e.fields.summary + "\n\n"});
				reply(bot, message, 'Total: ' + total + '.\n\n' + data.join('\n'));
	    	}
	  	}
	);
});


controller.hears(['log here'],['direct_message','direct_mention','mention'],function(bot,message) {
	controller.storage.teams.save({id: message.team, logChannel:message.channel}, function(err) { return; });
	controller.storage.teams.get(message.team, function(err, team_data) {
						if(err) {return;} 
						else {logChannel = team_data['logChannel']; console.log(team_data['logChannel']);}
	});
	reply(bot, message, 'I will log to this channel from now on, It is: ' + logChannel + '.'); 
});

controller.hears(['whoami'],['direct_message','direct_mention','mention'],function(bot, message) {
	reply(bot, message, message.user + ' at ' + message.channel);
});

controller.hears(['sismos nuevo leon'],['direct_message','direct_mention','mention'], function(bot, message) {
	var res = '';
	
	const spawn = require('child_process').spawn;
	const phantom = spawn('phantomjs', ['sismos.js', 'NL']);

	phantom.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
		res += data;
	});

	phantom.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
		reply(bot, message, 'there was an error, check the log');
	});

	phantom.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
		reply(bot, message, res);
	});
});


controller.hears(['sismos mexico'],['direct_message','direct_mention','mention'], function(bot, message) {
	var res = '';
	
	const spawn = require('child_process').spawn;
	const phantom = spawn('phantomjs', ['sismos.js']);

	phantom.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
		res += data;
	});

	phantom.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
		reply(bot, message, 'there was an error, check the log');
	});

	phantom.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
		reply(bot, message, res);
	});
});

// controller.hears('.*','direct_message,direct_mention,mention',function(bot,message) {  
//     cleverbot.ask(message.text, function (err, response) {
//         if (err) {
//             console.log('cleverbot err: ' + err);
//         } else {
//         	reply(bot, message, response);
//         }
//     });
// })


controller.on('channel_joined',function(bot,message) {

});





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
show burndown

*/