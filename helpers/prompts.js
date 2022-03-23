const wordlePrompt = {
    type: 'text',
    name: 'word',
    message: 'Enter a 5 letter word:',
    validate: value => value.length === 5 ? true : 'Please enter a 5 letter word.'
};

module.exports = wordlePrompt;