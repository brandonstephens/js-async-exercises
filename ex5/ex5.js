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
  return new ASQ((done) => {
    fakeAjax(file, done);
  });
}

getFile("file1")
  .val(output)
  .seq(getFile("file2"))
  .val(output)
  .seq(getFile("file3"))
  .val(output)
  .val(() => output("Complete"));

// request an array of files at once in "parallel"
// ???
