import { createGrowthApi } from './growth-domain.mjs';
import { createGrowthCloud } from './growth-cloud.mjs?v=20260818-reset-live';

const ADMIN_SESSION_KEY = 'np90_admin_session_v1';
const ADMIN_CLOUD_PASSWORD_SESSION_KEY = 'np90_admin_cloud_password_session_v1';
const ADMIN_EMAIL = '9088project@gmail.com';
const ADMIN_PASSWORD_HASH = '7045830c';
const BUSINESS_WHATSAPP = '60189490908';
const BUSINESS_PHONE_DISPLAY = '+60 18-949 0908';
const BUSINESS_EMAIL = '9088project@gmail.com';
const BUSINESS_WEBSITE = 'www.90project.online';
const LOGO_PATH = 'assets/images/logo/logo-icon-dark.jpg';

const growthApi = createGrowthApi();
const cloud = createGrowthCloud();

const statusLabels = {
  new: '未付款',
  confirmed: '未付款',
  deposit_paid: '部分付款',
  fully_paid: '已付款',
  service_completed: '已完成',
  cancelled: '已取消'
};

const statusLabelsEn = {
  new: 'Unpaid',
  confirmed: 'Unpaid',
  deposit_paid: 'Partially Paid',
  fully_paid: 'Paid',
  service_completed: 'Completed',
  cancelled: 'Cancelled'
};

const serviceTypeLabelsEn = {
  '活动餐饮': 'Event Catering',
  '包伙食': 'Meal Plan',
  '场地布置': 'Styling',
  '鸡尾酒服务': 'Canape & Cocktail',
  '其他服务': 'Other Service'
};

const menuTitleLabelsEn = {
  '菜单 / 备注': 'Menu / Notes',
  '菜单': 'Menu',
  '备注': 'Notes',
  '主食': 'Staple',
  '肉类': 'Meat',
  '海鲜': 'Seafood',
  '菜': 'Vegetables',
  '蔬菜': 'Vegetables',
  '饮料': 'Beverage',
  '甜品': 'Dessert',
  '水果': 'Fruit'
};

const statusOrder = ['new', 'deposit_paid', 'fully_paid', 'service_completed', 'cancelled'];
const CUSTOM_OPTION_VALUE = '__order_add_new__';
const orderSettingDefaults = {
  categories: ['活动餐饮', '包伙食', '场地布置', '鸡尾酒服务', '其他服务'],
  assignees: ['未分配', 'LIYAN & KS', 'Tom', 'KS']
};
const orderSettingLabels = {
  categories: { singular: '类别', empty: '还没有类别，先新增一个。' },
  assignees: { singular: '负责人', empty: '还没有负责人，先新增一个。' }
};

const state = {
  view: 'overview',
  query: '',
  status: 'all',
  dateFilter: '',
  calendarMonth: new Date(2026, 8, 1),
  cloudReady: false,
  syncState: 'loading',
  syncMessage: '同步中',
  demoMode: false
};

const els = {
  app: document.querySelector('[data-order-app]'),
  lock: document.querySelector('[data-order-lock]'),
  loginForm: document.querySelector('[data-order-login-form]'),
  loginEmail: document.querySelector('[data-order-login-email]'),
  loginPassword: document.querySelector('[data-order-login-password]'),
  loginMessage: document.querySelector('[data-order-login-message]'),
  syncStatus: document.querySelector('[data-order-sync-status]'),
  tabs: Array.from(document.querySelectorAll('[data-order-view]')),
  panels: Array.from(document.querySelectorAll('[data-order-panel]')),
  stats: document.querySelector('[data-order-stats]'),
  recentList: document.querySelector('[data-order-recent-list]'),
  allList: document.querySelector('[data-order-all-list]'),
  search: document.querySelector('[data-order-search]'),
  statusFilter: document.querySelector('[data-order-status-filter]'),
  dateChip: document.querySelector('[data-order-date-chip]'),
  calendarTitle: document.querySelector('[data-calendar-title]'),
  calendarGrid: document.querySelector('[data-calendar-grid]'),
  categoryAnalysis: document.querySelector('[data-order-category-analysis]'),
  statusAnalysis: document.querySelector('[data-order-status-analysis]'),
  monthIncome: document.querySelector('[data-order-month-income]'),
  staffAnalysis: document.querySelector('[data-order-staff-analysis]'),
  settingsStatus: document.querySelector('[data-order-settings-status]'),
  categoryPicker: document.querySelector('[data-order-category-picker]'),
  configInputs: {
    categories: document.querySelector('[data-order-config-input="categories"]'),
    assignees: document.querySelector('[data-order-config-input="assignees"]')
  },
  configLists: {
    categories: document.querySelector('[data-order-config-items="categories"]'),
    assignees: document.querySelector('[data-order-config-items="assignees"]')
  },
  sheet: document.querySelector('[data-order-sheet]'),
  form: document.querySelector('[data-order-form]'),
  formMessage: document.querySelector('[data-order-form-message]'),
  categoryDelete: document.querySelector('[data-order-category-delete]'),
  assigneeDelete: document.querySelector('[data-order-assignee-delete]'),
  print: document.querySelector('[data-order-print]')
};

const formFields = {
  id: document.querySelector('[data-order-id]'),
  customerName: document.querySelector('[data-order-field="customerName"]'),
  phone: document.querySelector('[data-order-field="phone"]'),
  eventDate: document.querySelector('[data-order-field="eventDate"]'),
  eventTime: document.querySelector('[data-order-field="eventTime"]'),
  serviceType: document.querySelector('[data-order-field="serviceType"]'),
  assignee: document.querySelector('[data-order-field="assignee"]'),
  title: document.querySelector('[data-order-field="title"]'),
  itemsSummary: document.querySelector('[data-order-field="itemsSummary"]'),
  location: document.querySelector('[data-order-field="location"]'),
  totalAmount: document.querySelector('[data-order-field="totalAmount"]'),
  paidAmount: document.querySelector('[data-order-field="paidAmount"]'),
  status: document.querySelector('[data-order-field="status"]'),
  receiptLanguage: document.querySelector('[data-order-field="receiptLanguage"]')
};

function money(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function formatMoney(value) {
  return `RM ${money(value).toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[character]);
}

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('60')) return digits;
  if (digits.startsWith('0')) return `60${digits.slice(1)}`;
  return digits;
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

function invoiceNo() {
  const date = new Date();
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('');
  return `90P-${stamp}-${String(Date.now()).slice(-5)}`;
}

function hashLocalSecret(value) {
  let hash = 2166136261;
  Array.from(String(value || '')).forEach(character => {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function isPreviewMode() {
  return /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(window.location.hostname)
    && new URLSearchParams(window.location.search).get('preview') === '1';
}

function adminCloudPassword() {
  try {
    return sessionStorage.getItem(ADMIN_CLOUD_PASSWORD_SESSION_KEY) || '';
  } catch {
    return '';
  }
}

function hasStaleAdminLogin() {
  return localStorage.getItem(ADMIN_SESSION_KEY) === '1' && !adminCloudPassword();
}

function isAdminLoggedIn() {
  if (isPreviewMode()) return true;
  return localStorage.getItem(ADMIN_SESSION_KEY) === '1' && Boolean(adminCloudPassword());
}

function setAdminLoggedIn(password) {
  localStorage.setItem(ADMIN_SESSION_KEY, '1');
  if (password) sessionStorage.setItem(ADMIN_CLOUD_PASSWORD_SESSION_KEY, password);
}

function clearAdminLoggedIn() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  try {
    sessionStorage.removeItem(ADMIN_CLOUD_PASSWORD_SESSION_KEY);
  } catch {}
}

function setLoginMessage(message, good = false) {
  if (!els.loginMessage) return;
  els.loginMessage.textContent = message || '';
  els.loginMessage.classList.toggle('is-good', good);
}

function setFormMessage(message, good = false) {
  if (!els.formMessage) return;
  els.formMessage.textContent = message || '';
  els.formMessage.classList.toggle('is-good', good);
}

function dateParts(dateValue) {
  if (!dateValue) return { day: '--', weekday: '-', time: '' };
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return { day: '--', weekday: '-', time: '' };
  return {
    day: `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
    weekday: date.toLocaleDateString('zh-MY', { weekday: 'long' })
  };
}

function shortDate(dateValue) {
  const parts = dateParts(dateValue);
  return parts.day;
}

function orderBalance(order) {
  const total = money(order.totalAmount);
  const paid = money(order.depositAmount ?? order.paidAmount);
  const rawBalance = order.balanceAmount === undefined || order.balanceAmount === null ? null : money(order.balanceAmount);
  if (rawBalance !== null && rawBalance > 0) return rawBalance;
  if (['fully_paid', 'service_completed'].includes(String(order.status || '')) && rawBalance === 0) return 0;
  return Math.max(0, money(total - paid));
}

function paidAmount(order) {
  const total = money(order.totalAmount);
  const balance = orderBalance(order);
  if (['fully_paid', 'service_completed'].includes(String(order.status || '')) && balance <= 0) return total;
  return Math.max(0, money(total - balance));
}

function displayStatus(order) {
  const status = String(order.status || 'new');
  if (status === 'confirmed') return 'new';
  if (statusLabels[status]) return status;
  return 'new';
}

function receiptLanguage(value) {
  return String(value || '').toLowerCase() === 'en' ? 'en' : 'zh';
}

function receiptLanguageLabel(value) {
  return receiptLanguage(value) === 'en' ? 'English receipt' : '中文单据';
}

function serviceTypeLabel(value, lang = 'zh') {
  const text = String(value || '').trim();
  return lang === 'en' ? (serviceTypeLabelsEn[text] || text || 'Service') : (text || '服务');
}

function assigneeLabel(value, lang = 'zh') {
  const text = String(value || '').trim();
  if (lang === 'en' && (!text || text === '未分配')) return 'Unassigned';
  return text || (lang === 'en' ? 'Unassigned' : '未分配');
}

function statusLabelFor(status, lang = 'zh') {
  const labels = lang === 'en' ? statusLabelsEn : statusLabels;
  return labels[status] || labels.new;
}

function menuTitleLabel(title, lang = 'zh') {
  const text = String(title || '').trim();
  return lang === 'en' ? (menuTitleLabelsEn[text] || text || 'Menu') : (text || '菜单');
}

function derivePaymentStatus(total, paid, requestedStatus) {
  if (requestedStatus === 'cancelled' || requestedStatus === 'service_completed') return requestedStatus;
  if (money(paid) >= money(total) && money(total) > 0) return 'fully_paid';
  if (money(paid) > 0) return 'deposit_paid';
  return 'new';
}

function firstLine(value) {
  return String(value || '').split(/\r?\n/).map(line => line.trim()).find(Boolean) || '';
}

function getSnapshot() {
  try {
    return growthApi.adminSnapshot();
  } catch {
    return {
      members: [],
      orders: [],
      commissionLedgers: [],
      commissions: []
    };
  }
}

function cleanSettingValue(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 60);
}

function categoryValuesFrom(...sources) {
  const values = [];
  sources.forEach(source => {
    if (Array.isArray(source)) {
      values.push(...source);
      return;
    }
    const value = cleanSettingValue(source);
    if (value) values.push(value);
  });
  return normalizeSettingList(values, []);
}

function orderCategories(order = {}) {
  const stored = categoryValuesFrom(order.categories);
  if (stored.length) return stored;
  const primary = categoryValuesFrom(order.serviceType);
  if (primary.length) return primary;
  const legacy = String(order.category || '').split(/\s*(?:\/|,|，|、|\|)\s*/);
  const values = categoryValuesFrom(legacy);
  return values.length ? values : ['活动餐饮'];
}

function selectedCategoryValues() {
  const selected = Array.from(document.querySelectorAll('[data-order-category-option]:checked'))
    .map(input => input.value);
  return categoryValuesFrom(selected);
}

function categoryText(order = {}, lang = 'zh') {
  return orderCategories(order).map(value => serviceTypeLabel(value, lang)).join(' / ');
}

function autoOrderTitle({ categories = [], serviceType = '', itemsSummary = '', fallback = '' } = {}) {
  const fromCategories = categoryValuesFrom(categories, serviceType).join(' / ');
  return firstLine(fromCategories)
    || firstLine(itemsSummary)
    || firstLine(fallback)
    || '90 PROJECT 订单';
}

function normalizeSettingList(values = [], fallback = []) {
  const seen = new Set();
  const output = [];
  const source = Array.isArray(values) && values.length ? values : fallback;
  source.forEach(item => {
    const value = cleanSettingValue(item);
    if (!value) return;
    const key = value.toLocaleLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    output.push(value);
  });
  return output;
}

function savedOrderSettings() {
  const config = growthApi.getState()?.config?.orderCenter || {};
  return {
    categories: normalizeSettingList(config.categories, orderSettingDefaults.categories),
    assignees: normalizeSettingList(config.assignees, orderSettingDefaults.assignees)
  };
}

function orderSettingsWithUsage(orders = []) {
  const saved = savedOrderSettings();
  const categoryUsage = orders.flatMap(order => orderCategories(order));
  const assigneeUsage = orders.map(order => order.assignee || orderAssignee(order));
  return {
    categories: normalizeSettingList([...saved.categories, ...categoryUsage], orderSettingDefaults.categories),
    assignees: normalizeSettingList([...saved.assignees, ...assigneeUsage], orderSettingDefaults.assignees)
  };
}

function sanitizeOrderSettings(settings = {}) {
  const next = {
    categories: normalizeSettingList(settings.categories, orderSettingDefaults.categories),
    assignees: normalizeSettingList(settings.assignees, orderSettingDefaults.assignees)
  };
  if (!next.assignees.some(item => item === '未分配')) next.assignees.unshift('未分配');
  return next;
}

function settingUsageCount(group, value, orders = []) {
  const target = cleanSettingValue(value).toLocaleLowerCase();
  if (!target) return 0;
  return orders.filter(order => {
    if (group === 'categories') {
      return orderCategories(order).some(item => cleanSettingValue(item).toLocaleLowerCase() === target);
    }
    return cleanSettingValue(order.assignee || orderAssignee(order)).toLocaleLowerCase() === target;
  }).length;
}

function setSettingsStatus(message, good = false) {
  if (!els.settingsStatus) return;
  els.settingsStatus.textContent = message || '';
  els.settingsStatus.classList.toggle('is-good', good);
  els.settingsStatus.classList.toggle('is-bad', !good && /失败|不能|错误/.test(message || ''));
}

function updateAssigneeNote(notes, assignee) {
  const value = `负责人：${assignee}`;
  const text = String(notes || '').trim();
  if (!text) return value;
  if (/负责人[:：]\s*[^\n]*/.test(text)) return text.replace(/负责人[:：]\s*[^\n]*/, value);
  return `${value}\n${text}`;
}

function applySettingRenameToOrders(orders = [], group, oldValue, newValue) {
  const oldKey = cleanSettingValue(oldValue).toLocaleLowerCase();
  if (!oldKey || cleanSettingValue(newValue).toLocaleLowerCase() === oldKey) return orders;
  return orders.map(order => {
    const next = { ...order };
    if (group === 'categories') {
      let changed = false;
      const categories = orderCategories(order).map(item => {
        if (cleanSettingValue(item).toLocaleLowerCase() !== oldKey) return item;
        changed = true;
        return newValue;
      });
      if (changed) {
        next.categories = normalizeSettingList(categories, []);
        next.serviceType = next.categories[0] || newValue;
        if (cleanSettingValue(order.category).toLocaleLowerCase() === oldKey) next.category = newValue;
      }
    }
    if (group === 'assignees' && cleanSettingValue(order.assignee || orderAssignee(order)).toLocaleLowerCase() === oldKey) {
      next.assignee = newValue;
      next.adminNotes = updateAssigneeNote(order.adminNotes, newValue);
      if (cleanSettingValue(order.manualVerifiedBy).toLocaleLowerCase() === oldKey) next.manualVerifiedBy = newValue;
    }
    return next;
  });
}

function applySettingRemoveToOrders(orders = [], group, value, replacement) {
  const targetKey = cleanSettingValue(value).toLocaleLowerCase();
  if (!targetKey) return orders;
  return orders.map(order => {
    const next = { ...order };
    if (group === 'categories') {
      const categories = orderCategories(order).filter(item => cleanSettingValue(item).toLocaleLowerCase() !== targetKey);
      if (categories.length !== orderCategories(order).length) {
        next.categories = normalizeSettingList(categories.length ? categories : [replacement || '其他服务'], []);
        next.serviceType = next.categories[0] || replacement || '其他服务';
        if (cleanSettingValue(order.category).toLocaleLowerCase() === targetKey) next.category = next.serviceType;
      }
    }
    if (group === 'assignees' && cleanSettingValue(order.assignee || orderAssignee(order)).toLocaleLowerCase() === targetKey) {
      next.assignee = replacement || '未分配';
      next.adminNotes = updateAssigneeNote(order.adminNotes, next.assignee);
      if (cleanSettingValue(order.manualVerifiedBy).toLocaleLowerCase() === targetKey) next.manualVerifiedBy = '';
    }
    return next;
  });
}

async function saveOrderSettings(settings, options = {}) {
  const current = growthApi.getState();
  const nextSettings = sanitizeOrderSettings(settings);
  const nextState = {
    ...current,
    config: {
      ...(current.config || {}),
      orderCenter: nextSettings
    }
  };
  if (options.rename) {
    nextState.orders = applySettingRenameToOrders(current.orders || [], options.rename.group, options.rename.oldValue, options.rename.newValue);
  } else if (options.remove) {
    nextState.orders = applySettingRemoveToOrders(current.orders || [], options.remove.group, options.remove.value, options.remove.replacement);
  }
  growthApi.replaceState(nextState);
  setSettingsStatus('同步中');
  const result = await syncCloudState();
  setSettingsStatus(result.ok ? '已同步云端' : '已保存在本机', Boolean(result.ok));
  render();
  return result;
}

function settingsAfterAdd(group, value) {
  const name = cleanSettingValue(value);
  if (!orderSettingLabels[group] || !name) return null;
  const settings = savedOrderSettings();
  settings[group] = normalizeSettingList([...settings[group], name], orderSettingDefaults[group]);
  return { settings, name };
}

async function addOrderSetting(group, rawValue) {
  const next = settingsAfterAdd(group, rawValue);
  if (!next) {
    setSettingsStatus(`请输入${orderSettingLabels[group]?.singular || '名单'}名称。`);
    return '';
  }
  await saveOrderSettings(next.settings);
  return next.name;
}

async function editOrderSetting(group, oldValue) {
  const label = orderSettingLabels[group]?.singular || '名单';
  const cleanOld = cleanSettingValue(oldValue);
  if (!cleanOld || (group === 'assignees' && cleanOld === '未分配')) return;
  const nextValue = cleanSettingValue(window.prompt(`更改${label}名称`, cleanOld));
  if (!nextValue || nextValue === cleanOld) return;
  const settings = savedOrderSettings();
  settings[group] = normalizeSettingList(settings[group].map(item => (
    cleanSettingValue(item).toLocaleLowerCase() === cleanOld.toLocaleLowerCase() ? nextValue : item
  )), orderSettingDefaults[group]);
  await saveOrderSettings(settings, { rename: { group, oldValue: cleanOld, newValue: nextValue } });
}

async function removeOrderSetting(group, value, options = {}) {
  const cleanValue = cleanSettingValue(value);
  if (!orderSettingLabels[group] || !cleanValue || (group === 'assignees' && cleanValue === '未分配')) return '';
  const orders = currentOrders();
  const usage = settingUsageCount(group, cleanValue, orders);
  const settings = savedOrderSettings();
  settings[group] = settings[group].filter(item => cleanSettingValue(item).toLocaleLowerCase() !== cleanValue.toLocaleLowerCase());
  const replacement = group === 'assignees' ? '未分配' : (settings[group][0] || orderSettingDefaults[group][0] || '');
  if (usage > 0 && options.confirm !== false) {
    const label = orderSettingLabels[group].singular;
    const ok = window.confirm(`删除${label}「${cleanValue}」？已有 ${usage} 张订单会改成「${replacement}」。`);
    if (!ok) return '';
  }
  await saveOrderSettings(settings, { remove: { group, value: cleanValue, replacement } });
  return replacement;
}

function confirmRemoveSetting(group, value, replacement) {
  const cleanValue = cleanSettingValue(value);
  const usage = settingUsageCount(group, cleanValue, currentOrders());
  if (usage <= 0) return true;
  const label = orderSettingLabels[group]?.singular || '名单';
  return window.confirm(`删除${label}「${cleanValue}」？已有 ${usage} 张订单会改成「${replacement}」。`);
}

function orderAssignee(order) {
  const noteMatch = String(order.adminNotes || '').match(/负责人[:：]\s*([^\n]+)/);
  const value = order.assignee || noteMatch?.[1] || order.manualVerifiedBy || '未分配';
  return ['order-center', 'admin-order-center'].includes(String(value).trim()) ? '未分配' : value;
}

function mapGrowthOrders() {
  const snapshot = getSnapshot();
  const memberById = new Map((snapshot.members || []).map(member => [member.id, member]));
  return (snapshot.orders || []).map(order => {
    const member = memberById.get(order.memberId) || {};
    const lineItems = Array.isArray(order.lineItems) ? order.lineItems : [];
    const title = firstLine(order.packageName)
      || firstLine(order.serviceType)
      || firstLine(order.itemsSummary)
      || firstLine(lineItems[0]?.description)
      || '90 Project 订单';
    const summary = order.itemsSummary
      || lineItems.map(item => item.description).filter(Boolean).join('\n')
      || title;
    const total = money(order.totalAmount);
    const paid = paidAmount(order);
    const balance = Math.max(0, money(total - paid));
    const categories = categoryValuesFrom(order.categories, order.serviceType || '活动餐饮');
    return {
      id: order.id,
      invoiceNo: order.invoiceNo || order.externalInquiryId || order.id,
      externalInquiryId: order.externalInquiryId || order.invoiceNo || order.id,
      customerName: member.name || order.customerName || '90 Customer',
      phone: member.phone || order.phone || '',
      serviceType: categories[0] || '活动餐饮',
      categories,
      category: categories.join(' / ') || title,
      title,
      itemsSummary: summary,
      lineItems,
      eventDate: order.eventDate || String(order.createdAt || '').slice(0, 10) || todayDate(),
      eventTime: order.eventTime || '',
      location: order.location || member.address || '',
      assignee: orderAssignee(order),
      totalAmount: total,
      paidAmount: paid,
      balanceAmount: balance,
      status: displayStatus(order),
      rawStatus: order.status || 'new',
      receiptLanguage: receiptLanguage(order.receiptLanguage || member.language),
      source: 'growth',
      createdAt: order.createdAt || new Date().toISOString(),
      locked: String(order.status || '') === 'service_completed'
    };
  }).sort((a, b) => `${b.eventDate} ${b.eventTime}`.localeCompare(`${a.eventDate} ${a.eventTime}`));
}

function demoOrders() {
  return [
    {
      id: 'demo-lau',
      invoiceNo: '90P-DEMO-001',
      customerName: 'lau',
      phone: '0189490908',
      serviceType: '活动餐饮',
      category: '10pax buffet',
      title: '10pax buffet',
      eventDate: '2026-08-27',
      eventTime: '09:30',
      location: '23, jalan indah 20/1, bukit indah',
      assignee: 'LIYAN & KS',
      totalAmount: 490,
      paidAmount: 490,
      balanceAmount: 0,
      status: 'service_completed',
      itemsSummary: '主食\n腊肠炒饭\n福建面\n\n肉类\n炸鸡\nsambal鸡\n咸蛋奶油猪\n\n海鲜\n椒盐虾\n\n菜\n娘惹阿杂\n家常豆腐',
      source: 'demo'
    },
    {
      id: 'demo-roast',
      invoiceNo: '90P-DEMO-002',
      customerName: 'Gelang patah',
      phone: '0189490908',
      serviceType: '活动餐饮',
      category: '烧腊',
      title: '烧腊',
      eventDate: '2026-08-27',
      eventTime: '12:30',
      location: 'Gelang Patah',
      assignee: 'Tom',
      totalAmount: 127,
      paidAmount: 127,
      balanceAmount: 0,
      status: 'service_completed',
      itemsSummary: '烧腊拼盘\n酱料\n餐具',
      source: 'demo'
    },
    {
      id: 'demo-buffet-roast',
      invoiceNo: '90P-DEMO-003',
      customerName: 'Tan',
      phone: '0189490908',
      serviceType: '活动餐饮',
      category: '20人份buffet 29.9 / 烧腊',
      title: '20人份buffet 29.9 / 烧腊',
      eventDate: '2026-08-30',
      eventTime: '18:00',
      location: 'Skudai',
      assignee: 'KS',
      totalAmount: 805,
      paidAmount: 398,
      balanceAmount: 407,
      status: 'new',
      itemsSummary: '20人份 buffet\n烧腊\n饮料另确认',
      source: 'demo'
    },
    {
      id: 'demo-mid-autumn',
      invoiceNo: '90P-DEMO-004',
      customerName: 'Lim',
      phone: '0189490908',
      serviceType: '活动餐饮',
      category: '20人份中元节套餐',
      title: '20人份中元节套餐 / 烧肉 / 烧鸡',
      eventDate: '2026-08-31',
      eventTime: '11:00',
      location: 'Bukit Indah',
      assignee: 'LIYAN & KS',
      totalAmount: 715,
      paidAmount: 715,
      balanceAmount: 0,
      status: 'fully_paid',
      itemsSummary: '烧肉/kg\n烧鸡/只\n配菜',
      source: 'demo'
    },
    {
      id: 'demo-choco',
      invoiceNo: '90P-DEMO-005',
      customerName: 'Wong',
      phone: '0189490908',
      serviceType: '活动餐饮',
      category: '35人份buffet+choco tart',
      title: '35人份buffet+choco tart',
      eventDate: '2026-08-18',
      eventTime: '15:00',
      location: 'Nusa Bestari',
      assignee: 'LIYAN & KS',
      totalAmount: 1876.5,
      paidAmount: 1876.5,
      balanceAmount: 0,
      status: 'service_completed',
      itemsSummary: 'Buffet Set\nChoco tart\n现场摆设',
      source: 'demo'
    },
    {
      id: 'demo-canape',
      invoiceNo: '90P-DEMO-006',
      customerName: 'Event A',
      phone: '0189490908',
      serviceType: '鸡尾酒服务',
      category: 'Canape Package A',
      title: 'Canape Package A',
      eventDate: '2026-08-21',
      eventTime: '19:00',
      location: 'Johor Bahru',
      assignee: 'Tom',
      totalAmount: 2099,
      paidAmount: 2099,
      balanceAmount: 0,
      status: 'fully_paid',
      itemsSummary: 'Canape Package A\nMocktail bar\nService crew',
      source: 'demo'
    },
    {
      id: 'demo-80pax',
      invoiceNo: '90P-DEMO-007',
      customerName: 'Company Dinner',
      phone: '0189490908',
      serviceType: '活动餐饮',
      category: '80人buffet 29.9',
      title: '80人buffet 29.9',
      eventDate: '2026-08-24',
      eventTime: '18:30',
      location: 'Austin',
      assignee: 'ks',
      totalAmount: 2392,
      paidAmount: 2392,
      balanceAmount: 0,
      status: 'service_completed',
      itemsSummary: '80人 buffet\n主食、肉类、海鲜、蔬菜\n茶水',
      source: 'demo'
    },
    {
      id: 'demo-delivery',
      invoiceNo: '90P-DEMO-008',
      customerName: 'Delivery',
      phone: '0189490908',
      serviceType: '其他服务',
      category: '配送费',
      title: '配送费',
      eventDate: '2026-08-25',
      eventTime: '10:00',
      location: 'Iskandar Puteri',
      assignee: 'Ks',
      totalAmount: 15,
      paidAmount: 15,
      balanceAmount: 0,
      status: 'service_completed',
      itemsSummary: '配送费',
      source: 'demo'
    }
  ];
}

function currentOrders() {
  const real = mapGrowthOrders();
  state.demoMode = real.length === 0;
  return state.demoMode ? demoOrders() : real;
}

function findOrder(id) {
  return currentOrders().find(order => order.id === id) || null;
}

function totalsFor(orders) {
  const total = orders.reduce((sum, order) => sum + money(order.totalAmount), 0);
  const paid = orders.reduce((sum, order) => sum + money(order.paidAmount), 0);
  const balance = orders.reduce((sum, order) => sum + Math.max(0, money(order.totalAmount) - money(order.paidAmount)), 0);
  return { count: orders.length, total: money(total), paid: money(paid), balance: money(balance) };
}

function renderSyncStatus(orders) {
  if (!els.syncStatus) return;
  els.syncStatus.className = '';
  if (state.demoMode) {
    els.syncStatus.textContent = `示例 · ${orders.length} 笔`;
    els.syncStatus.classList.add('is-demo');
    return;
  }
  els.syncStatus.textContent = `${state.syncMessage} · ${orders.length} 笔`;
  if (state.syncState === 'ok') els.syncStatus.classList.add('is-good');
  if (state.syncState === 'error') els.syncStatus.classList.add('is-bad');
}

function renderStats(orders) {
  if (!els.stats) return;
  const totals = totalsFor(orders);
  els.stats.innerHTML = [
    ['订单总数', String(totals.count), '全部经营单'],
    ['营业总额', formatMoney(totals.total), '已录入订单'],
    ['已收款', formatMoney(totals.paid), '订金与结清'],
    ['待收款', formatMoney(totals.balance), '未收余额']
  ].map(([label, value, hint]) => `
    <div class="order-stat">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(hint)}</small>
    </div>
  `).join('');
}

function renderOrderCard(order) {
  const parts = dateParts(order.eventDate);
  const status = displayStatus(order);
  const balance = Math.max(0, money(order.totalAmount) - money(order.paidAmount));
  return `
    <article class="order-item" data-order-id="${escapeHtml(order.id)}">
      <div class="order-date">
        <strong>${escapeHtml(parts.day)}</strong>
        <span>${escapeHtml(parts.weekday)}</span>
        <small>${escapeHtml(order.eventTime || '-')}</small>
      </div>
      <div class="order-main">
        <div class="order-main-head">
          <h3 class="order-customer">${escapeHtml(order.customerName)}</h3>
          <b class="order-amount">${escapeHtml(formatMoney(order.totalAmount))}</b>
        </div>
        <div class="order-title"><i class="ri-restaurant-2-line" aria-hidden="true"></i>${escapeHtml(order.title)}</div>
        <p class="order-note">${escapeHtml(order.itemsSummary || '-')}</p>
        <div class="order-meta">
          <span class="order-status ${escapeHtml(status)}">${escapeHtml(statusLabels[status] || '未付款')}</span>
          <span><i class="ri-price-tag-3-line" aria-hidden="true"></i>${escapeHtml(categoryText(order))}</span>
          <span><i class="ri-wallet-3-line" aria-hidden="true"></i>已收 ${escapeHtml(formatMoney(order.paidAmount))}</span>
          <span><i class="ri-refund-2-line" aria-hidden="true"></i>待收 ${escapeHtml(formatMoney(balance))}</span>
          ${order.location ? `<span><i class="ri-map-pin-2-line" aria-hidden="true"></i>${escapeHtml(order.location)}</span>` : ''}
          ${order.assignee ? `<span><i class="ri-user-star-line" aria-hidden="true"></i>${escapeHtml(order.assignee)}</span>` : ''}
          <span><i class="ri-translate-2" aria-hidden="true"></i>${escapeHtml(receiptLanguageLabel(order.receiptLanguage))}</span>
        </div>
        <div class="order-card-actions">
          <button class="order-card-action" type="button" data-order-edit="${escapeHtml(order.id)}"><i class="ri-edit-line" aria-hidden="true"></i>编辑</button>
          <button class="order-card-action" type="button" data-order-whatsapp="${escapeHtml(order.id)}"><i class="ri-whatsapp-line" aria-hidden="true"></i>WhatsApp</button>
          <button class="order-card-action" type="button" data-order-print="${escapeHtml(order.id)}"><i class="ri-printer-line" aria-hidden="true"></i>打印</button>
        </div>
      </div>
    </article>
  `;
}

function renderRecent(orders) {
  if (!els.recentList) return;
  const recent = orders.slice(0, 5);
  els.recentList.innerHTML = recent.length
    ? recent.map(renderOrderCard).join('')
    : '<div class="order-empty">还没有订单，先新增第一张单。</div>';
}

function filteredOrders(orders) {
  const query = state.query.trim().toLowerCase();
  return orders.filter(order => {
    const status = displayStatus(order);
    const statusOk = state.status === 'all' || status === state.status;
    const dateOk = !state.dateFilter || order.eventDate === state.dateFilter;
    const haystack = [
      order.customerName,
      order.phone,
      ...orderCategories(order),
      order.title,
      order.itemsSummary,
      order.location,
      order.assignee,
      order.invoiceNo
    ].join(' ').toLowerCase();
    return statusOk && dateOk && (!query || haystack.includes(query));
  });
}

function renderAllOrders(orders) {
  if (!els.allList) return;
  const visible = filteredOrders(orders);
  if (els.dateChip) {
    els.dateChip.hidden = !state.dateFilter;
    els.dateChip.innerHTML = state.dateFilter
      ? `<span>${escapeHtml(shortDate(state.dateFilter))}</span><button type="button" data-clear-date-filter>清除</button>`
      : '';
  }
  els.allList.innerHTML = visible.length
    ? visible.map(renderOrderCard).join('')
    : '<div class="order-empty">没有符合条件的订单。</div>';
}

function ordersByDate(orders) {
  return orders.reduce((map, order) => {
    const key = order.eventDate || todayDate();
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(order);
    return map;
  }, new Map());
}

function renderCalendar(orders) {
  if (!els.calendarTitle || !els.calendarGrid) return;
  const year = state.calendarMonth.getFullYear();
  const month = state.calendarMonth.getMonth();
  els.calendarTitle.textContent = `${year}年 ${month + 1}月`;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const byDate = ordersByDate(orders);
  const cells = [];
  for (let index = 0; index < firstDay; index += 1) {
    cells.push('<button class="order-day is-empty" type="button" aria-hidden="true" tabindex="-1"></button>');
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayOrders = byDate.get(dateKey) || [];
    const total = dayOrders.reduce((sum, order) => sum + money(order.totalAmount), 0);
    cells.push(`
      <button class="order-day ${dayOrders.length ? 'has-order' : ''}" type="button" data-calendar-date="${dateKey}">
        <b>${day}</b>
        ${dayOrders.length ? `<span>${dayOrders.length} 单</span><small>${escapeHtml(formatMoney(total))}</small>` : '<small>新增</small>'}
      </button>
    `);
  }
  els.calendarGrid.innerHTML = cells.join('');
}

function renderCategoryAnalysis(orders) {
  if (!els.categoryAnalysis) return;
  const rows = Array.from(orders.reduce((map, order) => {
    orderCategories(order).forEach(key => {
      const current = map.get(key) || { count: 0, total: 0 };
      current.count += 1;
      current.total = money(current.total + order.totalAmount);
      map.set(key, current);
    });
    return map;
  }, new Map()).entries()).sort((a, b) => b[1].total - a[1].total);

  els.categoryAnalysis.innerHTML = rows.length
    ? rows.map(([label, item]) => `
      <div class="order-table-row">
        <span>${escapeHtml(label)}</span>
        <small>${item.count}次</small>
        <b>${escapeHtml(formatMoney(item.total))}</b>
      </div>
    `).join('')
    : '<div class="order-empty">还没有类别资料。</div>';
}

function renderStatusAnalysis(orders) {
  if (!els.statusAnalysis) return;
  const counts = statusOrder.map(status => ({
    status,
    label: statusLabels[status],
    count: orders.filter(order => displayStatus(order) === status).length
  }));
  const max = Math.max(1, ...counts.map(item => item.count));
  els.statusAnalysis.innerHTML = counts.map(item => `
    <div class="order-bar-row">
      <span>${escapeHtml(item.label)}</span>
      <div class="order-bar"><i style="width:${Math.max(0, Math.round((item.count / max) * 100))}%"></i></div>
      <strong>${item.count}</strong>
    </div>
  `).join('');
}

function renderMonthIncome(orders) {
  if (!els.monthIncome) return;
  const monthMap = orders.reduce((map, order) => {
    const key = String(order.eventDate || '').slice(0, 7) || '未排期';
    const current = map.get(key) || { count: 0, total: 0, paid: 0, balance: 0 };
    current.count += 1;
    current.total = money(current.total + order.totalAmount);
    current.paid = money(current.paid + order.paidAmount);
    current.balance = money(current.balance + Math.max(0, order.totalAmount - order.paidAmount));
    map.set(key, current);
    return map;
  }, new Map());
  const latest = Array.from(monthMap.entries()).sort((a, b) => b[0].localeCompare(a[0]))[0];
  if (!latest) {
    els.monthIncome.innerHTML = '<div class="order-empty">还没有收入资料。</div>';
    return;
  }
  const [month, item] = latest;
  els.monthIncome.innerHTML = `
    <strong>${escapeHtml(month)} ${escapeHtml(formatMoney(item.total))}</strong>
    <span>${item.count} 单 · 已收 ${escapeHtml(formatMoney(item.paid))} · 待收 ${escapeHtml(formatMoney(item.balance))}</span>
  `;
}

function staffDateText(dateValue, timeValue = '') {
  if (!dateValue) return '未排期';
  const day = shortDate(dateValue);
  return timeValue ? `${day} ${timeValue}` : day;
}

function orderSortKey(order) {
  return `${order.eventDate || ''} ${order.eventTime || ''}`;
}

function renderStaffAnalysis(orders) {
  if (!els.staffAnalysis) return;
  const rows = Array.from(orders.reduce((map, order) => {
    const key = order.assignee || '未分配';
    const current = map.get(key) || {
      total: 0,
      paid: 0,
      balance: 0,
      count: 0,
      completed: 0,
      orders: []
    };
    current.total = money(current.total + order.totalAmount);
    current.paid = money(current.paid + order.paidAmount);
    current.balance = money(current.balance + Math.max(0, money(order.totalAmount) - money(order.paidAmount)));
    current.count += 1;
    if (displayStatus(order) === 'service_completed') current.completed += 1;
    current.orders.push(order);
    map.set(key, current);
    return map;
  }, new Map()).entries()).sort((a, b) => b[1].total - a[1].total);

  els.staffAnalysis.innerHTML = rows.length
    ? rows.map(([name, item]) => {
      const ordered = item.orders.sort((a, b) => orderSortKey(b).localeCompare(orderSortKey(a)));
      const datedOrders = ordered.filter(order => order.eventDate);
      const newestDate = datedOrders[0]?.eventDate || '';
      const oldestDate = datedOrders[datedOrders.length - 1]?.eventDate || '';
      const dateRange = datedOrders.length
        ? `${staffDateText(oldestDate)} - ${staffDateText(newestDate)}`
        : '还没有日期';
      const recentRows = ordered.slice(0, 5).map(order => {
        const status = displayStatus(order);
        return `
          <li>
            <time>${escapeHtml(staffDateText(order.eventDate, order.eventTime))}</time>
            <span>
              <b>${escapeHtml(order.customerName || '-')}</b>
              <small>${escapeHtml(order.title || order.serviceType || '-')} · ${escapeHtml(statusLabels[status] || '未付款')}</small>
            </span>
            <strong>${escapeHtml(formatMoney(order.totalAmount))}</strong>
          </li>
        `;
      }).join('');
      return `
        <section class="order-staff-card">
          <div class="order-staff-head">
            <div>
              <span>负责人</span>
              <h3>${escapeHtml(name)}</h3>
            </div>
            <strong>${item.count} 单</strong>
          </div>
          <div class="order-staff-metrics">
            <span><small>营业额</small><b>${escapeHtml(formatMoney(item.total))}</b></span>
            <span><small>已收</small><b>${escapeHtml(formatMoney(item.paid))}</b></span>
            <span><small>待收</small><b>${escapeHtml(formatMoney(item.balance))}</b></span>
            <span><small>完成</small><b>${item.completed} 单</b></span>
          </div>
          <div class="order-staff-dates">
            <span><i class="ri-calendar-check-line" aria-hidden="true"></i>日期范围</span>
            <b>${escapeHtml(dateRange)}</b>
          </div>
          <ul class="order-staff-records">${recentRows}</ul>
        </section>
      `;
    }).join('')
    : '<div class="order-empty">还没有负责人资料。</div>';
}

function setManagedSelectOptions(select, group, values, selectedValue = '') {
  if (!select || !orderSettingLabels[group]) return;
  const label = orderSettingLabels[group].singular;
  const current = cleanSettingValue(selectedValue || select.value);
  const options = normalizeSettingList(current ? [...values, current] : values, orderSettingDefaults[group]);
  select.innerHTML = `${options.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('')}<option value="${CUSTOM_OPTION_VALUE}">+ 新增${escapeHtml(label)}</option>`;
  select.value = current && options.includes(current) ? current : (options[0] || '');
  select.dataset.previousValue = select.value;
}

function setCategoryPickerOptions(values, selectedValues = []) {
  if (!els.categoryPicker) return;
  const selected = categoryValuesFrom(selectedValues);
  const selectedSet = new Set(selected.map(value => value.toLocaleLowerCase()));
  const options = normalizeSettingList([...values, ...selected], orderSettingDefaults.categories);
  const active = selected.length ? selected : [options[0] || '活动餐饮'];
  const activeSet = new Set(active.map(value => value.toLocaleLowerCase()));
  els.categoryPicker.innerHTML = `${options.map(value => {
    const id = `order-category-${hashLocalSecret(value).slice(0, 6)}`;
    const checked = activeSet.has(value.toLocaleLowerCase());
    return `
      <label class="order-category-option" for="${escapeHtml(id)}">
        <input id="${escapeHtml(id)}" data-order-category-option type="checkbox" value="${escapeHtml(value)}" ${checked ? 'checked' : ''}>
        <span>${escapeHtml(value)}</span>
      </label>
    `;
  }).join('')}<button class="order-category-add" type="button" data-order-category-add-inline>+ 新增类别</button>`;
  formFields.serviceType.value = active[0] || '';
  els.categoryPicker.dataset.previousValue = selectedSet.size ? active.join('||') : '';
}

function updateAssigneeDeleteButton() {
  if (!els.assigneeDelete || !formFields.assignee) return;
  const value = cleanSettingValue(formFields.assignee.value);
  const canDelete = Boolean(value && value !== '未分配' && value !== CUSTOM_OPTION_VALUE);
  els.assigneeDelete.disabled = !canDelete;
  els.assigneeDelete.title = canDelete ? `删除负责人：${value}` : '选择负责人后可以删除';
}

function updateCategoryDeleteButton() {
  if (!els.categoryDelete || !formFields.serviceType) return;
  const value = selectedCategoryValues()[0] || cleanSettingValue(formFields.serviceType.value);
  const canDelete = Boolean(value && value !== CUSTOM_OPTION_VALUE);
  els.categoryDelete.disabled = !canDelete;
  els.categoryDelete.title = canDelete ? `删除类别：${value}` : '选择类别后可以删除';
}

function updateFormDeleteButtons() {
  updateCategoryDeleteButton();
  updateAssigneeDeleteButton();
}

function renderOrderSelects(orders = currentOrders(), selected = {}) {
  const settings = orderSettingsWithUsage(orders);
  setCategoryPickerOptions(settings.categories, selected.categories || [selected.serviceType]);
  setManagedSelectOptions(formFields.assignee, 'assignees', settings.assignees, selected.assignee);
  updateFormDeleteButtons();
}

function renderSettingsGroup(group, values, orders = []) {
  const target = els.configLists[group];
  if (!target) return;
  target.innerHTML = values.length
    ? values.map(value => {
      const count = settingUsageCount(group, value, orders);
      const fixed = group === 'assignees' && value === '未分配';
      return `
        <span class="order-chip">
          <button type="button" data-order-config-edit="${escapeHtml(group)}" data-order-config-value="${escapeHtml(value)}" ${fixed ? 'disabled' : ''}>
            <span>${escapeHtml(value)}</span>
            <small>${count ? `${count} 单` : '名单'}</small>
          </button>
          <button class="order-chip-remove" type="button" data-order-config-remove="${escapeHtml(group)}" data-order-config-value="${escapeHtml(value)}" ${fixed ? 'disabled' : ''} aria-label="删除${escapeHtml(value)}">
            <i class="ri-close-line" aria-hidden="true"></i>
          </button>
        </span>
      `;
    }).join('')
    : `<div class="order-empty">${escapeHtml(orderSettingLabels[group]?.empty || '还没有名单。')}</div>`;
}

function renderOrderSettings(orders = currentOrders()) {
  const settings = orderSettingsWithUsage(orders);
  renderSettingsGroup('categories', settings.categories, orders);
  renderSettingsGroup('assignees', settings.assignees, orders);
  const label = state.syncState === 'ok' ? '已同步云端' : state.cloudReady ? state.syncMessage : '本机设置';
  setSettingsStatus(label, state.syncState === 'ok');
}

function renderPanels() {
  els.tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.orderView === state.view));
  els.panels.forEach(panel => {
    const active = panel.dataset.orderPanel === state.view;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
}

function render() {
  const orders = currentOrders();
  renderPanels();
  renderSyncStatus(orders);
  renderStats(orders);
  renderRecent(orders);
  renderAllOrders(orders);
  renderCalendar(orders);
  renderCategoryAnalysis(orders);
  renderStatusAnalysis(orders);
  renderMonthIncome(orders);
  renderStaffAnalysis(orders);
  renderOrderSelects(orders);
  renderOrderSettings(orders);
  window.NP90OrderCenter = {
    orders,
    settings: orderSettingsWithUsage(orders),
    demoMode: state.demoMode,
    totals: totalsFor(orders)
  };
}

function setView(view) {
  state.view = view;
  render();
}

function openOrderSheet(orderId = '', forcedDate = '') {
  const order = orderId ? findOrder(orderId) : null;
  const isDemo = order?.source === 'demo';
  const categories = order ? orderCategories(order) : ['活动餐饮'];
  renderOrderSelects(currentOrders(), { categories, assignee: order?.assignee });
  formFields.id.value = order && !isDemo ? order.id : '';
  formFields.customerName.value = order?.customerName || '';
  formFields.phone.value = order?.phone || '';
  formFields.eventDate.value = forcedDate || order?.eventDate || todayDate();
  formFields.eventTime.value = order?.eventTime || '';
  formFields.serviceType.value = categories[0] || '活动餐饮';
  formFields.assignee.value = order?.assignee || '未分配';
  updateFormDeleteButtons();
  if (formFields.title) formFields.title.value = order?.title || '';
  formFields.itemsSummary.value = order?.itemsSummary || '';
  formFields.location.value = order?.location || '';
  formFields.totalAmount.value = order ? money(order.totalAmount).toFixed(2) : '';
  formFields.paidAmount.value = order ? money(order.paidAmount).toFixed(2) : '0';
  formFields.status.value = order?.status || 'new';
  formFields.receiptLanguage.value = receiptLanguage(order?.receiptLanguage);
  document.getElementById('orderSheetTitle').textContent = order && !isDemo ? '编辑订单' : '新增订单';
  setFormMessage(isDemo ? '这是示例资料，保存后会成为真实订单。' : '');
  els.sheet.hidden = false;
  window.setTimeout(() => formFields.customerName.focus(), 40);
}

function closeOrderSheet() {
  els.sheet.hidden = true;
  setFormMessage('');
}

function collectFormData() {
  const total = money(formFields.totalAmount.value);
  const paid = Math.min(total, money(formFields.paidAmount.value));
  const requestedStatus = formFields.status.value || 'new';
  const status = derivePaymentStatus(total, paid, requestedStatus);
  const categories = selectedCategoryValues();
  const serviceType = categories[0] || formFields.serviceType.value || '活动餐饮';
  const itemsSummary = formFields.itemsSummary.value.trim();
  const title = autoOrderTitle({
    categories: categories.length ? categories : [serviceType],
    serviceType,
    itemsSummary,
    fallback: formFields.title?.value
  });
  return {
    id: formFields.id.value || '',
    invoiceNo: invoiceNo(),
    customerName: formFields.customerName.value.trim(),
    phone: formFields.phone.value.trim(),
    eventDate: formFields.eventDate.value || todayDate(),
    eventTime: formFields.eventTime.value || '',
    serviceType,
    categories: categories.length ? categories : [serviceType],
    assignee: formFields.assignee.value || '未分配',
    title,
    itemsSummary,
    location: formFields.location.value.trim(),
    totalAmount: total,
    paidAmount: paid,
    balanceAmount: Math.max(0, money(total - paid)),
    status,
    requestedStatus,
    receiptLanguage: receiptLanguage(formFields.receiptLanguage?.value)
  };
}

function validateOrderData(data) {
  if (!data.customerName) return '请填写顾客姓名。';
  if (!data.categories?.length) return '请选择至少一个类别。';
  if (!data.eventDate) return '请选择日期。';
  if (data.totalAmount <= 0) return '总额必须大过 RM0。';
  return '';
}

function lineItemsFrom(data) {
  return [{
    description: data.title,
    qty: 1,
    unitPrice: data.totalAmount,
    amount: data.totalAmount
  }];
}

async function syncCloudState() {
  if (!state.cloudReady || typeof cloud.saveSharedGrowthState !== 'function') {
    state.syncState = 'local';
    state.syncMessage = '本机';
    return { ok: false, skipped: true };
  }
  try {
    state.syncState = 'loading';
    state.syncMessage = '同步中';
    renderSyncStatus(currentOrders());
    const result = await cloud.saveSharedGrowthState(growthApi.getState(), { admin: true });
    if (result.ok) {
      if (result.state && typeof growthApi.replaceState === 'function') growthApi.replaceState(result.state);
      state.syncState = 'ok';
      state.syncMessage = '已同步';
      return result;
    }
    if (result.reason === 'missing_admin_session') {
      clearAdminLoggedIn();
      state.syncState = 'error';
      state.syncMessage = '请重新登录';
      renderAccess();
      return result;
    }
    state.syncState = result.skipped ? 'local' : 'error';
    state.syncMessage = result.skipped ? '本机' : '云端失败';
    return result;
  } catch {
    state.syncState = 'error';
    state.syncMessage = '云端失败';
    return { ok: false, message: 'sync_failed' };
  }
}

async function saveOrderFromForm({ close = true } = {}) {
  const data = collectFormData();
  const error = validateOrderData(data);
  if (error) {
    setFormMessage(error);
    return null;
  }

  const paymentStatus = data.status === 'fully_paid'
    ? 'fully_paid'
    : data.status === 'deposit_paid'
      ? 'deposit_paid'
      : '';
  const sourceId = data.id || `order-center-${Date.now()}`;
  const payload = {
    externalInquiryId: sourceId,
    sourceInquiryId: sourceId,
    invoiceNo: data.id ? undefined : data.invoiceNo,
    name: data.customerName,
    phone: data.phone,
    email: data.phone ? '' : `${sourceId}@orders.90project.local`,
    serviceType: data.serviceType,
    categories: data.categories,
    packageName: data.title,
    eventDate: data.eventDate,
    eventTime: data.eventTime,
    location: data.location,
    pax: 0,
    itemsSummary: data.itemsSummary || data.title,
    lineItems: lineItemsFrom(data),
    totalAmount: data.totalAmount,
    originalAmount: data.totalAmount,
    depositAmount: data.paidAmount,
    balanceAmount: data.balanceAmount,
    paymentStatus,
    status: data.requestedStatus === 'service_completed' ? (paymentStatus || 'confirmed') : data.status,
    receiptLanguage: data.receiptLanguage,
    adminNotes: `负责人：${data.assignee}`,
    source: 'order-center',
    createdAt: new Date().toISOString()
  };

  let result;
  if (data.id) {
    result = growthApi.updateOrder(data.id, {
      serviceType: data.serviceType,
      categories: data.categories,
      totalAmount: data.totalAmount,
      originalAmount: data.totalAmount,
      depositAmount: data.paidAmount,
      balanceAmount: data.balanceAmount,
      paymentStatus,
      status: data.requestedStatus === 'service_completed' ? (paymentStatus || 'confirmed') : data.status,
      receiptLanguage: data.receiptLanguage,
      packageName: data.title,
      eventDate: data.eventDate,
      eventTime: data.eventTime,
      location: data.location,
      itemsSummary: data.itemsSummary || data.title,
      lineItems: lineItemsFrom(data),
      adminNotes: `负责人：${data.assignee}`
    }, 'order-center');
  } else {
    result = growthApi.upsertOrderLead(payload);
  }

  if (!result?.ok) {
    setFormMessage(result?.reason === 'order_locked' ? '已完成订单已锁定，不能再改金额。' : '订单保存不到，请检查资料。');
    return null;
  }

  let savedOrder = result.order;
  if (data.requestedStatus === 'service_completed' && savedOrder?.status !== 'service_completed') {
    const completed = growthApi.completeOrder(savedOrder.id, 'order-center');
    if (completed.ok) savedOrder = completed.order;
  }

  await syncCloudState();
  render();
  setFormMessage(state.syncState === 'ok' ? '已保存并同步。' : '已保存，本机可用；云端稍后再同步。', true);
  if (close) closeOrderSheet();
  return findOrder(savedOrder?.id) || mapGrowthOrders().find(order => order.id === savedOrder?.id) || null;
}

function buildWhatsAppMessage(order) {
  const balance = Math.max(0, money(order.totalAmount) - money(order.paidAmount));
  const lang = receiptLanguage(order.receiptLanguage);
  if (lang === 'en') {
    return [
      '90 PROJECT',
      `Order: ${order.invoiceNo || '-'}`,
      '',
      `Customer: ${order.customerName || '-'}`,
      `Service: ${order.title || serviceTypeLabel(order.serviceType, lang) || '-'}`,
      `Category: ${categoryText(order, lang) || '-'}`,
      order.eventDate ? `Date: ${order.eventDate}${order.eventTime ? ` ${order.eventTime}` : ''}` : '',
      order.location ? `Venue: ${order.location}` : '',
      '',
      'Menu / Notes:',
      order.itemsSummary || '-',
      '',
      `Total: ${formatMoney(order.totalAmount)}`,
      `Paid: ${formatMoney(order.paidAmount)}`,
      `Balance: ${formatMoney(balance)}`,
      '',
      'Please reply to this WhatsApp if anything needs to be adjusted.'
    ].filter(Boolean).join('\n');
  }
  return [
    '九零食刻 90 PROJECT',
    `订单：${order.invoiceNo || '-'}`,
    '',
    `顾客：${order.customerName || '-'}`,
    `服务：${order.title || order.serviceType || '-'}`,
    `类别：${categoryText(order) || '-'}`,
    order.eventDate ? `日期：${order.eventDate}${order.eventTime ? ` ${order.eventTime}` : ''}` : '',
    order.location ? `地点：${order.location}` : '',
    '',
    '菜单 / 备注：',
    order.itemsSummary || '-',
    '',
    `应收总额：${formatMoney(order.totalAmount)}`,
    `已收款：${formatMoney(order.paidAmount)}`,
    `余额：${formatMoney(balance)}`,
    '',
    '如资料需要调整，可以直接回复这条 WhatsApp。'
  ].filter(Boolean).join('\n');
}

function openWhatsApp(order) {
  if (!order) return;
  const phone = normalizePhone(order.phone) || BUSINESS_WHATSAPP;
  const message = buildWhatsAppMessage(order);
  if (window.AndroidPosBridge?.openWhatsApp) {
    window.AndroidPosBridge.openWhatsApp(phone, message);
    return;
  }
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

function printDateTime(dateValue, timeValue = '', lang = 'zh') {
  if (!dateValue) return '-';
  const raw = [dateValue, timeValue].filter(Boolean).join(' ');
  const date = new Date(`${dateValue}T${timeValue || '00:00'}:00`);
  if (Number.isNaN(date.getTime())) return raw || '-';
  const formatted = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('/');
  const weekday = date.toLocaleDateString(lang === 'en' ? 'en-MY' : 'zh-MY', { weekday: 'short' });
  return `${formatted} ${weekday}${timeValue ? ` ${timeValue}` : ''}`;
}

function issuedDateTime() {
  return new Date().toLocaleString('zh-MY', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

function printPaymentStatus(order, balance, lang = 'zh') {
  if (balance <= 0) return lang === 'en' ? 'Paid in full' : '已结清';
  if (money(order.paidAmount) > 0) return lang === 'en' ? 'Partially paid' : '部分付款';
  return statusLabelFor(displayStatus(order), lang) || (lang === 'en' ? 'Pending' : '待确认');
}

function printItems(order, lang = 'zh') {
  const sourceItems = Array.isArray(order.lineItems) ? order.lineItems : [];
  const items = sourceItems.length ? sourceItems : [{
    description: order.title || serviceTypeLabel(order.serviceType, lang) || (lang === 'en' ? '90 PROJECT service' : '90 PROJECT 服务'),
    qty: 1,
    unitPrice: order.totalAmount,
    amount: order.totalAmount
  }];
  return items.map(item => {
    const qty = Number(item.qty) || 1;
    const unitPrice = money(item.unitPrice ?? item.amount ?? order.totalAmount);
    const computedAmount = money(qty * unitPrice);
    return {
      description: item.description || order.title || serviceTypeLabel(order.serviceType, lang) || (lang === 'en' ? '90 PROJECT service' : '90 PROJECT 服务'),
      qty,
      unitPrice,
      amount: money(item.amount ?? (computedAmount || order.totalAmount))
    };
  });
}

function printItemRows(order, lang = 'zh') {
  return printItems(order, lang).map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        <strong>${escapeHtml(item.description)}</strong>
        <span>${escapeHtml(categoryText(order, lang))}</span>
      </td>
      <td>${escapeHtml(String(item.qty))}</td>
      <td>${escapeHtml(formatMoney(item.unitPrice))}</td>
      <td>${escapeHtml(formatMoney(item.amount))}</td>
    </tr>
  `).join('');
}

function menuSections(summary) {
  const text = String(summary || '').trim();
  if (!text) return [{ title: '菜单 / 备注', items: ['-'] }];
  const paragraphs = text
    .split(/\n\s*\n/)
    .map(block => block.split(/\r?\n/).map(line => line.trim()).filter(Boolean))
    .filter(lines => lines.length);
  if (paragraphs.length > 1) {
    return paragraphs.map(lines => ({
      title: lines[0] || '菜单',
      items: lines.slice(1).length ? lines.slice(1) : ['-']
    }));
  }
  const lines = paragraphs[0] || [];
  const colonLines = lines.filter(line => /[:：]/.test(line));
  if (colonLines.length >= Math.max(1, Math.floor(lines.length * 0.6))) {
    return lines.map(line => {
      const parts = line.split(/[:：]/);
      return {
        title: (parts.shift() || '菜单').trim(),
        items: [parts.join('：').trim() || '-']
      };
    });
  }
  return [{ title: '菜单 / 备注', items: lines.length ? lines : ['-'] }];
}

function printMenuHtml(summary, lang = 'zh') {
  const maxSections = 6;
  const maxItems = 28;
  let usedItems = 0;
  let hiddenItems = 0;
  const visibleSections = [];

  menuSections(summary).forEach(section => {
    const items = Array.isArray(section.items) && section.items.length ? section.items : ['-'];
    const room = maxItems - usedItems;
    if (visibleSections.length >= maxSections || room <= 0) {
      hiddenItems += items.length;
      return;
    }
    const visibleItems = items.slice(0, room);
    hiddenItems += Math.max(0, items.length - visibleItems.length);
    usedItems += visibleItems.length;
    visibleSections.push({ ...section, items: visibleItems });
  });

  const note = hiddenItems > 0
    ? `<div class="order-print-menu-note">${
        lang === 'en'
          ? `${hiddenItems} more menu / note item(s) should follow the final WhatsApp confirmation.`
          : `另有 ${hiddenItems} 项菜单 / 备注请以 WhatsApp 确认为准。`
      }</div>`
    : '';

  return `${visibleSections.map(section => `
    <div class="order-print-menu-group">
      <strong>${escapeHtml(menuTitleLabel(section.title, lang))}</strong>
      <ul>
        ${section.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    </div>
  `).join('')}${note}`;
}

function renderPrint(order) {
  if (!els.print || !order) return;
  const balance = Math.max(0, money(order.totalAmount) - money(order.paidAmount));
  const lang = receiptLanguage(order.receiptLanguage);
  const status = printPaymentStatus(order, balance, lang);
  const t = lang === 'en'
    ? {
      htmlLang: 'en',
      brandLine: 'Catering · Meal Plan · Event Service',
      docEyebrow: 'ORDER CONFIRMATION',
      docTitle: 'Order Confirmation',
      invoiceNo: 'Invoice No.',
      issuedAt: 'Issued At',
      assignee: 'PIC',
      paymentStatus: 'Payment Status',
      customerDetails: 'Customer Details',
      phone: 'Phone / WhatsApp',
      source: 'Source',
      sampleOrder: 'Sample Order',
      orderCenter: 'Order Center',
      eventDetails: 'Event Details',
      category: 'Category',
      dateTime: 'Date & Time',
      venue: 'Venue',
      pendingVenue: 'To be confirmed',
      itemDetails: 'Item Details',
      itemNo: '#',
      item: 'Item',
      qty: 'Qty',
      unitPrice: 'Unit Price',
      amount: 'Amount',
      menuNotes: 'Menu / Service Notes',
      paymentNotes: 'Payment Notes',
      paymentLine1: 'Payment method follows the details confirmed by WhatsApp.',
      paymentLine2: 'Deposit confirms the order. Balance should be settled before delivery or before service completion.',
      total: 'Total',
      paid: 'Paid',
      balance: 'Balance',
      termsTitle: 'Confirmation Notes',
      terms: [
        'This document is prepared based on the current pax, menu and service details.',
        'Final pricing depends on location, portion, transport, tableware and on-site service.',
        'Any menu or timing changes should be confirmed by WhatsApp to avoid omissions.'
      ],
      customerSign: 'Customer Confirmation',
      companySign: '90 PROJECT Confirmation'
    }
    : {
      htmlLang: 'zh-Hans',
      brandLine: 'Catering · Meal Plan · Event Service',
      docEyebrow: 'ORDER CONFIRMATION',
      docTitle: '订单确认单',
      invoiceNo: '单据编号',
      issuedAt: '开单时间',
      assignee: '负责人',
      paymentStatus: '付款状态',
      customerDetails: '顾客资料',
      phone: '电话 / WhatsApp',
      source: '订单来源',
      sampleOrder: '样品订单',
      orderCenter: '订单经营中心',
      eventDetails: '活动资料',
      category: '类别',
      dateTime: '日期时间',
      venue: '地点',
      pendingVenue: '待确认',
      itemDetails: '项目明细',
      itemNo: '#',
      item: '项目',
      qty: '数量',
      unitPrice: '单价',
      amount: '金额',
      menuNotes: '菜单内容 / 服务备注',
      paymentNotes: '付款说明',
      paymentLine1: '付款方式：按 WhatsApp 确认的付款资料处理。',
      paymentLine2: '订金确认订单；余额请在送餐前或现场服务完成前确认。',
      total: '应收总额',
      paid: '已收款',
      balance: '余额',
      termsTitle: '确认事项',
      terms: [
        '此单据按目前人数、菜单和服务资料制作。',
        '最终报价会按地点、份量、运输、餐具和现场服务确认。',
        '菜单或时间如需调整，请通过 WhatsApp 确认，避免遗漏。'
      ],
      customerSign: '顾客确认',
      companySign: '90 PROJECT 确认'
    };
  els.print.innerHTML = `
    <article class="order-print-paper" lang="${escapeHtml(t.htmlLang)}">
      <header class="order-print-letterhead">
        <div class="order-print-brand">
          <img src="${LOGO_PATH}" alt="90 PROJECT logo" />
          <div>
            <strong>九零食刻 90 PROJECT</strong>
            <span>${escapeHtml(t.brandLine)}</span>
            <small>WhatsApp ${BUSINESS_PHONE_DISPLAY} · ${BUSINESS_EMAIL} · ${BUSINESS_WEBSITE}</small>
          </div>
        </div>
        <div class="order-print-doc">
          <span>${escapeHtml(t.docEyebrow)}</span>
          <strong>${escapeHtml(t.docTitle)}</strong>
          <em>${escapeHtml(status)}</em>
        </div>
      </header>

      <section class="order-print-meta">
        <div><span>${escapeHtml(t.invoiceNo)}</span><strong>${escapeHtml(order.invoiceNo || '-')}</strong></div>
        <div><span>${escapeHtml(t.issuedAt)}</span><strong>${escapeHtml(issuedDateTime())}</strong></div>
        <div><span>${escapeHtml(t.assignee)}</span><strong>${escapeHtml(assigneeLabel(order.assignee, lang))}</strong></div>
        <div><span>${escapeHtml(t.paymentStatus)}</span><strong>${escapeHtml(status)}</strong></div>
      </section>

      <section class="order-print-two">
        <div class="order-print-box">
          <h3>${escapeHtml(t.customerDetails)}</h3>
          <p><b>${escapeHtml(order.customerName || '-')}</b></p>
          <p>${escapeHtml(t.phone)}: ${escapeHtml(order.phone || '-')}</p>
          <p>${escapeHtml(t.source)}: ${escapeHtml(order.source === 'demo' ? t.sampleOrder : t.orderCenter)}</p>
        </div>
        <div class="order-print-box">
          <h3>${escapeHtml(t.eventDetails)}</h3>
          <p><b>${escapeHtml(order.title || serviceTypeLabel(order.serviceType, lang) || '-')}</b></p>
          <p>${escapeHtml(t.category)}: ${escapeHtml(categoryText(order, lang) || '-')}</p>
          <p>${escapeHtml(t.dateTime)}: ${escapeHtml(printDateTime(order.eventDate, order.eventTime, lang))}</p>
          <p>${escapeHtml(t.venue)}: ${escapeHtml(order.location || t.pendingVenue)}</p>
        </div>
      </section>

      <section class="order-print-section">
        <h3>${escapeHtml(t.itemDetails)}</h3>
        <table class="order-print-items">
          <thead><tr><th>${escapeHtml(t.itemNo)}</th><th>${escapeHtml(t.item)}</th><th>${escapeHtml(t.qty)}</th><th>${escapeHtml(t.unitPrice)}</th><th>${escapeHtml(t.amount)}</th></tr></thead>
          <tbody>${printItemRows(order, lang)}</tbody>
        </table>
      </section>

      <section class="order-print-section">
        <h3>${escapeHtml(t.menuNotes)}</h3>
        <div class="order-print-menu">${printMenuHtml(order.itemsSummary, lang)}</div>
      </section>

      <section class="order-print-payment">
        <div class="order-print-pay-note">
          <h3>${escapeHtml(t.paymentNotes)}</h3>
          <p>${escapeHtml(t.paymentLine1)}</p>
          <p>${escapeHtml(t.paymentLine2)}</p>
        </div>
        <div class="order-print-total">
          <div><span>${escapeHtml(t.total)}</span><strong>${escapeHtml(formatMoney(order.totalAmount))}</strong></div>
          <div><span>${escapeHtml(t.paid)}</span><strong>${escapeHtml(formatMoney(order.paidAmount))}</strong></div>
          <div class="${balance > 0 ? 'is-due' : 'is-clear'}"><span>${escapeHtml(t.balance)}</span><strong>${escapeHtml(formatMoney(balance))}</strong></div>
        </div>
      </section>

      <section class="order-print-footer-grid">
        <section class="order-print-terms">
          <h3>${escapeHtml(t.termsTitle)}</h3>
          <ol>
            ${t.terms.map(term => `<li>${escapeHtml(term)}</li>`).join('')}
          </ol>
        </section>

        <footer class="order-print-sign">
          <div><span>${escapeHtml(t.customerSign)}</span></div>
          <div><span>${escapeHtml(t.companySign)}</span><b>${escapeHtml(assigneeLabel(order.assignee, lang))}</b></div>
        </footer>
      </section>
    </article>
  `;
}

function buildPrintDocument() {
  const lang = els.print?.querySelector('.order-print-paper')?.getAttribute('lang') || 'zh-Hans';
  return `<!doctype html>
<html lang="${escapeHtml(lang)}">
<head>
  <meta charset="utf-8">
  <title>90 PROJECT 订单</title>
  <style>
    *{box-sizing:border-box}
    @page{size:A4;margin:8mm}
    html,body{width:210mm;min-height:297mm}
    body{margin:0;background:#fff;color:#101828;font-family:Arial,"Microsoft YaHei",sans-serif;font-size:11px;line-height:1.32}
    .order-print-paper{width:194mm;max-height:281mm;margin:0 auto;padding:0;overflow:hidden}
    .order-print-letterhead{display:grid;grid-template-columns:minmax(0,1fr) 180px;gap:14px;align-items:start;border-bottom:2px solid #101828;padding-bottom:10px;margin-bottom:8px}
    .order-print-brand{display:flex;gap:10px;align-items:flex-start}
    .order-print-brand img{width:46px;height:46px;border-radius:50%;object-fit:cover}
    .order-print-brand strong{display:block;font-size:21px;line-height:1.05}
    .order-print-brand span,.order-print-brand small{display:block;color:#667085;font-size:9px;font-weight:700;line-height:1.32;letter-spacing:0}
    .order-print-doc{text-align:right}
    .order-print-doc span{display:block;color:#9a6a2e;font-size:9px;font-weight:900;letter-spacing:0}
    .order-print-doc strong{display:block;margin-top:3px;font-size:18px}
    .order-print-doc em{display:inline-flex;margin-top:6px;border:1px solid #9a6a2e;border-radius:999px;padding:4px 9px;color:#7a4d16;font-style:normal;font-weight:900}
    .order-print-meta,.order-print-two{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:7px}
    .order-print-meta div,.order-print-box,.order-print-section,.order-print-payment,.order-print-terms,.order-print-sign div{border:1px solid #d0d5dd;border-radius:6px;background:#fff;padding:7px}
    .order-print-meta span,.order-print-total span{display:block;color:#667085;font-size:8px;font-weight:900;letter-spacing:0;text-transform:uppercase}
    .order-print-meta strong{display:block;margin-top:2px;font-size:10.5px;overflow-wrap:anywhere}
    .order-print-two{grid-template-columns:1fr 1fr}
    .order-print-box h3,.order-print-section h3,.order-print-pay-note h3,.order-print-terms h3{margin:0 0 5px;font-size:11px}
    .order-print-box p,.order-print-pay-note p{margin:2px 0;color:#344054;font-size:10px;line-height:1.32}
    .order-print-box b{color:#101828;font-size:12px}
    .order-print-section{margin-bottom:7px}
    .order-print-items{width:100%;border-collapse:collapse;font-size:10px}
    .order-print-items th{text-align:left;border-bottom:1px solid #98a2b3;padding:4px 5px;color:#475467;font-size:8px;letter-spacing:0;text-transform:uppercase}
    .order-print-items td{border-bottom:1px solid #eaecf0;padding:5px;vertical-align:top}
    .order-print-items td:nth-child(1),.order-print-items td:nth-child(3){width:34px;text-align:center}
    .order-print-items td:nth-child(4),.order-print-items td:nth-child(5),.order-print-items th:nth-child(4),.order-print-items th:nth-child(5){text-align:right}
    .order-print-items strong{display:block}
    .order-print-items span{display:block;color:#667085;margin-top:1px}
    .order-print-menu{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
    .order-print-menu-group{border:1px solid #eaecf0;border-radius:6px;background:#f8fafc;padding:7px}
    .order-print-menu-group strong{display:block;margin-bottom:3px;color:#7a4d16;font-size:10.5px}
    .order-print-menu-group ul{margin:0;padding-left:14px;color:#344054;line-height:1.25}
    .order-print-menu-note{grid-column:1/-1;color:#7a4d16;font-size:9px;font-weight:900}
    .order-print-payment{display:grid;grid-template-columns:minmax(0,1fr) 230px;gap:8px;margin-bottom:7px}
    .order-print-total{border-left:3px solid #101828;padding-left:8px}
    .order-print-total div{display:flex;justify-content:space-between;gap:12px;padding:3px 0;border-bottom:1px solid #eaecf0}
    .order-print-total div:last-child{border-bottom:0}
    .order-print-total strong{font-size:15px}
    .order-print-total .is-due strong{color:#b42318}
    .order-print-total .is-clear strong{color:#0f9f6e}
    .order-print-footer-grid{display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:8px;align-items:stretch}
    .order-print-terms ol{margin:0;padding-left:15px;color:#344054;font-size:9px;line-height:1.32}
    .order-print-sign{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .order-print-sign div{min-height:50px;display:flex;flex-direction:column;justify-content:flex-end}
    .order-print-sign span{display:block;border-top:1px solid #98a2b3;padding-top:4px;color:#475467;font-size:9px;font-weight:900}
    .order-print-sign b{margin-top:2px;font-size:10px}
  </style>
</head>
<body>${els.print?.innerHTML || ''}</body>
</html>`;
}

function printOrder(order) {
  if (!order) return;
  renderPrint(order);
  if (window.AndroidPosBridge?.printReceipt) {
    window.AndroidPosBridge.printReceipt(buildPrintDocument());
    return;
  }
  window.setTimeout(() => window.print(), 50);
}

async function loadCloudState() {
  try {
    const config = await cloud.init();
    state.cloudReady = Boolean(config?.configured);
    if (!state.cloudReady) {
      state.syncState = 'local';
      state.syncMessage = '本机';
      return;
    }
    const result = await cloud.loadSharedGrowthState({ admin: true });
    if (result.ok && result.state && typeof growthApi.replaceState === 'function') {
      growthApi.replaceState(result.state);
      state.syncState = 'ok';
      state.syncMessage = '已同步';
      return;
    }
    if (result.reason === 'missing_admin_session') {
      clearAdminLoggedIn();
      state.syncState = 'error';
      state.syncMessage = '请重新登录';
      renderAccess();
      return;
    }
    state.syncState = result.skipped ? 'local' : 'error';
    state.syncMessage = result.skipped ? '本机' : '云端失败';
  } catch {
    state.syncState = 'error';
    state.syncMessage = '云端失败';
  }
}

function renderAccess() {
  if (!isPreviewMode() && hasStaleAdminLogin()) {
    setLoginMessage('请重新输入管理员密码，订单才可以同步云端。');
  }
  const loggedIn = isAdminLoggedIn();
  els.app.hidden = !loggedIn;
  els.lock.hidden = loggedIn;
}

function bind() {
  els.loginForm?.addEventListener('submit', async event => {
    event.preventDefault();
    const email = els.loginEmail?.value.trim().toLowerCase() || '';
    const password = els.loginPassword?.value || '';
    if (email !== ADMIN_EMAIL || hashLocalSecret(password) !== ADMIN_PASSWORD_HASH) {
      setLoginMessage('后台账号或密码不正确。');
      return;
    }
    setAdminLoggedIn(password);
    setLoginMessage('已进入系统。', true);
    renderAccess();
    await loadCloudState();
    render();
  });

  document.addEventListener('click', async event => {
    const tab = event.target.closest('[data-order-view]');
    if (tab) {
      setView(tab.dataset.orderView || 'overview');
      return;
    }

    if (event.target.closest('[data-order-new]')) {
      openOrderSheet();
      return;
    }

    if (event.target.closest('[data-order-close]')) {
      closeOrderSheet();
      return;
    }

    if (event.target.closest('[data-order-category-delete]')) {
      const selectedCategories = selectedCategoryValues();
      const currentCategory = selectedCategories[0] || cleanSettingValue(formFields.serviceType?.value || '');
      const settings = savedOrderSettings();
      const fallback = settings.categories.find(item => cleanSettingValue(item).toLocaleLowerCase() !== currentCategory.toLocaleLowerCase())
        || orderSettingDefaults.categories.find(item => cleanSettingValue(item).toLocaleLowerCase() !== currentCategory.toLocaleLowerCase())
        || '其他服务';
      if (!currentCategory || !confirmRemoveSetting('categories', currentCategory, fallback)) return;
      const remainingSelected = selectedCategories.filter(item => cleanSettingValue(item).toLocaleLowerCase() !== currentCategory.toLocaleLowerCase());
      if (formFields.serviceType) formFields.serviceType.value = remainingSelected[0] || fallback;
      updateFormDeleteButtons();
      const replacement = await removeOrderSetting('categories', currentCategory, { confirm: false });
      renderOrderSelects(currentOrders(), { categories: remainingSelected.length ? remainingSelected : [replacement || fallback], assignee: formFields.assignee?.value || '未分配' });
      updateFormDeleteButtons();
      setFormMessage(currentCategory ? `类别「${currentCategory}」已删除，当前订单保留「${(selectedCategoryValues()[0] || replacement || fallback)}」。` : '', true);
      return;
    }

    if (event.target.closest('[data-order-assignee-delete]')) {
      const currentAssignee = cleanSettingValue(formFields.assignee?.value || '');
      if (!currentAssignee || !confirmRemoveSetting('assignees', currentAssignee, '未分配')) return;
      if (formFields.assignee) formFields.assignee.value = '未分配';
      updateFormDeleteButtons();
      await removeOrderSetting('assignees', currentAssignee, { confirm: false });
      if (formFields.assignee) formFields.assignee.value = '未分配';
      updateFormDeleteButtons();
      setFormMessage(currentAssignee ? `负责人「${currentAssignee}」已删除，当前订单改为未分配。` : '', true);
      return;
    }

    if (event.target === els.sheet) {
      closeOrderSheet();
      return;
    }

    const edit = event.target.closest('[data-order-edit]');
    if (edit) {
      openOrderSheet(edit.dataset.orderEdit);
      return;
    }

    const whatsapp = event.target.closest('[data-order-whatsapp]');
    if (whatsapp) {
      openWhatsApp(findOrder(whatsapp.dataset.orderWhatsapp));
      return;
    }

    const print = event.target.closest('[data-order-print]');
    if (print) {
      printOrder(findOrder(print.dataset.orderPrint));
      return;
    }

    const calendarPrev = event.target.closest('[data-calendar-prev]');
    if (calendarPrev) {
      state.calendarMonth = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth() - 1, 1);
      render();
      return;
    }

    const calendarNext = event.target.closest('[data-calendar-next]');
    if (calendarNext) {
      state.calendarMonth = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth() + 1, 1);
      render();
      return;
    }

    const day = event.target.closest('[data-calendar-date]');
    if (day) {
      const date = day.dataset.calendarDate || '';
      const hasOrders = currentOrders().some(order => order.eventDate === date);
      if (hasOrders) {
        state.dateFilter = date;
        state.view = 'orders';
        render();
      } else {
        openOrderSheet('', date);
      }
      return;
    }

    if (event.target.closest('[data-clear-date-filter]')) {
      state.dateFilter = '';
      render();
      return;
    }

    const configAdd = event.target.closest('[data-order-config-add]');
    if (configAdd) {
      const group = configAdd.dataset.orderConfigAdd;
      const input = els.configInputs[group];
      const added = await addOrderSetting(group, input?.value || '');
      if (added && input) input.value = '';
      return;
    }

    const configEdit = event.target.closest('[data-order-config-edit]');
    if (configEdit) {
      await editOrderSetting(configEdit.dataset.orderConfigEdit, configEdit.dataset.orderConfigValue);
      return;
    }

    const configRemove = event.target.closest('[data-order-config-remove]');
    if (configRemove) {
      await removeOrderSetting(configRemove.dataset.orderConfigRemove, configRemove.dataset.orderConfigValue);
    }
  });

  Object.entries(els.configInputs).forEach(([group, input]) => {
    input?.addEventListener('keydown', async event => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      const added = await addOrderSetting(group, input.value);
      if (added) input.value = '';
    });
  });

  [[ 'assignees', formFields.assignee ]].forEach(([group, select]) => {
    select?.addEventListener('focus', () => {
      select.dataset.previousValue = select.value || '';
    });
    select?.addEventListener('change', async () => {
      if (select.value !== CUSTOM_OPTION_VALUE) {
        select.dataset.previousValue = select.value || '';
        updateFormDeleteButtons();
        return;
      }
      const label = orderSettingLabels[group]?.singular || '名单';
      const value = cleanSettingValue(window.prompt(`新增${label}`));
      if (!value) {
        renderOrderSelects(currentOrders(), { [group === 'categories' ? 'serviceType' : 'assignee']: select.dataset.previousValue || '' });
        updateFormDeleteButtons();
        return;
      }
      const added = await addOrderSetting(group, value);
      renderOrderSelects(currentOrders(), { assignee: added || value });
      updateFormDeleteButtons();
    });
  });

  els.categoryPicker?.addEventListener('change', event => {
    if (!event.target.closest('[data-order-category-option]')) return;
    const selected = selectedCategoryValues();
    if (!selected.length) {
      event.target.checked = true;
      setFormMessage('每张订单至少保留一个类别。');
      return;
    }
    formFields.serviceType.value = selected[0] || '活动餐饮';
    updateFormDeleteButtons();
  });

  els.categoryPicker?.addEventListener('click', async event => {
    if (!event.target.closest('[data-order-category-add-inline]')) return;
    const value = cleanSettingValue(window.prompt('新增类别'));
    if (!value) return;
    const selected = selectedCategoryValues();
    const added = await addOrderSetting('categories', value);
    renderOrderSelects(currentOrders(), { categories: normalizeSettingList([...selected, added || value], []) });
    updateFormDeleteButtons();
  });

  els.search?.addEventListener('input', event => {
    state.query = event.target.value || '';
    renderAllOrders(currentOrders());
  });

  els.statusFilter?.addEventListener('change', event => {
    state.status = event.target.value || 'all';
    renderAllOrders(currentOrders());
  });

  els.form?.addEventListener('submit', async event => {
    event.preventDefault();
    await saveOrderFromForm();
  });

  document.querySelector('[data-order-form-whatsapp]')?.addEventListener('click', async () => {
    const order = await saveOrderFromForm({ close: false });
    if (order) openWhatsApp(order);
  });

  document.querySelector('[data-order-form-print]')?.addEventListener('click', async () => {
    const order = await saveOrderFromForm({ close: false });
    if (order) printOrder(order);
  });

  window.addEventListener('storage', event => {
    if (event.key === 'np90_growth_mock_v1') render();
  });
}

async function init() {
  bind();
  renderAccess();
  if (isAdminLoggedIn()) await loadCloudState();
  render();
}

init();
