export default function handler(req, res) {
  const { user, pass } = JSON.parse(req.body);

  if (user === process.env.ADMIN_USERNAME && pass === process.env.ADMIN_PASSWORD) {
    res.status(200).end();
  } else {
    res.status(401).end();
  }
}
