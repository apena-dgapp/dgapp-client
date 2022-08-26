import reactStringReplace from "react-string-replace";
let replacedText;

export const replaceTxt = (text) =>{
    // Match URLs
    replacedText = reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
    <a style={{color:"#A5BECC"}} key={match + i} href={match} target="_blank" rel="noreferrer">
    {match}
    </a>
    ));

    // Match @-mentions
    replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
    <a style={{color:"#A5BECC"}} key={match + i} href={`https://twitter.com/${match}`} target="_blank" rel="noreferrer">
    @{match}
    </a>
    ));

    // Match hashtags
    replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
    <a style={{color:"#A5BECC"}} key={match + i} href={`https://twitter.com/hashtag/${match}`} target="_blank" rel="noreferrer">
    #{match}
    </a>

    ));
 return  replacedText
}
