function getInputByLabel(labelElement) {
  if (!labelElement || labelElement.tagName !== 'LABEL') return null;

  // Case 1: Label wraps the input
  const input = labelElement.querySelector('input');
  if (input) return input;

  // Case 2: Label uses `for` to reference an input
  const inputId = labelElement.getAttribute('for');
  return inputId ? document.querySelector(`#${inputId}`) : null;
}

function getInputsByLabelRegex(form, regex) {
  return [...form.querySelectorAll('label')]
    .filter(label => {
      return regex.test(label.textContent.trim())
    }) // Match labels by regex
    .map(label => {
      return getInputByLabel(label);
    }) // Get inputs inside labels
    .filter(input => input !== null); // Remove null values
}

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
    const inputs = getInputsByLabelRegex(form, new RegExp(`^${rule.fieldExpr}`, "i"));
    console.log({ inputs });

    inputs.forEach(input => {
      input.value = rule.fieldValue
    })
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fill_form') {

    fillForm().catch(console.error)
  }
});


