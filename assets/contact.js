const COPY = {
  en: {
    back: 'Back to site', lang: '中文', progress: 'Step {current} of {total}',
    introKicker: 'Avenior / Start a conversation', introTitle: 'What can Avenior help you move forward?', introBody: 'Answer a few focused questions so we can understand the change you want to make and bring the right perspective to our first conversation.', start: 'Start', time: 'Takes about 2 minutes',
    goalKicker: '01 / Your goal', goalTitle: 'What would you like to move forward?', g1: 'Education & capability', g2: 'UX & product strategy', g3: 'AI transformation', g4: 'Brand, marketing & design', g5: 'I’m not sure yet',
    contextKicker: '02 / The challenge', contextTitle: 'What are you trying to change, build or solve?', contextPh: 'Tell us what is happening now, what outcome you want, and anything that is getting in the way.', contextHint: 'A few sentences are enough.',
    supportKicker: '03 / The support', supportTitle: 'Where could Avenior add the most value?', s1: 'Education, workshops or mentoring', s2: 'UX research, product or service strategy', s3: 'AI opportunity, workflow or transformation', s4: 'Brand, social media, marketing or design', s5: 'Talent search for AI, product or design roles',
    timelineKicker: '04 / Timing', timelineTitle: 'When would you like to begin?', t1: 'As soon as possible', t2: 'Within 1–3 months', t3: 'Within 3–6 months', t4: 'I’m exploring for now', source: 'How did you hear about us? (optional)', sourcePh: 'LinkedIn, referral, search…',
    detailsKicker: '05 / Your contact', detailsTitle: 'How can we reach you?', name: 'Name *', email: 'Email *', org: 'Organisation / school', phone: 'Phone (optional)', namePh: 'Your name', emailPh: 'you@company.com', orgPh: 'Where you work or study', phonePh: '+852…',
    reviewKicker: '06 / Review', reviewTitle: 'Ready to start the conversation?', reviewNote: 'Your answers and contact details will be emailed directly to Avenior.', privacy: 'By submitting, you agree that Avenior and its form delivery provider may process these details to respond to your enquiry.',
    edit: 'Back', next: 'Continue', sendEnquiry: 'Send enquiry', sending: 'Sending…', submitError: 'We could not send this automatically. Please email hello.avenior@gmail.com directly.',
    reviewGoal: 'Goal', reviewContact: 'Contact', reviewContext: 'Challenge', reviewSupport: 'Support', reviewTiming: 'Timing', required: 'Please complete this step before continuing.',
    successKicker: 'Enquiry received', successTitle: 'Thank you. Your message is on its way to Avenior.', successBody: 'Your contact details and project context have been sent to hello.avenior@gmail.com.', emailUs: 'Email Avenior', restart: 'Start again'
  },
  zh: {
    back: '返回网站', lang: 'EN', progress: '第 {current} 步，共 {total} 步',
    introKicker: 'Avenior / 开始沟通', introTitle: 'Avenior 可以帮你推动什么？', introBody: '回答几个聚焦的问题，让我们了解你想推动的改变，并为第一次沟通带来合适的视角。', start: '开始', time: '大约需要 2 分钟',
    goalKicker: '01 / 你的目标', goalTitle: '你最希望推动哪件事？', g1: '教育与能力建设', g2: 'UX 与产品战略', g3: 'AI 转型', g4: '品牌、营销与设计', g5: '暂时还不确定',
    contextKicker: '02 / 当前挑战', contextTitle: '你想改变、创造或解决什么？', contextPh: '可以说说现在的情况、希望达成的结果，以及阻碍进展的问题。', contextHint: '几句话就足够。',
    supportKicker: '03 / 需要的支持', supportTitle: 'Avenior 最适合在哪些方面帮助你？', s1: '教育、工作坊或职业辅导', s2: 'UX 研究、产品或服务战略', s3: 'AI 机会、工作流或组织转型', s4: '品牌、社交媒体、营销或设计', s5: 'AI、产品或设计人才招聘',
    timelineKicker: '04 / 时间', timelineTitle: '你希望什么时候开始？', t1: '尽快开始', t2: '1–3 个月内', t3: '3–6 个月内', t4: '目前处于探索阶段', source: '你从哪里了解到我们？（选填）', sourcePh: 'LinkedIn、朋友推荐、搜索……',
    detailsKicker: '05 / 联系方式', detailsTitle: '我们如何联系你？', name: '姓名 *', email: '邮箱 *', org: '公司 / 学校', phone: '电话（选填）', namePh: '你的姓名', emailPh: 'you@company.com', orgPh: '你工作或学习的地方', phonePh: '+852…',
    reviewKicker: '06 / 确认', reviewTitle: '准备好开始对话了吗？', reviewNote: '你的回答与联系方式会直接发送至 Avenior 邮箱。', privacy: '提交即表示你同意 Avenior 及表单投递服务商处理这些信息，以便回复你的咨询。',
    edit: '返回', next: '继续', sendEnquiry: '提交咨询', sending: '正在发送…', submitError: '暂时无法自动发送，请直接邮件联系 hello.avenior@gmail.com。',
    reviewGoal: '目标', reviewContact: '联系方式', reviewContext: '挑战', reviewSupport: '需要的支持', reviewTiming: '时间', required: '请先完成此步骤。',
    successKicker: '咨询已提交', successTitle: '谢谢，你的信息正在发送给 Avenior。', successBody: '你的联系方式与项目背景已发送至 hello.avenior@gmail.com。', emailUs: '发送邮件给 Avenior', restart: '重新填写'
  }
};

const order = ['intro', 'goal', 'context', 'support', 'timeline', 'details', 'review', 'success'];
const steps = order.map(name => document.querySelector(`[data-step="${name}"]`));
const form = document.querySelector('#contact-form');
const progress = document.querySelector('.progress span');
const progressText = document.querySelector('.progress-text');
const langButton = document.querySelector('#language');
const sendButton = document.querySelector('#send-enquiry');
const submitError = document.querySelector('#submit-error');
const total = 6;
let current = 0;
let language = localStorage.getItem('avenior-lang') || 'en';

function translate() {
  const dict = COPY[language];
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-copy]').forEach(el => { el.textContent = dict[el.dataset.copy]; });
  document.querySelectorAll('[data-placeholder]').forEach(el => { el.placeholder = dict[el.dataset.placeholder]; });
  langButton.textContent = dict.lang;
  updateProgress();
  localStorage.setItem('avenior-lang', language);
}

function updateProgress() {
  const shown = Math.min(Math.max(current, 1), total);
  progress.style.width = `${current === 0 ? 0 : shown / total * 100}%`;
  progressText.textContent = COPY[language].progress.replace('{current}', shown).replace('{total}', total);
}

function show(index) {
  current = Math.max(0, Math.min(index, steps.length - 1));
  steps.forEach((step, i) => {
    step.classList.toggle('is-active', i === current);
    step.setAttribute('aria-hidden', String(i !== current));
  });
  updateProgress();
  scrollTo({ top: 0, behavior: 'smooth' });
  const focusable = steps[current].querySelector('input, textarea, button');
  if (current > 1 && focusable) setTimeout(() => focusable.focus(), 350);
}

function values(name) {
  return [...form.querySelectorAll(`[name="${name}"]:checked`)].map(input => input.value);
}

function validate(index) {
  const error = steps[index].querySelector('.error');
  let valid = true;
  if (index === 1) valid = values('goal').length > 0;
  if (index === 2) valid = form.elements.context.value.trim().length > 15;
  if (index === 3) valid = values('support').length > 0;
  if (index === 4) valid = values('timeline').length > 0;
  if (index === 5) {
    const name = form.elements.name;
    const email = form.elements.email;
    valid = name.value.trim().length > 1 && email.validity.valid && email.value.trim() !== '';
  }
  if (error) error.textContent = valid ? '' : COPY[language].required;
  return valid;
}

function review() {
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const org = form.elements.org.value.trim();
  const phone = form.elements.phone.value.trim();
  document.querySelector('[data-review="goal"]').textContent = values('goal').join(', ');
  document.querySelector('[data-review="contact"]').textContent = [name, email, org, phone].filter(Boolean).join(' · ');
  document.querySelector('[data-review="context"]').textContent = form.elements.context.value.trim();
  document.querySelector('[data-review="support"]').textContent = values('support').join(', ');
  document.querySelector('[data-review="timing"]').textContent = values('timeline').join(', ') + (form.elements.source.value.trim() ? ` · ${form.elements.source.value.trim()}` : '');
}

function emailDraft() {
  const subject = `Avenior enquiry — ${values('goal')[0] || 'New conversation'}`;
  const body = [
    `Name: ${form.elements.name.value}`,
    `Email: ${form.elements.email.value}`,
    `Organisation / school: ${form.elements.org.value || '—'}`,
    `Phone: ${form.elements.phone.value || '—'}`,
    `Goal: ${values('goal').join(', ')}`,
    `Challenge:\n${form.elements.context.value}`,
    `Support: ${values('support').join(', ')}`,
    `Timing: ${values('timeline').join(', ')}`,
    `Source: ${form.elements.source.value || '—'}`
  ].join('\n\n');
  return `mailto:hello.avenior@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => {
  if (!validate(current)) return;
  if (current === 5) review();
  show(current + 1);
}));
document.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => show(current - 1)));
document.querySelector('[data-start]').addEventListener('click', () => show(1));
langButton.addEventListener('click', () => {
  language = language === 'en' ? 'zh' : 'en';
  translate();
});

sendButton.addEventListener('click', async () => {
  submitError.textContent = '';
  document.querySelector('#fallback-email').href = emailDraft();
  sendButton.disabled = true;
  sendButton.textContent = COPY[language].sending;
  const payload = {
    _subject: `New Avenior enquiry — ${values('goal')[0] || 'New conversation'}`,
    _template: 'table',
    _captcha: 'false',
    _replyto: form.elements.email.value.trim(),
    _url: 'https://avenior.co/contact.html',
    Name: form.elements.name.value.trim(),
    Email: form.elements.email.value.trim(),
    'Organisation / school': form.elements.org.value.trim() || '—',
    Phone: form.elements.phone.value.trim() || '—',
    Goal: values('goal').join(', '),
    Challenge: form.elements.context.value.trim(),
    Support: values('support').join(', '),
    Timing: values('timeline').join(', '),
    'How they heard about Avenior': form.elements.source.value.trim() || '—'
  };
  try {
    const response = await fetch('https://formsubmit.co/ajax/hello.avenior@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok || result.success === false) throw new Error('Submission failed');
    show(7);
  } catch (error) {
    submitError.textContent = COPY[language].submitError;
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = COPY[language].sendEnquiry;
  }
});

document.querySelector('#restart').addEventListener('click', () => {
  form.reset();
  submitError.textContent = '';
  show(0);
});
form.addEventListener('submit', event => event.preventDefault());
translate();
show(0);
