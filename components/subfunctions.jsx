// Modules with group + tone + glyph for new style

const MODULES = [
  { id: 'hr',       name: 'HR & People',      group: 'Human Resources', tone: 'pink',   glyph: 'users',    tag: null },
  { id: 'payroll',  name: 'Payroll',          group: 'Human Resources', tone: 'green',  glyph: 'payroll',  tag: 'KSA' },
  { id: 'ats',      name: 'Recruiting · ATS', group: 'Human Resources', tone: 'blue',   glyph: 'ats',      tag: null },
  { id: 'perf',     name: 'Performance',      group: 'Human Resources', tone: 'teal',   glyph: 'perf',     tag: null },
  { id: 'it',       name: 'IT & Devices',     group: 'Operations',      tone: 'slate',  glyph: 'it',       tag: null },
  { id: 'finance',  name: 'Finance',          group: 'Finance',         tone: 'purple', glyph: 'finance',  tag: null },
  { id: 'expenses', name: 'Expenses',         group: 'Finance',         tone: 'orange', glyph: 'expenses', tag: null },
  { id: 'procure',  name: 'Procurement',      group: 'Finance',         tone: 'indigo', glyph: 'procure',  tag: null },
  { id: 'travel',   name: 'Travel',           group: 'Operations',      tone: 'yellow', glyph: 'travel',   tag: null },
  { id: 'projects', name: 'Projects',         group: 'Operations',      tone: 'lime',   glyph: 'projects', tag: null },
  { id: 'comply',   name: 'Compliance',       group: 'Operations',      tone: 'red',    glyph: 'comply',   tag: 'KSA' },
];

const SUBFUNCTIONS = [
  { id: 'hr.records', name: 'Employee records', parent: 'hr', price: 3, desc: 'Profiles, docs, contracts' },
  { id: 'hr.leave',   name: 'Leave & time-off', parent: 'hr', price: 2, desc: 'Requests, balances, calendars' },
  { id: 'hr.org',     name: 'Org chart',        parent: 'hr', price: 2, desc: 'Live chart, reporting lines' },
  { id: 'hr.onboard', name: 'Onboarding flows', parent: 'hr', price: 3, desc: 'Checklists, docs, day-1 kit' },
  { id: 'hr.docs',    name: 'Doc signing',      parent: 'hr', price: 2, desc: 'Contracts + e-sign' },

  { id: 'pay.run',      name: 'Payroll runs',       parent: 'payroll', price: 5, desc: 'Monthly + off-cycle' },
  { id: 'pay.wps',      name: 'WPS / bank files',   parent: 'payroll', price: 3, desc: 'Saudi WPS, bank-direct' },
  { id: 'pay.gosi',     name: 'GOSI sync',          parent: 'payroll', price: 2, desc: 'Auto-file, reconcile' },
  { id: 'pay.payslips', name: 'Payslips & tax docs',parent: 'payroll', price: 2, desc: 'Bilingual, self-serve' },
  { id: 'pay.multi',    name: 'Multi-entity payroll',parent: 'payroll',price: 4, desc: 'KSA, UAE, EGY' },

  { id: 'ats.jobs',     name: 'Job board & careers', parent: 'ats', price: 2, desc: 'Postings, landing pages' },
  { id: 'ats.pipeline', name: 'Candidate pipeline',  parent: 'ats', price: 3, desc: 'Kanban, scorecards' },
  { id: 'ats.offers',   name: 'Offers & e-sign',     parent: 'ats', price: 2, desc: 'Templates, approvals' },

  { id: 'perf.review',   name: 'Review cycles',    parent: 'perf', price: 3, desc: 'Quarterly / annual' },
  { id: 'perf.okr',      name: 'OKRs & goals',     parent: 'perf', price: 2, desc: 'Set, track, roll up' },
  { id: 'perf.oneonone', name: '1:1s & feedback',  parent: 'perf', price: 1, desc: 'Manager meetings' },

  { id: 'it.devices',  name: 'Device management', parent: 'it', price: 4, desc: 'Laptops, phones, MDM' },
  { id: 'it.sso',      name: 'SSO · SCIM',        parent: 'it', price: 3, desc: 'Identity + app access' },
  { id: 'it.offboard', name: 'Auto-offboarding',  parent: 'it', price: 2, desc: 'Kill access + wipe' },

  { id: 'fin.gl',    name: 'General ledger',      parent: 'finance', price: 5, desc: 'Multi-entity, multi-currency' },
  { id: 'fin.ap',    name: 'Accounts payable',    parent: 'finance', price: 3, desc: 'Bills, approvals, pay runs' },
  { id: 'fin.ar',    name: 'Accounts receivable', parent: 'finance', price: 3, desc: 'Invoices, collections' },
  { id: 'fin.close', name: 'Month-end close',     parent: 'finance', price: 3, desc: 'Checklist + auto-recon' },
  { id: 'fin.zatca', name: 'ZATCA e-invoicing',   parent: 'finance', price: 3, desc: 'Phase 2, QR, signed' },

  { id: 'exp.cards',     name: 'Corporate cards', parent: 'expenses', price: 3, desc: 'Issue, limit, freeze' },
  { id: 'exp.receipts',  name: 'Receipt capture', parent: 'expenses', price: 2, desc: 'OCR, auto-match' },
  { id: 'exp.reimburse', name: 'Reimbursements',  parent: 'expenses', price: 2, desc: 'Approve → payroll' },

  { id: 'proc.po',      name: 'Purchase orders',    parent: 'procure', price: 3, desc: 'Request → approve → PO' },
  { id: 'proc.vendors', name: 'Vendor management',  parent: 'procure', price: 2, desc: 'Master, KYC, contracts' },
  { id: 'proc.budget',  name: 'Budget controls',    parent: 'procure', price: 3, desc: 'Caps per team / project' },

  { id: 'trv.book',   name: 'Trip booking',    parent: 'travel', price: 2, desc: 'Flights, hotels' },
  { id: 'trv.policy', name: 'Travel policy',   parent: 'travel', price: 1, desc: 'Class limits, per-diem' },
  { id: 'trv.recon',  name: 'Auto-reconcile',  parent: 'travel', price: 2, desc: 'Cards ↔ trips ↔ GL' },

  { id: 'prj.tasks', name: 'Tasks & plans',  parent: 'projects', price: 2, desc: 'Boards, timelines' },
  { id: 'prj.time',  name: 'Time tracking',  parent: 'projects', price: 2, desc: 'Per project / client' },
  { id: 'prj.bill',  name: 'Project billing',parent: 'projects', price: 2, desc: 'Hours → invoices' },

  { id: 'cmp.saud',     name: 'Saudization · Nitaqat', parent: 'comply', price: 2, desc: 'Live % + alerts' },
  { id: 'cmp.qiwa',     name: 'Qiwa sync',             parent: 'comply', price: 2, desc: 'Contracts, transfers' },
  { id: 'cmp.mudad',    name: 'Mudad sync',            parent: 'comply', price: 1, desc: 'Labor fund, payroll' },
  { id: 'cmp.policies', name: 'Policy library',        parent: 'comply', price: 1, desc: 'Attestations' },
];

const subsByParent = (pid) => SUBFUNCTIONS.filter(s => s.parent === pid);
const findSub = (id) => SUBFUNCTIONS.find(s => s.id === id);

Object.assign(window, { MODULES, SUBFUNCTIONS, subsByParent, findSub });
