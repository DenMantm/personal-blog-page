export class SnippetInstanceObj{
    sequence:number;
    group:string;
    titleText:string;
    topNoteText:string;
    codeText:string;
    bottomNoteText:string;
    comments:any;
}
export class SnippetInstanceObjGroup {
    group:string;
    groupName:string;
    snippets:SnippetInstanceObj[];
}