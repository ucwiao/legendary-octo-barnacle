import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('nasheeds');
  const data = await db.collection('nasheeds').find().toArray();

  res.json(data.map(d => ({
    title: d.title,
    url: d.url,
  })));
}
