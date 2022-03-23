const fetchUrl = require('fetch').fetchUrl;
const cl = (x) => { console.log(x) };

const getData = (url) => {
    let p = new Promise((resolve, reject) => {
        cl("inside promise")
        fetchUrl(url, (err, meta, body) => {
            if (err) {
                reject(err);
            }
            cl("before resolve");
            resolve(body.toString());
        });
    });
    return p;
}

const sendCall = async (letter) => {
    let wordsList = [];
    let wordle;
    try {
        let words = await getData(`https://api.datamuse.com/words?sp=${letter}????`);
        // cl(words);
        let json = JSON.parse(words);
        for (let i = 0; i < json.length; i++) {
            // push the word into an array
            wordsList.push(json[i].word);
        }
        wordle = wordsList[Math.floor(Math.random() * wordsList.length)];
    } catch (error) {
        console.log(error);
    }
    return wordle;
}

/*
sendCall("l").then((word) => {
    cl(`${word} in then`);
}).catch((err) => {
    cl(err, "in catch");
});
*/


module.exports = sendCall