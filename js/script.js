//selecting div class where profile information will appear
const overview = document.querySelector(".overview");
//variable for github username
const username = "JLOtten";
//select the ul to display the repos list
const repoList = document.querySelector(".repo-list");

const getProfileInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    console.log(data);

    //call display function
    displayUserInfo(data);
};

getProfileInfo();

//function to display fetched user info on page
const displayUserInfo = function(data) {
    //create a new div with class user-info
    const div = document.createElement("div");
    div.classList.add("user-info");
    //use innerHTML to populate the div with relevant properties from JSON data
    div.innerHTML = `  <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  //append this div to the overview element
  overview.append(div);
  getRepos();
};

//create an async function to fetch repos
const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData); 
repoInfo(repoData); 
};

//create a function to display info about each repo
const repoInfo = function (repos) {
    for (const repo of repos) { //loop throu each repo in the repos
        const repoItem = document.createElement("li"); //create a list item for each repo
        repoItem.classList.add("repo"); //give each item a class of repo
        repoItem.innerHTML = `<h3>${repo.name}</h3>`; //give each item an <h3> with the repo name
        repoList.append(repoItem); //append the list item to the global variable that grabs the ul repo list
    }
};