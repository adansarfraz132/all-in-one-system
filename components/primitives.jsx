// Primitives — AppIcon (colored rounded tile with glyph), UIIcon (monochrome line), logos

const { useState, useEffect, useRef } = React;

// Colored app icon — Odoo/Deel style rounded tile
const TONES = {
  pink:   { bg: '#fde2ec', fg: '#c93370' },
  green:  { bg: '#dcf4e6', fg: '#16794a' },
  purple: { bg: '#ece3f7', fg: '#6b37a8' },
  blue:   { bg: '#dfeaff', fg: '#2a5bd1' },
  teal:   { bg: '#d7f0ef', fg: '#127073' },
  orange: { bg: '#ffe8d4', fg: '#b85a10' },
  yellow: { bg: '#fff1c2', fg: '#8a6208' },
  red:    { bg: '#fddada', fg: '#b91c1c' },
  indigo: { bg: '#e2e2f8', fg: '#3d3bcb' },
  slate:  { bg: '#e5e7eb', fg: '#334155' },
  lime:   { bg: '#e5f4c7', fg: '#4d7c0f' },
};

const GLYPHS = {
  users:    <g><circle cx="9" cy="9" r="3" /><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"/><circle cx="16" cy="8" r="2.3"/><path d="M14 15c2 0 4 1 5 3"/></g>,
  payroll:  <g><rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="12" cy="12.5" r="2.5"/><path d="M6 9h1M17 16h1"/></g>,
  ats:      <g><circle cx="11" cy="11" r="6"/><path d="M15.5 15.5L20 20"/><path d="M11 8v6M8 11h6"/></g>,
  perf:     <g><path d="M3 17l5-5 4 4 7-8"/><circle cx="3" cy="17" r="1.2" fill="currentColor"/><circle cx="19" cy="8" r="1.2" fill="currentColor"/></g>,
  it:       <g><rect x="3" y="5" width="18" height="11" rx="2"/><path d="M9 20h6M12 16v4"/></g>,
  finance:  <g><path d="M12 4v16M16 8h-5a2.5 2.5 0 000 5h3a2.5 2.5 0 010 5H7"/></g>,
  expenses: <g><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M3 11h18"/><path d="M7 15h3"/></g>,
  procure:  <g><path d="M4 6h2l2 10h10l2-7H7"/><circle cx="9" cy="19" r="1.2"/><circle cx="17" cy="19" r="1.2"/></g>,
  travel:   <g><path d="M3 14l7-1 5-7 3 1-4 7 2 4-2 1-3-3-4 1-1 3-2-1 1-4-2-1z"/></g>,
  projects: <g><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v16"/></g>,
  comply:   <g><path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z"/><path d="M9 12l2 2 4-4"/></g>,
  check:    <g><path d="M5 12l5 5 9-10"/></g>,
  search:   <g><circle cx="11" cy="11" r="6"/><path d="M15.5 15.5L20 20"/></g>,
  bell:     <g><path d="M6 16V11a6 6 0 0112 0v5l2 2H4l2-2z"/><path d="M10 20a2 2 0 004 0"/></g>,
  chevronRight: <g><path d="M9 6l6 6-6 6"/></g>,
  x:        <g><path d="M6 6l12 12M18 6l-12 12"/></g>,
};

const AppIcon = ({ tone = 'purple', glyph = 'users', size = 36 }) => {
  const t = TONES[tone] || TONES.purple;
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.26,
      background: t.bg, color: t.fg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24"
           fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {GLYPHS[glyph] || GLYPHS.users}
      </svg>
    </div>
  );
};

const UIIcon = ({ name, size = 16, color = 'currentColor', sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {GLYPHS[name] || GLYPHS.users}
  </svg>
);

// Logos — real images. `invert` flips for dark backgrounds.
const SanabilStudioLogo = ({ height = 26, invert = false }) => (
  <img src="assets/sanabil-studio.png" alt="Sanabil Studio"
       style={{ height, width: 'auto', display: 'block',
                filter: invert ? 'brightness(0) invert(1)' : 'none' }}/>
);

const SanabilInvestmentsLogo = ({ height = 28, invert = false }) => (
  <img src="assets/sanabil-investments.png" alt="Sanabil Investments"
       style={{ height, width: 'auto', display: 'block',
                filter: invert ? 'brightness(0) invert(1)' : 'none' }}/>
);

Object.assign(window, { AppIcon, UIIcon, SanabilStudioLogo, SanabilInvestmentsLogo, useState, useEffect, useRef });
