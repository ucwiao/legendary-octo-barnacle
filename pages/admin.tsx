import { useState } from 'react';

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');

  const login = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ user, pass }),
    });
    if (res.ok) setAuth(true);
    else alert('Invalid login');
  };

  const upload = async () => {
    const form = new FormData();
    form.append('file', file!);
    form.append('title', title);

    await fetch('/api/upload', { method: 'POST', body: form });
    alert('Uploaded!');
  };

  return auth ? (
    <div>
      <h2>Upload New Nasheed</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input type="file" accept="audio/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={upload}>Upload</button>
    </div>
  ) : (
    <div>
      <h1>Admin Login</h1>
      <input placeholder="Username" onChange={e => setUser(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
