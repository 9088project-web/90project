(function () {
  const STORE_KEY = 'np90_pos_orders_v1';
  const DRAFT_KEY = 'np90_pos_draft_v1';
  const LOGO_PATH = 'assets/images/logo/logo-icon-dark.jpg';
  const BUSINESS_PHONE = '0189490908';

  const packages = [
    { group: 'catering', name: 'Set A', desc: '主食 2 · 肉类 2 · 菜 / 豆腐 / 炸料 2', qty: 10, price: 29.9, service: '活动餐饮' },
    { group: 'catering', name: 'Set B', desc: '主食 2 · 肉类 1 · 菜 / 炸料 / 豆腐 2 · 海鲜 1', qty: 10, price: 32.9, service: '活动餐饮' },
    { group: 'catering', name: 'Set C', desc: '主食 2 · 肉类 2 · 菜 / 豆腐 2 · 海鲜 1', qty: 10, price: 39.9, service: '活动餐饮' },
    { group: 'catering', name: 'Set D', desc: '主食 2 · 肉类 2 · 海鲜 1 · 菜 3', qty: 10, price: 43.9, service: '活动餐饮' },
    { group: 'meal', name: '一肉两菜 + 水果 5餐', desc: 'RM82 · RM16.40 / 餐', qty: 1, price: 82, service: '包伙食' },
    { group: 'meal', name: '一肉两菜 + 水果 10餐', desc: 'RM158 · RM15.80 / 餐', qty: 1, price: 158, service: '包伙食' },
    { group: 'meal', name: '一肉两菜 + 水果 20餐', desc: 'RM300 · RM15.00 / 餐', qty: 1, price: 300, service: '包伙食' },
    { group: 'meal', name: '一肉两菜 + 水果 30餐', desc: 'RM438 · RM14.60 / 餐', qty: 1, price: 438, service: '包伙食' },
    { group: 'meal', name: '一肉两菜 + 水果 40餐', desc: 'RM568 · RM14.20 / 餐', qty: 1, price: 568, service: '包伙食' },
    { group: 'meal', name: '一肉一菜 + 水果 5餐', desc: 'RM67 · RM13.40 / 餐', qty: 1, price: 67, service: '包伙食' },
    { group: 'meal', name: '一肉一菜 + 水果 10餐', desc: 'RM128 · RM12.80 / 餐', qty: 1, price: 128, service: '包伙食' },
    { group: 'meal', name: '一肉一菜 + 水果 20餐', desc: 'RM240 · RM12.00 / 餐', qty: 1, price: 240, service: '包伙食' },
    { group: 'meal', name: '一肉一菜 + 水果 30餐', desc: 'RM348 · RM11.60 / 餐', qty: 1, price: 348, service: '包伙食' },
    { group: 'meal', name: '一肉盖饭 + 鸡蛋 5餐', desc: 'RM44 · RM8.80 / 餐', qty: 1, price: 44, service: '包伙食' },
    { group: 'meal', name: '一肉盖饭 + 鸡蛋 10餐', desc: 'RM85 · RM8.50 / 餐', qty: 1, price: 85, service: '包伙食' },
    { group: 'meal', name: '一肉盖饭 + 鸡蛋 20餐', desc: 'RM160 · RM8.00 / 餐', qty: 1, price: 160, service: '包伙食' },
    { group: 'service', name: '运输费', desc: '按地点调整', qty: 1, price: 30, service: '其他服务' },
    { group: 'service', name: '餐具 / 用品', desc: '一次性餐具或现场用品', qty: 1, price: 20, service: '活动餐饮' },
    { group: 'service', name: '现场服务人员', desc: '活动现场协助', qty: 1, price: 120, service: '活动餐饮' },
    { group: 'service', name: '场地布置订金', desc: '布置设计预收安排', qty: 1, price: 300, service: '场地布置' }
  ];

  const state = {
    activeGroup: 'catering',
    items: []
  };

  const $ = selector => document.querySelector(selector);
  const els = {};

  function money(value) {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function formatMoney(value) {
    return `RM${money(value).toFixed(2)}`;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[char]);
  }

  function cleanPhone(phone) {
    const digits = String(phone || '').replace(/\D/g, '');
    if (!digits) return '';
    if (digits.startsWith('60')) return digits;
    if (digits.startsWith('0')) return `60${digits.slice(1)}`;
    return digits;
  }

  function todayDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function createInvoiceNo() {
    const date = new Date();
    const stamp = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('');
    return `90P-${stamp}-${String(Date.now()).slice(-5)}`;
  }

  function setMessage(message, isError = false) {
    if (!els.message) return;
    els.message.textContent = message || '';
    els.message.classList.toggle('is-error', Boolean(isError));
    if (window.AndroidPosBridge?.toast && message) window.AndroidPosBridge.toast(String(message));
  }

  function readRecords() {
    try {
      const records = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
      return Array.isArray(records) ? records : [];
    } catch {
      return [];
    }
  }

  function writeRecords(records) {
    localStorage.setItem(STORE_KEY, JSON.stringify(records.slice(0, 40)));
  }

  function saveDraft() {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(readData()));
  }

  function loadDraft() {
    try {
      return JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function itemAmount(item) {
    return money(item.qty * item.price);
  }

  function totals() {
    const subtotal = state.items.reduce((sum, item) => sum + itemAmount(item), 0);
    const delivery = money(els.deliveryFee?.value);
    const discount = money(els.discount?.value);
    const total = Math.max(0, money(subtotal + delivery - discount));
    const deposit = Math.min(total, money(els.deposit?.value));
    const balance = Math.max(0, money(total - deposit));
    return { subtotal, delivery, discount, total, deposit, balance };
  }

  function readData() {
    const total = totals();
    return {
      invoiceNo: els.invoiceNo?.value || createInvoiceNo(),
      documentType: els.docType?.value || 'invoice',
      name: els.name?.value.trim() || '',
      phone: els.phone?.value.trim() || '',
      serviceType: els.serviceType?.value || '活动餐饮',
      eventDate: els.eventDate?.value || '',
      eventTime: els.eventTime?.value || '',
      location: els.location?.value.trim() || '',
      notes: els.notes?.value.trim() || '',
      paymentMethod: els.paymentMethod?.value || 'Bank Transfer',
      items: state.items.map(item => ({ ...item })),
      ...total,
      createdAt: new Date().toISOString()
    };
  }

  function docTitle(type) {
    return ({ quotation: '报价单', invoice: 'INVOICE', receipt: '收据' })[type] || 'INVOICE';
  }

  function serviceLine(data) {
    return [data.serviceType, data.eventDate, data.eventTime].filter(Boolean).join(' · ') || data.serviceType || '-';
  }

  function renderPackages() {
    if (!els.packageGrid) return;
    els.packageGrid.innerHTML = packages
      .filter(item => item.group === state.activeGroup)
      .map((item, index) => `
        <button class="pos-package" type="button" data-package-index="${packages.indexOf(item)}">
          <strong>${escapeHtml(item.name)}</strong>
          <small>${escapeHtml(item.desc)}</small>
          <b>${escapeHtml(formatMoney(item.price))}${item.group === 'catering' ? ' / pax' : ''}</b>
        </button>
      `).join('');
  }

  function renderItems() {
    if (!els.items) return;
    if (!state.items.length) {
      els.items.innerHTML = '<div class="pos-empty">先点套餐，或加入自由项目。</div>';
      return;
    }
    els.items.innerHTML = state.items.map((item, index) => `
      <div class="pos-item-row" data-item-index="${index}">
        <input data-item-field="name" value="${escapeHtml(item.name)}" aria-label="项目名称" />
        <input data-item-field="qty" type="number" min="0" step="1" value="${escapeHtml(item.qty)}" aria-label="数量" />
        <input data-item-field="price" type="number" min="0" step="0.01" value="${money(item.price).toFixed(2)}" aria-label="单价" />
        <b>${formatMoney(itemAmount(item))}</b>
        <button class="pos-remove" type="button" data-remove-item="${index}" aria-label="删除项目">×</button>
      </div>
    `).join('');
  }

  function receiptHtml(data) {
    const rows = data.items.length
      ? data.items.map(item => `
        <div class="receipt-line">
          <span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.qty)} x ${formatMoney(item.price)}</small></span>
          <b>${formatMoney(itemAmount(item))}</b>
        </div>
      `).join('')
      : '<div class="pos-empty">还没有项目。</div>';

    return `
      <article class="receipt-paper">
        <header class="receipt-brand">
          <img src="${LOGO_PATH}" alt="90 PROJECT logo" />
          <div>
            <strong>九零食刻</strong>
            <span>90 PROJECT</span>
          </div>
        </header>
        <div class="receipt-meta">
          <div><span>单据</span><strong>${escapeHtml(docTitle(data.documentType))}</strong></div>
          <div><span>编号</span><strong>${escapeHtml(data.invoiceNo)}</strong></div>
          <div><span>顾客</span><strong>${escapeHtml(data.name || '-')}</strong></div>
          <div><span>电话</span><strong>${escapeHtml(data.phone || '-')}</strong></div>
          <div><span>服务</span><strong>${escapeHtml(serviceLine(data))}</strong></div>
          <div><span>付款</span><strong>${escapeHtml(data.paymentMethod || '-')}</strong></div>
        </div>
        ${data.location ? `<p class="receipt-note"><strong>地点：</strong>${escapeHtml(data.location)}</p>` : ''}
        <div class="receipt-lines">${rows}</div>
        <div class="receipt-totals">
          <div class="receipt-total-row"><span>小计</span><strong>${formatMoney(data.subtotal)}</strong></div>
          <div class="receipt-total-row"><span>运输 / 服务费</span><strong>${formatMoney(data.delivery)}</strong></div>
          <div class="receipt-total-row"><span>折扣</span><strong>-${formatMoney(data.discount)}</strong></div>
          <div class="receipt-total-row is-final"><span>应收总额</span><strong>${formatMoney(data.total)}</strong></div>
          <div class="receipt-total-row"><span>已收订金</span><strong>${formatMoney(data.deposit)}</strong></div>
          <div class="receipt-total-row is-balance"><span>余额</span><strong>${formatMoney(data.balance)}</strong></div>
        </div>
        ${data.notes ? `<p class="receipt-note"><strong>备注：</strong>${escapeHtml(data.notes)}</p>` : ''}
        <p class="receipt-note">价格以双方确认为准。WhatsApp：${BUSINESS_PHONE}</p>
      </article>
    `;
  }

  function buildPrintDocument(data) {
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="css/pos.css"><title>${escapeHtml(data.invoiceNo)}</title></head><body class="pos-page"><main class="pos-shell"><section class="pos-receipt">${receiptHtml(data)}</section></main></body></html>`;
  }

  function renderPreview() {
    const data = readData();
    if (els.heroTotal) els.heroTotal.textContent = formatMoney(data.total);
    if (els.heroBalance) els.heroBalance.textContent = `余额 ${formatMoney(data.balance)}`;
    if (els.receipt) els.receipt.innerHTML = receiptHtml(data);
    saveDraft();
    return data;
  }

  function buildWhatsAppMessage(data) {
    const itemLines = data.items.map((item, index) => `${index + 1}. ${item.name} x${item.qty} @ ${formatMoney(item.price)} = ${formatMoney(itemAmount(item))}`);
    return [
      '九零食刻 90 PROJECT',
      `${docTitle(data.documentType)}：${data.invoiceNo}`,
      '',
      `顾客：${data.name || '-'}`,
      `服务：${data.serviceType || '-'}`,
      data.eventDate ? `日期：${data.eventDate}${data.eventTime ? ` ${data.eventTime}` : ''}` : '',
      data.location ? `地点：${data.location}` : '',
      '',
      '项目：',
      itemLines.length ? itemLines.join('\n') : '-',
      '',
      `小计：${formatMoney(data.subtotal)}`,
      data.delivery ? `运输 / 服务费：${formatMoney(data.delivery)}` : '',
      data.discount ? `折扣：-${formatMoney(data.discount)}` : '',
      `应收总额：${formatMoney(data.total)}`,
      data.deposit ? `已收订金：${formatMoney(data.deposit)}` : '',
      `余额：${formatMoney(data.balance)}`,
      '',
      data.notes ? `备注：${data.notes}` : '',
      `WhatsApp：${BUSINESS_PHONE}`
    ].filter(Boolean).join('\n');
  }

  function saveRecord() {
    const data = readData();
    if (!data.name || !data.phone) {
      setMessage('请先填写顾客姓名和 WhatsApp。', true);
      return null;
    }
    if (!data.items.length) {
      setMessage('请先加入至少一个项目。', true);
      return null;
    }
    const records = readRecords().filter(item => item.invoiceNo !== data.invoiceNo);
    records.unshift(data);
    writeRecords(records);
    renderHistory();
    setMessage('已保存这张单。');
    return data;
  }

  function openWhatsApp() {
    const data = saveRecord();
    if (!data) return;
    const message = buildWhatsAppMessage(data);
    const phone = cleanPhone(data.phone);
    if (!phone) {
      setMessage('顾客 WhatsApp 号码不正确。', true);
      return;
    }
    if (window.AndroidPosBridge?.openWhatsApp) {
      window.AndroidPosBridge.openWhatsApp(data.phone, message);
      setMessage('正在打开 WhatsApp。');
      return;
    }
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    setMessage('WhatsApp 文案已准备。');
  }

  async function copyMessage() {
    const data = readData();
    const message = buildWhatsAppMessage(data);
    try {
      await navigator.clipboard.writeText(message);
      setMessage('WhatsApp 文案已复制。');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      setMessage('WhatsApp 文案已复制。');
    }
  }

  function printReceipt() {
    const data = saveRecord();
    if (!data) return;
    if (window.AndroidPosBridge?.printReceipt) {
      window.AndroidPosBridge.printReceipt(buildPrintDocument(data));
      setMessage('正在打开打印。');
      return;
    }
    window.print();
    setMessage('已打开打印，可以保存 PDF。');
  }

  function resetForm() {
    state.items = [];
    els.form.reset();
    els.invoiceNo.value = createInvoiceNo();
    els.eventDate.value = todayDate();
    els.deliveryFee.value = '0';
    els.discount.value = '0';
    els.deposit.value = '0';
    localStorage.removeItem(DRAFT_KEY);
    renderItems();
    renderPreview();
    setMessage('已准备新单。');
  }

  function addItem(item) {
    state.items.push({
      name: item.name,
      qty: money(item.qty || 1),
      price: money(item.price || 0),
      service: item.service || ''
    });
    if (item.service && els.serviceType) els.serviceType.value = item.service;
    renderItems();
    renderPreview();
  }

  function addManualItem() {
    const name = els.manualDesc.value.trim();
    const qty = money(els.manualQty.value || 1);
    const price = money(els.manualPrice.value);
    if (!name || price <= 0) {
      setMessage('自由项目需要填写名称和单价。', true);
      return;
    }
    addItem({ name, qty, price, service: els.serviceType.value });
    els.manualDesc.value = '';
    els.manualQty.value = '1';
    els.manualPrice.value = '';
    setMessage('项目已加入。');
  }

  function renderHistory() {
    const container = $('#posHistoryList');
    if (!container) return;
    const records = readRecords().slice(0, 8);
    if (!records.length) {
      container.innerHTML = '<div class="pos-empty">还没有保存记录。</div>';
      return;
    }
    container.innerHTML = `<div class="pos-history-list">${records.map(record => `
      <div class="pos-history-item">
        <span><strong>${escapeHtml(record.invoiceNo)}</strong><small>${escapeHtml(record.name || '-')} · ${formatMoney(record.total || 0)}</small></span>
        <button type="button" data-load-record="${escapeHtml(record.invoiceNo)}">载入</button>
      </div>
    `).join('')}</div>`;
  }

  function loadRecord(invoiceNo) {
    const record = readRecords().find(item => item.invoiceNo === invoiceNo);
    if (!record) return;
    fillForm(record);
    setMessage(`已载入 ${record.invoiceNo}。`);
  }

  function fillForm(data) {
    state.items = Array.isArray(data.items) ? data.items.map(item => ({ ...item })) : [];
    els.invoiceNo.value = data.invoiceNo || createInvoiceNo();
    els.docType.value = data.documentType || 'invoice';
    els.name.value = data.name || '';
    els.phone.value = data.phone || '';
    els.serviceType.value = data.serviceType || '活动餐饮';
    els.eventDate.value = data.eventDate || todayDate();
    els.eventTime.value = data.eventTime || '';
    els.location.value = data.location || '';
    els.notes.value = data.notes || '';
    els.deliveryFee.value = String(data.delivery ?? 0);
    els.discount.value = String(data.discount ?? 0);
    els.deposit.value = String(data.deposit ?? 0);
    els.paymentMethod.value = data.paymentMethod || 'Bank Transfer';
    renderItems();
    renderPreview();
  }

  function bind() {
    els.form.addEventListener('input', renderPreview);
    els.form.addEventListener('change', renderPreview);
    $('#posNewOrderTop')?.addEventListener('click', resetForm);
    $('#posAddManual')?.addEventListener('click', addManualItem);
    $('#posClearItems')?.addEventListener('click', () => {
      state.items = [];
      renderItems();
      renderPreview();
      setMessage('项目已清空。');
    });
    $('#posSave')?.addEventListener('click', saveRecord);
    $('#posWhatsApp')?.addEventListener('click', openWhatsApp);
    $('#posPrint')?.addEventListener('click', printReceipt);
    $('#posCopy')?.addEventListener('click', copyMessage);

    document.addEventListener('click', event => {
      const tab = event.target.closest('[data-pos-filter]');
      if (tab) {
        state.activeGroup = tab.dataset.posFilter;
        document.querySelectorAll('[data-pos-filter]').forEach(button => button.classList.toggle('active', button === tab));
        renderPackages();
        return;
      }
      const packageButton = event.target.closest('[data-package-index]');
      if (packageButton) {
        const item = packages[Number(packageButton.dataset.packageIndex)];
        if (item) {
          addItem(item);
          setMessage(`${item.name} 已加入。`);
        }
        return;
      }
      const remove = event.target.closest('[data-remove-item]');
      if (remove) {
        state.items.splice(Number(remove.dataset.removeItem), 1);
        renderItems();
        renderPreview();
        return;
      }
      const deposit = event.target.closest('[data-pos-deposit]');
      if (deposit) {
        const total = totals().total;
        const rate = Number(deposit.dataset.posDeposit);
        els.deposit.value = rate ? money(total * rate).toFixed(2) : '0';
        renderPreview();
        return;
      }
      const load = event.target.closest('[data-load-record]');
      if (load) loadRecord(load.dataset.loadRecord);
    });

    els.items.addEventListener('input', event => {
      const row = event.target.closest('[data-item-index]');
      if (!row) return;
      const index = Number(row.dataset.itemIndex);
      const field = event.target.dataset.itemField;
      if (!state.items[index] || !field) return;
      state.items[index][field === 'price' ? 'price' : field] = field === 'name' ? event.target.value : money(event.target.value);
      renderPreview();
      row.querySelector('b').textContent = formatMoney(itemAmount(state.items[index]));
    });
  }

  function initElements() {
    Object.assign(els, {
      form: $('#posForm'),
      packageGrid: $('#posPackageGrid'),
      items: $('#posItems'),
      receipt: $('#posReceiptPreview'),
      message: $('#posMessage'),
      heroTotal: $('#posHeroTotal'),
      heroBalance: $('#posHeroBalance'),
      docType: $('#posDocType'),
      name: $('#posCustomerName'),
      phone: $('#posCustomerPhone'),
      invoiceNo: $('#posInvoiceNo'),
      eventDate: $('#posEventDate'),
      eventTime: $('#posEventTime'),
      serviceType: $('#posServiceType'),
      location: $('#posLocation'),
      notes: $('#posNotes'),
      deliveryFee: $('#posDeliveryFee'),
      discount: $('#posDiscount'),
      deposit: $('#posDeposit'),
      paymentMethod: $('#posPaymentMethod'),
      manualDesc: $('#posManualDesc'),
      manualQty: $('#posManualQty'),
      manualPrice: $('#posManualPrice')
    });
  }

  function init() {
    initElements();
    if (!els.form) return;
    const draft = loadDraft();
    if (draft) fillForm(draft);
    else resetForm();
    renderPackages();
    renderHistory();
    bind();
  }

  init();
})();
