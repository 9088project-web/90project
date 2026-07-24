import { createGrowthApi, money } from './growth-domain.mjs';
import { createGrowthCloud } from './growth-cloud.mjs';

const api = createGrowthApi();
const cloud = createGrowthCloud();
const LANG_KEY = 'np90_growth_language_v1';
const GROWTH_ORDER_QUEUE_KEY = 'np90_growth_order_queue_v1';
const SUPABASE_ADMIN_SESSION_KEY = 'np90_supabase_session_v1';
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
    rewardTitle: '推荐奖励', rewardDesc: '支持三层真实订单推荐：第一代3%，第二代1%，第三代1%，订单完成并通过退款观察期后才进入可提现状态。',
    pathTitle: '清楚的奖励路径', pathRegister: '注册会员', pathWelcome: '+ 欢迎积分', pathOrder: '完成真实订单', pathPoints: '积分入账', pathRefer: '推荐朋友完成服务', pathCommission: '佣金确认', pathHold: '通过退款观察期', pathWithdraw: '可申请提现', startTitle: '立即开始', startDesc: '先注册会员，之后可以在会员中心查看积分、优惠券、订单、推荐和提现记录。',
    stepsTitle: '三步开始', stepsIntro: '最多追踪三层推荐关系，奖励只来自真实完成订单，不收取入会费，不靠拉人收费。',
    stepApply: '注册成为90推荐官', stepApplyDesc: '提交社交平台、地区和推荐方式，等待后台审核。', stepShare: '分享专属链接或二维码', stepShareDesc: '系统记录首次有效访问，已绑定的会员不会被其他推荐代码覆盖。', stepEarn: '订单完成后获得奖励', stepEarnDesc: '订单完成并经过退款观察期，佣金才会变成可提现状态。',
    rulesTitle: '透明规则', rulesMode: '奖励模式', rulesModeValue: '三层推荐奖励', rulesRate: '默认佣金', rulesRateValue: '第一代3% · 第二代1% · 第三代1%', rulesSettle: '结算条件', rulesSettleValue: '完成订单 + 观察期', rulesWithdraw: '提现方式', rulesWithdrawValue: '后台审核', notMemberTitle: '还不是会员？', notMemberDesc: '先注册会员，再在会员中心提交90推荐官申请。审核通过后才会生成推荐代码。',
    mockTitle: 'Mock 流程测试', mockDesc: '仅用于本地验收：创建询价、完成订单、模拟退款和释放观察期佣金。',
    memberLevel: '会员等级', commissionBook: '佣金账本', application: '成为90推荐官', memberMock: 'Mock 模式：不会真实收款、转账或发送 API 通知。'
  },
  en: {
    language: 'English', rewards: 'Member Rewards', referral: '90 Promoter', member: 'Member Centre', home: 'Home', login: 'Member Login', logout: 'Log out', register: 'Register', name: 'Name', email: 'Email', phone: 'Mobile number', password: 'Password (at least 6 characters)', loginAction: 'Log in', registerAction: 'Create member', welcome: 'Share 90 PROJECT with friends and earn transparent referral rewards.', apply: 'Become a 90 Promoter', applyIntro: 'After approval, you receive a referral code, share link and commission records.', pending: 'Under review', approved: 'Approved', code: 'Referral code', share: 'Share link', points: 'Points balance', coupons: 'Available coupons', commissions: 'Available commission', orders: 'My orders', enquiries: 'My enquiries', applySubmit: 'Submit application', socialPlatform: 'Social platform', socialAccount: 'Social account', region: 'Region', method: 'Promotion method', customerType: 'Expected customer type', agreeTerms: 'I agree to the promoter terms', agreePrivacy: 'I agree to the privacy policy', enquiry: 'Mock enquiry', complete: 'Mock complete order', refund: 'Mock refund', release: 'Release commission', withdrawal: 'Submit withdrawal', amount: 'Withdrawal amount', bank: 'Bank name', account: 'Bank account', accountName: 'Account name', mock: 'Mock mode: no real payment, bank transfer or API notification is used.', noData: 'No records yet.', shareText: 'Share 90 PROJECT with your friends:', identity: 'Email / mobile number', copy: 'Copy link', whatsapp: 'WhatsApp', benefitsTitle: 'Member benefits', benefitsIntro: 'Rewards are transparent and traceable, based on real enquiries and completed orders.', pointsTitle: 'Member points', pointsDesc: 'Earn points from registration, completed orders and selected campaigns. Every change is recorded.', couponTitle: 'Member coupons', couponDesc: 'Welcome, service, birthday and campaign coupons are controlled by admin rules.', rewardTitle: 'Referral rewards', rewardDesc: 'Supports three generations of real-order referrals: 3% for generation 1, 1% for generation 2 and 1% for generation 3. Commission becomes withdrawable after the refund observation period.', pathTitle: 'A clear reward path', pathRegister: 'Register as a member', pathWelcome: '+ Welcome points', pathOrder: 'Complete an eligible order', pathPoints: 'Points credited', pathRefer: 'Refer a friend who completes service', pathCommission: 'Commission confirmed', pathHold: 'Pass the refund observation period', pathWithdraw: 'Withdrawal available', startTitle: 'Start now', startDesc: 'Register first, then review points, coupons, orders, referrals and withdrawals in the member centre.', stepsTitle: 'Three simple steps', stepsIntro: 'The system tracks up to three referral generations. Rewards only come from completed real orders; there is no joining fee or recruitment-based payout.', stepApply: 'Register as a 90 Promoter', stepApplyDesc: 'Submit your platform, region and promotion method for admin review.', stepShare: 'Share your link or QR code', stepShareDesc: 'The first valid visit is recorded and an existing member binding cannot be overwritten.', stepEarn: 'Earn after the order is completed', stepEarnDesc: 'Commission becomes withdrawable after order completion and the refund observation period.', rulesTitle: 'Transparent rules', rulesMode: 'Reward model', rulesModeValue: 'Three-generation referral reward', rulesRate: 'Default commission', rulesRateValue: 'Gen 1 3% · Gen 2 1% · Gen 3 1%', rulesSettle: 'Settlement condition', rulesSettleValue: 'Completed order + hold period', rulesWithdraw: 'Withdrawal method', rulesWithdrawValue: 'Manual review', notMemberTitle: 'Not a member yet?', notMemberDesc: 'Register first, then submit the promoter application in the member centre. A referral code is created after approval.', mockTitle: 'Mock flow testing', mockDesc: 'For local acceptance only: create an enquiry, complete an order, simulate a refund and release held commission.', memberLevel: 'Member level', commissionBook: 'Commission ledger', application: 'Become a 90 Promoter', memberMock: 'Mock mode: no real payment, bank transfer or API notification is used.'
  }
};

Object.assign(translations.zh, {
  referralStatsTitle: '\u6211\u7684\u63a8\u8350\u4f1a\u5458',
  referralStatsIntro: '\u7cfb\u7edf\u4f1a\u81ea\u52a8\u7edf\u8ba1\u4f60\u7684\u4e09\u5c42\u63a8\u8350\u4f1a\u5458\u548c\u5b8c\u6210\u8ba2\u5355\u4eba\u6570\u3002',
  referralTotal: '\u63a8\u8350\u4f1a\u5458\u603b\u6570',
  referralLevelOne: '\u7b2c\u4e00\u4ee3',
  referralLevelTwo: '\u7b2c\u4e8c\u4ee3',
  referralLevelThree: '\u7b2c\u4e09\u4ee3',
  referralCompleted: '\u5df2\u5b8c\u6210\u8ba2\u5355\u4f1a\u5458',
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

Object.assign(translations.zh, {
  memberMetaTitle: '会员中心 | 90 PROJECT',
  memberHeroTitle: '九零食刻会员中心',
  memberHeroDesc: '用手机验证建立会员身份，统一管理资料、订单记录、积分优惠、推荐奖励和提现申请。',
  cloudChecking: '正在检测会员云端...',
  cloudConnected: 'Supabase 已连接，会员资料会同步云端。',
  cloudLocal: '本地会员模式：Supabase 尚未配置或暂不可用。',
  cloudReadFail: 'Supabase 已配置，但当前读取失败；页面继续使用本地记录。',
  benefitOne: '注册欢迎积分',
  benefitTwo: '订单记录归档',
  benefitThree: '推荐奖励查询',
  memberStepPhone: '手机验证',
  memberStepPhoneDesc: '注册前先确认电话号码，减少重复会员与错误订单资料。',
  memberStepProfile: '会员资料',
  memberStepProfileDesc: '保存常用地址、人数和口味备注，下次询问更快处理。',
  memberStepRewards: '奖励记录',
  memberStepRewardsDesc: '积分、优惠券、推荐奖励和提现记录集中查看。',
  memberMiniStepVerify: '验证手机',
  memberMiniStepInfo: '填写资料',
  memberMiniStepCreate: '创建会员',
  existingMember: '已有会员',
  loginIntro: '登录后可以查看积分、优惠券、订单和推荐奖励。',
  forgotLogin: '忘记密码或无法登入？',
  whatsappHelp: 'WhatsApp 协助',
  newMember: '新会员',
  registerIntro: '创建会员后会自动获得欢迎积分和新会员优惠券。',
  registerFootnote: '注册后可查看积分、优惠券、推荐奖励与提现记录。',
  phoneCode: '手机验证码',
  sendPhoneCode: '发送验证码',
  resendPhoneCode: '重新发送',
  phoneVerifyHint: '请先验证手机号码，验证成功后才可以创建会员。',
  phoneRequired: '请先填写手机号码。',
  phoneCodeRequired: '请输入手机验证码。',
  phoneCodeSent: '验证码已发送，请查看手机短信。',
  phoneCodeLocal: '本地测试验证码：',
  phoneCodeSending: '发送中...',
  phoneCodeChecking: '验证中...',
  phoneVerified: '手机号码已验证，可以创建会员。',
  phoneVerifyFailed: '验证码不正确或已过期，请重新发送。',
  phoneChanged: '手机号码已更改，请重新验证。',
  loggedIn: '已登录',
  helloPrefix: '你好，',
  dashboardIntro: '你的会员资料、询问记录、优惠和推荐奖励都在这里。',
  profileTitle: '会员资料',
  saveProfile: '保存会员资料',
  companyLabel: '公司 / 家庭名称',
  addressLabel: '常用地址',
  preferenceLabel: '口味备注',
  birthday: '生日',
  estimatedPax: '常用人数',
  companyPlaceholder: '公司名、家庭名或联系人备注',
  addressPlaceholder: '方便下次下单自动带入',
  preferencePlaceholder: '例如：少辣、不要葱、不要猪肉、喜欢清淡',
  promoterIntro: '申请通过后，你会得到专属推荐码、分享链接和佣金记录。',
  couponListTitle: '优惠券',
  pointsListTitle: '积分记录',
  notificationTitle: '会员通知',
  applicationTitle: '申请成为90推荐官',
  applicationIntro: '适合经常介绍朋友、公司、活动客户的人。后台审核通过后才会生成推荐码。',
  withdrawalTitle: '提现申请',
  withdrawalIntro: '佣金达到最低提现金额后，可以提交后台审核。',
  submitWithdrawal: '提交提现',
  mockToolsTitle: '本地验收工具',
  mockToolsIntro: '只用于测试会员流程，不会真实收款、转账或通知顾客。',
  footerBack: '返回首页',
  loginHelpDuplicate: '这个 Email 或手机号已经注册，可以直接登录。',
  invalidRegister: '请填写完整资料，密码至少 6 个字符。',
  registerCloudOk: '会员已创建，并已同步 Supabase。',
  registerCloudConfirm: '会员已创建。Supabase 可能需要 Email 确认后才会同步。',
  registerCloudFail: '会员已创建，本地可用；Supabase 同步暂时失败。',
  registerLocalOk: '会员已创建。欢迎积分与新会员优惠券已加入。',
  loginBusy: '登录中...',
  registerBusy: '创建中...',
  saveBusy: '保存中...',
  submitBusy: '提交中...',
  loginError: 'Email / 手机号或密码不正确。如果刚注册云端账号，请确认 Email 后再试。',
  loginOkCloud: '会员已登录，正在同步云端资料。',
  loginOk: '会员已登录。',
  logoutOk: '已退出会员中心。',
  loginRequired: '请先登录会员。',
  profileSaveFail: '会员资料保存失败。',
  profileCloudOk: '会员资料已保存，并已同步云端。',
  profileCloudFail: '会员资料已保存，本次云端同步失败。',
  profileLocalOk: '会员资料已保存。',
  applicationExists: '你已经提交过推荐官申请，等待后台审核即可。',
  termsRequired: '请先同意推荐官条款与隐私政策。',
  applicationCloudOk: '推荐官申请已提交，并已同步云端。',
  applicationCloudFail: '推荐官申请已保存在本地，云端同步暂时失败。',
  applicationLocalOk: '推荐官申请已提交审核。',
  withdrawPromoterRequired: '推荐官通过审核后才可以申请提现。',
  withdrawBelowMinimum: '提现金额低于最低提现金额。',
  withdrawPending: '你已经有一笔提现在处理中。',
  withdrawInsufficient: '可提现佣金余额不足。',
  withdrawCloudOk: '提现申请已提交，并已同步云端。',
  withdrawCloudFail: '提现申请已保存在本地，云端同步暂时失败。',
  withdrawLocalOk: '提现申请已提交后台审核。'
});

Object.assign(translations.en, {
  referralStatsTitle: 'My referred members',
  referralStatsIntro: 'The system counts your three referral levels and completed-order members automatically.',
  referralTotal: 'Total referred',
  referralLevelOne: 'Level 1',
  referralLevelTwo: 'Level 2',
  referralLevelThree: 'Level 3',
  referralCompleted: 'Completed-order members',
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
  referral: '会员推荐',
  welcome: '每位会员都会自动拥有自己的推荐码。分享给朋友后，系统会自动绑定关系并按完成订单计算三代佣金。',
  apply: '我的推荐码',
  applyIntro: '会员注册后自动拥有推荐码、分享链接和佣金记录。',
  code: '我的推荐码',
  shareText: '这是我的九零食刻会员推荐链接：',
  application: '会员推荐',
  promoterIntro: '每位会员注册后自动拥有推荐码、分享链接和佣金记录。',
  applicationTitle: '会员自动拥有推荐码',
  applicationIntro: '登录会员中心即可复制推荐码和分享链接。朋友通过你的链接注册后，系统会自动记录推荐关系。',
  stepsTitle: '三步开始',
  stepsIntro: '最多追踪三层推荐关系，奖励只来自真实完成订单，不收取入会费，不靠拉人收费。',
  stepApply: '注册会员',
  stepApplyDesc: '完成会员注册后，系统会自动生成你的专属推荐码和分享链接。',
  stepShare: '分享推荐码',
  stepShareDesc: '朋友通过你的链接访问并注册后，系统自动记录直属下线关系。',
  notMemberTitle: '还不是会员？',
  notMemberDesc: '先注册会员，系统会自动为你准备推荐码。登录会员中心即可复制推荐码、分享链接和查看佣金记录。',
  applicationExists: '会员推荐资料已存在。',
  termsRequired: '请确认会员推荐规则。',
  applicationCloudOk: '会员推荐资料已同步云端。',
  applicationCloudFail: '会员推荐资料已保存在本地，云端同步暂时失败。',
  applicationLocalOk: '会员推荐资料已保存。',
  withdrawPromoterRequired: '推荐码生成后才可以申请提现。'
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

function updateMessageElement(element, message, error = false) {
  if (!element) return;
  element.textContent = message || '';
  element.classList.toggle('error', error);
  element.hidden = !message;
}

function setMessage(message, error = false, target = 'general') {
  const loginMessage = document.querySelector('[data-growth-login-message]');
  if (target === 'login' && loginMessage) {
    updateMessageElement(loginMessage, message, error);
    document.querySelectorAll('[data-growth-message]').forEach(element => updateMessageElement(element, '', false));
    return;
  }
  updateMessageElement(loginMessage, '', false);
  document.querySelectorAll('[data-growth-message]').forEach(element => updateMessageElement(element, message, error));
}

function setBusy(form, busy, label = '') {
  const button = form?.querySelector('button[type="submit"]');
  if (!button) return;
  if (busy) {
    button.dataset.originalText = button.textContent;
    button.textContent = label || '处理中...';
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
  }
}

function busyLabel(key) {
  return t(key) || '处理中...';
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

function calculateReferralStats(memberId, state) {
  const activeRelations = (state.referralRelations || []).filter(item => item.status !== 'inactive' && item.status !== 'cancelled');
  const childrenOf = parentIds => new Set(activeRelations
    .filter(item => parentIds.has(item.promoterMemberId || item.parentMemberId))
    .map(item => item.memberId)
    .filter(Boolean));
  const levelOne = childrenOf(new Set([memberId]));
  const levelTwo = childrenOf(levelOne);
  const levelThree = childrenOf(levelTwo);
  const referredMembers = new Set([...levelOne, ...levelTwo, ...levelThree]);
  const completedMembers = new Set((state.orders || [])
    .filter(order => referredMembers.has(order.memberId) && ['service_completed', 'fully_paid', 'completed'].includes(String(order.status || '').toLowerCase()))
    .map(order => order.memberId));
  return {
    total: referredMembers.size,
    levelOne: levelOne.size,
    levelTwo: levelTwo.size,
    levelThree: levelThree.size,
    completed: completedMembers.size
  };
}

function renderReferralStats(memberId, state) {
  const box = document.querySelector('[data-member-referral-stats]');
  if (!box) return;
  const stats = calculateReferralStats(memberId, state);
  Object.entries(stats).forEach(([key, value]) => {
    const target = box.querySelector(`[data-referral-stat="${key}"]`);
    if (target) target.textContent = String(value);
  });
}

function renderMemberDashboard() {
  const member = currentMember();
  const dashboard = document.querySelector('[data-growth-dashboard]');
  if (!member || !dashboard) return;
  const summary = api.summary(member.id);
  const promoter = summary.promoter;
  const code = summary.referralCode;
  const state = api.getState();
  renderReferralStats(member.id, state);
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
    promoterBox.innerHTML = `<span class="growth-badge">${esc(t('approved'))}</span><h3>${esc(t('code'))}</h3><code class="growth-code">${esc(code)}</code><p>${esc(t('share'))}:<br><a href="${esc(shareUrl(code))}">${esc(shareUrl(code))}</a></p><div class="growth-actions"><button class="growth-button" type="button" data-copy-growth="${esc(shareUrl(code))}">${esc(t('copy'))}</button><a class="growth-button secondary" target="_blank" rel="noopener" href="https://wa.me/60189490908?text=${encodeURIComponent(`${t('shareText')} ${shareUrl(code)}`)}">${esc(t('whatsapp'))}</a></div>`;
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
  commissionList.innerHTML = allCommissions.length ? allCommissions.map(item => `<li><span>${esc(item.status)}<br><small>L${Number(item.generation || 1)} · ${esc(item.orderId)}</small></span><b>${formatMoney(item.commissionAmount)}</b></li>`).join('') : `<li>${esc(t('noData'))}</li>`;
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
      return setMessage(t('loginError'), true, 'login');
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
      return setMessage(reasons[result.reason] || `提现申请无法提交：${result.reason}`, true);
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
    new: '新订单',
    confirmed: '已确认',
    deposit_paid: '已付订金',
    cancelled: '已取消'
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
    metricGrid.insertAdjacentHTML('beforeend', '<div class="growth-metric"><strong>确认中佣金</strong><b data-admin-growth="pending-commissions">0</b></div><div class="growth-metric"><strong>异常记录</strong><b data-admin-growth="risk-flags">0</b></div>');
  }
  const configForm = document.querySelector('[data-growth-config-form]');
  if (configForm && !configForm.querySelector('[data-growth-config-min-order]')) {
    const saveButton = configForm.querySelector('button[type="submit"]');
    saveButton?.insertAdjacentHTML('beforebegin', '<div class="growth-form-grid"><label>最低计佣金额 RM<input data-growth-config-min-order type="number" min="0" step="0.01"></label><label>每单总佣金封顶 %<input data-growth-config-cap type="number" min="0" max="100" step="0.1"></label></div>');
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
  metric('[data-admin-growth="cloud-leads"]', cloudOrderLeadSync.loading ? '同步中' : cloudOrderLeadSync.error ? '未连接' : cloudOrderLeadSync.count);
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
      return `<tr><td><strong>${esc(member.name || '90 Member')}</strong><br><small>${esc(member.phone || '-')} · ${esc(member.email || '-')}</small></td><td>${esc(member.levelId || 'member')}<br>${statusBadge(member.status || 'active')}</td><td>${promoter ? `${statusBadge(promoter.status)}<br><small>${esc(referralCode)}</small><br><small>直属下线 ${directCount}</small>` : '<span class="growth-muted">等待生成</span>'}</td><td>${formatMoney(member.totalSpend || 0)}<br><small>${Number(member.orderCount || 0)} orders</small></td><td><b>${Number(member.pointsBalance || 0)}</b></td></tr>`;
    }).join('') : '<tr><td colspan="5">没有符合筛选的会员。</td></tr>';
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
      return `<tr><td><strong>${esc(member?.name || item.memberId)}</strong><br><small>${esc(member?.phone || '-')} · ${esc(member?.email || '-')}</small></td><td><strong>${esc(parent?.name || '-')}</strong><br><small>${esc(parent?.phone || '-')} · ${esc(parent?.email || '-')}</small></td><td><code>${esc(item.referralCode || '-')}</code><br>${statusBadge(item.status)}</td><td>${new Date(item.boundAt).toLocaleDateString()}</td></tr>`;
    }).join('') : '<tr><td colspan="4">暂时没有推荐关系。</td></tr>';
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
    return `<tr><td>${esc(item.orderId)}<br><small>推荐人：${esc(promoterMember?.name || '-')} · L${Number(item.generation || 1)}</small><br><small>顾客：${esc(buyer?.name || item.memberId)}</small></td><td>${statusBadge(item.status)}<br><small>${item.availableAt ? `可提现日 ${new Date(item.availableAt).toLocaleDateString()}` : '-'}</small></td><td>${formatMoney(item.eligibleAmount)}</td><td><b>${formatMoney(item.commissionAmount)}</b><br><small>${esc(item.commissionType)} ${Number(item.commissionRate || 0)}%</small></td></tr>`;
  }).join('') : '<tr><td colspan="4">没有符合筛选的佣金记录。</td></tr>';
  const withdrawalRows = document.querySelector('[data-growth-admin-withdrawals]');
  const visibleWithdrawals = snapshot.withdrawals.filter(item => {
    const statusOk = adminGrowthFilters.withdrawal === 'all' || item.status === adminGrowthFilters.withdrawal;
    const member = memberById.get(item.memberId);
    return statusOk && matchesAdminSearch([item.id, item.status, item.bankName, item.accountName, member?.name, member?.email, member?.phone]);
  });
  withdrawalRows.innerHTML = visibleWithdrawals.length ? visibleWithdrawals.map(item => {
    const member = memberById.get(item.memberId);
    const payment = snapshot.withdrawalPayments.find(paymentItem => paymentItem.withdrawalId === item.id);
    return `<tr><td><strong>${esc(member?.name || item.memberId)}</strong><br><small>${esc(item.bankName || '-')} · ${esc(item.accountName || '-')}</small><br><small>${esc(item.bankAccount || item.duitNowNumber || '-')}</small></td><td><b>${formatMoney(item.amount)}</b><br><small>${new Date(item.createdAt).toLocaleDateString()}</small>${payment ? `<br><small>付款编号 ${esc(payment.referenceNumber || '-')}</small>` : ''}</td><td>${statusBadge(item.status)}</td><td><div class="growth-admin-actions"><button class="growth-button" data-review-withdrawal="${item.id}" data-decision="approve">批准</button><button class="growth-button secondary" data-review-withdrawal="${item.id}" data-decision="processing">处理中</button><button class="growth-button" data-review-withdrawal="${item.id}" data-decision="paid">标记已付款</button><button class="growth-button secondary" data-review-withdrawal="${item.id}" data-decision="reject">拒绝</button></div></td></tr>`;
  }).join('') : '<tr><td colspan="4">没有符合筛选的提现请求。</td></tr>';
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
      setMessage('正在同步线上订单线索...');
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
      setMessage('会员推荐状态已更新。');
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
      setMessage(result.ok ? '订单已确认完成，系统已自动计算符合条件的推荐佣金。' : `订单无法完成：${result.reason}`, !result.ok);
      renderAdmin();
      return;
    }
    const withdrawalButton = event.target.closest('[data-review-withdrawal]');
    if (withdrawalButton) {
      const payment = withdrawalButton.dataset.decision === 'paid'
        ? {
            referenceNumber: window.prompt('请输入付款编号 / 银行交易编号', `PAY-${Date.now()}`) || `PAY-${Date.now()}`,
            method: 'Manual bank transfer'
          }
        : { referenceNumber: `MOCK-${Date.now()}` };
      const result = api.reviewWithdrawal(withdrawalButton.dataset.reviewWithdrawal, withdrawalButton.dataset.decision, 'mock-admin', payment);
      if (!result.ok) setMessage(`提现请求无法更新：${result.reason}`, true);
      else setMessage(withdrawalButton.dataset.decision === 'paid' ? '提现已标记付款，并记录付款编号。' : '提现请求状态已更新。');
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
    setMessage('增长系统规则已保存。');
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
