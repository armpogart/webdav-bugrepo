import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Client, createClient } from 'webdav';

export interface WebDavConfig {
  url: string;
  rootPath?: string;
  username: string;
  password: string;
  digest?: boolean;
}

export const DAV_CONFIG = new InjectionToken<WebDavConfig>('WebDav Client Configuration');

@Injectable()
export class WebdavService {
  public client: Client;
  constructor(@Inject(DAV_CONFIG) private config: WebDavConfig) {
    this.client = createClient(config.url, {
      username: config.username,
      password: config.password,
      digest: config.digest,
    });
  }
}
