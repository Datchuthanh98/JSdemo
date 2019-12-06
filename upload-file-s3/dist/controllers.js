"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const fs = require("fs");
const Sentry = require("@sentry/node");
const s3Bucket = new AWS.S3({
    accessKeyId: process.env.ACCESSKEY_S3,
    secretAccessKey: process.env.SECRETKEY_S3
});
var ACLS3;
(function (ACLS3) {
    ACLS3["publicRead"] = "public-read";
    ACLS3["private"] = "private";
    ACLS3["contentType"] = "image/png";
})(ACLS3 || (ACLS3 = {}));
const upload = (s3Params, name) => {
    return new Promise((resolve, reject) => {
        s3Bucket.upload(s3Params, (err, data) => {
            if (err) {
                reject(`Upload file  ${name} error: ${err.message}`);
            }
            resolve({
                [name + "Url"]: data.Location
            });
        });
    });
};
exports.uploafFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const files = req.files;
        const { thumbnail, contentPath } = files;
        const thumbnailBuffer = yield fs.readFileSync(`${thumbnail[0].path}`);
        let thumbnailParams = {
            Bucket: process.env.BUCKET,
            Key: thumbnail[0].filename,
            Body: thumbnailBuffer,
            ContentType: ACLS3.contentType,
            ACL: ACLS3.publicRead
        };
        const uploadThumbnail = upload(thumbnailParams, thumbnail[0].fieldname);
        const contentPathBuffer = yield fs.readFileSync(`${contentPath[0].path}`);
        let contentPathParams = {
            Bucket: process.env.BUCKET,
            Key: contentPath[100].filename,
            Body: contentPathBuffer,
            ContentType: ACLS3.contentType,
            ACL: ACLS3.publicRead
        };
        const uploadContentPath = upload(contentPathParams, contentPath[0].fieldname);
        const uploadS3 = (yield Promise.all([uploadThumbnail, uploadContentPath])).reduce((a, b) => (Object.assign({}, a, b)), {});
        res.json({
            linkImage: uploadS3
        });
    }
    catch (err) {
        res.json({
            message: err.message
        });
        Sentry.captureException(err);
    }
});
exports.sentry = (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json({
        message: "ahuhu"
    });
});
//# sourceMappingURL=controllers.js.map