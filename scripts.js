/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet) {
  let newLocation = new Array();
  let result = '';
  for (let i = 0; i < str.length; i++) {
    newLocation[i] = alphabet.indexOf(str[i].toLocaleUpperCase()) + n; //finnum staðsetningu stafanna í stafrófinu, 
                                                                       //hliðrum þeim um n til hægri og geymum í fylki
    if (newLocation[i] > 31) {
      newLocation[i] -= 32; 
    }
    result += alphabet.charAt(newLocation[i]);
  }
  return result;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet) {
  let newLocation = new Array();
  let result = '';
  for (let i = 0; i < str.length; i++) {
    newLocation[i] = alphabet.indexOf(str[i].toLocaleUpperCase()) - n; //finnum staðsetningu stafanna í stafrófinu, 
                                                                       //hliðrum þeim um n til vinstri og geymum í fylki
    if (newLocation[i] < 0) {
      newLocation[i] += 32; 
    }
    result += alphabet.charAt(newLocation[i]);
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

  function init(e) {
    const alphabetInput = document.getElementById('alphabet');
    const slider = document.getElementById('shift');
    const radio = document.getElementsByName('type');
    const stringInput = document.getElementById('input');

    alphabetInput.addEventListener('input', (e) => {
      alphabet = e.target.value;
    })

    radio[0].addEventListener('click', (e) => {
      type = 'encode';
    })

    radio[1].addEventListener('click', (e) => {
      type = 'decode';
    })

    slider.addEventListener('input', (e) => {
      shift = e.target.value;
      document.querySelector('.shiftValue').textContent = shift;
    })

    stringInput.addEventListener('input', (e) => {
      document.querySelector('.result').textContent = e.target.value;
    })
    
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});

