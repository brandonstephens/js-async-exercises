function fakeAjax(url, cb) {
  var fake_responses = {
    file1: "The first text",
    file2: "The middle text",
    file3: "The last text",
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

  console.log("Requesting: " + url);

  setTimeout(function () {
    cb(fake_responses[url]);
  }, randomDelay);
}

function output(text) {
  console.log(text);
}

// **************************************
// The old-n-busted callback way

function addItemToUi(item) {
  const newChild = document.createElement("li");
  newChild.innerHTML = `${item} - 🟡`;
  newChild.dataset.name = item;
  document.getElementById("app").appendChild(newChild);
}

function resolveItemInUi(item) {
  const elm = document.querySelector(`[data-name=${item}]`);
  elm.innerHTML = `${item} - 💚`;
}

function getFile(file) {
  addItemToUi(file);

  fakeAjax(file, function () {
    output(file);
    resolveItemInUi(file);
  });
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
