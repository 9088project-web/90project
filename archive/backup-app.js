const whatsappNumber = "601110977166";
const fallbackMessage = "你好，我想询问九零食刻 90 PROJECT 的餐饮/活动服务。\n\n日期：\n人数：\n地点：\n服务需求：";

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const backToTop = document.querySelector("#backToTop");
const year = document.querySelector("#year");
const orderForm = document.querySelector("#orderForm");
const confirmWhatsApp = document.querySelector("#confirmWhatsApp");
const packageSelect = document.querySelector("#package");

const fields = {
  customerName: document.querySelector("#customerName"),
  phone: document.querySelector("#phone"),
  package: packageSelect,
  pax: document.querySelector("#pax"),
  mealTime: document.querySelector("#mealTime"),
  startDate: document.querySelector("#startDate"),
  area: document.querySelector("#area"),
  notes: document.querySelector("#notes")
};

const summary = {
  customerName: document.querySelector("#summaryName"),
  phone: document.querySelector("#summaryPhone"),
  package: document.querySelector("#summaryPackage"),
  pax: document.querySelector("#summaryPax"),
  mealTime: document.querySelector("#summaryMealTime"),
  startDate: document.querySelector("#summaryStartDate"),
  area: document.querySelector("#summaryArea"),
  addons: document.querySelector("#summaryAddons"),
  notes: document.querySelector("#summaryNotes")
};

function buildWhatsAppUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function getValue(key) {
  const field = fields[key];
  return field && field.value.trim() ? field.value.trim() : "";
}

function setText(element, value) {
  if (element) element.textContent = value || "-";
}

function getSelectedAddons() {
  return Array.from(document.querySelectorAll('input[name="addons"]:checked')).map((item) => item.value);
}

function updateSummary() {
  if (!orderForm) return;
  setText(summary.customerName, getValue("customerName"));
  setText(summary.phone, getValue("phone"));
  setText(summary.package, getValue("package"));
  setText(summary.pax, getValue("pax"));
  setText(summary.mealTime, getValue("mealTime"));
  setText(summary.startDate, getValue("startDate"));
  setText(summary.area, getValue("area"));
  setText(summary.notes, getValue("notes"));

  const addons = getSelectedAddons();
  setText(summary.addons, addons.length ? addons.join("、") : "");
}

function buildOrderMessage() {
  const addons = getSelectedAddons();

  return `你好，我想询问九零食刻 90 PROJECT 包伙食。

姓名：${getValue("customerName")}
电话：${getValue("phone")}
选择配套：${getValue("package")}
人数：${getValue("pax")}
餐期：${getValue("mealTime")}
开始日期：${getValue("startDate")}
配送区域：${getValue("area")}
加购：${addons.length ? addons.join("、") : ""}
备注：${getValue("notes")}

请帮我确认价格和配送安排，谢谢。`;
}

function closeMobileNav() {
  if (!siteNav || !navToggle) return;
  siteNav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".site-nav a, .mobile-bottom-bar a").forEach((link) => {
  link.addEventListener("click", () => closeMobileNav());
});

document.querySelectorAll(".wa-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const message = link.dataset.waMessage || fallbackMessage;
    window.open(buildWhatsAppUrl(message), "_blank", "noopener");
  });
});

document.querySelectorAll(".package-select").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPackage = button.dataset.package || "";
    if (packageSelect) {
      packageSelect.value = selectedPackage;
      updateSummary();
    }

    const orderSection = document.querySelector("#order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

if (orderForm) {
  orderForm.addEventListener("input", updateSummary);
  orderForm.addEventListener("change", updateSummary);
}

if (confirmWhatsApp) {
  confirmWhatsApp.addEventListener("click", () => {
    updateSummary();
    window.open(buildWhatsAppUrl(buildOrderMessage()), "_blank", "noopener");
  });
}

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 520);
  });
}

updateSummary();