export class SnippetInstanceObj{
    sequence:number;
    titleText:string;
    elements:any[];
    comments:any;
}
export class SnippetInstanceObjGroup {
    group:string;
    groupName:string;
    snippets:SnippetInstanceObj[];
}