import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(){}

  ngOnInit(){
    // this.webSocketService.listen('broadcast').subscribe((data)=>{
    //   console.log("helllllo",data);
    // })
  }
}
