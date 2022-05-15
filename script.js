const input = document.querySelector('.wiki__input');
const form = document.querySelector('.wiki__form');
const t = document.querySelector('.result').content;
const list = document.querySelector('.wiki__list');
const spinner = document.querySelector('.loader');

function createItem(title,snippet) {
    const item = t.querySelector('.wiki__item').cloneNode(true);item.querySelector('.wiki__link').href = `https://ru.wikipedia.org/wiki/${title}`;
    item.querySelector('.wiki__item-title').textContent = title;
    item.querySelector('.wiki__item-subtitle').textContent = `https://ru.wikipedia.org/wiki/${title}`;
    item.querySelector('.wiki__item-descr').innerHTML = snippet;
    return list.append(item)
}

function getDataForm(e) {
    e.preventDefault();
    list.innerHTML = '';
    spinner.classList.add('loader_active');
    fetch(`https://ru.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${input.value}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            spinner.classList.remove('loader_active');
            const arr = data.query.search
            if(arr.length > 0) {
                arr.forEach(function(i){
                    createItem(i.title,i.snippet)
                });
            } else {
                list.textContent = 'Ничего не найдено:(';
            }
        })
}
form.addEventListener('submit',getDataForm);
