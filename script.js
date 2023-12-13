const formE1 = document.querySelector(".search-result")//form
const inputE1 = document.querySelector(".searchBar")//search-input
const mangalist = document.querySelector(".manga-list")//searc result

let searchData = ""
let page = 1;
let btn = document.getElementById('searchbtn')

async function searchManga (){
    searchData = inputE1.value;
    const mangaUrl = `https://api.mangadex.org/manga?page=${page}title=${encodeU(inputE1)}`

    const response = await fetch(mangaUrl)
    const data = await response.json()

    const result = data.result

    if(page === 1){
        mangalist.innerHTML = ""
    }

    result.map((result)=>{
        const mangaWrapper = document.createElement('div')
        mangaWrapper.classList.add("manga-card")

        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt.description

        const title = document.createElement('h2')
        title = result.attributes.title

        const description = document.createElement('description')
        description = result.attributes.description

        mangaWrapper.appendChild(image);
        mangaWrapper.appendChild(title);
        mangaWrapper.appendChild(description);
        mangalist.appendChild(mangaWrapper);
    });

    page++;
}

formE1.addEventListener("searchbtn", (event)=>{
    event.preventDefault();
    page = 1;
    searchManga();
})

