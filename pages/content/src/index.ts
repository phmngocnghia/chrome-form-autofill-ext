const fillForm = async () => {
  const { presents = [] } = (await chrome.storage.local.get("presents")) || [];
  const { rules = [] } = (await chrome.storage.local.get("rules")) || [];

  const mergedPresents = presents.map((present) => {
    const mergedRules = present.rules.map((presentRule) => {
      const rule = rules.find((rule) => rule.id === presentRule.id);
      return rule;
    }).filter(Boolean);

    return { ...present, rules: mergedRules };
  });


  const testRule = mergedPresents[0]



}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);


  if (request.action === 'fill_form') {
    console.log('ok');

    fillForm().catch(console.error)
  }
});


