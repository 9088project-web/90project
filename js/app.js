const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const backTop = document.getElementById('backTop');
const form = document.getElementById('orderForm');
const orderPreviewText = document.getElementById('orderPreviewText');
const copyOrderPreview = document.getElementById('copyOrderPreview');

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
const exportLocalData = document.getElementById('exportLocalData');
const importLocalData = document.getElementById('importLocalData');
const importLocalDataInput = document.getElementById('importLocalDataInput');
const clearAdminInquiries = document.getElementById('clearAdminInquiries');

const MEMBERS_KEY = 'np90_members_v1';
const INQUIRIES_KEY = 'np90_inquiries_v1';
const SESSION_KEY = 'np90_member_session_v1';
const LANG_KEY = 'np90_language_v1';
const ADMIN_CONTENT_KEY = 'np90_admin_content_v1';
const ADMIN_SESSION_KEY = 'np90_admin_session_v1';
const ADMIN_ATTEMPTS_KEY = 'np90_admin_attempts_v1';
const ADMIN_LOCK_KEY = 'np90_admin_lock_until_v1';
const ADMIN_EMAIL = 'admin@90project.local';
const ADMIN_PASSWORD_HASH = '3b523443';
const WHATSAPP_NUMBER = '601110977166';
const INQUIRY_STATUSES = ['new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'];

const translations = {
  zh: {
    htmlLang: 'zh-Hans',
    title: '九零食刻 90 PROJECT｜包伙食 · 外餐 · 活动餐饮 · 布置设计',
    description: '九零食刻 90 PROJECT - 包伙食、外餐、活动餐饮、布置设计。高级餐饮品牌服务，日常价格享受。',
    nav: {
      home: '首页',
      meal: '包伙食',
      catering: '外餐服务',
      packaging: '包装展示',
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
        { title: '直接推荐 1% 回馈', desc: '推荐朋友消费后，推荐人可获得该笔实际消费额 1% 的会员回馈，完成报价确认后记录。' },
        { title: '会员推荐码', desc: '登录会员中心即可查看自己的推荐码。朋友 WhatsApp 下单时填入推荐码，我们会协助登记。' }
      ],
      noteStrong: '透明规则：',
      note: '奖励只按直接推荐计算，不做层级累计；所有奖励以实际订单、付款与 WhatsApp 确认为准。',
      terms: [
        '朋友首次成功消费后，RM20 会记录为下次服务抵扣。',
        '1% 回馈只按直接推荐的已确认消费额计算。',
        '奖励不能兑换现金，最终以 WhatsApp 与管理员确认记录为准。'
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
      packaging: {
        label: 'BRANDING PACKAGING',
        title: '品牌级餐饮包装',
        desc: '不只是送餐，也让顾客收到一份有仪式感的餐饮体验。',
        tags: ['黑金纸袋', '白色餐盒', '黑金圆碗', '纸杯', '菜单卡', '贴纸', '名片'],
        button: '查看包装展示'
      },
      catering: {
        label: 'CATERING SERVICE',
        title: '外餐 Catering 服务',
        items: ['生日聚会 Birthday', '公司聚餐 Company Meal', '家庭聚会 Family Gathering', '开张活动 Grand Opening', '佛教会 / 社团活动', '小型 Buffet / Custom Catering'],
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
        ['1% 回馈', '直接推荐消费额待确认奖励']
      ],
      referralIntro: '把推荐码发给朋友。朋友下单时填入推荐码，完成消费后你可获得 RM20 抵扣与 1% 会员回馈。',
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
      packaging: 'Packaging',
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
        { title: '1% direct referral reward', desc: 'Receive 1% member reward based on the confirmed spending amount from your direct referral.' },
        { title: 'Member referral code', desc: 'Log in to your member centre to view your referral code. Your friend can enter it when ordering through WhatsApp.' }
      ],
      noteStrong: 'Clear rule:',
      note: 'Rewards are calculated for direct referrals only, with no tier accumulation. Final rewards depend on actual orders, payment and WhatsApp confirmation.',
      terms: [
        'RM20 is recorded as next-order credit after the friend completes a first purchase.',
        'The 1% reward is calculated from the confirmed spending of direct referrals only.',
        'Rewards cannot be exchanged for cash and depend on WhatsApp and admin confirmation.'
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
      packaging: {
        label: 'BRANDING PACKAGING',
        title: 'Branding-ready Catering Packaging',
        desc: 'It is not just food delivery. It is a thoughtful dining experience your customers can feel when they receive it.',
        tags: ['Black-gold paper bag', 'White meal box', 'Black-gold bowl', 'Paper cup', 'Menu card', 'Sticker', 'Name card'],
        button: 'View Packaging'
      },
      catering: {
        label: 'CATERING SERVICE',
        title: 'Catering Service',
        items: ['Birthday Party', 'Company Meal', 'Family Gathering', 'Grand Opening', 'Association Event', 'Small Buffet / Custom Catering'],
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
        ['1% Reward', 'Pending reward from direct referral spending']
      ],
      referralIntro: 'Share your referral code with friends. When they order with your code, you may receive RM20 credit and a 1% member reward.',
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

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function htmlToPlainText(value) {
  return String(value || '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
}

function formatMultiline(value) {
  return escapeHtml(String(value || '')).replace(/\n/g, '<br>');
}

function defaultAdminContent() {
  return {
    zh: {
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
      weekly: {
        days: translations.en.weekly.days.map(([day, dish]) => ({ day, dish })),
        note: htmlToPlainText(translations.en.weekly.note)
      },
      addons: translations.en.addons.list.map(item => ({
        name: item.label,
        sub: '',
        price: htmlToPlainText(translations.en.addons.priceHtml)
      }))
    }
  };
}

function normalizeAdminContent(content) {
  const defaults = defaultAdminContent();
  const normalized = cloneData(defaults);

  ['zh', 'en'].forEach(language => {
    const source = content?.[language] || {};
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

function editableContentForLanguage() {
  return loadAdminContent()[currentLanguage] || loadAdminContent().zh;
}

function languageText() {
  return translations[currentLanguage] || translations.zh;
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

  const tags = card.querySelector('.packaging-tags');
  if (tags && feature.tags) {
    tags.innerHTML = feature.tags.map(item => `<b>${escapeHtml(item)}</b>`).join('');
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
  setText('#navLinks a[href="#packaging"]', t.nav.packaging);
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

  updateFeatureCard('#packaging', t.features.packaging);
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
  if (isAdminLoggedIn()) renderAdminInquiries();
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
        <p>${currentLanguage === 'en' ? 'Fixed reward' : '固定奖励'}：RM20 ${currentLanguage === 'en' ? 'next-order credit' : '下次服务抵扣'}</p>
        <p>${currentLanguage === 'en' ? 'Spending reward' : '消费额回馈'}：${currentLanguage === 'en' ? '1% of confirmed spending, pending WhatsApp confirmation' : '实际消费额 1%（待 WhatsApp 确认订单金额）'}</p>
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

function renderAdminInquiries() {
  if (!adminInquiries) return;
  const inquiries = loadInquiries();
  const t = languageText();

  if (adminDataStatus) {
    adminDataStatus.textContent = currentLanguage === 'en'
      ? `${inquiries.length} local inquiries saved in this browser. Export JSON before changing devices.`
      : `这个浏览器目前保存 ${inquiries.length} 笔本地询问。更换电脑前建议先导出 JSON 备份。`;
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

function setInquiryStatus(id, status) {
  if (!INQUIRY_STATUSES.includes(status)) return;
  const inquiries = loadInquiries();
  const inquiry = inquiries.find(item => item.id === id);
  if (!inquiry) return;
  inquiry.status = status;
  inquiry.updatedAt = new Date().toISOString();
  saveInquiries(inquiries);
  renderAdminInquiries();
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
      renderAdminEditor();
      renderAdminInquiries();
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
}

function saveReferralReward(orderData) {
  const code = normalizeReferralCode(orderData.referralCode);
  if (!code) return;

  const members = loadMembers();
  const currentEmail = currentMemberEmail();
  const referrer = members.find(member => normalizeReferralCode(member.referralCode) === code);

  if (!referrer || referrer.email === currentEmail) return;

  referrer.referralRewards = referrer.referralRewards || [];
  referrer.referralRewards.unshift({
    createdAt: new Date().toISOString(),
    referredName: orderData.name || (currentLanguage === 'en' ? 'New customer' : '新顾客'),
    package: orderData.package || (currentLanguage === 'en' ? 'Meal plan / catering inquiry' : '包伙食 / 外餐询问'),
    fixedCredit: 20,
    ratePercent: 1,
    status: '待确认'
  });
  referrer.referralRewards = referrer.referralRewards.slice(0, 30);
  saveMembers(members);
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

function renderAdminEditor() {
  const content = loadAdminContent();
  if (weeklyNoteZh) weeklyNoteZh.value = content.zh.weekly.note;
  if (weeklyNoteEn) weeklyNoteEn.value = content.en.weekly.note;
  renderAdminWeeklyRows(content);
  renderAdminAddonRows(content);
}

function renderAdminState() {
  if (!adminAuthPanel || !adminDashboard) return;
  const loggedIn = isAdminLoggedIn();
  adminAuthPanel.hidden = loggedIn;
  adminDashboard.hidden = !loggedIn;
  if (loggedIn) {
    renderAdminEditor();
    renderAdminInquiries();
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
  content.zh.weekly.note = weeklyNoteZh?.value?.trim() || '';
  content.en.weekly.note = weeklyNoteEn?.value?.trim() || '';
  content.zh.weekly.days = [];
  content.en.weekly.days = [];
  content.zh.addons = [];
  content.en.addons = [];

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
}

function addAddonEditorRow() {
  const content = collectAdminContent();
  content.zh.addons.push({ name: '', sub: '', price: '可询问\nAsk us' });
  content.en.addons.push({ name: '', sub: '', price: 'Ask us' });
  if (weeklyNoteZh) weeklyNoteZh.value = content.zh.weekly.note;
  if (weeklyNoteEn) weeklyNoteEn.value = content.en.weekly.note;
  renderAdminWeeklyRows(content);
  renderAdminAddonRows(content);
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

memberRegisterForm?.addEventListener('submit', event => {
  event.preventDefault();
  const t = languageText();
  const name = fieldValue('registerName');
  const phone = fieldValue('registerPhone');
  const email = fieldValue('registerEmail').toLowerCase();
  const password = fieldValue('registerPassword');

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

  members.push({
    name,
    phone,
    email,
    password: encodePassword(password),
    referralCode: createReferralCode(name, email),
    referralRewards: [],
    records: [],
    createdAt: new Date().toISOString()
  });
  saveMembers(members);
  setCurrentMember(email);
  memberRegisterForm.reset();
  showMemberMessage(t.member.messages.registerSuccess);
  renderMemberState();
});

memberLoginForm?.addEventListener('submit', event => {
  event.preventDefault();
  const t = languageText();
  const email = fieldValue('loginEmail').toLowerCase();
  const password = fieldValue('loginPassword');
  const member = loadMembers().find(item => item.email === email && item.password === encodePassword(password));

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

adminLoginForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (isAdminLocked()) {
    const minutes = Math.ceil((adminLockUntil() - Date.now()) / 60000);
    showAdminMessage(`登录尝试太多，请 ${minutes} 分钟后再试。`, true);
    return;
  }

  const email = adminEmail?.value?.trim().toLowerCase();
  if (email === ADMIN_EMAIL && hashLocalSecret(adminPassword?.value || '') === ADMIN_PASSWORD_HASH) {
    clearAdminLoginGuard();
    setAdminLoggedIn(true);
    adminLoginForm.reset();
    showAdminMessage('登录成功，可以开始编辑内容。');
    renderAdminState();
    return;
  }

  const locked = registerAdminLoginFailure();
  showAdminMessage(locked ? '登录错误太多，后台已锁定 5 分钟。' : '只有管理员账号可以进入后台。', true);
});

adminLogout?.addEventListener('click', () => {
  setAdminLoggedIn(false);
  renderAdminState();
  showAdminMessage('');
});

addWeeklyRow?.addEventListener('click', addWeeklyEditorRow);
addAddonRow?.addEventListener('click', addAddonEditorRow);

adminWeeklyRows?.addEventListener('click', event => {
  if (!(event.target instanceof HTMLElement) || !event.target.matches('[data-remove-weekly]')) return;
  const row = event.target.closest('[data-weekly-row]');
  row?.remove();
});

adminAddonRows?.addEventListener('click', event => {
  if (!(event.target instanceof HTMLElement) || !event.target.matches('[data-remove-addon]')) return;
  const row = event.target.closest('[data-addon-row]');
  row?.remove();
});

adminInquiries?.addEventListener('change', event => {
  if (!(event.target instanceof HTMLSelectElement) || !event.target.matches('[data-inquiry-status]')) return;
  const row = event.target.closest('[data-inquiry-id]');
  setInquiryStatus(row?.dataset.inquiryId || '', event.target.value);
});

saveAdminContent?.addEventListener('click', () => {
  saveEditableContent(collectAdminContent());
  updateStaticLanguage();
  renderAdminEditor();
  showAdminMessage('内容已保存，首页已更新。');
});

resetAdminContent?.addEventListener('click', () => {
  localStorage.removeItem(ADMIN_CONTENT_KEY);
  updateStaticLanguage();
  renderAdminEditor();
  showAdminMessage('已恢复默认菜单和加购内容。');
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
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

form?.addEventListener('input', renderOrderPreview);
form?.addEventListener('change', renderOrderPreview);

form?.addEventListener('submit', event => {
  event.preventDefault();
  const orderData = collectOrderData();
  saveInquiryForAdmin(orderData);
  saveReferralReward(orderData);
  saveInquiryForMember(orderData);
  renderOrderPreview();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(orderData))}`;
  window.open(url, '_blank', 'noopener');
});

applyReferralCodeFromUrl();
updateStaticLanguage();
if (shouldOpenAdminFromUrl()) {
  openAdminModal();
}
