const getRando = async () => {
    let letterArr = [];
    for (let i = 0; i < 26; i++) {
        let letter = String.fromCharCode(65 + i);
        letterArr.push(letter);
    }
    return letterArr[Math.floor(Math.random() * letterArr.length)];
} 

module.exports = getRando;