(function () {
  'use strict';
  var CANONICAL = 'libbitcoin.info';
  var host = location.hostname.toLowerCase();
  var local = location.protocol === 'file:' || host === 'localhost' ||
    host === '127.0.0.1';
  var trusted = local || host === CANONICAL || host === 'libbitcoin.github.io';
  var framed = false;
  try { framed = window.top !== window.self; } catch (_) { framed = true; }
  if (trusted && !(framed && !local)) return;

  // Wrong host (squatter proxy) or framed: navigate to the canonical site.
  var url = 'https://' + CANONICAL + location.pathname + location.search;
  try { window.top.location.replace(url); } catch (_) {}
  try { location.replace(url); } catch (_) {}

  // Navigation blocked: replace the page with a warning.
  function warn() {
    document.body.innerHTML =
      '<div style="max-width:36em;margin:15vh auto;padding:0 24px;' +
      'font:16px/1.6 system-ui;color:#ededed">' +
      '<h1 style="color:#ff2357;font-size:22px">Warning: unofficial mirror</h1>' +
      '<p>This page is being served from a domain not controlled by the ' +
      'libbitcoin project. Do not trust content, links, or downloads here.</p>' +
      '<p>The official site is <a style="color:#ffa022" ' +
      'href="' + url + '">https://libbitcoin.info</a>.</p></div>';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', warn);
  } else {
    warn();
  }
})();
