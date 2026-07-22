import { createGrowthApi, money } from './growth-domain.mjs';
import { createGrowthCloud } from './growth-cloud.mjs';

const api = createGrowthApi();
const cloud = createGrowthCloud();
const LANG_KEY = 'np90_growth_language_v1';
const GROWTH_ORDER_QUEUE_KEY = 'np90_growth_order_queue_v1';
const SUPABASE_ADMIN_SESSION_KEY = 'np90_supabase_session_v1';
const translations = {
  zh: {
    language: 'ä¸­æ–‡',
    rewards: 'ä¼šå‘˜å¥–åŠ±',
    referral: '90æŽ¨èå®˜',
    member: 'ä¼šå‘˜ä¸­å¿ƒ',
    home: 'è¿”å›žé¦–é¡µ',
    login: 'ä¼šå‘˜ç™»å½•',
    logout: 'é€€å‡ºç™»å½•',
    register: 'æ³¨å†Œä¼šå‘˜',
    name: 'å§“å',
    email: 'Email',
    phone: 'æ‰‹æœºå·ç ',
    password: 'å¯†ç ï¼ˆè‡³å°‘ 6 ä¸ªå­—ç¬¦ï¼‰',
    loginAction: 'ç™»å½•',
    registerAction: 'åˆ›å»ºä¼šå‘˜',
    welcome: 'åˆ†äº«ä¹é›¶é£Ÿåˆ»ï¼ŒæŠŠç¾Žå¥½é£Ÿåˆ»ä»‹ç»ç»™æœ‹å‹ï¼Œä¹ŸèŽ·å¾—å±žäºŽä½ çš„æŽ¨èå¥–åŠ±ã€‚',
    apply: 'æˆä¸º90æŽ¨èå®˜',
    applyIntro: 'é€šè¿‡å®¡æ ¸åŽï¼Œä½ å¯ä»¥èŽ·å¾—ä¸“å±žæŽ¨èä»£ç ã€åˆ†äº«é“¾æŽ¥å’Œä½£é‡‘è®°å½•ã€‚',
    pending: 'å®¡æ ¸ä¸­',
    approved: 'å·²æ‰¹å‡†',
    code: 'ä¸“å±žæŽ¨èä»£ç ',
    share: 'åˆ†äº«é“¾æŽ¥',
    points: 'ç§¯åˆ†ä½™é¢',
    coupons: 'å¯ç”¨ä¼˜æƒ åˆ¸',
    commissions: 'å¯æçŽ°ä½£é‡‘',
    orders: 'æˆ‘çš„è®¢å•',
    enquiries: 'æˆ‘çš„è¯¢ä»·',
    applySubmit: 'æäº¤ç”³è¯·',
    socialPlatform: 'ç¤¾äº¤å¹³å°',
    socialAccount: 'ç¤¾äº¤è´¦å·',
    region: 'æ‰€åœ¨åœ°åŒº',
    method: 'æŽ¨èæ–¹å¼',
    customerType: 'é¢„è®¡å®¢æˆ·ç±»åž‹',
    agreeTerms: 'æˆ‘åŒæ„90æŽ¨èå®˜æ¡æ¬¾',
    agreePrivacy: 'æˆ‘åŒæ„éšç§æ”¿ç­–',
    enquiry: 'æ¨¡æ‹Ÿå»ºç«‹è¯¢ä»·',
    complete: 'æ¨¡æ‹Ÿå®Œæˆè®¢å•',
    refund: 'æ¨¡æ‹Ÿé€€æ¬¾',
    release: 'é‡Šæ”¾å¯æçŽ°ä½£é‡‘',
    withdrawal: 'æäº¤æçŽ°',
    amount: 'æçŽ°é‡‘é¢',
    bank: 'é“¶è¡Œåç§°',
    account: 'é“¶è¡Œè´¦å·',
    accountName: 'è´¦æˆ·å§“å',
    mock: 'Mock æ¨¡å¼ï¼šä¸ä¼šçœŸå®žæ”¶æ¬¾ã€è½¬è´¦æˆ–å‘é€ API é€šçŸ¥ã€‚',
    noData: 'ç›®å‰è¿˜æ²¡æœ‰è®°å½•ã€‚',
    shareText: 'åˆ†äº«ä¹é›¶é£Ÿåˆ»ï¼ŒæŠŠç¾Žå¥½é£Ÿåˆ»ä»‹ç»ç»™æœ‹å‹ï¼š',
    identity: 'Email / æ‰‹æœºå·ç ', copy: 'å¤åˆ¶é“¾æŽ¥', whatsapp: 'WhatsApp',
    benefitsTitle: 'ä¼šå‘˜æƒç›Š', benefitsIntro: 'å¥–åŠ±é€æ˜Žã€è®°å½•æ¸…æ¥šï¼Œæ‰€æœ‰ç§¯åˆ†å’Œä½£é‡‘éƒ½ä»¥çœŸå®žè¯¢ä»·ä¸Žå®Œæˆè®¢å•ä¸ºä¾æ®ã€‚',
    pointsTitle: 'ä¼šå‘˜ç§¯åˆ†', pointsDesc: 'æ³¨å†Œã€å®Œæˆè®¢å•å’ŒæŒ‡å®šæ´»åŠ¨éƒ½å¯ä»¥èŽ·å¾—ç§¯åˆ†ï¼Œè´¦æœ¬ä¼šè®°å½•æ¯ä¸€ç¬”å˜åŒ–ã€‚',
    couponTitle: 'ä¸“å±žä¼˜æƒ ', couponDesc: 'æ–°äººåˆ¸ã€æœåŠ¡åˆ¸ã€ç”Ÿæ—¥åˆ¸å’Œé™æ—¶æ´»åŠ¨ç”±åŽå°è§„åˆ™æŽ§åˆ¶ï¼Œé¿å…ä¼˜æƒ é‡å¤å åŠ ã€‚',
    rewardTitle: 'æŽ¨èå¥–åŠ±', rewardDesc: 'æ”¯æŒä¸‰å±‚çœŸå®žè®¢å•æŽ¨èï¼šç¬¬ä¸€ä»£3%ï¼Œç¬¬äºŒä»£1%ï¼Œç¬¬ä¸‰ä»£1%ï¼Œè®¢å•å®Œæˆå¹¶é€šè¿‡é€€æ¬¾è§‚å¯ŸæœŸåŽæ‰è¿›å…¥å¯æçŽ°çŠ¶æ€ã€‚',
    pathTitle: 'æ¸…æ¥šçš„å¥–åŠ±è·¯å¾„', pathRegister: 'æ³¨å†Œä¼šå‘˜', pathWelcome: '+ æ¬¢è¿Žç§¯åˆ†', pathOrder: 'å®ŒæˆçœŸå®žè®¢å•', pathPoints: 'ç§¯åˆ†å…¥è´¦', pathRefer: 'æŽ¨èæœ‹å‹å®ŒæˆæœåŠ¡', pathCommission: 'ä½£é‡‘ç¡®è®¤', pathHold: 'é€šè¿‡é€€æ¬¾è§‚å¯ŸæœŸ', pathWithdraw: 'å¯ç”³è¯·æçŽ°', startTitle: 'ç«‹å³å¼€å§‹', startDesc: 'å…ˆæ³¨å†Œä¼šå‘˜ï¼Œä¹‹åŽå¯ä»¥åœ¨ä¼šå‘˜ä¸­å¿ƒæŸ¥çœ‹ç§¯åˆ†ã€ä¼˜æƒ åˆ¸ã€è®¢å•ã€æŽ¨èå’ŒæçŽ°è®°å½•ã€‚',
    stepsTitle: 'ä¸‰æ­¥å¼€å§‹', stepsIntro: 'æœ€å¤šè¿½è¸ªä¸‰å±‚æŽ¨èå…³ç³»ï¼Œå¥–åŠ±åªæ¥è‡ªçœŸå®žå®Œæˆè®¢å•ï¼Œä¸æ”¶å–å…¥ä¼šè´¹ï¼Œä¸é æ‹‰äººæ”¶è´¹ã€‚',
    stepApply: 'æ³¨å†Œæˆä¸º90æŽ¨èå®˜', stepApplyDesc: 'æäº¤ç¤¾äº¤å¹³å°ã€åœ°åŒºå’ŒæŽ¨èæ–¹å¼ï¼Œç­‰å¾…åŽå°å®¡æ ¸ã€‚', stepShare: 'åˆ†äº«ä¸“å±žé“¾æŽ¥æˆ–äºŒç»´ç ', stepShareDesc: 'ç³»ç»Ÿè®°å½•é¦–æ¬¡æœ‰æ•ˆè®¿é—®ï¼Œå·²ç»‘å®šçš„ä¼šå‘˜ä¸ä¼šè¢«å…¶ä»–æŽ¨èä»£ç è¦†ç›–ã€‚', stepEarn: 'è®¢å•å®ŒæˆåŽèŽ·å¾—å¥–åŠ±', stepEarnDesc: 'è®¢å•å®Œæˆå¹¶ç»è¿‡é€€æ¬¾è§‚å¯ŸæœŸï¼Œä½£é‡‘æ‰ä¼šå˜æˆå¯æçŽ°çŠ¶æ€ã€‚',
    rulesTitle: 'é€æ˜Žè§„åˆ™', rulesMode: 'å¥–åŠ±æ¨¡å¼', rulesModeValue: 'ä¸‰å±‚æŽ¨èå¥–åŠ±', rulesRate: 'é»˜è®¤ä½£é‡‘', rulesRateValue: 'ç¬¬ä¸€ä»£3% Â· ç¬¬äºŒä»£1% Â· ç¬¬ä¸‰ä»£1%', rulesSettle: 'ç»“ç®—æ¡ä»¶', rulesSettleValue: 'å®Œæˆè®¢å• + è§‚å¯ŸæœŸ', rulesWithdraw: 'æçŽ°æ–¹å¼', rulesWithdrawValue: 'Mock äººå·¥å®¡æ ¸', notMemberTitle: 'è¿˜ä¸æ˜¯ä¼šå‘˜ï¼Ÿ', notMemberDesc: 'å…ˆæ³¨å†Œä¼šå‘˜ï¼Œå†åœ¨ä¼šå‘˜ä¸­å¿ƒæäº¤90æŽ¨èå®˜ç”³è¯·ã€‚å®¡æ ¸é€šè¿‡åŽæ‰ä¼šç”ŸæˆæŽ¨èä»£ç ã€‚',
    mockTitle: 'Mock æµç¨‹æµ‹è¯•', mockDesc: 'ä»…ç”¨äºŽæœ¬åœ°éªŒæ”¶ï¼šåˆ›å»ºè¯¢ä»·ã€å®Œæˆè®¢å•ã€æ¨¡æ‹Ÿé€€æ¬¾å’Œé‡Šæ”¾è§‚å¯ŸæœŸä½£é‡‘ã€‚',
    memberLevel: 'ä¼šå‘˜ç­‰çº§', commissionBook: 'ä½£é‡‘è´¦æœ¬', application: 'æˆä¸º90æŽ¨èå®˜', memberMock: 'Mock æ¨¡å¼ï¼šä¸ä¼šçœŸå®žæ”¶æ¬¾ã€è½¬è´¦æˆ–å‘é€ API é€šçŸ¥ã€‚'
  },
  en: {
    language: 'English', rewards: 'Member Rewards', referral: '90 Promoter', member: 'Member Centre', home: 'Home', login: 'Member Login', logout: 'Log out', register: 'Register', name: 'Name', email: 'Email', phone: 'Mobile number', password: 'Password (at least 6 characters)', loginAction: 'Log in', registerAction: 'Create member', welcome: 'Share 90 PROJECT with friends and earn transparent referral rewards.', apply: 'Become a 90 Promoter', applyIntro: 'After approval, you receive a referral code, share link and commission records.', pending: 'Under review', approved: 'Approved', code: 'Referral code', share: 'Share link', points: 'Points balance', coupons: 'Available coupons', commissions: 'Available commission', orders: 'My orders', enquiries: 'My enquiries', applySubmit: 'Submit application', socialPlatform: 'Social platform', socialAccount: 'Social account', region: 'Region', method: 'Promotion method', customerType: 'Expected customer type', agreeTerms: 'I agree to the promoter terms', agreePrivacy: 'I agree to the privacy policy', enquiry: 'Mock enquiry', complete: 'Mock complete order', refund: 'Mock refund', release: 'Release commission', withdrawal: 'Submit withdrawal', amount: 'Withdrawal amount', bank: 'Bank name', account: 'Bank account', accountName: 'Account name', mock: 'Mock mode: no real payment, bank transfer or API notification is used.', noData: 'No records yet.', shareText: 'Share 90 PROJECT with your friends:', identity: 'Email / mobile number', copy: 'Copy link', whatsapp: 'WhatsApp', benefitsTitle: 'Member benefits', benefitsIntro: 'Rewards are transparent and traceable, based on real enquiries and completed orders.', pointsTitle: 'Member points', pointsDesc: 'Earn points from registration, completed orders and selected campaigns. Every change is recorded.', couponTitle: 'Member coupons', couponDesc: 'Welcome, service, birthday and campaign coupons are controlled by admin rules.', rewardTitle: 'Referral rewards', rewardDesc: 'Supports three generations of real-order referrals: 3% for generation 1, 1% for generation 2 and 1% for generation 3. Commission becomes withdrawable after the refund observation period.', pathTitle: 'A clear reward path', pathRegister: 'Register as a member', pathWelcome: '+ Welcome points', pathOrder: 'Complete an eligible order', pathPoints: 'Points credited', pathRefer: 'Refer a friend who completes service', pathCommission: 'Commission confirmed', pathHold: 'Pass the refund observation period', pathWithdraw: 'Withdrawal available', startTitle: 'Start now', startDesc: 'Register first, then review points, coupons, orders, referrals and withdrawals in the member centre.', stepsTitle: 'Three simple steps', stepsIntro: 'The system tracks up to three referral generations. Rewards only come from completed real orders; there is no joining fee or recruitment-based payout.', stepApply: 'Register as a 90 Promoter', stepApplyDesc: 'Submit your platform, region and promotion method for admin review.', stepShare: 'Share your link or QR code', stepShareDesc: 'The first valid visit is recorded and an existing member binding cannot be overwritten.', stepEarn: 'Earn after the order is completed', stepEarnDesc: 'Commission becomes withdrawable after order completion and the refund observation period.', rulesTitle: 'Transparent rules', rulesMode: 'Reward model', rulesModeValue: 'Three-generation referral reward', rulesRate: 'Default commission', rulesRateValue: 'Gen 1 3% Â· Gen 2 1% Â· Gen 3 1%', rulesSettle: 'Settlement condition', rulesSettleValue: 'Completed order + hold period', rulesWithdraw: 'Withdrawal method', rulesWithdrawValue: 'Mock manual review', notMemberTitle: 'Not a member yet?', notMemberDesc: 'Register first, then submit the promoter application in the member centre. A referral code is created after approval.', mockTitle: 'Mock flow testing', mockDesc: 'For local acceptance only: create an enquiry, complete an order, simulate a refund and release held commission.', memberLevel: 'Member level', commissionBook: 'Commission ledger', application: 'Become a 90 Promoter', memberMock: 'Mock mode: no real payment, bank transfer or API notification is used.'
  }
};

Object.assign(translations.zh, {
  rewards: 'ä¼šå‘˜å¥–åŠ±',
  referral: '90æŽ¨èå®˜',
  member: 'ä¼šå‘˜ä¸­å¿ƒ',
  home: 'è¿”å›žé¦–é¡µ',
  login: 'ä¼šå‘˜ç™»å½•',
  logout: 'é€€å‡ºç™»å½•',
  register: 'æ³¨å†Œä¼šå‘˜',
  name: 'å§“å',
  email: 'Email',
  phone: 'æ‰‹æœºå·ç ',
  password: 'å¯†ç ï¼ˆè‡³å°‘ 6 ä¸ªå­—ç¬¦ï¼‰',
  loginAction: 'ç™»å½•',
  registerAction: 'åˆ›å»ºä¼šå‘˜',
  apply: 'æˆä¸º90æŽ¨èå®˜',
  applyIntro: 'é€šè¿‡å®¡æ ¸åŽï¼Œä½ å¯ä»¥èŽ·å¾—ä¸“å±žæŽ¨èä»£ç ã€åˆ†äº«é“¾æŽ¥å’Œä½£é‡‘è®°å½•ã€‚',
  pending: 'å®¡æ ¸ä¸­',
  approved: 'å·²æ‰¹å‡†',
  code: 'ä¸“å±žæŽ¨èä»£ç ',
  share: 'åˆ†äº«é“¾æŽ¥',
  points: 'ç§¯åˆ†ä½™é¢',
  coupons: 'å¯ç”¨ä¼˜æƒ åˆ¸',
  commissions: 'å¯æçŽ°ä½£é‡‘',
  orders: 'æˆ‘çš„è®¢å•',
  withdrawal: 'æäº¤æçŽ°',
  amount: 'æçŽ°é‡‘é¢',
  bank: 'é“¶è¡Œåç§°',
  account: 'é“¶è¡Œè´¦å·',
  accountName: 'è´¦æˆ·å§“å',
  noData: 'ç›®å‰è¿˜æ²¡æœ‰è®°å½•ã€‚',
  identity: 'Email / æ‰‹æœºå·ç ',
  copy: 'å¤åˆ¶é“¾æŽ¥',
  whatsapp: 'WhatsApp',
  memberLevel: 'ä¼šå‘˜ç­‰çº§',
  commissionBook: 'ä½£é‡‘è´¦æœ¬',
  application: 'æˆä¸º90æŽ¨èå®˜',
  shareText: 'åˆ†äº«ä¹é›¶é£Ÿåˆ»ç»™æœ‹å‹ï¼š',
  socialPlatform: 'ç¤¾äº¤å¹³å°',
  socialAccount: 'ç¤¾äº¤è´¦å·',
  region: 'æ‰€åœ¨åœ°åŒº',
  method: 'æŽ¨èæ–¹å¼',
  customerType: 'é¢„è®¡å®¢æˆ·ç±»åž‹',
  agreeTerms: 'æˆ‘åŒæ„90æŽ¨èå®˜æ¡æ¬¾',
  agreePrivacy: 'æˆ‘åŒæ„éšç§æ”¿ç­–',
  applySubmit: 'æäº¤ç”³è¯·'
});

Object.assign(translations.zh, {
  memberMetaTitle: 'ä¼šå‘˜ä¸­å¿ƒ | 90 PROJECT',
  memberHeroTitle: 'ä¹é›¶é£Ÿåˆ»ä¼šå‘˜ä¸­å¿ƒ',
  memberHeroDesc: 'ç”¨æ‰‹æœºéªŒè¯å»ºç«‹ä¼šå‘˜èº«ä»½ï¼Œç»Ÿä¸€ç®¡ç†èµ„æ–™ã€è®¢å•è®°å½•ã€ç§¯åˆ†ä¼˜æƒ ã€æŽ¨èå¥–åŠ±å’ŒæçŽ°ç”³è¯·ã€‚',
  cloudChecking: 'æ­£åœ¨æ£€æµ‹ä¼šå‘˜äº‘ç«¯...',
  cloudConnected: 'Supabase å·²è¿žæŽ¥ï¼Œä¼šå‘˜èµ„æ–™ä¼šåŒæ­¥äº‘ç«¯ã€‚',
  cloudLocal: 'æœ¬åœ°ä¼šå‘˜æ¨¡å¼ï¼šSupabase å°šæœªé…ç½®æˆ–æš‚ä¸å¯ç”¨ã€‚',
  cloudReadFail: 'Supabase å·²é…ç½®ï¼Œä½†å½“å‰è¯»å–å¤±è´¥ï¼›é¡µé¢ç»§ç»­ä½¿ç”¨æœ¬åœ°è®°å½•ã€‚',
  benefitOne: 'æ³¨å†Œæ¬¢è¿Žç§¯åˆ†',
  benefitTwo: 'è®¢å•è®°å½•å½’æ¡£',
  benefitThree: 'æŽ¨èå¥–åŠ±æŸ¥è¯¢',
  memberStepPhone: 'æ‰‹æœºéªŒè¯',
  memberStepPhoneDesc: 'æ³¨å†Œå‰å…ˆç¡®è®¤ç”µè¯å·ç ï¼Œå‡å°‘é‡å¤ä¼šå‘˜ä¸Žé”™è¯¯è®¢å•èµ„æ–™ã€‚',
  memberStepProfile: 'ä¼šå‘˜èµ„æ–™',
  memberStepProfileDesc: 'ä¿å­˜å¸¸ç”¨åœ°å€ã€äººæ•°å’Œå£å‘³å¤‡æ³¨ï¼Œä¸‹æ¬¡è¯¢é—®æ›´å¿«å¤„ç†ã€‚',
  memberStepRewards: 'å¥–åŠ±è®°å½•',
  memberStepRewardsDesc: 'ç§¯åˆ†ã€ä¼˜æƒ åˆ¸ã€æŽ¨èå¥–åŠ±å’ŒæçŽ°è®°å½•é›†ä¸­æŸ¥çœ‹ã€‚',
  memberMiniStepVerify: 'éªŒè¯æ‰‹æœº',
  memberMiniStepInfo: 'å¡«å†™èµ„æ–™',
  memberMiniStepCreate: 'åˆ›å»ºä¼šå‘˜',
  existingMember: 'å·²æœ‰ä¼šå‘˜',
  loginIntro: 'ç™»å½•åŽå¯ä»¥æŸ¥çœ‹ç§¯åˆ†ã€ä¼˜æƒ åˆ¸ã€è®¢å•å’ŒæŽ¨èå¥–åŠ±ã€‚',
  forgotLogin: 'å¿˜è®°å¯†ç æˆ–æ— æ³•ç™»å…¥ï¼Ÿ',
  whatsappHelp: 'WhatsApp ååŠ©',
  newMember: 'æ–°ä¼šå‘˜',
  registerIntro: 'åˆ›å»ºä¼šå‘˜åŽä¼šè‡ªåŠ¨èŽ·å¾—æ¬¢è¿Žç§¯åˆ†å’Œæ–°ä¼šå‘˜ä¼˜æƒ åˆ¸ã€‚',
  registerFootnote: 'æ³¨å†ŒåŽå¯æŸ¥çœ‹ç§¯åˆ†ã€ä¼˜æƒ åˆ¸ã€æŽ¨èå¥–åŠ±ä¸ŽæçŽ°è®°å½•ã€‚',
  phoneCode: 'æ‰‹æœºéªŒè¯ç ',
  sendPhoneCode: 'å‘é€éªŒè¯ç ',
  resendPhoneCode: 'é‡æ–°å‘é€',
  phoneVerifyHint: 'è¯·å…ˆéªŒè¯æ‰‹æœºå·ç ï¼ŒéªŒè¯æˆåŠŸåŽæ‰å¯ä»¥åˆ›å»ºä¼šå‘˜ã€‚',
  phoneRequired: 'è¯·å…ˆå¡«å†™æ‰‹æœºå·ç ã€‚',
  phoneCodeRequired: 'è¯·è¾“å…¥æ‰‹æœºéªŒè¯ç ã€‚',
  phoneCodeSent: 'éªŒè¯ç å·²å‘é€ï¼Œè¯·æŸ¥çœ‹æ‰‹æœºçŸ­ä¿¡ã€‚',
  phoneCodeLocal: 'æœ¬åœ°æµ‹è¯•éªŒè¯ç ï¼š',
  phoneCodeSending: 'å‘é€ä¸­...',
  phoneCodeChecking: 'éªŒè¯ä¸­...',
  phoneVerified: 'æ‰‹æœºå·ç å·²éªŒè¯ï¼Œå¯ä»¥åˆ›å»ºä¼šå‘˜ã€‚',
  phoneVerifyFailed: 'éªŒè¯ç ä¸æ­£ç¡®æˆ–å·²è¿‡æœŸï¼Œè¯·é‡æ–°å‘é€ã€‚',
  phoneChanged: 'æ‰‹æœºå·ç å·²æ›´æ”¹ï¼Œè¯·é‡æ–°éªŒè¯ã€‚',
  loggedIn: 'å·²ç™»å½•',
  helloPrefix: 'ä½ å¥½ï¼Œ',
  dashboardIntro: 'ä½ çš„ä¼šå‘˜èµ„æ–™ã€è¯¢é—®è®°å½•ã€ä¼˜æƒ å’ŒæŽ¨èå¥–åŠ±éƒ½åœ¨è¿™é‡Œã€‚',
  profileTitle: 'ä¼šå‘˜èµ„æ–™',
  saveProfile: 'ä¿å­˜ä¼šå‘˜èµ„æ–™',
  companyLabel: 'å…¬å¸ / å®¶åº­åç§°',
  addressLabel: 'å¸¸ç”¨åœ°å€',
  preferenceLabel: 'å£å‘³å¤‡æ³¨',
  birthday: 'ç”Ÿæ—¥',
  estimatedPax: 'å¸¸ç”¨äººæ•°',
  companyPlaceholder: 'å…¬å¸åã€å®¶åº­åæˆ–è”ç³»äººå¤‡æ³¨',
  addressPlaceholder: 'æ–¹ä¾¿ä¸‹æ¬¡ä¸‹å•è‡ªåŠ¨å¸¦å…¥',
  preferencePlaceholder: 'ä¾‹å¦‚ï¼šå°‘è¾£ã€ä¸è¦è‘±ã€ä¸è¦çŒªè‚‰ã€å–œæ¬¢æ¸…æ·¡',
  promoterIntro: 'ç”³è¯·é€šè¿‡åŽï¼Œä½ ä¼šå¾—åˆ°ä¸“å±žæŽ¨èç ã€åˆ†äº«é“¾æŽ¥å’Œä½£é‡‘è®°å½•ã€‚',
  couponListTitle: 'ä¼˜æƒ åˆ¸',
  pointsListTitle: 'ç§¯åˆ†è®°å½•',
  notificationTitle: 'ä¼šå‘˜é€šçŸ¥',
  applicationTitle: 'ç”³è¯·æˆä¸º90æŽ¨èå®˜',
  applicationIntro: 'é€‚åˆç»å¸¸ä»‹ç»æœ‹å‹ã€å…¬å¸ã€æ´»åŠ¨å®¢æˆ·çš„äººã€‚åŽå°å®¡æ ¸é€šè¿‡åŽæ‰ä¼šç”ŸæˆæŽ¨èç ã€‚',
  withdrawalTitle: 'æçŽ°ç”³è¯·',
  withdrawalIntro: 'ä½£é‡‘è¾¾åˆ°æœ€ä½ŽæçŽ°é‡‘é¢åŽï¼Œå¯ä»¥æäº¤åŽå°å®¡æ ¸ã€‚',
  submitWithdrawal: 'æäº¤æçŽ°',
  mockToolsTitle: 'æœ¬åœ°éªŒæ”¶å·¥å…·',
  mockToolsIntro: 'åªç”¨äºŽæµ‹è¯•ä¼šå‘˜æµç¨‹ï¼Œä¸ä¼šçœŸå®žæ”¶æ¬¾ã€è½¬è´¦æˆ–é€šçŸ¥é¡¾å®¢ã€‚',
  footerBack: 'è¿”å›žé¦–é¡µ',
  loginHelpDuplicate: 'è¿™ä¸ª Email æˆ–æ‰‹æœºå·å·²ç»æ³¨å†Œï¼Œå¯ä»¥ç›´æŽ¥ç™»å½•ã€‚',
  invalidRegister: 'è¯·å¡«å†™å®Œæ•´èµ„æ–™ï¼Œå¯†ç è‡³å°‘ 6 ä¸ªå­—ç¬¦ã€‚',
  registerCloudOk: 'ä¼šå‘˜å·²åˆ›å»ºï¼Œå¹¶å·²åŒæ­¥ Supabaseã€‚',
  registerCloudConfirm: 'ä¼šå‘˜å·²åˆ›å»ºã€‚Supabase å¯èƒ½éœ€è¦ Email ç¡®è®¤åŽæ‰ä¼šåŒæ­¥ã€‚',
  registerCloudFail: 'ä¼šå‘˜å·²åˆ›å»ºï¼Œæœ¬åœ°å¯ç”¨ï¼›Supabase åŒæ­¥æš‚æ—¶å¤±è´¥ã€‚',
  registerLocalOk: 'ä¼šå‘˜å·²åˆ›å»ºã€‚æ¬¢è¿Žç§¯åˆ†ä¸Žæ–°ä¼šå‘˜ä¼˜æƒ åˆ¸å·²åŠ å…¥ã€‚',
  loginBusy: 'ç™»å½•ä¸­...',
  registerBusy: 'åˆ›å»ºä¸­...',
  saveBusy: 'ä¿å­˜ä¸­...',
  submitBusy: 'æäº¤ä¸­...',
  loginError: 'Email / æ‰‹æœºå·æˆ–å¯†ç ä¸æ­£ç¡®ã€‚å¦‚æžœåˆšæ³¨å†Œäº‘ç«¯è´¦å·ï¼Œè¯·ç¡®è®¤ Email åŽå†è¯•ã€‚',
  loginOkCloud: 'ä¼šå‘˜å·²ç™»å½•ï¼Œæ­£åœ¨åŒæ­¥äº‘ç«¯èµ„æ–™ã€‚',
  loginOk: 'ä¼šå‘˜å·²ç™»å½•ã€‚',
  logoutOk: 'å·²é€€å‡ºä¼šå‘˜ä¸­å¿ƒã€‚',
  loginRequired: 'è¯·å…ˆç™»å½•ä¼šå‘˜ã€‚',
  profileSaveFail: 'ä¼šå‘˜èµ„æ–™ä¿å­˜å¤±è´¥ã€‚',
  profileCloudOk: 'ä¼šå‘˜èµ„æ–™å·²ä¿å­˜ï¼Œå¹¶å·²åŒæ­¥äº‘ç«¯ã€‚',
  profileCloudFail: 'ä¼šå‘˜èµ„æ–™å·²ä¿å­˜ï¼Œæœ¬æ¬¡äº‘ç«¯åŒæ­¥å¤±è´¥ã€‚',
  profileLocalOk: 'ä¼šå‘˜èµ„æ–™å·²ä¿å­˜ã€‚',
  applicationExists: 'ä½ å·²ç»æäº¤è¿‡æŽ¨èå®˜ç”³è¯·ï¼Œç­‰å¾…åŽå°å®¡æ ¸å³å¯ã€‚',
  termsRequired: 'è¯·å…ˆåŒæ„æŽ¨èå®˜æ¡æ¬¾ä¸Žéšç§æ”¿ç­–ã€‚',
  applicationCloudOk: 'æŽ¨èå®˜ç”³è¯·å·²æäº¤ï¼Œå¹¶å·²åŒæ­¥äº‘ç«¯ã€‚',
  applicationCloudFail: 'æŽ¨èå®˜ç”³è¯·å·²ä¿å­˜åœ¨æœ¬åœ°ï¼Œäº‘ç«¯åŒæ­¥æš‚æ—¶å¤±è´¥ã€‚',
  applicationLocalOk: 'æŽ¨èå®˜ç”³è¯·å·²æäº¤å®¡æ ¸ã€‚',
  withdrawPromoterRequired: 'æŽ¨èå®˜é€šè¿‡å®¡æ ¸åŽæ‰å¯ä»¥ç”³è¯·æçŽ°ã€‚',
  withdrawBelowMinimum: 'æçŽ°é‡‘é¢ä½ŽäºŽæœ€ä½ŽæçŽ°é‡‘é¢ã€‚',
  withdrawPending: 'ä½ å·²ç»æœ‰ä¸€ç¬”æçŽ°åœ¨å¤„ç†ä¸­ã€‚',
  withdrawInsufficient: 'å¯æçŽ°ä½£é‡‘ä½™é¢ä¸è¶³ã€‚',
  withdrawCloudOk: 'æçŽ°ç”³è¯·å·²æäº¤ï¼Œå¹¶å·²åŒæ­¥äº‘ç«¯ã€‚',
  withdrawCloudFail: 'æçŽ°ç”³è¯·å·²ä¿å­˜åœ¨æœ¬åœ°ï¼Œäº‘ç«¯åŒæ­¥æš‚æ—¶å¤±è´¥ã€‚',
  withdrawLocalOk: 'æçŽ°ç”³è¯·å·²æäº¤åŽå°å®¡æ ¸ã€‚'
});

Object.assign(translations.en, {
  memberMetaTitle: 'Member Centre | 90 PROJECT',
  memberHeroTitle: '90 PROJECT Member Centre',
  memberHeroDesc: 'Verify by mobile number, then manage profile details, order records, points, coupons, referral rewards and withdrawal requests in one place.',
  cloudChecking: 'Checking member cloud connection...',
  cloudConnected: 'Supabase is connected. Member data will sync to the cloud.',
  cloudLocal: 'Local member mode: Supabase is not configured or temporarily unavailable.',
  cloudReadFail: 'Supabase is configured, but reading failed. This page will continue with local records.',
  benefitOne: 'Welcome points',
  benefitTwo: 'Order history archive',
  benefitThree: 'Referral reward tracking',
  memberStepPhone: 'Phone verification',
  memberStepPhoneDesc: 'Confirm the mobile number before registration to reduce duplicate accounts and incorrect order details.',
  memberStepProfile: 'Member profile',
  memberStepProfileDesc: 'Save usual address, pax and taste notes so future enquiries are easier to handle.',
  memberStepRewards: 'Reward records',
  memberStepRewardsDesc: 'Review points, coupons, referral rewards and withdrawal records in one place.',
  memberMiniStepVerify: 'Verify phone',
  memberMiniStepInfo: 'Fill details',
  memberMiniStepCreate: 'Create account',
  existingMember: 'Existing member',
  loginIntro: 'Log in to view points, coupons, orders and referral rewards.',
  forgotLogin: 'Forgot password or cannot log in?',
  whatsappHelp: 'WhatsApp help',
  newMember: 'New member',
  registerIntro: 'Create a member account to receive welcome points and a new member coupon.',
  registerFootnote: 'After registration, you can view points, coupons, referral rewards and withdrawals.',
  phoneCode: 'Phone verification code',
  sendPhoneCode: 'Send code',
  resendPhoneCode: 'Resend',
  phoneVerifyHint: 'Verify your phone number before creating a member account.',
  phoneRequired: 'Please enter your mobile number first.',
  phoneCodeRequired: 'Please enter the verification code.',
  phoneCodeSent: 'Verification code sent. Please check your SMS.',
  phoneCodeLocal: 'Local test code: ',
  phoneCodeSending: 'Sending...',
  phoneCodeChecking: 'Verifying...',
  phoneVerified: 'Phone number verified. You can create a member account.',
  phoneVerifyFailed: 'The code is incorrect or expired. Please resend it.',
  phoneChanged: 'Phone number changed. Please verify again.',
  loggedIn: 'Logged in',
  helloPrefix: 'Hello, ',
  dashboardIntro: 'Your profile, enquiry records, coupons and referral rewards are here.',
  profileTitle: 'Member profile',
  saveProfile: 'Save profile',
  companyLabel: 'Company / family name',
  addressLabel: 'Usual address',
  preferenceLabel: 'Taste notes',
  birthday: 'Birthday',
  estimatedPax: 'Usual pax',
  companyPlaceholder: 'Company, family name or contact note',
  addressPlaceholder: 'Used for faster ordering next time',
  preferencePlaceholder: 'Example: less spicy, no spring onion, no pork, lighter taste',
  promoterIntro: 'After approval, you will receive a referral code, share link and commission records.',
  couponListTitle: 'Coupons',
  pointsListTitle: 'Points history',
  notificationTitle: 'Member notifications',
  applicationTitle: 'Apply as a 90 Promoter',
  applicationIntro: 'Suitable for people who often introduce friends, companies or event customers. A referral code is created after admin approval.',
  withdrawalTitle: 'Withdrawal request',
  withdrawalIntro: 'Once your commission reaches the minimum amount, you can submit it for admin review.',
  submitWithdrawal: 'Submit withdrawal',
  mockToolsTitle: 'Local acceptance tools',
  mockToolsIntro: 'For testing only. No real payment, transfer or customer notification is sent.',
  footerBack: 'Back to home',
  loginHelpDuplicate: 'This email or phone is already registered. Please log in.',
  invalidRegister: 'Please complete all details. Password needs at least 6 characters.',
  registerCloudOk: 'Member created and synced to Supabase.',
  registerCloudConfirm: 'Member created. Supabase may require email confirmation before syncing.',
  registerCloudFail: 'Member created locally, but Supabase sync failed for now.',
  registerLocalOk: 'Member created. Welcome points and coupon have been added.',
  loginBusy: 'Logging in...',
  registerBusy: 'Creating...',
  saveBusy: 'Saving...',
  submitBusy: 'Submitting...',
  loginError: 'Email / phone or password is incorrect. If you just registered, please confirm your email first.',
  loginOkCloud: 'Member logged in. Syncing cloud data.',
  loginOk: 'Member logged in.',
  logoutOk: 'You have logged out.',
  loginRequired: 'Please log in first.',
  profileSaveFail: 'Profile could not be saved.',
  profileCloudOk: 'Profile saved and synced to the cloud.',
  profileCloudFail: 'Profile saved locally, but cloud sync failed this time.',
  profileLocalOk: 'Profile saved.',
  applicationExists: 'You already submitted a promoter application. Please wait for admin review.',
  termsRequired: 'Please accept the promoter terms and privacy policy.',
  applicationCloudOk: 'Promoter application submitted and synced to the cloud.',
  applicationCloudFail: 'Promoter application saved locally, but cloud sync failed for now.',
  applicationLocalOk: 'Promoter application submitted for review.',
  withdrawPromoterRequired: 'You can request withdrawal after promoter approval.',
  withdrawBelowMinimum: 'Withdrawal amount is below the minimum.',
  withdrawPending: 'You already have a withdrawal in progress.',
  withdrawInsufficient: 'Available commission balance is insufficient.',
  withdrawCloudOk: 'Withdrawal request submitted and synced to the cloud.',
  withdrawCloudFail: 'Withdrawal request saved locally, but cloud sync failed for now.',
  withdrawLocalOk: 'Withdrawal request submitted for admin review.'
});

Object.assign(translations.zh, {
  referral: 'ä¼šå‘˜æŽ¨è',
  welcome: 'æ¯ä½ä¼šå‘˜éƒ½ä¼šè‡ªåŠ¨æ‹¥æœ‰è‡ªå·±çš„æŽ¨èç ã€‚åˆ†äº«ç»™æœ‹å‹åŽï¼Œç³»ç»Ÿä¼šè‡ªåŠ¨ç»‘å®šå…³ç³»å¹¶æŒ‰å®Œæˆè®¢å•è®¡ç®—ä¸‰ä»£ä½£é‡‘ã€‚',
  apply: 'æˆ‘çš„æŽ¨èç ',
  applyIntro: 'ä¼šå‘˜æ³¨å†ŒåŽè‡ªåŠ¨æ‹¥æœ‰æŽ¨èç ã€åˆ†äº«é“¾æŽ¥å’Œä½£é‡‘è®°å½•ã€‚',
  code: 'æˆ‘çš„æŽ¨èç ',
  shareText: 'è¿™æ˜¯æˆ‘çš„ä¹é›¶é£Ÿåˆ»ä¼šå‘˜æŽ¨èé“¾æŽ¥ï¼š',
  application: 'ä¼šå‘˜æŽ¨è',
  promoterIntro: 'æ¯ä½ä¼šå‘˜æ³¨å†ŒåŽè‡ªåŠ¨æ‹¥æœ‰æŽ¨èç ã€åˆ†äº«é“¾æŽ¥å’Œä½£é‡‘è®°å½•ã€‚',
  applicationTitle: 'ä¼šå‘˜è‡ªåŠ¨æ‹¥æœ‰æŽ¨èç ',
  applicationIntro: 'ç™»å½•ä¼šå‘˜ä¸­å¿ƒå³å¯å¤åˆ¶æŽ¨èç å’Œåˆ†äº«é“¾æŽ¥ã€‚æœ‹å‹é€šè¿‡ä½ çš„é“¾æŽ¥æ³¨å†ŒåŽï¼Œç³»ç»Ÿä¼šè‡ªåŠ¨è®°å½•æŽ¨èå…³ç³»ã€‚',
  stepsTitle: 'ä¸‰æ­¥å¼€å§‹',
  stepsIntro: 'æœ€å¤šè¿½è¸ªä¸‰å±‚æŽ¨èå…³ç³»ï¼Œå¥–åŠ±åªæ¥è‡ªçœŸå®žå®Œæˆè®¢å•ï¼Œä¸æ”¶å–å…¥ä¼šè´¹ï¼Œä¸é æ‹‰äººæ”¶è´¹ã€‚',
  stepApply: 'æ³¨å†Œä¼šå‘˜',
  stepApplyDesc: 'å®Œæˆä¼šå‘˜æ³¨å†ŒåŽï¼Œç³»ç»Ÿä¼šè‡ªåŠ¨ç”Ÿæˆä½ çš„ä¸“å±žæŽ¨èç å’Œåˆ†äº«é“¾æŽ¥ã€‚',
  stepShare: 'åˆ†äº«æŽ¨èç ',
  stepShareDesc: 'æœ‹å‹é€šè¿‡ä½ çš„é“¾æŽ¥è®¿é—®å¹¶æ³¨å†ŒåŽï¼Œç³»ç»Ÿè‡ªåŠ¨è®°å½•ç›´å±žä¸‹çº¿å…³ç³»ã€‚',
  notMemberTitle: 'è¿˜ä¸æ˜¯ä¼šå‘˜ï¼Ÿ',
  notMemberDesc: 'å…ˆæ³¨å†Œä¼šå‘˜ï¼Œç³»ç»Ÿä¼šè‡ªåŠ¨ä¸ºä½ å‡†å¤‡æŽ¨èç ã€‚ç™»å½•ä¼šå‘˜ä¸­å¿ƒå³å¯å¤åˆ¶æŽ¨èç ã€åˆ†äº«é“¾æŽ¥å’ŒæŸ¥çœ‹ä½£é‡‘è®°å½•ã€‚',
  applicationExists: 'ä¼šå‘˜æŽ¨èèµ„æ–™å·²å­˜åœ¨ã€‚',
  termsRequired: 'è¯·ç¡®è®¤ä¼šå‘˜æŽ¨èè§„åˆ™ã€‚',
  applicationCloudOk: 'ä¼šå‘˜æŽ¨èèµ„æ–™å·²åŒæ­¥äº‘ç«¯ã€‚',
  applicationCloudFail: 'ä¼šå‘˜æŽ¨èèµ„æ–™å·²ä¿å­˜åœ¨æœ¬åœ°ï¼Œäº‘ç«¯åŒæ­¥æš‚æ—¶å¤±è´¥ã€‚',
  applicationLocalOk: 'ä¼šå‘˜æŽ¨èèµ„æ–™å·²ä¿å­˜ã€‚',
  withdrawPromoterRequired: 'æŽ¨èç ç”ŸæˆåŽæ‰å¯ä»¥ç”³è¯·æçŽ°ã€‚'
});

Object.assign(translations.en, {
  referral: 'Member Referral',
  welcome: 'Every member automatically receives a referral code. Share it with friends, and the system records the relationship and calculates three-generation commission after completed orders.',
  apply: 'My referral code',
  applyIntro: 'Every registered member automatically receives a referral code, share link and commission records.',
  code: 'My referral code',
  shareText: 'This is my 90 PROJECT member referral link:',
  application: 'Member Referral',
  promoterIntro: 'Every registered member automatically receives a referral code, share link and commission records.',
  applicationTitle: 'Members receive referral codes automatically',
  applicationIntro: 'Log in to the member centre to copy your referral code and share link. When friends register through your link, the system records the referral relationship automatically.',
  stepsTitle: 'Three simple steps',
  stepsIntro: 'The system tracks up to three referral generations. Rewards only come from completed real orders; there is no joining fee or recruitment-based payout.',
  stepApply: 'Register as a member',
  stepApplyDesc: 'After member registration, the system creates your referral code and share link automatically.',
  stepShare: 'Share your referral code',
  stepShareDesc: 'When a friend visits and registers through your link, the system records the direct downline relationship automatically.',
  notMemberTitle: 'Not a member yet?',
  notMemberDesc: 'Register first and the system will prepare your referral code automatically. Log in to the member centre to copy your code, share link and review commission records.',
  applicationExists: 'Member referral profile already exists.',
  termsRequired: 'Please confirm the member referral rules.',
  applicationCloudOk: 'Member referral profile synced to the cloud.',
  applicationCloudFail: 'Member referral profile saved locally, but cloud sync failed for now.',
  applicationLocalOk: 'Member referral profile saved.',
  withdrawPromoterRequired: 'You can request withdrawal after your referral code is ready.'
});


let language = ['zh', 'en'].includes(localStorage.getItem(LANG_KEY)) ? localStorage.getItem(LANG_KEY) : 'zh';
const t = key => translations[language][key] || translations.zh[key] || key;
const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const formatMoney = value => `RM${money(value).toFixed(2)}`;
const eligibleAmountForAdmin = order => money(Math.max(0, Number(order?.totalAmount || 0) - Number(order?.sstAmount || 0) - Number(order?.deliveryFee || 0) - Number(order?.extraLabourFee || 0) - Number(order?.thirdPartyFee || 0) - Number(order?.couponDiscount || 0)));
const currentMember = () => api.currentMember();
const adminEditableOrderStatuses = ['new', 'confirmed', 'deposit_paid', 'cancelled'];
const page = document.body?.dataset.growthPage || '';
let cloudReady = false;
let cloudGrowthSnapshot = null;
let cloudOrderLeadSync = { loading: false, lastAt: 0, count: 0, imported: 0, error: '' };
let adminGrowthSearch = '';
let adminGrowthFilters = { order: 'all', withdrawal: 'all' };
let phoneVerification = { phone: '', code: '', verified: false, cloudSession: null };

function setText(selector, value) {
  document.querySelectorAll(selector).forEach(element => { element.textContent = value; });
}

function setMessage(message, error = false) {
  document.querySelectorAll('[data-growth-message]').forEach(element => {
    element.textContent = message;
    element.classList.toggle('error', error);
  });
}

function setBusy(form, busy, label = '') {
  const button = form?.querySelector('button[type="submit"]');
  if (!button) return;
  if (busy) {
    button.dataset.originalText = button.textContent;
    button.textContent = label || 'å¤„ç†ä¸­...';
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
  }
}

function busyLabel(key) {
  return t(key) || 'å¤„ç†ä¸­...';
}

function downloadCsv(filename, rows) {
  const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function matchesAdminSearch(values) {
  const keyword = adminGrowthSearch.trim().toLowerCase();
  if (!keyword) return true;
  return values.some(value => String(value || '').toLowerCase().includes(keyword));
}

function statusBadge(status) {
  const tone = ['approved', 'available', 'paid'].includes(status) ? 'is-good' : ['rejected', 'reversed', 'cancelled'].includes(status) ? 'is-bad' : 'is-waiting';
  return `<span class="growth-status-badge ${tone}">${esc(status || '-')}</span>`;
}

function getSupabaseAdminSession() {
  try {
    return JSON.parse(localStorage.getItem(SUPABASE_ADMIN_SESSION_KEY) || 'null');
  } catch (error) {
    return null;
  }
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
    setCloudStatus(t('cloudConnected'), true);
    return { member, growth };
  } catch (error) {
    console.warn('Growth cloud sync failed', error);
    setCloudStatus(t('cloudReadFail'), false);
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
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll('[data-growth-language]').forEach(button => button.classList.toggle('active', button.dataset.growthLanguage === language));
  document.title = page === 'member' ? t('memberMetaTitle') : page === 'referral' ? `${t('referral')} | 90 PROJECT` : `${t('rewards')} | 90 PROJECT`;
}

function shareUrl(code) {
  return `${location.origin}/referral.html?ref=${encodeURIComponent(code)}`;
}

function renderAuthState() {
  const member = currentMember();
  document.body.classList.toggle('is-member-logged-in', Boolean(member));
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
  if (!promoterBox) return;
  if (promoter && code) {
    promoterBox.innerHTML = `<span class="growth-badge">${esc(t('approved'))}</span><h3>${esc(t('code'))}</h3><code class="growth-code">${esc(code)}</code><p>${esc(t('share'))}:<br><a href="${esc(shareUrl(code))}">${esc(shareUrl(code))}</a></p><div class="growth-actions"><button class="growth-button" type="button" data-copy-growth="${esc(shareUrl(code))}">${esc(t('copy'))}</button><a class="growth-button secondary" target="_blank" rel="noopener" href="https://wa.me/601110977166?text=${encodeURIComponent(`${t('shareText')} ${shareUrl(code)}`)}">${esc(t('whatsapp'))}</a></div>`;
  } else {
    promoterBox.innerHTML = `<h3>${esc(t('code'))}</h3><p>${esc(t('noData'))}</p>`;
  }
  const list = document.querySelector('[data-growth-order-list]');
  list.innerHTML = summary.orders.length ? summary.orders.map(order => `<li><span>${esc(order.serviceType || 'Service')}<br><small>${esc(order.status)}</small></span><b>${formatMoney(order.totalAmount)}</b></li>`).join('') : `<li>${esc(t('noData'))}</li>`;
  const commissionList = document.querySelector('[data-growth-commission-list]');
  const cloudCommissions = cloudGrowthSnapshot?.commissions || [];
  const allCommissions = cloudCommissions.length
    ? cloudCommissions.map(item => ({ status: item.status, orderId: item.order_id || item.orderId || 'cloud', generation: item.generation || 1, commissionAmount: item.commission_amount || item.commissionAmount }))
    : summary.commissions;
  commissionList.innerHTML = allCommissions.length ? allCommissions.map(item => `<li><span>${esc(item.status)}<br><small>L${Number(item.generation || 1)} Â· ${esc(item.orderId)}</small></span><b>${formatMoney(item.commissionAmount)}</b></li>`).join('') : `<li>${esc(t('noData'))}</li>`;
  const couponList = document.querySelector('[data-growth-coupon-list]');
  if (couponList) {
    const cloudCoupons = cloudGrowthSnapshot?.coupons || [];
    couponList.innerHTML = cloudCoupons.length
      ? cloudCoupons.map(coupon => {
        const template = Array.isArray(coupon.growth_coupon_templates) ? coupon.growth_coupon_templates[0] : coupon.growth_coupon_templates;
        const name = template?.name?.zh || template?.name?.en || coupon.code;
        const value = template?.discount_type === 'percent' ? `${template.discount_value}%` : formatMoney(template?.discount_value || 0);
        return `<li><span>${esc(name)}<br><small>${esc(coupon.code)} Â· ${coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : '-'}</small></span><b>${value}</b></li>`;
      }).join('')
      : summary.coupons.length ? summary.coupons.map(coupon => `<li><span>${esc(coupon.name)}<br><small>${esc(coupon.code)} Â· ${new Date(coupon.expiresAt).toLocaleDateString()}</small></span><b>${coupon.discountType === 'percent' ? `${coupon.discountValue}%` : formatMoney(coupon.discountValue)}</b></li>`).join('') : `<li>${esc(t('noData'))}</li>`;
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

const normalizePhoneInput = value => String(value || '').replace(/\D/g, '');
const makeLocalOtp = () => String(Math.floor(100000 + Math.random() * 900000));

function setPhoneVerifyStatus(message, tone = '') {
  document.querySelectorAll('[data-phone-verify-status]').forEach(element => {
    element.textContent = message;
    element.dataset.tone = tone;
  });
}

function updatePhoneVerificationUi() {
  const phoneInput = document.getElementById('registerPhoneInput');
  const submit = document.querySelector('[data-register-submit]');
  const codeButton = document.getElementById('sendPhoneCode');
  const phone = normalizePhoneInput(phoneInput?.value);
  if (phoneVerification.verified && phoneVerification.phone && phone !== phoneVerification.phone) {
    phoneVerification = { phone: '', code: '', verified: false, cloudSession: null };
    setPhoneVerifyStatus(t('phoneChanged'), 'warn');
  }
  if (submit) submit.disabled = !phoneVerification.verified;
  if (codeButton) codeButton.textContent = phoneVerification.code || phoneVerification.verified ? t('resendPhoneCode') : t('sendPhoneCode');
}

function bindPromoterApplicationForm() {
  document.getElementById('growthPromoterForm')?.addEventListener('submit', async event => {
    event.preventDefault();
    setBusy(event.currentTarget, true, busyLabel('submitBusy'));
    const member = currentMember();
    if (!member) {
      setBusy(event.currentTarget, false);
      return setMessage(t('loginRequired'), true);
    }
    const data = Object.fromEntries(new FormData(event.currentTarget));
    data.termsAccepted = event.currentTarget.querySelector('[name="termsAccepted"]').checked;
    data.privacyAccepted = event.currentTarget.querySelector('[name="privacyAccepted"]').checked;
    const result = api.submitPromoterApplication(member.id, data);
    if (!result.ok) {
      setBusy(event.currentTarget, false);
      return setMessage(result.reason === 'application_exists' ? t('applicationExists') : t('termsRequired'), true);
    }
    if (cloudReady && cloud.getSession()?.access_token) {
      const cloudResult = await cloud.submitPromoterApplication(data);
      setMessage(cloudResult.ok ? t('applicationCloudOk') : t('applicationCloudFail'), !cloudResult.ok);
      await syncCloudDashboard(member);
    } else {
      setMessage(t('applicationLocalOk'));
    }
    event.currentTarget.reset();
    setBusy(event.currentTarget, false);
    if (page === 'member') renderMemberDashboard();
  });
}

function bindMemberPage() {
  const registerForm = document.getElementById('growthRegisterForm');
  const loginForm = document.getElementById('growthLoginForm');
  const phoneInput = document.getElementById('registerPhoneInput');
  const codeInput = document.getElementById('registerPhoneCode');
  const codeButton = document.getElementById('sendPhoneCode');

  phoneInput?.addEventListener('input', updatePhoneVerificationUi);
  codeButton?.addEventListener('click', async () => {
    const phone = phoneInput?.value || '';
    const normalizedPhone = normalizePhoneInput(phone);
    if (!normalizedPhone) return setPhoneVerifyStatus(t('phoneRequired'), 'bad');
    codeButton.disabled = true;
    codeButton.textContent = t('phoneCodeSending');
    const sent = cloudReady ? await cloud.sendPhoneOtp(phone) : { ok: false, skipped: true };
    if (sent.ok) {
      phoneVerification = { phone: normalizedPhone, code: '', verified: false, cloudSession: null };
      setPhoneVerifyStatus(t('phoneCodeSent'), 'good');
    } else {
      const localCode = makeLocalOtp();
      phoneVerification = { phone: normalizedPhone, code: localCode, verified: false, cloudSession: null };
      setPhoneVerifyStatus(`${t('phoneCodeLocal')}${localCode}`, 'warn');
    }
    codeButton.disabled = false;
    updatePhoneVerificationUi();
  });

  codeInput?.addEventListener('input', async () => {
    const phone = normalizePhoneInput(phoneInput?.value);
    const code = String(codeInput.value || '').trim();
    if (!phone || !code || code.length < 6) return;
    setPhoneVerifyStatus(t('phoneCodeChecking'), 'warn');
    let verified = false;
    let cloudSession = null;
    if (phoneVerification.code) {
      verified = phone === phoneVerification.phone && code === phoneVerification.code;
    } else if (cloudReady) {
      const cloudVerify = await cloud.verifyPhoneOtp(phoneInput.value, code);
      verified = Boolean(cloudVerify.ok);
      cloudSession = cloudVerify.session || null;
    }
    phoneVerification = { ...phoneVerification, phone, verified, cloudSession };
    setPhoneVerifyStatus(verified ? t('phoneVerified') : t('phoneVerifyFailed'), verified ? 'good' : 'bad');
    updatePhoneVerificationUi();
  });

  registerForm?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!phoneVerification.verified) {
      updatePhoneVerificationUi();
      return setMessage(t('phoneVerifyHint'), true);
    }
    setBusy(registerForm, true, busyLabel('registerBusy'));
    const data = Object.fromEntries(new FormData(registerForm));
    data.phoneVerified = true;
    const result = api.registerMember(data);
    if (!result.ok) {
      setBusy(registerForm, false);
      return setMessage(result.reason === 'duplicate_member' ? t('loginHelpDuplicate') : t('invalidRegister'), true);
    }
    api.grantCoupon(result.member.id, { name: 'New member welcome', code: 'WELCOME90', discountType: 'fixed', discountValue: 20 });
    if (cloudReady) {
      const cloudResult = phoneVerification.cloudSession
        ? { ok: true, session: phoneVerification.cloudSession }
        : await cloud.signUp(result.member, data.password);
      if (cloudResult.ok && cloudResult.session) {
        await cloud.updateProfile(result.member, cloudResult.session);
        await syncCloudDashboard(result.member);
        setMessage(t('registerCloudOk'));
      } else if (cloudResult.ok) {
        setMessage(t('registerCloudConfirm'));
      } else {
        setMessage(t('registerCloudFail'), true);
      }
    } else {
      setMessage(t('registerLocalOk'));
    }
    setBusy(registerForm, false);
    registerForm.reset();
    phoneVerification = { phone: '', code: '', verified: false, cloudSession: null };
    setPhoneVerifyStatus(t('phoneVerifyHint'));
    updatePhoneVerificationUi();
    renderMemberDashboard();
  });
  loginForm?.addEventListener('submit', async event => {
    event.preventDefault();
    setBusy(loginForm, true, busyLabel('loginBusy'));
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
    if (!result.ok) {
      setBusy(loginForm, false);
      return setMessage(t('loginError'), true);
    }
    setMessage(cloudReady ? t('loginOkCloud') : t('loginOk'));
    await syncCloudDashboard(result.member);
    setBusy(loginForm, false);
    loginForm.reset();
    renderMemberDashboard();
  });
  document.getElementById('growthLogout')?.addEventListener('click', () => { cloud.signOut(); api.logoutMember(); cloudGrowthSnapshot = null; setMessage(t('logoutOk')); renderAuthState(); });
  document.getElementById('growthProfileForm')?.addEventListener('submit', async event => {
    event.preventDefault();
    setBusy(event.currentTarget, true, busyLabel('saveBusy'));
    const member = currentMember();
    if (!member) {
      setBusy(event.currentTarget, false);
      return setMessage(t('loginRequired'), true);
    }
    const result = api.updateMemberProfile(member.id, Object.fromEntries(new FormData(event.currentTarget)));
    if (!result.ok) {
      setBusy(event.currentTarget, false);
      return setMessage(t('profileSaveFail'), true);
    }
    if (cloudReady && cloud.getSession()?.access_token) {
      const cloudResult = await cloud.updateProfile(result.member);
      setMessage(cloudResult.ok ? t('profileCloudOk') : t('profileCloudFail'), !cloudResult.ok);
    } else {
      setMessage(t('profileLocalOk'));
    }
    setBusy(event.currentTarget, false);
    renderMemberDashboard();
  });
  bindPromoterApplicationForm();
  document.getElementById('growthWithdrawalForm')?.addEventListener('submit', async event => {
    event.preventDefault();
    setBusy(event.currentTarget, true, busyLabel('submitBusy'));
    const member = currentMember();
    if (!member) {
      setBusy(event.currentTarget, false);
      return setMessage(t('loginRequired'), true);
    }
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = api.submitWithdrawal(member.id, data);
    if (!result.ok) {
      setBusy(event.currentTarget, false);
      const reasons = {
        promoter_not_approved: t('withdrawPromoterRequired'),
        below_minimum: t('withdrawBelowMinimum'),
        withdrawal_pending: t('withdrawPending'),
        insufficient_balance: t('withdrawInsufficient')
      };
      return setMessage(reasons[result.reason] || `æçŽ°ç”³è¯·æ— æ³•æäº¤ï¼š${result.reason}`, true);
    }
    if (cloudReady && cloud.getSession()?.access_token) {
      const cloudResult = await cloud.submitWithdrawal(data);
      setMessage(cloudResult.ok ? t('withdrawCloudOk') : t('withdrawCloudFail'), !cloudResult.ok);
      await syncCloudDashboard(member);
    } else {
      setMessage(t('withdrawLocalOk'));
    }
    event.currentTarget.reset();
    setBusy(event.currentTarget, false);
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
  if (code) {
    const result = api.captureReferralVisit(code, '/referral.html');
    if (status) status.textContent = result.ok ? `Referral code ${code.toUpperCase()} recorded for this visit.` : 'This referral link is not active.';
  }
  bindPromoterApplicationForm();
}

function readGrowthOrderQueue() {
  try {
    const queue = JSON.parse(localStorage.getItem(GROWTH_ORDER_QUEUE_KEY) || '[]');
    return Array.isArray(queue) ? queue : [];
  } catch (error) {
    return [];
  }
}

function writeGrowthOrderQueue(queue) {
  localStorage.setItem(GROWTH_ORDER_QUEUE_KEY, JSON.stringify(queue.slice(0, 160)));
}

function importQueuedGrowthOrders() {
  const queue = readGrowthOrderQueue();
  if (!queue.length || typeof api.upsertOrderLead !== 'function') return 0;

  let imported = 0;
  const remaining = [];
  queue.forEach(item => {
    const result = api.upsertOrderLead(item);
    if (result.ok) imported += result.createdOrder ? 1 : 0;
    else remaining.push(item);
  });
  writeGrowthOrderQueue(remaining);
  return imported;
}

function cloudLeadToGrowthPayload(row) {
  return {
    externalInquiryId: row.source_inquiry_id || row.id,
    sourceInquiryId: row.local_inquiry_id || row.source_inquiry_id || row.id,
    name: row.customer_name || 'WhatsApp Customer',
    phone: row.phone || '',
    email: row.email || '',
    serviceType: row.service_type || 'Website Inquiry',
    packageName: row.package_name || '',
    eventDate: row.event_date || '',
    eventTime: row.event_time || '',
    location: row.event_location || '',
    pax: Number(row.pax) || 0,
    notes: row.notes || '',
    referralCode: row.referral_code || '',
    totalAmount: Number(row.estimated_amount) || 0,
    budget: Number(row.estimated_amount) || 0,
    status: row.status === 'completed' ? 'service_completed' : row.status === 'cancelled' ? 'cancelled' : 'confirmed',
    source: 'supabase-growth-order-leads',
    cloudLeadId: row.id || '',
    createdAt: row.created_at || new Date().toISOString()
  };
}

function orderStatusOptions(status) {
  const labels = {
    new: 'æ–°è®¢å•',
    confirmed: 'å·²ç¡®è®¤',
    deposit_paid: 'å·²ä»˜è®¢é‡‘',
    cancelled: 'å·²å–æ¶ˆ'
  };
  return adminEditableOrderStatuses.map(value => `<option value="${value}" ${value === status ? 'selected' : ''}>${labels[value]}</option>`).join('');
}

function collectAdminOrderInput(orderId) {
  const row = document.querySelector(`[data-admin-order-row="${CSS.escape(orderId)}"]`);
  if (!row) return null;
  const value = field => row.querySelector(`[data-order-field="${field}"]`)?.value || '';
  return {
    serviceType: value('serviceType'),
    status: value('status') || 'confirmed',
    totalAmount: Number(value('totalAmount')) || 0,
    adminNotes: value('adminNotes')
  };
}

async function syncOrderUpdateToCloud(order, input = {}) {
  const token = getSupabaseAdminSession()?.access_token;
  const sourceInquiryId = order?.externalInquiryId;
  if (!cloudReady || !token || !sourceInquiryId || typeof cloud.updateOrderLead !== 'function') return { ok: true, skipped: true };
  return cloud.updateOrderLead(sourceInquiryId, {
    serviceType: input.serviceType ?? order.serviceType,
    totalAmount: input.totalAmount ?? order.totalAmount,
    status: input.status ?? order.status,
    adminNotes: input.adminNotes ?? order.adminNotes ?? ''
  }, token);
}

async function syncCloudOrderLeads(force = false) {
  if (!cloudReady || cloudOrderLeadSync.loading) return;
  const token = getSupabaseAdminSession()?.access_token;
  if (!token || typeof cloud.loadOrderLeads !== 'function') return;
  if (!force && Date.now() - cloudOrderLeadSync.lastAt < 30000) return;

  cloudOrderLeadSync = { ...cloudOrderLeadSync, loading: true, error: '' };
  try {
    const result = await cloud.loadOrderLeads(token);
    if (!result.ok) {
      cloudOrderLeadSync = { ...cloudOrderLeadSync, loading: false, lastAt: Date.now(), error: result.message || `HTTP ${result.status || ''}` };
      return;
    }
    const rows = Array.isArray(result.data) ? result.data : [];
    let imported = 0;
    rows.forEach(row => {
      const upserted = api.upsertOrderLead(cloudLeadToGrowthPayload(row));
      if (upserted.ok && upserted.createdOrder) imported += 1;
    });
    cloudOrderLeadSync = { loading: false, lastAt: Date.now(), count: rows.length, imported, error: '' };
    if (page === 'admin') renderAdmin();
  } catch (error) {
    console.warn('Cloud order lead sync failed', error);
    cloudOrderLeadSync = { ...cloudOrderLeadSync, loading: false, lastAt: Date.now(), error: 'sync_failed' };
  }
}

function renderAdmin() {
  const root = document.querySelector('[data-growth-admin]');
  if (!root) return;
  importQueuedGrowthOrders();
  syncCloudOrderLeads(false);
  const snapshot = api.adminSnapshot();
  const memberById = new Map(snapshot.members.map(member => [member.id, member]));
  const promoterById = new Map(snapshot.promoters.map(promoter => [promoter.id, promoter]));
  const codeByPromoterId = new Map((snapshot.referralCodes || []).map(item => [item.promoterId, item.code]).filter(item => item[1]));
  const relationByMemberId = new Map(snapshot.relations.map(relation => [relation.memberId, relation]));
  const metricGrid = document.querySelector('.growth-admin-section .growth-metric-grid');
  if (metricGrid && !metricGrid.querySelector('[data-admin-growth="pending-commissions"]')) {
    metricGrid.insertAdjacentHTML('beforeend', '<div class="growth-metric"><strong>ç¡®è®¤ä¸­ä½£é‡‘</strong><b data-admin-growth="pending-commissions">0</b></div><div class="growth-metric"><strong>å¼‚å¸¸è®°å½•</strong><b data-admin-growth="risk-flags">0</b></div>');
  }
  const configForm = document.querySelector('[data-growth-config-form]');
  if (configForm && !configForm.querySelector('[data-growth-config-min-order]')) {
    const saveButton = configForm.querySelector('button[type="submit"]');
    saveButton?.insertAdjacentHTML('beforebegin', '<div class="growth-form-grid"><label>æœ€ä½Žè®¡ä½£é‡‘é¢ RM<input data-growth-config-min-order type="number" min="0" step="0.01"></label><label>æ¯å•æ€»ä½£é‡‘å°é¡¶ %<input data-growth-config-cap type="number" min="0" max="100" step="0.1"></label></div>');
  }
  snapshot.relations.forEach(relation => {
    if (relation.promoterId && relation.referralCode) codeByPromoterId.set(relation.promoterId, relation.referralCode);
  });
  const metric = (selector, value) => { const element = document.querySelector(selector); if (element) element.textContent = String(value); };
  metric('[data-admin-growth="orders"]', snapshot.orders.filter(item => ['confirmed', 'deposit_paid'].includes(item.status)).length);
  metric('[data-admin-growth="promoters"]', snapshot.promoters.filter(item => item.status === 'approved').length);
  metric('[data-admin-growth="commission"]', formatMoney(snapshot.commissions.reduce((sum, item) => sum + Number(item.commissionAmount || 0), 0)));
  metric('[data-admin-growth="withdrawals"]', snapshot.withdrawals.filter(item => !['paid', 'rejected', 'cancelled'].includes(item.status)).length);
  metric('[data-admin-growth="pending-commissions"]', snapshot.commissions.filter(item => item.status === 'confirming').length);
  metric('[data-admin-growth="risk-flags"]', snapshot.riskFlags.length);
  metric('[data-admin-growth="cloud-leads"]', cloudOrderLeadSync.loading ? 'åŒæ­¥ä¸­' : cloudOrderLeadSync.error ? 'æœªè¿žæŽ¥' : cloudOrderLeadSync.count);
  const memberRows = document.querySelector('[data-growth-admin-members]');
  const visibleMembers = snapshot.members.filter(member => {
    const promoter = snapshot.promoters.find(item => item.memberId === member.id);
    const referralCode = promoter ? codeByPromoterId.get(promoter.id) || '' : '';
    return matchesAdminSearch([member.name, member.email, member.phone, member.levelId, member.status, referralCode]);
  });
  if (memberRows) {
    memberRows.innerHTML = visibleMembers.length ? visibleMembers.map(member => {
      const promoter = snapshot.promoters.find(item => item.memberId === member.id);
      const referralCode = promoter ? codeByPromoterId.get(promoter.id) || '-' : '-';
      const directCount = snapshot.relations.filter(relation => relation.promoterMemberId === member.id && relation.status === 'active').length;
      return `<tr><td><strong>${esc(member.name || '90 Member')}</strong><br><small>${esc(member.phone || '-')} Â· ${esc(member.email || '-')}</small></td><td>${esc(member.levelId || 'member')}<br>${statusBadge(member.status || 'active')}</td><td>${promoter ? `${statusBadge(promoter.status)}<br><small>${esc(referralCode)}</small><br><small>ç›´å±žä¸‹çº¿ ${directCount}</small>` : '<span class="growth-muted">ç­‰å¾…ç”Ÿæˆ</span>'}</td><td>${formatMoney(member.totalSpend || 0)}<br><small>${Number(member.orderCount || 0)} orders</small></td><td><b>${Number(member.pointsBalance || 0)}</b></td></tr>`;
    }).join('') : '<tr><td colspan="5">æ²¡æœ‰ç¬¦åˆç­›é€‰çš„ä¼šå‘˜ã€‚</td></tr>';
  }
  const relationRows = document.querySelector('[data-growth-admin-relations]');
  const visibleRelations = snapshot.relations.filter(item => {
    const member = memberById.get(item.memberId);
    const parent = memberById.get(item.promoterMemberId);
    return matchesAdminSearch([item.referralCode, item.status, member?.name, member?.email, member?.phone, parent?.name, parent?.email, parent?.phone]);
  });
  if (relationRows) {
    relationRows.innerHTML = visibleRelations.length ? visibleRelations.map(item => {
      const member = memberById.get(item.memberId);
      const parent = memberById.get(item.promoterMemberId);
      return `<tr><td><strong>${esc(member?.name || item.memberId)}</strong><br><small>${esc(member?.phone || '-')} Â· ${esc(member?.email || '-')}</small></td><td><strong>${esc(parent?.name || '-')}</strong><br><small>${esc(parent?.phone || '-')} Â· ${esc(parent?.email || '-')}</small></td><td><code>${esc(item.referralCode || '-')}</code><br>${statusBadge(item.status)}</td><td>${new Date(item.boundAt).toLocaleDateString()}</td></tr>`;
    }).join('') : '<tr><td colspan="4">æš‚æ—¶æ²¡æœ‰æŽ¨èå…³ç³»ã€‚</td></tr>';
  }
  const orderRows = document.querySelector('[data-growth-admin-orders]');
  const visibleOrders = snapshot.orders.filter(item => {
    const statusOk = adminGrowthFilters.order === 'all' || item.status === adminGrowthFilters.order;
    const member = memberById.get(item.memberId);
    const relation = relationByMemberId.get(item.memberId);
    return statusOk && matchesAdminSearch([item.id, item.status, item.serviceType, member?.name, member?.email, member?.phone, relation?.referralCode]);
  });
  if (orderRows) {
    orderRows.innerHTML = visibleOrders.length ? visibleOrders.map(item => {
      const member = memberById.get(item.memberId);
      const relation = relationByMemberId.get(item.memberId);
      const canComplete = ['confirmed', 'deposit_paid'].includes(item.status);
      const locked = !adminEditableOrderStatuses.includes(item.status);
      return `<tr data-admin-order-row="${esc(item.id)}"><td><strong>${esc(item.id)}</strong><br><small>${esc(member?.name || item.memberId)} · ${esc(member?.phone || '-')}</small><br><small>${esc(item.externalInquiryId || item.source || '-')}</small></td><td><label class="growth-inline-field">服务<input data-order-field="serviceType" value="${esc(item.serviceType || '')}" ${locked ? 'disabled' : ''}></label><label class="growth-inline-field">状态<select data-order-field="status" ${locked ? 'disabled' : ''}>${orderStatusOptions(item.status)}</select></label>${relation ? `<small>推荐码 ${esc(relation.referralCode)}</small>` : ''}</td><td><label class="growth-inline-field">金额 RM<input data-order-field="totalAmount" type="number" min="0" step="0.01" value="${Number(item.totalAmount || 0).toFixed(2)}" ${locked ? 'disabled' : ''}></label><small>合资格 ${formatMoney(eligibleAmountForAdmin(item))}</small><label class="growth-inline-field">备注<textarea data-order-field="adminNotes" rows="2" ${locked ? 'disabled' : ''}>${esc(item.adminNotes || '')}</textarea></label></td><td><div class="growth-admin-actions">${locked ? '<span class="growth-muted">已锁定</span>' : `<button class="growth-button secondary" data-save-order="${esc(item.id)}">保存订单</button>${canComplete ? `<button class="growth-button" data-complete-order="${esc(item.id)}">确认完成并计佣</button>` : ''}`}</div></td></tr>`;
    }).join('') : '<tr><td colspan="4">没有符合筛选的订单。</td></tr>';
  }
  const commissionRows = document.querySelector('[data-growth-admin-commissions]');
  const visibleCommissions = snapshot.commissions.filter(item => {
    const promoter = promoterById.get(item.promoterId);
    const promoterMember = promoter ? memberById.get(promoter.memberId) : null;
    const buyer = memberById.get(item.memberId);
    return matchesAdminSearch([item.orderId, item.status, promoterMember?.name, promoterMember?.email, promoterMember?.phone, buyer?.name, buyer?.email, buyer?.phone]);
  });
  commissionRows.innerHTML = visibleCommissions.length ? visibleCommissions.map(item => {
    const promoter = promoterById.get(item.promoterId);
    const promoterMember = promoter ? memberById.get(promoter.memberId) : null;
    const buyer = memberById.get(item.memberId);
    return `<tr><td>${esc(item.orderId)}<br><small>æŽ¨èäººï¼š${esc(promoterMember?.name || '-')} Â· L${Number(item.generation || 1)}</small><br><small>é¡¾å®¢ï¼š${esc(buyer?.name || item.memberId)}</small></td><td>${statusBadge(item.status)}<br><small>${item.availableAt ? `å¯æçŽ°æ—¥ ${new Date(item.availableAt).toLocaleDateString()}` : '-'}</small></td><td>${formatMoney(item.eligibleAmount)}</td><td><b>${formatMoney(item.commissionAmount)}</b><br><small>${esc(item.commissionType)} ${Number(item.commissionRate || 0)}%</small></td></tr>`;
  }).join('') : '<tr><td colspan="4">æ²¡æœ‰ç¬¦åˆç­›é€‰çš„ä½£é‡‘è®°å½•ã€‚</td></tr>';
  const withdrawalRows = document.querySelector('[data-growth-admin-withdrawals]');
  const visibleWithdrawals = snapshot.withdrawals.filter(item => {
    const statusOk = adminGrowthFilters.withdrawal === 'all' || item.status === adminGrowthFilters.withdrawal;
    const member = memberById.get(item.memberId);
    return statusOk && matchesAdminSearch([item.id, item.status, item.bankName, item.accountName, member?.name, member?.email, member?.phone]);
  });
  withdrawalRows.innerHTML = visibleWithdrawals.length ? visibleWithdrawals.map(item => {
    const member = memberById.get(item.memberId);
    const payment = snapshot.withdrawalPayments.find(paymentItem => paymentItem.withdrawalId === item.id);
    return `<tr><td><strong>${esc(member?.name || item.memberId)}</strong><br><small>${esc(item.bankName || '-')} Â· ${esc(item.accountName || '-')}</small><br><small>${esc(item.bankAccount || item.duitNowNumber || '-')}</small></td><td><b>${formatMoney(item.amount)}</b><br><small>${new Date(item.createdAt).toLocaleDateString()}</small>${payment ? `<br><small>ä»˜æ¬¾ç¼–å· ${esc(payment.referenceNumber || '-')}</small>` : ''}</td><td>${statusBadge(item.status)}</td><td><div class="growth-admin-actions"><button class="growth-button" data-review-withdrawal="${item.id}" data-decision="approve">æ‰¹å‡†</button><button class="growth-button secondary" data-review-withdrawal="${item.id}" data-decision="processing">å¤„ç†ä¸­</button><button class="growth-button" data-review-withdrawal="${item.id}" data-decision="paid">æ ‡è®°å·²ä»˜æ¬¾</button><button class="growth-button secondary" data-review-withdrawal="${item.id}" data-decision="reject">æ‹’ç»</button></div></td></tr>`;
  }).join('') : '<tr><td colspan="4">æ²¡æœ‰ç¬¦åˆç­›é€‰çš„æçŽ°è¯·æ±‚ã€‚</td></tr>';
  const config = snapshot.config;
  document.querySelector('[data-growth-config-percent]').value = config.defaultCommission.value;
  document.querySelector('[data-growth-config-hold]').value = config.refundObservationDays;
  document.querySelector('[data-growth-config-min]').value = config.minimumWithdrawal;
  document.querySelector('[data-growth-config-min-order]').value = config.minimumCommissionEligibleAmount || 0;
  document.querySelector('[data-growth-config-cap]').value = config.maxCommissionPercentPerOrder || 5;
}

function bindAdmin() {
  if (!document.querySelector('[data-growth-admin]')) return;
  document.querySelector('[data-growth-admin-search]')?.addEventListener('input', event => {
    adminGrowthSearch = event.target.value || '';
    renderAdmin();
  });
  document.querySelectorAll('[data-growth-admin-filter]').forEach(select => {
    select.addEventListener('change', event => {
      adminGrowthFilters[event.target.dataset.growthAdminFilter] = event.target.value || 'all';
      renderAdmin();
    });
  });
  document.addEventListener('click', async event => {
    const exportButton = event.target.closest('[data-growth-export]');
    if (exportButton) {
      const snapshot = api.adminSnapshot();
      if (exportButton.dataset.growthExport === 'members') {
        downloadCsv(`90project-members-${new Date().toISOString().slice(0, 10)}.csv`, [
          ['name', 'phone', 'email', 'status', 'level', 'orders', 'total_spend', 'points'],
          ...snapshot.members.map(member => [member.name, member.phone, member.email, member.status, member.levelId, member.orderCount, member.totalSpend, member.pointsBalance])
        ]);
      } else {
        const promoterById = new Map(snapshot.promoters.map(promoter => [promoter.id, promoter]));
        const memberById = new Map(snapshot.members.map(member => [member.id, member]));
        downloadCsv(`90project-commissions-${new Date().toISOString().slice(0, 10)}.csv`, [
          ['order_id', 'promoter', 'member', 'generation', 'status', 'eligible_amount', 'commission_amount', 'created_at'],
          ...snapshot.commissions.map(item => {
            const promoter = promoterById.get(item.promoterId);
            return [item.orderId, memberById.get(promoter?.memberId)?.name || '', memberById.get(item.memberId)?.name || '', item.generation || 1, item.status, item.eligibleAmount, item.commissionAmount, item.createdAt];
          })
        ]);
      }
      return;
    }
    const syncButton = event.target.closest('[data-growth-sync-leads]');
    if (syncButton) {
      syncCloudOrderLeads(true);
      setMessage('æ­£åœ¨åŒæ­¥çº¿ä¸Šè®¢å•çº¿ç´¢...');
      return;
    }
    const saveOrderButton = event.target.closest('[data-save-order]');
    if (saveOrderButton) {
      const orderId = saveOrderButton.dataset.saveOrder;
      const input = collectAdminOrderInput(orderId);
      const result = input ? api.updateOrder(orderId, input, 'mock-admin') : { ok: false, reason: 'order_row_not_found' };
      if (!result.ok) {
        setMessage(`订单无法保存：${result.reason}`, true);
        renderAdmin();
        return;
      }
      const cloudResult = await syncOrderUpdateToCloud(result.order, input);
      setMessage(cloudResult.ok || cloudResult.skipped ? '订单资料已保存。' : '订单已保存，本次云端同步失败。', !(cloudResult.ok || cloudResult.skipped));
      renderAdmin();
      return;
    }
    const appButton = event.target.closest('[data-review-app]');
    if (appButton) {
      api.reviewPromoterApplication(appButton.dataset.reviewApp, appButton.dataset.decision, 'mock-admin', appButton.dataset.decision === 'reject' ? 'Mock review rejection' : 'Mock review approval');
      setMessage('ä¼šå‘˜æŽ¨èçŠ¶æ€å·²æ›´æ–°ã€‚');
      renderAdmin();
      return;
    }
    const completeOrderButton = event.target.closest('[data-complete-order]');
    if (completeOrderButton) {
      const orderId = completeOrderButton.dataset.completeOrder;
      const input = collectAdminOrderInput(orderId);
      if (input) api.updateOrder(orderId, input, 'mock-admin');
      const result = api.completeOrder(orderId, 'mock-admin');
      if (result.ok) await syncOrderUpdateToCloud(result.order, { ...(input || {}), status: result.order.status });
      setMessage(result.ok ? 'è®¢å•å·²ç¡®è®¤å®Œæˆï¼Œç³»ç»Ÿå·²è‡ªåŠ¨è®¡ç®—ç¬¦åˆæ¡ä»¶çš„æŽ¨èä½£é‡‘ã€‚' : `è®¢å•æ— æ³•å®Œæˆï¼š${result.reason}`, !result.ok);
      renderAdmin();
      return;
    }
    const withdrawalButton = event.target.closest('[data-review-withdrawal]');
    if (withdrawalButton) {
      const payment = withdrawalButton.dataset.decision === 'paid'
        ? {
            referenceNumber: window.prompt('è¯·è¾“å…¥ä»˜æ¬¾ç¼–å· / é“¶è¡Œäº¤æ˜“ç¼–å·', `PAY-${Date.now()}`) || `PAY-${Date.now()}`,
            method: 'Manual bank transfer'
          }
        : { referenceNumber: `MOCK-${Date.now()}` };
      const result = api.reviewWithdrawal(withdrawalButton.dataset.reviewWithdrawal, withdrawalButton.dataset.decision, 'mock-admin', payment);
      if (!result.ok) setMessage(`æçŽ°è¯·æ±‚æ— æ³•æ›´æ–°ï¼š${result.reason}`, true);
      else setMessage(withdrawalButton.dataset.decision === 'paid' ? 'æçŽ°å·²æ ‡è®°ä»˜æ¬¾ï¼Œå¹¶è®°å½•ä»˜æ¬¾ç¼–å·ã€‚' : 'æçŽ°è¯·æ±‚çŠ¶æ€å·²æ›´æ–°ã€‚');
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
    config.referralCommissionRates = Array.isArray(config.referralCommissionRates) ? config.referralCommissionRates : [3, 1, 1];
    config.referralCommissionRates[0] = config.defaultCommission.value;
    config.commissionRules = (config.commissionRules || []).map(rule => Number(rule.generation) === 1 ? { ...rule, value: config.defaultCommission.value } : rule);
    config.refundObservationDays = Number(document.querySelector('[data-growth-config-hold]').value) || 7;
    config.minimumWithdrawal = Number(document.querySelector('[data-growth-config-min]').value) || 50;
    config.minimumCommissionEligibleAmount = Number(document.querySelector('[data-growth-config-min-order]')?.value) || 0;
    config.maxCommissionPercentPerOrder = Number(document.querySelector('[data-growth-config-cap]')?.value) || 5;
    api.updateConfig(config, 'mock-admin');
    setMessage('å¢žé•¿ç³»ç»Ÿè§„åˆ™å·²ä¿å­˜ã€‚');
    renderAdmin();
  });
  renderAdmin();
}

document.querySelectorAll('[data-growth-language]').forEach(button => button.addEventListener('click', () => {
  language = ['zh', 'en'].includes(button.dataset.growthLanguage) ? button.dataset.growthLanguage : 'zh';
  localStorage.setItem(LANG_KEY, language);
  applyLanguage();
  if (page === 'member') renderMemberDashboard();
}));
document.addEventListener('click', event => {
  const link = event.target.closest('[data-growth-copy]');
  if (link) navigator.clipboard?.writeText(link.dataset.growthCopy);
});

const cloudState = await cloud.init();
cloudReady = Boolean(cloudState.configured);
if (page === 'member') {
  setCloudStatus(cloudReady ? t('cloudConnected') : t('cloudLocal'), cloudReady);
  bindMemberPage();
  renderAuthState();
  await syncCloudDashboard();
  renderMemberDashboard();
}
if (page === 'referral') bindReferralPage();
bindAdmin();
applyLanguage();
importQueuedGrowthOrders();
syncCloudOrderLeads(true);

window.addEventListener('np90:growth-order-queued', () => {
  const imported = importQueuedGrowthOrders();
  if (imported && page === 'admin') renderAdmin();
});

window.NP90GrowthMock = api;
