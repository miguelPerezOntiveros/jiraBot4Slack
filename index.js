var request = require('request');

var name = 'miguel.perez';

request({
    url: 'https://jira.base22.com/rest/api/2/search?jql=assignee=' + name + '%20AND%20status%20%3D%20Open',
    headers: {
      'Authorization':'Basic bWlndWVsLnBlcmV6OngxWDQ4YmMwV3NtMS4=',
      'Content-Type':'application/json'
    }
  }, 
  (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log(data.total);
    }
  }
);
