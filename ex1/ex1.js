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
let files = [
  { name: "file1", resolved: false },
  { name: "file2", resolved: false },
  { name: "file3", resolved: false },
];

function handleResponse(item) {
  files = [
    ...files.filter((x) => x.name !== item),
    { name: item, resolved: true },
  ];

  let ready = files.reduce((acc, val) => (acc ? val.resolved : false), true);

  if (ready) {
    console.log("Complete!");
  } else {
    return;
  }
}

function getFile(file) {
  fakeAjax(file, function () {
    output(file);
    handleResponse(file);
  });
}

// request all files at once in "parallel"
files.forEach((element) => {
  getFile(element.name);
});
