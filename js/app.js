const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const backTop = document.getElementById('backTop');
const form = document.getElementById('orderForm');
const orderPreviewText = document.getElementById('orderPreviewText');
const copyOrderPreview = document.getElementById('copyOrderPreview');
const orderFormMessage = document.getElementById('orderFormMessage');

const memberOpen = document.getElementById('memberOpen');
const memberModal = document.getElementById('memberModal');
const memberAuthPanel = document.getElementById('memberAuthPanel');
const memberDashboard = document.getElementById('memberDashboard');
const memberMessage = document.getElementById('memberMessage');
const memberLoginForm = document.getElementById('memberLoginForm');
const memberRegisterForm = document.getElementById('memberRegisterForm');
const memberProfileText = document.getElementById('memberProfileText');
const memberRecords = document.getElementById('memberRecords');
const memberLogout = document.getElementById('memberLogout');
const clearMemberRecords = document.getElementById('clearMemberRecords');
const memberReferralCode = document.getElementById('memberReferralCode');
const copyReferralCode = document.getElementById('copyReferralCode');
const shareReferralWhatsApp = document.getElementById('shareReferralWhatsApp');
const memberReferralRewards = document.getElementById('memberReferralRewards');
const clearReferralRewards = document.getElementById('clearReferralRewards');
const adminModal = document.getElementById('adminModal');
const adminAuthPanel = document.getElementById('adminAuthPanel');
const adminDashboard = document.getElementById('adminDashboard');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminEmail = document.getElementById('adminEmail');
const adminPassword = document.getElementById('adminPassword');
const adminMessage = document.getElementById('adminMessage');
const adminLogout = document.getElementById('adminLogout');
const weeklyNoteZh = document.getElementById('weeklyNoteZh');
const weeklyNoteEn = document.getElementById('weeklyNoteEn');
const adminWeeklyRows = document.getElementById('adminWeeklyRows');
const adminAddonRows = document.getElementById('adminAddonRows');
const addWeeklyRow = document.getElementById('addWeeklyRow');
const addAddonRow = document.getElementById('addAddonRow');
const saveAdminContent = document.getElementById('saveAdminContent');
const resetAdminContent = document.getElementById('resetAdminContent');
const adminDataStatus = document.getElementById('adminDataStatus');
const adminInquiries = document.getElementById('adminInquiries');
const adminMemberStatus = document.getElementById('adminMemberStatus');
const adminMembers = document.getElementById('adminMembers');
const adminSiteRows = document.getElementById('adminSiteRows');
const adminCateringMinimum = document.getElementById('adminCateringMinimum');
const adminCateringRows = document.getElementById('adminCateringRows');
const addCateringRow = document.getElementById('addCateringRow');
const exportLocalData = document.getElementById('exportLocalData');
const importLocalData = document.getElementById('importLocalData');
const importLocalDataInput = document.getElementById('importLocalDataInput');
const clearAdminInquiries = document.getElementById('clearAdminInquiries');
const cateringMenuGrid = document.getElementById('cateringMenuGrid');
const cateringPax = document.getElementById('cateringPax');
const cateringServiceStyle = document.getElementById('cateringServiceStyle');
const calculateCateringPrice = document.getElementById('calculateCateringPrice');
const cateringEstimateTotal = document.getElementById('cateringEstimateTotal');
const cateringEstimateMeta = document.getElementById('cateringEstimateMeta');
const selectedCateringSummary = document.getElementById('selectedCateringSummary');
const cateringWhatsApp = document.getElementById('cateringWhatsApp');

const MEMBERS_KEY = 'np90_members_v1';
const INQUIRIES_KEY = 'np90_inquiries_v1';
const SESSION_KEY = 'np90_member_session_v1';
const LANG_KEY = 'np90_language_v1';
const ADMIN_CONTENT_KEY = 'np90_admin_content_v1';
const ADMIN_SESSION_KEY = 'np90_admin_session_v1';
const ADMIN_ATTEMPTS_KEY = 'np90_admin_attempts_v1';
const ADMIN_LOCK_KEY = 'np90_admin_lock_until_v1';
const SUPABASE_SESSION_KEY = 'np90_supabase_session_v1';
const SUPABASE_MEMBER_SESSION_KEY = 'np90_supabase_member_session_v1';
const ADMIN_CONTENT_SETTING_KEY = 'admin_content';
const ADMIN_EMAIL = '9088project@gmail.com';
const ADMIN_PASSWORD_HASH = '3b523443';
const WHATSAPP_NUMBER = '601110977166';
const INQUIRY_STATUSES = ['new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'];
const REFERRAL_REWARD_STATUSES = ['pending', 'approved', 'redeemed', 'cancelled'];
const REFERRAL_LEVEL_RATES = [1, 0.5, 0.3, 0.2, 0.1];
const CATERING_MINIMUM_TOTAL = 300;
const CATERING_SERVICE_STYLES = {
  packed: { label: '餐盒 / Packed Meal', multiplier: 1 },
  buffet: { label: '小型 Buffet / Setup', multiplier: 1.12 },
  event: { label: '活动餐饮 / Event Catering', multiplier: 1.18 }
};
const CATERING_MENU = [
  {
    id: 'staple',
    title: '主食',
    label: 'Staple',
    rate: 3,
    items: ['腊肠炒饭', '蛋炒饭', '福建面', '炒米粉', '扬州炒饭', '干炒河粉', '白饭']
  },
  {
    id: 'porridge',
    title: '汤类 / 粥类',
    label: 'Soup / Porridge',
    rate: 4,
    items: ['皮蛋瘦肉粥', '鸡丝粥']
  },
  {
    id: 'vegetable',
    title: '蔬菜类',
    label: 'Vegetables',
    rate: 4.5,
    items: ['炒什锦菜', '干煸四季豆', 'Salad', '娘惹阿杂', '蒜蓉西兰花', '清炒小白菜', '奶油杂菜', '蚝油生菜', '蒜蓉菠菜', '炒高丽菜']
  },
  {
    id: 'chicken',
    title: '鸡肉类',
    label: 'Chicken',
    rate: 7,
    items: ['咖喱鸡', 'Sambal 鸡', '香料炸鸡', '咸蛋奶油鸡', '黑胡椒鸡扒', '蘑菇鸡扒', 'Lemon Chicken', 'Sweet & Sour Chicken', 'Ginger Onion Chicken']
  },
  {
    id: 'pork',
    title: '猪肉类',
    label: 'Pork',
    rate: 7.5,
    items: ['南乳炸肉', '咸蛋奶油猪', '糖醋肉', '咕噜肉', '姜葱肉片', '红烧肉', '蒜香五花肉']
  },
  {
    id: 'fish',
    title: '鱼类',
    label: 'Fish',
    rate: 9,
    items: ['宫保鱼片', '咸蛋奶油鱼', '香煎三文鱼配 Tartar Sauce', '炸鱼柳', 'Sweet Sour Fish', '黑椒鱼柳', '姜葱鱼片', '酸辣鱼片', '香煎鳕鱼', '泰式柠檬鱼']
  },
  {
    id: 'prawn',
    title: '虾类',
    label: 'Prawn',
    rate: 11,
    items: ['椒盐虾', '麦片虾', '咸蛋奶油虾']
  },
  {
    id: 'tofu',
    title: '豆腐类',
    label: 'Tofu',
    rate: 4.5,
    items: ['泰式豆腐', '红烧豆腐', '麻婆豆腐', '家常豆腐']
  },
  {
    id: 'flavour',
    title: '风味搭配（鸡 / 猪 / 鱼 / 虾）',
    label: 'Sauce Style',
    rate: 0,
    items: ['咖喱 Curry', 'Sambal', '咸蛋奶油 Salted Egg Butter', '宫保 Kung Pao', '泰式酸辣 Thai Style', 'Sweet & Sour', '姜葱 Ginger Onion', '麦片 Cereal', '椒盐 Salt & Pepper']
  }
];

const SITE_CONTENT_FIELDS = [
  { path: 'title', label: 'SEO 标题 / Browser Title' },
  { path: 'description', label: 'SEO 描述 / Meta Description', multiline: true },
  { path: 'nav.home', label: '导航：首页' },
  { path: 'nav.meal', label: '导航：包伙食' },
  { path: 'nav.catering', label: '导航：外餐服务' },
  { path: 'nav.styling', label: '导航：活动布置' },
  { path: 'nav.faq', label: '导航：FAQ' },
  { path: 'nav.referral', label: '导航：推荐奖励' },
  { path: 'nav.whatsapp', label: '导航：WhatsApp 按钮' },
  { path: 'nav.mobileWhatsApp', label: '手机底部 WhatsApp 按钮' },
  { path: 'hero.title', label: 'Hero 主标题' },
  { path: 'hero.eyebrow', label: 'Hero 英文/副标' },
  { path: 'hero.tags', label: 'Hero 服务标签' },
  { path: 'hero.slogan', label: 'Hero Slogan' },
  { path: 'hero.sub', label: 'Hero 说明', multiline: true },
  { path: 'hero.primary', label: 'Hero 主按钮' },
  { path: 'hero.secondary', label: 'Hero WhatsApp 按钮' },
  { path: 'mealPlan.title', label: '包伙食区标题' },
  { path: 'mealPlan.desc', label: '包伙食区说明', multiline: true },
  ...[0, 1, 2].flatMap(index => [
    { path: `prices.${index}.title`, label: `配套 ${index + 1} 标题` },
    { path: `prices.${index}.priceHtml`, label: `配套 ${index + 1} 价格显示`, multiline: true },
    { path: `prices.${index}.muted`, label: `配套 ${index + 1} 小资料` },
    { path: `prices.${index}.line`, label: `配套 ${index + 1} 内容`, multiline: true },
    { path: `prices.${index}.small`, label: `配套 ${index + 1} 适合对象`, multiline: true },
    { path: `prices.${index}.button`, label: `配套 ${index + 1} 按钮` },
    { path: `order.packageOptions.${index}.label`, label: `配套 ${index + 1} 表单显示` },
    { path: `order.packageOptions.${index}.value`, label: `配套 ${index + 1} WhatsApp 内容` }
  ]),
  ...[0, 1, 2, 3].flatMap(index => [
    { path: `services.${index}.title`, label: `服务卡 ${index + 1} 标题` },
    { path: `services.${index}.label`, label: `服务卡 ${index + 1} 英文小标` },
    { path: `services.${index}.desc`, label: `服务卡 ${index + 1} 说明`, multiline: true }
  ]),
  { path: 'order.title', label: '下单表单标题' },
  { path: 'order.label', label: '下单表单小标' },
  { path: 'order.submit', label: '下单按钮' },
  { path: 'order.fields.name', label: '表单字段：姓名' },
  { path: 'order.fields.phone', label: '表单字段：电话' },
  { path: 'order.fields.package', label: '表单字段：配套' },
  { path: 'order.fields.pax', label: '表单字段：人数' },
  { path: 'order.fields.meal', label: '表单字段：餐期' },
  { path: 'order.fields.date', label: '表单字段：开始日期' },
  { path: 'order.fields.area', label: '表单字段：配送区域' },
  { path: 'order.fields.referralCode', label: '表单字段：推荐码' },
  { path: 'order.fields.addons', label: '表单字段：加购' },
  { path: 'order.fields.notes', label: '表单字段：备注' },
  { path: 'order.placeholders.name', label: '表单提示：姓名' },
  { path: 'order.placeholders.phone', label: '表单提示：电话' },
  { path: 'order.placeholders.pax', label: '表单提示：人数' },
  { path: 'order.placeholders.area', label: '表单提示：配送地区' },
  { path: 'order.placeholders.referralCode', label: '表单提示：推荐码' },
  { path: 'order.placeholders.notes', label: '表单提示：备注', multiline: true },
  ...[0, 1, 2].map(index => ({ path: `order.mealOptions.${index}.label`, label: `餐期选项 ${index + 1} 显示` })),
  ...[0, 1, 2].map(index => ({ path: `order.mealOptions.${index}.value`, label: `餐期选项 ${index + 1} WhatsApp 内容` })),
  { path: 'order.packageOptions.3.label', label: '配套 4 表单显示' },
  { path: 'order.packageOptions.3.value', label: '配套 4 WhatsApp 内容' },
  { path: 'order.previewLabel', label: 'WhatsApp 预览小标' },
  { path: 'order.previewEmpty', label: 'WhatsApp 预览空状态', multiline: true },
  { path: 'order.copyPreview', label: '复制内容按钮' },
  { path: 'order.copiedPreview', label: '复制成功提示' },
  { path: 'features.catering.label', label: '外餐区小标' },
  { path: 'features.catering.title', label: '外餐区标题' },
  ...[0, 1, 2, 3, 4, 5].map(index => ({ path: `features.catering.items.${index}`, label: `外餐服务项目 ${index + 1}` })),
  { path: 'features.catering.menuButton', label: '外餐菜单按钮' },
  { path: 'features.catering.button', label: '外餐 WhatsApp 按钮' },
  { path: 'features.styling.label', label: '布置区小标' },
  { path: 'features.styling.title', label: '布置区标题' },
  ...[0, 1, 2, 3, 4, 5].map(index => ({ path: `features.styling.items.${index}`, label: `布置服务项目 ${index + 1}` })),
  { path: 'features.styling.button', label: '布置按钮' },
  { path: 'referral.title', label: '推荐奖励标题' },
  { path: 'referral.desc', label: '推荐奖励说明', multiline: true },
  ...[0, 1, 2].flatMap(index => [
    { path: `referral.cards.${index}.title`, label: `推荐卡 ${index + 1} 标题` },
    { path: `referral.cards.${index}.desc`, label: `推荐卡 ${index + 1} 说明`, multiline: true }
  ]),
  { path: 'referral.noteStrong', label: '推荐规则开头' },
  { path: 'referral.note', label: '推荐规则说明', multiline: true },
  ...[0, 1, 2].map(index => ({ path: `referral.terms.${index}`, label: `推荐条款 ${index + 1}`, multiline: true })),
  { path: 'faq.title', label: 'FAQ 标题' },
  ...[0, 1, 2, 3, 4, 5].flatMap(index => [
    { path: `faq.items.${index}.0`, label: `FAQ ${index + 1} 问题` },
    { path: `faq.items.${index}.1`, label: `FAQ ${index + 1} 答案`, multiline: true }
  ]),
  { path: 'cta.title', label: '最终 CTA 标题' },
  { path: 'cta.slogan', label: '最终 CTA Slogan' },
  { path: 'cta.button', label: '最终 CTA 按钮' }
];

let supabaseInquiriesCache = [];
let supabaseFetchInProgress = false;
let supabaseProfilesCache = [];
let supabaseRewardsCache = [];
let supabaseMembersFetchInProgress = false;
let supabaseRuntimeConfig = { ...(window.NP90_SUPABASE || {}) };

const translations = {
  zh: {
    htmlLang: 'zh-Hans',
    title: '九零食刻 90 PROJECT｜包伙食 · 外餐 · 活动餐饮 · 布置设计',
    description: '九零食刻 90 PROJECT - 包伙食、外餐、活动餐饮、布置设计。高级餐饮品牌服务，日常价格享受。',
    nav: {
      home: '首页',
      meal: '包伙食',
      catering: '外餐服务',
      styling: '活动布置',
      faq: 'FAQ',
      referral: '推荐奖励',
      whatsapp: 'WhatsApp 询问',
      mobileWhatsApp: '☏ WhatsApp 下单',
      menu: '打开菜单',
      backTop: '返回顶部'
    },
    hero: {
      title: '九零食刻',
      eyebrow: '90 PROJECT',
      tags: '包伙食 · 外餐 · 活动餐饮 · 布置设计',
      slogan: '每一刻，都是美好食刻',
      sub: '高级餐饮品牌服务，日常价格享受。<br><em>Premium catering style, affordable daily meals.</em>',
      primary: '查看包伙食配套',
      secondary: 'WhatsApp 立即询问'
    },
    services: [
      { title: '餐饮', label: 'CATERING', desc: '专业外餐服务，多样美食选择，满足不同需求。' },
      { title: '包伙食', label: 'MEAL PLAN', desc: '每月包伙食计划，营养均衡，每天新鲜现煮。' },
      { title: '活动策划', label: 'EVENT', desc: '生日、公司、节庆、婚礼等活动餐饮一站式服务。' },
      { title: '布置设计', label: 'STYLING', desc: '餐桌布置、背景设计、花艺搭配，让活动更有氛围。' }
    ],
    mealPlan: {
      title: '包伙食配套',
      desc: '适合上班族、学生、家庭与长期订餐顾客。'
    },
    prices: [
      {
        title: '标准包伙食',
        priceHtml: 'RM<span>300</span><small>/ 月</small>',
        muted: '20 餐 · 平均 RM15 / 餐',
        line: '1 主菜 + 1 配菜 + 白饭',
        small: '适合上班族 / 学生 / 简单日常餐',
        button: '选择这个配套'
      },
      {
        title: '丰富包伙食',
        priceHtml: 'RM<span>380</span><small>/ 月</small>',
        muted: '20 餐 · 平均 RM19 / 餐',
        line: '1 主菜 + 2 配菜 + 白饭',
        small: '适合吃得比较饱 / 想要更丰富的人',
        button: '选择这个配套'
      },
      {
        title: '家庭配套',
        priceHtml: '价格<br><span>WhatsApp</span><small>询问</small>',
        muted: '2人 / 3人 / 4人',
        line: '家庭式每日餐，可商量菜色，可长期安排。',
        small: '',
        button: 'WhatsApp 询问'
      }
    ],
    referral: {
      title: '推荐朋友奖励',
      desc: '分享九零食刻给朋友，朋友下单时填入你的推荐码，完成消费后即可获得会员回馈。',
      cards: [
        { title: 'TnG RM20 / 下次抵扣', desc: '朋友首次成功购买服务后，推荐人可获得 RM20 奖励，可作为下次购买服务抵扣。' },
        { title: '多层推荐回馈', desc: '一级推荐记录 1% 会员回馈；如形成上级推荐链，可按活动规则继续记录多层待确认回馈。' },
        { title: '会员推荐码', desc: '登录会员中心即可查看自己的推荐码。朋友 WhatsApp 下单时填入推荐码，我们会协助登记。' }
      ],
      noteStrong: '透明规则：',
      note: '推荐奖励开放多层记录，奖励属于下次服务抵扣，不可兑换现金或转让；各层回馈只按已确认实付消费额计算。',
      terms: [
        '朋友首次成功消费后，RM20 会记录为下次服务抵扣。',
        '一级推荐按已确认实付消费额记录 1% 回馈；上级推荐链可按活动规则记录多层回馈。',
        '最终以管理员审核、付款记录与 WhatsApp 确认为准；九零食刻保留调整活动条款的权利。'
      ]
    },
    weekly: {
      title: '每周菜单示例',
      label: 'WEEKLY MENU',
      days: [
        ['星期一', '酱油鸡 + 炒青菜 + 白饭'],
        ['星期二', '咖喱鸡 + 豆腐 + 白饭'],
        ['星期三', '香煎鱼 + 炒时蔬 + 白饭'],
        ['星期四', '姜葱鸡 + 荷包蛋 + 白饭'],
        ['星期五', '炸鸡扒 + 清炒菜心 + 白饭']
      ],
      note: '每周菜单轮换，实际菜色会根据当天新鲜食材调整。<br>Weekly menu changes based on fresh ingredients.'
    },
    addons: {
      title: '自由加购',
      label: 'ADD-ONS',
      priceHtml: '可询问<br>Ask us',
      list: [
        { label: '加蛋', en: 'Add Egg', value: '加蛋 Add Egg' },
        { label: '加肉', en: 'Extra Meat', value: '加肉 Extra Meat' },
        { label: '加汤', en: 'Soup', value: '加汤 Soup' },
        { label: '加菜', en: 'Extra Veg', value: '加菜 Extra Veg' },
        { label: '饮料', en: 'Drink', value: '饮料 Drink' }
      ]
    },
    order: {
      title: 'WhatsApp 下单系统',
      label: 'ORDER FORM',
      fields: {
        name: '姓名 Name',
        phone: '电话 Phone',
        package: '配套 Package',
        pax: '人数 Pax',
        meal: '餐期 Meal',
        date: '开始日期 Start Date',
        area: '配送区域 Delivery Area',
        referralCode: '推荐码 Referral Code',
        addons: '加购 Add-ons',
        notes: '备注 Notes'
      },
      placeholders: {
        name: '请输入姓名',
        phone: '请输入电话',
        pax: '请输入人数',
        area: '请输入配送地区',
        referralCode: '朋友推荐可填写，例如 NP90-XXXX',
        notes: '其他要求 / 不要辣 / 不要某种食材'
      },
      packageOptions: [
        { label: '标准包伙食 RM300/月', value: '标准包伙食 RM300/月' },
        { label: '丰富包伙食 RM380/月', value: '丰富包伙食 RM380/月' },
        { label: '家庭配套 WhatsApp 询问', value: '家庭配套 WhatsApp 询问' },
        { label: '活动餐饮 Catering', value: '活动餐饮 Catering' }
      ],
      mealOptions: [
        { label: '午餐 Lunch', value: '午餐 Lunch' },
        { label: '晚餐 Dinner', value: '晚餐 Dinner' },
        { label: '午餐 + 晚餐', value: '午餐 + 晚餐 Lunch + Dinner' }
      ],
      submit: 'WhatsApp 确认订单',
      none: '无',
      previewLabel: 'WHATSAPP 预览',
      previewEmpty: '填写资料后，这里会显示即将发送到 WhatsApp 的订单内容。',
      copyPreview: '复制内容',
      copiedPreview: '已复制'
    },
    features: {
      catering: {
        label: 'CATERING SERVICE',
        title: '外餐 Catering 服务',
        items: ['生日聚会 Birthday', '公司聚餐 Company Meal', '家庭聚会 Family Gathering', '开张活动 Grand Opening', '佛教会 / 社团活动', '小型 Buffet / Custom Catering'],
        menuButton: '菜单选择 / 计算价格',
        button: 'WhatsApp 询问活动餐饮'
      },
      styling: {
        label: 'EVENT & STYLING',
        title: '活动布置 / Styling',
        items: ['餐桌布置', '背景布置', '简单花艺', '餐饮展示台', '拍照氛围', 'Mocktail / Beverage Bar'],
        button: '查看布置案例'
      }
    },
    faq: {
      title: '常见问题 FAQ',
      items: [
        ['RM300 是多少餐？', 'RM300 是 20 餐，平均 RM15 / 餐。'],
        ['可以选午餐还是晚餐吗？', '可以，可在下单表单选择午餐或晚餐。'],
        ['可以指定不要辣吗？', '可以，在备注写明不要辣或不要某些食材。'],
        ['可以家庭订餐吗？', '可以，2人、3人、4人家庭配套可 WhatsApp 询问。'],
        ['配送范围怎么算？', '请填写配送区域，我们会在 WhatsApp 确认是否可送与费用。'],
        ['活动餐饮需要提前几天订？', '建议至少提前 3 至 7 天，人数越多越早确认比较好。']
      ]
    },
    cta: {
      title: '九零食刻 90 PROJECT',
      slogan: '每一刻，都是美好食刻',
      button: 'WhatsApp 立即询问'
    },
    member: {
      loginButton: '会员登录',
      centerButton: '会员中心',
      title: '九零食刻会员中心',
      intro: '登录后，下单询问会自动保存到本机会员记录，方便你之后查看包伙食配套、日期和备注。',
      loginTab: '会员登录',
      registerTab: '注册会员',
      password: '密码 Password',
      loginSubmit: '登录会员',
      createSubmit: '创建会员',
      name: '姓名 Name',
      phone: '电话 Phone',
      logout: '退出',
      dashboardTitle: '会员中心',
      benefits: [
        ['询问记录', '自动保存本机订单询问'],
        ['推荐 RM20', '朋友成功消费后可得下次抵扣'],
        ['多层回馈', '上级推荐链待确认奖励']
      ],
      referralIntro: '把推荐码发给朋友。朋友下单时填入推荐码，完成消费后你可获得 RM20 抵扣与多层会员回馈记录。',
      copyCode: '复制推荐码',
      shareCode: 'WhatsApp 分享',
      rewardsTitle: '我的推荐奖励',
      clearRewards: '清空奖励',
      recordsTitle: '我的包伙食询问',
      clearRecords: '清空记录',
      emptyRecords: '还没有询问记录。登录后提交 WhatsApp 订单，记录会保存在这里。',
      emptyRewards: '还没有推荐奖励记录。朋友下单时填写你的推荐码后，会先记录为待确认奖励。',
      messages: {
        required: '请填写完整资料，密码至少 6 个字符。',
        duplicate: '这个 Email 已经注册，请直接登录。',
        registerSuccess: '注册成功，已进入会员中心。',
        loginError: 'Email 或密码不正确。',
        loginSuccess: '登录成功。',
        copied: '推荐码已复制，可以发给朋友。',
        copyFail: '复制失败，请手动复制推荐码。'
      }
    }
  },
  en: {
    htmlLang: 'en',
    title: '90 PROJECT | Meal Plans, Catering, Event Food & Styling',
    description: '90 PROJECT provides monthly meal plans, catering, event food service and styling with a premium black-gold food brand experience.',
    nav: {
      home: 'Home',
      meal: 'Meal Plans',
      catering: 'Catering',
      styling: 'Event Styling',
      faq: 'FAQ',
      referral: 'Referral',
      whatsapp: 'WhatsApp Us',
      mobileWhatsApp: '☏ WhatsApp Order',
      menu: 'Open menu',
      backTop: 'Back to top'
    },
    hero: {
      title: '90 PROJECT',
      eyebrow: 'FOOD · CATERING · EVENT · STYLING',
      tags: 'Meal Plans · Catering · Event Food · Styling',
      slogan: 'Every moment deserves a good meal',
      sub: 'Premium catering style, affordable daily meals.<br><em>Meal plans, event catering and branded food presentation.</em>',
      primary: 'View Meal Plans',
      secondary: 'WhatsApp Now'
    },
    services: [
      { title: 'Catering', label: '餐饮', desc: 'Professional catering service with flexible menus for different event needs.' },
      { title: 'Meal Plan', label: '包伙食', desc: 'Monthly meal plans with balanced portions, fresh cooking and practical daily pricing.' },
      { title: 'Event', label: '活动策划', desc: 'Food service support for birthdays, company meals, celebrations, weddings and gatherings.' },
      { title: 'Styling', label: '布置设计', desc: 'Table styling, backdrop design and simple floral touches for a warmer event atmosphere.' }
    ],
    mealPlan: {
      title: 'Meal Plan Packages',
      desc: 'Suitable for working adults, students, families and long-term meal arrangements.'
    },
    prices: [
      {
        title: 'Standard Meal Plan',
        priceHtml: 'RM<span>300</span><small>/ month</small>',
        muted: '20 meals · Average RM15 / meal',
        line: '1 main dish + 1 side dish + rice',
        small: 'Best for working adults, students and simple daily meals',
        button: 'Choose this package'
      },
      {
        title: 'Rich Meal Plan',
        priceHtml: 'RM<span>380</span><small>/ month</small>',
        muted: '20 meals · Average RM19 / meal',
        line: '1 main dish + 2 side dishes + rice',
        small: 'Best for customers who prefer fuller, more generous meals',
        button: 'Choose this package'
      },
      {
        title: 'Family Package',
        priceHtml: 'Price<br><span>WhatsApp</span><small>to ask</small>',
        muted: '2 pax / 3 pax / 4 pax',
        line: 'Family-style daily meals with flexible menu arrangements for long-term orders.',
        small: '',
        button: 'Ask on WhatsApp'
      }
    ],
    referral: {
      title: 'Refer A Friend Rewards',
      desc: 'Share 90 PROJECT with friends. When they order with your referral code, your member reward will be recorded after their purchase is confirmed.',
      cards: [
        { title: 'TnG RM20 / next-order credit', desc: 'After your friend completes their first purchase, you can receive RM20 credit for your next service order.' },
        { title: 'Multi-level referral reward', desc: 'Level 1 records 1% member reward. If an upline referral chain exists, upper levels may also record pending campaign rewards.' },
        { title: 'Member referral code', desc: 'Log in to your member centre to view your referral code. Your friend can enter it when ordering through WhatsApp.' }
      ],
      noteStrong: 'Clear rule:',
      note: 'Multi-level referral records are available as next-order service credits only. Rewards are not cash or transferable balance.',
      terms: [
        'RM20 is recorded as next-order credit after the friend completes a first purchase.',
        'Level 1 referral records 1% from confirmed paid spending. Upper referral levels may be recorded according to campaign rules.',
        'Final approval depends on admin review, payment records and WhatsApp confirmation. 90 PROJECT may adjust campaign terms when needed.'
      ]
    },
    weekly: {
      title: 'Weekly Menu Example',
      label: 'WEEKLY MENU',
      days: [
        ['Monday', 'Soy Sauce Chicken + Stir-fried Greens + Rice'],
        ['Tuesday', 'Curry Chicken + Tofu + Rice'],
        ['Wednesday', 'Pan-seared Fish + Seasonal Vegetables + Rice'],
        ['Thursday', 'Ginger Onion Chicken + Fried Egg + Rice'],
        ['Friday', 'Fried Chicken Chop + Choy Sum + Rice']
      ],
      note: 'Weekly menus rotate and may change based on fresh ingredients available for the day.'
    },
    addons: {
      title: 'Add-ons',
      label: 'ADD-ONS',
      priceHtml: 'Ask us',
      list: [
        { label: 'Add Egg', en: '', value: 'Add Egg' },
        { label: 'Extra Meat', en: '', value: 'Extra Meat' },
        { label: 'Soup', en: '', value: 'Soup' },
        { label: 'Extra Veg', en: '', value: 'Extra Veg' },
        { label: 'Drink', en: '', value: 'Drink' }
      ]
    },
    order: {
      title: 'WhatsApp Order Form',
      label: 'ORDER FORM',
      fields: {
        name: 'Name',
        phone: 'Phone',
        package: 'Package',
        pax: 'Pax',
        meal: 'Meal',
        date: 'Start Date',
        area: 'Delivery Area',
        referralCode: 'Referral Code',
        addons: 'Add-ons',
        notes: 'Notes'
      },
      placeholders: {
        name: 'Enter your name',
        phone: 'Enter your phone number',
        pax: 'Enter pax',
        area: 'Enter delivery area',
        referralCode: 'Optional, e.g. NP90-XXXX',
        notes: 'Other requests / no spicy / ingredients to avoid'
      },
      packageOptions: [
        { label: 'Standard Meal Plan RM300/month', value: 'Standard Meal Plan RM300/month' },
        { label: 'Rich Meal Plan RM380/month', value: 'Rich Meal Plan RM380/month' },
        { label: 'Family Package - Ask on WhatsApp', value: 'Family Package - Ask on WhatsApp' },
        { label: 'Event Catering', value: 'Event Catering' }
      ],
      mealOptions: [
        { label: 'Lunch', value: 'Lunch' },
        { label: 'Dinner', value: 'Dinner' },
        { label: 'Lunch + Dinner', value: 'Lunch + Dinner' }
      ],
      submit: 'Confirm on WhatsApp',
      none: 'None',
      previewLabel: 'WHATSAPP PREVIEW',
      previewEmpty: 'Complete the form and your WhatsApp order message will appear here.',
      copyPreview: 'Copy message',
      copiedPreview: 'Copied'
    },
    features: {
      catering: {
        label: 'CATERING SERVICE',
        title: 'Catering Service',
        items: ['Birthday Party', 'Company Meal', 'Family Gathering', 'Grand Opening', 'Association Event', 'Small Buffet / Custom Catering'],
        menuButton: 'Menu & Price Calculator',
        button: 'Ask About Catering'
      },
      styling: {
        label: 'EVENT & STYLING',
        title: 'Event Styling',
        items: ['Table styling', 'Backdrop setup', 'Simple floral styling', 'Food display table', 'Photo-friendly ambience', 'Mocktail / Beverage Bar'],
        button: 'View Styling Options'
      }
    },
    faq: {
      title: 'FAQ',
      items: [
        ['How many meals are included in RM300?', 'RM300 includes 20 meals, averaging RM15 per meal.'],
        ['Can I choose lunch or dinner?', 'Yes. You can choose lunch, dinner, or lunch + dinner in the order form.'],
        ['Can I request non-spicy meals?', 'Yes. Please mention non-spicy or any ingredients to avoid in the notes.'],
        ['Can I order for a family?', 'Yes. Family packages for 2, 3 or 4 pax can be discussed on WhatsApp.'],
        ['How is delivery coverage calculated?', 'Please provide your delivery area. We will confirm availability and delivery charges on WhatsApp.'],
        ['How early should I book catering?', 'We recommend booking 3 to 7 days in advance. Larger events should be confirmed earlier.']
      ]
    },
    cta: {
      title: '90 PROJECT',
      slogan: 'Every moment deserves a good meal',
      button: 'WhatsApp Now'
    },
    member: {
      loginButton: 'Member Login',
      centerButton: 'Member Centre',
      title: '90 PROJECT Member Centre',
      intro: 'After login, your WhatsApp inquiries are saved locally on this device so you can review packages, dates and notes later.',
      loginTab: 'Login',
      registerTab: 'Register',
      password: 'Password',
      loginSubmit: 'Login',
      createSubmit: 'Create Member',
      name: 'Name',
      phone: 'Phone',
      logout: 'Logout',
      dashboardTitle: 'Member Centre',
      benefits: [
        ['Inquiry Records', 'Save order inquiries on this device'],
        ['RM20 Referral', 'Credit after your friend completes a purchase'],
        ['Multi-level Reward', 'Pending rewards from referral chain spending']
      ],
      referralIntro: 'Share your referral code with friends. When they order with your code, you may receive RM20 credit and multi-level member reward records.',
      copyCode: 'Copy Code',
      shareCode: 'Share on WhatsApp',
      rewardsTitle: 'My Referral Rewards',
      clearRewards: 'Clear Rewards',
      recordsTitle: 'My Meal Plan Inquiries',
      clearRecords: 'Clear Records',
      emptyRecords: 'No inquiry records yet. Submit a WhatsApp order after login and it will be saved here.',
      emptyRewards: 'No referral rewards yet. When a friend orders with your code, the reward will be recorded as pending.',
      messages: {
        required: 'Please complete all details. Password must be at least 6 characters.',
        duplicate: 'This email is already registered. Please log in directly.',
        registerSuccess: 'Registration successful. You are now in the member centre.',
        loginError: 'Email or password is incorrect.',
        loginSuccess: 'Login successful.',
        copied: 'Referral code copied. You can send it to your friend.',
        copyFail: 'Unable to copy. Please copy the referral code manually.'
      }
    }
  }
};

let currentLanguage = localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'zh';

function getById(id) {
  return document.getElementById(id);
}

function fieldValue(id) {
  return getById(id)?.value?.trim() || '';
}

function displayValue(value) {
  return value && value.trim ? value.trim() : value || '-';
}

function formatCurrency(value) {
  return `RM${Number(value || 0).toLocaleString('en-MY', {
    minimumFractionDigits: Number(value || 0) % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  })}`;
}

function renderCateringMenu() {
  if (!cateringMenuGrid) return;
  const cateringMenu = editableCateringConfig().menu;

  cateringMenuGrid.innerHTML = cateringMenu.map(category => `
    <article class="menu-category" data-catering-category="${escapeHtml(category.id)}">
      <div class="menu-category-head">
        <div>
          <span>${escapeHtml(category.label)}</span>
          <h3>${escapeHtml(category.title)}</h3>
        </div>
        <b>${category.rate ? `${formatCurrency(category.rate)} / pax` : '搭配'}</b>
      </div>
      <div class="menu-options">
        ${category.items.map(item => `
          <label class="menu-option">
            <input type="checkbox" data-menu-category="${escapeHtml(category.id)}" data-menu-title="${escapeHtml(category.title)}" data-menu-rate="${category.rate}" value="${escapeHtml(item)}">
            <span>${escapeHtml(item)}</span>
          </label>
        `).join('')}
      </div>
    </article>
  `).join('');
}

function selectedCateringItems() {
  return Array.from(cateringMenuGrid?.querySelectorAll('input[type="checkbox"]:checked') || []).map(input => ({
    name: input.value,
    categoryId: input.dataset.menuCategory || '',
    categoryTitle: input.dataset.menuTitle || '',
    rate: Number.parseFloat(input.dataset.menuRate || '0') || 0
  }));
}

function groupedCateringItems(items) {
  return items.reduce((groups, item) => {
    if (!groups[item.categoryTitle]) groups[item.categoryTitle] = [];
    groups[item.categoryTitle].push(item);
    return groups;
  }, {});
}

function calculateCateringEstimate() {
  const pax = Math.max(Number.parseInt(cateringPax?.value || '0', 10) || 0, 0);
  const service = CATERING_SERVICE_STYLES[cateringServiceStyle?.value] || CATERING_SERVICE_STYLES.packed;
  const items = selectedCateringItems();
  const pricedItems = items.filter(item => item.rate > 0);
  const perPax = pricedItems.reduce((sum, item) => sum + item.rate, 0);
  const subtotal = pax && perPax ? pax * perPax * service.multiplier : 0;
  const minimumTotal = editableCateringConfig().minimumTotal || CATERING_MINIMUM_TOTAL;
  const total = subtotal ? Math.max(subtotal, minimumTotal) : 0;

  return {
    pax,
    service,
    items,
    pricedItems,
    perPax,
    subtotal,
    total,
    minimumTotal
  };
}

function buildCateringMessage(estimate) {
  const grouped = groupedCateringItems(estimate.items);
  const menuLines = Object.entries(grouped).map(([category, items]) => (
    `${category}：${items.map(item => item.name).join('、')}`
  )).join('\n') || '还没有选择菜式';

  return `你好，我想询问九零食刻 90 PROJECT 外餐菜单。

【人数】
${estimate.pax || '-'} pax

【服务形式】
${estimate.service.label}

【选择菜单】
${menuLines}

【系统初步预算】
每人约：${formatCurrency(estimate.perPax)}
总预算约：${estimate.total ? formatCurrency(estimate.total) : '-'}
最低预算：${formatCurrency(estimate.minimumTotal)}

请帮我确认实际报价、配送、餐具和现场服务安排。`;
}

function renderCateringEstimate() {
  if (!cateringEstimateTotal || !cateringEstimateMeta || !selectedCateringSummary || !cateringWhatsApp) return;

  const estimate = calculateCateringEstimate();
  cateringEstimateTotal.textContent = estimate.total ? formatCurrency(estimate.total) : 'RM0';
  cateringEstimateMeta.textContent = estimate.total
    ? `${estimate.pax} pax · 每人约 ${formatCurrency(estimate.perPax)} · ${estimate.service.label}`
    : '请选择菜式开始计算。';

  if (!estimate.items.length) {
    selectedCateringSummary.textContent = '还没有选择菜式。';
  } else {
    const grouped = groupedCateringItems(estimate.items);
    selectedCateringSummary.innerHTML = Object.entries(grouped).map(([category, items]) => (
      `<p><b>${escapeHtml(category)}</b>：${items.map(item => escapeHtml(item.name)).join('、')}</p>`
    )).join('');
  }

  cateringWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildCateringMessage(estimate))}`;
}

function supabaseUrl() {
  return String(supabaseRuntimeConfig.url || '').replace(/\/+$/, '');
}

function supabaseAnonKey() {
  return String(supabaseRuntimeConfig.anonKey || '');
}

async function fetchSupabaseConfig(path) {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) return null;
    const config = await response.json();
    return config && typeof config === 'object' ? config : null;
  } catch (error) {
    return null;
  }
}

async function loadSupabaseRuntimeConfig() {
  const apiConfig = await fetchSupabaseConfig('/api/supabase-config');
  if (apiConfig?.url && apiConfig?.anonKey) {
    supabaseRuntimeConfig = { ...supabaseRuntimeConfig, ...apiConfig };
    return;
  }

  const jsonConfig = await fetchSupabaseConfig('js/supabase-config.json?v=20260629-supabase');
  if (jsonConfig) supabaseRuntimeConfig = { ...supabaseRuntimeConfig, ...jsonConfig };
}

function isSupabaseConfigured() {
  const url = supabaseUrl();
  const key = supabaseAnonKey();
  return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)
    && key.length > 30
    && !url.includes('your-project')
    && !key.includes('your-anon-key');
}

function getSupabaseSession() {
  try {
    return JSON.parse(localStorage.getItem(SUPABASE_SESSION_KEY) || 'null');
  } catch (error) {
    return null;
  }
}

function setSupabaseSession(session) {
  if (session?.access_token) {
    localStorage.setItem(SUPABASE_SESSION_KEY, JSON.stringify({
      access_token: session.access_token,
      refresh_token: session.refresh_token || null,
      user: session.user || null,
      expires_at: session.expires_at || null
    }));
    return;
  }

  localStorage.removeItem(SUPABASE_SESSION_KEY);
}

function getSupabaseMemberSession() {
  try {
    return JSON.parse(localStorage.getItem(SUPABASE_MEMBER_SESSION_KEY) || 'null');
  } catch (error) {
    return null;
  }
}

function setSupabaseMemberSession(session) {
  if (session?.access_token) {
    localStorage.setItem(SUPABASE_MEMBER_SESSION_KEY, JSON.stringify({
      access_token: session.access_token,
      refresh_token: session.refresh_token || null,
      user: session.user || null,
      expires_at: session.expires_at || null
    }));
    return;
  }

  localStorage.removeItem(SUPABASE_MEMBER_SESSION_KEY);
}

function supabaseAuthToken() {
  return getSupabaseSession()?.access_token || supabaseAnonKey();
}

async function supabaseFetch(path, options = {}) {
  if (!isSupabaseConfigured()) return null;

  const headers = {
    apikey: supabaseAnonKey(),
    Authorization: `Bearer ${options.token || supabaseAuthToken()}`,
    Accept: 'application/json',
    ...options.headers
  };

  if (options.body) headers['Content-Type'] = 'application/json';

  const response = await fetch(`${supabaseUrl()}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function supabaseAdminSignIn(email, password) {
  if (!isSupabaseConfigured()) return { ok: false, skipped: true };

  const response = await fetch(`${supabaseUrl()}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) return { ok: false };

  const session = await response.json();
  const userId = session?.user?.id;
  if (!session?.access_token || !userId) return { ok: false };

  const profiles = await supabaseFetch(
    `/rest/v1/profiles?select=role,status&user_id=eq.${encodeURIComponent(userId)}&limit=1`,
    { token: session.access_token }
  );
  const profile = profiles?.[0];
  const isAdmin = profile?.status !== 'inactive' && ['admin', 'super_admin'].includes(profile?.role);

  if (!isAdmin) {
    setSupabaseSession(null);
    return { ok: false, notAdmin: true };
  }

  setSupabaseSession(session);
  return { ok: true };
}

async function supabaseMemberSignUp({ name, phone, email, password, referralCode, referredByCode }) {
  if (!isSupabaseConfigured()) return { ok: false, skipped: true };

  const response = await fetch(`${supabaseUrl()}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      data: {
        full_name: name,
        phone,
        referral_code: referralCode,
        referred_by_code: referredByCode || null
      }
    })
  });

  if (!response.ok) {
    const message = await response.text();
    return { ok: false, message };
  }

  const payload = await response.json();
  const session = payload?.session || payload;
  if (session?.access_token) setSupabaseMemberSession(session);
  return { ok: true, session: session?.access_token ? session : null, user: payload?.user || session?.user || null };
}

async function supabaseMemberSignIn(email, password) {
  if (!isSupabaseConfigured()) return { ok: false, skipped: true };

  const response = await fetch(`${supabaseUrl()}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) return { ok: false };

  const session = await response.json();
  if (!session?.access_token) return { ok: false };
  setSupabaseMemberSession(session);
  return { ok: true, session };
}

async function loadSupabaseMemberProfile(session = getSupabaseMemberSession()) {
  const userId = session?.user?.id;
  if (!userId || !session?.access_token) return null;

  const rows = await supabaseFetch(
    `/rest/v1/profiles?select=*&user_id=eq.${encodeURIComponent(userId)}&limit=1`,
    { token: session.access_token }
  );
  return rows?.[0] || null;
}

async function updateSupabaseMemberProfile(member, session = getSupabaseMemberSession()) {
  const userId = session?.user?.id;
  if (!userId || !session?.access_token || !member) return false;

  await supabaseFetch(`/rest/v1/profiles?user_id=eq.${encodeURIComponent(userId)}`, {
    method: 'PATCH',
    token: session.access_token,
    headers: { Prefer: 'return=minimal' },
    body: {
      full_name: member.name || '',
      phone: member.phone || '',
      referral_code: normalizeReferralCode(member.referralCode),
      referred_by_code: normalizeReferralCode(member.referredByCode) || null
    }
  });
  return true;
}

function mergeSupabaseProfileToLocalMember(profile, session, fallback = {}) {
  const email = String(session?.user?.email || fallback.email || '').toLowerCase();
  if (!email) return null;

  const members = loadMembers();
  let member = members.find(item => item.email === email);
  if (!member) {
    member = {
      name: fallback.name || profile?.full_name || email.split('@')[0],
      phone: fallback.phone || profile?.phone || '',
      email,
      password: fallback.password || '',
      referralCode: normalizeReferralCode(profile?.referral_code) || createReferralCode(fallback.name || profile?.full_name, email),
      referralRewards: [],
      records: [],
      createdAt: new Date().toISOString()
    };
    members.push(member);
  }

  member.name = profile?.full_name || fallback.name || member.name || '';
  member.phone = profile?.phone || fallback.phone || member.phone || '';
  member.referralCode = normalizeReferralCode(profile?.referral_code || member.referralCode) || createReferralCode(member.name, email);
  member.referredByCode = normalizeReferralCode(profile?.referred_by_code || member.referredByCode || fallback.referredByCode);
  member.supabaseUserId = session?.user?.id || member.supabaseUserId;
  member.cloudSyncedAt = new Date().toISOString();
  saveMembers(members);
  setCurrentMember(email);
  return member;
}

function cloudRewardToLocalReward(row) {
  return {
    cloudId: row.id,
    createdAt: row.created_at || new Date().toISOString(),
    referredName: row.referred_name || (currentLanguage === 'en' ? 'Friend referral inquiry' : '朋友推荐询问'),
    package: row.package_label || '-',
    level: row.level || 1,
    fixedCredit: row.fixed_credit ? Number(row.fixed_credit) : 0,
    ratePercent: row.rate_percent ? Number(row.rate_percent) : 0,
    status: row.status || 'pending',
    source: 'supabase'
  };
}

function mergeUniqueById(existing, incoming, keyName) {
  const seen = new Set();
  return [...incoming, ...existing].filter(item => {
    const key = item?.[keyName] || item?.id || item?.createdAt;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function refreshSupabaseMemberData() {
  const session = getSupabaseMemberSession();
  const userId = session?.user?.id;
  const email = String(session?.user?.email || currentMemberEmail() || '').toLowerCase();
  if (!isSupabaseConfigured() || !session?.access_token || !userId || !email) return;

  try {
    const [profile, inquiryRows, rewardRows] = await Promise.all([
      loadSupabaseMemberProfile(session),
      supabaseFetch(
        `/rest/v1/inquiries?select=*&user_id=eq.${encodeURIComponent(userId)}&order=created_at.desc&limit=30`,
        { token: session.access_token }
      ),
      supabaseFetch(
        `/rest/v1/referral_rewards?select=*&referrer_user_id=eq.${encodeURIComponent(userId)}&order=created_at.desc&limit=40`,
        { token: session.access_token }
      )
    ]);

    mergeSupabaseProfileToLocalMember(profile, session, { email });
    const members = loadMembers();
    const member = members.find(item => item.email === email);
    if (!member) return;

    const cloudRecords = (Array.isArray(inquiryRows) ? inquiryRows : []).map(supabaseRowToInquiry);
    member.records = mergeUniqueById(member.records || [], cloudRecords, 'supabaseId').slice(0, 30);
    const cloudRewards = (Array.isArray(rewardRows) ? rewardRows : []).map(cloudRewardToLocalReward);
    member.referralRewards = mergeUniqueById(member.referralRewards || [], cloudRewards, 'cloudId').slice(0, 40);
    member.cloudSyncedAt = new Date().toISOString();
    saveMembers(members);
    renderMemberState();
  } catch (error) {
    console.warn('Supabase member refresh failed', error);
  }
}

async function createSupabaseReferralRewards(inquiryId, referralCode, token) {
  const code = normalizeReferralCode(referralCode);
  if (!inquiryId || !code || !token) return;

  try {
    await supabaseFetch('/rest/v1/rpc/create_referral_rewards_for_inquiry', {
      method: 'POST',
      token,
      headers: { Prefer: 'return=minimal' },
      body: {
        p_inquiry_id: inquiryId,
        p_referral_code: code
      }
    });
  } catch (error) {
    console.warn('Supabase referral reward creation failed', error);
  }
}

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function getPathValue(source, path) {
  return String(path || '').split('.').reduce((current, key) => {
    if (current == null) return undefined;
    return current[key];
  }, source);
}

function setPathValue(target, path, value) {
  const keys = String(path || '').split('.');
  let current = target;
  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;
    const nextKey = keys[index + 1];
    const shouldBeArray = /^\d+$/.test(nextKey || '');

    if (isLast) {
      current[key] = value;
      return;
    }

    if (current[key] == null) current[key] = shouldBeArray ? [] : {};
    current = current[key];
  });
}

function deepMerge(base, override) {
  if (Array.isArray(base)) {
    const source = Array.isArray(override) ? override : [];
    return base.map((item, index) => deepMerge(item, source[index]));
  }

  if (base && typeof base === 'object') {
    const result = { ...base };
    Object.keys(override || {}).forEach(key => {
      if (override[key] === undefined || override[key] === null) return;
      result[key] = deepMerge(base[key], override[key]);
    });
    return result;
  }

  return override === undefined || override === null || override === '' ? base : override;
}

function siteContentDefaults(language) {
  const source = translations[language] || translations.zh;
  const site = {};
  SITE_CONTENT_FIELDS.forEach(field => {
    setPathValue(site, field.path, getPathValue(source, field.path) ?? '');
  });
  return site;
}

function normalizeCateringMenu(menu) {
  const source = Array.isArray(menu) && menu.length ? menu : CATERING_MENU;
  return source.map((category, index) => ({
    id: String(category?.id || `category-${index + 1}`).trim(),
    title: String(category?.title || '').trim(),
    label: String(category?.label || '').trim(),
    rate: Number.parseFloat(category?.rate || 0) || 0,
    items: Array.isArray(category?.items)
      ? category.items.map(item => String(item || '').trim()).filter(Boolean)
      : String(category?.items || '').split(/\n+/).map(item => item.trim()).filter(Boolean)
  })).filter(category => category.title || category.label || category.items.length);
}

function defaultCateringContent() {
  return {
    minimumTotal: CATERING_MINIMUM_TOTAL,
    menu: normalizeCateringMenu(CATERING_MENU)
  };
}

function htmlToPlainText(value) {
  return String(value || '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
}

function formatMultiline(value) {
  return escapeHtml(String(value || '')).replace(/\n/g, '<br>');
}

const AUTO_TRANSLATION_PHRASES = [
  ['每周菜单轮换，实际菜色会根据当天新鲜食材调整。', 'Weekly menus rotate and may change based on fresh ingredients available for the day.'],
  ['每周菜单轮换', 'Weekly menus rotate'],
  ['实际菜色会根据当天新鲜食材调整', 'actual dishes may change based on fresh ingredients available for the day'],
  ['请帮我确认价格和配送安排，谢谢。', 'Please help confirm the price and delivery arrangement. Thank you.'],
  ['可询问', 'Ask us'],
  ['询问', 'Ask us'],
  ['星期一', 'Monday'],
  ['星期二', 'Tuesday'],
  ['星期三', 'Wednesday'],
  ['星期四', 'Thursday'],
  ['星期五', 'Friday'],
  ['星期六', 'Saturday'],
  ['星期日', 'Sunday'],
  ['星期天', 'Sunday'],
  ['周一', 'Monday'],
  ['周二', 'Tuesday'],
  ['周三', 'Wednesday'],
  ['周四', 'Thursday'],
  ['周五', 'Friday'],
  ['周六', 'Saturday'],
  ['周日', 'Sunday'],
  ['周天', 'Sunday'],
  ['腊肠炒饭', 'Chinese Sausage Fried Rice'],
  ['蛋炒饭', 'Egg Fried Rice'],
  ['扬州炒饭', 'Yangzhou Fried Rice'],
  ['炒米粉', 'Fried Mee Hoon'],
  ['福建面', 'Hokkien Mee'],
  ['皮蛋瘦肉粥', 'Century Egg Pork Porridge'],
  ['鸡丝粥', 'Shredded Chicken Porridge'],
  ['咖喱鸡', 'Curry Chicken'],
  ['酱油鸡', 'Soy Sauce Chicken'],
  ['Sambal 鸡', 'Sambal Chicken'],
  ['香料炸鸡', 'Spiced Fried Chicken'],
  ['咸蛋奶油鸡', 'Salted Egg Butter Chicken'],
  ['黑胡椒鸡扒', 'Black Pepper Chicken Chop'],
  ['蘑菇鸡扒', 'Mushroom Chicken Chop'],
  ['姜葱鸡', 'Ginger Onion Chicken'],
  ['炸鸡扒', 'Fried Chicken Chop'],
  ['Lemon Chicken', 'Lemon Chicken'],
  ['Sweet & Sour Chicken', 'Sweet & Sour Chicken'],
  ['Ginger Onion Chicken', 'Ginger Onion Chicken'],
  ['南乳炸肉', 'Nam Yue Fried Pork'],
  ['咸蛋奶油猪', 'Salted Egg Butter Pork'],
  ['糖醋肉', 'Sweet and Sour Pork'],
  ['咕噜肉', 'Sweet and Sour Pork'],
  ['姜葱肉片', 'Ginger Onion Pork Slices'],
  ['红烧肉', 'Braised Pork'],
  ['蒜香五花肉', 'Garlic Pork Belly'],
  ['宫保鱼片', 'Kung Pao Fish Fillet'],
  ['咸蛋奶油鱼', 'Salted Egg Butter Fish'],
  ['炸鱼柳', 'Fried Fish Fillet'],
  ['Sweet Sour Fish', 'Sweet Sour Fish'],
  ['黑椒鱼柳', 'Black Pepper Fish Fillet'],
  ['姜葱鱼片', 'Ginger Onion Fish Fillet'],
  ['酸辣鱼片', 'Hot and Sour Fish Fillet'],
  ['泰式柠檬鱼', 'Thai Lemon Fish'],
  ['香煎鱼', 'Pan-seared Fish'],
  ['椒盐虾', 'Salt and Pepper Prawns'],
  ['麦片虾', 'Cereal Prawns'],
  ['咸蛋奶油虾', 'Salted Egg Butter Prawns'],
  ['泰式豆腐', 'Thai-style Tofu'],
  ['红烧豆腐', 'Braised Tofu'],
  ['麻婆豆腐', 'Mapo Tofu'],
  ['家常豆腐', 'Homestyle Tofu'],
  ['番茄炒蛋', 'Tomato Egg'],
  ['蒸水蛋', 'Steamed Egg'],
  ['炒什锦菜', 'Stir-fried Mixed Vegetables'],
  ['干煸四季豆', 'Dry-fried French Beans'],
  ['娘惹阿杂', 'Nyonya Acar'],
  ['蒜蓉西兰花', 'Garlic Broccoli'],
  ['清炒小白菜', 'Stir-fried Bok Choy'],
  ['奶油杂菜', 'Creamy Mixed Vegetables'],
  ['蚝油生菜', 'Oyster Sauce Lettuce'],
  ['蒜蓉菠菜', 'Garlic Spinach'],
  ['炒高丽菜', 'Stir-fried Cabbage'],
  ['炒青菜', 'Stir-fried Greens'],
  ['炒时蔬', 'Seasonal Vegetables'],
  ['清炒菜心', 'Stir-fried Choy Sum'],
  ['荷包蛋', 'Fried Egg'],
  ['白饭', 'Rice'],
  ['豆腐', 'Tofu'],
  ['主食', 'Staple'],
  ['鸡肉类', 'Chicken'],
  ['猪肉类', 'Pork'],
  ['鱼类', 'Fish'],
  ['虾类', 'Prawns'],
  ['豆腐 / 蛋类', 'Tofu / Egg'],
  ['蔬菜类', 'Vegetables'],
  ['汤类', 'Soup'],
  ['清淡餐', 'Light Meal'],
  ['加蛋', 'Add Egg'],
  ['加肉', 'Extra Meat'],
  ['加汤', 'Soup'],
  ['加菜', 'Extra Veg'],
  ['饮料', 'Drink'],
  ['午餐', 'Lunch'],
  ['晚餐', 'Dinner'],
  ['不要辣', 'No spicy'],
  ['少辣', 'Less spicy'],
  ['不辣', 'No spicy'],
  ['清淡', 'Light taste'],
  ['少油', 'Less oil'],
  ['少盐', 'Less salt']
].sort((a, b) => b[0].length - a[0].length);

function dedupeLines(lines) {
  const seen = new Set();
  return lines.filter(line => {
    const key = line.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function autoTranslateLine(value) {
  let line = String(value || '').trim();
  if (!line) return '';
  if (!/[\u3400-\u9fff]/.test(line)) return line;

  AUTO_TRANSLATION_PHRASES.forEach(([source, target]) => {
    line = line.split(source).join(target);
  });

  return line
    .replace(/（/g, '(')
    .replace(/）/g, ')')
    .replace(/，/g, ', ')
    .replace(/。/g, '.')
    .replace(/、/g, ', ')
    .replace(/；/g, '; ')
    .replace(/：/g, ': ')
    .replace(/＋/g, ' + ')
    .replace(/\s*\+\s*/g, ' + ')
    .replace(/\s*\/\s*/g, ' / ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+\./g, '.')
    .trim();
}

function autoTranslateText(value) {
  const lines = String(value || '')
    .split(/\n+/)
    .map(autoTranslateLine)
    .filter(Boolean);
  return dedupeLines(lines).join('\n');
}

function defaultAdminContent() {
  return {
    zh: {
      site: siteContentDefaults('zh'),
      weekly: {
        days: translations.zh.weekly.days.map(([day, dish]) => ({ day, dish })),
        note: htmlToPlainText(translations.zh.weekly.note)
      },
      addons: translations.zh.addons.list.map(item => ({
        name: item.label,
        sub: item.en,
        price: htmlToPlainText(translations.zh.addons.priceHtml)
      }))
    },
    en: {
      site: siteContentDefaults('en'),
      weekly: {
        days: translations.en.weekly.days.map(([day, dish]) => ({ day, dish })),
        note: htmlToPlainText(translations.en.weekly.note)
      },
      addons: translations.en.addons.list.map(item => ({
        name: item.label,
        sub: '',
        price: htmlToPlainText(translations.en.addons.priceHtml)
      }))
    },
    catering: defaultCateringContent()
  };
}

function normalizeAdminContent(content) {
  const defaults = defaultAdminContent();
  const normalized = cloneData(defaults);

  ['zh', 'en'].forEach(language => {
    const source = content?.[language] || {};
    const siteSource = source.site || {};
    SITE_CONTENT_FIELDS.forEach(field => {
      const value = getPathValue(siteSource, field.path);
      if (value !== undefined && value !== null) {
        setPathValue(normalized[language].site, field.path, String(value));
      }
    });

    const weeklyDays = Array.isArray(source.weekly?.days) ? source.weekly.days : normalized[language].weekly.days;
    normalized[language].weekly.days = weeklyDays
      .map(item => ({
        day: String(item?.day || '').trim(),
        dish: String(item?.dish || '').trim()
      }))
      .filter(item => item.day || item.dish);
    normalized[language].weekly.note = String(source.weekly?.note ?? normalized[language].weekly.note);

    const addons = Array.isArray(source.addons) ? source.addons : normalized[language].addons;
    normalized[language].addons = addons
      .map(item => ({
        name: String(item?.name || item?.label || '').trim(),
        sub: String(item?.sub || item?.en || '').trim(),
        price: String(item?.price || '').trim()
      }))
      .filter(item => item.name || item.sub || item.price);
  });

  const cateringSource = content?.catering || {};
  normalized.catering = {
    minimumTotal: Math.max(Number.parseFloat(cateringSource.minimumTotal || normalized.catering.minimumTotal) || CATERING_MINIMUM_TOTAL, 0),
    menu: normalizeCateringMenu(cateringSource.menu || normalized.catering.menu)
  };

  return normalized;
}

function loadAdminContent() {
  try {
    return normalizeAdminContent(JSON.parse(localStorage.getItem(ADMIN_CONTENT_KEY) || 'null'));
  } catch (error) {
    return defaultAdminContent();
  }
}

function saveEditableContent(content) {
  localStorage.setItem(ADMIN_CONTENT_KEY, JSON.stringify(normalizeAdminContent(content)));
}

function parseRemoteAdminContent(value) {
  if (!value) return null;
  if (typeof value === 'object') return normalizeAdminContent(value);

  try {
    return normalizeAdminContent(JSON.parse(value));
  } catch (error) {
    console.warn('Supabase admin content is not valid JSON', error);
    return null;
  }
}

async function loadAdminContentFromSupabase() {
  if (!isSupabaseConfigured()) return false;

  try {
    const rows = await supabaseFetch(
      `/rest/v1/site_settings?select=value&key=eq.${encodeURIComponent(ADMIN_CONTENT_SETTING_KEY)}&limit=1`,
      { token: supabaseAnonKey() }
    );
    const content = parseRemoteAdminContent(rows?.[0]?.value);
    if (!content) return false;
    saveEditableContent(content);
    return true;
  } catch (error) {
    console.warn('Supabase admin content load failed', error);
    return false;
  }
}

async function saveAdminContentToSupabase(content) {
  if (!isSupabaseConfigured() || !getSupabaseSession()?.access_token) return false;

  await supabaseFetch(`/rest/v1/site_settings?on_conflict=key`, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: {
      key: ADMIN_CONTENT_SETTING_KEY,
      value: JSON.stringify(normalizeAdminContent(content))
    }
  });
  return true;
}

function editableContentForLanguage() {
  return loadAdminContent()[currentLanguage] || loadAdminContent().zh;
}

function editableCateringConfig() {
  return loadAdminContent().catering || defaultCateringContent();
}

function languageText() {
  const language = currentLanguage === 'en' ? 'en' : 'zh';
  const base = cloneData(translations[language] || translations.zh);
  const site = loadAdminContent()[language]?.site || {};
  return deepMerge(base, site);
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setHtml(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
}

function setMetaContent(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute('content', value);
}

function updateSeoMeta(t) {
  setMetaContent('meta[name="description"]', t.description);
  setMetaContent('meta[property="og:title"]', t.title);
  setMetaContent('meta[property="og:description"]', t.description);
  setMetaContent('meta[property="og:locale"]', currentLanguage === 'en' ? 'en_MY' : 'zh_MY');
  setMetaContent('meta[name="twitter:title"]', t.title);
  setMetaContent('meta[name="twitter:description"]', t.description);
}

function setPlaceholder(id, value) {
  const element = getById(id);
  if (element) element.placeholder = value;
}

function setFieldLabel(id, value) {
  const input = getById(id);
  const label = input?.closest('label');
  if (!label) return;
  const textNode = Array.from(label.childNodes).find(node => node.nodeType === 3 && node.textContent.trim());
  if (textNode) {
    textNode.textContent = value;
  } else {
    label.insertBefore(document.createTextNode(value), label.firstChild);
  }
}

function updateLanguageButtons() {
  document.querySelectorAll('[data-language-switch]').forEach(button => {
    const isActive = button.dataset.languageSwitch === currentLanguage;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function updateSelectOptions(id, options) {
  const select = getById(id);
  if (!select) return;
  const selectedIndex = select.selectedIndex >= 0 ? select.selectedIndex : 0;
  select.innerHTML = '';
  options.forEach(option => select.add(new Option(option.label, option.value)));
  select.selectedIndex = Math.min(selectedIndex, options.length - 1);
}

function addonName(addon) {
  return addon.name || addon.label || '';
}

function addonSub(addon) {
  return addon.sub || addon.en || '';
}

function addonValue(addon) {
  return addon.value || [addonName(addon), addonSub(addon)].filter(Boolean).join(' ');
}

function addonDisplay(addon) {
  const name = escapeHtml(addonName(addon));
  const sub = escapeHtml(addonSub(addon));
  return sub ? `${name} <em>${sub}</em>` : name;
}

function updateAddons(addons) {
  const addonList = document.querySelector('.addon-list');
  const selected = new Set(Array.from(form?.querySelectorAll('fieldset input[type="checkbox"]:checked') || []).map(input => input.value));

  if (addonList) {
    addonList.innerHTML = addons.map(addon => `
      <li><span>◎ ${addonDisplay(addon)}</span><b>${formatMultiline(addon.price || languageText().order.none)}</b></li>
    `).join('');
  }

  const fieldset = form?.querySelector('fieldset');
  if (!fieldset) return;
  fieldset.querySelectorAll('label').forEach(label => label.remove());
  addons.forEach(addon => {
    const value = addonValue(addon);
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = value;
    checkbox.checked = selected.has(value);
    label.append(checkbox, ` ${[addonName(addon), addonSub(addon)].filter(Boolean).join(' ')}`);
    fieldset.append(label);
  });
}

function updatePriceCards(t) {
  const cards = document.querySelectorAll('.price-card');
  cards.forEach((card, index) => {
    const price = t.prices[index];
    const packageOption = t.order.packageOptions[index];
    if (!price) return;

    card.querySelector('h3').textContent = price.title;
    card.querySelector('.price').innerHTML = price.priceHtml;
    card.querySelector('.muted').textContent = price.muted;

    const bodyParagraphs = card.querySelectorAll('.price-body p');
    if (bodyParagraphs[1]) bodyParagraphs[1].textContent = price.line;
    if (bodyParagraphs[2]) bodyParagraphs[2].textContent = price.small;

    const button = card.querySelector('.choose-package');
    if (button) {
      button.textContent = price.button;
      if (packageOption) button.dataset.package = packageOption.value;
    }
  });
}

function updateFeatureCard(selector, feature) {
  const card = document.querySelector(selector);
  if (!card) return;
  card.querySelector('span').textContent = feature.label;
  card.querySelector('h2').textContent = feature.title;

  const paragraph = card.querySelector('p');
  if (paragraph && feature.desc) paragraph.textContent = feature.desc;

  const list = card.querySelector('ul');
  if (list && feature.items) {
    list.innerHTML = feature.items.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  }

  const actionButtons = card.querySelectorAll('.feature-actions .btn');
  if (actionButtons.length && feature.menuButton) {
    actionButtons[0].textContent = feature.menuButton;
    if (actionButtons[1]) actionButtons[1].textContent = feature.button;
    return;
  }

  const button = card.querySelector('.btn');
  if (button) button.textContent = feature.button;
}

function updateFaq(t) {
  setText('.faq-title', t.faq.title);
  document.querySelectorAll('.faq-grid details').forEach((item, index) => {
    const faq = t.faq.items[index];
    if (!faq) return;
    item.querySelector('summary').innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span> ${escapeHtml(faq[0])}`;
    item.querySelector('p').textContent = faq[1];
  });
}

function updateStaticLanguage() {
  const t = languageText();
  const editable = editableContentForLanguage();
  document.documentElement.lang = t.htmlLang;
  document.body.dataset.language = currentLanguage;
  document.title = t.title;
  updateSeoMeta(t);

  setText('#navLinks a[href="#home"]', t.nav.home);
  setText('#navLinks a[href="#meal-plan"]', t.nav.meal);
  setText('#navLinks a[href="#catering"]', t.nav.catering);
  setText('#navLinks a[href="#styling"]', t.nav.styling);
  setText('#navLinks a[href="#faq"]', t.nav.faq);
  setText('#navLinks a[href="#referral"]', t.nav.referral);
  setHtml('.nav-whatsapp', `<span>☏</span> ${t.nav.whatsapp}`);
  const quickMessage = currentLanguage === 'en'
    ? 'Hi, I would like to ask about 90 PROJECT.'
    : '你好，我想询问九零食刻 90 PROJECT。';
  const navWhatsapp = document.querySelector('.nav-whatsapp');
  if (navWhatsapp) navWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(quickMessage)}`;
  setText('.mobile-wa', t.nav.mobileWhatsApp);
  menuToggle?.setAttribute('aria-label', t.nav.menu);
  backTop?.setAttribute('aria-label', t.nav.backTop);

  setText('.hero h1', t.hero.title);
  setText('.hero-en', t.hero.eyebrow);
  setText('.hero-tags', t.hero.tags);
  setText('.hero-slogan', t.hero.slogan);
  setHtml('.hero-sub', t.hero.sub);
  setText('.hero-actions .btn-gold', t.hero.primary);
  setText('.hero-actions .btn-outline', t.hero.secondary);

  document.querySelectorAll('.service-card').forEach((card, index) => {
    const service = t.services[index];
    if (!service) return;
    card.querySelector('h3').textContent = service.title;
    card.querySelector('.service-en').textContent = service.label;
    card.querySelector('p:last-child').textContent = service.desc;
  });

  setText('#meal-plan .section-title h2', t.mealPlan.title);
  setText('#meal-plan .section-title p', t.mealPlan.desc);
  updatePriceCards(t);

  setText('#referral .section-title h2', t.referral.title);
  setText('#referral .section-title p', t.referral.desc);
  document.querySelectorAll('.referral-grid article').forEach((card, index) => {
    const item = t.referral.cards[index];
    if (!item) return;
    card.querySelector('h3').textContent = item.title;
    card.querySelector('p').textContent = item.desc;
  });
  setText('.referral-note strong', t.referral.noteStrong);
  setText('.referral-note span', t.referral.note);
  const referralTerms = document.querySelector('.referral-terms');
  if (referralTerms) {
    referralTerms.innerHTML = t.referral.terms.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  }

  setText('.weekly-menu .panel-title h2', t.weekly.title);
  setText('.weekly-menu .panel-title span', t.weekly.label);
  const dayList = document.querySelector('.day-list');
  if (dayList) {
    dayList.innerHTML = editable.weekly.days.map(item => `
      <li><strong>${escapeHtml(item.day)}</strong><span>${escapeHtml(item.dish)}</span></li>
    `).join('');
  }
  setHtml('.weekly-menu .note', formatMultiline(editable.weekly.note));

  setText('.addons .panel-title h2', t.addons.title);
  setText('.addons .panel-title span', t.addons.label);
  updateAddons(editable.addons);

  setText('#order .panel-title h2', t.order.title);
  setText('#order .panel-title span', t.order.label);
  setFieldLabel('name', t.order.fields.name);
  setFieldLabel('phone', t.order.fields.phone);
  setFieldLabel('package', t.order.fields.package);
  setFieldLabel('pax', t.order.fields.pax);
  setFieldLabel('meal', t.order.fields.meal);
  setFieldLabel('date', t.order.fields.date);
  setFieldLabel('area', t.order.fields.area);
  setFieldLabel('referralCode', t.order.fields.referralCode);
  setFieldLabel('notes', t.order.fields.notes);
  setText('fieldset legend', t.order.fields.addons);
  setPlaceholder('name', t.order.placeholders.name);
  setPlaceholder('phone', t.order.placeholders.phone);
  setPlaceholder('pax', t.order.placeholders.pax);
  setPlaceholder('area', t.order.placeholders.area);
  setPlaceholder('referralCode', t.order.placeholders.referralCode);
  setPlaceholder('notes', t.order.placeholders.notes);
  updateSelectOptions('package', t.order.packageOptions);
  updateSelectOptions('meal', t.order.mealOptions);
  setText('#orderForm .btn-wide', t.order.submit);
  setText('.order-preview-head span', t.order.previewLabel);
  setText('#copyOrderPreview', t.order.copyPreview);
  renderOrderPreview();

  updateFeatureCard('#catering', t.features.catering);
  updateFeatureCard('#styling', t.features.styling);
  updateFaq(t);

  setText('.footer-brand h2', t.cta.title);
  setText('.footer-brand p', t.cta.slogan);
  setText('.final-cta .btn.big', t.cta.button);
  setText('.site-footer span:nth-child(2)', 'WhatsApp: 011-1097 7166');

  setText('#memberTitle', t.member.title);
  setText('.member-intro p', t.member.intro);
  setText('[data-member-tab="login"]', t.member.loginTab);
  setText('[data-member-tab="register"]', t.member.registerTab);
  setFieldLabel('loginPassword', t.member.password);
  setFieldLabel('registerName', t.member.name);
  setFieldLabel('registerPhone', t.member.phone);
  setFieldLabel('registerPassword', t.member.password);
  setText('#memberLoginForm .btn-wide', t.member.loginSubmit);
  setText('#memberRegisterForm .btn-wide', t.member.createSubmit);
  setText('#memberLogout', t.member.logout);
  setText('.member-dashboard-head h2', t.member.dashboardTitle);
  document.querySelectorAll('.member-benefits article').forEach((card, index) => {
    const item = t.member.benefits[index];
    if (!item) return;
    card.querySelector('b').textContent = item[0];
    card.querySelector('span').textContent = item[1];
  });
  setText('.member-referral-panel p', t.member.referralIntro);
  setText('#copyReferralCode', t.member.copyCode);
  setText('#shareReferralWhatsApp', t.member.shareCode);
  setText('.member-rewards-head h3', t.member.rewardsTitle);
  setText('#clearReferralRewards', t.member.clearRewards);
  setText('.member-records-head:not(.member-rewards-head) h3', t.member.recordsTitle);
  setText('#clearMemberRecords', t.member.clearRecords);

  updateLanguageButtons();
  updateMemberButton();
  renderMemberState();
  if (isAdminLoggedIn()) {
    renderAdminInquiries();
    renderAdminMembers(false);
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

function encodePassword(password) {
  return btoa(unescape(encodeURIComponent(password)));
}

function hashLocalSecret(value) {
  let hash = 2166136261;
  Array.from(String(value)).forEach(character => {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function adminLockUntil() {
  const timestamp = Number(localStorage.getItem(ADMIN_LOCK_KEY) || 0);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function isAdminLocked() {
  return Date.now() < adminLockUntil();
}

function registerAdminLoginFailure() {
  const attempts = Number(localStorage.getItem(ADMIN_ATTEMPTS_KEY) || 0) + 1;
  if (attempts >= 5) {
    localStorage.setItem(ADMIN_LOCK_KEY, String(Date.now() + 5 * 60 * 1000));
    localStorage.removeItem(ADMIN_ATTEMPTS_KEY);
    return true;
  }
  localStorage.setItem(ADMIN_ATTEMPTS_KEY, String(attempts));
  return false;
}

function clearAdminLoginGuard() {
  localStorage.removeItem(ADMIN_ATTEMPTS_KEY);
  localStorage.removeItem(ADMIN_LOCK_KEY);
}

function normalizeReferralCode(code) {
  return String(code || '').trim().toUpperCase();
}

function createReferralCode(name = '', email = '') {
  const source = `${name}${email}`.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const prefix = (source || 'MEMBER').slice(0, 4).padEnd(4, '9');
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NP90-${prefix}-${suffix}`;
}

function ensureMemberReferralData(members) {
  let changed = false;
  const usedCodes = new Set();

  members.forEach(member => {
    if (!Array.isArray(member.referralRewards)) {
      member.referralRewards = [];
      changed = true;
    }

    let code = normalizeReferralCode(member.referralCode);
    if (!code || usedCodes.has(code)) {
      code = createReferralCode(member.name, member.email);
      member.referralCode = code;
      changed = true;
    } else if (member.referralCode !== code) {
      member.referralCode = code;
      changed = true;
    }

    usedCodes.add(code);
  });

  return changed;
}

function loadMembers() {
  try {
    const members = JSON.parse(localStorage.getItem(MEMBERS_KEY) || '[]');
    if (!Array.isArray(members)) return [];
    if (ensureMemberReferralData(members)) saveMembers(members);
    return members;
  } catch (error) {
    return [];
  }
}

function saveMembers(members) {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}

function currentMemberEmail() {
  return localStorage.getItem(SESSION_KEY) || '';
}

function setCurrentMember(email) {
  if (email) {
    localStorage.setItem(SESSION_KEY, email);
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

function getCurrentMember() {
  const email = currentMemberEmail();
  if (!email) return null;
  return loadMembers().find(member => member.email === email) || null;
}

function updateMemberButton() {
  const member = getCurrentMember();
  const t = languageText();
  if (!memberOpen) return;
  memberOpen.textContent = member ? t.member.centerButton : t.member.loginButton;
}

function showMemberMessage(message, isError = false) {
  if (!memberMessage) return;
  memberMessage.textContent = message || '';
  memberMessage.style.color = isError ? '#ffb4a6' : '#ffdf9a';
}

function fillMemberToOrder(member) {
  if (!member || !form) return;
  const nameInput = getById('name');
  const phoneInput = getById('phone');
  if (nameInput && !nameInput.value) nameInput.value = member.name || '';
  if (phoneInput && !phoneInput.value) phoneInput.value = member.phone || '';
  renderOrderPreview();
}

function renderMemberRecords(member) {
  if (!memberRecords) return;
  const t = languageText();
  const records = member?.records || [];
  if (!records.length) {
    memberRecords.innerHTML = `<div class="member-empty">${escapeHtml(t.member.emptyRecords)}</div>`;
    return;
  }

  memberRecords.innerHTML = records.map(record => {
    const date = new Date(record.createdAt).toLocaleString('zh-MY', {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
    });
    return `
      <article class="member-record">
        <strong>${escapeHtml(record.package || (currentLanguage === 'en' ? 'Meal Plan Inquiry' : '包伙食询问'))}</strong>
        <p>${currentLanguage === 'en' ? 'Date' : '日期'}：${date}</p>
        <p>${currentLanguage === 'en' ? 'Pax' : '人数'}：${escapeHtml(record.pax || '-')} ｜ ${currentLanguage === 'en' ? 'Meal' : '餐期'}：${escapeHtml(record.meal || '-')}</p>
        <p>${currentLanguage === 'en' ? 'Start date' : '开始日期'}：${escapeHtml(record.date || '-')} ｜ ${currentLanguage === 'en' ? 'Area' : '区域'}：${escapeHtml(record.area || '-')}</p>
        <p>${currentLanguage === 'en' ? 'Referral code' : '推荐码'}：${escapeHtml(record.referralCode || t.order.none)}</p>
        <p>${currentLanguage === 'en' ? 'Add-ons' : '加购'}：${escapeHtml(record.addons || t.order.none)}</p>
        <p>${currentLanguage === 'en' ? 'Notes' : '备注'}：${escapeHtml(record.notes || '-')}</p>
      </article>
    `;
  }).join('');
}

function renderReferralRewards(member) {
  if (!memberReferralRewards) return;
  const t = languageText();
  const rewards = member?.referralRewards || [];
  if (!rewards.length) {
    memberReferralRewards.innerHTML = `<div class="member-empty">${escapeHtml(t.member.emptyRewards)}</div>`;
    return;
  }

  memberReferralRewards.innerHTML = rewards.map(reward => {
    const date = new Date(reward.createdAt).toLocaleString('zh-MY', {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
    });
    return `
      <article class="member-record">
        <strong>${escapeHtml(reward.referredName || (currentLanguage === 'en' ? 'Friend referral inquiry' : '朋友推荐询问'))}</strong>
        <p>${currentLanguage === 'en' ? 'Date' : '日期'}：${date}</p>
        <p>${currentLanguage === 'en' ? 'Package' : '配套'}：${escapeHtml(reward.package || '-')}</p>
        <p>${currentLanguage === 'en' ? 'Referral level' : '推荐层级'}：${escapeHtml(reward.level ? `L${reward.level}` : 'L1')}</p>
        ${reward.fixedCredit ? `<p>${currentLanguage === 'en' ? 'Fixed reward' : '固定奖励'}：RM${escapeHtml(reward.fixedCredit)} ${currentLanguage === 'en' ? 'next-order credit' : '下次服务抵扣'}</p>` : ''}
        <p>${currentLanguage === 'en' ? 'Spending reward' : '消费额回馈'}：${escapeHtml(reward.ratePercent || 1)}% ${currentLanguage === 'en' ? 'of confirmed spending, pending WhatsApp confirmation' : '实际消费额回馈（待 WhatsApp 确认订单金额）'}</p>
        <p>${currentLanguage === 'en' ? 'Status' : '状态'}：${escapeHtml(currentLanguage === 'en' && reward.status === '待确认' ? 'Pending' : (reward.status || '待确认'))}</p>
      </article>
    `;
  }).join('');
}

function referralShareLink(member) {
  const code = normalizeReferralCode(member?.referralCode);
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  return `${baseUrl}?ref=${encodeURIComponent(code)}#order`;
}

function referralShareMessage(member) {
  const code = normalizeReferralCode(member?.referralCode);
  if (currentLanguage === 'en') {
    return `Hi, I would like to recommend 90 PROJECT meal plans / catering service.

Referral code: ${code}
Please enter this code when ordering.
${referralShareLink(member)}`;
  }

  return `你好，我推荐你试九零食刻 90 PROJECT 包伙食 / 外餐服务。

推荐码：${code}
下单时填写推荐码即可。
${referralShareLink(member)}`;
}

function renderReferralPanel(member) {
  if (!member) {
    if (memberReferralCode) memberReferralCode.textContent = '-';
    if (shareReferralWhatsApp) shareReferralWhatsApp.href = '#';
    renderReferralRewards(null);
    return;
  }

  const code = normalizeReferralCode(member.referralCode);
  if (memberReferralCode) memberReferralCode.textContent = code;
  if (shareReferralWhatsApp) {
    shareReferralWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(referralShareMessage(member))}`;
  }
  renderReferralRewards(member);
}

function renderMemberState() {
  const member = getCurrentMember();
  updateMemberButton();

  if (member) {
    memberAuthPanel.hidden = true;
    memberDashboard.hidden = false;
    if (memberProfileText) {
      memberProfileText.textContent = `${member.name} · ${member.phone} · ${member.email}`;
    }
    renderReferralPanel(member);
    renderMemberRecords(member);
    fillMemberToOrder(member);
  } else {
    memberAuthPanel.hidden = false;
    memberDashboard.hidden = true;
    renderReferralPanel(null);
    renderMemberRecords(null);
  }
}

function openMemberModal() {
  if (!memberModal) return;
  memberModal.classList.add('open');
  memberModal.setAttribute('aria-hidden', 'false');
  memberModal.querySelector('.member-dialog')?.scrollTo({ top: 0 });
  showMemberMessage('');
  renderMemberState();
}

function closeMemberModal() {
  if (!memberModal) return;
  memberModal.classList.remove('open');
  memberModal.setAttribute('aria-hidden', 'true');
}

function setMemberTab(tab) {
  document.querySelectorAll('[data-member-tab]').forEach(button => {
    button.classList.toggle('active', button.dataset.memberTab === tab);
  });
  memberLoginForm?.classList.toggle('active', tab === 'login');
  memberRegisterForm?.classList.toggle('active', tab === 'register');
  showMemberMessage('');
}

function collectOrderData() {
  const addons = Array.from(form?.querySelectorAll('fieldset input[type="checkbox"]:checked') || [])
    .map(input => input.value)
    .join(currentLanguage === 'en' ? ', ' : '、') || languageText().order.none;

  return {
    name: fieldValue('name'),
    phone: fieldValue('phone'),
    package: fieldValue('package'),
    pax: fieldValue('pax'),
    meal: fieldValue('meal'),
    date: fieldValue('date'),
    area: fieldValue('area'),
    referralCode: normalizeReferralCode(fieldValue('referralCode')),
    addons,
    notes: fieldValue('notes')
  };
}

function showOrderMessage(message = '', isError = false) {
  if (!orderFormMessage) return;
  orderFormMessage.textContent = message;
  orderFormMessage.classList.toggle('is-error', Boolean(isError));
}

function validateOrderData(data) {
  const missingRequired = !data.name || !data.phone || !data.package || !data.pax || !data.meal || !data.date || !data.area;
  if (missingRequired) {
    return currentLanguage === 'en'
      ? 'Please fill in name, phone, package, pax, meal, start date and delivery area before opening WhatsApp.'
      : '请先填写姓名、电话、配套、人数、餐期、开始日期和配送区域，再打开 WhatsApp。';
  }

  if (!/^[0-9+\-\s]{8,20}$/.test(data.phone)) {
    return currentLanguage === 'en'
      ? 'Please enter a valid phone number with 8 to 20 digits or symbols.'
      : '请输入正确电话号码，可使用数字、空格、+ 或 -，长度 8 到 20 位。';
  }

  const pax = Number.parseInt(data.pax, 10);
  if (!Number.isFinite(pax) || pax < 1) {
    return currentLanguage === 'en'
      ? 'Please enter at least 1 pax.'
      : '人数至少需要填写 1 人。';
  }

  return '';
}

function buildOrderMessage(data) {
  if (currentLanguage === 'en') {
    return `Hi, I would like to ask about 90 PROJECT meal plan / catering service.

Name: ${displayValue(data.name)}
Phone: ${displayValue(data.phone)}
Selected package: ${displayValue(data.package)}
Pax: ${displayValue(data.pax)}
Meal: ${displayValue(data.meal)}
Start date: ${displayValue(data.date)}
Delivery area: ${displayValue(data.area)}
Referral code: ${displayValue(data.referralCode)}
Add-ons: ${displayValue(data.addons)}
Notes: ${displayValue(data.notes)}

Please help me confirm the price and delivery arrangement. Thank you.`;
  }

  return `你好，我想询问九零食刻 90 PROJECT 包伙食。

姓名：${displayValue(data.name)}
电话：${displayValue(data.phone)}
选择配套：${displayValue(data.package)}
人数：${displayValue(data.pax)}
餐期：${displayValue(data.meal)}
开始日期：${displayValue(data.date)}
配送区域：${displayValue(data.area)}
推荐码：${displayValue(data.referralCode)}
加购：${displayValue(data.addons)}
备注：${displayValue(data.notes)}

请帮我确认价格和配送安排，谢谢。`;
}

function renderOrderPreview() {
  if (!orderPreviewText) return;
  const data = collectOrderData();
  const hasInput = ['name', 'phone', 'pax', 'date', 'area', 'referralCode', 'notes'].some(key => data[key]);
  if (!hasInput && data.addons === languageText().order.none) {
    orderPreviewText.textContent = languageText().order.previewEmpty;
    return;
  }
  orderPreviewText.textContent = buildOrderMessage(data);
}

function createInquiryId() {
  return `NP90-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function inquiryToSupabasePayload(inquiry, userId = null) {
  const pax = Number.parseInt(inquiry.pax, 10);
  const payload = {
    customer_name: inquiry.name || '-',
    phone: inquiry.phone || '-',
    event_date: inquiry.date || null,
    event_location: inquiry.area || null,
    guest_count: Number.isFinite(pax) ? pax : null,
    service_type: [inquiry.package, inquiry.meal].filter(Boolean).join(' | ') || null,
    budget: inquiry.referralCode ? `Referral: ${inquiry.referralCode}` : null,
    message: buildOrderMessage(inquiry),
    status: inquiry.status || 'new',
    admin_notes: [
      inquiry.addons ? `Add-ons: ${inquiry.addons}` : '',
      inquiry.notes ? `Notes: ${inquiry.notes}` : '',
      inquiry.language ? `Language: ${inquiry.language}` : ''
    ].filter(Boolean).join('\n') || null
  };
  if (userId) payload.user_id = userId;
  return payload;
}

function supabaseRowToInquiry(row) {
  const [packageName = row.service_type || '', meal = ''] = String(row.service_type || '').split(' | ');
  const notes = String(row.admin_notes || '').replace(/^Add-ons:.*$/m, '').replace(/^Language:.*$/m, '').replace(/^Notes:\s*/m, '').trim();
  const addonsMatch = String(row.admin_notes || '').match(/^Add-ons:\s*(.+)$/m);
  return {
    id: row.id,
    supabaseId: row.id,
    name: row.customer_name || '',
    phone: row.phone || '',
    package: packageName,
    pax: row.guest_count ? String(row.guest_count) : '',
    meal,
    date: row.event_date || '',
    area: row.event_location || '',
    referralCode: String(row.budget || '').replace(/^Referral:\s*/i, ''),
    addons: addonsMatch?.[1] || '',
    notes,
    status: row.status || 'new',
    source: 'supabase',
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || row.created_at || new Date().toISOString()
  };
}

async function syncInquiryToSupabase(inquiry) {
  if (!isSupabaseConfigured()) return;
  try {
    const memberSession = getSupabaseMemberSession();
    const memberUserId = memberSession?.user?.id || null;
    const memberToken = memberSession?.access_token || null;
    const rows = await supabaseFetch('/rest/v1/inquiries?select=id,created_at,updated_at', {
      method: 'POST',
      token: memberToken || undefined,
      headers: { Prefer: 'return=representation' },
      body: inquiryToSupabasePayload(inquiry, memberUserId)
    });
    const remote = rows?.[0];
    if (!remote?.id) return;

    const inquiries = loadInquiries();
    const local = inquiries.find(item => item.id === inquiry.id);
    if (local) {
      local.supabaseId = remote.id;
      local.updatedAt = remote.updated_at || local.updatedAt;
      saveInquiries(inquiries);
    }

    if (memberToken && inquiry.referralCode) {
      await createSupabaseReferralRewards(remote.id, inquiry.referralCode, memberToken);
      refreshSupabaseMemberData();
    }

    refreshSupabaseInquiries();
  } catch (error) {
    console.warn('Supabase inquiry sync failed', error);
  }
}

function combinedAdminInquiries() {
  const localInquiries = loadInquiries();
  if (!supabaseInquiriesCache.length) return localInquiries;

  const remoteIds = new Set(supabaseInquiriesCache.map(item => item.supabaseId || item.id));
  const unsyncedLocal = localInquiries.filter(item => !item.supabaseId || !remoteIds.has(item.supabaseId));
  return [...supabaseInquiriesCache, ...unsyncedLocal]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

async function refreshSupabaseInquiries() {
  if (!isSupabaseConfigured() || !getSupabaseSession()?.access_token || supabaseFetchInProgress) return;

  supabaseFetchInProgress = true;
  try {
    const rows = await supabaseFetch('/rest/v1/inquiries?select=*&order=created_at.desc&limit=80');
    supabaseInquiriesCache = Array.isArray(rows) ? rows.map(supabaseRowToInquiry) : [];
  } catch (error) {
    console.warn('Supabase inquiries fetch failed', error);
  } finally {
    supabaseFetchInProgress = false;
    renderAdminInquiries(false);
  }
}

function loadInquiries() {
  try {
    const inquiries = JSON.parse(localStorage.getItem(INQUIRIES_KEY) || '[]');
    return Array.isArray(inquiries) ? inquiries : [];
  } catch (error) {
    return [];
  }
}

function saveInquiries(inquiries) {
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries.slice(0, 120)));
}

function saveInquiryForAdmin(orderData) {
  const inquiries = loadInquiries();
  const inquiry = {
    id: createInquiryId(),
    ...orderData,
    language: currentLanguage,
    status: 'new',
    source: 'whatsapp_form',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  inquiries.unshift(inquiry);
  saveInquiries(inquiries);
  renderAdminInquiries();
  syncInquiryToSupabase(inquiry);
  return inquiry;
}

function inquiryStatusLabel(status) {
  const labels = currentLanguage === 'en'
    ? {
        new: 'New',
        contacted: 'Contacted',
        quoted: 'Quoted',
        confirmed: 'Confirmed',
        completed: 'Completed',
        cancelled: 'Cancelled'
      }
    : {
        new: '新询问',
        contacted: '已联系',
        quoted: '已报价',
        confirmed: '已确认',
        completed: '已完成',
        cancelled: '已取消'
      };
  return labels[status] || labels.new;
}

function statusOptions(selectedStatus) {
  return INQUIRY_STATUSES.map(status => (
    `<option value="${status}" ${status === selectedStatus ? 'selected' : ''}>${inquiryStatusLabel(status)}</option>`
  )).join('');
}

function renderAdminInquiries(refreshRemote = true) {
  if (!adminInquiries) return;
  if (refreshRemote) refreshSupabaseInquiries();

  const inquiries = combinedAdminInquiries();
  const localCount = loadInquiries().length;
  const cloudCount = supabaseInquiriesCache.length;
  const t = languageText();

  if (adminDataStatus) {
    if (isSupabaseConfigured() && getSupabaseSession()?.access_token) {
      adminDataStatus.textContent = currentLanguage === 'en'
        ? `Supabase connected. ${cloudCount} cloud inquiries and ${localCount} local fallback records are available.`
        : `Supabase 已连接。目前可查看 ${cloudCount} 笔云端询问，并保留 ${localCount} 笔本地备份。`;
    } else if (isSupabaseConfigured()) {
      adminDataStatus.textContent = currentLanguage === 'en'
        ? `${localCount} local inquiries saved. Log in with a Supabase admin account to read cloud inquiries.`
        : `这个浏览器目前保存 ${localCount} 笔本地询问。使用 Supabase admin 账号登录后可读取云端询问。`;
    } else {
      adminDataStatus.textContent = currentLanguage === 'en'
        ? `${localCount} local inquiries saved in this browser. Add Supabase config to enable cloud sync.`
        : `这个浏览器目前保存 ${localCount} 笔本地询问。填入 Supabase 设定后可开启云端同步。`;
    }
  }

  if (!inquiries.length) {
    adminInquiries.innerHTML = `<div class="member-empty">${currentLanguage === 'en' ? 'No local inquiries yet.' : '目前还没有本地询问记录。'}</div>`;
    return;
  }

  adminInquiries.innerHTML = inquiries.map(inquiry => {
    const createdAt = new Date(inquiry.createdAt).toLocaleString('zh-MY', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(inquiry))}`;
    return `
      <article class="admin-inquiry" data-inquiry-id="${escapeHtml(inquiry.id)}">
        <div>
          <strong>${escapeHtml(inquiry.name || (currentLanguage === 'en' ? 'Unnamed customer' : '未填写姓名'))}</strong>
          <p>${currentLanguage === 'en' ? 'Phone' : '电话'}：${escapeHtml(inquiry.phone || t.order.none)}</p>
          <p>${currentLanguage === 'en' ? 'Package' : '配套'}：${escapeHtml(inquiry.package || t.order.none)}</p>
          <p>${currentLanguage === 'en' ? 'Pax / Meal' : '人数 / 餐期'}：${escapeHtml(inquiry.pax || t.order.none)} · ${escapeHtml(inquiry.meal || t.order.none)}</p>
          <p>${currentLanguage === 'en' ? 'Date / Area' : '日期 / 地区'}：${escapeHtml(inquiry.date || t.order.none)} · ${escapeHtml(inquiry.area || t.order.none)}</p>
          <p>${currentLanguage === 'en' ? 'Add-ons' : '加购'}：${escapeHtml(inquiry.addons || t.order.none)}</p>
          <p>${currentLanguage === 'en' ? 'Referral' : '推荐码'}：${escapeHtml(inquiry.referralCode || t.order.none)}</p>
          <p>${currentLanguage === 'en' ? 'Notes' : '备注'}：${escapeHtml(inquiry.notes || t.order.none)}</p>
          <p>${currentLanguage === 'en' ? 'Created' : '建立时间'}：${escapeHtml(createdAt)}</p>
        </div>
        <div class="admin-inquiry-actions">
          <select data-inquiry-status aria-label="Inquiry status">${statusOptions(inquiry.status || 'new')}</select>
          <a href="${waUrl}" target="_blank" rel="noopener">${currentLanguage === 'en' ? 'Open WhatsApp' : '打开 WhatsApp'}</a>
        </div>
      </article>
    `;
  }).join('');
}

async function setInquiryStatus(id, status) {
  if (!INQUIRY_STATUSES.includes(status)) return;
  const remoteInquiry = supabaseInquiriesCache.find(item => item.id === id || item.supabaseId === id);
  if (remoteInquiry?.supabaseId && isSupabaseConfigured() && getSupabaseSession()?.access_token) {
    try {
      await supabaseFetch(`/rest/v1/inquiries?id=eq.${encodeURIComponent(remoteInquiry.supabaseId)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: { status }
      });
      remoteInquiry.status = status;
      remoteInquiry.updatedAt = new Date().toISOString();
      renderAdminInquiries(false);
      return;
    } catch (error) {
      console.warn('Supabase status update failed', error);
      showAdminMessage(currentLanguage === 'en'
        ? 'Unable to update Supabase status. Local record is unchanged.'
        : '无法更新 Supabase 状态，本地记录未更改。', true);
      return;
    }
  }

  const inquiries = loadInquiries();
  const inquiry = inquiries.find(item => item.id === id);
  if (!inquiry) return;
  inquiry.status = status;
  inquiry.updatedAt = new Date().toISOString();
  saveInquiries(inquiries);
  renderAdminInquiries();

  if (inquiry.supabaseId && isSupabaseConfigured() && getSupabaseSession()?.access_token) {
    try {
      await supabaseFetch(`/rest/v1/inquiries?id=eq.${encodeURIComponent(inquiry.supabaseId)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: { status }
      });
    } catch (error) {
      console.warn('Supabase local status mirror failed', error);
    }
  }
}

function referralRewardStatusLabel(status) {
  const normalized = status === '待确认' ? 'pending' : status;
  const labels = currentLanguage === 'en'
    ? {
        pending: 'Pending',
        approved: 'Approved',
        redeemed: 'Redeemed',
        cancelled: 'Cancelled'
      }
    : {
        pending: '待确认',
        approved: '已批准',
        redeemed: '已抵扣',
        cancelled: '已取消'
      };
  return labels[normalized] || labels.pending;
}

function rewardStatusOptions(selectedStatus) {
  const normalized = selectedStatus === '待确认' ? 'pending' : selectedStatus;
  return REFERRAL_REWARD_STATUSES.map(status => (
    `<option value="${status}" ${status === normalized ? 'selected' : ''}>${referralRewardStatusLabel(status)}</option>`
  )).join('');
}

function profileToAdminMember(profile) {
  return {
    source: 'supabase',
    name: profile.full_name || profile.user_id || '-',
    phone: profile.phone || '-',
    email: profile.email || '',
    referralCode: normalizeReferralCode(profile.referral_code),
    referredByCode: normalizeReferralCode(profile.referred_by_code),
    role: profile.role || 'member',
    status: profile.status || 'active',
    supabaseUserId: profile.user_id,
    records: [],
    referralRewards: [],
    createdAt: profile.created_at || ''
  };
}

function combinedAdminMembers() {
  const localMembers = loadMembers().map(member => ({ ...member, source: 'local' }));
  const localEmails = new Set(localMembers.map(member => String(member.email || '').toLowerCase()).filter(Boolean));
  const localUserIds = new Set(localMembers.map(member => member.supabaseUserId).filter(Boolean));
  const cloudMembers = supabaseProfilesCache
    .map(profileToAdminMember)
    .filter(member => !localEmails.has(String(member.email || '').toLowerCase()) && !localUserIds.has(member.supabaseUserId));
  return [...localMembers, ...cloudMembers];
}

async function refreshSupabaseMembers() {
  if (!isSupabaseConfigured() || !getSupabaseSession()?.access_token || supabaseMembersFetchInProgress) return;

  supabaseMembersFetchInProgress = true;
  try {
    const [profiles, rewards] = await Promise.all([
      supabaseFetch('/rest/v1/profiles?select=*&order=created_at.desc&limit=120'),
      supabaseFetch('/rest/v1/referral_rewards?select=*&order=created_at.desc&limit=160')
    ]);
    supabaseProfilesCache = Array.isArray(profiles) ? profiles : [];
    supabaseRewardsCache = Array.isArray(rewards) ? rewards : [];
  } catch (error) {
    console.warn('Supabase members fetch failed', error);
  } finally {
    supabaseMembersFetchInProgress = false;
    renderAdminMembers(false);
  }
}

function renderRewardLine(reward, memberEmail, index) {
  const date = reward.createdAt || reward.created_at
    ? new Date(reward.createdAt || reward.created_at).toLocaleString('zh-MY', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
      })
    : '-';
  const isCloud = Boolean(reward.id || reward.cloudId);
  const idAttribute = isCloud
    ? `data-cloud-reward-id="${escapeHtml(reward.id || reward.cloudId)}"`
    : `data-member-email="${escapeHtml(memberEmail)}" data-reward-index="${index}"`;
  const status = reward.status || 'pending';

  return `
    <div class="admin-reward-line">
      <div>
        <b>${escapeHtml(reward.referred_name || reward.referredName || (currentLanguage === 'en' ? 'Referral reward' : '推荐奖励'))}</b>
        <span>${escapeHtml(date)} · L${escapeHtml(reward.level || 1)} · RM${escapeHtml(reward.fixed_credit ?? reward.fixedCredit ?? 0)} + ${escapeHtml(reward.rate_percent ?? reward.ratePercent ?? 0)}%</span>
      </div>
      <select data-reward-status ${idAttribute}>${rewardStatusOptions(status)}</select>
    </div>
  `;
}

function renderAdminMembers(refreshRemote = true) {
  if (!adminMembers) return;
  if (refreshRemote) refreshSupabaseMembers();

  const members = combinedAdminMembers();
  const localRewards = loadMembers().reduce((count, member) => count + (member.referralRewards?.length || 0), 0);
  const cloudRewards = supabaseRewardsCache.length;

  if (adminMemberStatus) {
    if (isSupabaseConfigured() && getSupabaseSession()?.access_token) {
      adminMemberStatus.textContent = currentLanguage === 'en'
        ? `${members.length} members shown. ${cloudRewards} cloud reward records and ${localRewards} local reward records are available.`
        : `目前显示 ${members.length} 位会员；云端奖励 ${cloudRewards} 笔，本地奖励 ${localRewards} 笔。`;
    } else if (isSupabaseConfigured()) {
      adminMemberStatus.textContent = currentLanguage === 'en'
        ? `${members.length} local members shown. Log in with Supabase admin to read cloud members.`
        : `目前显示 ${members.length} 位本地会员。使用 Supabase admin 登录后可读取云端会员。`;
    } else {
      adminMemberStatus.textContent = currentLanguage === 'en'
        ? `${members.length} local members shown. Supabase is not configured yet.`
        : `目前显示 ${members.length} 位本地会员。Supabase 尚未设定。`;
    }
  }

  if (!members.length && !supabaseRewardsCache.length) {
    adminMembers.innerHTML = `<div class="member-empty">${currentLanguage === 'en' ? 'No members or rewards yet.' : '目前还没有会员或推荐奖励记录。'}</div>`;
    return;
  }

  const memberCards = members.map(member => {
    const memberEmail = String(member.email || '').toLowerCase();
    const rewards = member.referralRewards || [];
    return `
      <article class="admin-member-card">
        <div>
          <strong>${escapeHtml(member.name || member.email || (currentLanguage === 'en' ? 'Member' : '会员'))}</strong>
          <p>${currentLanguage === 'en' ? 'Phone' : '电话'}：${escapeHtml(member.phone || '-')}</p>
          <p>Email：${escapeHtml(member.email || '-')}</p>
          <p>${currentLanguage === 'en' ? 'Referral code' : '推荐码'}：${escapeHtml(normalizeReferralCode(member.referralCode) || '-')}</p>
          <p>${currentLanguage === 'en' ? 'Referred by' : '上级推荐'}：${escapeHtml(normalizeReferralCode(member.referredByCode) || '-')}</p>
          <p>${currentLanguage === 'en' ? 'Records / Rewards' : '询问 / 奖励'}：${escapeHtml(member.records?.length || 0)} / ${escapeHtml(rewards.length || 0)}</p>
          <p>${currentLanguage === 'en' ? 'Source' : '来源'}：${escapeHtml(member.source === 'supabase' ? 'Supabase' : 'Local')}</p>
        </div>
        <div class="admin-reward-list">
          ${rewards.length ? rewards.map((reward, index) => renderRewardLine(reward, memberEmail, index)).join('') : `<span>${currentLanguage === 'en' ? 'No local rewards.' : '暂无本地奖励。'}</span>`}
        </div>
      </article>
    `;
  }).join('');

  const cloudOnlyRewards = supabaseRewardsCache
    .filter(reward => !members.some(member => member.supabaseUserId === reward.referrer_user_id))
    .map(reward => renderRewardLine(reward, '', 0))
    .join('');

  adminMembers.innerHTML = `
    ${memberCards}
    ${cloudOnlyRewards ? `<article class="admin-member-card admin-cloud-rewards"><strong>${currentLanguage === 'en' ? 'Cloud reward records' : '云端奖励记录'}</strong><div class="admin-reward-list">${cloudOnlyRewards}</div></article>` : ''}
  `;
}

async function setReferralRewardStatus(memberEmail, rewardIndex, status) {
  if (!REFERRAL_REWARD_STATUSES.includes(status)) return;
  const members = loadMembers();
  const member = members.find(item => String(item.email || '').toLowerCase() === String(memberEmail || '').toLowerCase());
  const reward = member?.referralRewards?.[Number(rewardIndex)];
  if (!reward) return;

  reward.status = status;
  reward.updatedAt = new Date().toISOString();
  saveMembers(members);
  renderAdminMembers(false);
  renderMemberState();
}

async function setCloudReferralRewardStatus(rewardId, status) {
  if (!rewardId || !REFERRAL_REWARD_STATUSES.includes(status)) return;
  if (!isSupabaseConfigured() || !getSupabaseSession()?.access_token) {
    showAdminMessage(currentLanguage === 'en' ? 'Supabase admin is not connected.' : 'Supabase admin 尚未连接。', true);
    return;
  }

  try {
    await supabaseFetch(`/rest/v1/referral_rewards?id=eq.${encodeURIComponent(rewardId)}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: { status }
    });
    const reward = supabaseRewardsCache.find(item => item.id === rewardId);
    if (reward) reward.status = status;
    renderAdminMembers(false);
  } catch (error) {
    console.warn('Supabase referral reward status update failed', error);
    showAdminMessage(currentLanguage === 'en'
      ? 'Unable to update cloud reward status. Check Supabase schema and admin permission.'
      : '无法更新云端奖励状态，请检查 Supabase schema 和 admin 权限。', true);
  }
}

function exportLocalBackup() {
  const data = {
    exportedAt: new Date().toISOString(),
    app: '90 PROJECT offline website',
    version: 1,
    adminContent: loadAdminContent(),
    inquiries: loadInquiries(),
    members: loadMembers()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `90project-local-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showAdminMessage(currentLanguage === 'en' ? 'Local data exported.' : '本地资料已导出。');
}

function importLocalBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    try {
      const data = JSON.parse(String(reader.result || '{}'));
      if (data.adminContent) saveEditableContent(data.adminContent);
      if (Array.isArray(data.inquiries)) saveInquiries(data.inquiries);
      if (Array.isArray(data.members)) saveMembers(data.members);
      updateStaticLanguage();
      renderCateringMenu();
      renderCateringEstimate();
      renderAdminEditor();
      renderAdminInquiries();
      renderAdminMembers();
      renderMemberState();
      showAdminMessage(currentLanguage === 'en' ? 'Local backup imported.' : '本地备份已导入。');
    } catch (error) {
      showAdminMessage(currentLanguage === 'en' ? 'Import failed. Please choose a valid JSON backup.' : '导入失败，请选择正确的 JSON 备份。', true);
    } finally {
      if (importLocalDataInput) importLocalDataInput.value = '';
    }
  });
  reader.readAsText(file);
}

function saveInquiryForMember(orderData) {
  const email = currentMemberEmail();
  if (!email) return;

  const members = loadMembers();
  const member = members.find(item => item.email === email);
  if (!member) return;

  member.records = member.records || [];
  member.records.unshift({
    ...orderData,
    createdAt: new Date().toISOString(),
    status: 'whatsapp_created'
  });
  member.records = member.records.slice(0, 30);
  saveMembers(members);
  renderMemberState();
  if (isAdminLoggedIn()) renderAdminMembers(false);
}

function saveReferralReward(orderData) {
  const code = normalizeReferralCode(orderData.referralCode);
  if (!code) return;

  const members = loadMembers();
  const currentEmail = currentMemberEmail();
  const currentMember = members.find(member => member.email === currentEmail);
  const directReferrer = members.find(member => normalizeReferralCode(member.referralCode) === code);

  if (!directReferrer || directReferrer.email === currentEmail) return;

  if (currentMember && !currentMember.referredByCode) {
    currentMember.referredByCode = code;
  }

  const rewardBase = {
    createdAt: new Date().toISOString(),
    referredName: orderData.name || (currentLanguage === 'en' ? 'New customer' : '新顾客'),
    package: orderData.package || (currentLanguage === 'en' ? 'Meal plan / catering inquiry' : '包伙食 / 外餐询问'),
    status: '待确认'
  };
  const visited = new Set([currentEmail].filter(Boolean));
  let referrer = directReferrer;

  REFERRAL_LEVEL_RATES.forEach((ratePercent, index) => {
    if (!referrer || visited.has(referrer.email)) return;
    visited.add(referrer.email);

    referrer.referralRewards = referrer.referralRewards || [];
    referrer.referralRewards.unshift({
      ...rewardBase,
      level: index + 1,
      fixedCredit: index === 0 ? 20 : 0,
      ratePercent
    });
    referrer.referralRewards = referrer.referralRewards.slice(0, 30);

    const parentCode = normalizeReferralCode(referrer.referredByCode);
    referrer = parentCode
      ? members.find(member => normalizeReferralCode(member.referralCode) === parentCode)
      : null;
  });

  saveMembers(members);
  renderMemberState();
  if (isAdminLoggedIn()) renderAdminMembers(false);
}

function setPackageValue(value) {
  const select = getById('package');
  if (!select || !value) return;
  const normalize = text => String(text).replace(/\s+/g, '');
  const option = Array.from(select.options).find(item => normalize(item.value) === normalize(value));
  if (option) {
    select.value = option.value;
  } else {
    const created = new Option(value, value);
    select.add(created);
    select.value = value;
  }
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

function applyReferralCodeFromUrl() {
  const referralInput = getById('referralCode');
  if (!referralInput) return;
  const params = new URLSearchParams(window.location.search);
  const code = normalizeReferralCode(params.get('ref'));
  if (code) referralInput.value = code;
}

function isAdminLoggedIn() {
  return localStorage.getItem(ADMIN_SESSION_KEY) === '1';
}

function setAdminLoggedIn(value) {
  if (value) {
    localStorage.setItem(ADMIN_SESSION_KEY, '1');
  } else {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

function showAdminMessage(message, isError = false) {
  if (!adminMessage) return;
  adminMessage.textContent = message || '';
  adminMessage.style.color = isError ? '#ffb4a6' : '#ffdf9a';
}

function adminRowValue(row, selector) {
  return row.querySelector(selector)?.value?.trim() || '';
}

function markManualTranslationField(field) {
  if (!field) return;
  const currentAutoValue = field.dataset.autoTranslation || '';
  field.dataset.manualTranslation = field.value.trim() && field.value !== currentAutoValue ? '1' : '0';
}

function updateTranslatedField(field, value, force = false) {
  if (!field) return;
  const translatedValue = autoTranslateText(value);
  const currentAutoValue = field.dataset.autoTranslation || '';
  const wasEditedManually = field.dataset.manualTranslation === '1' && field.value !== currentAutoValue;

  if (!force && wasEditedManually && field.value.trim()) return;

  field.value = translatedValue;
  field.dataset.autoTranslation = translatedValue;
  field.dataset.manualTranslation = '0';
}

function primeTranslatedField(field) {
  if (!field) return;
  field.dataset.autoTranslation = field.value || '';
  field.dataset.manualTranslation = '0';
}

function translateAdminRow(row, force = false) {
  if (!row) return;
  const pairs = [
    ['[data-field="zh-site"]', '[data-field="en-site"]'],
    ['[data-field="zh-day"]', '[data-field="en-day"]'],
    ['[data-field="zh-dish"]', '[data-field="en-dish"]'],
    ['[data-field="zh-name"]', '[data-field="en-name"]'],
    ['[data-field="zh-price"]', '[data-field="en-price"]']
  ];

  pairs.forEach(([sourceSelector, targetSelector]) => {
    const source = row.querySelector(sourceSelector);
    const target = row.querySelector(targetSelector);
    if (source && target) updateTranslatedField(target, source.value, force);
  });
}

function autoTranslateAdminEditor(force = false) {
  if (weeklyNoteZh && weeklyNoteEn) {
    updateTranslatedField(weeklyNoteEn, weeklyNoteZh.value, force);
  }

  adminSiteRows?.querySelectorAll('[data-site-row]').forEach(row => translateAdminRow(row, force));
  adminWeeklyRows?.querySelectorAll('[data-weekly-row]').forEach(row => translateAdminRow(row, force));
  adminAddonRows?.querySelectorAll('[data-addon-row]').forEach(row => translateAdminRow(row, force));
}

function primeAdminTranslationFields() {
  primeTranslatedField(weeklyNoteEn);
  adminSiteRows?.querySelectorAll('[data-field="en-site"]').forEach(primeTranslatedField);
  adminWeeklyRows?.querySelectorAll('[data-field="en-day"], [data-field="en-dish"]').forEach(primeTranslatedField);
  adminAddonRows?.querySelectorAll('[data-field="en-name"], [data-field="en-price"]').forEach(primeTranslatedField);
}

function ensureAdminTranslateHelper() {
  if (!adminDashboard || document.getElementById('autoTranslateAdminContent')) return;
  const heading = adminDashboard.querySelector('.member-dashboard-head');
  if (!heading) return;

  const helper = document.createElement('div');
  helper.className = 'admin-auto-translate';
  helper.innerHTML = `
    <div>
      <strong>中文自动翻译英文</strong>
      <p>输入中文全站文案、菜单、菜色、加购或价格说明时，英文栏会自动生成；英文仍可手动微调。</p>
    </div>
    <button type="button" id="autoTranslateAdminContent">翻译全部英文</button>
  `;
  heading.insertAdjacentElement('afterend', helper);
  helper.querySelector('button')?.addEventListener('click', () => {
    autoTranslateAdminEditor(true);
    showAdminMessage('已根据中文内容重新生成英文。');
  });
}

function renderAdminSiteRows(content) {
  if (!adminSiteRows) return;

  adminSiteRows.innerHTML = SITE_CONTENT_FIELDS.map(field => {
    const zhValue = getPathValue(content.zh.site, field.path) ?? '';
    const enValue = getPathValue(content.en.site, field.path) ?? '';
    const inputTag = field.multiline ? 'textarea' : 'input';
    const zhField = field.multiline
      ? `<textarea data-field="zh-site" rows="3">${escapeHtml(zhValue)}</textarea>`
      : `<input data-field="zh-site" value="${escapeHtml(zhValue)}">`;
    const enField = field.multiline
      ? `<textarea data-field="en-site" rows="3">${escapeHtml(enValue)}</textarea>`
      : `<input data-field="en-site" value="${escapeHtml(enValue)}">`;

    return `
      <div class="admin-site-row ${inputTag === 'textarea' ? 'is-tall' : ''}" data-site-row data-site-path="${escapeHtml(field.path)}">
        <div class="admin-site-label">
          <strong>${escapeHtml(field.label)}</strong>
          <small>${escapeHtml(field.path)}</small>
        </div>
        <label>中文${zhField}</label>
        <label>English${enField}</label>
      </div>
    `;
  }).join('');
}

function renderAdminWeeklyRows(content) {
  if (!adminWeeklyRows) return;
  const maxRows = Math.max(content.zh.weekly.days.length, content.en.weekly.days.length, 1);
  const rows = [];

  for (let index = 0; index < maxRows; index += 1) {
    const zh = content.zh.weekly.days[index] || { day: '', dish: '' };
    const en = content.en.weekly.days[index] || { day: '', dish: '' };
    rows.push(`
      <div class="admin-row" data-weekly-row>
        <label>中文日期<input data-field="zh-day" value="${escapeHtml(zh.day)}" placeholder="星期一"></label>
        <label>中文菜色<input data-field="zh-dish" value="${escapeHtml(zh.dish)}" placeholder="酱油鸡 + 炒青菜 + 白饭"></label>
        <label>English Day<input data-field="en-day" value="${escapeHtml(en.day)}" placeholder="Monday"></label>
        <label>English Menu<input data-field="en-dish" value="${escapeHtml(en.dish)}" placeholder="Soy Sauce Chicken + Rice"></label>
        <button type="button" data-remove-weekly>删除</button>
      </div>
    `);
  }

  adminWeeklyRows.innerHTML = rows.join('');
}

function renderAdminAddonRows(content) {
  if (!adminAddonRows) return;
  const maxRows = Math.max(content.zh.addons.length, content.en.addons.length, 1);
  const rows = [];

  for (let index = 0; index < maxRows; index += 1) {
    const zh = content.zh.addons[index] || { name: '', sub: '', price: '' };
    const en = content.en.addons[index] || { name: '', sub: '', price: '' };
    rows.push(`
      <div class="admin-row two-line" data-addon-row>
        <label>中文名称<input data-field="zh-name" value="${escapeHtml(zh.name)}" placeholder="加蛋"></label>
        <label>English Name<input data-field="en-name" value="${escapeHtml(en.name || zh.sub)}" placeholder="Add Egg"></label>
        <label>中文价格<textarea data-field="zh-price" rows="2" placeholder="可询问">${escapeHtml(zh.price)}</textarea></label>
        <label>English Price<textarea data-field="en-price" rows="2" placeholder="Ask us">${escapeHtml(en.price)}</textarea></label>
        <button type="button" data-remove-addon>删除</button>
      </div>
    `);
  }

  adminAddonRows.innerHTML = rows.join('');
}

function renderAdminCateringRows(content) {
  if (adminCateringMinimum) {
    adminCateringMinimum.value = String(content.catering?.minimumTotal ?? CATERING_MINIMUM_TOTAL);
  }

  if (!adminCateringRows) return;
  const menu = normalizeCateringMenu(content.catering?.menu || CATERING_MENU);
  adminCateringRows.innerHTML = menu.map((category, index) => `
    <div class="admin-catering-row" data-catering-row>
      <div class="admin-catering-head">
        <strong>分类 ${index + 1}</strong>
        <span>${escapeHtml(category.label || category.id)}</span>
      </div>
      <label>分类 ID<input data-field="category-id" value="${escapeHtml(category.id)}" placeholder="chicken"></label>
      <label>中文分类<input data-field="category-title" value="${escapeHtml(category.title)}" placeholder="鸡肉类"></label>
      <label>English Label<input data-field="category-label" value="${escapeHtml(category.label)}" placeholder="Chicken"></label>
      <label>每人价格 RM<input data-field="category-rate" type="number" min="0" step="0.5" value="${escapeHtml(category.rate)}"></label>
      <label class="admin-catering-items">菜式列表（一行一个）
        <textarea data-field="category-items" rows="5">${escapeHtml(category.items.join('\n'))}</textarea>
      </label>
      <button type="button" data-remove-catering>删除分类</button>
    </div>
  `).join('');
}

function renderAdminEditor() {
  const content = loadAdminContent();
  ensureAdminTranslateHelper();
  renderAdminSiteRows(content);
  if (weeklyNoteZh) weeklyNoteZh.value = content.zh.weekly.note;
  if (weeklyNoteEn) weeklyNoteEn.value = content.en.weekly.note;
  renderAdminWeeklyRows(content);
  renderAdminAddonRows(content);
  renderAdminCateringRows(content);
  primeAdminTranslationFields();
}

function renderAdminState() {
  if (!adminAuthPanel || !adminDashboard) return;
  const loggedIn = isAdminLoggedIn();
  adminAuthPanel.hidden = loggedIn;
  adminDashboard.hidden = !loggedIn;
  if (loggedIn) {
    renderAdminEditor();
    renderAdminInquiries();
    renderAdminMembers();
  }
}

function openAdminModal() {
  if (!adminModal) return;
  adminModal.classList.add('open');
  adminModal.setAttribute('aria-hidden', 'false');
  adminModal.querySelector('.member-dialog')?.scrollTo({ top: 0 });
  showAdminMessage('');
  renderAdminState();
}

function shouldOpenAdminFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('admin') === '1' || window.location.hash === '#admin-login';
}

function closeAdminModal() {
  if (!adminModal) return;
  adminModal.classList.remove('open');
  adminModal.setAttribute('aria-hidden', 'true');
}

function collectAdminContent() {
  const content = defaultAdminContent();
  content.zh.site = siteContentDefaults('zh');
  content.en.site = siteContentDefaults('en');
  content.zh.weekly.note = weeklyNoteZh?.value?.trim() || '';
  content.en.weekly.note = weeklyNoteEn?.value?.trim() || '';
  content.zh.weekly.days = [];
  content.en.weekly.days = [];
  content.zh.addons = [];
  content.en.addons = [];

  adminSiteRows?.querySelectorAll('[data-site-row]').forEach(row => {
    const path = row.dataset.sitePath || '';
    const zhValue = adminRowValue(row, '[data-field="zh-site"]');
    const enValue = adminRowValue(row, '[data-field="en-site"]');
    if (path) {
      setPathValue(content.zh.site, path, zhValue);
      setPathValue(content.en.site, path, enValue);
    }
  });

  adminWeeklyRows?.querySelectorAll('[data-weekly-row]').forEach(row => {
    const zhDay = adminRowValue(row, '[data-field="zh-day"]');
    const zhDish = adminRowValue(row, '[data-field="zh-dish"]');
    const enDay = adminRowValue(row, '[data-field="en-day"]');
    const enDish = adminRowValue(row, '[data-field="en-dish"]');
    if (zhDay || zhDish) content.zh.weekly.days.push({ day: zhDay, dish: zhDish });
    if (enDay || enDish) content.en.weekly.days.push({ day: enDay, dish: enDish });
  });

  adminAddonRows?.querySelectorAll('[data-addon-row]').forEach(row => {
    const zhName = adminRowValue(row, '[data-field="zh-name"]');
    const enName = adminRowValue(row, '[data-field="en-name"]');
    const zhPrice = adminRowValue(row, '[data-field="zh-price"]');
    const enPrice = adminRowValue(row, '[data-field="en-price"]');
    if (zhName || enName || zhPrice) content.zh.addons.push({ name: zhName, sub: enName, price: zhPrice });
    if (enName || zhName || enPrice) content.en.addons.push({ name: enName || zhName, sub: '', price: enPrice || zhPrice });
  });

  const minimumTotal = Number.parseFloat(adminCateringMinimum?.value || '');
  content.catering = {
    minimumTotal: Number.isFinite(minimumTotal) ? Math.max(minimumTotal, 0) : CATERING_MINIMUM_TOTAL,
    menu: []
  };

  adminCateringRows?.querySelectorAll('[data-catering-row]').forEach((row, index) => {
    const id = adminRowValue(row, '[data-field="category-id"]') || `category-${index + 1}`;
    const title = adminRowValue(row, '[data-field="category-title"]');
    const label = adminRowValue(row, '[data-field="category-label"]');
    const rate = Number.parseFloat(adminRowValue(row, '[data-field="category-rate"]')) || 0;
    const items = adminRowValue(row, '[data-field="category-items"]')
      .split(/\n+/)
      .map(item => item.trim())
      .filter(Boolean);
    if (title || label || items.length) content.catering.menu.push({ id, title, label, rate, items });
  });

  return normalizeAdminContent(content);
}

function addWeeklyEditorRow() {
  const content = collectAdminContent();
  content.zh.weekly.days.push({ day: '', dish: '' });
  content.en.weekly.days.push({ day: '', dish: '' });
  if (weeklyNoteZh) weeklyNoteZh.value = content.zh.weekly.note;
  if (weeklyNoteEn) weeklyNoteEn.value = content.en.weekly.note;
  renderAdminWeeklyRows(content);
  renderAdminAddonRows(content);
  renderAdminCateringRows(content);
  primeAdminTranslationFields();
}

function addAddonEditorRow() {
  const content = collectAdminContent();
  content.zh.addons.push({ name: '', sub: '', price: '可询问\nAsk us' });
  content.en.addons.push({ name: '', sub: '', price: 'Ask us' });
  if (weeklyNoteZh) weeklyNoteZh.value = content.zh.weekly.note;
  if (weeklyNoteEn) weeklyNoteEn.value = content.en.weekly.note;
  renderAdminWeeklyRows(content);
  renderAdminAddonRows(content);
  renderAdminCateringRows(content);
  primeAdminTranslationFields();
}

function addCateringEditorRow() {
  const content = collectAdminContent();
  content.catering.menu.push({
    id: `custom-${content.catering.menu.length + 1}`,
    title: '',
    label: '',
    rate: 0,
    items: []
  });
  renderAdminSiteRows(content);
  if (weeklyNoteZh) weeklyNoteZh.value = content.zh.weekly.note;
  if (weeklyNoteEn) weeklyNoteEn.value = content.en.weekly.note;
  renderAdminWeeklyRows(content);
  renderAdminAddonRows(content);
  renderAdminCateringRows(content);
  primeAdminTranslationFields();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

window.addEventListener('scroll', () => {
  if (!backTop) return;
  backTop.style.display = window.scrollY > 500 ? 'grid' : 'none';
});

backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

if ('IntersectionObserver' in window && form) {
  const orderVisibilityObserver = new IntersectionObserver(entries => {
    const isVisible = entries.some(entry => entry.isIntersecting);
    document.body.classList.toggle('order-form-visible', isVisible);
  }, { rootMargin: '-20% 0px -28% 0px', threshold: 0.01 });
  orderVisibilityObserver.observe(form);
}

memberOpen?.addEventListener('click', () => {
  navLinks?.classList.remove('open');
  openMemberModal();
});

document.querySelectorAll('[data-member-close]').forEach(element => {
  element.addEventListener('click', closeMemberModal);
});

document.querySelectorAll('[data-admin-close]').forEach(element => {
  element.addEventListener('click', closeAdminModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMemberModal();
    closeAdminModal();
  }
});

document.querySelectorAll('[data-member-tab]').forEach(button => {
  button.addEventListener('click', () => setMemberTab(button.dataset.memberTab));
});

memberRegisterForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const t = languageText();
  const name = fieldValue('registerName');
  const phone = fieldValue('registerPhone');
  const email = fieldValue('registerEmail').toLowerCase();
  const password = fieldValue('registerPassword');
  const referredByCode = normalizeReferralCode(fieldValue('referralCode') || new URLSearchParams(window.location.search).get('ref'));

  if (!name || !phone || !email || password.length < 6) {
    showMemberMessage(t.member.messages.required, true);
    return;
  }

  const members = loadMembers();
  if (members.some(member => member.email === email)) {
    showMemberMessage(t.member.messages.duplicate, true);
    setMemberTab('login');
    return;
  }

  const referralCode = createReferralCode(name, email);
  const localMember = {
    name,
    phone,
    email,
    password: encodePassword(password),
    referralCode,
    referredByCode,
    referralRewards: [],
    records: [],
    createdAt: new Date().toISOString()
  };
  members.push(localMember);
  saveMembers(members);
  setCurrentMember(email);
  memberRegisterForm.reset();
  showMemberMessage(t.member.messages.registerSuccess);
  renderMemberState();

  try {
    const cloud = await supabaseMemberSignUp({
      name,
      phone,
      email,
      password,
      referralCode,
      referredByCode
    });
    if (cloud.ok && cloud.session) {
      const profile = await loadSupabaseMemberProfile(cloud.session);
      mergeSupabaseProfileToLocalMember(profile, cloud.session, { name, phone, email, password: encodePassword(password), referredByCode });
      await updateSupabaseMemberProfile(getCurrentMember(), cloud.session);
      showMemberMessage(currentLanguage === 'en'
        ? 'Member created and synced to Supabase.'
        : '会员已创建，并已同步 Supabase。');
      refreshSupabaseMemberData();
    } else if (cloud.ok) {
      showMemberMessage(currentLanguage === 'en'
        ? 'Member created locally. Supabase may require email confirmation before cloud login.'
        : '会员已建立在本地；Supabase 可能需要 Email 确认后才可云端登录。');
    }
  } catch (error) {
    console.warn('Supabase member signup failed', error);
    showMemberMessage(currentLanguage === 'en'
      ? 'Member created locally. Cloud sync will be retried after Supabase is ready.'
      : '会员已建立在本地。Supabase 设置完成后可再登录同步。');
  }
});

memberLoginForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const t = languageText();
  const email = fieldValue('loginEmail').toLowerCase();
  const password = fieldValue('loginPassword');
  let member = loadMembers().find(item => item.email === email && item.password === encodePassword(password));

  if (!member) {
    try {
      const cloud = await supabaseMemberSignIn(email, password);
      if (cloud.ok && cloud.session) {
        const profile = await loadSupabaseMemberProfile(cloud.session);
        member = mergeSupabaseProfileToLocalMember(profile, cloud.session, { email, password: encodePassword(password) });
        await refreshSupabaseMemberData();
      }
    } catch (error) {
      console.warn('Supabase member login failed', error);
    }
  } else {
    try {
      const cloud = await supabaseMemberSignIn(email, password);
      if (cloud.ok && cloud.session) {
        const profile = await loadSupabaseMemberProfile(cloud.session);
        member = mergeSupabaseProfileToLocalMember(profile, cloud.session, {
          name: member.name,
          phone: member.phone,
          email,
          password: member.password,
          referredByCode: member.referredByCode
        });
        await updateSupabaseMemberProfile(member, cloud.session);
        refreshSupabaseMemberData();
      }
    } catch (error) {
      console.warn('Supabase member login sync failed', error);
    }
  }

  if (!member) {
    showMemberMessage(t.member.messages.loginError, true);
    return;
  }

  setCurrentMember(email);
  memberLoginForm.reset();
  showMemberMessage(t.member.messages.loginSuccess);
  renderMemberState();
});

memberLogout?.addEventListener('click', () => {
  setCurrentMember('');
  setSupabaseMemberSession(null);
  renderMemberState();
  setMemberTab('login');
});

clearMemberRecords?.addEventListener('click', () => {
  const email = currentMemberEmail();
  if (!email) return;
  const members = loadMembers();
  const member = members.find(item => item.email === email);
  if (!member) return;
  member.records = [];
  saveMembers(members);
  renderMemberState();
});

clearReferralRewards?.addEventListener('click', () => {
  const email = currentMemberEmail();
  if (!email) return;
  const members = loadMembers();
  const member = members.find(item => item.email === email);
  if (!member) return;
  member.referralRewards = [];
  saveMembers(members);
  renderMemberState();
});

copyReferralCode?.addEventListener('click', async () => {
  const member = getCurrentMember();
  const t = languageText();
  if (!member) return;
  try {
    await copyText(normalizeReferralCode(member.referralCode));
    showMemberMessage(t.member.messages.copied);
  } catch (error) {
    showMemberMessage(t.member.messages.copyFail, true);
  }
});

copyOrderPreview?.addEventListener('click', async () => {
  const t = languageText();
  try {
    await copyText(buildOrderMessage(collectOrderData()));
    copyOrderPreview.textContent = t.order.copiedPreview;
    window.setTimeout(() => {
      copyOrderPreview.textContent = languageText().order.copyPreview;
    }, 1600);
  } catch (error) {
    copyOrderPreview.textContent = t.order.copyPreview;
  }
});

adminLoginForm?.addEventListener('submit', async event => {
  event.preventDefault();
  if (isAdminLocked()) {
    const minutes = Math.ceil((adminLockUntil() - Date.now()) / 60000);
    showAdminMessage(`登录尝试太多，请 ${minutes} 分钟后再试。`, true);
    return;
  }

  const email = adminEmail?.value?.trim().toLowerCase();
  if (email === ADMIN_EMAIL && hashLocalSecret(adminPassword?.value || '') === ADMIN_PASSWORD_HASH) {
    clearAdminLoginGuard();
    const cloudLogin = await supabaseAdminSignIn(email, adminPassword?.value || '');
    setAdminLoggedIn(true);
    adminLoginForm.reset();
    showAdminMessage(cloudLogin.ok
      ? '登录成功，Supabase 云端也已连接。'
      : '登录成功，可以开始编辑内容。Supabase 尚未连接，会继续使用本地记录。');
    renderAdminState();
    return;
  }

  const locked = registerAdminLoginFailure();
  showAdminMessage(locked ? '登录错误太多，后台已锁定 5 分钟。' : '只有管理员账号可以进入后台。', true);
});

adminLogout?.addEventListener('click', () => {
  setAdminLoggedIn(false);
  setSupabaseSession(null);
  supabaseInquiriesCache = [];
  supabaseProfilesCache = [];
  supabaseRewardsCache = [];
  renderAdminState();
  showAdminMessage('');
});

addWeeklyRow?.addEventListener('click', addWeeklyEditorRow);
addAddonRow?.addEventListener('click', addAddonEditorRow);
addCateringRow?.addEventListener('click', addCateringEditorRow);

weeklyNoteZh?.addEventListener('input', () => updateTranslatedField(weeklyNoteEn, weeklyNoteZh.value));
weeklyNoteEn?.addEventListener('input', () => markManualTranslationField(weeklyNoteEn));

adminSiteRows?.addEventListener('input', event => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
  const field = target.dataset.field || '';
  const row = target.closest('[data-site-row]');

  if (field === 'en-site') {
    markManualTranslationField(target);
    return;
  }

  if (field === 'zh-site') translateAdminRow(row);
});

adminCateringMinimum?.addEventListener('input', () => {
  renderCateringMenu();
  renderCateringEstimate();
});

adminCateringRows?.addEventListener('input', () => {
  renderCateringMenu();
  renderCateringEstimate();
});

adminCateringRows?.addEventListener('click', event => {
  if (!(event.target instanceof HTMLElement) || !event.target.matches('[data-remove-catering]')) return;
  const row = event.target.closest('[data-catering-row]');
  row?.remove();
});

adminWeeklyRows?.addEventListener('click', event => {
  if (!(event.target instanceof HTMLElement) || !event.target.matches('[data-remove-weekly]')) return;
  const row = event.target.closest('[data-weekly-row]');
  row?.remove();
});

adminWeeklyRows?.addEventListener('input', event => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
  const field = target.dataset.field || '';
  const row = target.closest('[data-weekly-row]');

  if (field.startsWith('en-')) {
    markManualTranslationField(target);
    return;
  }

  if (field === 'zh-day' || field === 'zh-dish') translateAdminRow(row);
});

adminAddonRows?.addEventListener('click', event => {
  if (!(event.target instanceof HTMLElement) || !event.target.matches('[data-remove-addon]')) return;
  const row = event.target.closest('[data-addon-row]');
  row?.remove();
});

adminAddonRows?.addEventListener('input', event => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
  const field = target.dataset.field || '';
  const row = target.closest('[data-addon-row]');

  if (field.startsWith('en-')) {
    markManualTranslationField(target);
    return;
  }

  if (field === 'zh-name' || field === 'zh-price') translateAdminRow(row);
});

adminInquiries?.addEventListener('change', event => {
  if (!(event.target instanceof HTMLSelectElement) || !event.target.matches('[data-inquiry-status]')) return;
  const row = event.target.closest('[data-inquiry-id]');
  setInquiryStatus(row?.dataset.inquiryId || '', event.target.value);
});

adminMembers?.addEventListener('change', event => {
  if (!(event.target instanceof HTMLSelectElement) || !event.target.matches('[data-reward-status]')) return;
  const rewardId = event.target.dataset.cloudRewardId;
  if (rewardId) {
    setCloudReferralRewardStatus(rewardId, event.target.value);
    return;
  }
  setReferralRewardStatus(event.target.dataset.memberEmail || '', event.target.dataset.rewardIndex || '', event.target.value);
});

saveAdminContent?.addEventListener('click', async () => {
  const content = collectAdminContent();
  saveEditableContent(content);
  updateStaticLanguage();
  renderCateringMenu();
  renderCateringEstimate();
  renderAdminEditor();
  try {
    const cloudSaved = await saveAdminContentToSupabase(content);
    showAdminMessage(cloudSaved
      ? '内容已保存，首页已更新，并已同步 Supabase。'
      : '内容已保存，首页已更新。Supabase 尚未连接管理员权限，所以先保存在本地。');
  } catch (error) {
    console.warn('Supabase admin content save failed', error);
    showAdminMessage('内容已保存到本地，但暂时无法同步 Supabase。请检查 Supabase admin 权限。', true);
  }
});

resetAdminContent?.addEventListener('click', async () => {
  const defaults = defaultAdminContent();
  saveEditableContent(defaults);
  updateStaticLanguage();
  renderCateringMenu();
  renderCateringEstimate();
  renderAdminEditor();
  try {
    const cloudSaved = await saveAdminContentToSupabase(defaults);
    showAdminMessage(cloudSaved
      ? '已恢复默认菜单和加购内容，并已同步 Supabase。'
      : '已恢复默认菜单和加购内容。Supabase 尚未连接管理员权限，所以先保存在本地。');
  } catch (error) {
    console.warn('Supabase admin content reset failed', error);
    showAdminMessage('已恢复本地默认内容，但暂时无法同步 Supabase。请检查 Supabase admin 权限。', true);
  }
});

exportLocalData?.addEventListener('click', exportLocalBackup);

importLocalData?.addEventListener('click', () => {
  importLocalDataInput?.click();
});

importLocalDataInput?.addEventListener('change', event => {
  const file = event.target instanceof HTMLInputElement ? event.target.files?.[0] : null;
  importLocalBackup(file);
});

clearAdminInquiries?.addEventListener('click', () => {
  const confirmed = window.confirm(currentLanguage === 'en' ? 'Clear all local inquiries?' : '确定清空所有本地询问记录吗？');
  if (!confirmed) return;
  saveInquiries([]);
  renderAdminInquiries();
  showAdminMessage(currentLanguage === 'en' ? 'Local inquiries cleared.' : '本地询问记录已清空。');
});

document.querySelectorAll('[data-language-switch]').forEach(button => {
  button.addEventListener('click', () => {
    currentLanguage = button.dataset.languageSwitch === 'en' ? 'en' : 'zh';
    localStorage.setItem(LANG_KEY, currentLanguage);
    updateStaticLanguage();
  });
});

document.querySelectorAll('.choose-package').forEach(button => {
  button.addEventListener('click', () => {
    setPackageValue(button.dataset.package || '');
    renderOrderPreview();
    showOrderMessage('');
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

cateringMenuGrid?.addEventListener('change', renderCateringEstimate);
cateringPax?.addEventListener('input', renderCateringEstimate);
cateringServiceStyle?.addEventListener('change', renderCateringEstimate);
calculateCateringPrice?.addEventListener('click', () => {
  renderCateringEstimate();
  document.querySelector('.estimate-box')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

form?.addEventListener('input', () => {
  renderOrderPreview();
  showOrderMessage('');
});
form?.addEventListener('change', () => {
  renderOrderPreview();
  showOrderMessage('');
});

form?.addEventListener('submit', event => {
  event.preventDefault();
  const orderData = collectOrderData();
  const validationMessage = validateOrderData(orderData);
  if (validationMessage) {
    showOrderMessage(validationMessage, true);
    form.reportValidity?.();
    return;
  }

  saveInquiryForAdmin(orderData);
  saveReferralReward(orderData);
  saveInquiryForMember(orderData);
  renderOrderPreview();
  showOrderMessage(currentLanguage === 'en' ? 'WhatsApp is opening now.' : '正在打开 WhatsApp。');
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(orderData))}`;
  window.open(url, '_blank', 'noopener');
});

async function initializeApp() {
  await loadSupabaseRuntimeConfig();
  await loadAdminContentFromSupabase();
  renderCateringMenu();
  renderCateringEstimate();
  applyReferralCodeFromUrl();
  updateStaticLanguage();
  refreshSupabaseMemberData();
  if (shouldOpenAdminFromUrl()) {
    openAdminModal();
  }
}

initializeApp();
