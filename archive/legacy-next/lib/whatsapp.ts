export const WHATSAPP_NUMBER = "601110977166";
export const WHATSAPP_DISPLAY = "011-1097 7166";

export const publicInquiryMessage = "你好，我想询问九零食刻 90 PROJECT 包伙食配套。\n\n【顾客资料】\n姓名：\n电话：\n地区：\n开始日期：\n\n【包伙食类型】\n\n【餐期】\n\n【周期】\n\n【人数】\n\n【口味偏好】\n\n【主食偏好】\n\n【喜欢的菜式】\n1.\n2.\n3.\n\n【不喜欢 / 避免】\n1.\n2.\n3.\n\n【备注】\n请帮我确认价格、菜单安排和配送。";

export function createWhatsAppLink(message = publicInquiryMessage) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
