const inputs = document.querySelectorAll('input'); // EVERY INPUT
const radios = document.querySelectorAll('input[name="tip-amount"]'); // EVERY RADIO BUTTON

const pageBody = document.getElementsByName('body'); // BODY ELEMENT
const billInput = document.getElementById('bill-input'); // BILL AMOUNT INPUT ELEMENT
const numberOfPeopleInput = document.getElementById('number-of-people'); // NUMBER OF PEOPLE INPUT ELEMENT
const tipAmountPerPerson = document.querySelector('.tip-person'); // TIP/PERSON H4 ELEMENT
const totalAmountPerPerson = document.querySelector('.total-person'); // TOTAL/PERSON H4 ELEMENT
const customTipRadio = document.getElementById('custom-tip'); // CUSTOM TIP RADIO BUTTON
const customTipInput = document.getElementById('custom-tip-input'); // CUSTOM TIP INPUT ELEMENT
const customTipLabel = document.querySelector('.custom-tip-label'); // CUSTOM TIP LABEL ELEMENT
const resetButton = document.getElementById('reset-button'); // RESET BUTTON
const errorMessage = document.querySelector('.error-message'); // ERROR MESSAGE IF NUMBER OF PEOPLE IS 0 OR LESS (H2)

let numberOfPeople = 1; // NUMBER OF THE PEOPLE

// ***** CALCULATING FUNCTIONS *****

function roundTwoDecimals(number) {
  return Math.round(number * 100) / 100;
}

function calculateTip(selectedTip) {
  return roundTwoDecimals((billInput.value * selectedTip.value) / numberOfPeople);
}

function calculateTotalPerPerson(selectedTip) {
  return roundTwoDecimals(calculateTip(selectedTip) + billInput.value / numberOfPeople);
}

function calculateCustomTip() {
  return roundTwoDecimals((billInput.value * customTipInput.value) / 100 / numberOfPeople);
}

function calculateCustomTotalPerPerson() {
  return roundTwoDecimals(calculateCustomTip() + billInput.value / numberOfPeople);
}

// ***** CHECK THE NUMBER OF PEOPLE, IF 0 OR LESS SHOW ERROR MSG *****

numberOfPeopleInput.addEventListener('input', function () {
  numberOfPeople = numberOfPeopleInput.value;

  if (numberOfPeople <= 0) {
    errorMessage.style.display = 'inline-block';
    numberOfPeopleInput.classList.add('error-message-border');
  } else {
    numberOfPeopleInput.classList.remove('error-message-border');
    errorMessage.style.display = 'none';
  }
});

// ***** CHECK WHICH TIP SELECTED AND PRINT THE RESULT ******

inputs.forEach(function (elem) {
  let selectedTip;

  elem.addEventListener('input', function printTip() {
    if (customTipRadio.checked) {
      tipAmountPerPerson.textContent = '€' + calculateCustomTip();
      totalAmountPerPerson.textContent = '€' + calculateCustomTotalPerPerson();

      customTipLabel.style.display = 'none';
      customTipInput.style.display = 'block';
    } else {
      selectedTip = document.querySelector('input[name="tip-amount"]:checked');
      customTipRadio.checked = false;
      customTipInput.style.display = 'none';
      customTipLabel.style.display = 'flex';

      if (selectedTip) {
        tipAmountPerPerson.textContent = '€' + calculateTip(selectedTip);
        totalAmountPerPerson.textContent = '€' + calculateTotalPerPerson(selectedTip);
      }
    }
  });
});

// ***** RESET *****

resetButton.addEventListener('click', function () {
  numberOfPeople = 1;
  billInput.value = '';
  tipAmountPerPerson.textContent = '0.00 €';
  totalAmountPerPerson.textContent = '0.00 €';
  customTipInput.style.display = 'none';
  customTipLabel.style.display = 'flex';
  customTipInput.value = '';

  radios.forEach(function (elem) {
    elem.checked = false;
  });
});
