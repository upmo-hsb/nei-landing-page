import { useState } from 'react';
import styles from './Register.module.css';

const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

const CATEGORIES = ['Technology', 'Social Impact', 'Education', 'Health', 'Environment', 'Other'];

function Register() {
  const [form, setForm] = useState({
    teamName: '', school: '', email: '', phone: '',
    members: [{ name: '' }],
    idea: '', category: '',
  });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function updateMember(index, value) {
    setForm(prev => {
      const members = [...prev.members];
      members[index] = { name: value };
      return { ...prev, members };
    });
  }

  function addMember() {
    setForm(prev => ({ ...prev, members: [...prev.members, { name: '' }] }));
  }

  function removeMember(index) {
    setForm(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const payload = {
        ...form,
        members: form.members.map(m => m.name).join(', '),
      };
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setStatus(data.status === 'success' ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <main className={styles.page}>
        <div className={styles.success}>
          <h1>Registration Submitted!</h1>
          <p>Thank you for registering. We will contact you soon.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Register Your Team</h1>
        <p className={styles.subtitle}>Fill out the form below to enter NEI 2026</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.field}>
            <span>Team Name *</span>
            <input type="text" required value={form.teamName}
              onChange={e => updateField('teamName', e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>School Name *</span>
            <input type="text" required value={form.school}
              onChange={e => updateField('school', e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Contact Email *</span>
            <input type="email" required value={form.email}
              onChange={e => updateField('email', e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Phone Number *</span>
            <input type="tel" required value={form.phone}
              onChange={e => updateField('phone', e.target.value)} />
          </label>
          <fieldset className={styles.members}>
            <legend>Team Members</legend>
            {form.members.map((member, i) => (
              <div key={i} className={styles.memberRow}>
                <input type="text" placeholder={`Member ${i + 1}`}
                  value={member.name}
                  onChange={e => updateMember(i, e.target.value)} />
                {form.members.length > 1 && (
                  <button type="button" onClick={() => removeMember(i)}
                    className={styles.removeBtn}>Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addMember}
              className={styles.addBtn}>+ Add Member</button>
          </fieldset>
          <label className={styles.field}>
            <span>Project Idea / Description *</span>
            <textarea required rows={4} value={form.idea}
              onChange={e => updateField('idea', e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Category *</span>
            <select required value={form.category}
              onChange={e => updateField('category', e.target.value)}>
              <option value="">Select a category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          {status === 'error' && (
            <p className={styles.error}>Something went wrong. Please try again.</p>
          )}
          <button type="submit" className={styles.submit}
            disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;
