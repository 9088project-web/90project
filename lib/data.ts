export const services = [
  {
    title: "每日包伙食",
    slug: "daily-meal",
    description: "适合办公室、宿舍、固定团队或长期餐饮安排，可按人数与餐数沟通菜单。",
    image: "/images/food-1.jpg",
    icon: "餐"
  },
  {
    title: "活动餐饮 Catering",
    slug: "event-catering",
    description: "适合公司活动、生日派对、开张仪式、婚礼与私人聚会，按人数与菜单报价。",
    image: "/images/catering-1.jpg",
    icon: "宴"
  },
  {
    title: "场地布置 Event Styling",
    slug: "event-styling",
    description: "可搭配餐桌摆设、背景布置、主题色调与活动风格设计，让现场更完整。",
    image: "/images/styling-1.jpg",
    icon: "布"
  },
  {
    title: "鸡尾酒 / Mocktail Bar",
    slug: "mocktail-bar",
    description: "为派对、晚宴、开张和品牌活动准备饮料吧，提升宾客体验与现场氛围。",
    image: "/images/drink-1.jpg",
    icon: "饮"
  }
];

export const packages = [
  {
    title: "包伙食配套",
    price: "RM300 起 / 月",
    description: "适合长期固定餐饮安排。实际价格根据人数、餐数、地点与菜单调整。"
  },
  {
    title: "活动餐饮报价",
    price: "按人数与菜单报价",
    description: "根据人数、菜单、地点与服务内容报价。WhatsApp 提供日期、人数、地点，即可获取初步报价。"
  },
  {
    title: "场地布置配套",
    price: "根据主题与规模报价",
    description: "适合生日、开张、婚礼、公司活动与私人聚会，可搭配餐饮一起安排。"
  },
  {
    title: "Mocktail / Cocktail Bar",
    price: "根据人数与饮料选择报价",
    description: "适合需要现场饮料吧、派对氛围或品牌活动体验的客户。"
  }
];

export const galleryItems = [
  { title: "包伙食", src: "/images/food-1.jpg", alt: "每日包伙食餐点摆盘", category: "Food" },
  { title: "活动现场", src: "/images/event-1.jpg", alt: "公司活动与私人聚会现场参考", category: "Event" },
  { title: "Catering", src: "/images/catering-1.jpg", alt: "活动餐饮 Catering 餐桌展示", category: "Catering" },
  { title: "场地布置", src: "/images/styling-1.jpg", alt: "场地布置与主题风格参考", category: "Styling" },
  { title: "饮料吧", src: "/images/drink-1.jpg", alt: "Mocktail 与 Cocktail 饮料吧参考", category: "Drinks" },
  { title: "90 PROJECT", src: "/images/hero.jpg", alt: "九零食刻 90 PROJECT 服务形象图", category: "Brand" }
];

export const faqs = [
  {
    question: "活动餐饮需要提前多久预订？",
    answer: "建议提前 3-7 天联系，特殊大型活动建议更早安排。"
  },
  {
    question: "可以根据预算安排菜单吗？",
    answer: "可以，我们可以根据人数、预算和活动类型建议合适菜单。"
  },
  {
    question: "有提供场地布置吗？",
    answer: "有，可搭配餐饮、餐桌摆设、背景布置和活动风格设计。"
  },
  {
    question: "如何获得报价？",
    answer: "WhatsApp 提供日期、地点、人数和服务需求，我们会给你初步报价。"
  }
];

export const inquiryStatuses = ["new", "contacted", "quoted", "confirmed", "completed", "cancelled"];
export const bookingStatuses = ["pending", "confirmed", "completed", "cancelled"];
export const quotationStatuses = ["draft", "sent", "accepted", "rejected", "expired"];

export const statusLabels: Record<string, string> = {
  new: "新询问",
  contacted: "已联系",
  quoted: "已报价",
  confirmed: "已确认",
  completed: "已完成",
  cancelled: "已取消",
  pending: "待确认",
  draft: "草稿",
  sent: "已发送",
  accepted: "已接受",
  rejected: "已拒绝",
  expired: "已过期",
  active: "启用",
  inactive: "停用",
  member: "会员",
  admin: "管理员",
  super_admin: "超级管理员"
};

export const trustBadges = [
  "包伙食 RM300 起",
  "活动餐饮按人数报价",
  "可搭配场地布置",
  "WhatsApp 快速沟通"
];

export const whyChooseUs = [
  "一站式餐饮与布置安排",
  "适合小型与中型活动",
  "菜单可根据预算调整",
  "可搭配饮料 / Mocktail / Cocktail",
  "WhatsApp 快速沟通与报价"
];

export const inquirySteps = [
  "WhatsApp 联系我们",
  "提供日期、地点、人数",
  "选择服务与菜单",
  "获取报价",
  "确认安排"
];
