import { getCharacters, removeCharacter } from './character';
import { toJapaneseCalender } from './utilities/convert';
import { initializeIndexPage } from  './view'

const selector = {
    modal: '#detail-modal',
    name: '#character-detail-name',
    birthday: '#character-detail-birthday',
    deleteButton: '#character-delete',
    deleteConfirmationModal: '#delete-confirm-modal',
    cancelButton: '#delete-confirm-no',
    confirmButton: '#delete-confirm-yes',
    memoFormOpenButton: '#memo-form-open',
    memoFormCloseButton: '#memo-form-close',
    memoForm: '#memo-form-box'
}


const openDetailModal = (id) => {
    const detailModal = document.querySelector(selector.modal)
    detailModal.dataset.status = 'open'
    detailModal.dataset.id = id;
}

const closeDettailModal = () => {
    document.querySelector(selector.modal).dataset.status = 'close'
}

const openDeleteConfirmationModal = () => {
    document.querySelector(selector.deleteConfirmationModal).dataset.status = 'open'
}

const closeDeleteConfirmationModal = () => {
    document.querySelector(selector.deleteConfirmationModal).dataset.status = 'close'
}

const initCharacter = (id) => {
    const character = getCharacters().find((character) => character.id === id)
    document.querySelector(selector.name).textContent = character.name
    document.querySelector(selector.birthday).textContent = toJapaneseCalender(character.birthday)
}

const extractId = () => {
    return document.querySelector(selector.modal).dataset.id
}

const openMemoForm = () => {
    document.querySelector(selector.memoForm).dataset.status = 'open'
}

const closeMemoForm = () => {
    document.querySelector(selector.memoForm).dataset.status = 'close'
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

// delete button clicked
document.querySelector(selector.deleteButton).addEventListener('click', (e) => {
    openDeleteConfirmationModal()
})

// close delete confirmation modal
document.querySelector(selector.cancelButton).addEventListener('click', (e) => {
    closeDeleteConfirmationModal()
})

document.querySelector(selector.confirmButton).addEventListener('click', (e) => {
    const id = extractId()
    removeCharacter(id)
    closeDeleteConfirmationModal()
    closeDettailModal()
    initializeIndexPage()
})

// open create-memo form
document.querySelector(selector.memoFormOpenButton).addEventListener('click', (e) => {
    openMemoForm()
})

document.querySelector(selector.memoFormCloseButton).addEventListener('click', (e) => {
    closeMemoForm()
})