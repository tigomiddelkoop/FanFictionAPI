const ChapterRegExp: RegExp = /(Chapter \d+(\.\d)*)/i
// const ChapterRegExp: RegExp = /(Chapter \d+(\.\d)*)/i
// TODO: Find a good way to scrape the title.

export default function getTitle(html: any): any {

    let title = html.querySelector("title").rawText;

    const titleMatch = title.match(ChapterRegExp);

    console.log("Title", titleMatch);
    return title.slice(0, 23);
}
