var getUserRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  //make the call
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};
getUserRepos("facebook");
