import fetch from "node-fetch";
import {parse} from "node-html-parser"
import getTitle from "./functions/getTitle";
import getWords from "./functions/getWords";

// All Regexes used in the program
const ChapterRegExp: RegExp = /(Chapters: \d+(\.\d)*)/i
const WordRegExp: RegExp = /(Words: \d+(\.\d)*)/i
const AuthorReExp: RegExp = /(By: \d+(\.\d)*)/i

// Used to extract numbers from a string.
const NumberRegExp: RegExp = /\d+(\.\d)*/;


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

    // Get first chapter and the rest of the information about the story
    const story = await fetch(storyUrl, {
        method: "GET"
    }).then(response => response.text().then(
        async data => {

        const chapterCount: number = getChapterAmount(data);
        const html: any = parse(data, {script: false});
        const title: string = getTitle(html);
        const words: string | number = getWords(data);

        console.log(words);

        let story: Story = {
            title: title,
            words: words,
            author: "",
            storyIdentifier: parseInt(id),
            storyUrl,
            chapters: []

        }

        story.chapters.push(getStoryContent(html));


        console.log(chapterCount);

        for (let i = 2; i <= chapterCount; i++) {

            if (i == 4) break;
            await fetch(storyUrl + `/${i}`, {
                method: "GET"
            }).then(response => response.text().then(data => {

                const html: any = parse(data, {script: false});
                story.chapters.push(getStoryContent(html));

            }))

        }


        return story;
    }))

    return story;
}


// Retrieve the amount of stories from the Story
function getChapterAmount(data: any): number {

    const chapters: any = data.match(ChapterRegExp); // Get the chapter string from the whole story

    if (chapters == null) return 0; // If the chapters match above comes back as null, we'll assume it has none

    const chapterCount: any = chapters[0].match(NumberRegExp); // Retrieve number from the string.

    return parseInt(chapterCount[0]); // Return the count of the stories converted to an integer type

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

    chapter.content = html.querySelector("#storytext").innerHTML;

    return chapter;


}

// TODO Delete this before publishing to NPM
getStory("9366635").then(console.log); // Story with a lot of chapters
// getStory("9366635"); // Story with a lot of chapters
// getStory("13633971").then(console.log); // Story without chapters
