import fetch from "node-fetch";
import { parse } from "node-html-parser"

// All Regexes used in the program
const ChapterRegExp: RegExp = /(Chapters: \d+(\.\d)*)/i
const WordRegExp: RegExp = /(Words: \d+(\.\d)*)/i
const AuthorReExp: RegExp = /(By: \d+(\.\d)*)/i

// Used to extract numbers from a string.
const NumberRegExp:RegExp = /\d+(\.\d)*/;



export function getStory(id: string) {

    // Get first story
    fetch(`https://www.fanfiction.net/s/${encodeURIComponent(id)}/1`, {
        method: "GET"
    }).then(response => response.text().then(data => {
        
        const story
        const chapterCount = getChapterAmount(data);
        
        const html = parse(data, {script: false});



        console.log(html.innerHTML)
        const words: any = data.match(WordRegExp);

        const storyContent = html.querySelector("#storytext");

    }))
}

// Retrieve the amount of stories from the Story
function getChapterAmount(data: any): Number {


    const chapters: any = data.match(ChapterRegExp); // Get the chapter string from the whole story
    const chapterCount: any = chapters[0].match(NumberRegExp); // Retrieve number from the string.
    return parseInt(chapterCount[0]); // Return the count of the stories

}

function getStoryContent() {

}

getStory("9366635"); // TODO Delete this before publishing to NPM