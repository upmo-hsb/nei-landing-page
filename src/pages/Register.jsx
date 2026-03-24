import { useState, useRef } from 'react';
import { useLang } from '../LangContext';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyeT-u3cLU41UrzDDP9OYVgXqq8YIFwiKcp_pK-ZF2-naA4sPu1iW2dfcVWG7bK-ywDoA/exec';

function normalizePhone(v) {
  return v.replace(/\D/g, '').replace(/^0+/, '');
}

async function checkDuplicate(field, value) {
  if (!value.trim()) return false;
  try {
    const normalized = field === 'phone' ? normalizePhone(value) : value.trim();
    const url = `${APPS_SCRIPT_URL}?check=1&field=${field}&value=${encodeURIComponent(normalized)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.duplicate === true;
  } catch {
    return false;
  }
}

export default function Register() {
  const { tx, lang } = useLang();
  const r = tx.register;
  const [members, setMembers] = useState(['', '']);
  const [form, setForm] = useState({ teamName: '', school: '', email: '', phone: '', idea: '', category: '' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [dupErrors, setDupErrors] = useState({});
  const fileRef = useRef();

  const addMember = () => setMembers(m => [...m, '']);
  const removeMember = (i) => { if (members.length > 1) setMembers(m => m.filter((_, idx) => idx !== i)); };
  const updateMember = (i, v) => setMembers(m => m.map((x, idx) => idx === i ? v : x));
  const updateField = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (dupErrors[k]) setDupErrors(d => ({ ...d, [k]: false }));
  };

  const handleBlur = async (field) => {
    const value = form[field];
    if (!value.trim()) return;
    const isDup = await checkDuplicate(field, value);
    setDupErrors(d => ({ ...d, [field]: isDup }));
  };

  const dupMsg = (field) => {
    if (!dupErrors[field]) return null;
    const msgs = {
      vi: { teamName: 'Tên đội này đã được đăng ký.', email: 'Email này đã được sử dụng để đăng ký.', phone: 'Số điện thoại này đã được sử dụng để đăng ký.' },
      en: { teamName: 'This team name is already registered.', email: 'This email is already registered.', phone: 'This phone number is already registered.' },
    };
    return (msgs[lang] || msgs.vi)[field];
  };

  const hasDup = Object.values(dupErrors).some(Boolean);

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
    if (hasDup) return;
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
        mode: 'no-cors',
      });
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
            {lang === 'vi' ? 'Chúng tôi sẽ liên hệ với bạn qua email sớm nhất.' : 'We will contact you via email as soon as possible.'}
          </p>
        </div>
      </div>
    );
  }

  const errStyle = { color: '#ff6b6b', fontSize: '.78rem', marginTop: '.3rem', fontFamily: 'var(--font-body)' };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>{r.title}</h1>
        <p className="reg-sub">{r.sub}</p>

        <form onSubmit={handleSubmit}>
          <div className="reg-group">
            <label>{r.teamName}</label>
            <input required type="text" placeholder={r.teamNamePh}
              value={form.teamName}
              onChange={e => updateField('teamName', e.target.value)}
              onBlur={() => handleBlur('teamName')}
              style={dupErrors.teamName ? { borderColor: '#ff6b6b' } : {}} />
            {dupMsg('teamName') && <p style={errStyle}>⚠️ {dupMsg('teamName')}</p>}
          </div>

          <div className="reg-group">
            <label>{r.school}</label>
            <input required type="text" placeholder={r.schoolPh}
              value={form.school} onChange={e => updateField('school', e.target.value)} />
          </div>

          <div className="reg-group">
            <label>{r.email}</label>
            <input required type="email" placeholder="email@example.com"
              value={form.email}
              onChange={e => updateField('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              style={dupErrors.email ? { borderColor: '#ff6b6b' } : {}} />
            {dupMsg('email') && <p style={errStyle}>⚠️ {dupMsg('email')}</p>}
          </div>

          <div className="reg-group">
            <label>{r.phone}</label>
            <input required type="tel" placeholder={r.phonePh}
              value={form.phone}
              onChange={e => updateField('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              style={dupErrors.phone ? { borderColor: '#ff6b6b' } : {}} />
            {dupMsg('phone') && <p style={errStyle}>⚠️ {dupMsg('phone')}</p>}
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
            <textarea required placeholder={r.ideaPh} value={form.idea} maxLength={200}
              onChange={e => updateField('idea', e.target.value)} />
            <div style={{ fontSize: '.75rem', color: form.idea.length >= 200 ? '#ff6b6b' : 'var(--text-dim)', textAlign: 'right', marginTop: '.3rem' }}>
              {form.idea.length}/200
            </div>
          </div>

          <div className="reg-group">
            <label style={{ fontSize: '.82rem', color: 'var(--text-dim)', display: 'block', marginBottom: '.4rem' }}>
              {r.fileLabel}
            </label>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={onFileChange}
              style={{ fontSize: '.85rem', color: 'var(--text)' }} />
            <div className="file-note">{r.fileNote}</div>
            <div style={{ fontSize: '.75rem', color: 'var(--text-dim)', marginTop: '.4rem' }}>
              {lang === 'vi'
                ? '💡 Đặt tên file theo tên đội thi (ví dụ: TenDoi_MoTaDuAn.pdf)'
                : '💡 Name the file after your team name (e.g. TeamName_ProjectDescription.pdf)'}
            </div>
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
              {lang === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'Something went wrong. Please try again.'}
            </p>
          )}

          <button type="submit" className="btn-submit-reg" disabled={status === 'loading' || hasDup}>
            {status === 'loading' ? '...' : r.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
