// DOM элементы

const inputEl = document.getElementById('input')
const infoTextEl = document.getElementById('info-text')
const meaningContainerEl = document.getElementById('meaning-container')
const titleEl = document.getElementById('title')
const meaningEl = document.getElementById('meaning')
const audioEl = document.getElementById('audio')




// Функция для работы с API
async function fetchAPI (word) {
    try {
        // То, что мы видим до ввода слова
        infoTextEl.style.display = 'block'
        meaningContainerEl.style.display = 'none'
        
        // То, что мы видим пока ожидаем получения результата
        infoTextEl.innerText = `Searching a meaning of '${word}'`
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(url).then((res) => res.json())

        // То, что мы видим, когда результат получен
        if (result.title) {
            meaningContainerEl.style.display = 'block'
            infoTextEl.style.display = 'none'
            titleEl.innerText = word
            meaningEl.innerText = 'N/A'
            audioEl.style.display = 'none'
        } else {
            infoTextEl.style.display = 'none'
            meaningContainerEl.style.display = 'block'
            audioEl.style.display = 'inline-block'
            titleEl.innerText = result[0].word
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition
            audioEl.src = result[0].phonetics[0].audio; 
        }

    } catch (error) {
        console.log(error);
        infoTextEl.innerText = `An error happened. Try again later`
    }
}

// Вызываем функцию путем ввода слова в инпут и нажатия Enter
inputEl.addEventListener('keyup', (e) => {
    if (e.target.value && e.key === 'Enter') {
        fetchAPI(e.target.value)
    }
})