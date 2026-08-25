import { useState } from 'react';
import { useLang } from '../LangContext';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwyG4YsVBBBEc7lmo4jjMAORfXcDepece37u9D7MiX2Bde5_RlFX_MRtJw5hIYgjbvK/exec';

function normalizePhone(v) {
  return v.replace(/\D/g, '').replace(/^0+/, '');
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isValidPhone(v) {
  // Số điện thoại Việt Nam: 10 chữ số, bắt đầu bằng 0[3|5|7|8|9]
  return /^(0[35789][0-9]{8})$/.test(v.replace(/\s/g, ''));
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
  const [status, setStatus] = useState(null);
  const [dupErrors, setDupErrors] = useState({});
  const [formatErrors, setFormatErrors] = useState({});

  const addMember = () => { if (members.length < 5) setMembers(m => [...m, '']); };
  const removeMember = (i) => { if (i > 0 && members.length > 1) setMembers(m => m.filter((_, idx) => idx !== i)); };
  const updateMember = (i, v) => setMembers(m => m.map((x, idx) => idx === i ? v : x));
  const updateField = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (dupErrors[k]) setDupErrors(d => ({ ...d, [k]: false }));
    if (formatErrors[k]) setFormatErrors(d => ({ ...d, [k]: false }));
  };

  const handleBlur = async (field) => {
    const value = form[field];
    if (!value.trim()) return;

    // Kiểm tra format trước
    if (field === 'email' && !isValidEmail(value)) {
      setFormatErrors(d => ({ ...d, email: true }));
      return;
    }
    if (field === 'phone' && !isValidPhone(value)) {
      setFormatErrors(d => ({ ...d, phone: true }));
      return;
    }

    // Kiểm tra trùng lặp
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
  const hasFormatErr = Object.values(formatErrors).some(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasDup || hasFormatErr) return;
    setStatus('loading');
    try {
      const payload = {
        ...form,
        members: members.filter(m => m.trim()).join(', '),
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
              style={(dupErrors.email || formatErrors.email) ? { borderColor: '#ff6b6b' } : {}} />
            {formatErrors.email && <p style={errStyle}>⚠️ {lang === 'vi' ? 'Vui lòng điền email hợp lệ.' : 'Please enter a valid email address.'}</p>}
            {dupMsg('email') && <p style={errStyle}>⚠️ {dupMsg('email')}</p>}
          </div>

          <div className="reg-group">
            <label>{r.phone}</label>
            <input required type="tel" placeholder={r.phonePh}
              value={form.phone}
              onChange={e => updateField('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              style={(dupErrors.phone || formatErrors.phone) ? { borderColor: '#ff6b6b' } : {}} />
            {formatErrors.phone && <p style={errStyle}>⚠️ {lang === 'vi' ? 'Vui lòng điền số điện thoại hợp lệ (10 số, bắt đầu bằng 0).' : 'Please enter a valid Vietnamese phone number (10 digits, starting with 0).'}</p>}
            {dupMsg('phone') && <p style={errStyle}>⚠️ {dupMsg('phone')}</p>}
          </div>

          <div className="team-members-box">
            <div className="team-members-label">{r.membersLabel}</div>
            {members.map((val, i) => (
              <div className="member-row" key={i}>
                <input required={i === 0} type="text" placeholder={r.memberPh(i + 1)} value={val}
                  onChange={e => updateMember(i, e.target.value)} />
                {i > 0 && (
                  <button type="button" className="btn-remove" onClick={() => removeMember(i)}>{r.remove}</button>
                )}
              </div>
            ))}
            {members.length < 5 && (
              <button type="button" className="btn-add-member" onClick={addMember}>{r.addMember}</button>
            )}
            <p style={{ marginTop: '.6rem', fontSize: '.8rem', color: '#ff6b6b', fontFamily: 'var(--font-body)' }}>
              * {lang === 'vi' ? 'Mỗi đội thi có không quá 5 thành viên' : 'Each team may have no more than 5 members'}
            </p>
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
            <label>{r.category}</label>
            <select required value={form.category} onChange={e => updateField('category', e.target.value)}>
              <option value="">{r.categoryPh}</option>
              {r.categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <aside className="registration-note" aria-labelledby="registration-note-title">
            <h2 id="registration-note-title">{r.noteTitle}</h2>
            <ul>
              <li>{r.noteConfirmation}</li>
              <li>{r.noteContactIntro}</li>
            </ul>
            <div className="registration-note-contact">
              <div><strong>Hotline:</strong> <a href="tel:0868226656">0868 22 66 56</a></div>
              <div><strong>Email:</strong> <a href="mailto:hsb.khoinghiepmienbac@hsb.edu.vn">hsb.khoinghiepmienbac@hsb.edu.vn</a></div>
              <div><strong>{r.noteFanpageLabel}:</strong> <a href="https://www.facebook.com/profile.php?id=61592814106251" target="_blank" rel="noopener noreferrer">{r.noteFanpageLink}</a></div>
            </div>
          </aside>

          {status === 'error' && (
            <p style={{ color: '#ff6b6b', marginBottom: '1rem', fontFamily: 'var(--font-body)' }}>
              {lang === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'Something went wrong. Please try again.'}
            </p>
          )}

          <button type="submit" className="btn-submit-reg" disabled={status === 'loading' || hasDup || hasFormatErr}>
            {status === 'loading' ? '...' : r.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
