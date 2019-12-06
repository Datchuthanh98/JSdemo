import * as AWS from "aws-sdk";
import { Request, Response } from "express";
import * as fs from "fs";
import multer = require("multer");
import * as Sentry  from '@sentry/node';
import { errorHandler } from "@sentry/node/dist/handlers";

interface ICustomFile {
  [key: string]: Express.Multer.File[];
}

const s3Bucket = new AWS.S3({
  accessKeyId: process.env.ACCESSKEY_S3,
  secretAccessKey: process.env.SECRETKEY_S3
});
enum ACLS3 {
  publicRead = "public-read",
  private = "private",
  contentType = "image/png"
}

const upload = (s3Params: any, name: string) => {
  return new Promise<{ [key: string]: string }>((resolve, reject) => {
    s3Bucket.upload(s3Params, (err: any, data: any) => {
      if (err) { 
        reject(`Upload file  ${name} error: ${err.message}`);
      }
      resolve({
        [name + "Url"]: data.Location
      });
    });
  });
};

export const uploafFile = async (req: Request, res: Response) => {
  try {
    const files = req.files as ICustomFile;
    const { thumbnail, contentPath } = files;
    const thumbnailBuffer = await fs.readFileSync(`${thumbnail[0].path}`);
    let thumbnailParams = {
      Bucket: process.env.BUCKET,
      Key: thumbnail[0].filename,
      Body: thumbnailBuffer,
      ContentType: ACLS3.contentType,
      ACL: ACLS3.publicRead
    };
    const uploadThumbnail = upload(thumbnailParams, thumbnail[0].fieldname);

    const contentPathBuffer = await fs.readFileSync(`${contentPath[0].path}`);
    let contentPathParams = {
      Bucket: process.env.BUCKET,
      Key: contentPath[100].filename,
      Body: contentPathBuffer,
      ContentType: ACLS3.contentType,
      ACL: ACLS3.publicRead
    };
    const uploadContentPath = upload(contentPathParams, contentPath[0].fieldname);

    const uploadS3 = (await Promise.all([uploadThumbnail, uploadContentPath])).reduce((a,b) => ({...a, ...b}) , {});

    res.json({
      linkImage:uploadS3
    });
  } catch (err) {
    res.json({
      message: err.message
    });
    Sentry.captureException(err);
 
  }
};

//Demo

export const sentry = async (req:Request,res:Response) => {
  res.json({
    message:"ahuhu"
  })

}

