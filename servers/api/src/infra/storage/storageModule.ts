import { Global, Module } from '@nestjs/common';
import { Readable } from 'node:stream';
import R2StorageProvider from './providers/r2Provider.js';

export interface StorageFile {
  stream: Readable;
  metadata: FileMetadata;
}

export interface StorageProvider {
  delete(key: string): Promise<void>;
  download(key: string, expiresIn: Date): Promise<FileWithUrl>;
  upload(metadata: FileMetadata, expiresIn: Date): Promise<FileWithUrl>;
}

export interface FileWithUrl {
  key: string;
  presignedUrl: string;
  expiresIn: Date;
}

export interface FileMetadata {
  mimeType: string;
  size: number;
  key: string;
}

export interface StorageFileInput {
  key: string;
  stream: NodeJS.ReadableStream;
  mimeType: string;
  size: number;
}

@Global()
@Module({
  providers: [
    {
      provide: 'StorageProvider',
      useClass: R2StorageProvider,
    },
  ],

  exports: ['StorageProvider'],
})
export default class StorageModule {}
