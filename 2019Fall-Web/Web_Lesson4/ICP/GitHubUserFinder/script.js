function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)

    // create XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    //save base url
    let url = `https://api.github.com/users/${user}`
    // create message with async false this is depreciated, should be used async in the future
    xhr.open('GET', url, false);
    // fire request
    xhr.send('');
    //return data/response/status
    return xhr;

}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    // parse elements from json api return
    let user_name = user.name;
    let user_id = user.id;
    let user_url = user.html_url;
    let user_repos = user.repos_url;
    let user_pic = user.avatar_url;

    //for html image
    let user_image = document.createElement("img");
    user_image.setAttribute('src', user_pic);
    user_image.setAttribute('alt', "User Image");

    let user_link = "User Link";
    let test_user_link  = user_link.link(user_url);

    let repo_link = "User Repos";
    let test_repo_link  = repo_link.link(user_repos);

    //call update function
    updateInternalHTML(user_name, user_id, test_user_link, test_repo_link, user_image);
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    //Set empty element and have user search again
    updateInternalHTML("No user found", "None", "","");
}

function updateInternalHTML(name, id, information, repos, user_image){

    //get profile element by id
    let profile = document.getElementById("profile");
    //set name and id
    profile.getElementsByTagName('h2')[0].innerText = `Name:${name}  Id:${id}`;

    // clean previously appended tags
    // add new image
    profile.getElementsByClassName('avatar')[0].innerHTML = '';
    profile.getElementsByClassName('avatar')[0].appendChild(user_image);

    // create src link
    // clean previously appended tags
    profile.getElementsByClassName('information')[0].innerHTML = information;

    // link to repos
    // clean previously appended tags
    profile.getElementsByClassName('repos')[0].innerHTML = repos;


}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
