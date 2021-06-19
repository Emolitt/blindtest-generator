const fs = require(`fs`);


/**
     * @param {{title: string}} a
     * @param {{title: string}} b
     */
function sort(a, b) {
    const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();


        if(titleA < titleB) { return -1; }
        if(titleA > titleB) { return 1; }
        return 0;
}

function cleanResults(path) {
    const assets = require(path);

    assets.forEach(element => {
        element.url.forEach(url => {
            delete url.nbViews
        })
    });

    assets.sort(sort);
    fs.writeFileSync(path, JSON.stringify(assets));

}


const theme = 'musics';
cleanResults(`./${theme}/${theme}_easy.json`);
cleanResults(`./${theme}/${theme}_medium.json`);
cleanResults(`./${theme}/${theme}_hard.json`);
