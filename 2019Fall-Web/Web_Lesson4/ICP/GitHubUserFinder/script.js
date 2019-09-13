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

    let user_name = user.name;
    let user_id = user.id;
    let user_url = user.html_url;
    let user_repos = user.repos_url;
    let user_pic = user.avatar_url;

    updateInternalHTML(user_name, user_id, "show_test_2", "show_test_3");

}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    console.log("TEST_FAILED");
    //updateInternalHTML("noshow_test", "", "noshow_test_3");
}

function updateInternalHTML(header, id, avatar, information){

    console.log("START");
    console.log(header);
    console.log(id);
    console.log("END");

    let profile = document.getElementById("profile");
    profile.getElementsByTagName('h2').textContent = "TEST";
    profile.getElementsByClassName('avatar').innerText = "potato";
    profile.getElementsByClassName('information').innerText = information;


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
