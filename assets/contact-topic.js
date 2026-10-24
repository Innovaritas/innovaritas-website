// Pre-selects the "What is this about?" dropdown from a link such as
// /contact.html?topic=pin-shuffler. Only topics that already exist in the
// dropdown (via each option's data-topic) are accepted, so anything else in
// the URL is ignored. The field itself is named "subject" so Netlify uses
// the chosen option as the notification email's subject line.
(function () {
  var select = document.getElementById("topic");
  if (!select) return;
  var wanted = new URLSearchParams(window.location.search).get("topic");
  if (!wanted) return;
  for (var i = 0; i < select.options.length; i++) {
    var opt = select.options[i];
    if (!opt.disabled && opt.getAttribute("data-topic") === wanted) {
      select.selectedIndex = i;
      break;
    }
  }
})();
