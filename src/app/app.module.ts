import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { UsersComponent } from './components/users/users.component';
import { WebSocketService } from './services/web-socket.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { FormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RouterModule,Routes,ActivatedRoute } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    UsersComponent,
    FilterPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path :'' ,component:LoginComponent},
      {path :'chatui' ,component:UsersComponent},
      {path :'top' ,component:TopbarComponent},
    ])
  ],
  providers: [WebSocketService,LoginComponent,TopbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
