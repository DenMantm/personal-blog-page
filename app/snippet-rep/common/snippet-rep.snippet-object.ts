export class SnippetInstanceObj{
    id:number;
    titleText:string;
    elements:any[];
    comments:any;
}
export class SnippetInstanceObjGroup {
    id:number;
    group:string;
    groupName:string;
    snippets:SnippetInstanceObj[];
}