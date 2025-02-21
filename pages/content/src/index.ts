console.log('helooo', chrome);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);

  if (request.action === 'fill_form') {
  }
});


