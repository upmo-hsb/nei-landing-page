import { useState, useRef } from 'react';
import { useLang } from '../LangContext';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxfymzrr4gtM11C3Wb1xwxkkPBx_JB2TvjgPQLz1fzjbjGQBrJrSfsMeKjw1ydRfMhFGg/exec';

export default function Register() {
  const { tx } = useLang();
  const r = tx.register;
  const [members, setMembers] = useState(['', '']);
  const [form, setForm] = useState({ teamName: '', school: '', email: '', phone: '', idea: '', category: '' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const fileRef = useRef();

  const addMember = () => setMembers(m => [...m, '']);
  const removeMember = (i) => { if (members.length > 1) setMembers(m => m.filter((_, idx) => idx !== i)); };
  const updateMember = (i, v) => setMembers(m => m.map((x, idx) => idx === i ? v : x));
  const updateField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 25 * 1024 * 1024) {
      alert('File quá 25MB. Vui lòng chọn file nhỏ hơn.');
      e.target.value = '';
      return;
    }
    setFile(f);
  };

  const toBase64 = (f) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(f);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const payload = {
        ...form,
        members: members.filter(m => m.trim()).join(', '),
        fileName: file ? file.name : '',
        fileType: file ? file.type : '',
        file: file ? await toBase64(file) : '',
      };

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
        mode: 'no-cors', // Apps Script không hỗ trợ CORS đầy đủ
      });
      // no-cors không đọc được response → coi là thành công nếu không throw
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="register-page">
        <div className="register-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ marginBottom: '1rem' }}>{r.successMsg}</h1>
          <p style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-body)' }}>
            {tx.lang === 'VI'
              ? 'Chúng tôi sẽ liên hệ với bạn qua email sớm nhất.'
              : 'We will contact you via email as soon as possible.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>{r.title}</h1>
        <p className="reg-sub">{r.sub}</p>

        <form onSubmit={handleSubmit}>
          <div className="reg-group">
            <label>{r.teamName}</label>
            <input required type="text" placeholder={r.teamNamePh}
              value={form.teamName} onChange={e => updateField('teamName', e.target.value)} />
          </div>
          <div className="reg-group">
            <label>{r.school}</label>
            <input required type="text" placeholder={r.schoolPh}
              value={form.school} onChange={e => updateField('school', e.target.value)} />
          </div>
          <div className="reg-group">
            <label>{r.email}</label>
            <input required type="email" placeholder="email@example.com"
              value={form.email} onChange={e => updateField('email', e.target.value)} />
          </div>
          <div className="reg-group">
            <label>{r.phone}</label>
            <input required type="tel" placeholder={r.phonePh}
              value={form.phone} onChange={e => updateField('phone', e.target.value)} />
          </div>

          <div className="team-members-box">
            <div className="team-members-label">{r.membersLabel}</div>
            {members.map((val, i) => (
              <div className="member-row" key={i}>
                <input type="text" placeholder={r.memberPh(i + 1)} value={val}
                  onChange={e => updateMember(i, e.target.value)} />
                <button type="button" className="btn-remove" onClick={() => removeMember(i)}>{r.remove}</button>
              </div>
            ))}
            <button type="button" className="btn-add-member" onClick={addMember}>{r.addMember}</button>
          </div>

          <div className="reg-group">
            <label>{r.idea}</label>
            <textarea required placeholder={r.ideaPh} value={form.idea}
              onChange={e => updateField('idea', e.target.value)} />
          </div>

          <div className="reg-group">
            <label style={{ fontSize: '.82rem', color: 'var(--text-dim)', display: 'block', marginBottom: '.4rem' }}>
              {r.fileLabel}
            </label>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={onFileChange}
              style={{ fontSize: '.85rem', color: 'var(--text)' }} />
            <div className="file-note">{r.fileNote}</div>
          </div>

          <div className="reg-group">
            <label>{r.category}</label>
            <select required value={form.category} onChange={e => updateField('category', e.target.value)}>
              <option value="">{r.categoryPh}</option>
              {r.categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {status === 'error' && (
            <p style={{ color: '#ff6b6b', marginBottom: '1rem', fontFamily: 'var(--font-body)' }}>
              {tx.lang === 'VI' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'Something went wrong. Please try again.'}
            </p>
          )}

          <button type="submit" className="btn-submit-reg" disabled={status === 'loading'}>
            {status === 'loading' ? '...' : r.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
