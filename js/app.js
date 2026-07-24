const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const backTop = document.getElementById('backTop');
const scrollProgress = document.getElementById('scrollProgress');
const siteHeader = document.querySelector('.site-header');
const heroImage = document.querySelector('.hero-media img');
const serviceStrip = document.querySelector('.service-strip');
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
const memberReferralLink = document.getElementById('memberReferralLink');
const memberReferralQr = document.getElementById('memberReferralQr');
const copyReferralCode = document.getElementById('copyReferralCode');
const copyReferralLink = document.getElementById('copyReferralLink');
const shareReferralWhatsApp = document.getElementById('shareReferralWhatsApp');
const memberReferralRewards = document.getElementById('memberReferralRewards');
const clearReferralRewards = document.getElementById('clearReferralRewards');
const memberTierBadge = document.getElementById('memberTierBadge');
const memberTierProgress = document.getElementById('memberTierProgress');
const memberRewardSummary = document.getElementById('memberRewardSummary');
const memberNextAction = document.getElementById('memberNextAction');
const memberProfileForm = document.getElementById('memberProfileForm');
const profileName = document.getElementById('profileName');
const profilePhone = document.getElementById('profilePhone');
const profileArea = document.getElementById('profileArea');
const profileDefaultPackage = document.getElementById('profileDefaultPackage');
const profilePreference = document.getElementById('profilePreference');
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
const adminCaseRows = document.getElementById('adminCaseRows');
const addCaseRow = document.getElementById('addCaseRow');
const adminVideoTitle = document.getElementById('adminVideoTitle');
const adminVideoLabel = document.getElementById('adminVideoLabel');
const adminVideoSrc = document.getElementById('adminVideoSrc');
const adminVideoPoster = document.getElementById('adminVideoPoster');
const adminVideoDesc = document.getElementById('adminVideoDesc');
const adminVideoCta = document.getElementById('adminVideoCta');
const adminHomepageRows = document.getElementById('adminHomepageRows');
const adminDetailRows = document.getElementById('adminDetailRows');
const adminConversions = document.getElementById('adminConversions');
const adminConversionStatus = document.getElementById('adminConversionStatus');
const clearConversionEvents = document.getElementById('clearConversionEvents');
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
const cateringMenuBuilder = document.getElementById('cateringMenuBuilder');
const cateringComboPresets = document.getElementById('cateringComboPresets');
const cateringSelectionNotice = document.getElementById('cateringSelectionNotice');
const mealStartDate = document.getElementById('mealStartDate');
const mealEndDate = document.getElementById('mealEndDate');
const mealPeriodSummary = document.getElementById('mealPeriodSummary');
const stylingCasesSection = document.getElementById('styling-cases');
const stylingCaseCards = Array.from(document.querySelectorAll('[data-case-card]'));
const caseShowcaseMedia = document.querySelector('[data-case-lightbox-open]');
const caseFeaturedImage = document.querySelector('[data-case-featured]');
const caseCounter = document.querySelector('[data-case-counter]');
const caseLabel = document.querySelector('[data-case-label]');
const caseTitle = document.querySelector('[data-case-title]');
const caseDesc = document.querySelector('[data-case-desc]');
const caseProgress = document.querySelector('[data-case-progress]');
const casePlayToggle = document.querySelector('[data-case-play]');
const caseLightbox = document.getElementById('caseLightbox');
const caseLightboxImg = document.querySelector('[data-case-lightbox-img]');
const caseLightboxLabel = document.querySelector('[data-case-lightbox-label]');
const caseLightboxTitle = document.querySelector('[data-case-lightbox-title]');
const videoSpotSection = document.getElementById('video-spot');
const brandVideo = document.getElementById('brandVideo');
const videoPlaceholder = document.getElementById('videoPlaceholder');

const heroSection = heroImage?.closest('.hero');
if (serviceStrip && heroSection) {
  heroSection.before(serviceStrip);
}

const MEMBERS_KEY = 'np90_members_v1';
const INQUIRIES_KEY = 'np90_inquiries_v1';
const SESSION_KEY = 'np90_member_session_v1';
const GROWTH_SESSION_KEY = 'np90_growth_session_v1';
const GROWTH_STATE_KEY = 'np90_growth_state_v1';
const GROWTH_ORDER_QUEUE_KEY = 'np90_growth_order_queue_v1';
const LANG_KEY = 'np90_language_v1';
const ADMIN_CONTENT_KEY = 'np90_admin_content_v1';
const ADMIN_SESSION_KEY = 'np90_admin_session_v1';
const ADMIN_ATTEMPTS_KEY = 'np90_admin_attempts_v1';
const ADMIN_LOCK_KEY = 'np90_admin_lock_until_v1';
const SUPABASE_SESSION_KEY = 'np90_supabase_session_v1';
const SUPABASE_MEMBER_SESSION_KEY = 'np90_supabase_member_session_v1';
const CONVERSION_EVENTS_KEY = 'np90_conversion_events_v1';
const LEAD_SOURCE_KEY = 'np90_lead_source_v1';
const ADMIN_CONTENT_SETTING_KEY = 'admin_content';
const ADMIN_EMAIL = '9088project@gmail.com';
const ADMIN_PASSWORD_HASH = '3b523443';
const WHATSAPP_NUMBER = '60189490909';
const MEAL_PLAN_RATE = 15;
const INQUIRY_STATUSES = ['new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'];
const REFERRAL_REWARD_STATUSES = ['pending', 'approved', 'redeemed', 'cancelled'];
const MEMBER_STATUSES = ['active', 'vip', 'blocked'];
const MEMBER_TIERS = ['Classic', 'Gold', 'Black Gold'];
const REFERRAL_LEVEL_RATES = [3, 1, 1];
const CATERING_MINIMUM_TOTAL = 300;
const STYLING_CASE_DELAY = 5200;
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
let activeStylingCase = 0;
let stylingCaseTimer = null;
let stylingCaseProgressFrame = null;
let stylingCasePlaying = !prefersReducedMotion;
const CATERING_SERVICE_STYLES = {
  packed: { label: '餐盒 / Packed Meal', multiplier: 1 },
  buffet: { label: '小型 Buffet / Setup', multiplier: 1.12 },
  event: { label: '活动餐饮 / Event Catering', multiplier: 1.18 }
};
const CATERING_SELECTION_LIMITS = {
  staple: 1,
  vegetable: 4,
  protein: 2,
  dessert: 1
};
const CATERING_SELECTION_LABELS = {
  staple: '主食',
  vegetable: '蔬菜 / 豆腐',
  protein: '肉类 / 鱼虾',
  dessert: '甜品'
};
const CATERING_MARKET_PRICE_ITEMS = new Set(['香煎鳕鱼']);
let cateringMenuMode = 'buffet';
const CATERING_MENU = [
  {
    id: 'staple',
    title: '主食',
    label: 'Staple',
    rate: 4.5,
    items: ['腊肠炒饭', '蛋炒饭', '福建面', '炒米粉', '扬州炒饭', '干炒河粉', '白饭']
  },
  {
    id: 'porridge',
    title: '汤类 / 粥类',
    label: 'Soup / Porridge',
    rate: 4.5,
    items: ['皮蛋瘦肉粥', '鸡丝粥']
  },
  {
    id: 'vegetable',
    title: '蔬菜类',
    label: 'Vegetables',
    rate: 4.5,
    items: ['炒什锦菜', '干煸四季豆', 'Salad', '娘惹阿杂', '蒜蓉西兰花', '清炒小白菜', '蒜蓉小白菜', '蒜蓉菜心', '奶油杂菜', '蚝油生菜', '蒜蓉菠菜', '炒高丽菜']
  },
  {
    id: 'chicken',
    title: '鸡肉类',
    label: 'Chicken',
    rate: 7.5,
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
    rate: 9,
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
    id: 'fried',
    title: '炸料类',
    label: 'Fried Items',
    rate: 4.5,
    items: ['炸鱼饼', '韩式鱼饼', '炸豆腐', '春卷', '迷你咖喱角']
  },
  {
    id: 'flavour',
    title: '风味搭配（鸡 / 猪 / 鱼 / 虾）',
    label: 'Sauce Style',
    rate: 0,
    items: ['咖喱 Curry', 'Sambal', '咸蛋奶油 Salted Egg Butter', '宫保 Kung Pao', '泰式酸辣 Thai Style', 'Sweet & Sour', '姜葱 Ginger Onion', '麦片 Cereal', '椒盐 Salt & Pepper']
  },
  {
    id: 'dessert',
    title: '甜品',
    label: 'Dessert',
    rate: 3.5,
    items: ['焦糖布丁', '水果拼盘', '椰香西米露', '迷你泡芙']
  },
  {
    id: 'beverage',
    title: '饮料',
    label: 'Beverage',
    rate: 2.5,
    items: ['柠檬茶', '玫瑰饮', '咖啡与茶', '矿泉水']
  }
];

const LEGACY_CATERING_RATES = {
  staple: 3,
  porridge: 4,
  chicken: 7,
  prawn: 11
};

const CATERING_COMBOS = [
  {
    id: 'set-a',
    title: 'Set A',
    label: 'SET A',
    price: 'RM29.90',
    desc: '主食 2 · 肉类 2 · 菜类 / 豆腐 / 炸料 2',
    pax: 30,
    service: 'packed',
    items: ['腊肠炒饭', '炒米粉', '咖喱鸡', '黑胡椒鸡扒', '蒜蓉小白菜', '泰式豆腐']
  },
  {
    id: 'set-b',
    title: 'Set B',
    label: 'SET B',
    price: 'RM32.90',
    desc: '主食 2 · 肉类 1 · 菜类 / 炸料 / 豆腐 2 · 海鲜 1',
    pax: 30,
    service: 'packed',
    items: ['蛋炒饭', '福建面', 'Ginger Onion Chicken', '蒜蓉西兰花', '红烧豆腐', '炸鱼柳']
  },
  {
    id: 'set-c',
    title: 'Set C',
    label: 'SET C',
    price: 'RM39.90',
    desc: '主食 2 · 肉类 2 · 菜类 / 炸料 / 豆腐 2 · 海鲜 1',
    pax: 30,
    service: 'packed',
    items: ['扬州炒饭', '干炒河粉', '香料炸鸡', '糖醋肉', '炒高丽菜', '蒜蓉菠菜', '麦片虾']
  },
  {
    id: 'set-d',
    title: 'Set D',
    label: 'SET D',
    price: 'RM43.90',
    desc: '主食 2 · 肉类 2 · 海鲜 1 · 菜类 / 炸料 / 豆腐 3',
    pax: 30,
    service: 'packed',
    items: ['白饭', '炒米粉', '姜葱肉片', '黑胡椒鸡扒', '咸蛋奶油虾', '奶油杂菜', '蚝油生菜', '蒜蓉菜心']
  }
];

const DEFAULT_STYLING_CASES = [
  {
    label: 'BRAND BACKDROP',
    title: '品牌背景布置',
    desc: '黑金主视觉、灯光、花艺与品牌 Logo 统一呈现，适合开张、晚宴与活动入口拍照区。',
    image: 'assets/images/event/styling-backdrop.webp',
    alt: '九零食刻黑金活动背景布置展示图'
  },
  {
    label: 'TABLE STYLING',
    title: '餐桌花艺布置',
    desc: '花艺、烛光、餐具与菜单卡搭配，提升生日、私人聚会和小型宴会的仪式感。',
    image: 'assets/images/event/styling-floral-table.webp',
    alt: '黑金餐桌花艺与餐桌布置展示图'
  },
  {
    label: 'FOOD DISPLAY',
    title: '餐饮展示台',
    desc: '适合生日、公司活动、开张仪式、小型 Buffet 与社团聚会，菜色与品牌摆设一起呈现。',
    image: 'assets/images/event/catering-display-case.webp',
    alt: '九零食刻外餐餐饮展示台与 Buffet 摆设'
  },
  {
    label: 'PHOTO LOUNGE',
    title: '拍照区与氛围设计',
    desc: '沙发区、气球、灯光与背景板整合，给来宾一个自然打卡和拍照的位置。',
    image: 'assets/images/event/styling-photo-lounge.webp',
    alt: '黑金活动拍照区和气球布置展示图'
  },
  {
    label: 'MOCKTAIL BAR',
    title: 'Mocktail / Beverage Bar',
    desc: '主推无酒精特调、迎宾饮料与水果饮品，适合家庭活动、公司活动和品牌聚会。',
    image: 'assets/images/event/mocktail-bar-case.webp',
    alt: 'Mocktail 饮料吧和无酒精特调展示图'
  },
  {
    label: 'MENU DETAIL',
    title: '菜单卡与餐桌细节',
    desc: '菜单卡、桌牌、餐具与小物统一视觉，让餐饮服务更像完整品牌体验。',
    image: 'assets/images/event/table-menu-detail.webp',
    alt: '黑金餐桌菜单卡与餐具细节展示图'
  }
];

const DEFAULT_VIDEO_CONTENT = {
  label: 'VIDEO AD SPACE',
  title: '视频投放素材区',
  desc: '这里预留给你自己拍摄的品牌短视频，可用于 Facebook、Instagram、TikTok 和 WhatsApp 分享。',
  cta: '用这个视频引导下单',
  src: 'ads/media/your-video.mp4',
  poster: 'assets/images/brand/hero-banquet.jpg'
};

const DEFAULT_WEEKDAYS = [
  { zh: '星期一', en: 'Monday' },
  { zh: '星期二', en: 'Tuesday' },
  { zh: '星期三', en: 'Wednesday' },
  { zh: '星期四', en: 'Thursday' },
  { zh: '星期五', en: 'Friday' },
  { zh: '星期六', en: 'Saturday' },
  { zh: '星期日', en: 'Sunday' }
];

const DEFAULT_WEEKLY_MENU = [
  { day: 'Day 1', zh: '宫保鸡丁\n菜脯煎蛋\n蒜蓉小白菜', en: 'Kung Pao Chicken\nPreserved Radish Omelet\nGarlic Bok Choy', image: 'assets/images/reference-series/weekly-menu/day-01.png', alt: 'Day 1 宫保鸡丁、菜脯煎蛋与蒜蓉小白菜餐盘' },
  { day: 'Day 2', zh: '韩式辣猪肉\n香煎鱼柳\n清炒西兰花红萝卜', en: 'Korean Spicy Pork\nPan-seared Fish Fillet\nBroccoli & Carrot', image: 'assets/images/reference-series/weekly-menu/day-02.png', alt: 'Day 2 韩式辣猪肉、香煎鱼柳与西兰花红萝卜餐盘' },
  { day: 'Day 3', zh: '黑椒鸡扒\n奶油蘑菇意大利面\n蒜蓉菜心', en: 'Black Pepper Chicken Chop\nCreamy Mushroom Spaghetti\nGarlic Choy Sum', image: 'assets/images/reference-series/weekly-menu/day-03.png', alt: 'Day 3 黑椒鸡扒、奶油蘑菇意大利面与蒜蓉菜心餐盘' },
  { day: 'Day 4', zh: '蒜香奶油虾\n日本豆腐\n奶油玉米青豆', en: 'Garlic Butter Prawns\nJapanese Tofu\nCreamy Corn & Peas', image: 'assets/images/reference-series/weekly-menu/day-04.png', alt: 'Day 4 蒜香奶油虾、日本豆腐与奶油玉米青豆餐盘' },
  { day: 'Day 5', zh: '姜葱鸡\n卤肉豆干\n蚝油奶白菜', en: 'Ginger Scallion Chicken\nBraised Pork & Dried Tofu\nOyster Sauce Napa Cabbage', image: 'assets/images/reference-series/weekly-menu/day-05.png', alt: 'Day 5 姜葱鸡、卤肉豆干与蚝油奶白菜餐盘' },
  { day: 'Day 6', zh: '糖醋排骨\n炸鱼饼\n清炒包菜木耳', en: 'Sweet & Sour Pork Ribs\nFried Fish Cake\nCabbage & Wood Ear Mushrooms', image: 'assets/images/reference-series/weekly-menu/day-06.png', alt: 'Day 6 糖醋排骨、炸鱼饼与包菜木耳餐盘' },
  { day: 'Day 7', zh: '韩式炸鸡\n韩式泡菜豆腐\n韩式炒豆芽', en: 'Korean Fried Chicken\nKimchi Tofu\nKorean Bean Sprouts', image: 'assets/images/reference-series/weekly-menu/day-07.png', alt: 'Day 7 韩式炸鸡、泡菜豆腐与炒豆芽餐盘' },
  { day: 'Day 8', zh: '香煎柠檬鱼柳\n香蒜意大利面\n蒜蓉菠菜', en: 'Pan-seared Lemon Fish\nGarlic Spaghetti\nGarlic Spinach', image: 'assets/images/reference-series/weekly-menu/day-08.png', alt: 'Day 8 香煎柠檬鱼柳、香蒜意大利面与蒜蓉菠菜餐盘' },
  { day: 'Day 9', zh: 'Marmite鸡\n马铃薯焖肉碎\n清炒四季豆', en: 'Marmite Chicken\nBraised Minced Pork & Potato\nStir-fried Long Beans', image: 'assets/images/reference-series/weekly-menu/day-09.png', alt: 'Day 9 Marmite鸡、马铃薯焖肉碎与四季豆餐盘' },
  { day: 'Day 10', zh: '日式照烧猪肉\n玉子烧\n蒜香西兰花', en: 'Japanese Teriyaki Pork\nTamagoyaki\nGarlic Broccoli', image: 'assets/images/reference-series/weekly-menu/day-10.png', alt: 'Day 10 日式照烧猪肉、玉子烧与蒜香西兰花餐盘' },
  { day: 'Day 11', zh: '麦片虾\n日本咖喱薯仔\n清炒高丽菜', en: 'Oat Cereal Prawns\nJapanese Curry Potato\nStir-fried Cabbage', image: 'assets/images/reference-series/weekly-menu/day-11.png', alt: 'Day 11 麦片虾、日本咖喱薯仔与高丽菜餐盘' },
  { day: 'Day 12', zh: '香菇滑鸡\n香煎豆腐\n蒜蓉苋菜', en: 'Mushroom Chicken\nPan-seared Tofu\nGarlic Amaranth', image: 'assets/images/reference-series/weekly-menu/day-12.png', alt: 'Day 12 香菇滑鸡、香煎豆腐与蒜蓉苋菜餐盘' },
  { day: 'Day 13', zh: '咸蛋排骨\n番茄炒蛋\n豆角炒萝卜丝', en: 'Salted Egg Pork Ribs\nTomato Scrambled Eggs\nLong Bean & Carrot', image: 'assets/images/reference-series/weekly-menu/day-13.png', alt: 'Day 13 咸蛋排骨、番茄炒蛋与豆角萝卜丝餐盘' },
  { day: 'Day 14', zh: '韩式辣鱼柳\n韩式杂菜\n韩式泡菜炒包菜', en: 'Korean Spicy Fish\nKorean Mixed Vegetables\nKimchi Cabbage', image: 'assets/images/reference-series/weekly-menu/day-14.png', alt: 'Day 14 韩式辣鱼柳、韩式杂菜与泡菜炒包菜餐盘' },
  { day: 'Day 15', zh: '黑椒鸡扒\n番茄肉酱意大利面\n清炒上海青', en: 'Black Pepper Chicken Chop\nTomato Meat Sauce Spaghetti\nShanghai Bok Choy', image: 'assets/images/reference-series/weekly-menu/day-15.png', alt: 'Day 15 黑椒鸡扒、番茄肉酱意大利面与上海青餐盘' },
  { day: 'Day 16', zh: '南乳炸排骨\n菜脯煎蛋\n蒜蓉油麦菜', en: 'Red Fermented Bean Curd Ribs\nPreserved Radish Omelet\nGarlic Lettuce Greens', image: 'assets/images/reference-series/weekly-menu/day-16.png', alt: 'Day 16 南乳炸排骨、菜脯煎蛋与蒜蓉油麦菜餐盘' },
  { day: 'Day 17', zh: '香草鸡扒\n青酱意大利面\n奶油杂菜（玉米、青豆、红萝卜）', en: 'Herb Chicken Chop\nBasil Pesto Spaghetti\nCreamy Mixed Vegetables', image: 'assets/images/reference-series/weekly-menu/day-17.png', alt: 'Day 17 香草鸡扒、青酱意大利面与奶油杂菜餐盘' },
  { day: 'Day 18', zh: '咸蛋虾\n日本豆腐\n蒜蓉芥兰', en: 'Salted Egg Prawns\nJapanese Tofu\nGarlic Chinese Kale', image: 'assets/images/reference-series/weekly-menu/day-18.png', alt: 'Day 18 咸蛋虾、日本豆腐与蒜蓉芥兰餐盘' },
  { day: 'Day 19', zh: '沙姜鸡\n虾仁滑蛋\n清炒白菜仔', en: 'Sand Ginger Chicken\nShrimp Scrambled Eggs\nStir-fried Baby Napa Cabbage', image: 'assets/images/reference-series/weekly-menu/day-19.png', alt: 'Day 19 沙姜鸡、虾仁滑蛋与白菜仔餐盘' },
  { day: 'Day 20', zh: '韩式BBQ猪肉\n韩式泡菜豆腐\n韩式凉拌黄豆芽', en: 'Korean BBQ Pork\nKimchi Tofu\nChilled Soybean Sprouts', image: 'assets/images/reference-series/weekly-menu/day-20.png', alt: 'Day 20 韩式BBQ猪肉、泡菜豆腐与凉拌黄豆芽餐盘' },
  { day: 'Day 21', zh: '香煎鱼柳\n奶油培根意大利面\n蒜蓉西兰花花椰菜', en: 'Pan-seared Fish Fillet\nCreamy Bacon Spaghetti\nGarlic Broccoli & Cauliflower', image: 'assets/images/reference-series/weekly-menu/day-21.png', alt: 'Day 21 香煎鱼柳、奶油培根意大利面与西兰花花椰菜餐盘' },
  { day: 'Day 22', zh: '柠檬鸡扒\n炒蘑菇\n清炒羊角豆', en: 'Lemon Chicken Chop\nStir-fried Mushrooms\nStir-fried Okra', image: 'assets/images/reference-series/weekly-menu/day-22.png', alt: 'Day 22 柠檬鸡扒、炒蘑菇与羊角豆餐盘' },
  { day: 'Day 23', zh: '黑椒排骨\n豆卜焖菜\n蒜蓉A菜', en: 'Black Pepper Pork Ribs\nBraised Tofu Puffs & Vegetables\nGarlic A-choy', image: 'assets/images/reference-series/weekly-menu/day-23.png', alt: 'Day 23 黑椒排骨、豆卜焖菜与蒜蓉A菜餐盘' },
  { day: 'Day 24', zh: '香蒜奶油虾\n炒蛋\n三色时蔬（西兰花、花椰菜、红萝卜）', en: 'Garlic Butter Prawns\nScrambled Eggs\nThree-color Vegetables', image: 'assets/images/reference-series/weekly-menu/day-24.png', alt: 'Day 24 香蒜奶油虾、炒蛋与三色时蔬餐盘' },
  { day: 'Day 25', zh: '蜜汁鸡扒\n香肠炒蛋\n清炒豆苗', en: 'Honey Chicken Chop\nSausage Scrambled Eggs\nStir-fried Pea Shoots', image: 'assets/images/reference-series/weekly-menu/day-25.png', alt: 'Day 25 蜜汁鸡扒、香肠炒蛋与豆苗餐盘' },
  { day: 'Day 26', zh: '韩式辣鸡\n韩式鱼饼\n蒜蓉皇帝菜', en: 'Korean Spicy Chicken\nKorean Fish Cake\nGarlic Emperor Greens', image: 'assets/images/reference-series/weekly-menu/day-26.png', alt: 'Day 26 韩式辣鸡、韩式鱼饼与蒜蓉皇帝菜餐盘' },
  { day: 'Day 27', zh: '黑椒猪扒\n奶油鸡肉意大利面\n清炒长豆', en: 'Black Pepper Pork Chop\nCreamy Chicken Spaghetti\nStir-fried Yard-long Beans', image: 'assets/images/reference-series/weekly-menu/day-27.png', alt: 'Day 27 黑椒猪扒、奶油鸡肉意大利面与长豆餐盘' },
  { day: 'Day 28', zh: '香煎香草鱼柳\n日式玉子豆腐\n蒜蓉生菜', en: 'Pan-seared Herb Fish\nJapanese Tamago Tofu\nGarlic Lettuce', image: 'assets/images/reference-series/weekly-menu/day-28.png', alt: 'Day 28 香煎香草鱼柳、日式玉子豆腐与蒜蓉生菜餐盘' },
  { day: 'Day 29', zh: '娘惹鸡\n虾仁豆腐\n娘惹炒高丽菜', en: 'Nyonya Chicken\nShrimp Tofu\nNyonya Fried Cabbage', image: 'assets/images/reference-series/weekly-menu/day-29.png', alt: 'Day 29 娘惹鸡、虾仁豆腐与娘惹炒高丽菜餐盘' },
  { day: 'Day 30', zh: 'BBQ鸡扒\n番茄海鲜意大利面\n时蔬杂炒（西兰花、玉米笋、红萝卜）', en: 'BBQ Chicken Chop\nTomato Seafood Spaghetti\nMixed Stir-fried Vegetables', image: 'assets/images/reference-series/weekly-menu/day-30.png', alt: 'Day 30 BBQ鸡扒、番茄海鲜意大利面与时蔬杂炒餐盘' }
];

const DEFAULT_HOMEPAGE_MEDIA = {
  hero: {
    image: 'assets/images/brand/hero-banquet.jpg',
    alt: '九零食刻 90 PROJECT 黑金宴会与餐桌场景'
  },
  contact: {
    image: 'assets/images/reference-series/contact-table.png',
    alt: '九零食刻餐桌与酒杯布置'
  },
  services: [
    { image: 'assets/images/reference-series/service-catering.png', alt: '活动餐饮 buffet 服务' },
    { image: 'assets/images/reference-series/service-styling.png', alt: '场地布置和背景设计' },
    { image: 'assets/images/reference-series/service-cocktail.png', alt: '鸡尾酒与饮料吧服务' },
    { image: 'assets/images/reference-series/service-corporate.png', alt: '公司员工餐和品牌餐盒' }
  ]
};

const DEFAULT_DETAIL_CONTENT = {
  catering: {
    eyebrow: 'FAMILY BUFFET · CUSTOM CATERING',
    title: '家庭式 Buffet，轻松搭配一份完整菜单。',
    heroDesc: '先选 1 主食、4 菜、2 肉和 1 甜品，再按需要加上酱料与饮料；人数和服务形式会同步计算参考预算。',
    heroImage: 'assets/images/reference-series/service-catering.png',
    heroAlt: '活动餐饮自助餐台',
    kicker: 'EASY BUFFET BUILDER',
    introTitle: '',
    introDesc: '适合家庭聚会、生日会、公司活动和小型 Buffet。先用套餐模式快速配好菜，再切换自由搭配，直接把菜单发送给我们确认。',
    contactTitle: '需要我们帮你配？',
    contactDesc: '把日期、地点和人数发给我们。',
    panelTitle: '菜单选择与预算',
    panelDesc: '先用推荐组合开始，也可以自由搭配菜式。系统价格为初步估算，实际报价会按地点、份量、运输、餐具和现场服务确认。',
    gallery: [
      { image: 'assets/images/reference-series/service-catering.png', alt: '自助餐台与活动用餐场景', caption: '自助餐台与活动现场，可以按人数和服务形式安排。' },
      { image: 'assets/images/reference-series/contact-table.png', alt: '餐桌与烛光布置', caption: '菜单确定后，再细化餐桌、餐具与现场动线。' },
      { image: 'assets/images/reference-series/service-corporate.png', alt: '公司员工餐盒', caption: '公司员工餐也可以独立规划份量与配送方式。' }
    ]
  },
  styling: {
    eyebrow: 'EVENT STYLING · VENUE DESIGN',
    title: '把场地变成值得记住的那一刻。',
    heroDesc: '从迎宾区、主桌到餐桌细节，按活动主题、人数和现场动线，整理出完整的布置方向。',
    heroImage: 'assets/images/reference-series/service-styling.png',
    heroAlt: '场地布置与花艺桌面',
    kicker: 'STYLING SHOWCASE',
    introTitle: '先看作品，再一起定风格。',
    introDesc: '婚礼、生日派对、开幕典礼和企业活动，都可以从色调、花艺、灯光、桌面与背景设计开始规划。',
    contactTitle: '告诉我们你的场地',
    contactDesc: '发送日期、地点、人数和参考风格。',
    panelTitle: '场地布置展示',
    panelDesc: '每一组布置都会围绕活动目的和现场条件调整，图片用于展示风格方向。',
    gallery: [
      { image: 'assets/images/event/styling-gallery-wedding.webp', alt: '暖金婚礼宴会厅与长桌花艺布置', caption: '暖金婚礼宴会厅：长桌、花艺与烛光一起完成完整动线。' },
      { image: 'assets/images/event/styling-gallery-birthday.webp', alt: '生日派对私人宴会厅布置', caption: '生日派对：私人宴会厅用柔和花色和餐桌细节营造仪式感。' },
      { image: 'assets/images/event/styling-gallery-corporate.webp', alt: '企业发布会舞台与接待区布置', caption: '企业活动：舞台、签到台与宾客座位保持清晰而专业。' },
      { image: 'assets/images/event/styling-gallery-outdoor.webp', alt: '户外花园晚宴与灯串布置', caption: '户外晚宴：帐篷、花园、灯串和餐桌组成自然的晚间场景。' },
      { image: 'assets/images/event/styling-gallery-stage.webp', alt: '黑金晚宴舞台与背景装置', caption: '晚宴舞台：黑金结构、灯光和低矮花艺打造高级主视觉。' },
      { image: 'assets/images/event/styling-gallery-entrance.webp', alt: '活动迎宾区与花艺入口布置', caption: '迎宾入口：金色框架、花艺与灯笼引导宾客进入活动现场。' },
      { image: 'assets/images/event/styling-gallery-floral.webp', alt: '花艺餐桌与餐具细节布置', caption: '花艺细节：从花材、餐巾到杯具，把整体风格落到桌面。' },
      { image: 'assets/images/event/styling-gallery-lighting.webp', alt: '暖金灯光与晚宴餐桌布置', caption: '灯光氛围：用层次灯光和烛光让晚宴空间更有记忆点。' }
    ]
  },
  cocktail: {
    eyebrow: 'COCKTAIL SERVICE · MOBILE BAR',
    title: '让每一杯饮品，都成为活动的亮点。',
    heroDesc: '由专业调酒师配合移动吧台、饮品搭配和现场节奏，为开幕、派对与品牌活动增加一段有记忆点的体验。',
    heroImage: 'assets/images/reference-series/service-cocktail.png',
    heroAlt: '鸡尾酒与移动吧台服务',
    kicker: 'COCKTAIL SHOWCASE',
    introTitle: '从吧台视觉到饮品选择，一次整理。',
    introDesc: '可按宾客人数、活动时长和主题色，安排无酒精特调、经典鸡尾酒、果味饮品与现场服务流程。',
    contactTitle: '准备好你的活动资料',
    contactDesc: '告诉我们人数、场地和想要的氛围。',
    panelTitle: '鸡尾酒服务展示',
    panelDesc: '把饮品、吧台和布置放在同一张活动蓝图里，现场会更完整。',
    gallery: [
      { image: 'assets/images/reference-series/service-cocktail.png', alt: '九零食刻鸡尾酒移动吧台', caption: '移动吧台与品牌展示结合，适合开幕和晚宴。' },
      { image: 'assets/images/event/mocktail-bar-case.webp', alt: '无酒精饮品吧台案例', caption: '无酒精特调与果味饮品，适合家庭和企业活动。' },
      { image: 'assets/images/event/styling-bar.webp', alt: '活动吧台布置案例', caption: '吧台陈列和灯光可配合现场主题色。' },
      { image: 'assets/images/reference-series/contact-table.png', alt: '晚宴桌面与酒杯细节', caption: '桌面酒杯、餐饮和吧台服务可以统一安排。' },
      { image: 'assets/images/reference-series/service-catering.png', alt: '活动餐饮与饮品服务现场', caption: '大型活动可同时规划餐饮与饮品动线。' },
      { image: 'assets/images/reference-series/service-styling.png', alt: '活动布置与饮品服务搭配', caption: '从主视觉到服务细节，建立一致的活动风格。' }
    ]
  }
};

const SITE_CONTENT_FIELDS = [
  { path: 'title', label: 'SEO 标题 / Browser Title' },
  { path: 'description', label: 'SEO 描述 / Meta Description', multiline: true },
  { path: 'nav.home', label: '导航：首页' },
  { path: 'nav.meal', label: '导航：包伙食' },
  { path: 'nav.catering', label: '导航：外餐服务' },
  { path: 'nav.styling', label: '导航：活动布置' },
  { path: 'nav.faq', label: '导航：FAQ' },
  { path: 'nav.whatsapp', label: '导航：WhatsApp 按钮' },
  { path: 'nav.mobileWhatsApp', label: '手机底部 WhatsApp 按钮' },
  { path: 'contact.phone', label: '联系方式：电话号码' },
  { path: 'contact.whatsapp', label: '联系方式：WhatsApp 号码' },
  { path: 'contact.footer', label: '页脚版权文字' },
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
  { path: 'order.fields.notes', label: '表单字段：备注' },
  { path: 'order.placeholders.name', label: '表单提示：姓名' },
  { path: 'order.placeholders.phone', label: '表单提示：电话' },
  { path: 'order.placeholders.pax', label: '表单提示：人数' },
  { path: 'order.placeholders.area', label: '表单提示：配送地区' },
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
  { path: 'cateringTool.label', label: '外餐计算卡小标' },
  { path: 'cateringTool.title', label: '外餐计算卡标题' },
  { path: 'cateringTool.desc', label: '外餐计算卡说明', multiline: true },
  ...[0, 1, 2].map(index => ({ path: `cateringTool.points.${index}`, label: `外餐计算卡重点 ${index + 1}` })),
  { path: 'cateringTool.button', label: '外餐计算卡按钮' },
  { path: 'cateringTool.builderLabel', label: '展开区小标' },
  { path: 'cateringTool.builderTitle', label: '展开区标题' },
  { path: 'cateringTool.builderDesc', label: '展开区说明', multiline: true },
  { path: 'cateringTool.close', label: '展开区收起按钮' },
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
let supabaseConversionsCache = [];
let supabaseConversionsFetchInProgress = false;
let supabaseRuntimeConfig = { ...(window.NP90_SUPABASE || {}) };

const translations = {
  zh: {
    htmlLang: 'zh-Hans',
    title: '九零食刻 90 PROJECT｜包伙食 · 外餐 · 活动餐饮 · 布置设计',
    description: '九零食刻 90 PROJECT - 包伙食、外餐、活动餐饮、布置设计。高级餐饮品牌服务，日常价格享受。',
    nav: {
      home: '首页',
      meal: '包伙食服务',
      catering: '活动餐饮',
      styling: '场地布置',
      faq: 'FAQ',
      whatsapp: '018-949 0909',
      mobileWhatsApp: 'WhatsApp 下单',
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
      secondary: 'WhatsApp 立即询问',
      proof: ['餐 / 月', '起 / 餐', '餐饮 + 布置']
    },
    services: [
      { title: '餐饮', label: 'CATERING', desc: '专业外餐服务，多样美食选择，满足不同需求。' },
      { title: '包伙食', label: 'MEALS', desc: '选择开始与结束日期，安排你的包伙食期限。' },
      { title: '活动策划', label: 'EVENT', desc: '生日、公司、节庆、婚礼等活动餐饮一站式服务。' },
      { title: '布置设计', label: 'STYLING', desc: '餐桌布置、背景设计、花艺搭配，让活动更有氛围。' }
    ],
    mealPlan: {
      title: '包伙食配套',
      label: 'MONTHLY MEAL PLAN',
      desc: '适合上班族、学生、家庭与长期订餐顾客。',
      price: '300',
      priceUnit: '/ 月',
      priceNote: '20餐（月） | 平均一餐 RM15',
      points: ['新鲜现煮，每日更换菜单', '星期一至星期五供应', '适合上班族、学生、家庭', '固定地址配送'],
      periodLabel: 'MEAL PERIOD',
      periodTitle: '选择伙食期限',
      periodDesc: '用日历自由选择开始和结束日期。',
      quickOptions: ['5 个工作日', '2 周工作日', '1 个月工作日'],
      startLabel: '开始日期',
      endLabel: '结束日期',
      periodEmpty: '请选择日期，系统会计算工作日餐数。',
      periodButton: '立即订购 (018-949 0909)'
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
        title: '活动餐饮',
        priceHtml: '<span>WhatsApp</span><small>询问</small>',
        muted: '活动、公司餐、开幕与庆典',
        line: '根据人数、地点与服务形式报价',
        small: '适合公司、学校、家庭与社团活动',
        button: '了解更多'
      },
      {
        title: '场地布置',
        priceHtml: '价格<br><span>WhatsApp</span><small>询问</small>',
        muted: '宴会、生日、开幕与拍照区',
        line: '根据主题、尺寸与现场需求安排。',
        small: '',
        button: '了解更多'
      }
    ],
    referral: {
      title: '',
      desc: '',
      cards: [],
      noteStrong: '',
      note: '',
      terms: []
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
      title: '',
      label: '',
      priceHtml: '',
      list: []
    },
    order: {
      title: '联系我们',
      label: '',
      fields: {
        name: '姓名',
        phone: '电话号码',
        package: '服务类型',
        pax: '人数 Pax',
        meal: '餐期 Meal',
        date: '开始日期 Start Date',
        area: '配送区域 Delivery Area',
        referralCode: '',
        addons: '',
        notes: '备注 Notes'
      },
      placeholders: {
        name: '姓名',
        phone: '电话号码',
        pax: '请输入人数',
        area: '请输入配送地区',
        referralCode: '',
        notes: '留言'
      },
      packageOptions: [
        { label: '包伙食服务', value: '包伙食服务' },
        { label: '活动餐饮', value: '活动餐饮' },
        { label: '场地布置', value: '场地布置' },
        { label: '鸡尾酒服务', value: '鸡尾酒服务' },
        { label: '公司员工餐', value: '公司员工餐' }
      ],
      mealOptions: [
        { label: 'WhatsApp 询问', value: 'WhatsApp 询问' }
      ],
      submit: '发送询问',
      none: '无',
      previewLabel: 'WHATSAPP 预览',
      previewEmpty: '填写资料后，这里会显示即将发送到 WhatsApp 的订单内容。',
      copyPreview: '复制内容',
      copiedPreview: '已复制'
    },
    features: {
      catering: {
        label: 'EVENT CATERING',
        title: '活动餐饮',
        desc: '公司活动、开幕典礼、产品发布会、学校活动、庆功宴，提供多样化餐饮。',
        items: [],
        menuButton: '',
        button: '了解更多'
      },
      styling: {
        label: 'EVENT STYLING',
        title: '场地布置',
        desc: '婚礼布置、生日派对、开幕典礼、企业活动，为您打造完美现场。',
        items: [],
        button: '了解更多'
      }
    },
    cateringTool: {
      label: 'MIX & MATCH MENU',
      title: '自由搭配菜单 · 价格计算',
      desc: '把外餐菜单与预算计算收在一个专属工具里。需要时再展开选择菜式、人数和服务形式，页面更干净，也更像高级餐饮品牌。',
      points: ['自选菜式', '预算估算', 'WhatsApp 发送'],
      button: '开始选择菜单',
      builderLabel: 'MENU SELECTION',
      builderTitle: '菜单选择与预算',
      builderDesc: '选择菜式后，系统会先给你活动餐饮的初步预算。',
      close: '收起'
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
      title: '联系我们',
      slogan: '无论是日常用餐还是大型活动，我们都能为您提供最优质的服务与体验。',
      button: 'WhatsApp 立即询问'
    },
    showcase: [
      { title: '活动餐饮', label: 'EVENT CATERING', desc: '公司活动、开幕典礼、产品发布会、学校活动、庆功宴，提供多样化餐饮。', button: '了解更多' },
      { title: '场地布置', label: 'EVENT STYLING', desc: '婚礼布置、生日派对、开幕典礼、企业活动，为您打造完美现场。', button: '了解更多' },
      { title: '鸡尾酒服务', label: 'COCKTAIL SERVICE', desc: '专业调酒师与移动吧台服务，为活动增添特调与氛围。', button: '了解更多' },
      { title: '公司员工餐', label: 'CORPORATE MEALS', desc: '为公司团队提供营养均衡、美味卫生的员工餐解决方案。', button: '了解更多' }
    ],
    why: {
      title: '为什么选择九零食刻?',
      items: ['新鲜现煮', '专业团队', '一站式服务', '客制化菜单', '价格透明', '用心服务']
    },
    growth: {
      title: '分享美好食刻，获得90推荐奖励',
      description: '每位会员都会自动拥有自己的推荐码。朋友通过你的推荐码注册并完成订单后，你将获得透明、可查询的三代推荐佣金。',
      apply: '查看会员推荐',
      view: '查看会员奖励',
      steps: ['注册会员', '分享推荐码', '完成订单后获得奖励']
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
      referralCode: '',
      logout: '退出',
      dashboardTitle: '会员中心',
      benefits: [
        ['询问记录', '自动保存本机订单询问'],
        ['会员资料', '保存常用地区与偏好'],
        ['快速下单', '下次询问可自动带入资料']
      ],
      referralIntro: '',
      copyCode: '',
      shareCode: 'WhatsApp 分享',
      rewardsTitle: '',
      clearRewards: '',
      recordsTitle: '我的包伙食询问',
      clearRecords: '清空记录',
      profileTitle: '我的资料',
      saveProfile: '保存资料',
      profileArea: '默认地区 Area',
      profilePackage: '常选配套 Package',
      profilePreference: '口味备注 Preference',
      copyLink: '',
      levelLabel: 'MEMBER LEVEL',
      nextLabel: 'NEXT STEP',
      profileSaved: '会员资料已保存。',
      linkCopied: '',
      emptyRecords: '还没有询问记录。登录后提交 WhatsApp 订单，记录会保存在这里。',
      emptyRewards: '',
      messages: {
        required: '请填写完整资料，密码至少 6 个字符。',
        duplicate: '这个 Email 已经注册，请直接登录。',
        registerSuccess: '注册成功，已进入会员中心。',
        loginError: 'Email 或密码不正确。',
        loginSuccess: '登录成功。',
        copied: '',
        copyFail: ''
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
      secondary: 'WhatsApp Now',
      proof: ['meals / month', 'from / meal', 'Catering + Styling']
    },
    services: [
      { title: 'Catering', label: 'CATERING', desc: 'Professional catering service with flexible menus for different event needs.' },
      { title: 'Meal Plan', label: 'MEALS', desc: 'Choose start and end dates for a flexible meal-plan period.' },
      { title: 'Event', label: 'EVENT', desc: 'Food service support for birthdays, company meals, celebrations, weddings and gatherings.' },
      { title: 'Styling', label: 'STYLING', desc: 'Table styling, backdrop design and simple floral touches for a warmer event atmosphere.' }
    ],
    mealPlan: {
      title: 'Meal Plan Packages',
      label: 'MONTHLY MEAL PLAN',
      desc: 'Suitable for working adults, students, families and long-term meal arrangements.',
      price: '300',
      priceUnit: '/ month',
      priceNote: '20 meals / month | Average RM15 per meal',
      points: ['Freshly cooked, with a rotating daily menu', 'Available Monday to Friday', 'Suitable for offices, students and families', 'Delivery to a fixed address'],
      periodLabel: 'MEAL PERIOD',
      periodTitle: 'Choose your meal period',
      periodDesc: 'Use the calendar to choose your start and end dates.',
      quickOptions: ['5 working days', '2 working weeks', '1 working month'],
      startLabel: 'Start date',
      endLabel: 'End date',
      periodEmpty: 'Choose dates to calculate your working-day meals.',
      periodButton: 'Order now (018-949 0909)'
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
      title: '',
      desc: '',
      cards: [],
      noteStrong: '',
      note: '',
      terms: [
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
      title: '',
      label: '',
      priceHtml: '',
      list: []
    },
    order: {
      title: 'Contact Us',
      label: '',
      fields: {
        name: 'Name',
        phone: 'Phone Number',
        package: 'Service Type',
        pax: 'Pax',
        meal: 'Meal',
        date: 'Start Date',
        area: 'Delivery Area',
        referralCode: '',
        addons: '',
        notes: 'Notes'
      },
      placeholders: {
        name: 'Name',
        phone: 'Phone Number',
        pax: 'Enter pax',
        area: 'Enter delivery area',
        referralCode: '',
        notes: 'Message'
      },
      packageOptions: [
        { label: 'Monthly Meal Plan', value: 'Monthly Meal Plan' },
        { label: 'Event Catering', value: 'Event Catering' },
        { label: 'Event Styling', value: 'Event Styling' },
        { label: 'Cocktail Service', value: 'Cocktail Service' },
        { label: 'Corporate Meals', value: 'Corporate Meals' }
      ],
      mealOptions: [
        { label: 'WhatsApp Inquiry', value: 'WhatsApp Inquiry' }
      ],
      submit: 'Send Inquiry',
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
        button: 'View Dynamic Portfolio'
      }
    },
    cateringTool: {
      label: 'MIX & MATCH MENU',
      title: 'Mix & Match Menu · Price Calculator',
      desc: 'The full catering menu and budget calculator are kept inside one focused tool. Open it only when you want to choose dishes, pax and service style.',
      points: ['Choose dishes', 'Estimate budget', 'Send WhatsApp'],
      button: 'Start Menu Selection',
      builderLabel: 'MENU SELECTION',
      builderTitle: 'Menu Selection & Budget',
      builderDesc: 'Choose dishes and the system will estimate an initial event catering budget.',
      close: 'Collapse'
    },
    faq: {
      title: 'FAQ',
      items: [
        ['How many meals are included in RM300?', 'RM300 includes 20 meals, averaging RM15 per meal.'],
        ['Can I choose lunch or dinner?', 'Yes. You can mention lunch, dinner, or lunch + dinner in your WhatsApp inquiry.'],
        ['Can I request non-spicy meals?', 'Yes. Please mention non-spicy or any ingredients to avoid in the notes.'],
        ['Can I order for a family?', 'Yes. Family packages for 2, 3 or 4 pax can be discussed on WhatsApp.'],
        ['How is delivery coverage calculated?', 'Please provide your delivery area. We will confirm availability and delivery charges on WhatsApp.'],
        ['How early should I book catering?', 'We recommend booking 3 to 7 days in advance. Larger events should be confirmed earlier.']
      ]
    },
    cta: {
      title: 'Contact Us',
      slogan: 'Every moment deserves a good meal',
      button: 'WhatsApp Now'
    },
    showcase: [
      { title: 'Event Catering', label: 'EVENT CATERING', desc: 'Buffet and food service for company events, launches, school activities and celebrations.', button: 'Learn More' },
      { title: 'Event Styling', label: 'EVENT STYLING', desc: 'Wedding, birthday, launch and corporate styling designed around your venue and theme.', button: 'Learn More' },
      { title: 'Cocktail Service', label: 'COCKTAIL SERVICE', desc: 'Professional bartenders and mobile bar service with signature drinks for your event.', button: 'Learn More' },
      { title: 'Corporate Meals', label: 'CORPORATE MEALS', desc: 'Balanced, hygienic and practical meal solutions for company teams and daily staff meals.', button: 'Learn More' }
    ],
    why: {
      title: 'Why choose 90 PROJECT?',
      items: ['Freshly cooked', 'Professional team', 'One-stop service', 'Custom menus', 'Clear pricing', 'Thoughtful service']
    },
    growth: {
      title: 'Share good moments, earn 90 referral rewards',
      description: 'Every member automatically receives a referral code. When friends register through your code and complete eligible orders, you receive transparent three-generation referral commission.',
      apply: 'View referrals',
      view: 'View member rewards',
      steps: ['Register as a member', 'Share your referral code', 'Earn after an eligible order']
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
      referralCode: '',
      logout: 'Logout',
      dashboardTitle: 'Member Centre',
      benefits: [
        ['Inquiry Records', 'Save order inquiries on this device'],
        ['Member Profile', 'Save usual area and preferences'],
        ['Faster Orders', 'Reuse details for future inquiries']
      ],
      referralIntro: '',
      copyCode: '',
      shareCode: 'Share on WhatsApp',
      rewardsTitle: '',
      clearRewards: '',
      recordsTitle: 'My Meal Plan Inquiries',
      clearRecords: 'Clear Records',
      profileTitle: 'My Profile',
      saveProfile: 'Save Profile',
      profileArea: 'Default Area',
      profilePackage: 'Usual Package',
      profilePreference: 'Taste Preference',
      copyLink: '',
      levelLabel: 'MEMBER LEVEL',
      nextLabel: 'NEXT STEP',
      profileSaved: 'Member profile saved.',
      linkCopied: '',
      emptyRecords: 'No inquiry records yet. Submit a WhatsApp order after login and it will be saved here.',
      emptyRewards: '',
      messages: {
        required: 'Please complete all details. Password must be at least 6 characters.',
        duplicate: 'This email is already registered. Please log in directly.',
        registerSuccess: 'Registration successful. You are now in the member centre.',
        loginError: 'Email or password is incorrect.',
        loginSuccess: 'Login successful.',
        copied: '',
        copyFail: ''
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

function cateringSelectionGroup(categoryId) {
  if (['staple', 'porridge'].includes(categoryId)) return 'staple';
  if (['vegetable', 'tofu', 'fried'].includes(categoryId)) return 'vegetable';
  if (['chicken', 'pork', 'fish', 'prawn'].includes(categoryId)) return 'protein';
  if (categoryId === 'dessert') return 'dessert';
  return 'optional';
}

function selectedCateringCounts() {
  return Array.from(cateringMenuGrid?.querySelectorAll('input[type="checkbox"]:checked') || [])
    .reduce((counts, input) => {
      const group = input.dataset.menuGroup || 'optional';
      counts[group] = (counts[group] || 0) + 1;
      return counts;
    }, {});
}

function cateringBuffetStatus() {
  const counts = selectedCateringCounts();
  const missing = Object.entries(CATERING_SELECTION_LIMITS)
    .filter(([group, limit]) => (counts[group] || 0) < limit)
    .map(([group, limit]) => `${CATERING_SELECTION_LABELS[group]} ${(counts[group] || 0)}/${limit}`);
  return { counts, missing, complete: missing.length === 0 };
}

function setCateringMenuMode(mode) {
  cateringMenuMode = mode === 'free' ? 'free' : 'buffet';
  document.querySelectorAll('[data-catering-mode]').forEach(button => {
    const active = button.dataset.cateringMode === cateringMenuMode;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  if (cateringSelectionNotice) {
    cateringSelectionNotice.textContent = cateringMenuMode === 'buffet'
      ? '套餐模式：主食 1、蔬菜 / 豆腐 4、肉类 / 鱼虾 2、甜品 1；饮料和酱料可自由加购。'
      : '自由搭配模式：不限制分类数量，适合定制菜单与大型活动。';
  }
  renderCateringEstimate();
}

function renderCateringSelectionGuide() {
  const status = cateringBuffetStatus();
  Object.entries(CATERING_SELECTION_LIMITS).forEach(([group, limit]) => {
    const count = document.querySelector(`[data-catering-count="${group}"]`);
    if (count) count.textContent = `${status.counts[group] || 0}/${limit}`;
  });
  const statusText = document.querySelector('[data-catering-rule-status]');
  if (statusText) {
    statusText.textContent = cateringMenuMode === 'free'
      ? '自由搭配已开启'
      : status.complete ? '套餐组合已达标' : `还差：${status.missing.join('、')}`;
    statusText.classList.toggle('is-complete', cateringMenuMode === 'free' || status.complete);
  }
}

function cateringItemRate(category, item) {
  if (cateringItemIsMarketPrice(item)) return 0;
  if (item === '香煎三文鱼配 Tartar Sauce') return 11;
  return Number.parseFloat(category?.rate || '0') || 0;
}

function cateringItemIsMarketPrice(item) {
  return CATERING_MARKET_PRICE_ITEMS.has(String(item || '').trim());
}

function cateringItemPriceLabel(category, item) {
  if (cateringItemIsMarketPrice(item)) return '按时价';
  const itemRate = cateringItemRate(category, item);
  return itemRate ? formatCurrency(itemRate) : '';
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
        ${category.items.map(item => {
          const itemRate = cateringItemRate(category, item);
          const priceLabel = cateringItemPriceLabel(category, item);
          return `
          <label class="menu-option">
          <input type="checkbox" data-menu-category="${escapeHtml(category.id)}" data-menu-group="${cateringSelectionGroup(category.id)}" data-menu-title="${escapeHtml(category.title)}" data-menu-rate="${itemRate}" data-menu-market-price="${cateringItemIsMarketPrice(item) ? 'true' : 'false'}" value="${escapeHtml(item)}">
            <span class="menu-option-name">${escapeHtml(item)}</span>
            ${priceLabel ? `<small class="menu-option-price">${escapeHtml(priceLabel)}</small>` : ''}
          </label>
        `;
        }).join('')}
      </div>
    </article>
  `).join('');
}

function renderCateringCombos() {
  if (!cateringComboPresets) return;
  cateringComboPresets.innerHTML = CATERING_COMBOS.map(combo => `
    <button class="combo-preset-card" type="button" data-catering-combo="${escapeHtml(combo.id)}">
      <span>${escapeHtml(combo.label)}</span>
      <b class="combo-price">${escapeHtml(combo.price || '')}</b>
      <strong>${escapeHtml(combo.title)}</strong>
      <small>${escapeHtml(combo.desc)}</small>
    </button>
  `).join('');
}

function applyCateringCombo(comboId) {
  const combo = CATERING_COMBOS.find(item => item.id === comboId);
  if (!combo || !cateringMenuGrid) return;

  const wanted = new Set(combo.items);
  cateringMenuGrid.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.checked = wanted.has(input.value);
  });
  if (cateringPax) cateringPax.value = String(combo.pax);
  if (cateringServiceStyle) cateringServiceStyle.value = combo.service;
  setCateringMenuMode(combo.service === 'buffet' ? 'buffet' : 'free');

  cateringComboPresets?.querySelectorAll('[data-catering-combo]').forEach(button => {
    button.classList.toggle('is-active', button.dataset.cateringCombo === combo.id);
  });
  renderCateringEstimate();
  document.querySelector('.calculator-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function selectedCateringItems() {
  return Array.from(cateringMenuGrid?.querySelectorAll('input[type="checkbox"]:checked') || []).map(input => ({
    name: input.value,
    categoryId: input.dataset.menuCategory || '',
    categoryTitle: input.dataset.menuTitle || '',
    rate: Number.parseFloat(input.dataset.menuRate || '0') || 0,
    marketPrice: input.dataset.menuMarketPrice === 'true'
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
  const marketPriceItems = items.filter(item => item.marketPrice);
  const perPax = pricedItems.reduce((sum, item) => sum + item.rate, 0);
  const subtotal = pax && perPax ? pax * perPax * service.multiplier : 0;
  const minimumTotal = editableCateringConfig().minimumTotal || CATERING_MINIMUM_TOTAL;
  const total = subtotal ? Math.max(subtotal, minimumTotal) : 0;

  return {
    pax,
    service,
    items,
    pricedItems,
    marketPriceItems,
    perPax,
    subtotal,
    total,
    minimumTotal
  };
}

function buildCateringMessage(estimate) {
  const grouped = groupedCateringItems(estimate.items);
  const menuLines = Object.entries(grouped).map(([category, items]) => (
    `${category}：${items.map(item => item.marketPrice ? `${item.name}（按时价）` : item.name).join('、')}`
  )).join('\n') || '还没有选择菜式';
  const hasMarketPriceItems = estimate.marketPriceItems.length > 0;

  return `你好，我想询问九零食刻 90 PROJECT 外餐菜单。

【人数】
${estimate.pax || '-'} pax

【服务形式】
${estimate.service.label}

【选择菜单】
${menuLines}

【系统初步预算】
每人约：${formatCurrency(estimate.perPax)}${hasMarketPriceItems ? ' + 按时价菜式' : ''}
总预算约：${estimate.total ? formatCurrency(estimate.total) : '-'}${hasMarketPriceItems ? ' + 按时价菜式' : ''}
最低预算：${formatCurrency(estimate.minimumTotal)}

请帮我确认实际报价、配送、餐具和现场服务安排。`;
}

function renderCateringEstimate() {
  if (!cateringEstimateTotal || !cateringEstimateMeta || !selectedCateringSummary || !cateringWhatsApp) return;

  const estimate = calculateCateringEstimate();
  const hasMarketPriceItems = estimate.marketPriceItems.length > 0;
  renderCateringSelectionGuide();
  cateringEstimateTotal.textContent = estimate.total ? formatCurrency(estimate.total) : hasMarketPriceItems ? '按时价' : 'RM0';
  cateringEstimateMeta.textContent = estimate.total
    ? `${estimate.pax} pax · 每人约 ${formatCurrency(estimate.perPax)} · ${estimate.service.label}${hasMarketPriceItems ? ' · 含按时价菜式' : ''}`
    : hasMarketPriceItems ? `${estimate.pax || '-'} pax · 含按时价菜式，请 WhatsApp 确认报价。` : '请选择菜式开始计算。';

  if (!estimate.items.length) {
    selectedCateringSummary.textContent = '还没有选择菜式。';
  } else {
    const grouped = groupedCateringItems(estimate.items);
    selectedCateringSummary.innerHTML = Object.entries(grouped).map(([category, items]) => (
      `<p><b>${escapeHtml(category)}</b>：${items.map(item => escapeHtml(item.marketPrice ? `${item.name}（按时价）` : item.name)).join('、')}</p>`
    )).join('');
  }

  cateringWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildCateringMessage(estimate))}`;
}

function openCateringMenuBuilder(scroll = true) {
  if (!cateringMenuBuilder) return;
  document.getElementById('catering-menu')?.removeAttribute('hidden');
  cateringMenuBuilder.hidden = false;
  window.requestAnimationFrame(() => {
    cateringMenuBuilder.classList.add('is-open');
    if (scroll) cateringMenuBuilder.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function closeCateringMenuBuilder() {
  if (!cateringMenuBuilder) return;
  cateringMenuBuilder.classList.remove('is-open');
  window.setTimeout(() => {
    if (!cateringMenuBuilder.classList.contains('is-open')) {
      cateringMenuBuilder.hidden = true;
      document.getElementById('catering-menu')?.setAttribute('hidden', '');
    }
  }, 260);
  document.getElementById('catering')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getStylingCaseItem(card) {
  const image = card.querySelector('img');
  return {
    image: image?.getAttribute('src') || '',
    alt: image?.getAttribute('alt') || '',
    label: card.querySelector('span')?.textContent?.trim() || '',
    title: card.querySelector('h3')?.textContent?.trim() || '',
    desc: card.querySelector('p')?.textContent?.trim() || ''
  };
}

function getStylingCaseItems() {
  return stylingCaseCards.map(getStylingCaseItem).filter(item => item.image);
}

function updateStylingCasePlayButton() {
  if (!casePlayToggle) return;
  const text = stylingCasePlaying
    ? (currentLanguage === 'en' ? 'Pause autoplay' : '暂停轮播')
    : (currentLanguage === 'en' ? 'Play showcase' : '继续轮播');
  casePlayToggle.textContent = text;
  casePlayToggle.setAttribute('aria-pressed', String(stylingCasePlaying));
}

function stopStylingCaseAutoplay() {
  window.clearTimeout(stylingCaseTimer);
  stylingCaseTimer = null;
  if (stylingCaseProgressFrame) {
    window.cancelAnimationFrame(stylingCaseProgressFrame);
    stylingCaseProgressFrame = null;
  }
}

function animateStylingCaseProgress() {
  if (!caseProgress || !stylingCasePlaying || prefersReducedMotion) return;
  const startedAt = performance.now();
  const draw = now => {
    if (!stylingCasePlaying) return;
    const progress = Math.min(100, ((now - startedAt) / STYLING_CASE_DELAY) * 100);
    caseProgress.style.width = `${progress}%`;
    if (progress < 100) {
      stylingCaseProgressFrame = window.requestAnimationFrame(draw);
    }
  };
  caseProgress.style.width = '0%';
  stylingCaseProgressFrame = window.requestAnimationFrame(draw);
}

function scheduleStylingCaseAutoplay() {
  stopStylingCaseAutoplay();
  updateStylingCasePlayButton();
  if (!stylingCasePlaying || prefersReducedMotion || stylingCaseCards.length < 2) return;
  animateStylingCaseProgress();
  stylingCaseTimer = window.setTimeout(() => {
    setStylingCase(activeStylingCase + 1);
    scheduleStylingCaseAutoplay();
  }, STYLING_CASE_DELAY);
}

function updateCaseLightbox(item) {
  if (!(caseLightboxImg instanceof HTMLImageElement)) return;
  caseLightboxImg.src = item.image;
  caseLightboxImg.alt = item.alt;
  if (caseLightboxLabel) caseLightboxLabel.textContent = item.label;
  if (caseLightboxTitle) caseLightboxTitle.textContent = item.title;
}

function setStylingCase(index) {
  const items = getStylingCaseItems();
  if (!items.length) return;
  activeStylingCase = (index + items.length) % items.length;
  const item = items[activeStylingCase];

  caseShowcaseMedia?.classList.add('is-switching');
  window.setTimeout(() => caseShowcaseMedia?.classList.remove('is-switching'), 240);

  if (caseFeaturedImage instanceof HTMLImageElement) {
    caseFeaturedImage.src = item.image;
    caseFeaturedImage.alt = item.alt;
  }
  if (caseCounter) caseCounter.textContent = `${String(activeStylingCase + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  if (caseLabel) caseLabel.textContent = item.label;
  if (caseTitle) caseTitle.textContent = item.title;
  if (caseDesc) caseDesc.textContent = item.desc;
  if (caseProgress && !stylingCasePlaying) caseProgress.style.width = '0%';
  stylingCaseCards.forEach((card, cardIndex) => {
    const active = cardIndex === activeStylingCase;
    card.classList.toggle('is-active', active);
    card.setAttribute('aria-current', active ? 'true' : 'false');
  });
  updateCaseLightbox(item);
}

function moveStylingCase(direction) {
  setStylingCase(activeStylingCase + direction);
  scheduleStylingCaseAutoplay();
}

function openCaseLightbox() {
  const items = getStylingCaseItems();
  if (!caseLightbox || !items.length) return;
  updateCaseLightbox(items[activeStylingCase]);
  caseLightbox.hidden = false;
  caseLightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('case-lightbox-open');
}

function closeCaseLightbox() {
  if (!caseLightbox) return;
  caseLightbox.hidden = true;
  caseLightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('case-lightbox-open');
}

function isDefaultVideoSource(source = '') {
  const value = String(source || '').trim();
  return !value || /(^|\/)your-video\.mp4$/i.test(value);
}

function renderVideoSpot(videoContent = DEFAULT_VIDEO_CONTENT) {
  const video = normalizeVideoContent(videoContent);
  const hasPublicVideo = !isDefaultVideoSource(video.src);

  if (videoSpotSection) videoSpotSection.hidden = !hasPublicVideo;
  if (videoPlaceholder) videoPlaceholder.hidden = true;

  if (!hasPublicVideo) {
    const source = brandVideo?.querySelector('source');
    if (source?.getAttribute('src')) {
      source.setAttribute('src', '');
      brandVideo?.load();
    }
    brandVideo?.classList.remove('has-video');
    return;
  }

  setText('[data-video-label]', video.label);
  setText('[data-video-title]', video.title);
  setText('[data-video-desc]', video.desc);

  const videoCta = document.querySelector('[data-video-cta]');
  if (videoCta) videoCta.textContent = video.cta;

  if (brandVideo instanceof HTMLVideoElement) {
    if (video.poster) brandVideo.poster = video.poster;
    const source = brandVideo.querySelector('source');
    if (source && source.getAttribute('src') !== video.src) {
      source.setAttribute('src', video.src);
      brandVideo.load();
    }
    syncVideoFallback();
  }
}

function syncVideoFallback(hasError = false) {
  if (!videoPlaceholder || !(brandVideo instanceof HTMLVideoElement)) return;
  const source = brandVideo.querySelector('source')?.getAttribute('src') || '';
  const waitingForUpload = isDefaultVideoSource(source);
  const shouldHidePublicVideo = hasError || waitingForUpload;
  if (videoSpotSection) videoSpotSection.hidden = shouldHidePublicVideo;
  videoPlaceholder.hidden = true;
  brandVideo.classList.toggle('has-video', !shouldHidePublicVideo);
}

function renderStylingCaseCards(cases = DEFAULT_STYLING_CASES) {
  const items = normalizeCaseItems(cases);
  stylingCaseCards.forEach((card, index) => {
    const item = items[index];
    card.hidden = !item;
    if (!item) return;

    const image = card.querySelector('img');
    if (image instanceof HTMLImageElement) {
      image.src = item.image;
      image.alt = item.alt || item.title;
    }
    const label = card.querySelector('span');
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    if (label) label.textContent = item.label;
    if (title) title.textContent = item.title;
    if (desc) desc.textContent = item.desc;
  });

  setStylingCase(Math.min(activeStylingCase, Math.max(items.length - 1, 0)));
  updateStylingCasePlayButton();
}

function renderMediaContent(content = loadAdminContent()) {
  const media = normalizeAdminContent(content).media;
  renderVideoSpot(media.video);
  renderStylingCaseCards(media.cases);
}

function applyManagedImage(image, source) {
  if (!(image instanceof HTMLImageElement) || !source) return;
  if (source.image) image.src = source.image;
  if (source.alt) image.alt = source.alt;
}

function renderHomepageMedia(content = loadAdminContent()) {
  const homepage = normalizeAdminContent(content).media.homepage;
  applyManagedImage(document.querySelector('.hero-media img'), homepage.hero);
  const heroSource = document.querySelector('.hero-media source');
  if (heroSource && homepage.hero.image) heroSource.srcset = homepage.hero.image;
  applyManagedImage(document.querySelector('.contact-image img'), homepage.contact);
  document.querySelectorAll('.reference-service-card').forEach((card, index) => {
    applyManagedImage(card.querySelector('img'), homepage.services[index]);
  });
}

function renderWeeklyReferenceGrid(days = []) {
  const grid = document.querySelector('.weekly-reference-grid');
  if (!grid) return;
  grid.innerHTML = days.map((item, index) => {
    const dishes = String(item.dish || '').split(/\n+/).map(line => line.trim()).filter(Boolean);
    const alt = item.alt || `${item.day || `Day ${index + 1}`} 菜单餐盘`;
    return `
      <article>
        <strong>${escapeHtml(item.day || `Day ${index + 1}`)}</strong>
        ${dishes.map(dish => `<span>${escapeHtml(dish)}</span>`).join('')}
        <picture><img src="${escapeHtml(item.image || DEFAULT_WEEKLY_MENU[index % DEFAULT_WEEKLY_MENU.length]?.image || '')}" width="1536" height="1024" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"></picture>
      </article>
    `;
  }).join('');
}

function renderDetailPageContent(content = loadAdminContent()) {
  const pageKey = document.body?.dataset.detailPage;
  if (!pageKey) return;
  const page = normalizeAdminContent(content).media.details[pageKey];
  if (!page) return;

  const heroImageElement = document.querySelector('.detail-hero-media img');
  applyManagedImage(heroImageElement, { image: page.heroImage, alt: page.heroAlt });
  setText('.detail-hero-copy > span', page.eyebrow);
  setText('.detail-hero-copy h1', page.title);
  setText('.detail-hero-copy p', page.heroDesc);
  setText('.detail-kicker', page.kicker);

  const intro = document.querySelector('.detail-intro > div:first-child');
  if (intro) {
    const introTitle = intro.querySelector('h2');
    if (introTitle) {
      introTitle.replaceChildren(document.createTextNode(page.introTitle));
      introTitle.hidden = !page.introTitle;
    }
    intro.querySelector('p')?.replaceChildren(document.createTextNode(page.introDesc));
  }
  const contact = document.querySelector('.detail-contact-card');
  if (contact) {
    contact.querySelector('strong')?.replaceChildren(document.createTextNode(page.contactTitle));
    contact.querySelector('p')?.replaceChildren(document.createTextNode(page.contactDesc));
  }
  setText('.detail-panel > h2', page.panelTitle);
  setText('.detail-panel > p', page.panelDesc);

  const gallery = document.querySelector('.detail-panel .detail-gallery');
  if (gallery) {
    gallery.innerHTML = page.gallery.map(item => `
      <figure>
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" loading="lazy" decoding="async">
        <figcaption>${escapeHtml(item.caption)}</figcaption>
      </figure>
    `).join('');
  }

  const phone = languageText().contact?.phone || '018-949 0909';
  const whatsapp = languageText().contact?.whatsapp || WHATSAPP_NUMBER;
  const message = currentLanguage === 'en'
    ? 'Hi, I would like to ask about 90 PROJECT.'
    : '你好，我想询问九零食刻 90 PROJECT。';
  document.querySelectorAll('.detail-contact-card a').forEach(link => {
    link.textContent = `WhatsApp ${phone}`;
    link.href = `https://wa.me/${String(whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  });
  const footerLink = document.querySelector('.detail-footer a');
  if (footerLink) footerLink.textContent = currentLanguage === 'en' ? 'Contact 90 PROJECT' : '联系九零食刻';
  if (document.body.classList.contains('detail-page-body')) document.title = page.title;
}

function renderManagedContent(content = loadAdminContent()) {
  renderHomepageMedia(content);
  renderDetailPageContent(content);
}

function openStylingCases(scroll = true) {
  if (!stylingCasesSection) return;
  stylingCasesSection.hidden = false;
  setStylingCase(activeStylingCase);
  scheduleStylingCaseAutoplay();
  stylingCasesSection.querySelectorAll('[data-motion]').forEach(element => element.classList.add('is-visible'));
  window.requestAnimationFrame(() => {
    stylingCasesSection.classList.add('is-open');
    if (scroll) stylingCasesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function closeStylingCases() {
  if (!stylingCasesSection) return;
  stopStylingCaseAutoplay();
  closeCaseLightbox();
  stylingCasesSection.classList.remove('is-open');
  window.setTimeout(() => {
    if (!stylingCasesSection.classList.contains('is-open')) {
      stylingCasesSection.hidden = true;
    }
  }, 260);
  document.getElementById('styling')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  const localStaticPreview = /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(window.location.hostname);
  if (!localStaticPreview) {
    const apiConfig = await fetchSupabaseConfig('/api/supabase-config');
    if (apiConfig?.url && apiConfig?.anonKey) {
      supabaseRuntimeConfig = { ...supabaseRuntimeConfig, ...apiConfig };
      return;
    }
  }

  const localConfig = await fetchSupabaseConfig('js/supabase-config.local.json?v=20260713-supabase');
  if (localConfig?.url && localConfig?.anonKey) {
    supabaseRuntimeConfig = { ...supabaseRuntimeConfig, ...localConfig };
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
      address: member.profile?.area || '',
      city: member.profile?.area || '',
      referral_code: normalizeReferralCode(member.referralCode),
      referred_by_code: normalizeReferralCode(member.referredByCode) || null,
      member_tier: member.tier || 'Classic',
      default_area: member.profile?.area || null,
      default_package: member.profile?.defaultPackage || null,
      taste_preference: member.profile?.preference || null
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
  member.tier = profile?.member_tier || member.tier || 'Classic';
  member.profile = {
    ...(member.profile || {}),
    area: profile?.default_area || profile?.address || member.profile?.area || '',
    defaultPackage: profile?.default_package || member.profile?.defaultPackage || '',
    preference: profile?.taste_preference || member.profile?.preference || ''
  };
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
    referredName: row.referred_name || (currentLanguage === 'en' ? 'Member inquiry' : '会员询问'),
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
  setPathValue(site, 'contact.phone', '018-949 0909');
  setPathValue(site, 'contact.whatsapp', WHATSAPP_NUMBER);
  setPathValue(site, 'contact.footer', '© 2026 九零食刻 90 PROJECT. All Rights Reserved.');
  return site;
}

function normalizeCateringMenu(menu) {
  const source = Array.isArray(menu) && menu.length ? menu : CATERING_MENU;
  const missingDefaults = CATERING_MENU.filter(defaultCategory => (
    !source.some(category => category?.id === defaultCategory.id)
  ));
  return [...source, ...missingDefaults].map((category, index) => {
    const id = String(category?.id || `category-${index + 1}`).trim();
    const defaultCategory = CATERING_MENU.find(item => item.id === id);
    const rawRate = Number.parseFloat(category?.rate || 0) || 0;
    const rate = LEGACY_CATERING_RATES[id] === rawRate
      ? Number(defaultCategory?.rate || rawRate)
      : rawRate;
    return {
    id,
    title: String(category?.title || '').trim(),
    label: String(category?.label || '').trim(),
    rate,
    items: Array.isArray(category?.items)
      ? category.items.map(item => String(item || '').trim()).filter(Boolean)
      : String(category?.items || '').split(/\n+/).map(item => item.trim()).filter(Boolean)
    };
  }).filter(category => category.title || category.label || category.items.length);
}

function defaultCateringContent() {
  return {
    minimumTotal: CATERING_MINIMUM_TOTAL,
    menu: normalizeCateringMenu(CATERING_MENU)
  };
}

function normalizeCaseItems(cases) {
  const source = Array.isArray(cases) && cases.length ? cases : DEFAULT_STYLING_CASES;
  return source.map((item, index) => ({
    label: String(item?.label || DEFAULT_STYLING_CASES[index]?.label || '').trim(),
    title: String(item?.title || DEFAULT_STYLING_CASES[index]?.title || '').trim(),
    desc: String(item?.desc || DEFAULT_STYLING_CASES[index]?.desc || '').trim(),
    image: String(item?.image || DEFAULT_STYLING_CASES[index]?.image || '').trim(),
    alt: String(item?.alt || item?.title || DEFAULT_STYLING_CASES[index]?.alt || '').trim()
  })).filter(item => item.image || item.title || item.desc);
}

function normalizeVideoContent(video = {}) {
  return {
    label: String(video.label || DEFAULT_VIDEO_CONTENT.label),
    title: String(video.title || DEFAULT_VIDEO_CONTENT.title),
    desc: String(video.desc || DEFAULT_VIDEO_CONTENT.desc),
    cta: String(video.cta || DEFAULT_VIDEO_CONTENT.cta),
    src: String(video.src || DEFAULT_VIDEO_CONTENT.src),
    poster: String(video.poster || DEFAULT_VIDEO_CONTENT.poster)
  };
}

function normalizeManagedImage(item = {}, fallback = {}) {
  return {
    image: String(item?.image || fallback.image || '').trim(),
    alt: String(item?.alt || fallback.alt || '').trim()
  };
}

function normalizeHomepageMedia(homepage = {}) {
  const source = homepage || {};
  return {
    hero: normalizeManagedImage(source.hero, DEFAULT_HOMEPAGE_MEDIA.hero),
    contact: normalizeManagedImage(source.contact, DEFAULT_HOMEPAGE_MEDIA.contact),
    services: DEFAULT_HOMEPAGE_MEDIA.services.map((fallback, index) => normalizeManagedImage(source.services?.[index], fallback))
  };
}

function normalizeDetailPage(page = {}, fallback = {}) {
  const source = page || {};
  const fallbackGallery = Array.isArray(fallback.gallery) ? fallback.gallery : [];
  const legacyCateringIntroTitle = '从 1 + 4 + 2 + 1 开始，自由调整。';
  const introTitle = fallback === DEFAULT_DETAIL_CONTENT.catering && source.introTitle === legacyCateringIntroTitle
    ? ''
    : String(source.introTitle || fallback.introTitle || '').trim();
  const sourceGallery = Array.isArray(source.gallery) && source.gallery.length ? source.gallery : fallbackGallery;
  const isLegacyStylingGallery = fallback === DEFAULT_DETAIL_CONTENT.styling
    && sourceGallery.length < fallbackGallery.length
    && sourceGallery.some(item => String(item?.image || '').includes('reference-series/service-styling.png'));
  const gallerySource = isLegacyStylingGallery
    ? [...sourceGallery, ...fallbackGallery.filter(fallbackItem => !sourceGallery.some(item => item?.image === fallbackItem.image))]
    : sourceGallery;
  return {
    eyebrow: String(source.eyebrow || fallback.eyebrow || '').trim(),
    title: String(source.title || fallback.title || '').trim(),
    heroDesc: String(source.heroDesc || fallback.heroDesc || '').trim(),
    heroImage: String(source.heroImage || fallback.heroImage || '').trim(),
    heroAlt: String(source.heroAlt || fallback.heroAlt || '').trim(),
    kicker: String(source.kicker || fallback.kicker || '').trim(),
    introTitle,
    introDesc: String(source.introDesc || fallback.introDesc || '').trim(),
    contactTitle: String(source.contactTitle || fallback.contactTitle || '').trim(),
    contactDesc: String(source.contactDesc || fallback.contactDesc || '').trim(),
    panelTitle: String(source.panelTitle || fallback.panelTitle || '').trim(),
    panelDesc: String(source.panelDesc || fallback.panelDesc || '').trim(),
    gallery: gallerySource.map((item, index) => ({
      image: String(item?.image || fallbackGallery[index]?.image || '').trim(),
      alt: String(item?.alt || fallbackGallery[index]?.alt || '').trim(),
      caption: String(item?.caption || fallbackGallery[index]?.caption || '').trim()
    })).filter(item => item.image || item.alt || item.caption)
  };
}

function normalizeDetailPages(details = {}) {
  return Object.fromEntries(Object.entries(DEFAULT_DETAIL_CONTENT).map(([key, fallback]) => [
    key,
    normalizeDetailPage(details?.[key], fallback)
  ]));
}

function defaultMediaContent() {
  return {
    cases: normalizeCaseItems(DEFAULT_STYLING_CASES),
    video: normalizeVideoContent(DEFAULT_VIDEO_CONTENT),
    homepage: normalizeHomepageMedia(DEFAULT_HOMEPAGE_MEDIA),
    details: normalizeDetailPages(DEFAULT_DETAIL_CONTENT)
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

function defaultWeeklyDays(language = 'zh') {
  const key = language === 'en' ? 'en' : 'zh';
  return DEFAULT_WEEKDAYS.map((weekday, index) => {
    const preset = DEFAULT_WEEKLY_MENU[index];
    return {
      day: weekday[key],
      dish: preset[key],
      image: preset.image,
      alt: preset.alt,
      preset: preset.day
    };
  });
}

function defaultAdminContent() {
  return {
    zh: {
      site: siteContentDefaults('zh'),
      weekly: {
        days: defaultWeeklyDays('zh'),
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
        days: defaultWeeklyDays('en'),
        note: htmlToPlainText(translations.en.weekly.note)
      },
      addons: translations.en.addons.list.map(item => ({
        name: item.label,
        sub: '',
        price: htmlToPlainText(translations.en.addons.priceHtml)
      }))
    },
    catering: defaultCateringContent(),
    media: defaultMediaContent()
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

    const rawWeeklyDays = Array.isArray(source.weekly?.days) && source.weekly.days.length
      ? source.weekly.days
      : normalized[language].weekly.days;
    const isLegacyWeeklyContent = rawWeeklyDays.length > 0
      && rawWeeklyDays.length <= 5
      && rawWeeklyDays.every(item => !item?.image);
    const weeklyDays = (isLegacyWeeklyContent ? normalized[language].weekly.days : rawWeeklyDays)
      .slice(0, DEFAULT_WEEKDAYS.length);
    normalized[language].weekly.days = weeklyDays
      .map((item, index) => {
        const preset = DEFAULT_WEEKLY_MENU.find(option => option.day === item?.preset || option.image === item?.image);
        return {
          day: String(item?.day || DEFAULT_WEEKDAYS[index][language]).trim(),
          dish: String(item?.dish || '').trim(),
          image: String(item?.image || preset?.image || DEFAULT_WEEKLY_MENU[index]?.image || '').trim(),
          alt: String(item?.alt || preset?.alt || DEFAULT_WEEKLY_MENU[index]?.alt || '').trim(),
          preset: String(item?.preset || preset?.day || '').trim()
        };
      })
      .filter(item => item.day || item.dish || item.image);
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

  const mediaSource = content?.media || {};
  normalized.media = {
    cases: normalizeCaseItems(mediaSource.cases || normalized.media.cases),
    video: normalizeVideoContent(mediaSource.video || normalized.media.video),
    homepage: normalizeHomepageMedia(mediaSource.homepage || normalized.media.homepage),
    details: normalizeDetailPages(mediaSource.details || normalized.media.details)
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

function setText(selector, value, root = document) {
  const element = root.querySelector(selector);
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

function localDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseLocalDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (![year, month, day].every(Number.isFinite)) return null;
  return new Date(year, month - 1, day);
}

function addCalendarDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function countMealWeekdays(start, end) {
  if (!start || !end || end < start) return 0;
  let count = 0;
  const cursor = new Date(start);
  while (cursor <= end) {
    const weekday = cursor.getDay();
    if (weekday !== 0 && weekday !== 6) count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

function formatMealDate(value) {
  const date = parseLocalDate(value);
  if (!date) return value || '-';
  return new Intl.DateTimeFormat(currentLanguage === 'en' ? 'en-MY' : 'zh-MY', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

function syncMealPlanPeriod() {
  if (!mealStartDate || !mealEndDate || !mealPeriodSummary) return;
  const start = parseLocalDate(mealStartDate.value);
  const end = parseLocalDate(mealEndDate.value);
  const orderDateField = document.getElementById('date');
  if (!start || !end) {
    mealPeriodSummary.textContent = currentLanguage === 'en'
      ? 'Choose dates to calculate your working-day meals.'
      : '请选择日期，系统会计算工作日餐数。';
    if (orderDateField) orderDateField.value = '待确认';
    return;
  }
  if (end < start) {
    mealPeriodSummary.textContent = currentLanguage === 'en'
      ? 'End date must be on or after the start date.'
      : '结束日期必须是开始日期当天或之后。';
    if (orderDateField) orderDateField.value = '日期待确认';
    return;
  }

  const meals = countMealWeekdays(start, end);
  const total = meals * MEAL_PLAN_RATE;
  mealPeriodSummary.textContent = currentLanguage === 'en'
    ? `${formatMealDate(mealStartDate.value)} - ${formatMealDate(mealEndDate.value)} · ${meals} working-day meals · Estimated RM${total}`
    : `${formatMealDate(mealStartDate.value)} 至 ${formatMealDate(mealEndDate.value)} · ${meals} 个工作日餐 · 预计 RM${total}`;
  if (orderDateField) {
    orderDateField.value = `${formatMealDate(mealStartDate.value)} 至 ${formatMealDate(mealEndDate.value)}（${meals} 个工作日）`;
  }
}

function setMealPlanDuration(workdays) {
  if (!mealStartDate || !mealEndDate) return;
  const start = parseLocalDate(mealStartDate.value) || new Date();
  const end = new Date(start);
  let remaining = Math.max(1, workdays);
  while (remaining > 1) {
    end.setDate(end.getDate() + 1);
    const weekday = end.getDay();
    if (weekday !== 0 && weekday !== 6) remaining -= 1;
  }
  mealStartDate.value = localDateValue(start);
  mealEndDate.value = localDateValue(end);
  syncMealPlanPeriod();
}

function initializeMealPlanDates() {
  if (!mealStartDate || !mealEndDate) return;
  const today = new Date();
  const todayValue = localDateValue(today);
  mealStartDate.min = todayValue;
  mealEndDate.min = todayValue;
  if (!mealStartDate.value) {
    const firstWorkingDay = new Date(today);
    while (firstWorkingDay.getDay() === 0 || firstWorkingDay.getDay() === 6) {
      firstWorkingDay.setDate(firstWorkingDay.getDate() + 1);
    }
    mealStartDate.value = localDateValue(firstWorkingDay);
  }
  if (!mealEndDate.value) setMealPlanDuration(5);
  syncMealPlanPeriod();
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
  if (!document.body.classList.contains('detail-page-body')) {
    document.title = t.title;
    updateSeoMeta(t);
  }

  [
    ['a[href="#home"]', t.nav.home],
    ['a[href="#about"]', currentLanguage === 'en' ? 'About Us' : '关于我们'],
    ['a[href="#meal-plan"]', t.nav.meal],
    ['a[href="#catering"]', t.nav.catering],
    ['a[href="#styling"]', t.nav.styling],
    ['a[href="#cocktail"]', currentLanguage === 'en' ? 'Cocktail Service' : '鸡尾酒服务'],
    ['a[href="#contact"]', currentLanguage === 'en' ? 'Contact Us' : '联系我们']
  ].forEach(([selector, value]) => {
    document.querySelectorAll(`#navLinks ${selector}`).forEach(link => {
      link.textContent = value;
    });
  });
  setHtml('.nav-whatsapp', `<i class="ri-whatsapp-line" aria-hidden="true"></i> ${t.nav.whatsapp}`);
  updateMemberButton();
  const quickMessage = currentLanguage === 'en'
    ? 'Hi, I would like to ask about 90 PROJECT.'
    : '你好，我想询问九零食刻 90 PROJECT。';
  const navWhatsapp = document.querySelector('.nav-whatsapp');
  const whatsappNumber = String(t.contact?.whatsapp || WHATSAPP_NUMBER).replace(/\D/g, '');
  if (navWhatsapp) navWhatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quickMessage)}`;
  setText('.mobile-wa', t.nav.mobileWhatsApp);
  menuToggle?.setAttribute('aria-label', t.nav.menu);
  backTop?.setAttribute('aria-label', t.nav.backTop);
  updateStylingCasePlayButton();

  setText('.hero h1', t.hero.title);
  setText('.hero-en', t.hero.eyebrow);
  setText('.hero-tags', t.hero.tags);
  setText('.hero-slogan', t.hero.slogan);
  setHtml('.hero-sub', t.hero.sub);
  setText('.hero-actions .btn-gold', t.hero.primary);
  setText('.hero-actions .btn-outline', t.hero.secondary);
  document.querySelectorAll('.hero-proof-grid span small').forEach((item, index) => {
    item.textContent = t.hero.proof?.[index] || item.textContent;
  });

  document.querySelectorAll('.service-card').forEach((card, index) => {
    const service = t.services[index];
    if (!service) return;
    card.querySelector('h3').textContent = service.title;
    card.querySelector('.service-en').textContent = service.label;
    card.querySelector('p:last-child').textContent = service.desc;
  });

  setText('#meal-plan .compact-title h2', t.mealPlan.title);
  setText('#meal-plan .compact-title span', t.mealPlan.label);
  setText('#meal-plan .price-pill strong', t.mealPlan.price);
  setText('#meal-plan .price-pill > span', t.mealPlan.priceUnit);
  setText('#meal-plan .price-pill small', t.mealPlan.priceNote);
  document.querySelectorAll('#meal-plan .check-list li').forEach((item, index) => {
    const point = t.mealPlan.points?.[index];
    if (!point) return;
    const icon = item.querySelector('i');
    item.replaceChildren(icon, document.createTextNode(point));
  });
  setText('#mealPeriodTitle', t.mealPlan.periodTitle);
  setText('.meal-period-heading span', t.mealPlan.periodLabel);
  setText('.meal-period-heading p', t.mealPlan.periodDesc);
  document.querySelectorAll('[data-meal-duration]').forEach((button, index) => {
    button.textContent = t.mealPlan.quickOptions?.[index] || button.textContent;
  });
  document.querySelectorAll('.meal-date-grid label').forEach((label, index) => {
    const input = label.querySelector('input');
    const text = index === 0 ? t.mealPlan.startLabel : t.mealPlan.endLabel;
    label.replaceChildren(document.createTextNode(text), input);
  });
  const mealButton = document.querySelector('#meal-plan .choose-package');
  if (mealButton) {
    mealButton.innerHTML = `<i class="ri-whatsapp-line" aria-hidden="true"></i>${escapeHtml(t.mealPlan.periodButton)}`;
  }
  updatePriceCards(t);

  setText('.weekly-menu .panel-title h2', t.weekly.title);
  setText('.weekly-menu .panel-title span', t.weekly.label);
  setText('.weekly-reference-card .compact-title h2', t.weekly.title);
  const dayList = document.querySelector('.day-list');
  if (dayList) {
    dayList.innerHTML = editable.weekly.days.map(item => `
      <li><strong>${escapeHtml(item.day)}</strong><span>${escapeHtml(item.dish)}</span></li>
    `).join('');
  }
  renderWeeklyReferenceGrid(editable.weekly.days);
  setHtml('.weekly-menu .note', formatMultiline(editable.weekly.note));
  setHtml('.weekly-reference-card .note', formatMultiline(editable.weekly.note));

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
  setFieldLabel('notes', t.order.fields.notes);
  setText('fieldset legend', t.order.fields.addons);
  setPlaceholder('name', t.order.placeholders.name);
  setPlaceholder('phone', t.order.placeholders.phone);
  setPlaceholder('pax', t.order.placeholders.pax);
  setPlaceholder('area', t.order.placeholders.area);
  setPlaceholder('notes', t.order.placeholders.notes);
  updateSelectOptions('package', t.order.packageOptions);
  updateSelectOptions('meal', t.order.mealOptions);
  setText('#orderForm .btn-wide', t.order.submit);
  setText('.order-preview-head span', t.order.previewLabel);
  setText('#copyOrderPreview', t.order.copyPreview);
  renderOrderPreview();

  updateFeatureCard('#catering', t.features.catering);
  updateFeatureCard('#styling', t.features.styling);
  document.querySelectorAll('.reference-service-card').forEach((card, index) => {
    const item = t.showcase?.[index];
    if (!item) return;
    setText('h2', item.title, card);
    setText('span', item.label, card);
    setText('p', item.desc, card);
    setText('.btn', item.button, card);
  });
  setText('.why-strip h2', t.why?.title || '');
  document.querySelectorAll('.why-strip div span').forEach((item, index) => {
    const icon = item.querySelector('i');
    const label = t.why?.items?.[index];
    if (label && icon) item.replaceChildren(icon, document.createTextNode(label));
  });
  const homepageStory = currentLanguage === 'en'
    ? {
      experienceKicker: 'CHOOSE YOUR EXPERIENCE',
      experienceTitle: 'Start with the service that matches your occasion',
      experienceDescription: 'Meal plans, catering, event styling and beverage bars stay separated so customers can move directly into the right flow.',
      storyKicker: 'BRAND JOURNEY',
      storyTitle: 'From Daily Meals to Memorable Celebrations',
      storyDescription: '90 PROJECT keeps everyday meals dependable, then brings the same care into buffet lines, styled tables and beverage bars for events.'
    }
    : {
      experienceKicker: '选择你的服务体验',
      experienceTitle: '按场景进入对应服务',
      experienceDescription: '日常包伙食、活动外餐、场地布置和饮料吧都保留独立入口，顾客不用在一大堆信息里找方向。',
      storyKicker: '品牌旅程',
      storyTitle: '从每天的一餐，到值得记住的庆典',
      storyDescription: '90 PROJECT 把日常包伙食的稳定、卫生与准时，延伸到外餐、场地布置和饮料吧，让顾客从午餐到活动都能交给同一个团队。'
    };
  setText('[data-experience-field="kicker"]', homepageStory.experienceKicker);
  setText('[data-experience-field="title"]', homepageStory.experienceTitle);
  setText('[data-experience-field="description"]', homepageStory.experienceDescription);
  setText('[data-story-field="kicker"]', homepageStory.storyKicker);
  setText('[data-story-field="title"]', homepageStory.storyTitle);
  setText('[data-story-field="description"]', homepageStory.storyDescription);
  if (t.growth) {
    setText('[data-growth-home="title"]', t.growth.title);
    setText('[data-growth-home="description"]', t.growth.description);
    setText('[data-growth-home="apply"]', t.growth.apply);
    setText('[data-growth-home="view"]', t.growth.view);
    document.querySelectorAll('[data-growth-home^="step"]').forEach((item, index) => {
      item.textContent = t.growth.steps?.[index] || item.textContent;
    });
  }
  renderMediaContent();
  setText('.teaser-copy span', t.cateringTool.label);
  setText('.teaser-copy h2', t.cateringTool.title);
  setText('.teaser-copy p', t.cateringTool.desc);
  document.querySelectorAll('.teaser-points span').forEach((item, index) => {
    item.textContent = t.cateringTool.points[index] || item.textContent;
  });
  setText('.catering-menu-teaser .btn', t.cateringTool.button);
  setText('.menu-builder-head span', t.cateringTool.builderLabel);
  setText('.menu-builder-head h3', t.cateringTool.builderTitle);
  setText('.menu-builder-head p', t.cateringTool.builderDesc);
  setText('[data-close-catering-menu]', t.cateringTool.close);
  updateFaq(t);

  setText('.footer-brand h2', t.cta.title);
  setText('.footer-brand strong', currentLanguage === 'en' ? '90 PROJECT' : '九零食刻 90 PROJECT');
  setText('.footer-brand p', t.cta.slogan);
  setText('.final-cta .btn.big', t.cta.button);
  setText('.site-footer span:nth-child(2)', `WhatsApp: ${t.contact?.phone || '018-949 0909'}`);
  setText('.site-footer span:nth-child(3)', currentLanguage === 'en'
    ? '© 2026 90 PROJECT. All Rights Reserved.'
    : '© 2026 九零食刻 90 PROJECT. All Rights Reserved.');
  setText('.site-footer a', currentLanguage === 'en' ? 'Admin' : '后台');
  renderManagedContent();
  syncMealPlanPeriod();

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
  setText('#memberProfileForm .member-records-head h3', t.member.profileTitle);
  setText('#memberProfileForm .member-records-head button', t.member.saveProfile);
  setFieldLabel('profileName', t.member.name);
  setFieldLabel('profilePhone', t.member.phone);
  setFieldLabel('profileArea', t.member.profileArea);
  setFieldLabel('profileDefaultPackage', t.member.profilePackage);
  setFieldLabel('profilePreference', t.member.profilePreference);
  document.querySelectorAll('.member-tier-card span').forEach((label, index) => {
    label.textContent = [t.member.levelLabel, t.member.nextLabel][index] || label.textContent;
  });
  setText('.member-records-head:not(.member-rewards-head) h3', t.member.recordsTitle);
  setText('#clearMemberRecords', t.member.clearRecords);

  updateLanguageButtons();
  updateMemberButton();
  renderMemberState();
  if (isAdminLoggedIn()) {
    renderAdminInquiries();
    renderAdminMembers(false);
  }
  document.dispatchEvent(new CustomEvent('np90:languagechange', {
    detail: { language: currentLanguage }
  }));
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

    if (!MEMBER_STATUSES.includes(member.status)) {
      member.status = 'active';
      changed = true;
    }

    if (!MEMBER_TIERS.includes(member.tier)) {
      member.tier = 'Classic';
      changed = true;
    }

    if (!member.profile || typeof member.profile !== 'object') {
      member.profile = {};
      changed = true;
    }

    if (typeof member.adminNote !== 'string') {
      member.adminNote = '';
      changed = true;
    }
  });

  return changed;
}

function memberStatusLabel(status) {
  const labels = currentLanguage === 'en'
    ? { active: 'Active', vip: 'VIP', blocked: 'Blocked' }
    : { active: '正常会员', vip: 'VIP 会员', blocked: '暂停会员' };
  return labels[status] || labels.active;
}

function calculateRewardSummary(rewards = []) {
  return rewards.reduce((summary, reward) => {
    const status = reward.status === '待确认' ? 'pending' : (reward.status || 'pending');
    const fixedCredit = Number.parseFloat(reward.fixedCredit ?? reward.fixed_credit ?? 0) || 0;
    summary[status] = (summary[status] || 0) + fixedCredit;
    summary.totalRecords += 1;
    if (status === 'approved') summary.approvedRecords += 1;
    if (status === 'pending') summary.pendingRecords += 1;
    return summary;
  }, { pending: 0, approved: 0, redeemed: 0, cancelled: 0, totalRecords: 0, approvedRecords: 0, pendingRecords: 0 });
}

function calculateMemberTier(member) {
  const recordCount = member?.records?.length || 0;
  const rewardSummary = calculateRewardSummary(member?.referralRewards || []);
  const approvedValue = rewardSummary.approved + rewardSummary.redeemed;

  if (member?.tier === 'Black Gold' || recordCount >= 8 || approvedValue >= 100) {
    return {
      tier: 'Black Gold',
      title: currentLanguage === 'en' ? 'Black Gold Member' : '黑金会员',
      progress: currentLanguage === 'en'
        ? 'Top member level. Prioritize follow-up, catering and styling opportunities.'
        : '最高会员等级。适合重点跟进包伙食、外餐和布置需求。'
    };
  }

  if (member?.tier === 'Gold' || member?.status === 'vip' || recordCount >= 3 || approvedValue >= 40) {
    const remaining = Math.max(0, 8 - recordCount);
    return {
      tier: 'Gold',
      title: currentLanguage === 'en' ? 'Gold Member' : '黄金会员',
      progress: currentLanguage === 'en'
        ? `${remaining} more inquiry records to reach Black Gold.`
        : `再完成 ${remaining} 笔询问记录可升级黑金会员。`
    };
  }

  const remaining = Math.max(0, 3 - recordCount);
  return {
    tier: 'Classic',
    title: currentLanguage === 'en' ? 'Classic Member' : '经典会员',
    progress: currentLanguage === 'en'
      ? `${remaining} more inquiry records to reach Gold.`
      : `再完成 ${remaining} 笔询问记录可升级黄金会员。`
  };
}

function renderReferralQr(link = '') {
  if (!memberReferralQr) return;
  const seed = Array.from(link || 'NP90').reduce((total, char) => total + char.charCodeAt(0), 0);
  const cells = Array.from({ length: 49 }, (_, index) => {
    const active = index < 7 || index > 41 || index % 7 === 0 || index % 7 === 6 || ((seed + index * 17) % 5 < 2);
    return `<i class="${active ? 'active' : ''}"></i>`;
  }).join('');
  memberReferralQr.innerHTML = `<div>${cells}</div><span>${currentLanguage === 'en' ? 'Member link visual code' : '会员链接视觉码'}</span>`;
}

function renderMemberProfileForm(member) {
  if (!member) return;
  if (profileName) profileName.value = member.name || '';
  if (profilePhone) profilePhone.value = member.phone || '';
  if (profileArea) profileArea.value = member.profile?.area || '';
  if (profileDefaultPackage) profileDefaultPackage.value = member.profile?.defaultPackage || '';
  if (profilePreference) profilePreference.value = member.profile?.preference || '';
}

function applyMemberProfileToOrder(member) {
  if (!member || !form) return;
  const areaInput = getById('area');
  const notesInput = getById('notes');
  const preferredPackage = member.profile?.defaultPackage || '';
  if (areaInput && !areaInput.value && member.profile?.area) areaInput.value = member.profile.area;
  if (preferredPackage) setPackageValue(preferredPackage);
  if (notesInput && !notesInput.value && member.profile?.preference) notesInput.value = member.profile.preference;
  renderOrderPreview();
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
  const growthMember = getCurrentGrowthMember();
  if (growthMember) return growthMember;
  const email = currentMemberEmail();
  if (!email) return null;
  return loadMembers().find(member => member.email === email) || null;
}

function getCurrentGrowthMember() {
  try {
    const memberId = localStorage.getItem(GROWTH_SESSION_KEY);
    if (!memberId) return null;
    const state = JSON.parse(localStorage.getItem(GROWTH_STATE_KEY) || 'null');
    return state?.members?.find(member => member.id === memberId) || { id: memberId, name: '90 Member' };
  } catch {
    return null;
  }
}

function updateMemberButton() {
  const member = getCurrentMember();
  const t = languageText();
  const quickLabel = member
    ? (currentLanguage === 'en' ? 'Member Centre' : '会员中心')
    : (currentLanguage === 'en' ? 'Member Login / Register' : '会员登录 / 注册');
  if (memberOpen) memberOpen.textContent = member ? t.member.centerButton : t.member.loginButton;
  const quick = document.querySelector('.nav-member-quick');
  if (quick) {
    quick.innerHTML = `<i class="ri-user-heart-line" aria-hidden="true"></i><span>${quickLabel}</span>`;
    quick.setAttribute('aria-label', quickLabel);
  }
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
        <p>${currentLanguage === 'en' ? 'Status' : '状态'}：${escapeHtml(inquiryStatusLabel(record.status || 'new'))}</p>
        <p>${currentLanguage === 'en' ? 'Pax' : '人数'}：${escapeHtml(record.pax || '-')} ｜ ${currentLanguage === 'en' ? 'Meal' : '餐期'}：${escapeHtml(record.meal || '-')}</p>
        <p>${currentLanguage === 'en' ? 'Start date' : '开始日期'}：${escapeHtml(record.date || '-')} ｜ ${currentLanguage === 'en' ? 'Area' : '区域'}：${escapeHtml(record.area || '-')}</p>
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
    const normalizedStatus = reward.status === '待确认' ? 'pending' : (reward.status || 'pending');
    return `
      <article class="member-record">
        <strong>${escapeHtml(reward.referredName || (currentLanguage === 'en' ? 'Member record' : '会员记录'))}</strong>
        <p>${currentLanguage === 'en' ? 'Date' : '日期'}：${date}</p>
        <p>${currentLanguage === 'en' ? 'Package' : '配套'}：${escapeHtml(reward.package || '-')}</p>
        <p>${currentLanguage === 'en' ? 'Level' : '层级'}：${escapeHtml(reward.level ? `L${reward.level}` : 'L1')}</p>
        ${reward.fixedCredit ? `<p>${currentLanguage === 'en' ? 'Credit' : '额度'}：RM${escapeHtml(reward.fixedCredit)}</p>` : ''}
        <p>${currentLanguage === 'en' ? 'Rate' : '比例'}：${escapeHtml(reward.ratePercent || 1)}%</p>
        <p>${currentLanguage === 'en' ? 'Status' : '状态'}：${escapeHtml(referralRewardStatusLabel(normalizedStatus))}</p>
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
    return `Hi, I would like to ask about 90 PROJECT meal plans / catering service.`;
  }

  return `你好，我想询问九零食刻 90 PROJECT 包伙食 / 外餐服务。`;
}

function renderMemberOverview(member) {
  const tierInfo = calculateMemberTier(member);
  const rewardSummary = calculateRewardSummary(member?.referralRewards || []);
  const records = member?.records || [];
  const latestRecord = records[0];

  if (memberTierBadge) memberTierBadge.textContent = `${tierInfo.title} · ${memberStatusLabel(member?.status || 'active')}`;
  if (memberTierProgress) memberTierProgress.textContent = tierInfo.progress;
  if (memberRewardSummary) {
    memberRewardSummary.textContent = currentLanguage === 'en'
      ? `RM${rewardSummary.approved} approved · RM${rewardSummary.pending} pending`
      : `RM${rewardSummary.approved} 已批准 · RM${rewardSummary.pending} 待确认`;
  }
  if (memberNextAction) {
    if (!records.length) {
      memberNextAction.textContent = currentLanguage === 'en' ? 'Submit your first inquiry' : '提交第一笔询问';
    } else {
      memberNextAction.textContent = currentLanguage === 'en'
        ? `Latest: ${inquiryStatusLabel(latestRecord.status || 'new')}`
        : `最近状态：${inquiryStatusLabel(latestRecord.status || 'new')}`;
    }
  }
}

function renderReferralPanel(member) {
  if (!member) {
    if (memberReferralCode) memberReferralCode.textContent = '-';
    if (memberReferralLink) memberReferralLink.textContent = '-';
    if (shareReferralWhatsApp) shareReferralWhatsApp.href = '#';
    renderReferralQr('');
    renderReferralRewards(null);
    return;
  }

  const code = normalizeReferralCode(member.referralCode);
  const link = referralShareLink(member);
  if (memberReferralCode) memberReferralCode.textContent = code;
  if (memberReferralLink) memberReferralLink.textContent = link;
  if (shareReferralWhatsApp) {
    shareReferralWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(referralShareMessage(member))}`;
  }
  renderReferralQr(link);
  renderReferralRewards(member);
}

function renderMemberState() {
  const member = getCurrentMember();
  updateMemberButton();

  if (member) {
    if (memberAuthPanel) memberAuthPanel.hidden = true;
    if (memberDashboard) memberDashboard.hidden = false;
    if (memberProfileText) {
      memberProfileText.textContent = `${member.name} · ${member.phone} · ${member.email} · ${memberStatusLabel(member.status || 'active')}`;
    }
    renderMemberOverview(member);
    renderMemberProfileForm(member);
    renderReferralPanel(member);
    renderMemberRecords(member);
    fillMemberToOrder(member);
    applyMemberProfileToOrder(member);
  } else {
    if (memberAuthPanel) memberAuthPanel.hidden = false;
    if (memberDashboard) memberDashboard.hidden = true;
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
  return {
    name: fieldValue('name'),
    phone: fieldValue('phone'),
    package: fieldValue('package'),
    pax: fieldValue('pax'),
    meal: fieldValue('meal'),
    date: fieldValue('date'),
    area: fieldValue('area'),
    referralCode: '',
    addons: '',
    notes: fieldValue('notes'),
    leadSource: currentLeadSource()
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
备注：${displayValue(data.notes)}

请帮我确认价格和配送安排，谢谢。`;
}

function renderOrderPreview() {
  if (!orderPreviewText) return;
  const data = collectOrderData();
  const hasInput = ['name', 'phone', 'pax', 'date', 'area', 'notes'].some(key => data[key]);
  if (!hasInput) {
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
    lead_source: inquiry.leadSource || inquiry.source || null,
    budget: null,
    message: buildOrderMessage(inquiry),
    status: inquiry.status || 'new',
    admin_notes: [
      inquiry.notes ? `Notes: ${inquiry.notes}` : '',
      inquiry.leadSource ? `Lead source: ${inquiry.leadSource}` : '',
      inquiry.language ? `Language: ${inquiry.language}` : ''
    ].filter(Boolean).join('\n') || null
  };
  if (userId) payload.user_id = userId;
  return payload;
}

function supabaseRowToInquiry(row) {
  const [packageName = row.service_type || '', meal = ''] = String(row.service_type || '').split(' | ');
  const notes = String(row.admin_notes || '').replace(/^Lead source:.*$/m, '').replace(/^Language:.*$/m, '').replace(/^Notes:\s*/m, '').trim();
  const leadSourceMatch = String(row.admin_notes || '').match(/^Lead source:\s*(.+)$/m);
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
    referralCode: '',
    addons: '',
    notes,
    status: row.status || 'new',
    source: 'supabase',
    leadSource: row.lead_source || leadSourceMatch?.[1] || 'supabase',
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

function numericValue(value) {
  const number = Number(String(value || '').replace(/[^\d.]/g, ''));
  return Number.isFinite(number) ? number : 0;
}

function growthOrderPayloadFromInquiry(inquiry) {
  const serviceType = inquiry.package || inquiry.serviceType || inquiry.meal || 'Website Inquiry';
  const packageName = inquiry.meal || inquiry.package || '';
  const totalAmount = numericValue(inquiry.totalAmount || inquiry.budget || inquiry.price || inquiry.estimatedTotal);
  const phoneDigits = String(inquiry.phone || '').replace(/\D/g, '');
  return {
    externalInquiryId: inquiry.supabaseId || inquiry.id,
    sourceInquiryId: inquiry.id,
    name: inquiry.name || 'WhatsApp Customer',
    phone: inquiry.phone || '',
    email: inquiry.email || (phoneDigits ? `${phoneDigits}@guest.90project.local` : ''),
    serviceType,
    packageName,
    eventDate: inquiry.date || inquiry.eventDate || '',
    eventTime: inquiry.time || inquiry.eventTime || '',
    location: inquiry.area || inquiry.location || '',
    pax: numericValue(inquiry.pax || inquiry.guestCount),
    foodChoice: inquiry.meal || '',
    budget: totalAmount,
    totalAmount,
    notes: [inquiry.notes, inquiry.addons ? `Add-ons: ${inquiry.addons}` : ''].filter(Boolean).join('\n'),
    referralCode: inquiry.referralCode || '',
    language: inquiry.language || currentLanguage,
    status: 'confirmed',
    source: 'whatsapp-inquiry',
    createdAt: inquiry.createdAt || new Date().toISOString()
  };
}

async function syncGrowthOrderLeadToSupabase(payload) {
  if (!isSupabaseConfigured() || !payload?.externalInquiryId) return;
  try {
    await supabaseFetch('/rest/v1/growth_order_leads?on_conflict=source_inquiry_id', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: {
        source_inquiry_id: payload.externalInquiryId,
        local_inquiry_id: payload.sourceInquiryId || null,
        customer_name: payload.name || null,
        phone: payload.phone || null,
        email: payload.email || null,
        service_type: payload.serviceType || null,
        package_name: payload.packageName || null,
        event_date: payload.eventDate || null,
        event_time: payload.eventTime || null,
        event_location: payload.location || null,
        pax: payload.pax || null,
        notes: payload.notes || null,
        referral_code: payload.referralCode || null,
        estimated_amount: payload.totalAmount || 0,
        status: payload.status || 'confirmed',
        raw_payload: payload
      }
    });
  } catch (error) {
    console.warn('Supabase growth lead sync failed', error);
  }
}

function queueGrowthOrderFromInquiry(inquiry) {
  const payload = growthOrderPayloadFromInquiry(inquiry);
  if (!payload.externalInquiryId) return;
  try {
    const queue = JSON.parse(localStorage.getItem(GROWTH_ORDER_QUEUE_KEY) || '[]');
    const safeQueue = Array.isArray(queue) ? queue : [];
    const next = [
      payload,
      ...safeQueue.filter(item => item?.externalInquiryId !== payload.externalInquiryId)
    ].slice(0, 160);
    localStorage.setItem(GROWTH_ORDER_QUEUE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('np90:growth-order-queued'));
  } catch (error) {
    console.warn('Growth order queue failed', error);
  }
  syncGrowthOrderLeadToSupabase(payload);
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
    leadSource: orderData.leadSource || currentLeadSource(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  inquiries.unshift(inquiry);
  saveInquiries(inquiries);
  renderAdminInquiries();
  queueGrowthOrderFromInquiry(inquiry);
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
        <p>${currentLanguage === 'en' ? 'Lead source' : '来源'}：${escapeHtml(inquiry.leadSource || inquiry.source || 'direct')}</p>
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
      syncMemberInquiryStatus(id, status);
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
  syncMemberInquiryStatus(id, status);
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

function syncMemberInquiryStatus(id, status) {
  const members = loadMembers();
  let changed = false;
  members.forEach(member => {
    (member.records || []).forEach(record => {
      if (record.id === id || record.supabaseId === id) {
        record.status = status;
        record.updatedAt = new Date().toISOString();
        changed = true;
      }
    });
  });
  if (!changed) return;
  saveMembers(members);
  renderMemberState();
  if (isAdminLoggedIn()) renderAdminMembers(false);
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
        <b>${escapeHtml(reward.referred_name || reward.referredName || (currentLanguage === 'en' ? 'Member record' : '会员记录'))}</b>
        <span>${escapeHtml(date)} · L${escapeHtml(reward.level || 1)} · RM${escapeHtml(reward.fixed_credit ?? reward.fixedCredit ?? 0)} + ${escapeHtml(reward.rate_percent ?? reward.ratePercent ?? 0)}%</span>
      </div>
      <select data-reward-status ${idAttribute}>${rewardStatusOptions(status)}</select>
    </div>
  `;
}

function memberStatusOptions(selectedStatus) {
  const normalized = MEMBER_STATUSES.includes(selectedStatus) ? selectedStatus : 'active';
  return MEMBER_STATUSES.map(status => (
    `<option value="${status}" ${status === normalized ? 'selected' : ''}>${memberStatusLabel(status)}</option>`
  )).join('');
}

function memberTierOptions(selectedTier) {
  const normalized = MEMBER_TIERS.includes(selectedTier) ? selectedTier : 'Classic';
  const labels = currentLanguage === 'en'
    ? { Classic: 'Classic', Gold: 'Gold', 'Black Gold': 'Black Gold' }
    : { Classic: '经典会员', Gold: '黄金会员', 'Black Gold': '黑金会员' };
  return MEMBER_TIERS.map(tier => (
    `<option value="${tier}" ${tier === normalized ? 'selected' : ''}>${labels[tier] || tier}</option>`
  )).join('');
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
        ? `${members.length} members shown.`
        : `目前显示 ${members.length} 位会员。`;
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
    adminMembers.innerHTML = `<div class="member-empty">${currentLanguage === 'en' ? 'No members yet.' : '目前还没有会员记录。'}</div>`;
    return;
  }

  const memberCards = members.map(member => {
    const memberEmail = String(member.email || '').toLowerCase();
    return `
      <article class="admin-member-card">
        <div>
          <strong>${escapeHtml(member.name || member.email || (currentLanguage === 'en' ? 'Member' : '会员'))}</strong>
          <p>${currentLanguage === 'en' ? 'Phone' : '电话'}：${escapeHtml(member.phone || '-')}</p>
          <p>Email：${escapeHtml(member.email || '-')}</p>
          <p>${currentLanguage === 'en' ? 'Tier' : '会员等级'}：${escapeHtml(member.tier || 'Classic')}</p>
          <p>${currentLanguage === 'en' ? 'Area / Package' : '地区 / 常选配套'}：${escapeHtml(member.profile?.area || '-')} / ${escapeHtml(member.profile?.defaultPackage || '-')}</p>
          <p>${currentLanguage === 'en' ? 'Records' : '询问记录'}：${escapeHtml(member.records?.length || 0)}</p>
          <p>${currentLanguage === 'en' ? 'Area / Package' : '地区 / 配套'}：${escapeHtml(member.profile?.area || '-')} / ${escapeHtml(member.profile?.defaultPackage || '-')}</p>
          <p>${currentLanguage === 'en' ? 'Source' : '来源'}：${escapeHtml(member.source === 'supabase' ? 'Supabase' : 'Local')}</p>
        </div>
        <div class="admin-reward-list">
          <label>${currentLanguage === 'en' ? 'Member status' : '会员状态'}
            <select data-member-admin-field="status" data-member-email="${escapeHtml(memberEmail)}">${memberStatusOptions(member.status)}</select>
          </label>
          <label>${currentLanguage === 'en' ? 'Member tier' : '会员等级'}
            <select data-member-admin-field="tier" data-member-email="${escapeHtml(memberEmail)}">${memberTierOptions(member.tier)}</select>
          </label>
          <label>${currentLanguage === 'en' ? 'Admin note' : '后台备注'}
            <textarea data-member-admin-field="adminNote" data-member-email="${escapeHtml(memberEmail)}" rows="3" placeholder="${currentLanguage === 'en' ? 'Follow-up notes' : '例如：已联系、偏好清淡、VIP 客户'}">${escapeHtml(member.adminNote || '')}</textarea>
          </label>
        </div>
      </article>
    `;
  }).join('');

  adminMembers.innerHTML = `
    ${memberCards}
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

function setMemberAdminField(memberEmail, field, value) {
  const members = loadMembers();
  const member = members.find(item => String(item.email || '').toLowerCase() === String(memberEmail || '').toLowerCase());
  if (!member) return;

  if (field === 'status' && MEMBER_STATUSES.includes(value)) {
    member.status = value;
  } else if (field === 'tier' && MEMBER_TIERS.includes(value)) {
    member.tier = value;
  } else if (field === 'adminNote') {
    member.adminNote = value;
  } else {
    return;
  }

  member.updatedAt = new Date().toISOString();
  saveMembers(members);
  renderAdminMembers(false);
  renderMemberState();
  showAdminMessage(currentLanguage === 'en' ? 'Member setting saved.' : '会员设定已保存。');
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
    members: loadMembers(),
    conversions: loadConversionEvents()
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
      if (Array.isArray(data.conversions)) saveConversionEvents(data.conversions);
      updateStaticLanguage();
      renderCateringMenu();
      renderCateringEstimate();
      renderMediaContent();
      renderAdminEditor();
      renderAdminInquiries();
      renderAdminMembers();
      renderAdminConversions();
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
    id: orderData.id || createInquiryId(),
    ...orderData,
    createdAt: new Date().toISOString(),
    status: orderData.status || 'new'
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
      fixedCredit: 0,
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
  const registerReferralInput = getById('registerReferralCode');
  const params = new URLSearchParams(window.location.search);
  const code = normalizeReferralCode(params.get('ref'));
  if (!code) return;
  if (referralInput) referralInput.value = code;
  if (registerReferralInput) registerReferralInput.value = code;
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
      <p>输入中文全站文案、菜单、菜色或价格说明时，英文栏会自动生成；英文仍可手动微调。</p>
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

function weeklyPresetByDay(day) {
  return DEFAULT_WEEKLY_MENU.find(option => option.day === day) || null;
}

function setWeeklyRowPresetLock(row, locked) {
  if (!(row instanceof HTMLElement)) return;
  ['[data-field="zh-dish"]', '[data-field="weekly-image"]', '[data-field="weekly-alt"]', '[data-field="en-dish"]'].forEach(selector => {
    const field = row.querySelector(selector);
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.readOnly = Boolean(locked);
  });
}

function applyWeeklyPresetToRow(row, preset) {
  if (!(row instanceof HTMLElement) || !preset) return;
  const fields = {
    '[data-field="zh-dish"]': preset.zh,
    '[data-field="en-dish"]': preset.en,
    '[data-field="weekly-image"]': preset.image,
    '[data-field="weekly-alt"]': preset.alt
  };
  Object.entries(fields).forEach(([selector, value]) => {
    const field = row.querySelector(selector);
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.value = value;
  });
  setWeeklyRowPresetLock(row, true);
}

function renderAdminWeeklyRows(content) {
  if (!adminWeeklyRows) return;
  const maxRows = DEFAULT_WEEKDAYS.length;
  const rows = [];

  for (let index = 0; index < maxRows; index += 1) {
    const zh = content.zh.weekly.days[index] || { day: DEFAULT_WEEKDAYS[index].zh, dish: '' };
    const en = content.en.weekly.days[index] || { day: DEFAULT_WEEKDAYS[index].en, dish: '' };
    const selectedPreset = zh.preset || en.preset || DEFAULT_WEEKLY_MENU.find(option => option.image === zh.image)?.day || '';
    const selectedPresetSource = weeklyPresetByDay(selectedPreset);
    const presetLock = selectedPresetSource ? ' readonly' : '';
    const presetOptions = DEFAULT_WEEKLY_MENU.map(option => `<option value="${escapeHtml(option.day)}"${option.day === selectedPreset ? ' selected' : ''}>${escapeHtml(option.day)} \u00b7 ${escapeHtml(option.zh.split('\n')[0])}</option>`).join('');
    rows.push(`
      <div class="admin-row admin-weekly-row" data-weekly-row>
        <label>\u661f\u671f<input data-field="zh-day" value="${escapeHtml(zh.day || DEFAULT_WEEKDAYS[index].zh)}" readonly></label>
        <label>\u5957\u7528\u83dc\u5355\u9884\u8bbe<select data-field="weekly-preset"><option value="">\u624b\u52a8\u7f16\u8f91</option>${presetOptions}</select></label>
        <label>\u4e2d\u6587\u83dc\u8272<textarea data-field="zh-dish" rows="3" placeholder="\u6bcf\u884c\u4e00\u9053\u83dc"${presetLock}>${escapeHtml(selectedPresetSource?.zh || zh.dish)}</textarea></label>
        <label>\u56fe\u7247\u8def\u5f84<input data-field="weekly-image" value="${escapeHtml(selectedPresetSource?.image || zh.image || en.image)}" placeholder="assets/images/reference-series/weekly-menu/day-01.png"${presetLock}></label>
        <label>\u56fe\u7247 Alt<input data-field="weekly-alt" value="${escapeHtml(selectedPresetSource?.alt || zh.alt || en.alt)}" placeholder="\u56fe\u7247\u8bf4\u660e"${presetLock}></label>
        <label>English Menu<textarea data-field="en-dish" rows="3" placeholder="One dish per line"${presetLock}>${escapeHtml(selectedPresetSource?.en || en.dish)}</textarea></label>
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
        <label>English Name<input data-field="en-name" value="${escapeHtml(en.name || zh.sub)}"></label>
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

function renderAdminMediaRows(content) {
  const media = normalizeAdminContent(content).media;
  const video = media.video;

  if (adminVideoTitle) adminVideoTitle.value = video.title;
  if (adminVideoLabel) adminVideoLabel.value = video.label;
  if (adminVideoSrc) adminVideoSrc.value = video.src;
  if (adminVideoPoster) adminVideoPoster.value = video.poster;
  if (adminVideoDesc) adminVideoDesc.value = video.desc;
  if (adminVideoCta) adminVideoCta.value = video.cta;

  if (!adminCaseRows) return;
  adminCaseRows.innerHTML = normalizeCaseItems(media.cases).map((item, index) => `
    <div class="admin-case-row" data-case-row>
      <div class="admin-catering-head">
        <strong>案例 ${index + 1}</strong>
        <span>${escapeHtml(item.label || item.title || item.image)}</span>
      </div>
      <label>小标 / Label<input data-field="case-label" value="${escapeHtml(item.label)}" placeholder="BRAND BACKDROP"></label>
      <label>标题 Title<input data-field="case-title" value="${escapeHtml(item.title)}" placeholder="品牌背景布置"></label>
      <label>图片路径 Image<input data-field="case-image" value="${escapeHtml(item.image)}" placeholder="assets/images/event/styling-backdrop.webp"></label>
      <label>Alt 文字<input data-field="case-alt" value="${escapeHtml(item.alt)}" placeholder="图片说明"></label>
      <label class="admin-catering-items">说明 Description
        <textarea data-field="case-desc" rows="3">${escapeHtml(item.desc)}</textarea>
      </label>
      <button type="button" data-remove-case>删除案例</button>
    </div>
  `).join('');
}

function renderAdminHomepageRows(content) {
  if (!adminHomepageRows) return;
  const homepage = normalizeAdminContent(content).media.homepage;
  const rows = [
    { key: 'hero', label: '首页 Hero 主图', ...homepage.hero },
    { key: 'contact', label: '首页联系图片区', ...homepage.contact },
    ...homepage.services.map((item, index) => ({ key: 'services', index, label: `首页服务图片 ${index + 1}`, ...item }))
  ];
  adminHomepageRows.innerHTML = rows.map(row => `
    <div class="admin-asset-row" data-homepage-row data-homepage-key="${escapeHtml(row.key)}" data-homepage-index="${row.index ?? ''}">
      <strong>${escapeHtml(row.label)}</strong>
      <label>图片路径<input data-field="homepage-image" value="${escapeHtml(row.image)}" placeholder="assets/images/..." /></label>
      <label>Alt 文字<input data-field="homepage-alt" value="${escapeHtml(row.alt)}" placeholder="图片说明" /></label>
    </div>
  `).join('');
}

function renderAdminDetailRows(content) {
  if (!adminDetailRows) return;
  const details = normalizeAdminContent(content).media.details;
  adminDetailRows.innerHTML = Object.entries(details).map(([key, page]) => `
    <section class="admin-detail-editor" data-detail-editor="${escapeHtml(key)}">
      <div class="admin-catering-head"><strong>${escapeHtml(key.toUpperCase())} 服务页</strong><span>可修改标题、说明和所有展示图</span></div>
      <div class="admin-detail-grid">
        <label>Hero 英文小标<input data-field="detail-eyebrow" value="${escapeHtml(page.eyebrow)}"></label>
        <label>Hero 标题<input data-field="detail-title" value="${escapeHtml(page.title)}"></label>
        <label>Hero 图片<input data-field="detail-heroImage" value="${escapeHtml(page.heroImage)}"></label>
        <label>Hero Alt<input data-field="detail-heroAlt" value="${escapeHtml(page.heroAlt)}"></label>
        <label>Hero 说明<textarea data-field="detail-heroDesc" rows="3">${escapeHtml(page.heroDesc)}</textarea></label>
        <label>区块英文小标<input data-field="detail-kicker" value="${escapeHtml(page.kicker)}"></label>
        <label>介绍标题<input data-field="detail-introTitle" value="${escapeHtml(page.introTitle)}"></label>
        <label>介绍说明<textarea data-field="detail-introDesc" rows="3">${escapeHtml(page.introDesc)}</textarea></label>
        <label>联系卡标题<input data-field="detail-contactTitle" value="${escapeHtml(page.contactTitle)}"></label>
        <label>联系卡说明<input data-field="detail-contactDesc" value="${escapeHtml(page.contactDesc)}"></label>
        <label>展示区标题<input data-field="detail-panelTitle" value="${escapeHtml(page.panelTitle)}"></label>
        <label>展示区说明<textarea data-field="detail-panelDesc" rows="3">${escapeHtml(page.panelDesc)}</textarea></label>
      </div>
      <div class="admin-detail-gallery">
        ${page.gallery.map((item, index) => `
          <div class="admin-detail-gallery-row" data-detail-gallery-row>
            <strong>展示图 ${index + 1}</strong>
            <label>图片<input data-field="gallery-image" value="${escapeHtml(item.image)}"></label>
            <label>Alt<input data-field="gallery-alt" value="${escapeHtml(item.alt)}"></label>
            <label>图片说明<input data-field="gallery-caption" value="${escapeHtml(item.caption)}"></label>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');
}

function loadConversionEvents() {
  try {
    return JSON.parse(localStorage.getItem(CONVERSION_EVENTS_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function saveConversionEvents(events) {
  localStorage.setItem(CONVERSION_EVENTS_KEY, JSON.stringify(events.slice(0, 200)));
}

function setLeadSource(source = '') {
  const cleanSource = String(source || '').trim();
  if (cleanSource) localStorage.setItem(LEAD_SOURCE_KEY, cleanSource);
  return cleanSource;
}

function currentLeadSource() {
  return localStorage.getItem(LEAD_SOURCE_KEY) || 'direct';
}

function sourceFromElement(element) {
  if (!element) return '';
  const explicit = element.dataset?.waSource || element.closest?.('[data-wa-source]')?.dataset?.waSource;
  if (explicit) return explicit;
  const href = element.getAttribute?.('href') || '';
  const text = element.textContent?.replace(/\s+/g, ' ').trim() || '';
  if (href.includes('#meal-plan')) return 'nav_meal_plan';
  if (href.includes('#catering-menu')) return 'catering_menu';
  if (href.includes('#catering')) return 'catering_service';
  if (href.includes('#order')) return 'order_form';
  if (/配套|package/i.test(text)) return 'package_card';
  if (/外餐|catering/i.test(text)) return 'catering_service';
  if (/whatsapp|下单|询问/i.test(text)) return 'whatsapp_cta';
  return '';
}

function trackConversion(type, source, detail = {}) {
  const event = {
    id: `cv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    source: source || currentLeadSource(),
    label: detail.label || '',
    page: `${location.pathname}${location.search}${location.hash}`,
    createdAt: new Date().toISOString()
  };
  const events = loadConversionEvents();
  events.unshift(event);
  saveConversionEvents(events);
  syncConversionToSupabase(event);
  renderAdminConversions();
  return event;
}

async function syncConversionToSupabase(event) {
  if (!isSupabaseConfigured() || !event) return;
  try {
    const session = getSupabaseMemberSession();
    await supabaseFetch('/rest/v1/conversion_events', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      token: session?.access_token || undefined,
      body: {
        user_id: session?.user?.id || null,
        event_type: event.type || 'whatsapp_click',
        lead_source: event.source || null,
        label: event.label || null,
        page_path: event.page || null,
        metadata: {
          local_id: event.id,
          created_at: event.createdAt
        }
      }
    });
  } catch (error) {
    console.warn('Supabase conversion sync failed', error);
  }
}

function supabaseConversionRowToEvent(row) {
  return {
    id: row.id,
    type: row.event_type || 'whatsapp_click',
    source: row.lead_source || 'direct',
    label: row.label || '',
    page: row.page_path || '',
    createdAt: row.created_at || new Date().toISOString()
  };
}

async function refreshSupabaseConversions() {
  if (supabaseConversionsFetchInProgress || !isSupabaseConfigured() || !getSupabaseSession()?.access_token) return;
  supabaseConversionsFetchInProgress = true;
  try {
    const rows = await supabaseFetch('/rest/v1/conversion_events?select=*&order=created_at.desc&limit=80');
    supabaseConversionsCache = Array.isArray(rows) ? rows.map(supabaseConversionRowToEvent) : [];
    renderAdminConversions(false);
  } catch (error) {
    console.warn('Supabase conversion fetch failed', error);
  } finally {
    supabaseConversionsFetchInProgress = false;
  }
}

function combinedConversionEvents() {
  const seen = new Set();
  return [...supabaseConversionsCache, ...loadConversionEvents()]
    .filter(event => {
      const key = event.id || `${event.createdAt}-${event.source}-${event.label}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

function renderAdminConversions(refreshRemote = true) {
  if (!adminConversions) return;
  if (refreshRemote) refreshSupabaseConversions();
  const events = combinedConversionEvents();
  if (adminConversionStatus) {
    adminConversionStatus.textContent = events.length
      ? `目前记录 ${events.length} 次 WhatsApp / 下单转化来源（云端 ${supabaseConversionsCache.length}，本地 ${loadConversionEvents().length}）。`
      : '还没有转化记录。顾客点击 WhatsApp 后会自动记录来源。';
  }

  if (!events.length) {
    adminConversions.innerHTML = '<div class="member-empty">目前还没有 WhatsApp 来源记录。</div>';
    return;
  }

  adminConversions.innerHTML = events.slice(0, 60).map(event => {
    const createdAt = new Date(event.createdAt || Date.now()).toLocaleString('zh-MY', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    return `
      <article class="admin-conversion">
        <div>
          <strong>${escapeHtml(event.type || 'whatsapp_click')}</strong>
          <p>来源：${escapeHtml(event.source || '-')}</p>
          <p>按钮：${escapeHtml(event.label || '-')}</p>
          <p>时间：${escapeHtml(createdAt)}</p>
        </div>
        <small>${escapeHtml(event.page || location.pathname)}</small>
      </article>
    `;
  }).join('');
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
  renderAdminMediaRows(content);
  renderAdminHomepageRows(content);
  renderAdminDetailRows(content);
  renderAdminConversions();
  primeAdminTranslationFields();
}

function setAdminPanel(panel = 'site') {
  document.querySelectorAll('[data-admin-panel-tab]').forEach(button => {
    button.classList.toggle('active', button.dataset.adminPanelTab === panel);
  });
  document.querySelectorAll('[data-admin-panel]').forEach(section => {
    section.hidden = section.dataset.adminPanel !== panel;
  });
}

function renderAdminState() {
  if (!adminAuthPanel || !adminDashboard) return;
  const loggedIn = isAdminLoggedIn();
  adminAuthPanel.hidden = loggedIn;
  adminDashboard.hidden = !loggedIn;
  if (loggedIn) {
    const activePanel = document.querySelector('[data-admin-panel-tab].active')?.dataset.adminPanelTab || 'site';
    setAdminPanel(activePanel);
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
    const preset = adminRowValue(row, '[data-field="weekly-preset"]');
    const presetSource = weeklyPresetByDay(preset);
    const zhDish = presetSource?.zh || adminRowValue(row, '[data-field="zh-dish"]');
    const image = presetSource?.image || adminRowValue(row, '[data-field="weekly-image"]');
    const alt = presetSource?.alt || adminRowValue(row, '[data-field="weekly-alt"]');
    const enDish = presetSource?.en || adminRowValue(row, '[data-field="en-dish"]');
    const index = content.zh.weekly.days.length;
    const weekday = DEFAULT_WEEKDAYS[index] || DEFAULT_WEEKDAYS[DEFAULT_WEEKDAYS.length - 1];
    if (zhDay || zhDish || image) content.zh.weekly.days.push({ day: weekday.zh, dish: zhDish, image, alt, preset });
    if (enDish || image) content.en.weekly.days.push({ day: weekday.en, dish: enDish, image, alt, preset });
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

  content.media = {
    video: {
      title: adminVideoTitle?.value?.trim() || DEFAULT_VIDEO_CONTENT.title,
      label: adminVideoLabel?.value?.trim() || DEFAULT_VIDEO_CONTENT.label,
      src: adminVideoSrc?.value?.trim() || DEFAULT_VIDEO_CONTENT.src,
      poster: adminVideoPoster?.value?.trim() || DEFAULT_VIDEO_CONTENT.poster,
      desc: adminVideoDesc?.value?.trim() || DEFAULT_VIDEO_CONTENT.desc,
      cta: adminVideoCta?.value?.trim() || DEFAULT_VIDEO_CONTENT.cta
    },
    cases: []
  };

  adminCaseRows?.querySelectorAll('[data-case-row]').forEach((row, index) => {
    const label = adminRowValue(row, '[data-field="case-label"]');
    const title = adminRowValue(row, '[data-field="case-title"]');
    const image = adminRowValue(row, '[data-field="case-image"]');
    const alt = adminRowValue(row, '[data-field="case-alt"]');
    const desc = adminRowValue(row, '[data-field="case-desc"]');
    if (label || title || image || desc) {
      content.media.cases.push({
        label,
        title,
        image: image || DEFAULT_STYLING_CASES[index]?.image || '',
        alt: alt || title,
        desc
      });
    }
  });

  const baseMedia = defaultMediaContent();
  content.media.homepage = cloneData(baseMedia.homepage);
  adminHomepageRows?.querySelectorAll('[data-homepage-row]').forEach(row => {
    const key = row.dataset.homepageKey || '';
    const index = Number.parseInt(row.dataset.homepageIndex || '', 10);
    const value = {
      image: adminRowValue(row, '[data-field="homepage-image"]'),
      alt: adminRowValue(row, '[data-field="homepage-alt"]')
    };
    if (key === 'hero' || key === 'contact') content.media.homepage[key] = value;
    if ((key === 'meals' || key === 'services') && Number.isInteger(index)) {
      content.media.homepage[key][index] = value;
    }
  });

  content.media.details = cloneData(baseMedia.details);
  adminDetailRows?.querySelectorAll('[data-detail-editor]').forEach(editor => {
    const key = editor.dataset.detailEditor || '';
    if (!content.media.details[key]) return;
    const detail = content.media.details[key];
    ['eyebrow', 'title', 'heroImage', 'heroAlt', 'heroDesc', 'kicker', 'introTitle', 'introDesc', 'contactTitle', 'contactDesc', 'panelTitle', 'panelDesc'].forEach(field => {
      detail[field] = adminRowValue(editor, `[data-field="detail-${field}"]`);
    });
    detail.gallery = [];
    editor.querySelectorAll('[data-detail-gallery-row]').forEach(row => {
      const item = {
        image: adminRowValue(row, '[data-field="gallery-image"]'),
        alt: adminRowValue(row, '[data-field="gallery-alt"]'),
        caption: adminRowValue(row, '[data-field="gallery-caption"]')
      };
      if (item.image || item.alt || item.caption) detail.gallery.push(item);
    });
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

function addCaseEditorRow() {
  const content = collectAdminContent();
  content.media.cases.push({
    label: 'NEW CASE',
    title: '',
    desc: '',
    image: 'assets/images/event/styling-backdrop.webp',
    alt: ''
  });
  renderAdminMediaRows(content);
  renderMediaContent(content);
}

function initMotionReveal() {
  const motionElements = Array.from(document.querySelectorAll([
    'main .section-title',
    'main .service-card',
    'main .price-card',
    'main .light-panel',
    'main .order-panel',
    'main .feature-card',
    'main .faq-grid details',
    'main .referral-card',
    'main .referral-note',
    'main .referral-terms li',
    'main .catering-menu-teaser',
    'main .combo-preset-card',
    'main .case-showcase',
    'main .case-card',
    'main .final-cta .section-frame'
  ].join(',')));

  motionElements.forEach((element, index) => {
    if (!(element instanceof HTMLElement)) return;
    if (element.matches('.price-card,.case-showcase,.feature-card')) {
      element.dataset.motion = 'fade-scale';
    } else if (element.matches('.service-card,.light-panel,.order-panel,.referral-card,.catering-menu-teaser,.combo-preset-card,.case-card')) {
      element.dataset.motion = 'menu-card';
    } else {
      element.dataset.motion = 'fade-up';
    }
    element.style.setProperty('--motion-delay', `${Math.min((index % 6) * 65, 325)}ms`);
  });

  document.body.classList.add('motion-ready');

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    motionElements.forEach(element => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  motionElements.forEach(element => observer.observe(element));
}

function initDynamicSurfaces() {
  if (prefersReducedMotion) return;
  const surfaces = Array.from(document.querySelectorAll([
    '.service-card',
    '.price-card',
    '.light-panel',
    '.order-panel',
    '.feature-card',
    '.faq-grid details',
    '.referral-card',
    '.combo-preset-card',
    '.catering-menu-teaser'
  ].join(',')));

  surfaces.forEach(surface => {
    if (!(surface instanceof HTMLElement)) return;
    surface.classList.add('dynamic-surface');
    surface.addEventListener('pointermove', event => {
      const rect = surface.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      surface.style.setProperty('--pointer-x', `${x}%`);
      surface.style.setProperty('--pointer-y', `${y}%`);
    });
  });
}

function initPremiumPressFeedback() {
  if (prefersReducedMotion) return;
  const pressTargets = Array.from(document.querySelectorAll([
    '.btn',
    '.menu-toggle',
    '.language-switch button',
    '.case-nav',
    '.case-lightbox-close',
    '.case-lightbox-nav',
    '[data-open-catering-menu]',
    '[data-open-styling-cases]'
  ].join(',')));

  pressTargets.forEach(target => {
    if (!(target instanceof HTMLElement)) return;
    target.addEventListener('pointerdown', () => {
      target.classList.remove('press-glow');
      void target.offsetWidth;
      target.classList.add('press-glow');
    });
    target.addEventListener('animationend', event => {
      if (event.animationName === 'luxePress') target.classList.remove('press-glow');
    });
  });
}

function setMobileMenu(open) {
  if (!menuToggle || !navLinks) return;
  navLinks.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  menuToggle.innerHTML = `<span aria-hidden="true">${open ? '×' : '☰'}</span>`;
}

if (menuToggle && navLinks) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<span aria-hidden="true">☰</span>';
  menuToggle.addEventListener('click', () => setMobileMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', () => setMobileMenu(false));
  });
}

document.addEventListener('click', event => {
  if (!document.body.classList.contains('nav-open')) return;
  const navShell = document.querySelector('.nav-shell');
  if (navShell?.contains(event.target)) return;
  setMobileMenu(false);
});

const scrollSections = ['home', 'meal-plan', 'order', 'catering', 'styling', 'faq']
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
let scrollMotionPending = false;

function updateScrollProgress() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${progress})`;
}

function updateHeaderState() {
  document.body.classList.toggle('is-scrolled', window.scrollY > 18);
  if (backTop) backTop.style.display = window.scrollY > 500 ? 'grid' : 'none';
}

function updateHeroParallax() {
  if (!(heroImage instanceof HTMLImageElement) || prefersReducedMotion) return;
  const lift = Math.min(88, Math.max(0, window.scrollY * 0.12));
  heroImage.style.setProperty('--hero-lift', `${lift}px`);
}

function updateActiveNavigation() {
  if (!scrollSections.length || !navAnchors.length) return;
  const marker = window.scrollY + Math.min(window.innerHeight * 0.38, 320);
  let activeId = scrollSections[0].id;
  scrollSections.forEach(section => {
    if (section.offsetTop <= marker) activeId = section.id;
  });
  navAnchors.forEach(anchor => {
    anchor.classList.toggle('active', anchor.getAttribute('href') === `#${activeId}`);
  });
}

function updateScrollMotion() {
  scrollMotionPending = false;
  updateScrollProgress();
  updateHeaderState();
  updateHeroParallax();
  updateActiveNavigation();
}

function requestScrollMotion() {
  if (scrollMotionPending) return;
  scrollMotionPending = true;
  window.requestAnimationFrame(updateScrollMotion);
}

window.addEventListener('scroll', requestScrollMotion, { passive: true });
window.addEventListener('resize', requestScrollMotion);
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) setMobileMenu(false);
});
window.addEventListener('hashchange', () => {
  window.setTimeout(updateScrollMotion, 80);
});

backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

if ('IntersectionObserver' in window && form) {
  const orderVisibilityObserver = new IntersectionObserver(entries => {
    const isVisible = entries.some(entry => entry.isIntersecting);
    document.body.classList.toggle('order-form-visible', isVisible);
  }, { rootMargin: '-20% 0px -28% 0px', threshold: 0.01 });
  orderVisibilityObserver.observe(form);
}

memberOpen?.addEventListener('click', event => {
  event.preventDefault();
  setMobileMenu(false);
  window.location.href = 'member.html';
});

document.querySelectorAll('[data-admin-close]').forEach(element => {
  element.addEventListener('click', closeAdminModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    setMobileMenu(false);
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
  const referredByCode = normalizeReferralCode(fieldValue('registerReferralCode') || new URLSearchParams(window.location.search).get('ref'));

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
    status: 'active',
    tier: 'Classic',
    profile: {},
    adminNote: '',
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

memberProfileForm?.addEventListener('submit', event => {
  event.preventDefault();
  const email = currentMemberEmail();
  if (!email) return;
  const members = loadMembers();
  const member = members.find(item => item.email === email);
  if (!member) return;

  member.name = profileName?.value?.trim() || member.name;
  member.phone = profilePhone?.value?.trim() || member.phone;
  member.profile = {
    ...(member.profile || {}),
    area: profileArea?.value?.trim() || '',
    defaultPackage: profileDefaultPackage?.value || '',
    preference: profilePreference?.value?.trim() || ''
  };
  member.updatedAt = new Date().toISOString();
  saveMembers(members);
  fillMemberToOrder(member);
  applyMemberProfileToOrder(member);
  renderMemberState();
  showMemberMessage(languageText().member.profileSaved);
  if (isAdminLoggedIn()) renderAdminMembers(false);
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

copyReferralLink?.addEventListener('click', async () => {
  const member = getCurrentMember();
  if (!member) return;
  try {
    await copyText(referralShareLink(member));
    showMemberMessage(languageText().member.linkCopied);
  } catch (error) {
    showMemberMessage(languageText().member.copyFail, true);
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

document.querySelectorAll('[data-admin-panel-tab]').forEach(button => {
  button.addEventListener('click', () => setAdminPanel(button.dataset.adminPanelTab || 'site'));
});

addWeeklyRow?.addEventListener('click', addWeeklyEditorRow);
addAddonRow?.addEventListener('click', addAddonEditorRow);
addCateringRow?.addEventListener('click', addCateringEditorRow);
addCaseRow?.addEventListener('click', addCaseEditorRow);

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

const renderMediaFromAdminInputs = () => {
  renderMediaContent(collectAdminContent());
};

[adminVideoTitle, adminVideoLabel, adminVideoSrc, adminVideoPoster, adminVideoDesc, adminVideoCta]
  .forEach(input => input?.addEventListener('input', renderMediaFromAdminInputs));

adminCaseRows?.addEventListener('input', renderMediaFromAdminInputs);

adminCaseRows?.addEventListener('click', event => {
  if (!(event.target instanceof HTMLElement) || !event.target.matches('[data-remove-case]')) return;
  event.target.closest('[data-case-row]')?.remove();
  renderMediaFromAdminInputs();
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

adminWeeklyRows?.addEventListener('change', event => {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement) || target.dataset.field !== 'weekly-preset') return;
  const row = target.closest('[data-weekly-row]');
  if (!row) return;
  const preset = weeklyPresetByDay(target.value);
  if (!preset) {
    setWeeklyRowPresetLock(row, false);
    return;
  }
  applyWeeklyPresetToRow(row, preset);
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
  if (event.target instanceof HTMLSelectElement && event.target.matches('[data-member-admin-field]')) {
    setMemberAdminField(event.target.dataset.memberEmail || '', event.target.dataset.memberAdminField || '', event.target.value);
    return;
  }

  if (event.target instanceof HTMLTextAreaElement && event.target.matches('[data-member-admin-field]')) {
    setMemberAdminField(event.target.dataset.memberEmail || '', event.target.dataset.memberAdminField || '', event.target.value);
    return;
  }

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
  renderMediaContent(content);
  renderManagedContent(content);
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
  renderMediaContent(defaults);
  renderManagedContent(defaults);
  renderAdminEditor();
  try {
    const cloudSaved = await saveAdminContentToSupabase(defaults);
    showAdminMessage(cloudSaved
      ? '已恢复默认菜单内容，并已同步 Supabase。'
      : '已恢复默认菜单内容。Supabase 尚未连接管理员权限，所以先保存在本地。');
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

clearConversionEvents?.addEventListener('click', () => {
  const confirmed = window.confirm(currentLanguage === 'en' ? 'Clear all conversion tracking records?' : '确定清空所有 WhatsApp 转化来源记录吗？');
  if (!confirmed) return;
  saveConversionEvents([]);
  renderAdminConversions();
  showAdminMessage(currentLanguage === 'en' ? 'Conversion records cleared.' : '转化来源记录已清空。');
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
    setLeadSource('package_card');
    setPackageValue(button.dataset.package || '');
    renderOrderPreview();
    showOrderMessage('');
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

[mealStartDate, mealEndDate].forEach(input => input?.addEventListener('change', syncMealPlanPeriod));
document.querySelectorAll('[data-meal-duration]').forEach(button => {
  button.addEventListener('click', () => setMealPlanDuration(Number(button.dataset.mealDuration || 5)));
});

document.querySelectorAll('[data-service-href]').forEach(card => {
  card.addEventListener('click', event => {
    if (event.target instanceof HTMLElement && event.target.closest('a,button')) return;
    const href = card.dataset.serviceHref;
    if (href) window.location.href = href;
  });
  card.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    const href = card.dataset.serviceHref;
    if (href) window.location.href = href;
  });
});

document.querySelectorAll('[data-open-catering-menu]').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    setLeadSource('catering_menu');
    openCateringMenuBuilder(true);
  });
});

document.querySelectorAll('[data-close-catering-menu]').forEach(button => {
  button.addEventListener('click', closeCateringMenuBuilder);
});

cateringComboPresets?.addEventListener('click', event => {
  const button = event.target instanceof HTMLElement ? event.target.closest('[data-catering-combo]') : null;
  if (!(button instanceof HTMLElement)) return;
  applyCateringCombo(button.dataset.cateringCombo || '');
});

document.querySelectorAll('[data-open-styling-cases]').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    openStylingCases(true);
  });
});

document.querySelectorAll('[data-close-styling-cases]').forEach(button => {
  button.addEventListener('click', closeStylingCases);
});

document.querySelectorAll('[data-case-prev]').forEach(button => {
  button.addEventListener('click', () => moveStylingCase(-1));
});

document.querySelectorAll('[data-case-next]').forEach(button => {
  button.addEventListener('click', () => moveStylingCase(1));
});

stylingCaseCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    setStylingCase(index);
    scheduleStylingCaseAutoplay();
  });
  card.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setStylingCase(index);
    scheduleStylingCaseAutoplay();
  });
});

casePlayToggle?.addEventListener('click', () => {
  stylingCasePlaying = !stylingCasePlaying;
  scheduleStylingCaseAutoplay();
});

caseShowcaseMedia?.addEventListener('click', openCaseLightbox);

document.querySelectorAll('[data-case-lightbox-close]').forEach(button => {
  button.addEventListener('click', closeCaseLightbox);
});

document.querySelectorAll('[data-case-lightbox-prev]').forEach(button => {
  button.addEventListener('click', () => moveStylingCase(-1));
});

document.querySelectorAll('[data-case-lightbox-next]').forEach(button => {
  button.addEventListener('click', () => moveStylingCase(1));
});

caseLightbox?.addEventListener('click', event => {
  if (event.target === caseLightbox) closeCaseLightbox();
});

document.addEventListener('keydown', event => {
  if (!caseLightbox || caseLightbox.hidden) return;
  if (event.key === 'Escape') closeCaseLightbox();
  if (event.key === 'ArrowLeft') moveStylingCase(-1);
  if (event.key === 'ArrowRight') moveStylingCase(1);
});

brandVideo?.addEventListener('error', () => syncVideoFallback(true), true);
brandVideo?.addEventListener('loadedmetadata', () => syncVideoFallback(false));

document.addEventListener('click', event => {
  const target = event.target instanceof HTMLElement ? event.target.closest('a,button') : null;
  if (!(target instanceof HTMLElement)) return;
  if (target.closest('#adminModal, #memberModal, #orderForm')) return;

  const source = sourceFromElement(target);
  if (source) setLeadSource(source);

  const link = target instanceof HTMLAnchorElement ? target : target.closest('a');
  const href = link?.getAttribute('href') || '';
  if (href.includes('wa.me')) {
    trackConversion('whatsapp_click', source || currentLeadSource(), {
      label: target.textContent?.replace(/\s+/g, ' ').trim() || href
    });
  }
});

cateringMenuGrid?.addEventListener('change', () => {
  renderCateringEstimate();
});
cateringPax?.addEventListener('input', renderCateringEstimate);
cateringServiceStyle?.addEventListener('change', renderCateringEstimate);
document.querySelectorAll('[data-catering-mode]').forEach(button => {
  button.addEventListener('click', () => setCateringMenuMode(button.dataset.cateringMode || 'buffet'));
});
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

  const currentMember = getCurrentMember();
  if (currentMember?.status === 'blocked') {
    showOrderMessage(currentLanguage === 'en'
      ? 'This member account is currently paused. Please contact us on WhatsApp for assistance.'
      : '这个会员账号目前已暂停，请直接 WhatsApp 联系我们协助处理。', true);
    return;
  }

  trackConversion('order_submit', orderData.leadSource || currentLeadSource(), {
    label: `${orderData.package || 'package'} / ${orderData.meal || 'meal'}`
  });
  const inquiry = saveInquiryForAdmin(orderData);
  saveInquiryForMember({ ...orderData, id: inquiry.id, status: inquiry.status });
  renderOrderPreview();
  showOrderMessage(currentLanguage === 'en' ? 'WhatsApp is opening now.' : '正在打开 WhatsApp。');
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(orderData))}`;
  window.open(url, '_blank', 'noopener');
});

async function initializeApp() {
  await loadSupabaseRuntimeConfig();
  await loadAdminContentFromSupabase();
  initializeMealPlanDates();
  renderCateringCombos();
  renderCateringMenu();
  renderCateringEstimate();
  if (document.body?.dataset.detailPage === 'catering') {
    openCateringMenuBuilder(false);
  }
  renderMediaContent();
  setStylingCase(0);
  updateStylingCasePlayButton();
  renderAdminConversions();
  initMotionReveal();
  initDynamicSurfaces();
  initPremiumPressFeedback();
  updateScrollMotion();
  document.body.classList.add('is-loaded');
  window.setTimeout(updateScrollMotion, 120);
  window.setTimeout(updateScrollMotion, 600);
  applyReferralCodeFromUrl();
  updateStaticLanguage();
  refreshSupabaseMemberData();
  if (window.location.hash === '#styling-cases') {
    openStylingCases(true);
  }
  if (!adminModal && adminAuthPanel && adminDashboard) {
    renderAdminState();
  }
  if (shouldOpenAdminFromUrl()) {
    openAdminModal();
  }
}

initializeApp();
