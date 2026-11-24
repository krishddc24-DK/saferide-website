(function () {
  'use strict';

  var CONFIG = {
    FORM_ENDPOINT: '',
    GA_MEASUREMENT_ID: 'G-XXXXXXXXXX',
    CONSENT_KEY: 'sr_consent'
  };

  var PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    nzPhone: /^(\+64|0)(2\d|3|4|6|7|9)\d{6,9}$/,
    firstName: /^[\p{L}\s'\-]{1,50}$/u,
    bookingRef: /^[A-Za-z0-9\-]{4,40}$/
  };

  var MSG = {
    nameRequired: 'Please enter your full name (at least 2 characters).',
    nameLong: 'Please shorten your name to 100 characters or fewer.',
    email: 'Please enter a valid email address, such as name@example.com.',
    firstName: 'First names can use letters, spaces, hyphens and apostrophes (up to 50 characters).',
    cityWaitlist: 'Please choose your city so we can tell you when SafeRide arrives.',
    cityDriver: "Please choose the city you'd drive in.",
    userType: 'Please choose whether you want to ride, drive or both.',
    mobile: 'Please enter a valid New Zealand phone number, such as 021 123 4567 or +64 21 123 4567.',
    pEndorsement: 'Please tell us whether you hold a P (passenger) endorsement.',
    vehicle: 'Please choose your vehicle type.',
    role: "Please tell us whether you're a rider, a driver or someone else.",
    topic: 'Please choose a topic so we can send your request to the right person.',
    enquiry: 'Please choose what your message is about.',
    bookingRef: 'Booking references use letters, numbers and hyphens only (4 to 40 characters).',
    messageSupport: 'Please describe the issue in at least 20 characters.',
    messageContact: 'Please write a message of at least 20 characters.',
    messageLong: 'Please keep your message to 2000 characters or fewer.',
    consentWaitlist: 'Please tick the box so we can email you about the launch.',
    consent: "Please tick the box to confirm you've read how we use your information.",
    network: "Sorry, we couldn't send that. Please check your connection and try again."
  };

  function val(form, name) {
    var el = form.elements[name];
    if (!el) return '';
    if (el.length !== undefined && el.tagName !== 'SELECT') {
      for (var i = 0; i < el.length; i++) { if (el[i].checked) return el[i].value; }
      return '';
    }
    if (el.type === 'checkbox') return el.checked ? 'yes' : '';
    return (el.value || '').trim();
  }

  function rName(v) { if (v.length < 2) return MSG.nameRequired; if (v.length > 100) return MSG.nameLong; return ''; }
  function rEmail(v) { return v && v.length <= 254 && PATTERNS.email.test(v) ? '' : MSG.email; }
  function rChoice(msg) { return function (v) { return v ? '' : msg; }; }
  function rMessage(short) { return function (v) { if (v.length < 20) return short; if (v.length > 2000) return MSG.messageLong; return ''; }; }

  var RULES = {
    waitlist: {
      email: rEmail,
      first_name: function (v) { return !v || PATTERNS.firstName.test(v) ? '' : MSG.firstName; },
      city: rChoice(MSG.cityWaitlist),
      user_type: rChoice(MSG.userType),
      consent: rChoice(MSG.consentWaitlist)
    },
    driver: {
      name: rName,
      email: rEmail,
      mobile: function (v) { var c = v.replace(/[\s\-.()]/g, ''); return PATTERNS.nzPhone.test(c) ? '' : MSG.mobile; },
      city: rChoice(MSG.cityDriver),
      p_endorsement: rChoice(MSG.pEndorsement),
      vehicle_type: rChoice(MSG.vehicle),
      consent: rChoice(MSG.consent)
    },
    support: {
      name: rName,
      email: rEmail,
      role: rChoice(MSG.role),
      topic: rChoice(MSG.topic),
      booking_ref: function (v) { return !v || PATTERNS.bookingRef.test(v) ? '' : MSG.bookingRef; },
      message: rMessage(MSG.messageSupport),
      consent: rChoice(MSG.consent)
    },
    contact: {
      name: rName,
      email: rEmail,
      enquiry_type: rChoice(MSG.enquiry),
      message: rMessage(MSG.messageContact),
      consent: rChoice(MSG.consent)
    }
  };

  function fieldTarget(form, name) {
    var el = form.elements[name];
    if (!el) return null;
    if (el.length !== undefined && el.tagName !== 'SELECT') return el[0];
    return el;
  }

  function setError(form, type, name, msg) {
    var errEl = form.querySelector('#' + type + '-' + name + '-error');
    var el = form.elements[name];
    var targets = [];
    if (el && el.length !== undefined && el.tagName !== 'SELECT') { for (var i = 0; i < el.length; i++) targets.push(el[i]); } else if (el) { targets.push(el); }
    targets.forEach(function (t) {
      if (msg) { t.setAttribute('aria-invalid', 'true'); } else { t.removeAttribute('aria-invalid'); }
    });
    if (errEl) errEl.textContent = msg || '';
  }

  function validateField(form, type, name) {
    var rule = RULES[type][name];
    if (!rule) return '';
    var msg = rule(val(form, name));
    setError(form, type, name, msg);
    return msg;
  }

  function fillHidden(form) {
    var params;
    try { params = new URLSearchParams(window.location.search); } catch (e) { params = null; }
    var page = (window.location.pathname.split('/').pop() || 'index.html');
    if (form.elements.source_page) form.elements.source_page.value = page;
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) {
      if (form.elements[k] && params && params.get(k)) form.elements[k].value = params.get(k).slice(0, 100);
    });
  }

  function showSuccess(form) {
    var status = form.querySelector('.form-status');
    Array.prototype.forEach.call(form.children, function (child) {
      if (child !== status) child.hidden = true;
    });
    status.className = 'form-status success';
    status.textContent = form.getAttribute('data-success');
    status.focus();
  }

  function initForm(form) {
    var type = form.getAttribute('data-form');
    if (!RULES[type]) return;

    var city = form.getAttribute('data-city');
    if (city && form.elements.city) form.elements.city.value = city;
    fillHidden(form);

    Object.keys(RULES[type]).forEach(function (name) {
      var el = form.elements[name];
      if (!el) return;
      var list = (el.length !== undefined && el.tagName !== 'SELECT') ? Array.prototype.slice.call(el) : [el];
      list.forEach(function (node) {
        ['blur', 'input', 'change'].forEach(function (evt) {
          node.addEventListener(evt, function () {
            var anyInvalid = list.some(function (n) { return n.getAttribute('aria-invalid') === 'true'; });
            if (anyInvalid || (evt === 'blur' && node.value)) validateField(form, type, name);
          });
        });
      });
    });

    form.querySelectorAll('[data-count-for]').forEach(function (counter) {
      var ta = document.getElementById(counter.getAttribute('data-count-for'));
      if (!ta) return;
      ta.addEventListener('input', function () { counter.textContent = String(ta.value.length); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      status.className = 'form-status';
      status.textContent = '';

      if (form.elements.website && form.elements.website.value) { showSuccess(form); return; }

      var firstInvalid = null;
      Object.keys(RULES[type]).forEach(function (name) {
        if (validateField(form, type, name) && !firstInvalid) firstInvalid = fieldTarget(form, name);
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var btn = form.querySelector('.form-submit');
      if (CONFIG.FORM_ENDPOINT) {
        if (!navigator.onLine) { status.className = 'form-status error'; status.textContent = MSG.network; status.focus(); return; }
        btn.disabled = true;
        btn.textContent = 'Sending…';
        form.setAttribute('action', CONFIG.FORM_ENDPOINT);
        form.setAttribute('method', 'post');
        HTMLFormElement.prototype.submit.call(form);
        return;
      }
      btn.disabled = true;
      window.setTimeout(function () { btn.disabled = false; }, 5000);
      showSuccess(form);
    });
  }

  function initNav() {
    var btn = document.querySelector('.hamburger');
    var panel = document.getElementById('mobile-nav');
    var navbar = document.querySelector('.navbar');
    if (navbar) {
      var onScroll = function () { navbar.classList.toggle('is-scrolled', window.scrollY > 50); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    if (!btn || !panel) return;
    function setOpen(open, returnFocus) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      panel.classList.toggle('is-open', open);
      if (open) {
        var first = panel.querySelector('a');
        if (first) first.focus();
      } else if (returnFocus) {
        btn.focus();
      }
    }
    btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true', false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false, false); }); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1080 && panel.classList.contains('is-open')) setOpen(false, false); });
  }

  function initDemo() {
    var toggle = document.querySelector('[data-demo-toggle]');
    var phone = document.querySelector('.phone');
    if (!toggle || !phone) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { toggle.hidden = true; return; }
    toggle.addEventListener('click', function () {
      var paused = toggle.getAttribute('aria-pressed') !== 'true';
      toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
      toggle.textContent = paused ? 'Play animation' : 'Pause animation';
      phone.classList.toggle('demo-paused', paused);
    });
  }

  function readConsent() { try { return window.localStorage.getItem(CONFIG.CONSENT_KEY); } catch (e) { return null; } }
  function writeConsent(v) { try { window.localStorage.setItem(CONFIG.CONSENT_KEY, v); } catch (e) { } }

  function loadAnalytics() {
    var id = CONFIG.GA_MEASUREMENT_ID;
    if (!id || id.indexOf('XXXX') !== -1 || window.__srGaLoaded) return;
    window.__srGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });
  }

  function initConsent() {
    var banner = document.querySelector('[data-cookie-banner]');
    if (!banner) return;
    function show() { banner.hidden = false; document.body.classList.add('cookie-open'); }
    function hide() { banner.hidden = true; document.body.classList.remove('cookie-open'); }
    var choice = readConsent();
    if (choice === 'granted') loadAnalytics();
    if (!choice) show();
    var accept = banner.querySelector('[data-cookie-accept]');
    var decline = banner.querySelector('[data-cookie-decline]');
    if (accept) accept.addEventListener('click', function () { writeConsent('granted'); hide(); loadAnalytics(); });
    if (decline) decline.addEventListener('click', function () { writeConsent('denied'); hide(); });
    document.querySelectorAll('[data-cookie-settings]').forEach(function (b) {
      b.addEventListener('click', function () { show(); if (accept) accept.focus(); });
    });
  }

  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initDemo();
    initConsent();
    initYear();
    document.querySelectorAll('form[data-form]').forEach(initForm);
  });
})();
