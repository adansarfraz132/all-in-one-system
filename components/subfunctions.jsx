// Modules with group + tone + glyph + dependency rules

const MODULES = [
  // Human Resources
  { id: 'hr',       name: 'HR & People',      group: 'Human Resources', tone: 'pink',   glyph: 'users',    tag: null },
  { id: 'payroll',  name: 'Payroll',          group: 'Human Resources', tone: 'green',  glyph: 'payroll',  tag: 'KSA' },
  { id: 'ats',      name: 'Recruiting · ATS', group: 'Human Resources', tone: 'blue',   glyph: 'ats',      tag: null },
  { id: 'perf',     name: 'Performance',      group: 'Human Resources', tone: 'teal',   glyph: 'perf',     tag: null },

  // Finance
  { id: 'finance',  name: 'Finance',          group: 'Finance',         tone: 'purple', glyph: 'finance',  tag: null },
  { id: 'expenses', name: 'Expenses',         group: 'Finance',         tone: 'orange', glyph: 'expenses', tag: null },
  { id: 'procure',  name: 'Procurement',      group: 'Finance',         tone: 'indigo', glyph: 'procure',  tag: null },

  // Revenue & Customers (NEW)
  { id: 'crm',      name: 'CRM & Sales',         group: 'Revenue & Customers', tone: 'pink',   glyph: 'crm',      tag: 'NEW' },
  { id: 'portal',   name: 'Customer Portal',     group: 'Revenue & Customers', tone: 'teal',   glyph: 'portal',   tag: 'NEW' },
  { id: 'helpdesk', name: 'Helpdesk · Tickets',  group: 'Revenue & Customers', tone: 'orange', glyph: 'help',     tag: 'NEW' },
  { id: 'inventory',name: 'Inventory & Stock',   group: 'Revenue & Customers', tone: 'lime',   glyph: 'box',      tag: 'NEW' },

  // Operations
  { id: 'it',       name: 'IT & Devices',     group: 'Operations',      tone: 'slate',  glyph: 'it',       tag: null },
  { id: 'travel',   name: 'Travel',           group: 'Operations',      tone: 'yellow', glyph: 'travel',   tag: null },
  { id: 'projects', name: 'Projects',         group: 'Operations',      tone: 'lime',   glyph: 'projects', tag: null },
  { id: 'comply',   name: 'Compliance',       group: 'Operations',      tone: 'red',    glyph: 'comply',   tag: 'KSA' },
];

const SUBFUNCTIONS = [
  // HR
  { id: 'hr.records', name: 'Employee records', parent: 'hr', price: 3, desc: 'Profiles, docs, contracts' },
  { id: 'hr.leave',   name: 'Leave & time-off', parent: 'hr', price: 2, desc: 'Requests, balances, calendars' },
  { id: 'hr.org',     name: 'Org chart',        parent: 'hr', price: 2, desc: 'Live chart, reporting lines' },
  { id: 'hr.onboard', name: 'Onboarding flows', parent: 'hr', price: 3, desc: 'Checklists, docs, day-1 kit' },
  { id: 'hr.docs',    name: 'Doc signing',      parent: 'hr', price: 2, desc: 'Contracts + e-sign' },

  // Payroll
  { id: 'pay.run',      name: 'Payroll runs',       parent: 'payroll', price: 5, desc: 'Monthly + off-cycle' },
  { id: 'pay.wps',      name: 'WPS / bank files',   parent: 'payroll', price: 3, desc: 'Saudi WPS, bank-direct' },
  { id: 'pay.gosi',     name: 'GOSI sync',          parent: 'payroll', price: 2, desc: 'Auto-file, reconcile' },
  { id: 'pay.payslips', name: 'Payslips & tax docs',parent: 'payroll', price: 2, desc: 'Bilingual, self-serve' },
  { id: 'pay.multi',    name: 'Multi-entity payroll',parent: 'payroll',price: 4, desc: 'KSA, UAE, EGY' },

  // ATS
  { id: 'ats.jobs',     name: 'Job board & careers', parent: 'ats', price: 2, desc: 'Postings, landing pages' },
  { id: 'ats.pipeline', name: 'Candidate pipeline',  parent: 'ats', price: 3, desc: 'Kanban, scorecards' },
  { id: 'ats.offers',   name: 'Offers & e-sign',     parent: 'ats', price: 2, desc: 'Templates, approvals' },

  // Performance
  { id: 'perf.review',   name: 'Review cycles',    parent: 'perf', price: 3, desc: 'Quarterly / annual' },
  { id: 'perf.okr',      name: 'OKRs & goals',     parent: 'perf', price: 2, desc: 'Set, track, roll up' },
  { id: 'perf.oneonone', name: '1:1s & feedback',  parent: 'perf', price: 1, desc: 'Manager meetings' },

  // Finance
  { id: 'fin.gl',    name: 'General ledger',      parent: 'finance', price: 5, desc: 'Multi-entity, multi-currency' },
  { id: 'fin.ap',    name: 'Accounts payable',    parent: 'finance', price: 3, desc: 'Bills, approvals, pay runs' },
  { id: 'fin.ar',    name: 'Accounts receivable', parent: 'finance', price: 3, desc: 'Invoices, collections' },
  { id: 'fin.close', name: 'Month-end close',     parent: 'finance', price: 3, desc: 'Checklist + auto-recon' },
  { id: 'fin.zatca', name: 'ZATCA e-invoicing',   parent: 'finance', price: 3, desc: 'Phase 2, QR, signed' },

  // Expenses
  { id: 'exp.cards',     name: 'Corporate cards', parent: 'expenses', price: 3, desc: 'Issue, limit, freeze' },
  { id: 'exp.receipts',  name: 'Receipt capture', parent: 'expenses', price: 2, desc: 'OCR, auto-match' },
  { id: 'exp.reimburse', name: 'Reimbursements',  parent: 'expenses', price: 2, desc: 'Approve → payroll' },

  // Procurement
  { id: 'proc.po',      name: 'Purchase orders',    parent: 'procure', price: 3, desc: 'Request → approve → PO' },
  { id: 'proc.vendors', name: 'Vendor management',  parent: 'procure', price: 2, desc: 'Master, KYC, contracts' },
  { id: 'proc.budget',  name: 'Budget controls',    parent: 'procure', price: 3, desc: 'Caps per team / project' },

  // CRM
  { id: 'crm.leads',    name: 'Leads & pipeline',     parent: 'crm', price: 4, desc: 'Stages, owners, history' },
  { id: 'crm.qualify',  name: 'Lead qualification',   parent: 'crm', price: 2, desc: 'Scoring + auto-routing', requires: ['crm.leads'] },
  { id: 'crm.quotes',   name: 'Quotes & proposals',   parent: 'crm', price: 3, desc: 'Templates, e-sign', requires: ['crm.leads'] },
  { id: 'crm.invoice',  name: 'Quote → invoice',      parent: 'crm', price: 2, desc: 'Auto-generate on close', requires: ['crm.quotes', 'fin.ar'] },
  { id: 'crm.analytics',name: 'Revenue analytics',    parent: 'crm', price: 3, desc: 'MRR, ARR, conversion, churn', requires: ['crm.leads'] },

  // Customer Portal
  { id: 'pt.login',     name: 'Client login & profile', parent: 'portal', price: 2, desc: 'Self-serve account', requires: ['crm.leads'] },
  { id: 'pt.invoices',  name: 'Invoices & payments',    parent: 'portal', price: 2, desc: 'View, download, pay', requires: ['fin.ar'] },
  { id: 'pt.requests',  name: 'Request tracking',       parent: 'portal', price: 2, desc: 'Status, comments' },

  // Helpdesk
  { id: 'hd.tickets',   name: 'Tickets & SLAs',     parent: 'helpdesk', price: 3, desc: 'Inbox, assign, resolve' },
  { id: 'hd.kb',        name: 'Knowledge base',     parent: 'helpdesk', price: 2, desc: 'Public FAQ, search' },
  { id: 'hd.portal',    name: 'Portal integration', parent: 'helpdesk', price: 1, desc: 'Raise from client portal', requires: ['hd.tickets', 'pt.login'] },

  // Inventory
  { id: 'inv.stock',    name: 'Stock levels',       parent: 'inventory', price: 3, desc: 'Real-time, multi-warehouse' },
  { id: 'inv.reorder',  name: 'Reorder & alerts',   parent: 'inventory', price: 2, desc: 'Auto-PO at threshold' },
  { id: 'inv.fin',      name: 'Stock → accounting', parent: 'inventory', price: 2, desc: 'COGS, valuation auto-post', requires: ['inv.stock', 'fin.gl'] },

  // IT
  { id: 'it.devices',  name: 'Device management', parent: 'it', price: 4, desc: 'Laptops, phones, MDM' },
  { id: 'it.sso',      name: 'SSO · SCIM',        parent: 'it', price: 3, desc: 'Identity + app access' },
  { id: 'it.offboard', name: 'Auto-offboarding',  parent: 'it', price: 2, desc: 'Kill access + wipe' },

  // Travel
  { id: 'trv.book',   name: 'Trip booking',    parent: 'travel', price: 2, desc: 'Flights, hotels' },
  { id: 'trv.policy', name: 'Travel policy',   parent: 'travel', price: 1, desc: 'Class limits, per-diem' },
  { id: 'trv.recon',  name: 'Auto-reconcile',  parent: 'travel', price: 2, desc: 'Cards ↔ trips ↔ GL' },

  // Projects
  { id: 'prj.tasks', name: 'Tasks & plans',  parent: 'projects', price: 2, desc: 'Boards, timelines' },
  { id: 'prj.time',  name: 'Time tracking',  parent: 'projects', price: 2, desc: 'Per project / client' },
  { id: 'prj.bill',  name: 'Project billing',parent: 'projects', price: 2, desc: 'Hours → invoices', requires: ['prj.time', 'fin.ar'] },

  // Compliance
  { id: 'cmp.saud',     name: 'Saudization · Nitaqat', parent: 'comply', price: 2, desc: 'Live % + alerts' },
  { id: 'cmp.qiwa',     name: 'Qiwa sync',             parent: 'comply', price: 2, desc: 'Contracts, transfers' },
  { id: 'cmp.mudad',    name: 'Mudad sync',            parent: 'comply', price: 1, desc: 'Labor fund, payroll' },
  { id: 'cmp.policies', name: 'Policy library',        parent: 'comply', price: 1, desc: 'Attestations' },
];

const subsByParent = (pid) => SUBFUNCTIONS.filter(s => s.parent === pid);
const findSub = (id) => SUBFUNCTIONS.find(s => s.id === id);

// Returns array of {sub, missing[]} for picks whose required deps aren't met
const getDependencyWarnings = (pickedSet) => {
  const warnings = [];
  for (const id of pickedSet) {
    const s = findSub(id);
    if (!s || !s.requires) continue;
    const missing = s.requires.filter(r => !pickedSet.has(r)).map(findSub).filter(Boolean);
    if (missing.length > 0) warnings.push({ sub: s, missing });
  }
  return warnings;
};

Object.assign(window, { MODULES, SUBFUNCTIONS, subsByParent, findSub, getDependencyWarnings });
