// Logs pages, time on each page, and clicks for this browser tab's visit, and sends the running total
// to the portfolio-visit-alerts val on Val Town, which emails a summary when the visit ends.
// Visit the site once with ?me in the URL to stop tracking your own browser.
(function () {
  var ENDPOINT = 'https://unlikelyarchivist--adb5d626bc6311f1a25f1607ee4eb77e.web.val.run/';
  try {
    if (/[?&]me\b/.test(location.search)) localStorage.setItem('visit-tracker-ignore', '1');
    if (localStorage.getItem('visit-tracker-ignore')) return;
  } catch (e) {}

  var visit;
  try { visit = JSON.parse(sessionStorage.getItem('visit-tracker')); } catch (e) {}
  if (!visit) {
    visit = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      referrer: document.referrer.indexOf(location.origin) === 0 ? '' : document.referrer,
      pages: [],
      clicks: []
    };
  }
  var page = { path: location.pathname, ms: 0 };
  visit.pages.push(page);
  var visibleSince = document.visibilityState === 'visible' ? Date.now() : null;

  function send() {
    if (visibleSince) { page.ms += Date.now() - visibleSince; visibleSince = null; }
    try { sessionStorage.setItem('visit-tracker', JSON.stringify(visit)); } catch (e) {}
    navigator.sendBeacon(ENDPOINT, JSON.stringify(visit));
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    visit.clicks.push({
      page: location.pathname,
      label: (el.textContent || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 80),
      href: el.getAttribute('href') || undefined
    });
    send();
    if (document.visibilityState === 'visible') visibleSince = Date.now();
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') send();
    else visibleSince = Date.now();
  });
  window.addEventListener('pagehide', send);
})();
