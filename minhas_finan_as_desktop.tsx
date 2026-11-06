import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// BANCOS E BANDEIRAS DE CARTÃO DE CRÉDITO
// ==========================================
const BANK_PRESETS = {
  nubank: { id: 'nubank', name: 'Nubank', hex: '#820ad1', text: '#ffffff', initials: 'NU' },
  itau: { id: 'itau', name: 'Itaú', hex: '#ff6200', text: '#ffffff', initials: 'IT' },
  bradesco: { id: 'bradesco', name: 'Bradesco', hex: '#cc092f', text: '#ffffff', initials: 'BD' },
  santander: { id: 'santander', name: 'Santander', hex: '#ec0000', text: '#ffffff', initials: 'SAN' },
  bb: { id: 'bb', name: 'Banco do Brasil', hex: '#003399', text: '#facc15', initials: 'BB' },
  inter: { id: 'inter', name: 'Banco Inter', hex: '#ff7a00', text: '#ffffff', initials: 'INT' },
  c6: { id: 'c6', name: 'C6 Bank', hex: '#18181b', text: '#ffffff', initials: 'C6' },
  caixa: { id: 'caixa', name: 'Caixa Econômica', hex: '#0066b3', text: '#ffffff', initials: 'CX' },
  xp: { id: 'xp', name: 'XP Investimentos', hex: '#000000', text: '#eab308', initials: 'XP' },
  mercadopago: { id: 'mercadopago', name: 'Mercado Pago', hex: '#009ee3', text: '#ffffff', initials: 'MP' },
  pagbank: { id: 'pagbank', name: 'PagBank', hex: '#00a859', text: '#ffffff', initials: 'PAG' },
  btg: { id: 'btg', name: 'BTG Pactual', hex: '#001e3c', text: '#ffffff', initials: 'BTG' },
  sicoob: { id: 'sicoob', name: 'Sicoob', hex: '#003641', text: '#78be20', initials: 'SIC' },
  sicredi: { id: 'sicredi', name: 'Sicredi', hex: '#007a33', text: '#ffffff', initials: 'SCR' },
  wise: { id: 'wise', name: 'Wise', hex: '#2e52f8', text: '#9fe870', initials: 'WISE' },
  nomad: { id: 'nomad', name: 'Nomad', hex: '#ffbb00', text: '#18181b', initials: 'NOM' },
  carteira: { id: 'carteira', name: 'Carteira / Dinheiro', hex: '#047857', text: '#ffffff', initials: 'R$' },
  investimento: { id: 'investimento', name: 'Investimentos', hex: '#3730a3', text: '#ffffff', initials: 'INV' }
};

const NETWORK_FLAGS = {
  mastercard: { name: 'Mastercard', label: 'MC' },
  visa: { name: 'Visa', label: 'VISA' },
  elo: { name: 'Elo', label: 'ELO' },
  amex: { name: 'Amex', label: 'AMEX' },
  hipercard: { name: 'Hipercard', label: 'HIPER' }
};

const PALETTE = ['#0099ff', '#ffb700', '#ef4444', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#06b6d4', '#84cc16'];

// --- LOGOTIPOS EM VETOR SVG REAIS DOS BANCOS ---
const RealBankSvgLogo = ({ bankKey, className = "w-full h-full" }) => {
  switch (bankKey) {
    case 'nubank':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#820ad1" />
          <path d="M11.5 28.5V11.5h5.2l6.8 12.2V11.5h5V28.5h-5.2L16.5 16.3v12.2h-5z" fill="#ffffff" />
        </svg>
      );
    case 'itau':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#ff6200" />
          <rect x="7" y="7" width="26" height="26" rx="6" fill="#003399" />
          <text x="20" y="24.5" fill="#ff6200" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">itaú</text>
        </svg>
      );
    case 'bradesco':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#cc092f" />
          <path d="M20 9.5c-4 0-7 2.5-7 6 0 4 5 5.5 5 8 0 1.5-1.5 2.5-3 2.5-2 0-3.5-1-4-2.5l-3 1.5c1 3 3.5 4.5 7 4.5 4.5 0 7.5-2.5 7.5-6 0-4.5-5-5.5-5-8 0-1.2 1-2 2.5-2 1.5 0 2.8.8 3.3 2l3-1.5c-1.3-3.2-3.6-4.7-6.3-4.7z" fill="#ffffff" />
          <circle cx="20" cy="7" r="2" fill="#ffffff" />
        </svg>
      );
    case 'santander':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#ec0000" />
          <path d="M20 7.5c-2.2 4.4-6.5 7.7-6.5 12 0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5c0-4.3-4.3-7.6-6.5-12zm0 15.2c-1.8 0-3.3-1.5-3.3-3.3 0-2.2 2.2-4.4 3.3-6.5 1.1 2.1 3.3 4.3 3.3 6.5 0 1.8-1.5 3.3-3.3 3.3z" fill="#ffffff" />
        </svg>
      );
    case 'bb':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#003399" />
          <path d="M12 11.5h7.5V19H12zM20.5 20H28v7.5h-7.5z" fill="#facc15" />
          <path d="M20.5 11.5H28V19h-7.5zM12 20h7.5v7.5H12z" fill="#facc15" opacity="0.8" />
        </svg>
      );
    case 'inter':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#ff7a00" />
          <text x="20" y="24.5" fill="#ffffff" fontSize="10" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">inter</text>
        </svg>
      );
    case 'c6':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#18181b" />
          <text x="20" y="25" fill="#ffffff" fontSize="13" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">C6</text>
        </svg>
      );
    case 'caixa':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#0066b3" />
          <path d="M11 11l18 18M29 11L11 29" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
          <path d="M11 11l18 18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'xp':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#000000" />
          <rect x="2.5" y="2.5" width="35" height="35" rx="8" stroke="#eab308" strokeWidth="1.5" />
          <text x="20" y="25" fill="#eab308" fontSize="13" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">XP</text>
        </svg>
      );
    case 'mercadopago':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#009ee3" />
          <circle cx="20" cy="20" r="8" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M16 20h8M20 16v8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'carteira':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#047857" />
          <rect x="9" y="12" width="22" height="16" rx="3" fill="#ffffff" fillOpacity="0.2" stroke="#ffffff" strokeWidth="2" />
          <circle cx="25" cy="20" r="2" fill="#ffffff" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#3b82f6" />
          <text x="20" y="24.5" fill="#ffffff" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            {bankKey ? bankKey.substring(0, 2).toUpperCase() : 'BC'}
          </text>
        </svg>
      );
  }
};

const BankLogo = ({ bankKeyOrId, className = "w-6 h-6" }) => {
  return (
    <div className={`${className} flex-shrink-0 shadow-sm rounded-lg overflow-hidden flex items-center justify-center`}>
      <RealBankSvgLogo bankKey={bankKeyOrId} className="w-full h-full" />
    </div>
  );
};

// --- ÍCONES VISUAIS DA SIDEBAR E ACOES ---
const Icon = ({ name, className = "w-5 h-5" }) => {
  const props = { className };
  switch (name) {
    case 'grid':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
    case 'bank':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
    case 'tx':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;
    case 'card':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'percent':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>;
    case 'chart':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;
    case 'calendar':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    case 'tag':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
    case 'report':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
    case 'plus':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>;
    case 'search':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
    case 'sun':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    case 'moon':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
    case 'spark':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    case 'chevron-left':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>;
    case 'chevron-right':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>;
    case 'trash':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
    case 'edit':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
    case 'upload':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
    case 'x':
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
    default:
      return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>;
  }
};

const formatCurrency = (val) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
};

// --- GRÁFICO DONUT SVG CUSTOMIZADO ---
const CustomDonutChart = ({ data, totalLabel, totalValue, size = 180 }) => {
  const radius = 65;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  let currentAngle = 0;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 160 160" className="transform -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#334155" strokeWidth={strokeWidth} opacity="0.2" />
        {data.map((item, index) => {
          const strokeDashoffset = circumference - (item.value / total) * circumference;
          const rotation = (currentAngle / total) * 360;
          currentAngle += item.value;

          return (
            <circle
              key={index}
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transformOrigin: '80px 80px',
                transform: `rotate(${rotation}deg)`,
                transition: 'all 0.5s ease'
              }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
        {totalLabel && <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{totalLabel}</span>}
        <span className="text-sm font-black text-slate-800 dark:text-slate-100">{formatCurrency(totalValue || total)}</span>
      </div>
    </div>
  );
};

// --- GRÁFICO BARRAS HORIZONTAIS COMPARTILHADO (`06.png`) ---
const CustomHorizontalBarChart = ({ categories = [] }) => {
  const maxVal = Math.max(...categories.map(c => c.monthlyBudget || 0), 1);

  return (
    <div className="space-y-4 w-full">
      {categories.map(cat => {
        const perc = Math.min(100, Math.round(((cat.monthlyBudget || 0) / maxVal) * 100));

        return (
          <div key={cat.id} className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">{cat.name}</span>
              <span className="text-slate-600 dark:text-slate-400">{formatCurrency(cat.monthlyBudget)}</span>
            </div>
            <div className="w-full h-7 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${Math.max(perc, 12)}%`, backgroundColor: cat.color }}
              >
                <span className="text-[10px] font-black text-white">{formatCurrency(cat.monthlyBudget)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- DADOS INICIAIS BASEADOS NAS IMAGENS ---
const INITIAL_CATEGORIES = [
  { id: 'cat-fixas', name: 'Fixas', type: 'expense', color: '#0099ff', defaultDay: 1, monthlyBudget: 17013.90 },
  { id: 'cat-alim', name: 'Alimentação', type: 'expense', color: '#ffb700', defaultDay: 5, monthlyBudget: 9368.83 },
  { id: 'cat-carro', name: 'Carro', type: 'expense', color: '#ef4444', defaultDay: 10, monthlyBudget: 2658.56 },
  { id: 'cat-moradia', name: 'Moradia', type: 'expense', color: '#8b5cf6', defaultDay: 15, monthlyBudget: 2326.84 },
  { id: 'cat-educ', name: 'Educação', type: 'expense', color: '#10b981', defaultDay: 20, monthlyBudget: 876.56 },
  { id: 'cat-fam', name: 'Familia', type: 'expense', color: '#f59e0b', defaultDay: 8, monthlyBudget: 500.00 },
  { id: 'cat-lazer', name: 'Lazer', type: 'expense', color: '#3b82f6', defaultDay: 12, monthlyBudget: 445.99 },
  { id: 'cat-sal', name: 'Salário Nildo & Cíntia', type: 'income', color: '#10b981', defaultDay: 1, monthlyBudget: 8100.00 }
];

const INITIAL_ACCOUNTS = [
  { id: 'acc-inter', name: 'Banco Inter', bankIcon: 'inter', type: 'Corrente', initialBalance: -794.62, showInDashboard: true, isDefaultPayment: false },
  { id: 'acc-nu', name: 'Nubank', bankIcon: 'nubank', type: 'Corrente', initialBalance: 8650.84, showInDashboard: true, isDefaultPayment: false },
  { id: 'acc-bb', name: 'Banco do Brasil', bankIcon: 'bb', type: 'Corrente', initialBalance: 0.00, showInDashboard: true, isDefaultPayment: false },
  { id: 'acc-bradesco', name: 'Bradesco', bankIcon: 'bradesco', type: 'Corrente', initialBalance: -1093.00, showInDashboard: true, isDefaultPayment: false },
  { id: 'acc-itau', name: 'Itaú', bankIcon: 'itau', type: 'Corrente', initialBalance: 8009.72, showInDashboard: true, isDefaultPayment: true },
  { id: 'acc-carteira', name: 'Carteira', bankIcon: 'carteira', type: 'Carteira', initialBalance: 0.00, showInDashboard: false, isDefaultPayment: false },
  { id: 'acc-c6', name: 'C6 Bank', bankIcon: 'c6', type: 'Corrente', initialBalance: 4197.78, showInDashboard: true, isDefaultPayment: false }
];

const INITIAL_CARDS = [
  { id: 'card-nu', name: 'Nubank', bankIcon: 'nubank', network: 'mastercard', limit: 15000, accountId: 'acc-nu', closingDay: 10, dueDay: 17, isPrincipal: true },
  { id: 'card-itau', name: 'Itaú', bankIcon: 'itau', network: 'mastercard', limit: 6000, accountId: 'acc-itau', closingDay: 2, dueDay: 10, isPrincipal: false },
  { id: 'card-inter', name: 'Inter', bankIcon: 'inter', network: 'mastercard', limit: 5000, accountId: 'acc-inter', closingDay: 10, dueDay: 17, isPrincipal: false },
  { id: 'card-mp', name: 'Mercado Pago', bankIcon: 'mercadopago', network: 'mastercard', limit: 2100, accountId: 'acc-nu', closingDay: 25, dueDay: 20, isPrincipal: false }
];

const INITIAL_TRANSACTIONS = [
  { id: 't1', description: 'Recebimento Itaú', amount: 8683.32, date: '2026-01-05', type: 'income', categoryId: 'cat-sal', accountId: 'acc-itau', status: 'paid' },
  { id: 't2', description: 'Depósito Nubank', amount: 2400.00, date: '2026-01-06', type: 'income', categoryId: 'cat-sal', accountId: 'acc-nu', status: 'paid' },
  { id: 't3', description: 'Entrada Carteira', amount: 1270.00, date: '2026-01-10', type: 'income', categoryId: 'cat-sal', accountId: 'acc-carteira', status: 'paid' },
  { id: 't4', description: 'Despesa Banco Inter', amount: 140.00, date: '2026-01-08', type: 'expense', categoryId: 'cat-carro', accountId: 'acc-inter', status: 'paid' },
  { id: 't5', description: 'Despesa Nubank', amount: 1772.73, date: '2026-01-12', type: 'expense', categoryId: 'cat-alim', accountId: 'acc-nu', status: 'paid' },
  { id: 't6', description: 'Despesa Bradesco', amount: 218.60, date: '2026-01-14', type: 'expense', categoryId: 'cat-moradia', accountId: 'acc-bradesco', status: 'paid' },
  { id: 't7', description: 'Despesa Itaú', amount: 1868.41, date: '2026-01-15', type: 'expense', categoryId: 'cat-fixas', accountId: 'acc-itau', status: 'paid' },
  
  // Transações de Cartão de Crédito
  { id: 't-c1', description: 'Mercado Nubank', amount: 564.06, date: '2026-01-04', type: 'card_expense', categoryId: 'cat-alim', cardId: 'card-nu', invoiceMonth: '2026-01', status: 'paid' },
  { id: 't-c2', description: 'Restaurante Itaú', amount: 108.33, date: '2026-01-05', type: 'card_expense', categoryId: 'cat-lazer', cardId: 'card-itau', invoiceMonth: '2026-01', status: 'paid' },
  { id: 't-c3', description: 'Compra Eletrônicos', amount: 203.67, date: '2026-01-10', type: 'card_expense', categoryId: 'cat-lazer', cardId: 'card-inter', invoiceMonth: '2026-01', status: 'pending' },
  { id: 't-c4', description: 'Combustível MP', amount: 140.00, date: '2026-01-18', type: 'card_expense', categoryId: 'cat-carro', cardId: 'card-mp', invoiceMonth: '2026-01', status: 'pending' }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // MODAIS E FORMULÁRIOS
  const [showTxModal, setShowTxModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showPayInvoiceModal, setShowPayInvoiceModal] = useState(false);
  const [selectedCardForPay, setSelectedCardForPay] = useState(null);

  // ESTADOS LOCAIS PERSISTENTES
  const [categories, setCategories] = useState(() => {
    const s = localStorage.getItem('mf_categories');
    return s ? JSON.parse(s) : INITIAL_CATEGORIES;
  });
  const [accounts, setAccounts] = useState(() => {
    const s = localStorage.getItem('mf_accounts');
    return s ? JSON.parse(s) : INITIAL_ACCOUNTS;
  });
  const [cards, setCards] = useState(() => {
    const s = localStorage.getItem('mf_cards');
    return s ? JSON.parse(s) : INITIAL_CARDS;
  });
  const [transactions, setTransactions] = useState(() => {
    const s = localStorage.getItem('mf_transactions');
    return s ? JSON.parse(s) : INITIAL_TRANSACTIONS;
  });

  // ESTADO DE EDIÇÃO DE TRANSAÇÃO
  const [editingTxId, setEditingTxId] = useState(null);
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // NOVO: VISUALIZAÇÃO CALENDÁRIO (MENSAL x ANUAL) & FILTROS DE ANÁLISES
  const [calendarView, setCalendarView] = useState('annual'); // 'annual' | 'monthly'
  const [calendarMonthIndex, setCalendarMonthIndex] = useState(0); // 0 = Jan
  const [analyticsFilter, setAnalyticsFilter] = useState('all'); // 'all' | 'expense' | 'income'

  // FILTROS TELA TRANSAÇÕES
  const [txSearch, setTxSearch] = useState('');
  const [txTypeFilter, setTxTypeFilter] = useState('all');
  const [txAccountFilter, setTxAccountFilter] = useState('all');
  const [txStatusFilter, setTxStatusFilter] = useState('all');

  // IMPORTAÇÃO CSV ARQUIVO LOCAL
  const [importPreview, setImportPreview] = useState([]);
  const [importTargetAccount, setImportTargetAccount] = useState(INITIAL_ACCOUNTS[0]?.id || '');

  // FORMULÁRIO TRANSAÇÃO
  const [txForm, setTxForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    date: '2026-01-15',
    categoryId: INITIAL_CATEGORIES[0]?.id || '',
    accountId: INITIAL_ACCOUNTS[0]?.id || '',
    toAccountId: INITIAL_ACCOUNTS[1]?.id || '',
    cardId: INITIAL_CARDS[0]?.id || '',
    installments: 1,
    status: 'paid'
  });

  // FORMULÁRIO CONTA
  const [accForm, setAccForm] = useState({
    name: '',
    bankIcon: 'itau',
    type: 'Corrente',
    initialBalance: '',
    isDefaultPayment: false,
    showInDashboard: true
  });

  // FORMULÁRIO CARTÃO
  const [cardForm, setCardForm] = useState({
    name: '',
    bankIcon: 'nubank',
    network: 'mastercard',
    limit: '',
    accountId: INITIAL_ACCOUNTS[0]?.id || '',
    closingDay: 10,
    dueDay: 17,
    isPrincipal: false
  });

  // FORMULÁRIO CATEGORIA
  const [catForm, setCatForm] = useState({
    name: '',
    type: 'expense',
    color: '#0099ff',
    monthlyBudget: ''
  });

  // PAGAMENTO DE FATURA FORM
  const [payAccountTarget, setPayAccountTarget] = useState(INITIAL_ACCOUNTS[0]?.id || '');

  // PERSISTÊNCIA LOCALSTORAGE
  useEffect(() => { localStorage.setItem('mf_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('mf_accounts', JSON.stringify(accounts)); }, [accounts]);
  useEffect(() => { localStorage.setItem('mf_cards', JSON.stringify(cards)); }, [cards]);
  useEffect(() => { localStorage.setItem('mf_transactions', JSON.stringify(transactions)); }, [transactions]);

  // ==========================================
  // CÁLCULOS COMPLETOS DE CONTAS BANCÁRIAS (`04.png`)
  // ==========================================
  const calculatedAccounts = useMemo(() => {
    return accounts.map(acc => {
      let income = 0;
      let expense = 0;
      let transfCred = 0;
      let transfDeb = 0;

      let prevIncome = 0;
      let prevExpense = 0;

      transactions.forEach(tx => {
        const val = parseFloat(tx.amount || 0);

        if (tx.status === 'paid') {
          if (tx.type === 'income' && tx.accountId === acc.id) income += val;
          if (tx.type === 'expense' && tx.accountId === acc.id) expense += val;
          if (tx.type === 'transfer' && tx.toAccountId === acc.id) transfCred += val;
          if (tx.type === 'transfer' && tx.accountId === acc.id) transfDeb += val;
        }

        // Previsto (inclui pendentes)
        if (tx.type === 'income' && tx.accountId === acc.id) prevIncome += val;
        if (tx.type === 'expense' && tx.accountId === acc.id) prevExpense += val;
        if (tx.type === 'transfer' && tx.toAccountId === acc.id) prevIncome += val;
        if (tx.type === 'transfer' && tx.accountId === acc.id) prevExpense += val;
      });

      const initial = parseFloat(acc.initialBalance || 0);
      const currentBalance = initial + income - expense + transfCred - transfDeb;
      const predictedBalance = initial + prevIncome - prevExpense;

      return {
        ...acc,
        income,
        expense,
        transfCred,
        transfDeb,
        currentBalance,
        predictedBalance
      };
    });
  }, [accounts, transactions]);

  // TOTALIZADORES DAS CONTAS (`04.png` FOOTER)
  const totalAccountMetrics = useMemo(() => {
    const totalIncome = calculatedAccounts.reduce((sum, a) => sum + a.income, 0);
    const totalExpense = calculatedAccounts.reduce((sum, a) => sum + a.expense, 0);
    const totalCurrent = calculatedAccounts.reduce((sum, a) => sum + a.currentBalance, 0);
    const totalPredicted = calculatedAccounts.reduce((sum, a) => sum + a.predictedBalance, 0);
    return { totalIncome, totalExpense, totalCurrent, totalPredicted };
  }, [calculatedAccounts]);

  // ==========================================
  // CÁLCULOS COMPLETOS DE CARTÕES DE CRÉDITO (`02.png`)
  // ==========================================
  const calculatedCards = useMemo(() => {
    return cards.map(card => {
      const cardTxs = transactions.filter(t => t.cardId === card.id && t.type === 'card_expense');
      
      const openInvoiceAmount = cardTxs.filter(t => t.status === 'pending').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
      const paidInvoiceAmount = cardTxs.filter(t => t.status === 'paid').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
      
      const availableLimit = Math.max(0, parseFloat(card.limit || 0) - openInvoiceAmount);
      
      let status = 'Aberta';
      if (openInvoiceAmount === 0 && paidInvoiceAmount > 0) status = 'Paga';
      else if (card.closingDay <= 10) status = 'Fechada';

      return {
        ...card,
        openInvoiceAmount,
        paidInvoiceAmount,
        availableLimit,
        status
      };
    });
  }, [cards, transactions]);

  const totalCardMetrics = useMemo(() => {
    const totalAvailable = calculatedCards.reduce((sum, c) => sum + c.availableLimit, 0);
    const totalOpenInvoices = calculatedCards.reduce((sum, c) => sum + c.openInvoiceAmount, 0);
    return { totalAvailable, totalOpenInvoices };
  }, [calculatedCards]);

  // HANDLERS TRANSAÇÕES
  const handleSaveTransaction = (e) => {
    e.preventDefault();
    if (!txForm.description || !txForm.amount) return;

    const val = parseFloat(txForm.amount);
    const inst = parseInt(txForm.installments) || 1;

    if (editingTxId) {
      setTransactions(transactions.map(t => t.id === editingTxId ? {
        ...t,
        description: txForm.description,
        amount: val,
        date: txForm.date,
        type: txForm.type,
        categoryId: txForm.categoryId,
        accountId: txForm.accountId,
        toAccountId: txForm.toAccountId,
        cardId: txForm.cardId,
        status: txForm.status
      } : t));
      setEditingTxId(null);
    } else if (txForm.type === 'card_expense' && inst > 1) {
      const newTxs = [];
      const instVal = val / inst;
      for (let i = 0; i < inst; i++) {
        newTxs.push({
          id: 't-' + Date.now() + '-' + i,
          description: `${txForm.description} (${i + 1}/${inst})`,
          amount: instVal,
          date: txForm.date,
          type: 'card_expense',
          categoryId: txForm.categoryId,
          cardId: txForm.cardId,
          invoiceMonth: `2026-0${(i % 12) + 1}`,
          status: 'pending'
        });
      }
      setTransactions([...transactions, ...newTxs]);
    } else {
      setTransactions([
        ...transactions,
        {
          id: 't-' + Date.now(),
          description: txForm.description,
          amount: val,
          date: txForm.date,
          type: txForm.type,
          categoryId: txForm.categoryId,
          accountId: txForm.accountId,
          toAccountId: txForm.toAccountId,
          cardId: txForm.cardId,
          status: txForm.status
        }
      ]);
    }

    setShowTxModal(false);
    resetTxForm();
  };

  const resetTxForm = () => {
    setEditingTxId(null);
    setTxForm({
      description: '',
      amount: '',
      type: 'expense',
      date: '2026-01-15',
      categoryId: categories[0]?.id || '',
      accountId: accounts[0]?.id || '',
      toAccountId: accounts[1]?.id || '',
      cardId: cards[0]?.id || '',
      installments: 1,
      status: 'paid'
    });
  };

  const openEditTxModal = (tx) => {
    setEditingTxId(tx.id);
    setTxForm({
      description: tx.description,
      amount: tx.amount,
      type: tx.type,
      date: tx.date,
      categoryId: tx.categoryId || categories[0]?.id || '',
      accountId: tx.accountId || accounts[0]?.id || '',
      toAccountId: tx.toAccountId || accounts[1]?.id || '',
      cardId: tx.cardId || cards[0]?.id || '',
      installments: 1,
      status: tx.status || 'paid'
    });
    setShowTxModal(true);
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    if (!accForm.name) return;
    
    let updatedAccounts = [...accounts];
    if (accForm.isDefaultPayment) {
      updatedAccounts = updatedAccounts.map(a => ({ ...a, isDefaultPayment: false }));
    }

    if (editingAccountId) {
      setAccounts(updatedAccounts.map(a => a.id === editingAccountId ? {
        ...a,
        name: accForm.name,
        bankIcon: accForm.bankIcon,
        type: accForm.type,
        initialBalance: parseFloat(accForm.initialBalance || 0),
        isDefaultPayment: accForm.isDefaultPayment,
        showInDashboard: accForm.showInDashboard
      } : a));
      setEditingAccountId(null);
    } else {
      setAccounts([
        ...updatedAccounts,
        {
          id: 'acc-' + Date.now(),
          name: accForm.name,
          bankIcon: accForm.bankIcon,
          type: accForm.type,
          initialBalance: parseFloat(accForm.initialBalance || 0),
          isDefaultPayment: accForm.isDefaultPayment,
          showInDashboard: accForm.showInDashboard
        }
      ]);
    }
    setShowAccountModal(false);
    resetAccForm();
  };

  const resetAccForm = () => {
    setEditingAccountId(null);
    setAccForm({ name: '', bankIcon: 'itau', type: 'Corrente', initialBalance: '', isDefaultPayment: false, showInDashboard: true });
  };

  const openEditAccountModal = (acc) => {
    setEditingAccountId(acc.id);
    setAccForm({
      name: acc.name,
      bankIcon: acc.bankIcon,
      type: acc.type || 'Corrente',
      initialBalance: acc.initialBalance || 0,
      isDefaultPayment: acc.isDefaultPayment || false,
      showInDashboard: acc.showInDashboard !== undefined ? acc.showInDashboard : true
    });
    setShowAccountModal(true);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!cardForm.name || !cardForm.limit) return;
    setCards([
      ...cards,
      {
        id: 'card-' + Date.now(),
        name: cardForm.name,
        bankIcon: cardForm.bankIcon,
        network: cardForm.network,
        limit: parseFloat(cardForm.limit),
        accountId: cardForm.accountId,
        closingDay: parseInt(cardForm.closingDay),
        dueDay: parseInt(cardForm.dueDay),
        isPrincipal: cardForm.isPrincipal
      }
    ]);
    setShowCardModal(false);
    setCardForm({ name: '', bankIcon: 'nubank', network: 'mastercard', limit: '', accountId: accounts[0]?.id || '', closingDay: 10, dueDay: 17, isPrincipal: false });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!catForm.name) return;

    if (editingCategoryId) {
      setCategories(categories.map(c => c.id === editingCategoryId ? {
        ...c,
        name: catForm.name,
        type: catForm.type,
        color: catForm.color,
        monthlyBudget: parseFloat(catForm.monthlyBudget || 0)
      } : c));
      setEditingCategoryId(null);
    } else {
      setCategories([
        ...categories,
        {
          id: 'cat-' + Date.now(),
          name: catForm.name,
          type: catForm.type,
          color: catForm.color,
          monthlyBudget: parseFloat(catForm.monthlyBudget || 0),
          defaultDay: 1
        }
      ]);
    }
    setShowCategoryModal(false);
    resetCatForm();
  };

  const resetCatForm = () => {
    setEditingCategoryId(null);
    setCatForm({ name: '', type: 'expense', color: '#0099ff', monthlyBudget: '' });
  };

  const openEditCategoryModal = (cat) => {
    setEditingCategoryId(cat.id);
    setCatForm({
      name: cat.name,
      type: cat.type,
      color: cat.color,
      monthlyBudget: cat.monthlyBudget || ''
    });
    setShowCategoryModal(true);
  };

  // EXPORTAÇÕES RELATÓRIOS (EXCEL/CSV & PDF)
  const handleExportCSV = () => {
    try {
      const headers = ["ID", "Data", "Descrição", "Tipo", "Valor (R$)", "Status", "Categoria", "Conta / Cartão"];
      const rows = transactions.map(t => {
        const cat = categories.find(c => c.id === t.categoryId)?.name || (t.type === 'transfer' ? 'Transferência' : 'Geral');
        const acc = accounts.find(a => a.id === t.accountId)?.name || cards.find(c => c.id === t.cardId)?.name || 'N/A';
        const formattedAmount = (t.amount || 0).toFixed(2).replace('.', ',');
        return [
          t.id,
          t.date,
          `"${(t.description || '').replace(/"/g, '""')}"`,
          t.type === 'income' ? 'Receita' : t.type === 'expense' ? 'Despesa' : t.type === 'card_expense' ? 'Despesa Cartão' : 'Transferência',
          `"${formattedAmount}"`,
          t.status === 'paid' ? 'Pago' : 'Pendente',
          `"${cat.replace(/"/g, '""')}"`,
          `"${acc.replace(/"/g, '""')}"`
        ];
      });
      
      // \uFEFF insere o BOM UTF-8 para o Excel reconhecer os acentos do português e o ponto-e-vírgula (;) separa colunas no Excel BR
      const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map(e => e.join(";"))].join("\r\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Relatorio_Financeiro_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      console.error("Erro ao gerar CSV:", err);
    }
  };

  const handleExportPDF = () => {
    try {
      window.print();
    } catch (err) {
      console.error("Erro ao abrir impressão:", err);
    }
  };

  // PAGAMENTO DE FATURA DO CARTÃO DE CRÉDITO
  const handlePayInvoice = (e) => {
    e.preventDefault();
    if (!selectedCardForPay) return;

    const invoiceVal = selectedCardForPay.openInvoiceAmount;
    if (invoiceVal <= 0) return;

    const paymentTx = {
      id: 't-pay-' + Date.now(),
      description: `Pagamento Fatura ${selectedCardForPay.name}`,
      amount: invoiceVal,
      date: '2026-01-17',
      type: 'expense',
      categoryId: categories[0]?.id || '',
      accountId: payAccountTarget,
      status: 'paid'
    };

    const updatedTxs = transactions.map(t => {
      if (t.cardId === selectedCardForPay.id && t.type === 'card_expense' && t.status === 'pending') {
        return { ...t, status: 'paid' };
      }
      return t;
    });

    setTransactions([...updatedTxs, paymentTx]);
    setShowPayInvoiceModal(false);
    setSelectedCardForPay(null);
  };

  const handleReopenInvoice = (cardId) => {
    setTransactions(transactions.map(t => {
      if (t.cardId === cardId && t.type === 'card_expense') {
        return { ...t, status: 'pending' };
      }
      return t;
    }));
  };

  const toggleTxStatus = (id) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, status: t.status === 'paid' ? 'pending' : 'paid' } : t));
  };

  const deleteTx = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter(a => a.id !== id));
  };

  // SIMULAR CARREGAMENTO ARQUIVO CSV/OFX
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const mockRows = [
      { description: 'Supermercado Importado', amount: 345.90, date: '2026-01-14', type: 'expense' },
      { description: 'PIX Recebido Cliente', amount: 1500.00, date: '2026-01-15', type: 'income' },
      { description: 'Farmácia Droga Raia', amount: 89.50, date: '2026-01-16', type: 'expense' }
    ];
    setImportPreview(mockRows);
  };

  const handleConfirmImport = () => {
    const importedTxs = importPreview.map((row, idx) => ({
      id: 'imp-' + Date.now() + '-' + idx,
      description: row.description,
      amount: row.amount,
      date: row.date,
      type: row.type,
      categoryId: categories[0]?.id || '',
      accountId: importTargetAccount,
      status: 'paid'
    }));

    setTransactions([...transactions, ...importedTxs]);
    setImportPreview([]);
    setShowImportModal(false);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'accounts', label: 'Contas Bancárias', icon: 'bank' },
    { id: 'transactions', label: 'Transações', icon: 'tx' },
    { id: 'cards', label: 'Cartões de Crédito', icon: 'card' },
    { id: 'budgets', label: 'Orçamentos', icon: 'percent' },
    { id: 'analytics', label: 'Gráficos & Análises', icon: 'chart' },
    { id: 'calendar', label: 'Calendário Anual', icon: 'calendar' },
    { id: 'categories', label: 'Categorias', icon: 'tag' },
    { id: 'reports', label: 'Relatórios', icon: 'report' }
  ];

  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#f4f6f8] text-slate-800'} transition-colors duration-200 flex font-sans text-xs sm:text-sm`}>
      <style>{`
        @media print {
          aside, header, .no-print, button, input, select {
            display: none !important;
          }
          body, main, #root {
            background: white !important;
            color: black !important;
            height: auto !important;
            overflow: visible !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .printable-card {
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* SIDEBAR EXPANSÍVEL */}
      <aside className={`${sidebarExpanded ? 'w-56 sm:w-60' : 'w-16 sm:w-16'} ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'} border-r flex flex-col justify-between py-4 transition-all duration-300 flex-shrink-0 z-20`}>
        <div className="flex flex-col gap-6 w-full px-2">
          
          {/* HEADER SIDEBAR */}
          <div className="flex items-center justify-between px-2">
            {sidebarExpanded ? (
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                <div className="flex items-end gap-0.5 h-6">
                  <span className="w-1.5 h-3 bg-emerald-500 rounded-t-sm" />
                  <span className="w-1.5 h-5 bg-amber-400 rounded-t-sm" />
                  <span className="w-1.5 h-4 bg-blue-500 rounded-t-sm" />
                  <span className="w-1.5 h-6 bg-red-500 rounded-t-sm" />
                </div>
                <span className="font-extrabold text-sm tracking-tight text-blue-600 dark:text-blue-400">
                  minhas<span className="text-slate-800 dark:text-slate-100">finanças</span>
                </span>
              </div>
            ) : (
              <div className="mx-auto cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                <div className="flex items-end gap-0.5 h-6">
                  <span className="w-1.5 h-3 bg-emerald-500 rounded-t-sm" />
                  <span className="w-1.5 h-5 bg-amber-400 rounded-t-sm" />
                  <span className="w-1.5 h-4 bg-blue-500 rounded-t-sm" />
                </div>
              </div>
            )}

            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className={`p-1.5 rounded-lg border text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ${
                darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50'
              }`}
              title={sidebarExpanded ? "Recolher menu" : "Expandir menu"}
            >
              <Icon name={sidebarExpanded ? 'chevron-left' : 'chevron-right'} className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 w-full">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={!sidebarExpanded ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-500 text-white shadow-md font-bold'
                    : darkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800 font-medium'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100 font-medium'
                }`}
              >
                <Icon name={item.icon} className="w-5 h-5 flex-shrink-0" />
                {sidebarExpanded && <span className="truncate text-xs">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="px-2 w-full">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center justify-center gap-3 py-2.5 rounded-xl transition-colors ${
              darkMode ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Icon name={darkMode ? 'sun' : 'moon'} className="w-5 h-5 flex-shrink-0" />
            {sidebarExpanded && <span className="font-bold text-xs">{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>}
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* TOP HEADER */}
        <header className={`h-14 border-b ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} px-6 flex items-center justify-between flex-shrink-0`}>
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm uppercase tracking-wider text-slate-500">
              {menuItems.find(m => m.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${
              darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              <Icon name="search" className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Pesquisar..."
                value={txSearch}
                onChange={(e) => setTxSearch(e.target.value)}
                className="bg-transparent border-none focus:outline-none w-32"
              />
            </div>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${
              darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <button className="text-slate-400 hover:text-slate-700">‹</button>
              <span>Janeiro 2026</span>
              <button className="text-slate-400 hover:text-slate-700">›</button>
            </div>

            <button
              onClick={() => { resetTxForm(); setShowTxModal(true); }}
              className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center font-bold shadow transition-transform active:scale-95"
              title="Nova Transação"
            >
              <Icon name="plus" className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 border-l pl-3 border-slate-200 dark:border-slate-800">
              <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px]">P</div>
              <span className="font-bold text-xs hidden md:inline">Pessoal</span>
            </div>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* 1. DASHBOARD (`01.png`) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* TIMELINE */}
                <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
                  <div className="space-y-3 relative pl-6 border-l-2 border-blue-500">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Inicial</div>
                      <div className="text-sm font-extrabold text-slate-600 dark:text-slate-400">R$ 9.610,69</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-blue-500 font-bold uppercase">Saldo Atual</div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(totalAccountMetrics.totalCurrent)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Previsto</div>
                      <div className="text-sm font-extrabold text-slate-600 dark:text-slate-400">{formatCurrency(totalAccountMetrics.totalPredicted)}</div>
                    </div>
                  </div>
                </div>

                {/* RANKING CATEGORIAS */}
                <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-3`}>
                  <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">Ranking categorias</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Fixas', perc: 40.3, color: '#0099ff' },
                      { name: 'Alimentação', perc: 21.5, color: '#ffb700' },
                      { name: 'Carro', perc: 17.0, color: '#ef4444' },
                      { name: 'Moradia', perc: 12.2, color: '#8b5cf6' }
                    ].map(item => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                          <span className="text-slate-400">{item.perc}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${item.perc}%`, backgroundColor: item.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MIA & ORÇAMENTOS */}
                <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 flex items-center gap-2">
                    <Icon name="spark" className="w-5 h-5 text-blue-500" />
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Como posso ajudar você hoje?</span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-xs text-slate-500 uppercase">Orçamentos de despesas</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-200">Delivery</span>
                        <span className="font-black text-emerald-500">R$ 519,75 (35%)</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-200">Filhas</span>
                        <span className="font-black text-purple-500">R$ 4.960,00 (24%)</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* KPIS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-1`}>
                  <span className="text-[10px] font-bold text-blue-500 uppercase">Saldo nas contas</span>
                  <div className="text-xl font-black text-blue-600">{formatCurrency(totalAccountMetrics.totalCurrent)}</div>
                  <span className="text-[10px] text-blue-400 font-semibold">↘ 48% vs. mês anterior</span>
                </div>

                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-1`}>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Total recebido</span>
                  <div className="text-xl font-black text-emerald-600">{formatCurrency(totalAccountMetrics.totalIncome)}</div>
                  <span className="text-[10px] text-emerald-500 font-semibold">↗ 95% vs. mês anterior</span>
                </div>

                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-1`}>
                  <span className="text-[10px] font-bold text-rose-500 uppercase">Total gasto</span>
                  <div className="text-xl font-black text-rose-600">{formatCurrency(totalAccountMetrics.totalExpense)}</div>
                  <span className="text-[10px] text-rose-500 font-semibold">↘ 81% vs. mês anterior</span>
                </div>

                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-1`}>
                  <span className="text-[10px] font-bold text-purple-500 uppercase">Total faturas</span>
                  <div className="text-xl font-black text-purple-600">{formatCurrency(totalCardMetrics.totalOpenInvoices)}</div>
                  <span className="text-[10px] text-purple-400 font-semibold">↘ 42% vs. mês anterior</span>
                </div>
              </div>

              {/* CONTAS & ROSQUINHA */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-3`}>
                  <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">Contas Bancárias</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold">
                          <th className="pb-2">Descrição</th>
                          <th className="pb-2 text-right">Saldo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {calculatedAccounts.filter(a => a.showInDashboard).map(acc => (
                          <tr key={acc.id}>
                            <td className="py-2.5 font-bold flex items-center gap-2">
                              <BankLogo bankKeyOrId={acc.bankIcon} className="w-5 h-5" />
                              <span>{acc.name}</span>
                            </td>
                            <td className={`py-2.5 text-right font-bold ${acc.currentBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {formatCurrency(acc.currentBalance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm flex flex-col items-center justify-between`}>
                  <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 w-full text-left">Despesas por recorrência</h3>

                  <CustomDonutChart
                    totalLabel="Total Gasto"
                    totalValue={totalAccountMetrics.totalExpense || 48134.66}
                    data={[
                      { name: 'Fixas', value: 22000, color: '#2563eb' },
                      { name: 'Parceladas', value: 12000, color: '#f59e0b' },
                      { name: 'Variáveis', value: 14134.66, color: '#ef4444' }
                    ]}
                  />
                </div>
              </div>

            </div>
          )}

          {/* 2. CONTAS BANCÁRIAS (`04.png`) */}
          {activeTab === 'accounts' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4 max-w-7xl mx-auto`}>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-base">Contas Bancárias</h3>
                <button
                  onClick={() => { resetAccForm(); setShowAccountModal(true); }}
                  className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Icon name="plus" className="w-4 h-4" />
                  <span>Nova Conta</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold">
                      <th className="pb-3">Descrição</th>
                      <th className="pb-3">Categoria</th>
                      <th className="pb-3 text-right">Saldo inicial</th>
                      <th className="pb-3 text-right">Receitas</th>
                      <th className="pb-3 text-right">Despesas</th>
                      <th className="pb-3 text-right">Transf. cred.</th>
                      <th className="pb-3 text-right">Transf. deb.</th>
                      <th className="pb-3 text-right">Saldo</th>
                      <th className="pb-3 text-right">Previsto</th>
                      <th className="pb-3 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {calculatedAccounts.map(acc => (
                      <tr key={acc.id} className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                        <td className="py-3 font-bold flex items-center gap-2.5">
                          <BankLogo bankKeyOrId={acc.bankIcon} className="w-6 h-6" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span>{acc.name}</span>
                              {acc.isDefaultPayment && (
                                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-[9px] font-black">
                                  Padrão
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 font-medium text-slate-500">{acc.type || 'Corrente'}</td>
                        <td className={`py-3 text-right font-medium ${acc.initialBalance < 0 ? 'text-rose-500' : 'text-slate-600 dark:text-slate-300'}`}>
                          {formatCurrency(acc.initialBalance)}
                        </td>
                        <td className="py-3 text-right font-medium text-slate-600 dark:text-slate-300">{formatCurrency(acc.income)}</td>
                        <td className="py-3 text-right font-medium text-slate-600 dark:text-slate-300">{formatCurrency(acc.expense)}</td>
                        <td className="py-3 text-right font-medium text-slate-600 dark:text-slate-300">{formatCurrency(acc.transfCred)}</td>
                        <td className="py-3 text-right font-medium text-slate-600 dark:text-slate-300">{formatCurrency(acc.transfDeb)}</td>
                        <td className={`py-3 text-right font-black ${acc.currentBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatCurrency(acc.currentBalance)}
                        </td>
                        <td className={`py-3 text-right font-bold ${acc.predictedBalance >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {formatCurrency(acc.predictedBalance)}
                        </td>
                        <td className="py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => openEditAccountModal(acc)} className="text-slate-400 hover:text-blue-500" title="Editar Conta">
                              <Icon name="edit" className="w-4 h-4" />
                            </button>
                            <input
                              type="checkbox"
                              title="Exibir no Dashboard"
                              checked={acc.showInDashboard}
                              onChange={() => setAccounts(accounts.map(a => a.id === acc.id ? { ...a, showInDashboard: !a.showInDashboard } : a))}
                              className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                            />
                            <button onClick={() => deleteAccount(acc.id)} className="text-slate-400 hover:text-rose-500" title="Excluir Conta">
                              <Icon name="trash" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* RODAPÉ RESUMO DE CONTAS (`04.png`) */}
              <div className="flex flex-wrap items-center justify-end gap-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Efetivadas: {formatCurrency(totalAccountMetrics.totalIncome)}
                </span>
                <span className="flex items-center gap-1.5 text-rose-600">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Efetivadas: {formatCurrency(totalAccountMetrics.totalExpense)}
                </span>
                <span className="flex items-center gap-1.5 text-blue-600">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Saldo: {formatCurrency(totalAccountMetrics.totalCurrent)}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  Previsto: {formatCurrency(totalAccountMetrics.totalPredicted)}
                </span>
              </div>
            </div>
          )}

          {/* 3. TRANSAÇÕES */}
          {activeTab === 'transactions' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4 max-w-7xl mx-auto`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-base">Transações Lançadas</h3>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setShowImportModal(true)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Icon name="upload" className="w-4 h-4" />
                    <span>Importar Extrato (CSV/OFX)</span>
                  </button>
                  <button
                    onClick={() => { resetTxForm(); setShowTxModal(true); }}
                    className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Icon name="plus" className="w-4 h-4" />
                    <span>Nova Transação</span>
                  </button>
                </div>
              </div>

              {/* BARRA DE FILTROS */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 overflow-x-auto">
                  {[
                    { id: 'all', label: 'Todas' },
                    { id: 'income', label: 'Receitas' },
                    { id: 'expense', label: 'Despesas' },
                    { id: 'card_expense', label: 'Cartão' },
                    { id: 'transfer', label: 'Transferências' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTxTypeFilter(t.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        txTypeFilter === t.id
                          ? 'bg-blue-500 text-white'
                          : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={txStatusFilter}
                    onChange={(e) => setTxStatusFilter(e.target.value)}
                    className="px-3 py-1 rounded-lg border text-xs bg-transparent dark:border-slate-700"
                  >
                    <option value="all">Todos Status</option>
                    <option value="paid">Pagos / Efetivados</option>
                    <option value="pending">Pendentes</option>
                  </select>

                  <select
                    value={txAccountFilter}
                    onChange={(e) => setTxAccountFilter(e.target.value)}
                    className="px-3 py-1 rounded-lg border text-xs bg-transparent dark:border-slate-700"
                  >
                    <option value="all">Todas as Contas</option>
                    {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
              </div>

              {/* TABELA DE TRANSAÇÕES */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold">
                      <th className="pb-3">Descrição</th>
                      <th className="pb-3">Data</th>
                      <th className="pb-3">Categoria</th>
                      <th className="pb-3">Conta / Cartão</th>
                      <th className="pb-3 text-right">Valor</th>
                      <th className="pb-3 text-center">Status</th>
                      <th className="pb-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {transactions
                      .filter(t => txTypeFilter === 'all' || t.type === txTypeFilter)
                      .filter(t => txStatusFilter === 'all' || t.status === txStatusFilter)
                      .filter(t => txAccountFilter === 'all' || t.accountId === txAccountFilter || t.cardId === txAccountFilter)
                      .filter(t => t.description.toLowerCase().includes(txSearch.toLowerCase()))
                      .map(tx => {
                        const cat = categories.find(c => c.id === tx.categoryId);
                        const acc = accounts.find(a => a.id === tx.accountId);
                        const card = cards.find(c => c.id === tx.cardId);
                        const toAcc = accounts.find(a => a.id === tx.toAccountId);

                        return (
                          <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                            <td className="py-3 font-bold">{tx.description}</td>
                            <td className="py-3 text-slate-400 font-medium">{tx.date}</td>
                            <td className="py-3 font-medium">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: (cat?.color || '#3b82f6') + '20', color: cat?.color || '#3b82f6' }}>
                                {cat?.name || (tx.type === 'transfer' ? 'Transferência' : 'Geral')}
                              </span>
                            </td>
                            <td className="py-3 font-medium text-slate-600 dark:text-slate-300">
                              {tx.type === 'card_expense' ? card?.name || 'Cartão' : tx.type === 'transfer' ? `${acc?.name || 'Origem'} ➔ ${toAcc?.name || 'Destino'}` : acc?.name || 'Conta'}
                            </td>
                            <td className={`py-3 text-right font-black ${tx.type === 'income' ? 'text-emerald-600' : tx.type === 'transfer' ? 'text-blue-600' : 'text-rose-600'}`}>
                              {tx.type === 'income' ? '+' : tx.type === 'transfer' ? '⇄ ' : '-'}{formatCurrency(tx.amount)}
                            </td>
                            <td className="py-3 text-center">
                              <button
                                onClick={() => toggleTxStatus(tx.id)}
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  tx.status === 'paid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                                }`}
                              >
                                {tx.status === 'paid' ? '✓ Pago' : '✕ Pendente'}
                              </button>
                            </td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => openEditTxModal(tx)} className="text-slate-400 hover:text-blue-500" title="Editar Transação">
                                  <Icon name="edit" className="w-4 h-4" />
                                </button>
                                <button onClick={() => deleteTx(tx.id)} className="text-slate-400 hover:text-rose-500" title="Excluir Transação">
                                  <Icon name="trash" className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. CARTÕES DE CRÉDITO (`02.png`) */}
          {activeTab === 'cards' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base">Cartões de Crédito</h3>
                <button
                  onClick={() => setShowCardModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Icon name="plus" className="w-4 h-4" />
                  <span>Novo Cartão</span>
                </button>
              </div>

              {/* GRID DE CARTÕES DE CRÉDITO (`02.png`) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculatedCards.map(card => {
                  const linkedAccount = accounts.find(a => a.id === card.accountId);

                  return (
                    <div key={card.id} className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
                      
                      {/* HEADER DO CARD */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <BankLogo bankKeyOrId={card.bankIcon} className="w-7 h-7" />
                          <div>
                            <h4 className="font-extrabold text-sm">{card.name}</h4>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{NETWORK_FLAGS[card.network]?.name}</span>
                          </div>
                        </div>

                        {card.isPrincipal && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 font-bold text-[10px]">
                            Principal
                          </span>
                        )}
                      </div>

                      {/* VALORES E BARRA DE LIMITE */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>Limite: {formatCurrency(card.limit)}</span>
                          <span className="text-rose-600">Em aberto: {formatCurrency(card.openInvoiceAmount)}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full bg-purple-600 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (card.openInvoiceAmount / card.limit) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Conta: {linkedAccount?.name || 'Nenhuma'}</span>
                          <span>Limite disp.: <strong className="text-emerald-600">{formatCurrency(card.availableLimit)}</strong></span>
                        </div>
                      </div>

                      {/* DATAS FECHAMENTO & VENCIMENTO */}
                      <div className="grid grid-cols-2 gap-2 text-center text-[10px] p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                        <div>
                          <span className="text-slate-400 block font-semibold">Fechamento</span>
                          <strong className="text-slate-700 dark:text-slate-200 font-bold">{card.closingDay}/01</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-semibold">Vencimento</span>
                          <strong className="text-slate-700 dark:text-slate-200 font-bold">{card.dueDay}/01</strong>
                        </div>
                      </div>

                      {/* FOOTER FATURA & AÇÕES (`02.png`) */}
                      <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-700">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">Fatura Parcial</span>
                          <span className="font-black text-sm text-slate-800 dark:text-slate-100">
                            {formatCurrency(card.openInvoiceAmount > 0 ? card.openInvoiceAmount : card.paidInvoiceAmount)}
                          </span>
                        </div>

                        {card.openInvoiceAmount === 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold text-[10px]">
                              ✓ Paga
                            </span>
                            <button
                              onClick={() => handleReopenInvoice(card.id)}
                              className="text-[10px] text-blue-500 hover:underline font-bold"
                            >
                              Reabrir fatura
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedCardForPay(card);
                              setShowPayInvoiceModal(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow"
                          >
                            <span>Registrar pagamento</span>
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* BARRA FIXA DE MÉTRICAS DE CARTÃO DE CRÉDITO (`02.png`) */}
              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs font-bold`}>
                <span className="text-slate-500">
                  Limite disp.: <strong className="text-emerald-600">{formatCurrency(totalCardMetrics.totalAvailable)}</strong>
                </span>
                <span className="text-slate-500">
                  Despesas no mês: <strong className="text-rose-600">{formatCurrency(totalCardMetrics.totalOpenInvoices)}</strong>
                </span>
                <span className="text-slate-500">
                  Total fatura: <strong className="text-purple-600">{formatCurrency(totalCardMetrics.totalOpenInvoices)}</strong>
                </span>
              </div>
            </div>
          )}

          {/* 5. ORÇAMENTOS (`05.png`) */}
          {activeTab === 'budgets' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4 max-w-7xl mx-auto`}>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-base">Orçamentos & Limites por Categoria</h3>
                <span className="text-xs text-slate-400">Configure o teto mensal para cada categoria</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold">
                      <th className="pb-3">Descrição ↑</th>
                      <th className="pb-3 text-right">Orçamento</th>
                      <th className="pb-3 text-right">Despesas</th>
                      <th className="pb-3 text-right">Saldo atual</th>
                      <th className="pb-3 text-center">Utilização</th>
                      <th className="pb-3 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {categories.filter(c => c.type === 'expense').map(cat => {
                      const budget = cat.monthlyBudget || 0;
                      const expense = 667; // MOCK DE GASTO ACUMULADO
                      const currentBal = budget - expense;
                      const usagePerc = budget > 0 ? Math.min(100, Math.round((expense / budget) * 100)) : 0;

                      return (
                        <tr key={cat.id}>
                          <td className="py-3 font-bold flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                            <span>{cat.name}</span>
                          </td>
                          <td className="py-3 text-right font-bold text-slate-700 dark:text-slate-200">{formatCurrency(budget)}</td>
                          <td className="py-3 text-right font-medium text-rose-600">{formatCurrency(expense)}</td>
                          <td className={`py-3 text-right font-bold ${currentBal >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{formatCurrency(currentBal)}</td>
                          <td className="py-3 text-center">
                            <div className="w-24 mx-auto space-y-1">
                              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${usagePerc > 90 ? 'bg-rose-500' : usagePerc > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                  style={{ width: `${usagePerc}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold">{usagePerc}%</span>
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <button
                              onClick={() => openEditCategoryModal(cat)}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-100"
                            >
                              Editar Orçamento
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. ANÁLISES & GRÁFICOS (`03.png`) */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* FILTROS DA TELA DE GRÁFICOS */}
              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm flex flex-wrap items-center justify-between gap-4`}>
                <h3 className="font-bold text-base">Painel de Gráficos e Indicadores</h3>

                <div className="flex items-center gap-2">
                  {[
                    { id: 'all', label: 'Todas / Ambas' },
                    { id: 'expense', label: 'Apenas Despesas' },
                    { id: 'income', label: 'Apenas Receitas' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setAnalyticsFilter(f.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        analyticsFilter === f.id
                          ? 'bg-blue-500 text-white shadow'
                          : darkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-3`}>
                  <h3 className="font-bold text-sm">Ranking por Categorias ({analyticsFilter === 'income' ? 'Receitas' : analyticsFilter === 'expense' ? 'Despesas' : 'Ambas'})</h3>
                  <CustomHorizontalBarChart
                    categories={categories.filter(c => analyticsFilter === 'all' || c.type === analyticsFilter)}
                  />
                </div>

                <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm flex flex-col items-center justify-center`}>
                  <h3 className="font-bold text-sm w-full text-left mb-4">Distribuição por Categoria</h3>
                  <CustomDonutChart
                    totalLabel="Total Filtrado"
                    totalValue={categories.filter(c => analyticsFilter === 'all' || c.type === analyticsFilter).reduce((sum, c) => sum + (c.monthlyBudget || 0), 0)}
                    data={categories
                      .filter(c => analyticsFilter === 'all' || c.type === analyticsFilter)
                      .map(c => ({ name: c.name, value: c.monthlyBudget || 100, color: c.color }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 7. CALENDÁRIO (DUAL VIEW: MENSAL + ANUAL) */}
          {activeTab === 'calendar' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4 max-w-7xl mx-auto`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-base">Calendário Financeiro</h3>

                {/* BOTÕES DE ALTERNÂNCIA DE VISÃO */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCalendarView('monthly')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      calendarView === 'monthly'
                        ? 'bg-blue-500 text-white shadow'
                        : darkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Visão Mensal (Grid)
                  </button>
                  <button
                    onClick={() => setCalendarView('annual')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      calendarView === 'annual'
                        ? 'bg-blue-500 text-white shadow'
                        : darkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Visão Anual (Planilha Excel)
                  </button>
                </div>
              </div>

              {/* VISÃO MENSAL (GRID DE DIAS) */}
              {calendarView === 'monthly' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2 text-center font-bold text-xs text-slate-400">
                    <div>DOM</div><div>SEG</div><div>TER</div><div>QUA</div><div>QUI</div><div>SEX</div><div>SÁB</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-xs">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                      const dayTxs = transactions.filter(t => parseInt(t.date?.split('-')[2]) === day);
                      const dayInvoices = cards.filter(c => c.dueDay === day);

                      return (
                        <div key={day} className={`p-2 min-h-[75px] rounded-xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'} space-y-1`}>
                          <span className="font-bold text-slate-400 text-[10px]">{day}</span>
                          
                          {dayTxs.map(t => (
                            <div key={t.id} className={`text-[9px] p-1 rounded font-bold truncate ${t.type === 'income' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'}`}>
                              {t.description}: {formatCurrency(t.amount)}
                            </div>
                          ))}

                          {dayInvoices.map(c => (
                            <div key={c.id} className="text-[9px] p-1 rounded font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 truncate">
                              Fatura {c.name}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* VISÃO ANUAL (PLANILHA EXCEL) */
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-blue-600 text-white font-bold">
                        <th className="p-2 border border-blue-500">RECEITAS</th>
                        {months.map(m => <th key={m} className="p-2 border border-blue-500 text-center">{m}</th>)}
                        <th className="p-2 border border-blue-500 text-right">ANUAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {categories.filter(c => c.type === 'income').map(cat => (
                        <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                          <td className="p-2 font-bold border dark:border-slate-700">{cat.name}</td>
                          {months.map((m, idx) => (
                            <td key={idx} className="p-2 text-center border dark:border-slate-700 font-medium text-emerald-600">
                              {formatCurrency(cat.monthlyBudget / 12)}
                            </td>
                          ))}
                          <td className="p-2 text-right border dark:border-slate-700 font-black text-emerald-700 dark:text-emerald-400">
                            {formatCurrency(cat.monthlyBudget)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-emerald-500 text-white font-black">
                        <td className="p-2 border border-emerald-600">TOTAL RECEITAS</td>
                        {months.map((m, idx) => (
                          <td key={idx} className="p-2 text-center border border-emerald-600">{formatCurrency(8100)}</td>
                        ))}
                        <td className="p-2 text-right border border-emerald-600">{formatCurrency(97200)}</td>
                      </tr>
                    </tbody>

                    <thead>
                      <tr className="bg-rose-600 text-white font-bold">
                        <th className="p-2 border border-rose-500">DESPESAS (ORDEM VENCIMENTO)</th>
                        {months.map(m => <th key={m} className="p-2 border border-rose-500 text-center">{m}</th>)}
                        <th className="p-2 border border-rose-500 text-right">ANUAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {categories
                        .filter(c => c.type === 'expense')
                        .sort((a, b) => (a.defaultDay || 1) - (b.defaultDay || 1))
                        .map(cat => (
                          <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                            <td className="p-2 font-bold border dark:border-slate-700 flex items-center gap-1.5">
                              <span className="text-slate-400 font-mono text-[9px]">{String(cat.defaultDay || 1).padStart(2, '0')}</span>
                              <span>{cat.name}</span>
                            </td>
                            {months.map((m, idx) => (
                              <td key={idx} className="p-2 text-center border dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300">
                                {formatCurrency(cat.monthlyBudget)}
                              </td>
                            ))}
                            <td className="p-2 text-right border dark:border-slate-700 font-black text-rose-600">
                              {formatCurrency(cat.monthlyBudget * 12)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 8. CATEGORIAS */}
          {activeTab === 'categories' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4 max-w-7xl mx-auto`}>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-base">Gerenciador de Categorias</h3>
                <button
                  onClick={() => { resetCatForm(); setShowCategoryModal(true); }}
                  className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Icon name="plus" className="w-4 h-4" />
                  <span>Nova Categoria</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="p-4 rounded-xl border dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                      <div>
                        <div className="font-bold text-xs">{cat.name}</div>
                        <span className="text-[10px] text-slate-400 font-semibold">{cat.type === 'income' ? 'Receita' : 'Despesa'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditCategoryModal(cat)} className="text-slate-400 hover:text-blue-500" title="Editar Categoria">
                        <Icon name="edit" className="w-4 h-4" />
                      </button>
                      <button onClick={() => setCategories(categories.filter(c => c.id !== cat.id))} className="text-slate-400 hover:text-rose-500" title="Excluir Categoria">
                        <Icon name="trash" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. RELATÓRIOS (`06.png`) */}
          {activeTab === 'reports' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm space-y-4 max-w-7xl mx-auto printable-card`}>
              {/* CABEÇALHO PARA EXPORTAÇÃO IMPRESSA/PDF */}
              <div className="hidden print:block mb-4 border-b pb-2">
                <h1 className="text-xl font-black text-slate-900">Minhas Finanças - Relatório Financeiro</h1>
                <p className="text-xs text-slate-500">Gerado em {new Date().toLocaleDateString('pt-BR')} - Detalhamento por Categoria</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-base">Relatórios de Gastos por Categoria</h3>

                {/* BOTÕES DE EXPORTAÇÃO */}
                <div className="flex gap-2 no-print">
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>Exportar Excel (.CSV)</span>
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>Exportar PDF / Imprimir</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  {categories.filter(c => c.type === 'expense').map(c => (
                    <div key={c.id} className="p-3 rounded-xl border dark:border-slate-700 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                        <span className="font-bold text-xs">{c.name}</span>
                      </div>
                      <span className="font-black text-xs">{formatCurrency(c.monthlyBudget)}</span>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-800">
                  <CustomHorizontalBarChart categories={categories.filter(c => c.type === 'expense')} />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: NOVA / EDITAR TRANSAÇÃO */}
      {showTxModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-base">{editingTxId ? 'Editar Transação' : 'Nova Transação'}</h3>
              <button onClick={() => { setShowTxModal(false); resetTxForm(); }}><Icon name="x" className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleSaveTransaction} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Descrição</label>
                <input
                  type="text"
                  required
                  value={txForm.description}
                  onChange={(e) => setTxForm({ ...txForm, description: e.target.value })}
                  className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={txForm.amount}
                    onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Data</label>
                  <input
                    type="date"
                    required
                    value={txForm.date}
                    onChange={(e) => setTxForm({ ...txForm, date: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Tipo de Transação</label>
                  <select
                    value={txForm.type}
                    onChange={(e) => setTxForm({ ...txForm, type: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                  >
                    <option value="expense">Despesa</option>
                    <option value="income">Receita</option>
                    <option value="card_expense">Despesa Cartão</option>
                    <option value="transfer">Transferência entre Contas</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Categoria</label>
                  <select
                    value={txForm.categoryId}
                    onChange={(e) => setTxForm({ ...txForm, categoryId: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                  >
                    {categories
                      .filter(c => txForm.type === 'income' ? c.type === 'income' : c.type === 'expense')
                      .map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              {txForm.type === 'transfer' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400">Conta de Origem</label>
                    <select
                      value={txForm.accountId}
                      onChange={(e) => setTxForm({ ...txForm, accountId: e.target.value })}
                      className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                    >
                      {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400">Conta de Destino</label>
                    <select
                      value={txForm.toAccountId}
                      onChange={(e) => setTxForm({ ...txForm, toAccountId: e.target.value })}
                      className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                    >
                      {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                  </div>
                </div>
              ) : txForm.type === 'card_expense' ? (
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Cartão de Crédito</label>
                  <select
                    value={txForm.cardId}
                    onChange={(e) => setTxForm({ ...txForm, cardId: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                  >
                    {cards.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Conta Bancária</label>
                  <select
                    value={txForm.accountId}
                    onChange={(e) => setTxForm({ ...txForm, accountId: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                  >
                    {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
              )}

              {txForm.type === 'card_expense' && !editingTxId && (
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Parcelamento</label>
                  <select
                    value={txForm.installments}
                    onChange={(e) => setTxForm({ ...txForm, installments: parseInt(e.target.value) })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                  >
                    {[1, 2, 3, 4, 5, 6, 10, 12].map(n => <option key={n} value={n}>{n}x</option>)}
                  </select>
                </div>
              )}

              <button type="submit" className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-bold shadow">
                {editingTxId ? 'Atualizar Transação' : 'Salvar Transação'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVA / EDITAR CONTA */}
      {showAccountModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-base">{editingAccountId ? 'Editar Conta Bancária' : 'Nova Conta Bancária'}</h3>
              <button onClick={() => { setShowAccountModal(false); resetAccForm(); }}><Icon name="x" className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Nome da Conta / Banco</label>
                <input
                  type="text"
                  required
                  value={accForm.name}
                  onChange={(e) => setAccForm({ ...accForm, name: e.target.value })}
                  className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold"
                  placeholder="Ex: Conta Corrente Itaú"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Logotipo / Banco</label>
                  <div className="flex items-center gap-2 mt-1">
                    <BankLogo bankKeyOrId={accForm.bankIcon} className="w-8 h-8" />
                    <select
                      value={accForm.bankIcon}
                      onChange={(e) => setAccForm({ ...accForm, bankIcon: e.target.value })}
                      className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                    >
                      {Object.keys(BANK_PRESETS).map(b => <option key={b} value={b}>{BANK_PRESETS[b].name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Categoria da Conta</label>
                  <select
                    value={accForm.type}
                    onChange={(e) => setAccForm({ ...accForm, type: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                  >
                    <option value="Corrente">Conta Corrente</option>
                    <option value="Investimento">Investimentos</option>
                    <option value="Poupança">Poupança</option>
                    <option value="Carteira">Carteira / Dinheiro</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Saldo Inicial (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={accForm.initialBalance}
                  onChange={(e) => setAccForm({ ...accForm, initialBalance: e.target.value })}
                  className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={accForm.isDefaultPayment}
                    onChange={(e) => setAccForm({ ...accForm, isDefaultPayment: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Definir como conta padrão para pagamento de despesas</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={accForm.showInDashboard}
                    onChange={(e) => setAccForm({ ...accForm, showInDashboard: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Exibir no resumo / Dashboard</span>
                </label>
              </div>

              <button type="submit" className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-bold shadow">
                {editingAccountId ? 'Atualizar Conta' : 'Criar Conta'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVO CARTÃO */}
      {showCardModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-base">Novo Cartão de Crédito</h3>
              <button onClick={() => setShowCardModal(false)}><Icon name="x" className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Nome do Cartão</label>
                <input
                  type="text"
                  required
                  value={cardForm.name}
                  onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                  className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold"
                  placeholder="Ex: Cartão Nubank Ultravioleta"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Logotipo do Banco</label>
                  <div className="flex items-center gap-2 mt-1">
                    <BankLogo bankKeyOrId={cardForm.bankIcon} className="w-8 h-8" />
                    <select
                      value={cardForm.bankIcon}
                      onChange={(e) => setCardForm({ ...cardForm, bankIcon: e.target.value })}
                      className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                    >
                      {Object.keys(BANK_PRESETS).map(b => <option key={b} value={b}>{BANK_PRESETS[b].name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Bandeira</label>
                  <select
                    value={cardForm.network}
                    onChange={(e) => setCardForm({ ...cardForm, network: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                  >
                    {Object.keys(NETWORK_FLAGS).map(n => <option key={n} value={n}>{NETWORK_FLAGS[n].name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Limite (R$)</label>
                  <input
                    type="number"
                    required
                    value={cardForm.limit}
                    onChange={(e) => setCardForm({ ...cardForm, limit: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Dia Fechamento</label>
                  <select
                    value={cardForm.closingDay}
                    onChange={(e) => setCardForm({ ...cardForm, closingDay: parseInt(e.target.value) })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>Dia {day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Dia Vencimento</label>
                  <select
                    value={cardForm.dueDay}
                    onChange={(e) => setCardForm({ ...cardForm, dueDay: parseInt(e.target.value) })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>Dia {day}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Conta de Pagamento Vinculada</label>
                <select
                  value={cardForm.accountId}
                  onChange={(e) => setCardForm({ ...cardForm, accountId: e.target.value })}
                  className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 text-xs font-bold"
                >
                  {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300 pt-1">
                <input
                  type="checkbox"
                  checked={cardForm.isPrincipal}
                  onChange={(e) => setCardForm({ ...cardForm, isPrincipal: e.target.checked })}
                  className="rounded text-purple-600"
                />
                <span>Marcar como Cartão Principal</span>
              </label>

              <button type="submit" className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-bold shadow">
                Salvar Cartão
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTRAR PAGAMENTO DE FATURA */}
      {showPayInvoiceModal && selectedCardForPay && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-base">Pagamento Fatura {selectedCardForPay.name}</h3>
              <button onClick={() => setShowPayInvoiceModal(false)}><Icon name="x" className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handlePayInvoice} className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Valor Total da Fatura</span>
                <div className="text-2xl font-black text-rose-600">{formatCurrency(selectedCardForPay.openInvoiceAmount)}</div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Debitar da Conta Bancária</label>
                <select
                  value={payAccountTarget}
                  onChange={(e) => setPayAccountTarget(e.target.value)}
                  className="w-full p-2.5 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold"
                >
                  {accounts.map(a => <option key={a.id} value={a.id}>{a.name} (Saldo: {formatCurrency(a.initialBalance)})</option>)}
                </select>
              </div>

              <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold shadow hover:bg-emerald-700">
                Confirmar Pagamento de Fatura
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVA / EDITAR CATEGORIA */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-base">{editingCategoryId ? 'Editar Categoria' : 'Nova Categoria'}</h3>
              <button onClick={() => { setShowCategoryModal(false); resetCatForm(); }}><Icon name="x" className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Nome da Categoria</label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Tipo</label>
                  <select
                    value={catForm.type}
                    onChange={(e) => setCatForm({ ...catForm, type: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold text-xs"
                  >
                    <option value="expense">Despesa</option>
                    <option value="income">Receita</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Orçamento / Teto (R$)</label>
                  <input
                    type="number"
                    value={catForm.monthlyBudget}
                    onChange={(e) => setCatForm({ ...catForm, monthlyBudget: e.target.value })}
                    className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Cor da Categoria</label>
                <div className="flex gap-2 pt-1">
                  {PALETTE.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCatForm({ ...catForm, color: c })}
                      className={`w-6 h-6 rounded-full transition-transform ${catForm.color === c ? 'scale-125 ring-2 ring-blue-500' : ''}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-bold shadow">
                {editingCategoryId ? 'Atualizar Categoria' : 'Criar Categoria'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: IMPORTAR OFX/CSV FUNCIONAL */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-base">Importar Extrato Bancário</h3>
              <button onClick={() => setShowImportModal(false)}><Icon name="x" className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Conta de Destino</label>
                <select
                  value={importTargetAccount}
                  onChange={(e) => setImportTargetAccount(e.target.value)}
                  className="w-full p-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700"
                >
                  {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>

              {importPreview.length === 0 ? (
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center space-y-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 relative">
                  <input
                    type="file"
                    accept=".csv,.ofx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Icon name="upload" className="w-8 h-8 text-blue-500 mx-auto" />
                  <div className="font-bold text-xs">Clique para escolher seu extrato .CSV ou .OFX</div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-emerald-600">3 transações encontradas para conciliação:</div>
                  <div className="max-h-40 overflow-y-auto space-y-1 text-xs">
                    {importPreview.map((item, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-100 dark:bg-slate-800 flex justify-between">
                        <span>{item.description}</span>
                        <strong className={item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}>
                          {formatCurrency(item.amount)}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleConfirmImport}
                    className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-bold shadow"
                  >
                    Conciliar e Importar Transações
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}