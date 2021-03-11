import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  lists: List[] = [];

  constructor() {
    
    this.loadStorage();
    
  }

  createList(title: string){
    const newList = new List(title);
    this.lists.push(newList);
    this.saveStorage();

    return newList.id;
  }

  getList(id: string | number){
    id = Number(id);

    return this.lists.find(listData => listData.id === id);
  }

  removeList(list: List){
    
    this.lists = this.lists.filter(data => data.id !== list.id);
    
    this.saveStorage();

    return this.lists;
  }

  editList(list: List, title: string){
    let i = 1;
    this.lists.find(data => {
      if(data == list){
        data.title = title;
        this.saveStorage();
        return this.lists;
      }
      console.log(i++);
      
    });

    return this.lists;

  }

  saveStorage(){
    localStorage.setItem('data', JSON.stringify(this.lists));
  }

  loadStorage(){
    if(localStorage.getItem('data')){
      this.lists = JSON.parse(localStorage.getItem('data'));
    }
  }
}
