function upDate(previewPic) {
    /* In this function you should
       1) change the url for the background image of the div with the id = "image"
       to the source file of the preview image

       2) Change the text  of the div with the id = "image"
       to the alt text of the preview image
       */
    var alt_text = previewPic.alt;
    var sub_image = previewPic.src;

    var tmp_img = document.createElement("img");
    tmp_img.setAttribute("alt", alt_text);
    tmp_img.setAttribute("src", sub_image);
    tmp_img.id = "image";

    document.getElementById("image").innerText = "";
    document.getElementById("image").appendChild(tmp_img);

}

function unDo() {
    /* In this function you should
   1) Update the url for the background image of the div with the id = "image"
   back to the orginal-image.  You can use the css code to see what that original URL was

   2) Change the text  of the div with the id = "image"
   back to the original text.  You can use the html code to see what that original text was
   */

    document.getElementById("image").innerText = "Hover over an image below to display here.";

}
