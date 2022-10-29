const inputs = document.querySelectorAll('input');
const radios = document.querySelectorAll('input[name="tip-amount"]');

const billInput = document.getElementById('bill-input');
const numberOfPeople = document.getElementById('number-of-people');
const tipAmountPerPerson = document.querySelector('.tip-person');
const totalAmountPerPerson = document.querySelector('.total-person');
const customTipSelector = document.getElementById('custom-tip');
const customTipAmount = document.getElementById('custom-tip-amount');
const resetButton = document.getElementById('reset-button');

function roundTwoDecimals(number) {
  return Math.round(number * 100) / 100;
}

function calculateTip(selectedTip) {
  return roundTwoDecimals((billInput.value * selectedTip.value) / numberOfPeople.value);
}

function calculateTotalPerPerson(selectedTip) {
  return calculateTip(selectedTip) + billInput.value / numberOfPeople.value;
}

function calculateCustomTip() {
  return roundTwoDecimals((billInput.value * customTipAmount.value) / 100 / numberOfPeople.value);
}

function calculateCustomTotalPerPerson() {
  return calculateCustomTip() + billInput.value / numberOfPeople.value;
}

inputs.forEach(function (elem) {
  elem.addEventListener('input', function printTip() {
    if (customTipSelector.checked) {
      tipAmountPerPerson.textContent = calculateCustomTip();
      totalAmountPerPerson.textContent = calculateCustomTotalPerPerson();
    } else {
      const selectedTip = document.querySelector('input[name="tip-amount"]:checked');
      tipAmountPerPerson.textContent = calculateTip(selectedTip);
      totalAmountPerPerson.textContent = calculateTotalPerPerson(selectedTip);
    }
  });
});

resetButton.addEventListener('click', function () {
  inputs.forEach(function (elem) {
    elem.value = 0;
  });
  numberOfPeople.value = 1;
  tipAmountPerPerson.textContent = '';
  totalAmountPerPerson.textContent = '';
});
