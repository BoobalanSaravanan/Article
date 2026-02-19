import { useState } from 'react';

export const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Valid email is required';
    if (form.message.trim().length < 10) next.message = 'Message must be at least 10 characters';
    setErrors(next);
    if (Object.keys(next).length === 0) alert('Message sent!');
  };

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="font-heading text-4xl">Contact ChessMind</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input className="w-full rounded border border-white/20 bg-transparent p-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        {errors.name && <p className="text-red-400">{errors.name}</p>}
        <input className="w-full rounded border border-white/20 bg-transparent p-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        {errors.email && <p className="text-red-400">{errors.email}</p>}
        <textarea className="h-32 w-full rounded border border-white/20 bg-transparent p-3" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        {errors.message && <p className="text-red-400">{errors.message}</p>}
        <button className="rounded bg-gold px-5 py-3 font-semibold text-black">Send</button>
      </form>
    </section>
  );
};
