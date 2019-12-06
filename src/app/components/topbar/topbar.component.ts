import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.less']
})
export class TopbarComponent implements OnInit {
  name=""
  success=false
  user=''
  constructor(public route:ActivatedRoute,public router:Router) { }

  
  ngOnInit(){
  }
}
