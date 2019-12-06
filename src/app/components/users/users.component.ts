import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { HttpClient } from '@angular/common/http';
import {Router,ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  @Input() public buttonText = '↩︎';
  @Input() public focus = new EventEmitter();
  @Output() public send = new EventEmitter();
  @Output() public dismiss = new EventEmitter();
  @ViewChild('message') message: ElementRef;
  @ViewChild('scrollMe') scrollMe: ElementRef;
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }

  scrollToBottom(): void {
    var container = document.getElementById("chat_window");
setTimeout(() => {
  container.scrollTop = container.scrollHeight;
}, 10);    
  }
  constructor(public service: WebSocketService, public http: HttpClient,public router:Router) { 
  }
  s
  list = [{
    'name': 'Samuel Jackson',
    'email': 'Samuel@gmail.com',
    'phno': '1254785965',
    'conversationid':" data.conversationId",
    'id':'2',
    'pic': 'https://ptetutorials.com/images/user-profile.png',
    'message': [{
      'from': "from",
      'text': "Hello",
      'type': 'USER',
      'date': Date.now()
    },{
      'from': "from",
      'text': "Hello",
      'type': 'Agent',
      'date': Date.now()
    },{
      'from': "from",
      'text': "I am facing an issue with registration",
      'type': 'USER',
      'date': Date.now()
    },{
      'from': "from",
      'text': "Let me know the issue in detail",
      'type': 'Agent',
      'date': Date.now()
    },{
      'from': "from",
      'text': "While i am registering it wouldn't accept the details",
      'type': 'USER',
      'date': Date.now()
    },{
      'from': "from",
      'text': "Ok will check and leet you know",
      'type': 'Agent',
      'date': Date.now()
    }],
    'status': 'dummy',
    'end': true,
    'agentchat':[],
    'agentid':'12345'
  },
  {
    'name': 'Amelia',
    'email': 'Amelia@gmail.com',
    'phno': '9844541546',
    'conversationid':" data.conversationId",
    'id':'1',
    'pic': 'https://image.shutterstock.com/image-vector/avatar-businesswoman-portrait-circle-vector-260nw-572528593.jpg',
    'message': [{
      'from': "from",
      'text': "Hello",
      'type': 'USER',
      'date': Date.now()
    },{
      'from': "from",
      'text': "Hello",
      'type': 'Agent',
      'date': Date.now()
    },{
      'from': "from",
      'text': "I want to create new postpaid plan",
      'type': 'USER',
      'date': Date.now()
    },{
      'from': "from",
      'text': "Ok could you provide details about your plan",
      'type': 'Agent',
      'date': Date.now()
    },{
      'from': "from",
      'text': "Yeah sure",
      'type': 'USER',
      'date': Date.now()
    },
    {
      'from': "from",
      'text': "2GB data/day  data plan",
      'type': 'USER',
      'date': Date.now()
    },{
      'from': "from",
      'text': "Ok will send you the details about this plan shortly.",
      'type': 'Agent',
      'date': Date.now()
    }
    ],
    'status': 'dummy',
    'end': true,
    'agentchat':[],
    'agentid':'12345'
  }];
  activeindex=0;
  searchitem;
  conversation = [];
  data;user
  isSelected=false;
  temp = false;
  name = ""
  email = ""
  phno = ""
  userpic = ""
  
  logout(){
    this.service.disconnect(sessionStorage.getItem('name'))
    sessionStorage.clear()
    this.router.navigateByUrl('/')
   
  }
  ngOnInit() {  
    this.service.connection(sessionStorage.getItem('name'));
    if(sessionStorage.getItem('name')==null)
    this.router.navigateByUrl('/')  
    this.user=sessionStorage.getItem('name').split('@')[0]
    sessionStorage.clear();
    console.log(this.service.socket.id);
    this.focus.subscribe(() => this.focusMessage());
    this.service.getMessages()
      .subscribe((data) => {
        this.isSelected=true;
        const index = this.list.findIndex(x => x.id === data.body.fbId);
        console.log(index,data)
        if (index == -1  && this.list[0].end ) {
          this.list.unshift({
            'name': data.firstName,
            'email': data.body.email,
            'phno': data.body.phno,
            'conversationid': data.conversationId,
            'id': data.body.fbId,
            'pic': data.profilePic,
            'message': [],
            'status': 'Requested',
            'end': false,
            'agentchat':[],
            'agentid':''
          });
        }
        else {          
          const index = this.list.findIndex(x => x.id === data.body.fbId);
          this.list[index].end = false
          if(this.list[index].status=='Ended')
          this.list[index].status='Requested'          
          this.list[index].agentid=data.agentid
          if(sessionStorage.getItem('id')==data.body.fbId){
            this.addMessage({ from: 'user', text: data.body.msg, type: 'USER', date: new Date().getTime() }); 
          }
          else
          this.list[index].message.push({ from: 'user', text: data.body.msg, type: 'USER', date: new Date().getTime() })
        }
        console.log(this.list);
      });
    this.service.botchat()
      .subscribe((data) => {
        const index = this.list.findIndex(x => x.id === data.conversation.fbId);
        console.log(data.conversation.conversation)
        data.conversation.conversation.forEach(element => {
          this.list[index].message.push(element)
        });
        this.scrollToBottom()
        console.log("callled", this.list[index].message)
      });
      this.service.ack()
      .subscribe((data) => {
        console.log("you were assigned by the user")
        const index = this.list.findIndex(x => x.id === data.fbId);  
        console.log(data.agentid,this.service.socket.id)      
        if(data.agentid!=this.service.socket.id && this.list[0].status!='Accepted'){
          if(!this.list[0].end)
          this.list.splice(index,1)
        console.log("################",this.list)
        }
      });
      this.service.autoend()     
      .subscribe((data) => {
        console.log("autoend",data)        
        const index = this.list.findIndex(x => x.id === data.fbId);  
        if(this.list[index].agentid=='')
        this.list.splice(index,1)
      });
  }
  chatactive(v,i) {
    console.log(this.list)
    console.log(v,i,this.service.socket.id)
    this.list[i].agentid=this.service.socket.id
    if(!this.list[i].end){       
      sessionStorage.setItem('id', v); 
    } 
  this.isSelected=true;
    this.activeindex=i;
    this.conversation = [];
    if (this.list[i].status == 'Requested') {
      this.service.sendack(v,this.user);      
    this.list[i].status = 'Accepted';
    }
    console.log("*****************", this.list[i].message)
    this.name = this.list[i].name
    this.email = this.list[i].email
    this.phno = this.list[i].phno
    this.userpic = this.list[i].pic
    this.conversation = this.list[i].message;//messages 
    console.log("*****************", this.conversation)    
    this.scrollToBottom();

}
  end() {
    this.service.endchat(sessionStorage.getItem('id'),this.user)
    const index = this.list.findIndex(x => x.id === sessionStorage.getItem('id'));
    this.list[index].end = true;
    this.list[index].status = "Ended"
    console.log(this.list[index])
    sessionStorage.clear();
    this.name = ""
    this.email = ""
    this.phno = ""
    // change ngrok with facebook backend Url
    console.log(this.conversation)
    this.data=[{
     "fbId": this.list[index].id,
     "conversationid":this.list[index].conversationid,
     "conversation":this.list[index].agentchat
    }]

    this.http.post('https://telco-bot.eu-gb.mybluemix.net/endchat',this.data).subscribe(res => {
      console.log(res);
    });
    this.conversation = [];
    console.log(this.list);
  }
  onSubmit() {
    const i = this.list.findIndex(x => x.id === sessionStorage.getItem('id')); 
    console.log(i) 
    if(!this.list[i].end) {
    const message =this.getMessage();
    console.log(message);
    if (message.trim() === '') {
      return;
    }
    const index = this.list.findIndex(x => x.id === sessionStorage.getItem('id'));
    this.addMessage({ from: 'agent', text: this.getMessage(), type: 'Agent', date: new Date().getTime() });
    this.service.sendMessage(this.getMessage(), sessionStorage.getItem('id'),this.list[index].conversationid);
    this.clearMessage();
    this.focusMessage();
  }
}
  public addMessage({ from, text, type, date }: { from; text; type: 'USER' | 'Agent'; date; }) {
    console.log(text)
    if(text!='')
    this.conversation.push({
      'from': from,
      'text': text,
      'type': type,
      'date': date,
    });
    console.log(this.conversation)
    this.list[this.activeindex].agentchat.push({
      'from': from,
      'text': text,
      'type': type,
      'date': date,
    })
    this.scrollToBottom();
  }


  public focusMessage() {
    this.message.nativeElement.focus();
  }

  public getMessage() {
    return this.message.nativeElement.value;
  }

  public clearMessage() {
    this.message.nativeElement.value = '';
  }
}
