import { Component, OnInit } from '@angular/core';
import { createReadStream } from 'fs';
import { WebdavService } from './services/webdav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DavTest';

  constructor(private dav: WebdavService) {
  }

  ngOnInit(): void {
    createReadStream('src/assets/image.jpg').pipe(
      this.dav.client.createWriteStream(`/dav/product_images/import/image.jpg`, {
        overwrite: true,
      }),
    );

    this.dav.client.getDirectoryContents('dav/').then((items) => {
      console.log(items);
    });
  }
}
