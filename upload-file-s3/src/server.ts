require('dotenv').config({ path: './.env' });
import * as express from "express";
import * as multer from 'multer';
import * as Controller from './controllers';
import * as Sentry  from '@sentry/node';

const app: any = express();

const PORT: number = 3000;

Sentry.init({ dsn: 'https://f0a0d2ed4ed541fc9db30dddefbd72f3@sentry.io/1527931' });

app.use(Sentry.Handlers.requestHandler());

app.listen(PORT, () => {
  console.log(`Express server listening on  port ${PORT}`);
});

var storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, './uploads')
  },
  filename:  (req, file, cb) => {
    cb(null, Date.now()+'-'+file.originalname)
  }
})

var upload = multer({ storage: storage })

app.use(Sentry.Handlers.errorHandler());

var cpUpload = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'contentPath', maxCount: 1 }])
app.post('/upload', cpUpload, Controller.uploafFile);

app.get('/test',Controller.sentry);


