import axios from "axios";

export default class PassageFinder {
    constructor(book, chapter, verse) {
        this.book = book;
        this.chapter = chapter;
        this.verse = verse;
    }

    async getBooks() {
        var data = await axios.get(`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books`, {
            headers: {
                'api-key': '4a15a65d498a67ef42058d8428b6f985'
            }
        });

        var array = [];
        data.data.data.map((e, i) => {
            array[i] = {
                id: e.id,
                name: e.name
            }
        });

        return array;
    }

    async getChapters() {
        var data = await axios.get(`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books/${this.book}/chapters`, {
            headers: {
                'api-key': '4a15a65d498a67ef42058d8428b6f985'
            }
        });

        var array = [];
        data.data.data.map((e, i) => {
            if (i > 0) {
                array[i] = {
                    id: e.number,
                    name: e.number
                }
            }
        });

        return array;
    }

    async getVerses() {
        var array3 = [];

        array3[0] = {
            id: 'All',
            name: 'All'
        };

        var data = await axios.get(`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/chapters/${this.book}.${this.chapter}`, {
            headers: {
                'api-key': '4a15a65d498a67ef42058d8428b6f985'
            }
        });

        var verseCount = data.data.data.verseCount;

        for (let i = 1; i < verseCount + 1; i++) {
            array3[i] = {
                id: i,
                name: i
            }
        }

        return array3;
    }

    async getChapter() {
        var data = await axios.get(`https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/chapters/${this.book}.${this.chapter}`, {
            headers: {
                'api-key': '4a15a65d498a67ef42058d8428b6f985'
            }
        });

        var content = data.data.data.content;
        content = content.replace(/(<([^>]+)>)/ig, '');

        var text = this.changeVerseNumbers(content);

        return {
            heading: data.data.data.reference,
            content: text
        };
    }

    async getVerse() {
        var data = await axios.get(`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${this.book}.${this.chapter}.${this.verse}`, {
            headers: {
                'api-key': '4a15a65d498a67ef42058d8428b6f985'
            }
        });

        var content = data.data.data.content;
        content = content.replace(/(<([^>]+)>)/ig, '');

        var text = this.changeVerseNumbers(content);

        return {
            heading: data.data.data.reference,
            content: text
        };
    }

    async getKeywordSearch(keyWord) {
        var data = await axios.get(`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/search?query=${keyWord}`, {
            headers: {
                'api-key': '4a15a65d498a67ef42058d8428b6f985'
            }
        });

        return data.data.data.verses;
    }

    changeVerseNumbers(text) {
        let sup = [
            "⁰",
            "¹",
            "²",
            "³",
            "⁴",
            "⁵",
            "⁶",
            "⁷",
            "⁸",
            "⁹"
        ];

        var tempPassage = text;

        for (let i = 0; i < tempPassage.length - 1; i++) {
            if (!isNaN(tempPassage[i]) && tempPassage[i] !== ' ') {
                var left = tempPassage.substring(0, i);
                var right = tempPassage.substring(i + 1, tempPassage.length);

                tempPassage = left + sup[parseInt(tempPassage[i])] + right;
            }
        }

        return tempPassage;
    }
}