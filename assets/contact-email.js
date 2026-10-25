/* Builds the contact email link in the visitor's browser so the address is never
   written in the page source. Pages hold <span data-email> with fallback text. */
(function () {
  var user = ["he", "llo"];
  var host = ["innovari", "tas"];
  var addr = user.join("") + String.fromCharCode(64) + host.join("") + String.fromCharCode(46) + "com";
  var slots = document.querySelectorAll("[data-email]");
  for (var i = 0; i < slots.length; i++) {
    var link = document.createElement("a");
    link.href = "mailto:" + addr;
    link.textContent = addr;
    slots[i].textContent = "";
    slots[i].appendChild(link);
  }
})();
