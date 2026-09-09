/* Innovaritas homepage hero — clickable project card switcher.
   Three cards (one real project + two "in progress" placeholders) sit in
   a left / center / right fan. Clicking (or pressing Enter/Space on) a
   side card brings it to the center. Clicking the card that's already
   centered opens its project, if it has one (only Pin Shuffler does
   right now). Falls back gracefully: if this script fails to load, the
   cards still show in their initial left/center/right layout from the
   HTML's own data-pos attributes, just without the click interaction. */
(function () {
  var stack = document.querySelector(".hero-stack");
  if (!stack) return;

  var cards = Array.prototype.slice.call(stack.querySelectorAll(".stack-card"));
  if (cards.length === 0) return;

  var activeIndex = cards.findIndex(function (card) {
    return card.classList.contains("stack-live");
  });
  if (activeIndex === -1) activeIndex = 0;

  function render() {
    var otherIndexes = [];
    cards.forEach(function (card, i) {
      if (i !== activeIndex) otherIndexes.push(i);
    });
    var leftIndex = otherIndexes[0];
    var rightIndex = otherIndexes[1];

    cards.forEach(function (card, i) {
      var hint = card.querySelector(".stack-hint");
      if (i === activeIndex) {
        card.dataset.pos = "center";
        card.setAttribute("aria-current", "true");
        if (hint) hint.textContent = card.dataset.href ? "Open project" : "";
      } else {
        card.dataset.pos = i === leftIndex ? "left" : "right";
        card.removeAttribute("aria-current");
        if (hint) hint.textContent = "View project";
      }
    });

    // Keep the markup order in sync with the visual left/center/right
    // order (not just the data-pos attribute) so keyboard and screen
    // reader tab order always matches what's on screen, even after the
    // active card changes -- otherwise tabbing after a click can jump
    // to a card that's no longer next in the visual layout.
    [cards[leftIndex], cards[activeIndex], cards[rightIndex]].forEach(function (card) {
      stack.appendChild(card);
    });
  }

  cards.forEach(function (card, i) {
    card.addEventListener("click", function () {
      if (i === activeIndex) {
        var href = card.dataset.href;
        if (href) window.location.href = href;
        return;
      }
      activeIndex = i;
      render();
    });
  });

  render();
})();
