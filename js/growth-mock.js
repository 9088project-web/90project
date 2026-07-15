import { createGrowthApi, money } from './growth-domain.mjs';
import { createGrowthCloud } from './growth-cloud.mjs';

const api = createGrowthApi();
const cloud = createGrowthCloud();
const LANG_KEY = 'np90_growth_language_v1';
const translations = {
  zh: {
    language: '中文',
    rewards: '会员奖励',
    referral: '90推荐官',
    member: '会员中心',
    home: '返回首页',
    login: '会员登录',
    logout: '退出登录',
    register: '注册会员',
    name: '姓名',
    email: 'Email',
    phone: '手机号码',
    password: '密码（至少 6 个字符）',
    loginAction: '登录',
    registerAction: '创建会员',
    welcome: '分享九零食刻，把美好食刻介绍给朋友，也获得属于你的推荐奖励。',
    apply: '成为90推荐官',
    applyIntro: '通过审核后，你可以获得专属推荐代码、分享链接和佣金记录。',
    pending: '审核中',
    approved: '已批准',
    code: '专属推荐代码',
    share: '分享链接',
    points: '积分余额',
    coupons: '可用优惠券',
    commissions: '可提现佣金',
    orders: '我的订单',
    enquiries: '我的询价',
    applySubmit: '提交申请',
    socialPlatform: '社交平台',
    socialAccount: '社交账号',
    region: '所在地区',
    method: '推荐方式',
    customerType: '预计客户类型',
    agreeTerms: '我同意90推荐官条款',
    agreePrivacy: '我同意隐私政策',
    enquiry: '模拟建立询价',
    complete: '模拟完成订单',
    refund: '模拟退款',
    release: '释放可提现佣金',
    withdrawal: '提交提现',
    amount: '提现金额',
    bank: '银行名称',
    account: '银行账号',
    accountName: '账户姓名',
    mock: 'Mock 模式：不会真实收款、转账或发送 API 通知。',
    noData: '目前还没有记录。',
    shareText: '分享九零食刻，把美好食刻介绍给朋友：',
    identity: 'Email / 手机号码', copy: '复制链接', whatsapp: 'WhatsApp',
    benefitsTitle: '会员权益', benefitsIntro: '奖励透明、记录清楚，所有积分和佣金都以真实询价与完成订单为依据。',
    pointsTitle: '会员积分', pointsDesc: '注册、完成订单和指定活动都可以获得积分，账本会记录每一笔变化。',
    couponTitle: '专属优惠', couponDesc: '新人券、服务券、生日券和限时活动由后台规则控制，避免优惠重复叠加。',
    rewardTitle: '推荐奖励', rewardDesc: '只支持一级真实订单推荐，订单完成并通过退款观察期后才进入可提现状态。',
    pathTitle: '清楚的奖励路径', pathRegister: '注册会员', pathWelcome: '+ 欢迎积分', pathOrder: '完成真实订单', pathPoints: '积分入账', pathRefer: '推荐朋友完成服务', pathCommission: '佣金确认', pathHold: '通过退款观察期', pathWithdraw: '可申请提现', startTitle: '立即开始', startDesc: '先注册会员，之后可以在会员中心查看积分、优惠券、订单、推荐和提现记录。',
    stepsTitle: '三步开始', stepsIntro: '只允许一级直接推荐，奖励来自真实订单，不收取入会费，不提供多层分佣。',
    stepApply: '注册成为90推荐官', stepApplyDesc: '提交社交平台、地区和推荐方式，等待后台审核。', stepShare: '分享专属链接或二维码', stepShareDesc: '系统记录首次有效访问，已绑定的会员不会被其他推荐代码覆盖。', stepEarn: '订单完成后获得奖励', stepEarnDesc: '订单完成并经过退款观察期，佣金才会变成可提现状态。',
    rulesTitle: '透明规则', rulesMode: '奖励模式', rulesModeValue: '一级直接推荐', rulesRate: '默认佣金', rulesRateValue: '后台可调整', rulesSettle: '结算条件', rulesSettleValue: '完成订单 + 观察期', rulesWithdraw: '提现方式', rulesWithdrawValue: 'Mock 人工审核', notMemberTitle: '还不是会员？', notMemberDesc: '先注册会员，再在会员中心提交90推荐官申请。审核通过后才会生成推荐代码。',
    mockTitle: 'Mock 流程测试', mockDesc: '仅用于本地验收：创建询价、完成订单、模拟退款和释放观察期佣金。',
    memberLevel: '会员等级', commissionBook: '佣金账本', application: '成为90推荐官', memberMock: 'Mock 模式：不会真实收款、转账或发送 API 通知。'
  },
  en: {
    language: 'English', rewards: 'Member Rewards', referral: '90 Promoter', member: 'Member Centre', home: 'Home', login: 'Member Login', logout: 'Log out', register: 'Register', name: 'Name', email: 'Email', phone: 'Mobile number', password: 'Password (at least 6 characters)', loginAction: 'Log in', registerAction: 'Create member', welcome: 'Share 90 PROJECT with friends and earn transparent referral rewards.', apply: 'Become a 90 Promoter', applyIntro: 'After approval, you receive a referral code, share link and commission records.', pending: 'Under review', approved: 'Approved', code: 'Referral code', share: 'Share link', points: 'Points balance', coupons: 'Available coupons', commissions: 'Available commission', orders: 'My orders', enquiries: 'My enquiries', applySubmit: 'Submit application', socialPlatform: 'Social platform', socialAccount: 'Social account', region: 'Region', method: 'Promotion method', customerType: 'Expected customer type', agreeTerms: 'I agree to the promoter terms', agreePrivacy: 'I agree to the privacy policy', enquiry: 'Mock enquiry', complete: 'Mock complete order', refund: 'Mock refund', release: 'Release commission', withdrawal: 'Submit withdrawal', amount: 'Withdrawal amount', bank: 'Bank name', account: 'Bank account', accountName: 'Account name', mock: 'Mock mode: no real payment, bank transfer or API notification is used.', noData: 'No records yet.', shareText: 'Share 90 PROJECT with your friends:', identity: 'Email / mobile number', copy: 'Copy link', whatsapp: 'WhatsApp', benefitsTitle: 'Member benefits', benefitsIntro: 'Rewards are transparent and traceable, based on real enquiries and completed orders.', pointsTitle: 'Member points', pointsDesc: 'Earn points from registration, completed orders and selected campaigns. Every change is recorded.', couponTitle: 'Member coupons', couponDesc: 'Welcome, service, birthday and campaign coupons are controlled by admin rules.', rewardTitle: 'Referral rewards', rewardDesc: 'Only one-level direct referrals are supported. Commission becomes withdrawable after the refund observation period.', pathTitle: 'A clear reward path', pathRegister: 'Register as a member', pathWelcome: '+ Welcome points', pathOrder: 'Complete an eligible order', pathPoints: 'Points credited', pathRefer: 'Refer a friend who completes service', pathCommission: 'Commission confirmed', pathHold: 'Pass the refund observation period', pathWithdraw: 'Withdrawal available', startTitle: 'Start now', startDesc: 'Register first, then review points, coupons, orders, referrals and withdrawals in the member centre.', stepsTitle: 'Three simple steps', stepsIntro: 'Only direct one-level referrals are supported. Rewards come from real orders; there is no joining fee or multi-level commission.', stepApply: 'Register as a 90 Promoter', stepApplyDesc: 'Submit your platform, region and promotion method for admin review.', stepShare: 'Share your link or QR code', stepShareDesc: 'The first valid visit is recorded and an existing member binding cannot be overwritten.', stepEarn: 'Earn after the order is completed', stepEarnDesc: 'Commission becomes withdrawable after order completion and the refund observation period.', rulesTitle: 'Transparent rules', rulesMode: 'Reward model', rulesModeValue: 'One-level direct referral', rulesRate: 'Default commission', rulesRateValue: 'Adjustable by admin', rulesSettle: 'Settlement condition', rulesSettleValue: 'Completed order + hold period', rulesWithdraw: 'Withdrawal method', rulesWithdrawValue: 'Mock manual review', notMemberTitle: 'Not a member yet?', notMemberDesc: 'Register first, then submit the promoter application in the member centre. A referral code is created after approval.', mockTitle: 'Mock flow testing', mockDesc: 'For local acceptance only: create an enquiry, complete an order, simulate a refund and release held commission.', memberLevel: 'Member level', commissionBook: 'Commission ledger', application: 'Become a 90 Promoter', memberMock: 'Mock mode: no real payment, bank transfer or API notification is used.'
  },
  ms: {
    language: 'Bahasa Melayu', rewards: 'Ganjaran Ahli', referral: 'Promoter 90', member: 'Pusat Ahli', home: 'Laman Utama', login: 'Log Masuk Ahli', logout: 'Log Keluar', register: 'Daftar Ahli', name: 'Nama', email: 'Email', phone: 'Nombor telefon', password: 'Kata laluan (sekurang-kurangnya 6 aksara)', loginAction: 'Log Masuk', registerAction: 'Daftar', welcome: 'Kongsi 90 PROJECT dengan rakan dan dapatkan ganjaran rujukan yang telus.', apply: 'Menjadi Promoter 90', applyIntro: 'Selepas diluluskan, anda menerima kod rujukan, pautan kongsi dan rekod komisen.', pending: 'Dalam semakan', approved: 'Diluluskan', code: 'Kod rujukan', share: 'Pautan kongsi', points: 'Baki mata', coupons: 'Kupon tersedia', commissions: 'Komisen tersedia', orders: 'Pesanan saya', enquiries: 'Pertanyaan saya', applySubmit: 'Hantar permohonan', socialPlatform: 'Platform sosial', socialAccount: 'Akaun sosial', region: 'Kawasan', method: 'Cara promosi', customerType: 'Jenis pelanggan', agreeTerms: 'Saya bersetuju dengan terma promoter', agreePrivacy: 'Saya bersetuju dengan dasar privasi', enquiry: 'Pertanyaan mock', complete: 'Lengkapkan pesanan mock', refund: 'Pulangan wang mock', release: 'Lepaskan komisen', withdrawal: 'Hantar pengeluaran', amount: 'Jumlah pengeluaran', bank: 'Nama bank', account: 'Nombor akaun bank', accountName: 'Nama pemegang akaun', mock: 'Mod mock: tiada bayaran, pemindahan bank atau notifikasi API sebenar.', noData: 'Belum ada rekod.', shareText: 'Kongsi 90 PROJECT dengan rakan:', identity: 'Email / nombor telefon', copy: 'Salin pautan', whatsapp: 'WhatsApp', benefitsTitle: 'Faedah ahli', benefitsIntro: 'Ganjaran adalah telus dan boleh dijejak berdasarkan pertanyaan serta pesanan sebenar.', pointsTitle: 'Mata ahli', pointsDesc: 'Dapatkan mata melalui pendaftaran, pesanan lengkap dan kempen terpilih.', couponTitle: 'Kupon ahli', couponDesc: 'Kupon alu-aluan, servis, hari jadi dan kempen dikawal oleh pentadbir.', rewardTitle: 'Ganjaran rujukan', rewardDesc: 'Hanya rujukan langsung satu tahap disokong. Komisen boleh dikeluarkan selepas tempoh pemerhatian bayaran balik.', pathTitle: 'Laluan ganjaran yang jelas', pathRegister: 'Daftar sebagai ahli', pathWelcome: '+ Mata alu-aluan', pathOrder: 'Lengkapkan pesanan layak', pathPoints: 'Mata dikreditkan', pathRefer: 'Rujuk rakan yang melengkapkan servis', pathCommission: 'Komisen disahkan', pathHold: 'Lepasi tempoh pemerhatian bayaran balik', pathWithdraw: 'Pengeluaran tersedia', startTitle: 'Mula sekarang', startDesc: 'Daftar dahulu, kemudian semak mata, kupon, pesanan, rujukan dan pengeluaran di pusat ahli.', stepsTitle: 'Tiga langkah mudah', stepsIntro: 'Hanya rujukan langsung satu tahap disokong. Ganjaran datang daripada pesanan sebenar tanpa yuran keahlian atau komisen berbilang tahap.', stepApply: 'Daftar sebagai Promoter 90', stepApplyDesc: 'Hantar platform, kawasan dan cara promosi untuk semakan pentadbir.', stepShare: 'Kongsi pautan atau kod QR', stepShareDesc: 'Lawatan sah pertama direkodkan dan ikatan ahli sedia ada tidak boleh ditukar.', stepEarn: 'Dapatkan ganjaran selepas pesanan selesai', stepEarnDesc: 'Komisen boleh dikeluarkan selepas pesanan selesai dan tempoh pemerhatian bayaran balik.', rulesTitle: 'Peraturan telus', rulesMode: 'Model ganjaran', rulesModeValue: 'Rujukan langsung satu tahap', rulesRate: 'Komisen lalai', rulesRateValue: 'Boleh diubah pentadbir', rulesSettle: 'Syarat penyelesaian', rulesSettleValue: 'Pesanan selesai + tempoh tahan', rulesWithdraw: 'Kaedah pengeluaran', rulesWithdrawValue: 'Semakan manual mock', notMemberTitle: 'Belum menjadi ahli?', notMemberDesc: 'Daftar dahulu, kemudian hantar permohonan promoter di pusat ahli. Kod rujukan dijana selepas diluluskan.', mockTitle: 'Ujian aliran mock', mockDesc: 'Untuk penerimaan tempatan sahaja: cipta pertanyaan, lengkapkan pesanan, simulasi bayaran balik dan lepaskan komisen tertahan.', memberLevel: 'Tahap ahli', commissionBook: 'Lejar komisen', application: 'Menjadi Promoter 90', memberMock: 'Mod mock: tiada bayaran, pemindahan bank atau notifikasi API sebenar.'
  }
};

Object.assign(translations.zh, {
  rewards: '会员奖励',
  referral: '90推荐官',
  member: '会员中心',
  home: '返回首页',
  login: '会员登录',
  logout: '退出登录',
  register: '注册会员',
  name: '姓名',
  email: 'Email',
  phone: '手机号码',
  password: '密码（至少 6 个字符）',
  loginAction: '登录',
  registerAction: '创建会员',
  apply: '成为90推荐官',
  applyIntro: '通过审核后，你可以获得专属推荐代码、分享链接和佣金记录。',
  pending: '审核中',
  approved: '已批准',
  code: '专属推荐代码',
  share: '分享链接',
  points: '积分余额',
  coupons: '可用优惠券',
  commissions: '可提现佣金',
  orders: '我的订单',
  withdrawal: '提交提现',
  amount: '提现金额',
  bank: '银行名称',
  account: '银行账号',
  accountName: '账户姓名',
  noData: '目前还没有记录。',
  identity: 'Email / 手机号码',
  copy: '复制链接',
  whatsapp: 'WhatsApp',
  memberLevel: '会员等级',
  commissionBook: '佣金账本',
  application: '成为90推荐官',
  shareText: '分享九零食刻给朋友：',
  socialPlatform: '社交平台',
  socialAccount: '社交账号',
  region: '所在地区',
  method: '推荐方式',
  customerType: '预计客户类型',
  agreeTerms: '我同意90推荐官条款',
  agreePrivacy: '我同意隐私政策',
  applySubmit: '提交申请'
});

let language = ['zh', 'en', 'ms'].includes(localStorage.getItem(LANG_KEY)) ? localStorage.getItem(LANG_KEY) : 'zh';
const t = key => translations[language][key] || translations.zh[key] || key;
const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const formatMoney = value => `RM${money(value).toFixed(2)}`;
const currentMember = () => api.currentMember();
const page = document.body?.dataset.growthPage || '';
let cloudReady = false;
let cloudGrowthSnapshot = null;

function setText(selector, value) {
  document.querySelectorAll(selector).forEach(element => { element.textContent = value; });
}

function setMessage(message, error = false) {
  document.querySelectorAll('[data-growth-message]').forEach(element => {
    element.textContent = message;
    element.classList.toggle('error', error);
  });
}

function setCloudStatus(message, connected = false) {
  document.querySelectorAll('[data-growth-cloud-status]').forEach(element => {
    element.textContent = message;
    element.classList.toggle('is-connected', connected);
  });
}

async function syncCloudDashboard(member = currentMember()) {
  if (!cloudReady || !member) return null;
  const session = cloud.getSession();
  if (!session?.access_token) return null;
  try {
    const [profile, growth] = await Promise.all([
      cloud.loadProfile(session),
      cloud.loadMemberGrowth(session)
    ]);
    if (profile) {
      const imported = api.importMember(cloud.profileToMember(profile, session, member));
      if (imported.ok) member = imported.member;
    }
    cloudGrowthSnapshot = growth;
    setCloudStatus('Supabase 已连接，会员资料会同步云端。', true);
    return { member, growth };
  } catch (error) {
    console.warn('Growth cloud sync failed', error);
    setCloudStatus('Supabase 已配置，但当前读取失败；页面继续使用本地记录。', false);
    return null;
  }
}

function applyLanguage() {
  document.documentElement.lang = language === 'zh' ? 'zh-Hans' : language === 'ms' ? 'ms' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    if (!key) return;
    const field = element.querySelector('input, select, textarea');
    if (field) {
      const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (textNode) textNode.textContent = `${t(key)} `;
      else element.insertBefore(document.createTextNode(`${t(key)} `), field);
    } else {
      element.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-growth-language]').forEach(button => button.classList.toggle('active', button.dataset.growthLanguage === language));
  document.title = page === 'member' ? `${t('member')} | 90 PROJECT` : page === 'referral' ? `${t('referral')} | 90 PROJECT` : `${t('rewards')} | 90 PROJECT`;
}

function shareUrl(code) {
  return `${location.origin}/referral.html?ref=${encodeURIComponent(code)}`;
}

function renderAuthState() {
  const member = currentMember();
  document.querySelectorAll('[data-growth-auth]').forEach(element => { element.hidden = Boolean(member); });
  document.querySelectorAll('[data-growth-dashboard]').forEach(element => { element.hidden = !member; });
  document.querySelectorAll('[data-growth-member-name]').forEach(element => { element.textContent = member?.name || ''; });
}

function renderMemberDashboard() {
  const member = currentMember();
  const dashboard = document.querySelector('[data-growth-dashboard]');
  if (!member || !dashboard) return;
  const summary = api.summary(member.id);
  const promoter = summary.promoter;
  const code = summary.referralCode;
  const application = api.getState().promoterApplications.find(item => item.memberId === member.id);
  const state = api.getState();
  document.querySelector('[data-growth-points]').textContent = String(summary.points);
  document.querySelector('[data-growth-coupons]').textContent = String(summary.coupons.length);
  document.querySelector('[data-growth-commission]').textContent = formatMoney(summary.availableCommission);
  document.querySelector('[data-growth-level]').textContent = state.config.levels.find(item => item.id === member.levelId)?.name || '90 Member';
  document.querySelectorAll('[data-member-field]').forEach(field => {
    field.value = member[field.dataset.memberField] || '';
  });
  document.querySelectorAll('[data-member-summary]').forEach(element => {
    const key = element.dataset.memberSummary;
    element.textContent = member[key] || '-';
  });
  const promoterBox = document.querySelector('[data-growth-promoter-box]');
  if (promoter?.status === 'approved' && code) {
    promoterBox.innerHTML = `<span class="growth-badge">${esc(t('approved'))}</span><h3>${esc(t('code'))}</h3><code class="growth-code">${esc(code)}</code><p>${esc(t('share'))}:<br><a href="${esc(shareUrl(code))}">${esc(shareUrl(code))}</a></p><div class="growth-actions"><button class="growth-button" type="button" data-copy-growth="${esc(shareUrl(code))}">${esc(t('copy'))}</button><a class="growth-button secondary" target="_blank" rel="noopener" href="https://wa.me/601110977166?text=${encodeURIComponent(`${t('shareText')} ${shareUrl(code)}`)}">${esc(t('whatsapp'))}</a></div>`;
  } else if (application) {
    promoterBox.innerHTML = `<span class="growth-badge">${esc(application.status === 'submitted' ? t('pending') : application.status)}</span><h3>${esc(t('apply'))}</h3><p>${esc(t('applyIntro'))}</p>`;
  } else {
    promoterBox.innerHTML = `<h3>${esc(t('apply'))}</h3><p>${esc(t('applyIntro'))}</p><a class="growth-button" href="#promoter-application">${esc(t('apply'))}</a>`;
  }
  const list = document.querySelector('[data-growth-order-list]');
  list.innerHTML = summary.orders.length ? summary.orders.map(order => `<li><span>${esc(order.serviceType || 'Service')}<br><small>${esc(order.status)}</small></span><b>${formatMoney(order.totalAmount)}</b></li>`).join('') : `<li>${esc(t('noData'))}</li>`;
  const commissionList = document.querySelector('[data-growth-commission-list]');
  const cloudCommissions = cloudGrowthSnapshot?.commissions || [];
  const allCommissions = cloudCommissions.length
    ? cloudCommissions.map(item => ({ status: item.status, orderId: item.order_id || item.orderId || 'cloud', commissionAmount: item.commission_amount || item.commissionAmount }))
    : summary.commissions;
  commissionList.innerHTML = allCommissions.length ? allCommissions.map(item => `<li><span>${esc(item.status)}<br><small>${esc(item.orderId)}</small></span><b>${formatMoney(item.commissionAmount)}</b></li>`).join('') : `<li>${esc(t('noData'))}</li>`;
  const couponList = document.querySelector('[data-growth-coupon-list]');
  if (couponList) {
    const cloudCoupons = cloudGrowthSnapshot?.coupons || [];
    couponList.innerHTML = cloudCoupons.length
      ? cloudCoupons.map(coupon => {
        const template = Array.isArray(coupon.growth_coupon_templates) ? coupon.growth_coupon_templates[0] : coupon.growth_coupon_templates;
        const name = template?.name?.zh || template?.name?.en || coupon.code;
        const value = template?.discount_type === 'percent' ? `${template.discount_value}%` : formatMoney(template?.discount_value || 0);
        return `<li><span>${esc(name)}<br><small>${esc(coupon.code)} · ${coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : '-'}</small></span><b>${value}</b></li>`;
      }).join('')
      : summary.coupons.length ? summary.coupons.map(coupon => `<li><span>${esc(coupon.name)}<br><small>${esc(coupon.code)} · ${new Date(coupon.expiresAt).toLocaleDateString()}</small></span><b>${coupon.discountType === 'percent' ? `${coupon.discountValue}%` : formatMoney(coupon.discountValue)}</b></li>`).join('') : `<li>${esc(t('noData'))}</li>`;
  }
  const pointsList = document.querySelector('[data-growth-points-list]');
  if (pointsList) {
    const entries = (cloudGrowthSnapshot?.points || []).length
      ? cloudGrowthSnapshot.points.map(item => ({ reason: item.reason || item.transaction_type, createdAt: item.created_at, points: item.points }))
      : state.pointsLedgers.filter(item => item.memberId === member.id).slice(0, 6);
    pointsList.innerHTML = entries.length ? entries.map(item => `<li><span>${esc(item.reason || item.transactionType)}<br><small>${new Date(item.createdAt).toLocaleDateString()}</small></span><b>${Number(item.points) > 0 ? '+' : ''}${Number(item.points)}</b></li>`).join('') : `<li>${esc(t('noData'))}</li>`;
  }
  const noticeList = document.querySelector('[data-growth-notification-list]');
  if (noticeList) {
    const notices = (cloudGrowthSnapshot?.notifications || []).length
      ? cloudGrowthSnapshot.notifications.map(item => ({
        title: item.title?.zh || item.title?.en || item.notification_type,
        body: item.body?.zh || item.body?.en || '',
        createdAt: item.created_at
      }))
      : summary.notifications;
    noticeList.innerHTML = notices.length ? notices.slice(0, 6).map(item => `<li><span>${esc(item.title)}<br><small>${esc(item.body)}</small></span><b>${new Date(item.createdAt).toLocaleDateString()}</b></li>`).join('') : `<li>${esc(t('noData'))}</li>`;
  }
  renderAuthState();
}

function bindMemberPage() {
  const registerForm = document.getElementById('growthRegisterForm');
  const loginForm = document.getElementById('growthLoginForm');
  registerForm?.addEventListener('submit', async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(registerForm));
    const result = api.registerMember(data);
    if (!result.ok) return setMessage(result.reason === 'duplicate_member' ? 'Email or phone already exists.' : 'Please complete all details. Password needs 6 characters.', true);
    api.grantCoupon(result.member.id, { name: 'New member welcome', code: 'WELCOME90', discountType: 'fixed', discountValue: 20 });
    if (cloudReady) {
      const cloudResult = await cloud.signUp(result.member, data.password);
      if (cloudResult.ok && cloudResult.session) {
        await cloud.updateProfile(result.member, cloudResult.session);
        await syncCloudDashboard(result.member);
        setMessage('会员已创建，并已同步 Supabase。');
      } else if (cloudResult.ok) {
        setMessage('会员已创建。Supabase 可能需要 Email 确认后才会同步。');
      } else {
        setMessage('会员已创建，本地可用；Supabase 同步暂时失败。', true);
      }
    } else {
      setMessage('会员已创建。欢迎积分与新会员优惠券已加入。');
    }
    renderMemberDashboard();
  });
  loginForm?.addEventListener('submit', async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(loginForm));
    let result = api.loginMember(data.identity, data.password);
    if (!result.ok && cloudReady) {
      const cloudLogin = await cloud.signIn(data.identity, data.password);
      if (cloudLogin.ok) {
        const profile = await cloud.loadProfile(cloudLogin.session);
        const imported = api.importMember(cloud.profileToMember(profile, cloudLogin.session, { email: data.identity, password: data.password }));
        result = imported.ok ? { ok: true, member: imported.member } : result;
      }
    } else if (result.ok && cloudReady) {
      const cloudLogin = await cloud.signIn(result.member.email, data.password);
      if (cloudLogin.ok) await syncCloudDashboard(result.member);
    }
    if (!result.ok) return setMessage('Email / phone or password is incorrect.', true);
    setMessage(cloudReady ? '会员已登录，正在同步云端资料。' : '会员已登录。');
    await syncCloudDashboard(result.member);
    renderMemberDashboard();
  });
  document.getElementById('growthLogout')?.addEventListener('click', () => { cloud.signOut(); api.logoutMember(); cloudGrowthSnapshot = null; renderAuthState(); });
  document.getElementById('growthProfileForm')?.addEventListener('submit', async event => {
    event.preventDefault();
    const member = currentMember();
    if (!member) return setMessage('请先登录会员。', true);
    const result = api.updateMemberProfile(member.id, Object.fromEntries(new FormData(event.currentTarget)));
    if (!result.ok) return setMessage('会员资料保存失败。', true);
    if (cloudReady && cloud.getSession()?.access_token) {
      const cloudResult = await cloud.updateProfile(result.member);
      setMessage(cloudResult.ok ? '会员资料已保存，并已同步云端。' : '会员资料已保存，本次云端同步失败。', !cloudResult.ok);
    } else {
      setMessage('会员资料已保存。');
    }
    renderMemberDashboard();
  });
  document.getElementById('growthPromoterForm')?.addEventListener('submit', async event => {
    event.preventDefault();
    const member = currentMember();
    if (!member) return setMessage('Please log in first.', true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    data.termsAccepted = event.currentTarget.querySelector('[name="termsAccepted"]').checked;
    data.privacyAccepted = event.currentTarget.querySelector('[name="privacyAccepted"]').checked;
    const result = api.submitPromoterApplication(member.id, data);
    if (!result.ok) return setMessage('Please accept the terms and privacy policy.', true);
    if (cloudReady && cloud.getSession()?.access_token) {
      const cloudResult = await cloud.submitPromoterApplication(data);
      setMessage(cloudResult.ok ? '推荐官申请已提交，并已同步云端。' : '推荐官申请已保存在本地，云端同步暂时失败。', !cloudResult.ok);
      await syncCloudDashboard(member);
    } else {
      setMessage('推荐官申请已提交审核。');
    }
    event.currentTarget.reset();
    renderMemberDashboard();
  });
  document.getElementById('growthWithdrawalForm')?.addEventListener('submit', async event => {
    event.preventDefault();
    const member = currentMember();
    if (!member) return setMessage('Please log in first.', true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = api.submitWithdrawal(member.id, data);
    if (!result.ok) return setMessage(`Withdrawal could not be submitted: ${result.reason}.`, true);
    if (cloudReady && cloud.getSession()?.access_token) {
      const cloudResult = await cloud.submitWithdrawal(data);
      setMessage(cloudResult.ok ? '提现申请已提交，并已同步云端。' : '提现申请已保存在本地，云端同步暂时失败。', !cloudResult.ok);
      await syncCloudDashboard(member);
    } else {
      setMessage('提现申请已提交后台审核。');
    }
    event.currentTarget.reset();
    renderMemberDashboard();
  });
  document.querySelectorAll('[data-growth-mock]').forEach(button => button.addEventListener('click', () => {
    const member = currentMember();
    if (!member) return setMessage('Please log in first.', true);
    const summary = api.summary(member.id);
    if (button.dataset.growthMock === 'enquiry') {
      const enquiry = api.createEnquiry(member.id, { serviceType: 'Meal Plan', pax: 2, budget: 300, notes: 'Mock enquiry' });
      if (enquiry.ok) api.createOrder(member.id, enquiry.enquiry.id, { totalAmount: 300, serviceType: 'Meal Plan' });
    } else if (button.dataset.growthMock === 'complete') {
      const order = api.getState().orders.find(item => item.memberId === member.id && ['confirmed', 'deposit_paid'].includes(item.status));
      if (order) api.completeOrder(order.id);
    } else if (button.dataset.growthMock === 'refund') {
      const order = api.getState().orders.find(item => item.memberId === member.id && item.status === 'service_completed');
      if (order) api.refundOrder(order.id, order.totalAmount / 2);
    } else if (button.dataset.growthMock === 'release') {
      api.mockAdvanceCommissionObservation('mock-admin');
    }
    renderMemberDashboard();
  }));
}

function bindReferralPage() {
  const code = new URLSearchParams(location.search).get('ref');
  const status = document.querySelector('[data-referral-status]');
  if (!code) return;
  const result = api.captureReferralVisit(code, '/referral.html');
  if (status) status.textContent = result.ok ? `Referral code ${code.toUpperCase()} recorded for this visit.` : 'This referral link is not active.';
}

function renderAdmin() {
  const root = document.querySelector('[data-growth-admin]');
  if (!root) return;
  const snapshot = api.adminSnapshot();
  const metric = (selector, value) => { const element = document.querySelector(selector); if (element) element.textContent = String(value); };
  metric('[data-admin-growth="applications"]', snapshot.applications.filter(item => item.status === 'submitted').length);
  metric('[data-admin-growth="promoters"]', snapshot.promoters.filter(item => item.status === 'approved').length);
  metric('[data-admin-growth="commission"]', formatMoney(snapshot.commissions.reduce((sum, item) => sum + Number(item.commissionAmount || 0), 0)));
  metric('[data-admin-growth="withdrawals"]', snapshot.withdrawals.filter(item => !['paid', 'rejected', 'cancelled'].includes(item.status)).length);
  const appRows = document.querySelector('[data-growth-admin-applications]');
  appRows.innerHTML = snapshot.applications.length ? snapshot.applications.map(item => `<tr><td>${esc(item.name)}<br><small>${esc(item.email)}</small></td><td>${esc(item.status)}</td><td>${esc(item.region || '-')}</td><td><div class="growth-admin-actions"><button class="growth-button" data-review-app="${item.id}" data-decision="approve">Approve</button><button class="growth-button secondary" data-review-app="${item.id}" data-decision="reject">Reject</button></div></td></tr>`).join('') : '<tr><td colspan="4">No promoter applications.</td></tr>';
  const commissionRows = document.querySelector('[data-growth-admin-commissions]');
  commissionRows.innerHTML = snapshot.commissions.length ? snapshot.commissions.map(item => `<tr><td>${esc(item.orderId)}</td><td>${esc(item.status)}</td><td>${formatMoney(item.eligibleAmount)}</td><td>${formatMoney(item.commissionAmount)}</td></tr>`).join('') : '<tr><td colspan="4">No commission ledger entries.</td></tr>';
  const withdrawalRows = document.querySelector('[data-growth-admin-withdrawals]');
  withdrawalRows.innerHTML = snapshot.withdrawals.length ? snapshot.withdrawals.map(item => `<tr><td>${esc(item.id)}</td><td>${formatMoney(item.amount)}</td><td>${esc(item.status)}</td><td><div class="growth-admin-actions"><button class="growth-button" data-review-withdrawal="${item.id}" data-decision="approve">Approve</button><button class="growth-button" data-review-withdrawal="${item.id}" data-decision="paid">Mock Paid</button></div></td></tr>`).join('') : '<tr><td colspan="4">No withdrawals.</td></tr>';
  const config = snapshot.config;
  document.querySelector('[data-growth-config-percent]').value = config.defaultCommission.value;
  document.querySelector('[data-growth-config-hold]').value = config.refundObservationDays;
  document.querySelector('[data-growth-config-min]').value = config.minimumWithdrawal;
}

function bindAdmin() {
  if (!document.querySelector('[data-growth-admin]')) return;
  document.addEventListener('click', event => {
    const appButton = event.target.closest('[data-review-app]');
    if (appButton) {
      api.reviewPromoterApplication(appButton.dataset.reviewApp, appButton.dataset.decision, 'mock-admin', appButton.dataset.decision === 'reject' ? 'Mock review rejection' : 'Mock review approval');
      renderAdmin();
      return;
    }
    const withdrawalButton = event.target.closest('[data-review-withdrawal]');
    if (withdrawalButton) {
      api.reviewWithdrawal(withdrawalButton.dataset.reviewWithdrawal, withdrawalButton.dataset.decision, 'mock-admin', { referenceNumber: `MOCK-${Date.now()}` });
      renderAdmin();
      return;
    }
    const copyButton = event.target.closest('[data-copy-growth]');
    if (copyButton) navigator.clipboard?.writeText(copyButton.dataset.copyGrowth);
  });
  document.querySelector('[data-growth-config-form]')?.addEventListener('submit', event => {
    event.preventDefault();
    const config = api.getState().config;
    config.defaultCommission.value = Number(document.querySelector('[data-growth-config-percent]').value) || 0;
    config.refundObservationDays = Number(document.querySelector('[data-growth-config-hold]').value) || 7;
    config.minimumWithdrawal = Number(document.querySelector('[data-growth-config-min]').value) || 50;
    api.updateConfig(config, 'mock-admin');
    renderAdmin();
  });
  renderAdmin();
}

document.querySelectorAll('[data-growth-language]').forEach(button => button.addEventListener('click', () => { language = button.dataset.growthLanguage; localStorage.setItem(LANG_KEY, language); applyLanguage(); if (page === 'member') renderMemberDashboard(); }));
document.addEventListener('click', event => {
  const link = event.target.closest('[data-growth-copy]');
  if (link) navigator.clipboard?.writeText(link.dataset.growthCopy);
});

if (page === 'member') {
  const cloudState = await cloud.init();
  cloudReady = Boolean(cloudState.configured);
  setCloudStatus(cloudReady ? 'Supabase 已连接，会员资料会同步云端。' : '本地会员模式：Supabase 尚未配置或暂不可用。', cloudReady);
  bindMemberPage();
  renderAuthState();
  await syncCloudDashboard();
  renderMemberDashboard();
} else {
  await cloud.init();
}
if (page === 'referral') bindReferralPage();
bindAdmin();
applyLanguage();

window.NP90GrowthMock = api;
