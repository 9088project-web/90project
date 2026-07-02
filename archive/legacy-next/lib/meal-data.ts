export const mealPlanTypes = ["个人包伙食", "家庭包伙食", "公司员工餐", "长者 / 清淡餐"];

export const mealCategories = [
  "主食",
  "鸡肉类",
  "猪肉类",
  "鱼类",
  "虾类",
  "豆腐 / 蛋类",
  "蔬菜类",
  "汤类",
  "清淡餐"
];

const dishNames: Record<string, string[]> = {
  主食: ["白饭", "腊肠炒饭", "蛋炒饭", "扬州炒饭", "炒米粉", "福建面", "皮蛋瘦肉粥", "鸡丝粥"],
  鸡肉类: ["咖喱鸡", "Sambal 鸡", "香料炸鸡", "咸蛋奶油鸡", "黑胡椒鸡扒", "蘑菇鸡扒", "Lemon Chicken", "Sweet & Sour Chicken", "Ginger Onion Chicken"],
  猪肉类: ["南乳炸肉", "咸蛋奶油猪", "糖醋肉", "咕噜肉", "姜葱肉片", "红烧肉", "蒜香五花肉"],
  鱼类: ["宫保鱼片", "咸蛋奶油鱼", "炸鱼柳", "Sweet Sour Fish", "黑椒鱼柳", "姜葱鱼片", "酸辣鱼片", "泰式柠檬鱼"],
  虾类: ["椒盐虾", "麦片虾", "咸蛋奶油虾"],
  "豆腐 / 蛋类": ["泰式豆腐", "红烧豆腐", "麻婆豆腐", "家常豆腐", "番茄炒蛋", "蒸水蛋"],
  蔬菜类: ["炒什锦菜", "干煸四季豆", "娘惹阿杂", "蒜蓉西兰花", "清炒小白菜", "奶油杂菜", "蚝油生菜", "蒜蓉菠菜", "炒高丽菜"],
  汤类: ["每日例汤", "ABC 汤", "老黄瓜汤", "玉米红萝卜汤"],
  清淡餐: ["少油少盐套餐", "蒸鱼清淡餐", "鸡丝粥清淡餐", "蔬菜豆腐餐"]
};

export type Dish = {
  id: string;
  name: string;
  category: string;
  image: string;
};

export const dishes: Dish[] = Object.entries(dishNames).flatMap(([category, names], categoryIndex) =>
  names.map((name, index) => ({
    id: `${categoryIndex + 1}-${index + 1}`,
    name,
    category,
    image: index % 5 === 0 ? "/images/food-1.jpg" : index % 5 === 1 ? "/images/catering-1.jpg" : index % 5 === 2 ? "/images/event-1.jpg" : index % 5 === 3 ? "/images/styling-1.jpg" : "/images/drink-1.jpg"
  }))
);

export const sampleInquiries = [
  { id: "INQ-001", name: "测试会员", planType: "个人包伙食", area: "Kuala Lumpur", status: "new", createdAt: "2026-06-26" },
  { id: "INQ-002", name: "公司员工餐", planType: "公司员工餐", area: "PJ", status: "contacted", createdAt: "2026-06-25" }
];

export const statusOptions = ["new", "contacted", "quoted", "confirmed", "completed", "cancelled"];
export const statusLabels: Record<string, string> = {
  new: "新询问",
  contacted: "已联系",
  quoted: "已报价",
  confirmed: "已确认",
  completed: "已完成",
  cancelled: "已取消"
};
