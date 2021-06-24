const PORT = 8080;

const express = require('express');
const fs = require('fs-extra');
const cors = require('cors');

const app = express();

app.use(cors());

const jokes = {
    all: [],
    byType: []
}

async function loadJokes() {
    const data = await fs.readJson('jokes.json');
    for await (const element of Object.entries(data)) {
        if (element[1].text.length > 0) {
            jokes.all.push(element[1]);
    
            let typ = element[1].typ;
            if (typ && typ.length > 0) {
                typ = typ.toLowerCase();
                if (!jokes.byType.typ) {
                    jokes.byType.typ = [];
                }
    
                jokes.byType.typ.push(element[1]);
            }
        }
    }

    console.log(`${jokes.all.length} jokes loaded!`)
}

app.get('/', (req, res) => {
    res.json({
        message: 'API Routes',
        routes: [
            '/all',
            '/random'
        ]
    })
})

app.get('/all', (req, res) => {
    res.json(jokes.all);
})

app.get('/random', (req, res) => {
    const index = Math.floor(Math.random() * jokes.all.length);
    res.json(jokes.all[index]);
})

async function init() {
    await loadJokes();
    app.listen(PORT);
    console.log(`App started, port: ${PORT}`);
}
init();
