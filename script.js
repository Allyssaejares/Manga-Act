const search = document.querySelector('.search');
const input = document.getElementById('searchBar');
const btn = document.getElementById('search-btn');
const display = document.getElementById('container');

let keyword = ""
let page = 1;


async function displayResults() {
    keyword = input.value;
    const mangaUrl = `https://api.mangadex.org/manga?limit=50&title=${keyword}&includes%5B%5D=cover_art`

    const response = await fetch(mangaUrl);
    const data = await response.json();

    let datadisplay = data.data.map((manga) => {
        const title = manga.attributes.title.en;
        const description = manga.attributes.description.en;
        const mangaId = manga.id;
        let filename;

        for (let i = 0; i < manga.relationships.length; i++) {
            if (manga.relationships[i].type === "cover_art") {
                filename = manga.relationships[i].attributes.fileName;
                break;
            }
        }

        if (!filename) {
            console.log(`No cover found for manga ${mangaId}`);
            return "";
        }

        return `
            <div class="manga-container">
                <div class="manga-card">
                    <img src="https://uploads.mangadex.org/covers/${mangaId}/${filename}"> 
                    <h3>${title}</h3>
                </div>
                <div class="wrapper">
                    <p>${description}</p>
                </div>
            </div>
           `
    }).join("");

    display.innerHTML = datadisplay;   
}

search.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    
    displayResults();
})

btn.addEventListener('click', displayResults());


