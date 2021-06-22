const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');

const grab = (callback) => {
    let data = [];
    let tab = 0;
    
    const timer = setInterval(async () => {
        console.log('current tab:', tab);
        const html = await axios.get(`http://topviccek.hu?page=${tab}`);
        const $ = await cheerio.load(html.data);
        const content = $('.tabContent');

        if (!content || content.length <= 0) {
            callback(data);
            clearInterval(timer);
            return
        } else {
            $('.tabContent').each((i, elem) => {
                const typ = $(elem).find('.cat').find('a').text();
                const title = $(elem).find('.title').text().trim();
                const text = $(elem).find('.joke').text().trim();
    
                data.push({
                    typ,
                    title,
                    text
                });
            })
            tab++;
        }
    }, 1000)
}
grab((data) => {
    fs.writeJSON('jokes.json', data, { spaces: '\t' });
    console.log('saved to: jokes.json');
})