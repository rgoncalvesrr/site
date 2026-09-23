/**
 * Peau Santé — conversão: WhatsApp, modal de lead e tracking.
 * Substitua META_PIXEL_ID pelo ID real do Pixel no Meta Events Manager.
 */
(function () {
  'use strict';

  var WA_NUMBER = '5511993092933';
  var META_PIXEL_ID = ''; // ex.: '123456789012345' — deixe vazio até ter o ID real

  window.PEAU = window.PEAU || {};
  window.PEAU.WA_NUMBER = WA_NUMBER;

  function trackLead(source) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      lead_source: source || 'whatsapp'
    });
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', { content_name: source || 'whatsapp' });
    }
  }

  function trackContact(source) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'contact',
      contact_method: 'whatsapp',
      contact_source: source || 'direct'
    });
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Contact', { content_name: source || 'direct' });
    }
  }

  function openWhatsApp(message, source) {
    var url =
      'https://wa.me/' +
      WA_NUMBER +
      '?text=' +
      encodeURIComponent(message || 'Olá, gostaria de agendar uma avaliação na Peau Santé.');
    trackContact(source || 'direct_whatsapp');
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  window.openWhatsApp = function (e, message, source) {
    if (e) e.preventDefault();
    openWhatsApp(message, source);
  };

  window.openLeadModal = function (e, message) {
    if (e) e.preventDefault();
    window.currentWaMsg = message || 'Olá, gostaria de agendar uma avaliação na Peau Santé.';
    var modal = document.getElementById('lead-modal');
    if (!modal) {
      openWhatsApp(window.currentWaMsg, 'fallback_no_modal');
      return;
    }
    modal.classList.replace('hidden', 'flex');
    document.body.style.overflow = 'hidden';
    var nameInput = document.getElementById('leadName');
    if (nameInput) setTimeout(function () { nameInput.focus(); }, 50);
  };

  window.closeLeadModal = function () {
    var modal = document.getElementById('lead-modal');
    if (modal) modal.classList.replace('flex', 'hidden');
    document.body.style.overflow = '';
  };

  window.submitLead = function (e) {
    e.preventDefault();
    var nameEl = document.getElementById('leadName');
    var emailEl = document.getElementById('leadEmail');
    var phoneEl = document.getElementById('leadPhone');
    var name = nameEl ? nameEl.value.trim() : '';
    var email = emailEl ? emailEl.value.trim() : '';
    var phone = phoneEl ? phoneEl.value.trim() : '';

    var msg = (window.currentWaMsg || 'Olá, gostaria de agendar uma avaliação na Peau Santé.') +
      '\n\n*Dados do Contato:*\nNome: ' + name +
      (email ? '\nE-mail: ' + email : '') +
      '\nWhatsApp: ' + phone;

    trackLead('lead_modal');
    window.open(
      'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg),
      '_blank',
      'noopener,noreferrer'
    );
    window.closeLeadModal();
  };

  function maskPhone(input) {
    input.addEventListener('input', function (e) {
      var value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d{0,2}).*/, '($1');
      }
      e.target.value = value;
    });
  }

  function carregarScriptsTerceiros() {
    if (window.__peauScriptsLoaded) return;
    window.__peauScriptsLoaded = true;

    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0];
      var j = d.createElement(s);
      var dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-PSBGFN7');

    if (META_PIXEL_ID && META_PIXEL_ID !== '1234567890') {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    var btnMobile = document.getElementById('mobile-menu-btn');
    var menuMobile = document.getElementById('mobile-menu');
    if (btnMobile && menuMobile) {
      btnMobile.addEventListener('click', function () {
        menuMobile.classList.toggle('hidden');
      });
      menuMobile.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          menuMobile.classList.add('hidden');
        });
      });
    }

    var phoneInput = document.getElementById('leadPhone');
    if (phoneInput) maskPhone(phoneInput);

    var lgpdCheckbox = document.getElementById('lgpdConsent');
    var submitBtn = document.getElementById('submitLeadBtn');
    if (lgpdCheckbox && submitBtn) {
      lgpdCheckbox.addEventListener('change', function () {
        submitBtn.disabled = !this.checked;
      });
    }

    var modal = document.getElementById('lead-modal');
    if (modal) {
      modal.addEventListener('click', function (ev) {
        if (ev.target === modal) window.closeLeadModal();
      });
    }

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') window.closeLeadModal();
    });

    ['scroll', 'mousemove', 'touchstart', 'click'].forEach(function (evento) {
      window.addEventListener(evento, carregarScriptsTerceiros, { once: true, passive: true });
    });
    setTimeout(carregarScriptsTerceiros, 3500);
  });

  window.changeFontSize = function (s, r) {
    var f = r ? 100 : (parseInt(localStorage.getItem('fontSize'), 10) || 100) + s;
    f = Math.max(85, Math.min(130, f));
    document.documentElement.style.fontSize = f + '%';
    localStorage.setItem('fontSize', String(f));
  };

  window.toggleTheme = function () {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  };
})();
