import fetch from "node-fetch";
import { parse } from "node-html-parser"

export function getStory(id: string) {
    fetch(`https://www.fanfiction.net/s/${encodeURIComponent(id)}`, {
        method: "GET"
    }).then(response => response.text().then(data => {
        const html = parse(data);
        console.log(html.querySelector("#storytext").innerHTML)
    }))
}

getStory("13610632");