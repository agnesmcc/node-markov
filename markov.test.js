markov = require('./markov');

test('makeChains', () => {
    const mm = new markov.MarkovMachine("the cat in the hat");
    expect(mm.chains).toEqual({
        "the": ["cat", "hat"],
        "cat": ["in"],
        "in": ["the"],
        "hat": [null]
    });
})

test('makeText', () => {
    const mm = new markov.MarkovMachine("the cat in the hat");
    const generatedText = mm.makeText();
    const expectedWords = ["the", "cat", "in", "the", "hat"];
    expect(expectedWords.some(word => generatedText.includes(word))).toBe(true);
})

test('splitting words', () => {
    const mm = new markov.MarkovMachine("the cat in the hat");
    expect(mm.words).toEqual(["the", "cat", "in", "the", "hat"]);
})
