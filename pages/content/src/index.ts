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


  const testRules = mergedPresents[0].rules
  const form = document.querySelector('form');
  if (!form) {
    return
  }

  // fieldExpr is input name, field value is input value. find inputs that match name, and fill the value
  testRules.forEach((rule) => {
    const input = form.querySelector(`input[name="${rule.fieldExpr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"]`);
    if (input) {
      input.value = rule.fieldValue;
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fill_form') {
    console.log('ok');

    fillForm().catch(console.error)
  }
});


