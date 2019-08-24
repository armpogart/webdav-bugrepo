import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DAV_CONFIG, WebDavConfig, WebdavService } from './services/webdav.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const webdavConfig: WebDavConfig = {
  url: 'https://cors-anywhere.herokuapp.com/https://your-url',
  rootPath: 'dav',
  username: 'username',
  password: 'password',
  digest: true,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: DAV_CONFIG, useValue: webdavConfig },
    { provide: WebdavService, useClass: WebdavService, deps: [DAV_CONFIG] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
