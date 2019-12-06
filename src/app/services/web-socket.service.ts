import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socket:any;
  readonly uri: string = "https://liveagent.eu-gb.mybluemix.net";

  constructor() {
    this.socket = io(this.uri);
   
   }

  // listen(eventName: string){
  //   return new Observable((Subscriber) => {
  //     this.socket.on(eventName, (data) => {
  //       Subscriber.next(data);
  //     })
  //   })
  // }

  // emit(eventName: string, data:any){
  //   this.socket.emit(eventName,data);
  // }   

 public  sendMessage(req, userid,cid) {
    console.log(this.socket.id,"sent to "+userid+" with " +cid+" message "+ req)
    this.socket.emit('sendMsg', req, userid,cid)
  }
  public  endchat(userid,agent) {
    console.log('agnetended ',userid)
    this.socket.emit('end', userid,agent)
  }
  public  sendack(userid,agent) {
    console.log(this.socket.id,"sent to "+userid)
    this.socket.emit('status', userid,this.socket.id,agent)
  }
  public  connection(agentname) {
    this.socket.emit('connection', agentname)
  }
  public  disconnect(agentname) {
    console.log('disconnect',agentname)
    this.socket.emit('logout', agentname)
  }

  public ack = () => {
    return Observable.create((observer) => {
      this.socket.on('ack', (ack) => {        
        console.log('ack',ack)
        observer.next(ack)
      })
    })
  }
  public botchat = () => {
    return Observable.create((observer) => {
      this.socket.on('conversation', (reqs) => {        
        console.log('requests',reqs)
        observer.next(reqs)
      })
    })
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message', (data) => {
        console.log('message', data)
        observer.next(data )
      })
    })
  }
  public autoend = () => {
    return Observable.create((observer) => {
      this.socket.on('autoend', (data) => {
        console.log('autoend', data)
        observer.next(data )
      })
    })
  }

}
