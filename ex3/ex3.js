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

function getFile(file) {
  return new Promise(function (resolve, reject) {
    fakeAjax(file, resolve);
  });
}

var Promise1 = getFile("file1");
var Promise2 = getFile("file2");
var Promise3 = getFile("file3");

// request all files at once in "parallel"
Promise1.then(output)
  .then(() => Promise2)
  .then(output)
  .then(() => Promise3)
  .then(output)
  .then(() => output("Complete"));
