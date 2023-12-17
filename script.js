const display = document.querySelector('#container');

const displayManga = async() => {
    const response = await fetch(`https://api.mangadex.org/manga?limit=10&includes%5B%5D=cover_art`)
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

displayManga();