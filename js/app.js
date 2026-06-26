const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const backTop = document.getElementById('backTop');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backTop.style.display = 'grid';
  } else {
    backTop.style.display = 'none';
  }
});
backTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

document.querySelectorAll('.choose-package').forEach(btn => {
  btn.addEventListener('click', () => {
    const select = document.getElementById('package');
    const value = btn.dataset.package;
    if (select) {
      const option = Array.from(select.options).find(o => o.value === value);
      if (option) select.value = value;
    }
    document.getElementById('order')?.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

const form = document.getElementById('orderForm');
form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const val = id => document.getElementById(id)?.value?.trim() || '-';
  const addons = Array.from(form.querySelectorAll('fieldset input[type="checkbox"]:checked'))
    .map(input => input.value)
    .join(', ') || '无';

  const message = `你好，我想询问九零食刻 90 PROJECT 包伙食。

姓名：${val('name')}
电话：${val('phone')}
选择配套：${val('package')}
人数：${val('pax')}
餐期：${val('meal')}
开始日期：${val('date')}
配送区域：${val('area')}
加购：${addons}
备注：${val('notes')}

请帮我确认价格和配送安排，谢谢。`;

  const url = `https://wa.me/601110977166?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
});
