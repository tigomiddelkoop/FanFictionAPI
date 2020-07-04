declare interface Story {
    title: string,
    words: number,
    author: string,
    storyIdentifier: number,
    storyUrl: string,

    chapters: Array<Chapter>
}
