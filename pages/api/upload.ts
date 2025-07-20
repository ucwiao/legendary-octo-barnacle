import clientPromise from '../../lib/mongodb';
import formidable from 'formidable';
import fs from 'fs';
import { promisify } from 'util';

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: any) => {
  const data = fs.readFileSync(file.filepath);
  const path = `./public/uploads/${file.originalFilename}`;
  fs.writeFileSync(path, data);
  fs.unlinkSync(file.filepath);
  return `/uploads/${file.originalFilename}`;
};

export default async function handler(req, res) {
  const form = formidable({ keepExtensions: true });

  const [fields, files] = await promisify(form.parse)(req);
  const title = fields.title;
  const file = files.file;

  const fileUrl = await saveFile(file);
  const client = await clientPromise;
  const db = client.db('nasheeds');

  await db.collection('nasheeds').insertOne({ title, url: fileUrl });
  res.status(200).end();
}
