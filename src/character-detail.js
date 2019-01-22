import { getCharacters, removeCharacter } from './character';
import { toJapaneseCalender } from './utilities/convert';
import { initializeIndexPage } from  './view'
import { updateMemo, createMemo , findMemos, removeMemo} from './memos';

const selector = {
    modal: '#detail-modal',
    background: '#character-detail-background',
    name: '#character-detail-name',
    birthday: '#character-detail-birthday',
    deleteButton: '#character-delete',
    deleteConfirmationModal: '#delete-confirm-modal',
    cancelButton: '#delete-confirm-no',
    confirmButton: '#delete-confirm-yes',
    memoFormOpenButton: '#memo-form-open',
    memoFormCloseButton: '#memo-form-close',
    memoForm: '#memo-form-box',
    createMemoButton: '#memo-create',
    memoTextarea: '#memo-textarea',
    memoList: '#memo-list',
    memoEdit: '#memo-edit',
}

const className = {
    displayNameItem: 'display__name-item',
    memoTextarea: 'character-detail__textarea',
    memoListItem: 'character-detail__memo-item',
    whiteSpacePre: 'u-white-space-pre'
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

const extractCharacterId = () => {
    return document.querySelector(selector.modal).dataset.id
}

const openMemoForm = () => {
    document.querySelector(selector.memoForm).dataset.status = 'open'
}

const closeMemoForm = () => {
    document.querySelector(selector.memoForm).dataset.status = 'close'
    document.querySelector(selector.memoTextarea).value = ''
}

const renderMemos = () => {
    const memos = findMemos(extractCharacterId())
    const memoListEl = document.querySelector(selector.memoList)
    memoListEl.innerHTML = ''
    memos.forEach((memo) => {
        memoListEl.append(generateMemoEl(memo))
    })
}

const generateMemoEl = ({id, text}) => {
    const memoListEl = document.createElement('li')

    const memoEl = document.createElement('span')
    memoEl.textContent = text
    memoEl.dataset.id = id
    memoEl.classList.add(className.memoListItem, className.whiteSpacePre)

    memoListEl.append(memoEl)
    return memoListEl
}

const generateMemoEditEl = (memoId, text) => {
    const textareaEl = document.createElement('textarea')
    textareaEl.dataset.id = memoId
    textareaEl.textContent = text
    textareaEl.classList.add(className.memoTextarea)
    return textareaEl
}

const renderMemoEditForm = (memoEl) => {
    const id = memoEl.dataset.id
    const text = memoEl.textContent
    const memoListEl = memoEl.parentElement
    memoListEl.innerHTML = ''
    memoListEl.append(generateMemoEditEl(id, text))
}

// add eventListener to memo lsit item (span tag)
const initMemoItemEvent = (memoEl) => {
    memoEl.addEventListener('click', (e) => {
        renderMemoEditForm(memoEl)
    })
}

// add eventListener to memo edit textarea
const initMemoTextareaEvent = (memoTextareaEl) => {
   memoTextareaEl.addEventListener('keydown', (e) => {
        // "ctrl + enter" are pressed 
        if (e.ctrlKey && e.code === 'Enter' ) {
            const characterId = extractCharacterId()
            const id = e.target.dataset.id
            const text = e.target.value.trim()

            console.log(text)

            text === '' ? removeMemo(characterId, id) : updateMemo(characterId, { id, text });
            renderMemos()
        }
    })
}

// close memo-form when character-detail modal is closed
document.querySelector(selector.background).addEventListener('click', (e) => {
    closeMemoForm()
})

// open/init character detail modal
document.addEventListener('click', (e) => {
    if (e.target.classList.contains(className.displayNameItem)) {

        // open character detail modal
        const id = e.target.dataset.characterId
        openDetailModal(id)
        initCharacter(id)
        renderMemos()
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

// remove character
document.querySelector(selector.confirmButton).addEventListener('click', (e) => {
    const id = extractCharacterId()
    removeCharacter(id)
    closeDeleteConfirmationModal()
    closeDettailModal()
    initializeIndexPage()
})

// open create-memo form
document.querySelector(selector.memoFormOpenButton).addEventListener('click', (e) => {
    openMemoForm()
})

// close create-memo form
document.querySelector(selector.memoFormCloseButton).addEventListener('click', (e) => {
    closeMemoForm()
})

// create new memo
document.querySelector(selector.createMemoButton).addEventListener('click', (e) => {
    const id = extractCharacterId()
    const textarea =  document.querySelector(selector.memoTextarea)
    const text = textarea.value
    if (!text) return

    createMemo(id, text)
    textarea.value = ''

    renderMemos()
})


const generateObserver = (callback) => new MutationObserver((mutations) => {
    mutations.forEach((mutation) => { callback(mutation) })
})

// observe chagnes of memo list item
const startObserveMemoListItem = (memoListEl) => {
    const process = (mutation) => {
        const node = mutation.addedNodes[0]
        if (!node) return 

        const isContained = (className) => node.classList.contains(className)
        if (isContained(className.memoListItem)) initMemoItemEvent(node)
        if (isContained(className.memoTextarea)) initMemoTextareaEvent(node)
    }

    generateObserver(process).observe(memoListEl, { childList: true })
}

// observe changes of memo list 
const startObserveMemoList = () => {
    const process = (mutation) => {
        const listEl = mutation.addedNodes[0]  
        if (!listEl) return 

        initMemoItemEvent(listEl.firstChild)
        startObserveMemoListItem(listEl)
    }

    generateObserver(process).observe(document.querySelector(selector.memoList), { childList: true })
}

startObserveMemoList()
