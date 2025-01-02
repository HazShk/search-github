var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

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
      //console.log(data);
      displayRepos(data, user);
    });
  });
};

var displayRepos = function (repos, searchTerm) {
  console.log(repos);
  //console.log(searchTerm);

  //clear old content before displaying data
  repoContainerEl.textContent = "";

  //set user name for searchterm
  repoSearchTerm.textContent = searchTerm;

  //display data, iterate over repos
  for (var i = 0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;
    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    //create issues (status) element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if repo has issues
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);
//getUserRepos("microsoft");
