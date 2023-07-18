const accesskey = "UgEOrhFUXpD2gsFaCC3_CH65-bJ7QLfv7VSvgjB6PgQ";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("searchinput");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");


let inputData = "";
let page = 1;


async function searchImage(){

    inputData = inputEl.value;

    //making url dynamic
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    //this is for fisrt page...without searching 
    if(page === 1){

        searchResults.innerHTML = "";

    }


    results.map((result)=>{

        //creating a tempalte for the image ...similar to hyml template

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        //adding there child
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });
    page++;

    if(page>1){

        showMore.style.display = "block";

    }


}


//now we have to add event  so that api will work


formEl.addEventListener("submit", (event)=>{
    event.preventDefault()
    page = 1;
    searchImage();

});



//calling again searchImage()..on clicking show more button for more image


showMore.addEventListener("click", ()=>{
    searchImage();


});


