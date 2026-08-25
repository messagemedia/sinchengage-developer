/*
  Page actions: "Copy for LLM" / "View as Markdown".

  ReDoc Community Edition has no built-in page actions (that is a Redocly
  Realm/Reunite feature). This lightweight, dependency-free widget adds two
  inline text links to each ReDoc section, mapping the section's
  data-section-id to the matching Markdown file published under /docs/api
  (mirrored into web_deploy by scripts/copy-docs.mjs). The links are anchored to
  the top-right of the section's description panel and vertically centred on the
  heading -- they scroll with the content, they are not a floating overlay.
*/
(function () {
  'use strict';

  // Map ReDoc operationId -> published Markdown (relative to the site root).
  var OP_TO_MD = {
    addcontacttocontactlist: 'docs/api/contacts/add-contact-to-contact-list.md',
    addoneormorenumberstoyourblacklist: 'docs/api/number-authorisation/add-one-or-more-numbers-to-your-blacklist.md',
    cancelscheduledmessage: 'docs/api/messages/cancel-scheduled-message.md',
    checkdeliveryreports: 'docs/api/delivery-reports/check-delivery-reports.md',
    checkifoneorseveralnumbersarecurrentlyblacklisted: 'docs/api/number-authorisation/check-if-one-or-several-numbers-are-currently-blacklisted.md',
    checkreplies: 'docs/api/replies/check-replies.md',
    confirmdeliveryreportsasreceived: 'docs/api/delivery-reports/confirm-delivery-reports-as-received.md',
    confirmrepliesasreceived: 'docs/api/replies/confirm-replies-as-received.md',
    createassignment: 'docs/api/dedicated-numbers/create-assignment.md',
    createcontact: 'docs/api/contacts/create-contact.md',
    createcontactlist: 'docs/api/contacts/create-contact-list.md',
    createcustomfield: 'docs/api/contacts/create-custom-field.md',
    createsignaturekey: 'docs/api/signature-key-management/create-signature-key.md',
    createwebhook: 'docs/api/webhooks-management/create-webhook.md',
    deleteassignment: 'docs/api/dedicated-numbers/delete-assignment.md',
    deletecontactbyid: 'docs/api/contacts/delete-contact-by-id.md',
    deletecontactlistbyid: 'docs/api/contacts/delete-contact-list-by-id.md',
    deletecustomfieldbyid: 'docs/api/contacts/delete-custom-field-by-id.md',
    deletescheduledreport: 'docs/api/messaging-reports/delete-scheduled-report.md',
    deletesenderaddressusingdelete: 'docs/api/source-address/delete-sender-address-using-delete.md',
    deletesignaturekey: 'docs/api/signature-key-management/delete-signature-key.md',
    deletewebhook: 'docs/api/webhooks-management/delete-webhook.md',
    detailscheduledreport: 'docs/api/messaging-reports/detailscheduledreport.md',
    disablethecurrentenabledsignaturekey: 'docs/api/signature-key-management/disable-the-current-enabled-signature-key.md',
    enablesignaturekey: 'docs/api/signature-key-management/enable-signature-key.md',
    getactivereport: 'docs/api/messaging-reports/get-active-report.md',
    getallapprovedsenderaddresses: 'docs/api/source-address/get-all-approved-sender-addresses.md',
    getassignednumbers: 'docs/api/dedicated-numbers/get-assigned-numbers.md',
    getassignment: 'docs/api/dedicated-numbers/get-assignment.md',
    getasyncdetailfields: 'docs/api/messaging-reports/get-async-detail-fields.md',
    getasyncdetailstatus: 'docs/api/messaging-reports/get-async-detail-status.md',
    getasyncreportdownloadurl: 'docs/api/messaging-reports/get-async-report-download-url.md',
    getasyncreporthistory: 'docs/api/messaging-reports/get-async-report-history.md',
    getcontactbyid: 'docs/api/contacts/get-contact-by-id.md',
    getcontactlistbyid: 'docs/api/contacts/get-contact-list-by-id.md',
    getcontactlistspage: 'docs/api/contacts/get-contact-lists-page.md',
    getcontactspage: 'docs/api/contacts/get-contacts-page.md',
    getcustomfieldbyid: 'docs/api/contacts/get-custom-field-by-id.md',
    getcustomfieldspage: 'docs/api/contacts/get-custom-fields-page.md',
    getenabledsignaturekey: 'docs/api/signature-key-management/get-enabled-signature-key.md',
    getmessagestatus: 'docs/api/messages/get-message-status.md',
    getnumberbyid: 'docs/api/dedicated-numbers/get-number-by-id.md',
    getnumbers: 'docs/api/dedicated-numbers/get-numbers.md',
    getscheduledreport: 'docs/api/messaging-reports/get-scheduled-report.md',
    getsenderaddressbyid: 'docs/api/source-address/get-sender-address-by-id.md',
    getsignaturekeydetail: 'docs/api/signature-key-management/get-signature-key-detail.md',
    getsignaturekeylist: 'docs/api/signature-key-management/get-signature-key-list.md',
    getstatusofsenderaddressrequest: 'docs/api/source-address/get-status-of-sender-address-request.md',
    listallblockednumbers: 'docs/api/number-authorisation/list-all-blocked-numbers.md',
    logdetail: 'docs/api/short-trackable-links-reports/log-detail.md',
    logsummary: 'docs/api/short-trackable-links-reports/log-summary.md',
    modifycontactsincontactlist: 'docs/api/contacts/modify-contacts-in-contact-list.md',
    postasyncdetailreport: 'docs/api/messaging-reports/post-async-detail-report.md',
    postasyncsummaryreport: 'docs/api/messaging-reports/post-async-summary-report.md',
    postdetailreport: 'docs/api/messaging-reports/post-detail-report.md',
    postinsightreport: 'docs/api/messaging-reports/post-insight-report.md',
    postmetadatakeys: 'docs/api/messaging-reports/post-metadata-keys.md',
    removeanumberfromtheblacklist: 'docs/api/number-authorisation/remove-a-number-from-the-blacklist.md',
    removecontactfromcontactlist: 'docs/api/contacts/remove-contact-from-contact-list.md',
    requestsenderaddressusingpost: 'docs/api/source-address/request-sender-address-using-post.md',
    retrievewebhook: 'docs/api/webhooks-management/retrieve-webhook.md',
    reverifysenderaddressusingpost: 'docs/api/source-address/re-verify-sender-address-using-post.md',
    sendmessages: 'docs/api/messages/send-messages.md',
    submittingverificationcodepost: 'docs/api/source-address/submitting-verification-code-post.md',
    summaryscheduledreport: 'docs/api/messaging-reports/summaryscheduledreport.md',
    updateassignment: 'docs/api/dedicated-numbers/update-assignment.md',
    updatecontact: 'docs/api/contacts/update-contact.md',
    updatecontactlist: 'docs/api/contacts/update-contact-list.md',
    updatecustomfield: 'docs/api/contacts/update-custom-field.md',
    updatedetailscheduledreport: 'docs/api/messaging-reports/updatedetailscheduledreport.md',
    updatesenderaddressusingpatch: 'docs/api/source-address/update-sender-address-using-patch.md',
    updatesummaryscheduledreport: 'docs/api/messaging-reports/updatesummaryscheduledreport.md',
    updatewebhook: 'docs/api/webhooks-management/update-webhook.md'
  };
  // Map ReDoc tag slug (spaces -> hyphens, lowercased) -> section index.
  var TAG_TO_MD = {
    'basic-authentication': 'docs/guides/basic-authentication.md',
    'hmac-authentication': 'docs/guides/hmac-authentication.md',
    'sub-accounts': 'docs/guides/sub-accounts.md',
    messages: 'docs/api/messages/index.md',
    'delivery-reports': 'docs/api/delivery-reports/index.md',
    replies: 'docs/api/replies/index.md',
    'source-address': 'docs/api/source-address/index.md',
    'number-authorisation': 'docs/api/number-authorisation/index.md',
    'dedicated-numbers': 'docs/api/dedicated-numbers/index.md',
    'webhooks-management': 'docs/api/webhooks-management/index.md',
    'signature-key-management': 'docs/api/signature-key-management/index.md',
    'messaging-reports': 'docs/api/messaging-reports/index.md',
    'short-trackable-links-reports': 'docs/api/short-trackable-links-reports/index.md',
    contacts: 'docs/api/contacts/index.md'
  };

  var COPY_ICON =
    '<svg class="llm-actions__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
    '<rect x="9" y="9" width="13" height="13" rx="2"></rect>' +
    '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var EXT_ICON =
    '<svg class="llm-actions__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
    '<path d="M14 3h7v7"></path><path d="M10 14 21 3"></path>' +
    '<path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path></svg>';

  // Resolve a published Markdown path from a ReDoc data-section-id.
  function resolveMarkdownPath(sectionId) {
    if (!sectionId) {
      return null;
    }
    var opMatch = sectionId.match(/operation\/([^\/?#]+)$/i);
    if (opMatch) {
      var op = decodeURIComponent(opMatch[1]).toLowerCase();
      if (OP_TO_MD[op]) {
        return OP_TO_MD[op];
      }
    }
    var tagMatch = sectionId.match(/^tag\/([^\/?#]+)$/i);
    if (tagMatch) {
      var slug = decodeURIComponent(tagMatch[1]).replace(/\s+/g, '-').toLowerCase();
      if (TAG_TO_MD[slug]) {
        return TAG_TO_MD[slug];
      }
    }
    return null;
  }

  function toUrl(mdPath) {
    // Resolve against the current document so it works at "/" or "/index.html".
    return new URL(mdPath, document.baseURI).href;
  }

  function fallbackMarkdown(url) {
    var title = (document.title || 'API reference').trim();
    return (
      '# ' + title + '\n\n' +
      'Source: ' + url + '\n\n' +
      'The full Markdown for this page could not be fetched automatically. ' +
      'Open it directly at ' + url + '\n'
    );
  }

  function writeToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error('execCommand copy failed'));
      } catch (err) {
        reject(err);
      }
    });
  }

  function flash(link, msg) {
    var label = link.querySelector('.llm-actions__label');
    var original = link.getAttribute('data-label');
    label.textContent = msg;
    setTimeout(function () {
      label.textContent = original;
    }, 1600);
  }

  function copyMarkdown(url, link) {
    fetch(url, { headers: { Accept: 'text/markdown, text/plain' } })
      .then(function (res) {
        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }
        return res.text();
      })
      .then(function (text) {
        return writeToClipboard(text).then(function () {
          flash(link, 'Copied!');
        });
      })
      .catch(function () {
        return writeToClipboard(fallbackMarkdown(url)).then(
          function () { flash(link, 'Copied summary'); },
          function () { flash(link, 'Copy failed'); }
        );
      });
  }

  function buildBar(mdPath) {
    var url = toUrl(mdPath);
    var bar = document.createElement('div');
    bar.className = 'llm-actions';

    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.setAttribute('data-label', 'Copy for LLM');
    copyBtn.setAttribute('aria-label', 'Copy page as Markdown for LLMs');
    copyBtn.setAttribute('title', 'Copy page as Markdown for LLMs');
    copyBtn.innerHTML = COPY_ICON + '<span class="llm-actions__label">Copy for LLM</span>';
    copyBtn.addEventListener('click', function () {
      copyMarkdown(url, copyBtn);
    });

    var viewLink = document.createElement('a');
    viewLink.href = url;
    viewLink.target = '_blank';
    viewLink.rel = 'noopener';
    viewLink.setAttribute('aria-label', 'Open this page as Markdown (opens in a new tab)');
    viewLink.setAttribute('title', 'Open this page as Markdown');
    viewLink.innerHTML = '<span class="llm-actions__label">View as Markdown</span>' + EXT_ICON;

    bar.appendChild(copyBtn);
    bar.appendChild(viewLink);
    return bar;
  }

  function hasOwnBar(el) {
    for (var i = 0; i < el.children.length; i++) {
      if (el.children[i].classList &&
          el.children[i].classList.contains('llm-actions')) {
        return true;
      }
    }
    return false;
  }

  // ReDoc lays each section out as a ~60% "middle" description panel and a
  // ~40% dark samples panel. The middle panel is the element that holds the
  // section heading (found via the <h2>/<h1>), which is stable across ReDoc's
  // generated class names. Anchor the links to the top-right of that panel so
  // they sit on the light background next to the heading.
  function middlePanelOf(row) {
    var heading = row.querySelector('h1, h2');
    if (heading && heading.parentElement && row.contains(heading.parentElement)) {
      return heading.parentElement;
    }
    return row.firstElementChild || row;
  }

  // Vertically centre the bar on the section heading so the links sit inline
  // with the header text regardless of the heading's font size.
  function alignBar(panel, bar) {
    var heading = panel.querySelector('h1, h2');
    if (!heading) {
      return;
    }
    var top = heading.offsetTop + (heading.offsetHeight - bar.offsetHeight) / 2;
    bar.style.top = Math.max(0, Math.round(top)) + 'px';
  }

  var placed = [];

  // Inject a links bar into every mapped ReDoc section, once each. Presence is
  // checked via the actual bar element (not an attribute), so if ReDoc's
  // hydration/re-render drops a bar we simply re-add it.
  function injectAll() {
    var sections = document.querySelectorAll('[data-section-id]');
    var claimed = [];
    placed = [];
    for (var i = 0; i < sections.length; i++) {
      var el = sections[i];
      var mdPath = resolveMarkdownPath(el.getAttribute('data-section-id'));
      if (!mdPath) {
        continue;
      }
      // Skip nested duplicates (ReDoc wraps operations in two section divs);
      // only the outermost mapped section is used as the row.
      var nested = claimed.some(function (parent) {
        return parent !== el && parent.contains(el);
      });
      if (nested) {
        continue;
      }
      var target = middlePanelOf(el);
      if (hasOwnBar(target)) {
        // Bar already present (e.g. survived a ReDoc re-render); re-register it
        // so alignAll() -- including on resize -- keeps repositioning it.
        var existing = target.querySelector(':scope > .llm-actions');
        if (existing) {
          placed.push({ panel: target, bar: existing });
        }
        claimed.push(el);
        continue;
      }
      var cs = window.getComputedStyle(target);
      if (cs.position === 'static') {
        target.style.position = 'relative';
      }
      var bar = buildBar(mdPath);
      target.appendChild(bar);
      placed.push({ panel: target, bar: bar });
      claimed.push(el);
    }
    alignAll();
  }

  function alignAll() {
    for (var i = 0; i < placed.length; i++) {
      alignBar(placed[i].panel, placed[i].bar);
    }
  }

  function init() {
    injectAll();

    // ReDoc hydrates/re-renders after load; re-run when the DOM changes
    // (guarded so we never duplicate bars).
    var scheduled = false;
    var observer = new MutationObserver(function () {
      if (scheduled) {
        return;
      }
      scheduled = true;
      window.requestAnimationFrame(function () {
        scheduled = false;
        injectAll();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Keep the links centred on the heading as the layout reflows.
    var resizeTimer = null;
    window.addEventListener('resize', function () {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(alignAll, 150);
    });
    window.addEventListener('load', alignAll);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
