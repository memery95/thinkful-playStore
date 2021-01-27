const e = require('express');
const express = require('express');

const playstore = require('./playstore');

const app = express();

function ucfirst(str) {
    let splt = str.split("");
    let n = "";
    n += splt[0].toUpperCase();
    for(let i = 1; i < splt.length; i++) {
        n += splt[i];
    }
    return n;
}

function validGenre(str) {
    return (
        str.toLowerCase() === 'action' ||
        str.toLowerCase() === 'puzzle' ||
        str.toLowerCase() === 'strategy' || 
        str.toLowerCase() === 'casual' ||
        str.toLowerCase() === 'arcade' ||
        str.toLowerCase() === 'card' 
    );
}

app.get('/apps', (request, response) => {
    let {sort, genres} = request.query;
    let results = [...playstore];

    if(sort) {
        if(sort === 'rating' || sort === 'app') {
            results.sort((first,next) => {
                let srt = ucfirst(sort);
                if(first[srt] > next[srt]) {
                    return -1;
                } else if (next[srt] > first[srt]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            return response.send('Sort must be "rating" or "app"');
        }
    }

    if(genres) {
        if(!validGenre(genres)) {
            return response.send('Genres must be one of ["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].');
        }
        results = results.filter((itm) => {
            return itm.Genres.toLowerCase().includes(genres.toLowerCase());
        });
    }

    return response.json(results);
});

app.listen(8080, () => {
    console.log("Running on 8080");
})