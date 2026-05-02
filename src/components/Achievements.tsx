import React from 'react';
import { motion } from 'motion/react';
import './Achievements.css';
import achievements from '../data/achievments.json';

const getRankDisplay = (title: string, color: string) => {
  if (title.includes('Honorable Mention')) return { label: 'HM', color: '' };
  if (title.includes('1st Runner Up')) return { label: '2nd', color: 'silver' };
  if (title.toLowerCase().includes('best')) return { label: 'Best', color: 'gold' };
  if (title.includes('2nd Place')) return { label: '2nd', color: 'silver' };
  if (title.includes('3rd Place')) return { label: '3rd', color: 'bronze' };
  if (title.includes('1st Place')) return { label: '1st', color: 'gold' };
  if (title.includes('Speaker')) return { label: '🎤', sub: 'Speaker', color: '' };
  if (title.toLowerCase().includes('finalist')) return { label: 'Top 20', color: 'silver' };
  
  const matchNumMatch = title.match(/(\d+)(st|nd|rd|th)/);
  if (matchNumMatch) return { label: matchNumMatch[0], color: 'silver' };
  
  return { label: 'W', color: 'silver' };
};

const RenderFeatured = ({ data, header }: { data: any[], header?: string }) => {
  if (!data || data.length === 0) return null;
  return (
    <>
      {header && <div className="sub-label">{header}</div>}
      {data.map((item, idx) => (
        <a key={`hero-${idx}`} href={item.link || '#'} target="_blank" rel="noopener noreferrer" className="card-hero" style={!item.link ? { pointerEvents: 'none' } : {}}>
          <div className="card-hero-body">
            <div className="card-hero-top">
              <div className="badge-level badge-international">
                <span className="badge-dot"></span> {item.category || header}
              </div>
              <div className="card-hero-title">
                <em>{item.rank?.label}</em><br/>{item.title}
              </div>
            </div>
            <div>
              <small className="card-hero-desc meta-value">{item.description}</small>
            </div>
            <div className="card-hero-bottom">
              <div className="meta-item">
                <span className="meta-label">Organizer</span>
                <span className="meta-value">{item.organization}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Date</span>
                <span className="meta-value">{item.date}</span>
              </div>
              {item.link && (
                <div className="meta-item" style={{ marginLeft: 'auto' }}>
                  <span className="badge-level badge-university" style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent', padding: '6px 14px' }}>
                    {item.label || 'View Story'} ↗
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="card-hero-photo">
            <div className="photo-placeholder">
              {
                item.image ? (<img src={item.image} alt="" />) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="m21 15-5-5L5 21"/>
                  </svg>
                )
              }
            </div>
            <div className="result-badge">
              <div className="result-badge-main">{item.rank?.label}</div>
              <div className="result-badge-sub">{item.rank?.sub || 'Achieved'}</div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

const RenderGrid = ({ data, header }: { data: any[], header?: string }) => {
  if (!data || data.length === 0) return null;
  return (
    <>
      {header && <div className="sub-label" style={{ marginTop: '24px' }}>{header}</div>}
      <div className="cards-row">
        {data.map((item, idx) => {
          return (
            <a key={`nat-${idx}`} href={item.link || '#'} target="_blank" rel="noopener noreferrer" className="card-national" style={!item.link ? { pointerEvents: 'none' } : {}}>
              <div className="card-national-top">
                <div>
                  <div className="badge-level badge-national" style={{ marginBottom: '10px' }}>{item.category || header}</div>
                  <div className={`rank-display ${item.rank?.color || 'default'}`}>{item.rank?.label || "Achieve"}</div>
                </div>
                <div className="card-national-photo-thumb">
                  <div className="thumb-placeholder">{item.rank?.placeholder || '🏆'}</div>
                </div>
              </div>
              <div className="card-national-title">{item.title}</div>
              <div className="card-national-description">{item.description || ''}</div>
              <div className="card-national-bottom" style={{ marginBottom: item.link ? '0' : 'auto' }}>
                <span className="org-name">{item.organization}</span>
                <span className="date-chip">{item.date.split(' ')[0].substring(0,3)} {item.date.split(' ')[1]}</span>
              </div>
              
              {item.link && (
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--accent)' }}>
                    {item.label || 'View Story'}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent)' }}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              )}
            </a>
          );
        })}
      </div>
    </>
  );
};

const RenderList = ({ data, header }: { data: any[], header?: string }) => {
  if (!data || data.length === 0) return null;
  return (
    <>
      {header && <div className="sub-label" style={{ marginTop: '24px' }}>{header}</div>}
      <div className="cards-list">
        {data.map((item, idx) => {
          return (
            <a key={`std-${idx}`} href={item.link || '#'} target="_blank" rel="noopener noreferrer" className="card-standard" style={!item.link ? { pointerEvents: 'none' } : {}}>
              <div className={`std-rank ${item.rank?.color || 'default'}`} style={(item.rank?.sub ? { fontSize:'14px', color: 'var(--text-muted)', minWidth:'40px', textAlign: 'center', lineHeight:'1.3' } : {})}>
                {item.rank?.sub ? <><span style={{fontSize:'10px'}}>{item.rank?.label}<br/>{item.rank?.sub}</span></> : item.rank?.label}
              </div>
              <div className="std-divider"></div>
              <div className="std-icon">{item.rank?.placeholder || '💻'}</div>
              <div className="std-content">
                <div className="std-title">{item.title}</div>
                <div className="std-org">{item.organization}</div>
              </div>
              <span className="std-date">{item.date.split(' ')[0].substring(0,3)} {item.date.split(' ')[1]}</span>
              {item.link ? (
                <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              ) : (
                <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{opacity:0}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              )}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default function Achievements() {
  const totalCount = achievements.achievements.reduce((sum, section) => sum + (section.data?.length || 0), 0);

  return (
    <section id="achievements" className="achievements-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Achievements</h2>
        </div>
        <div className="section-count">{totalCount}+</div>
      </div>

      <div className="achievements-wrapper">
        
        {achievements.achievements.map((section, idx) => {
          if (section.type === 'featured') {
            return <RenderFeatured key={idx} data={section.data} header={section.header} />;
          }
          if (section.type === 'grid') {
            return <RenderGrid key={idx} data={section.data} header={section.header} />;
          }
          if (section.type === 'list') {
            return <RenderList key={idx} data={section.data} header={section.header} />;
          }
          return null;
        })}

        {/* ─── Totals Strip ─── */}
        <div className="totals-strip">
          {achievements.strips.map((strip, idx) => (
            <div className="total-item">
            <div className={`total-num ${strip.color || 'default'}`}>{strip.value}</div>
            <div className="total-lbl">{strip.label}</div>
          </div>
          ))}
        </div>

      </div>
    </section>
  );
}
