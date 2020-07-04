declare interface Story {
    title: string,
    words: Number,
    author: string,
    storyIdentifier: number,
    storyUrl: string,

    chapters: Array<Chapter>
}