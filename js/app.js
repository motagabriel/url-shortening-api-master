const input = document.querySelector('.input-shorter input');
const buttonShorter = document.querySelector('.input-shorter button');


buttonShorter.addEventListener('click', (e) => {
    e.preventDefault();
    
    apiShorter(input.value);

});

async function apiShorter(url) {
    try {
        const shorterResponse = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const shorterJSON = await shorterResponse.json();
        const link = shorterJSON.result.original_link;
        const shortLink = shorterJSON.result.full_short_link;
        createList(link, shortLink);
        input.value = '';
        input.focus();
    }
    catch(e) {
        if(!url) msgError();
    }  
}


function createList(link, shortLink) {
    const inputResponse = document.querySelector('.input-response');
    const ul = document.createElement('ul');
    ul.classList.add('d-flex', 'links');

    // first link original
    const listLink = document.createElement('li');
    listLink.innerHTML = link;

    // link shorter
    const divLinkButton = document.createElement('div');
    divLinkButton.classList.add('d-flex', 'link-button-shorter');
    const listShortLink = document.createElement('li');
    listShortLink.classList.add('shortLink-li')
    listShortLink.innerHTML = shortLink;

    const button = document.createElement('button');
    button.innerText = 'Copy';
    button.classList.add('button-custom', 'button-custom-copy');

    button.addEventListener('click', () => {
        navigator.clipboard.writeText(listShortLink.innerText);
    })

    divLinkButton.appendChild(listShortLink);
    divLinkButton.appendChild(button);

    // Adding a list
    inputResponse.appendChild(ul);
    ul.appendChild(listLink);
    ul.appendChild(divLinkButton);
}

function msgError() {
    const div = document.querySelector('#div-input-short');
    input.classList.add('erro')
    const error = document.createElement('p');
    error.innerHTML = 'Please add a link'
    error.classList.add('erro-text');
    div.appendChild(error);

    setTimeout(() => {
        input.classList.remove('erro')
        error.remove();
        console.clear();
    },5000)
    
}

function clearAll() {
    input.value = '';
    input.focus();
}
