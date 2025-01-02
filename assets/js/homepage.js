var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function (event) {
  event.preventDefault();
  //console.log(event);
  //get username value
  var userName = nameInputEl.value.trim();
  console.log(userName);
  if (userName) {
    getUserRepos(userName);
    //clear the value for next search
    nameInputEl.value = "";
  } else {
    alert("Please enter a valid github username");
  }
};

var getUserRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  //make the call
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

userFormEl.addEventListener("submit", formSubmitHandler);
//getUserRepos("facebook");
