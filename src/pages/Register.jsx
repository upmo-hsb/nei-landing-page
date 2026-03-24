import { useState } from 'react';
import { useLang } from '../LangContext';

export default function Register() {
  const { tx } = useLang();
  const r = tx.register;
  const [members, setMembers] = useState(['', '']);

  const addMember = () => setMembers(m => [...m, '']);
  const removeMember = (i) => {
    if (members.length <= 1) return;
    setMembers(m => m.filter((_, idx) => idx !== i));
  };
  const updateMember = (i, v) => setMembers(m => m.map((x, idx) => idx === i ? v : x));

  const handleSubmit = () => alert(r.successMsg);

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>{r.title}</h1>
        <p className="reg-sub">{r.sub}</p>

        <div className="reg-group">
          <label>{r.teamName}</label>
          <input type="text" placeholder={r.teamNamePh}/>
        </div>
        <div className="reg-group">
          <label>{r.school}</label>
          <input type="text" placeholder={r.schoolPh}/>
        </div>
        <div className="reg-group">
          <label>{r.email}</label>
          <input type="email" placeholder="email@example.com"/>
        </div>
        <div className="reg-group">
          <label>{r.phone}</label>
          <input type="tel" placeholder={r.phonePh}/>
        </div>

        <div className="team-members-box">
          <div className="team-members-label">{r.membersLabel}</div>
          <div id="members-list">
            {members.map((val, i) => (
              <div className="member-row" key={i}>
                <input type="text" placeholder={r.memberPh(i + 1)} value={val} onChange={e => updateMember(i, e.target.value)}/>
                <button type="button" className="btn-remove" onClick={() => removeMember(i)}>{r.remove}</button>
              </div>
            ))}
          </div>
          <button type="button" className="btn-add-member" onClick={addMember}>{r.addMember}</button>
        </div>

        <div className="reg-group">
          <label>{r.idea}</label>
          <textarea placeholder={r.ideaPh}></textarea>
          <div style={{ marginTop:'.7rem' }}>
            <label style={{ fontSize:'.82rem', color:'#555', fontFamily:"'DM Sans',sans-serif", display:'block', marginBottom:'.4rem' }}>
              {r.fileLabel}
            </label>
            <input type="file" accept=".pdf,.doc,.docx" style={{ fontSize:'.85rem', color:'#444' }}
              onChange={e => {
                const f = e.target.files[0];
                if (f && f.size > 25*1024*1024) { alert(r.fileNote.replace('⚠️ ','')); e.target.value=''; }
              }}
            />
            <div className="file-note">{r.fileNote}</div>
          </div>
        </div>

        <div className="reg-group">
          <label>{r.category}</label>
          <select>
            <option value="">{r.categoryPh}</option>
            {r.categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <button type="button" className="btn-submit-reg" onClick={handleSubmit}>{r.submit}</button>
      </div>
    </div>
  );
}
