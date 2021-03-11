import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ListItem } from 'src/app/models/list-item.model';
import { List } from 'src/app/models/list.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  nameItem: string = '';

  constructor(private todoService: TodoService, private route: ActivatedRoute) {

    const listId = this.route.snapshot.paramMap.get('listId');
    this.list = this.todoService.getList(listId);
  }

  ngOnInit() {
  }

  addItem(){

    if(this.nameItem.length === 0){
      return;
    }

    const newItem = new ListItem(this.nameItem);
    this.list.items.push(newItem);

    this.nameItem = '';
    this.todoService.saveStorage();
  }

  check(item: ListItem){
    const pending = this.list.items.filter(data => !data.completed).length;

    if(pending === 0){
      this.list.terminatedAt = new Date();
      this.list.completed = true;
    }else{
      this.list.terminatedAt = null;
      this.list.completed = false;
    }

    this.todoService.saveStorage();
    
  }

  remove(i: number){
    this.list.items.splice(i,1);
    this.todoService.saveStorage();
  }

}
