import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild(IonList) ionList: IonList;
  @Input() completed = true;

  lists: List[] = [];

  constructor(public todoService: TodoService, private router: Router, private alert: AlertController) { 
    this.lists = todoService.lists;
  }

  ngOnInit() {}

  listView(list: List){

    if(this.completed){
      this.router.navigateByUrl(`tabs/tab2/add/${list.id}`);
    }else{
      this.router.navigateByUrl(`tabs/tab1/add/${list.id}`);
    }    
  }

  removeList(list: List){
    this.lists = this.todoService.removeList(list);
  }

  async editList(list: List){
    const alert = await this.alert.create({
      header: list.title,
      inputs:[
        {
          name: 'title',
          type: 'text',
          placeholder: 'New list name',
          value: list.title
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (data) => {
            this.ionList.closeSlidingItems();
          }
          
        },
        {
          text: 'Edit',
          handler: (data) => {
            if(data.title.length === 0){
              return;
            }

            this.lists = this.todoService.editList(list, data.title);
            this.ionList.closeSlidingItems();
          }
        }
      ]
    })

    await alert.present();
  }

}
