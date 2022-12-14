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
  return ASQ(function (done) {
    fakeAjax(file, done);
  });
}

ASQ().runner(function* main() {
  // call these promises in parallel
  var p1 = getFile("file1");
  var p2 = getFile("file2");
  var p3 = getFile("file3");

  // return output in order
  output(yield p1);
  output(yield p2);
  output(yield p3);

  output("Complete!");
});

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???
