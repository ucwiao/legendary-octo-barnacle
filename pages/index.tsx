import { useState, useEffect } from 'react';

export default function Home() {
  const [password, setPassword] = useState('');
  const [access, setAccess] = useState(false);
  const [nasheeds, setNasheeds] = useState([]);

  useEffect(() => {
    if (access) {
      fetch('/api/nasheeds').then(res => res.json()).then(setNasheeds);
    }
  }, [access]);

  const handleAccess = () => {
    if (password === process.env.NEXT_PUBLIC_SITE_PASSWORD || password === 'library123') {
      setAccess(true);
    } else {
      alert('Wrong password');
    }
  };

  return access ? (
    <div>
      <h1>📚 Nasheed Library</h1>
      {nasheeds.map((n: any, i) => (
        <div key={i}>
          <p>{n.title}</p>
          <audio controls src={n.url}></audio>
          <a href={n.url} download>Download</a>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <h1>Enter Library Password</h1>
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleAccess}>Access</button>
    </div>
  );
}
