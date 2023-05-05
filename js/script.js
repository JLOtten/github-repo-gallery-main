//selecting div class where profile information will appear
const overview = document.querySelector(".overview");
//variable for github username
const username = "JLOtten";

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
};
