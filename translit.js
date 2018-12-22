let isEnable = false;
const alphabetMap = {a:"а",b:"б",v:"в",g:"г",d:"д",e:"е",jo:"ё",zh:"ж",z:"з",i:"и",
j:"й",k:"к",l:"л",m:"м",n:"н",o:"о",p:"п",r:"р",s:"с",t:"т",u:"у",f:"ф",h:"х",
c:"ц",ch:"ч",sh:"ш",shh:"щ","#":"ъ",y:"ы","'":"ь",je:"э",ju:"ю",ja:"я",
A:"А",B:"Б",V:"В",G:"Г",D:"Д",E:"Е",Jo:"Ё",Zh:"Ж",Z:"З",I:"И",J:"Й",K:"К",L:"Л",
M:"М",N:"Н",O:"О",P:"П",R:"Р",S:"С",T:"Т",U:"У",F:"Ф",H:"Х",C:"Ц",Ch:"Ч",Sh:"Ш",
Shh:"Щ","##":"Ъ",Y:"Ы","''":"Ь",Je:"Э",Ju:"Ю",Ja:"Я"};

const combinations={"йо":"ё","зх":"ж","цх":"ч","сх":"ш","шх":"щ","йе":"э","йу":"ю",
"йа":"я","Йо":"Ё","Зх":"Ж","Цх":"Ч","Сх":"Ш","Шх":"Щ","Йе":"Э","Йу":"Ю",
"Йа":"Я","ъъ":"Ъ","ьь":"Ь"};

function startTranslit() {
    listenToEnableKey();
};

function enableListener(event) {
    const key = event.key;
    let element = event.srcElement;
    const isStartKey = event.keyCode === 113;
    const isSelectAll = (event.keyCode === 65 && event.ctrlKey === true);
    const isShift = event.shiftKey;

    if (isShift && isStartKey) {
        isEnable = !isEnable;

        if (isEnable) {
            console.log('Translit enabled');
        } else {
            console.log('Translit disabled');
        }
        return;
    }

    if (!isEnable || !alphabetMap[key] || isSelectAll) {
        return;
    }

    if (isInInputField(element)) {
        translitInputText(key, element);
    }

    if (isDiv(element)) {
        translitDiv(key, element);
    }
}

function isInInputField(element) {
    return element.type == 'text' || element.type == 'textarea';
}

function isDiv(element) {
    return element.tagName === 'DIV';
}

function translitInputText(char, element) {
    const inputValue = element.value;
    const translitedString = element.value.slice(0, element.value.length - 1);

    element.value = translitedString + alphabetMap[char];
    
    const combinedResult = getIfCombined(element.value);
    if (combinedResult) {
        element.value = element.value.slice(0, element.value.length - 2) + combinedResult;
    }
}

function translitDiv(char, element) {
    const length = element.innerText.length;
    element.innerText = element.innerText.slice(0, length - 1) + alphabetMap[char];

    const combinedResult = getIfCombined(element.innerText);
    if (combinedResult) {
        element.innerText = element.innerText.slice(0, element.innerText.length - 2) + combinedResult;
    }
    moveCaret(element);
}

function moveCaret(element) {
    const length = element.innerText.length;
    let sel = window.getSelection();
    let range = document.createRange();
    range.setStart(element.childNodes[0], length);
    sel.removeAllRanges();
    sel.addRange(range);
}

function getIfCombined(translit) {
    if (translit.length < 2) {
        return;
    }
    if (translit.length === 2) {
        return combinations[translit];
    }
    const potentialCombinations = translit.slice(translit.length - 2, translit.length);

    return combinations[potentialCombinations];
}

function listenToEnableKey() {
    document.addEventListener("keyup", enableListener);
};


startTranslit();