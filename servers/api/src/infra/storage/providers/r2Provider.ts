import { Logger, OnModuleInit } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListBucketsCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  FileMetadata,
  FileWithUrl,
  StorageProvider,
} from '../storageModule.js';

export default class R2StorageProvider
  implements StorageProvider, OnModuleInit
{
  private readonly r2Secretkey = process.env.R2_SECRET_ACCESS_KEY!;
  private readonly r2AcessKeyId = process.env.R2_ACCESS_KEY_ID!;
  private readonly r2AccountId = process.env.R2_ACCOUNT_ID!;
  private readonly r2Bucket = process.env.R2_BUCKET!;

  private readonly logger = new Logger(R2StorageProvider.name);

  private r2Client!: S3Client;

  constructor() {
    if (
      !this.r2AcessKeyId ||
      !this.r2Secretkey ||
      !this.r2Bucket ||
      !this.r2AccountId
    ) {
      this.logger.fatal('R2 credentials missing');
      throw new Error('R2 credentials missing');
    }

    this.r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${this.r2AccountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.r2AcessKeyId,
        secretAccessKey: this.r2Secretkey,
      },
    });
  }

  async download(key: string, expiresIn: Date): Promise<FileWithUrl> {
    const command = new GetObjectCommand({
      Bucket: this.r2Bucket,
      Key: key,
    });

    const url = await getSignedUrl(this.r2Client, command, {
      expiresIn: expiresIn.getMinutes(),
    });

    return {
      key,
      presignedUrl: url,
      expiresIn,
    };
  }

  async onModuleInit() {
    await this.healthCheck();
  }

  private async healthCheck(): Promise<void> {
    const response = await this.r2Client.send(new ListBucketsCommand({}));

    const bucketNames = response.Buckets?.map((bucket) => bucket.Name) ?? [];

    if (!bucketNames.includes(this.r2Bucket)) {
      this.logger.fatal(
        `Health check failed. Bucket not found: ${this.r2Bucket}`,
      );

      throw new Error('Bucket not found');
    }

    this.logger.debug('R2 health check passed');
  }

  async delete(key: string): Promise<void> {
    await this.r2Client.send(
      new DeleteObjectCommand({
        Bucket: this.r2Bucket,
        Key: key,
      }),
    );
  }

  async upload(file: FileMetadata, expiresIn: Date): Promise<FileWithUrl> {
    const command = new PutObjectCommand({
      Bucket: this.r2Bucket,
      Key: file.key,
      ContentType: file.mimeType,
      ContentLength: file.size,
    });

    const url = await getSignedUrl(this.r2Client, command, {
      expiresIn: expiresIn.getMinutes(),
    });

    return {
      key: file.key,
      presignedUrl: url,
      expiresIn,
    };
  }
}
