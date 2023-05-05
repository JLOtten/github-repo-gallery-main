//selecting div class where profile information will appear
const overview = document.querySelector(".overview");
//variable for github username
const username = "JLOtten";
//select the ul to display the repos list
const repoList = document.querySelector(".repo-list");
//selects the section with a class of "repos" where all repo infor appears
const allReposContainer = document.querySelector(".repos");
//selects the section with a class of "repo-data" where individual repo info appears
const repoData = document.querySelector(".repo-data");

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
displayRepo(repoData); 
};

//create a function to display info about each repo
const displayRepo = function (repos) {
    for (const repo of repos) { //loop throu each repo in the repos
        const repoItem = document.createElement("li"); //create a list item for each repo
        repoItem.classList.add("repo"); //give each item a class of repo
        repoItem.innerHTML = `<h3>${repo.name}</h3>`; //give each item an <h3> with the repo name
        repoList.append(repoItem); //append the list item to the global variable that grabs the ul repo list
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) { //conditional to see if the event was clicked on matches the <h3> element
        const repoName = e.target.innerText; //targets the innerText where the event happens
        getRepoInfo(repoName);
    }
});

//function to get specific info about each repo
const getRepoInfo = async function (repoName) {
    //fetch request to grab info about the specific repo
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json(); //save JSON repsonse to variable
    console.log(repoInfo);

    //grab languages from api
    const fetchLanguages = await fetch(repoInfo.languages_url); //get the language_url property from the repoInto json response
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    //make a list(array) of languages
    const languages = []; //make an empty array
    for (const language in languageData) { //loop thru languageData object with a for...in loop to get properties
        languages.push(language); //add each language to the end of the languages array
    }
    displayRepoInfo(repoInfo, languages);
};

//create a function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    //empty the HTML section with a class of repo-data
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    //create a new div element, add the selected repo's name, discription, default branch and link to code on GitHub
    const div = document.createElement("div");
    let innerHTML = `<h3>Name: ${repoInfo.name}</h3>`
    if (repoInfo.description) { //handle for the case if there's no description for repo
        innerHTML += `<p>Description: ${repoInfo.description}</p>`
    } //if there's no description listed in GitHub, skip this category
    innerHTML += `<p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p> 
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    div.innerHTML = innerHTML;
    //append the new div element to the section with class of repo-data
    repoData.append(div);
};
