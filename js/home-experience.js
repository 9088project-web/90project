(function () {
  const root = document.querySelector('[data-hero-experience]');
  if (!root) return;

  const hero = document.querySelector('.hero');
  const pictureSource = document.querySelector('.hero-media source');
  const heroImage = document.querySelector('.hero-media img');
  const buttons = Array.from(root.querySelectorAll('[data-hero-service]'));
  const highlights = root.querySelector('[data-hero-highlights]');
  const cta = root.querySelector('[data-hero-cta]');
  const fields = {
    kicker: root.querySelector('[data-hero-field="kicker"]'),
    title: root.querySelector('[data-hero-field="title"]'),
    description: root.querySelector('[data-hero-field="description"]'),
    experienceKicker: document.querySelector('[data-experience-field="kicker"]'),
    experienceTitle: document.querySelector('[data-experience-field="title"]'),
    experienceDescription: document.querySelector('[data-experience-field="description"]'),
    storyKicker: document.querySelector('[data-story-field="kicker"]'),
    storyTitle: document.querySelector('[data-story-field="title"]'),
    storyDescription: document.querySelector('[data-story-field="description"]')
  };

  const services = {
    meal: {
      image: 'assets/images/brand/hero-banquet.jpg',
      webp: 'assets/images/brand/hero-banquet.webp',
      href: '#meal-plan',
      zh: {
        tab: '包伙食',
        kicker: '日常包伙食',
        title: '灵活期限的现煮包伙食',
        description: '用日历选择开始与结束日期，系统计算工作日餐数，再通过 WhatsApp 确认配送细节。',
        highlights: ['现煮菜单', '日期自由选', '固定地址配送'],
        cta: '查看包伙食'
      },
      en: {
        tab: 'Meal Plan',
        kicker: 'DAILY MEAL PLAN',
        title: 'Fresh cooked meals with flexible dates',
        description: 'Choose start and end dates, calculate working-day meals and confirm delivery details through WhatsApp.',
        highlights: ['Fresh daily menu', 'Flexible dates', 'Fixed-address delivery'],
        cta: 'View meal plan'
      }
    },
    catering: {
      image: 'assets/images/reference-series/service-catering.png',
      href: 'catering.html',
      zh: {
        tab: '活动餐饮',
        kicker: 'BUFFET / CUSTOM CATERING',
        title: '家庭式 Buffet 与自由搭配菜单',
        description: '从 Set A 到 Set D，或按主食、肉类、海鲜、菜类自由搭配，先获得预算再确认报价。',
        highlights: ['自由搭配', '预算估算', '活动摆台'],
        cta: '打开外餐菜单'
      },
      en: {
        tab: 'Catering',
        kicker: 'BUFFET / CUSTOM CATERING',
        title: 'Family-style buffet and mix-and-match menus',
        description: 'Start from Set A to Set D, or mix staples, meats, seafood and vegetables before requesting a final quote.',
        highlights: ['Mix and match', 'Estimate first', 'Buffet setup'],
        cta: 'Open catering menu'
      }
    },
    styling: {
      image: 'assets/images/reference-series/service-styling.png',
      href: 'styling.html',
      zh: {
        tab: '场地布置',
        kicker: 'EVENT STYLING',
        title: '把餐桌、花艺与背景统一成现场气质',
        description: '适合婚礼、生日、开幕、公司活动，作品展示可直接作为顾客选择参考。',
        highlights: ['花艺桌景', '背景设计', '现场陈列'],
        cta: '查看布置作品'
      },
      en: {
        tab: 'Styling',
        kicker: 'EVENT STYLING',
        title: 'Tables, florals and backdrops designed as one scene',
        description: 'For weddings, birthdays, openings and corporate events, with portfolio references customers can choose from.',
        highlights: ['Floral tables', 'Backdrops', 'Event display'],
        cta: 'View styling work'
      }
    },
    beverage: {
      image: 'assets/images/reference-series/service-cocktail.png',
      href: 'cocktail.html',
      zh: {
        tab: '饮料吧',
        kicker: 'BEVERAGE BAR',
        title: '活动饮料吧，让现场更有记忆点',
        description: '从 mocktail、果汁到移动吧台，适合开幕、宴会、派对和企业活动。',
        highlights: ['移动吧台', '特调饮品', '拍照焦点'],
        cta: '查看饮料服务'
      },
      en: {
        tab: 'Beverage Bar',
        kicker: 'BEVERAGE BAR',
        title: 'A beverage bar that gives events a focal point',
        description: 'Mocktails, juices and mobile bar styling for launches, banquets, parties and corporate events.',
        highlights: ['Mobile bar', 'Signature drinks', 'Photo focal point'],
        cta: 'View beverage service'
      }
    }
  };

  const story = {
    zh: {
      kicker: '品牌旅程',
      title: '从每天的一餐，到值得记住的庆典',
      description: '90 PROJECT 把日常包伙食的稳定、卫生与准时，延伸到外餐、场地布置和饮料吧，让顾客从午餐到活动都能交给同一个团队。'
    },
    en: {
      kicker: 'BRAND JOURNEY',
      title: 'From Daily Meals to Memorable Celebrations',
      description: '90 PROJECT brings the same care behind dependable daily meals into buffet lines, styled tables and beverage bars for events.'
    }
  };

  const experience = {
    zh: {
      kicker: '选择你的服务体验',
      title: '按场景进入对应服务',
      description: '日常包伙食、活动外餐、场地布置和饮料吧都保留独立入口，顾客不用在一大堆信息里找方向。'
    },
    en: {
      kicker: 'CHOOSE YOUR EXPERIENCE',
      title: 'Start with the service that matches your occasion',
      description: 'Meal plans, catering, event styling and beverage bars stay separated so customers can move directly into the right flow.'
    }
  };

  let activeKey = 'meal';

  function currentLanguage() {
    return document.body?.dataset.language === 'en' || document.documentElement.lang?.startsWith('en') ? 'en' : 'zh';
  }

  function setText(element, value) {
    if (element) element.textContent = value;
  }

  function render(key = activeKey) {
    const language = currentLanguage();
    const service = services[key] || services.meal;
    const copy = service[language] || service.zh;
    activeKey = key;

    if (hero) hero.dataset.activeService = key;
    if (pictureSource) {
      if (service.webp) {
        pictureSource.hidden = false;
        pictureSource.srcset = service.webp;
      } else {
        pictureSource.hidden = true;
        pictureSource.removeAttribute('srcset');
      }
    }
    if (heroImage) {
      heroImage.src = service.image;
      heroImage.alt = '';
    }

    setText(fields.kicker, copy.kicker);
    setText(fields.title, copy.title);
    setText(fields.description, copy.description);
    if (highlights) {
      highlights.innerHTML = copy.highlights.map(item => `<span>${item}</span>`).join('');
    }
    if (cta) {
      cta.textContent = copy.cta;
      cta.href = service.href;
    }

    buttons.forEach(button => {
      const isActive = button.dataset.heroService === key;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
      const label = services[button.dataset.heroService]?.[language]?.tab;
      const span = button.querySelector('span');
      if (span && label) span.textContent = label;
    });

    const storyCopy = story[language];
    setText(fields.storyKicker, storyCopy.kicker);
    setText(fields.storyTitle, storyCopy.title);
    setText(fields.storyDescription, storyCopy.description);

    const experienceCopy = experience[language];
    setText(fields.experienceKicker, experienceCopy.kicker);
    setText(fields.experienceTitle, experienceCopy.title);
    setText(fields.experienceDescription, experienceCopy.description);
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => render(button.dataset.heroService));
  });

  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero?.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      hero.style.setProperty('--hero-depth-x', `${x}px`);
      hero.style.setProperty('--hero-depth-y', `${y}px`);
    });
    hero?.addEventListener('pointerleave', () => {
      hero.style.setProperty('--hero-depth-x', '0px');
      hero.style.setProperty('--hero-depth-y', '0px');
    });
  }

  document.addEventListener('np90:languagechange', event => {
    if (event.detail?.language) render(activeKey);
  });

  render();
})();
