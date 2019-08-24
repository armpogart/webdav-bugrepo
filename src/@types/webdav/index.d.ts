/// <reference types="node" />
declare module 'webdav' {
  import { Writable } from 'stream';

  export interface PutOptions {
    overwrite?: boolean;
  }

  export interface CreateClientOptions {
    username: string;
    password: string;
    digest?: boolean;
  }

  export interface OptionsForAdvancedResponses {
    details?: boolean;
  }

  export interface GetDirectoryContentsOptions extends OptionsForAdvancedResponses {
    deep?: boolean;
    glob?: string;
  }

  export interface Stat {
    filename: string;
    basename: string;
    lastmod: string;
    size: number;
    type: string;
    mime: string;
    etag?: string;
    props?: object;
  }

  /**
   * Create a client adapter
   * @param remoteUrl The remote address of the webdav server
   * @param opts Client options
   * @returns Client A new client interface instance
   */
  export function createClient(remoteUrl: string, opts: CreateClientOptions): Client;

  /**
   * Client adapter
   */
  export class Client {
    getDirectoryContents(remotePath: string, options?: GetDirectoryContentsOptions): Promise<Stat[]>;
    createWriteStream(remoteFilename: string, options?: PutOptions): Writable;
  }
}
