import { getCharacters } from "./character";
import { toJapaneseCalender } from "./utilities/convert";

const selector = {
    modal: '#detail-modal',
    name: '#character-detail-name',
    birthday: '#character-detail-birthday',
}

const openDetailModal = (id) => {
    const detailModal = document.querySelector(selector.modal)
    detailModal.dataset.status = 'open'
    detailModal.dataset.id = id;
}

const initCharacter = (id) => {
    const character = getCharacters().find((character) => character.id === id)
    document.querySelector(selector.name).textContent = character.name
    document.querySelector(selector.birthday).textContent = toJapaneseCalender(character.birthday)
}


// open/init character detail modal
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('display__name-item')) {

        // open character detail modal
        const id = e.target.dataset.characterId
        openDetailModal(id)
        initCharacter(id)
    }
})
