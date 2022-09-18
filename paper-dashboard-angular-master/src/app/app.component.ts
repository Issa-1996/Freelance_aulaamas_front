import { Component, OnInit, Output } from '@angular/core';
import { SearchService } from './Services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public friend:any=55;
  message:string;
  constructor(private data: SearchService){}
  ngOnInit(){
    this.data.currentSearch.subscribe(message=>this.message=message)
  }
}
