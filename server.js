import express from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT) || 3000;
const distDir = path.join(__dirname, 'dist');

app.disable('x-powered-by');

app.get('/healthz', (_req, res) => {
  res.status(200).json({status: 'ok'});
});

app.use(
  express.static(distDir, {
    index: false,
    redirect: false,
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    },
  }),
);

app.get('*', (req, res, next) => {
  if (!req.accepts('html')) {
    return next();
  }

  return res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Augmented_Ops is listening on port ${port}`);
});
