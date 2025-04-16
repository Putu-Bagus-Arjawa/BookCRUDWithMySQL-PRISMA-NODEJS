import { useState } from 'react';

function UpdateAuthorForm({ authorId }) {
  const [formData, setFormData] = useState({ email: '', username: '' });
  const [serverMessage, setServerMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage(null);

    try {
      const response = await fetch(`http://localhost:3000/api/authors/${authorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        // Ambil pesan error langsung dari server
        throw new Error(result.message || 'Update gagal');
      }

      // Jika sukses
      setServerMessage({ type: 'success', text: result.message || 'Update berhasil!' });
      setFormData({ email: '', username: '' });

    } catch (error) {
      // Error dari server akan ditangkap disini
      setServerMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div>
      <h2>Update Author</h2>

      {serverMessage && (
        <div style={{ 
          color: serverMessage.type === 'error' ? 'red' : 'green',
          padding: '10px',
          margin: '10px 0'
        }}>
          {serverMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Email"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          placeholder="Username"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}