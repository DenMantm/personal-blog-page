import { Injectable } from '@angular/core';

declare var MediumEditor;
declare var CustomHtml;
declare var MediumEditorPhrase;
@Injectable()
export class MediumEditorService{
    options:any
  constructor() {
      this.options = {
    toolbar: {
        /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: ['bold', 
        'italic', 
        'underline', 
        'anchor', 
        'h2', 
        'h3', 
        'quote',
        'justifyCenter',
        'orderedlist',
        'unorderedlist',
        'customHtml',
        'code',
        'removeFormat'
        ]
        },
         extensions: {
            "customHtml": new CustomHtml({
                buttonText: "<hr>"
              , htmlToInsert: "<hr class='someclass'>"
            }),
            "code": new MediumEditorPhrase({
         phraseTagName:'pre',
         name: 'code',
         aria: 'code',
         contentDefault: 'CODE',
         phraseClassList: ['prettyprint']
      })
        }
    }
  }
  createInstance():any{
      return new MediumEditor('.editable',this.options);
  }
}