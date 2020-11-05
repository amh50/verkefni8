/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint brace-style: [2, "stroustrup"] */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} shift Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @param {string} type "encode" eða "decode", segir til um hvort við séum að kóða eða afkóða
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */

function code(str, shift, alphabet, type) {
  const newLocation = [];
  let result = '';

  if (type === 'encode') {
    for (let i = 0; i < str.length; i++) {
      // Athugum hvort stafurinn í strengnum sé í alphabet
      if (alphabet.includes(str[i].toLocaleUpperCase())) {
        // Finnum staðsetningu stafanna í stafrófinu, hliðrum þeim um shift til hægri og geymum í
        // fylki
        newLocation[i] = alphabet.indexOf(str[i].toLocaleUpperCase()) + parseInt(shift, 10);

        while (newLocation[i] > alphabet.length - 1) {
          newLocation[i] -= alphabet.length;
        }
        result += alphabet.charAt(newLocation[i]);
      }
    }
  }
  else if (type === 'decode') {
    for (let i = 0; i < str.length; i++) {
      // Athugum hvort stafurinn í strengnum sé í alphabet
      if (alphabet.includes(str[i].toLocaleUpperCase())) {
        // Finnum staðsetningu stafanna í stafrófinu, hliðrum þeim um shift til vinstri og geymum í
        // fylki
        newLocation[i] = alphabet.indexOf(str[i].toLocaleUpperCase()) - parseInt(shift, 10);
        while (newLocation[i] < 0) {
          newLocation[i] += alphabet.length;
        }
        result += alphabet.charAt(newLocation[i]);
      }
    }
  }
  return result;
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  // Default output, uppfært af "str"
  let str = '';

  function init() {
    const alphabetInput = document.getElementById('alphabet');
    const slider = document.getElementById('shift');
    const radio = document.getElementsByName('type');
    const stringInput = document.getElementById('input');

    alphabetInput.addEventListener('input', (e) => {
      alphabet = e.target.value;
      document.querySelector('.result').textContent = code(str, shift, alphabet, type);
    });

    radio[0].addEventListener('click', () => {
      type = 'encode';
      document.querySelector('.result').textContent = code(str, shift, alphabet, type);
    });

    radio[1].addEventListener('click', () => {
      type = 'decode';
      document.querySelector('.result').textContent = code(str, shift, alphabet, type);
    });

    slider.addEventListener('input', (e) => {
      shift = e.target.value;
      document.querySelector('.shiftValue').textContent = shift;
      document.querySelector('.result').textContent = code(str, shift, alphabet, type);
    });

    stringInput.addEventListener('input', (e) => {
      str = e.target.value;
      document.querySelector('.result').textContent = code(str, shift, alphabet, type);
    });
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
