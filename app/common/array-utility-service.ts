import { Injectable } from '@angular/core';


@Injectable()
export class ArrayUtilityService{
  snippetElements:any
  snippetTemplate:any
  constructor() {

  }
//   addNewElement(item,itemList){
    
//   }
  addNewSnippet(itemList){
            //adding item to the array and passing item length
            itemList.snippets.push(this.snippetFactory(itemList.length));
            
  }
  addNewElementDiv(item){
      let param = "div";
      //adding item to the array and passing item length
      item.push(this.elementFactory(item.length,param));
  }
  addNewElementPre(item){
      let param = "pre";
      //adding item to the array and passing item length
      item.push(this.elementFactory(item.length,param));
  }
  
  
  sortObjArrayById(list){
      list.sort(this.sortById);
  }
  rewriteIds(list){
      let indexPointer = 0;
   for(let i = 0;i<list.length;i++){
       list[i].id = indexPointer;
       indexPointer++;
       }
  }
  removeItem(item,itemList){
        for(let i = 0;i<itemList.length;i++){
           //finding the right match
           if (itemList[i].id == item.id ){
               //removing index
               itemList.splice(i, 1);
               //resetting indexes and sorting
               this.rewriteIds(itemList);
           }
       }
  }
  moveItemUp(item,itemList){
      //if this is not the last item
      if(0 !== item.id){
          //changing is'd places
          console.log(itemList);
          itemList[item.id-1].id++;
          itemList[item.id].id--;
          console.log(itemList);
          //sortin array
          this.sortObjArrayById(itemList);
          console.log(itemList);
      }
  }
  moveItemDown(item,itemList){
      //if this is not the last item
      if(itemList.length !== item.id +1){
          //changing is'd places
          console.log(itemList);
          itemList[item.id+1].id--;
          itemList[item.id].id++;
          console.log(itemList);
          //sortin array
          this.sortObjArrayById(itemList);
          console.log(itemList);
      }
  }
  
  sortById(a,b) {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    }
    
    elementFactory(id,param){
        
        let text;
        param == "div"
        ? text = "<p>This fresh element</p>"
        : text = "code block"
        
        
        return  {
                        "id": id,
                        "type": param,
                        "style": null,
                        "text": text
                    };
        
    }
    
    //Generate new template for snippet
    snippetFactory(id){
       
    return {
                "id": id,
                "titleText": "New Snippet",
                "elements": [
                    {
                        "id": 0,
                        "type": "div",
                        "style": null,
                        "text": "<h3>This is the title element</h3>"
                    },
                    {
                        "id": 1,
                        "type": "p",
                        "style": null,
                        "text": "<p>This is paragraph entery</p>"
                    },
                    {
                        "id": 2,
                        "type": "pre",
                        "style": null,
                        "text": "This is pre block element"
                    }
                ],
                "comments": null
            };
        
    }

}