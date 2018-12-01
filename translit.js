document.body.style.border = "5px solid red"

var isEnable = false;
var alphabetMap = {
    'a': 'а',
    'b': 'б',
    'v': 'в',
    'g': 'г',
    'd': 'д',
    'e': 'е',
    'jo': 'ё',
    'zh': 'ж',
    'z': 'з',
    'i': 'и',
    'j': 'й',
    'k': 'к',
    'l': 'л',
    'm': 'м',
    'n': 'н',
    'o': 'о',
    'p': 'п',
    'r': 'р',
    's': 'с',
    't': 'т',
    'u': 'у',
    'f': 'ф',
    'h': 'х',
    'c': 'ц',
    'ch': 'ч',
    'sh': 'ш',
    'shh': 'щ',
    '#': 'ъ',
    'y': 'ы',
    '\'': 'ь',
    'je': 'э',
    'ju': 'ю',
    'ja': 'я',
    'A': 'А',
    'B': 'Б',
    'V': 'В',
    'G': 'Г',
    'D': 'Д',
    'E': 'Е',
    'Jo': 'Ё',
    'Zh': 'Ж',
    'Z': 'З',
    'I': 'И',
    'J': 'Й',
    'K': 'К',
    'L': 'Л',
    'M': 'М',
    'N': 'Н',
    'O': 'О',
    'P': 'П',
    'R': 'Р',
    'S': 'С',
    'T': 'Т',
    'U': 'У',
    'F': 'Ф',
    'H': 'Х',
    'C': 'Ц',
    'Ch': 'Ч',
    'Sh': 'Ш',
    'Shh': 'Щ',
    '##': 'Ъ',
    'Y': 'Ы',
    '\'\'': 'Ь',
    'Je': 'Э',
    'Ju': 'Ю',
    'Ja': 'Я',
}

function startTranslit() {
    listenToEnableKey();
};

function enableListener(event) {
    var key = event.key;
    var element = event.srcElement;
    var isKey = event.keyCode === 113;
    var isShift = event.shiftKey;

    if (isShift && isKey) {
        isEnable = !isEnable;
        isEnable ? 
            document.body.style.border = "5px solid green" : 
                document.body.style.border = "5px solid red";
    }

    if (!isEnable) {
        return;
    }

    if (isInInputField(element)) {
        translitChar(key, element);
    }
}

// function isLatinChar(char) {
//     return char.match(/[a-zA-Z]+/g);
// }

function isInInputField(element) {
    return element instanceof HTMLInputElement && element.type == 'text';
}

function translitChar(char, element) {
    var inputValue = element.value;

    if (!alphabetMap[char]) {
        return;
    }

    element.value = element.value.slice(0, element.value.length - 1) + alphabetMap[char];
}

function listenToEnableKey() {
    document.addEventListener("keyup", enableListener);
};

startTranslit();