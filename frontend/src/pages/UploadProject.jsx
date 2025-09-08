import React, { useState } from 'react';
import { createProject } from '../api/projectApi';

const initialForm = { title: '', description: '', category: '', thumbnailUrl: '' };

const UploadProject = () => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      await createProject(form);
      setMessage('Project uploaded successfully');
      setForm(initialForm);
    } catch (e) {
      setMessage(e?.response?.data?.message || 'Failed to upload project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" rows="4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Category</label>
            <input name="category" value={form.category} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Thumbnail URL</label>
            <input name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
        </div>
        <button type="submit" className="inline-flex items-center px-4 py-2 rounded bg-black text-white disabled:opacity-60" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Submit'}
        </button>
      </form>
      {message && <div className="mt-4 text-sm">{message}</div>}
    </div>
  );
};

export default UploadProject;




