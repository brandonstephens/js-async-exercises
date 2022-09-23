$(document).ready(function () {
  // creation
  var $btn = $("#btn"),
    $list = $("#list"),
    clicks = ASQ.react.of(),
    messages = ASQ.react.of(),
    latest;

  $btn.click(function (event) {
    clicks.push(event);
  });

  // -----------------------------------------------------------------------------

  // consumption
  setInterval(() => {
    if (latest) {
      messages.push("clicked");
      latest = null;
    }
  }, 1000);

  clicks.val((event) => {
    latest = event;
  });

  messages.val((message) => {
    $list.append($(`<div>${message}</div>`));
  });
});
