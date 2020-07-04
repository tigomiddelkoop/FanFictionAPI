import fetch from "node-fetch";
import { parse } from "node-html-parser"

// All Regexes used in the program
const ChapterRegExp: RegExp = /(Chapters: \d+(\.\d)*)/i
const WordRegExp: RegExp = /(Words: \d+(\.\d)*)/i
const AuthorReExp: RegExp = /(By: \d+(\.\d)*)/i

// Used to extract numbers from a string.
const NumberRegExp:RegExp = /\d+(\.\d)*/;


/*

    title: string,
    words: Number,
    author: string,
    storyIdentifier: number,
    storyUrl: string,

    chapters: Array<Chapter>

*/
export async function getStory(id: string): Promise<Story> {

    const storyUrl = `https://www.fanfiction.net/s/${encodeURIComponent(id)}`;
    // Get first story
    const story = fetch(storyUrl, {
        method: "GET"
    }).then(response => response.text().then(data => {
        
        const chapterCount = getChapterAmount(data);

        let story: Story = {
            title: "",
            words: 0,
            author: "",
            storyIdentifier: parseInt(id),
            storyUrl,
            chapters: []

        }        
        const html = parse(data, {script: false});
        story.chapters.push(getStoryContent(html));


        return story;
    }))

    return await story;
}


// Retrieve the amount of stories from the Story
function getChapterAmount(data: any): Number {

    const chapters: any = data.match(ChapterRegExp); // Get the chapter string from the whole story
    const chapterCount: any = chapters[0].match(NumberRegExp); // Retrieve number from the string.
    return parseInt(chapterCount[0]); // Return the count of the stories

}

// Get the content of a story
/*

    chapter: Number,
    chapterName: string,
    content: string

*/
function getStoryContent(html: any): Chapter {


    let chapter: Chapter = {
        chapter: 0,
        chapterName: "",
        content: ""

    }

    chapter.content = html.querySelector("#storytext");

    return chapter;


}

function getWords() {

}

getStory("9366635").then(console.log); // TODO Delete this before publishing to NPM