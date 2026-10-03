// Pre-selects the "What is this about?" dropdown from a link such as
// /contact.html?topic=pin-shuffler. Only values that already exist in the
// dropdown are accepted, so anything else in the URL is ignored.
(function () {
  var select = document.getElementById("topic");
  if (!select) return;
  var wanted = new URLSearchParams(window.location.search).get("topic");
  if (!wanted) return;
  for (var i = 0; i < select.options.length; i++) {
    var opt = select.options[i];
    if (!opt.disabled && opt.value === wanted) {
      select.value = wanted;
      break;
    }
  }
})();
