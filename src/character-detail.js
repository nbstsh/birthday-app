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
    whiteSpacePre: 'u-white-space-pre',
    memoEditBackground: 'character-detail__memo-edit-bg',
    emptyMemoEl: 'empty-message'
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
    if (memos.length === 0) {
        memoListEl.append(generateEmptyMemoEl())
        return 
    }
    memos.forEach((memo) => {
        memoListEl.append(generateMemoEl(memo))
    })
}

const generateEmptyMemoEl = () => {
    const emptyMessage = 'There is no memo to show. Create new memo!'

    const emptyMemoEl = document.createElement('li')
    emptyMemoEl.textContent = emptyMessage
    emptyMemoEl.classList.add(className.emptyMemoEl)
    return emptyMemoEl
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

const generateMemoEditBackgroundEl  =() => {
    const backgroundEl = document.createElement('span')
    backgroundEl.classList.add(className.memoEditBackground)
    return backgroundEl
}

const renderMemoEditForm = (memoEl) => {
    const id = memoEl.dataset.id
    const text = memoEl.textContent
    const memoListEl = memoEl.parentElement
    memoListEl.innerHTML = ''
    memoListEl.append(generateMemoEditEl(id, text))
    memoListEl.append(generateMemoEditBackgroundEl())
}

// add eventListener to memo lsit item (span tag)
const initMemoItemEvent = (memoEl) => {
    memoEl.addEventListener('click', (e) => {
        renderMemoEditForm(memoEl)
    })
}

// add eventListener to memo edit textarea
const initMemoEditFormEvent = (memoTextareaEl) => {
   memoTextareaEl.addEventListener('keydown', (e) => {
        // "ctrl + enter" are pressed 
        if (e.ctrlKey && e.code === 'Enter' ) {
            closeMemoEditForm(e.target);
        }
    })
}

const initMemoEditFormBackgroundEvent = () => {
    document.querySelector(`.${className.memoEditBackground}`).addEventListener('click', (e) => {
        closeMemoEditForm(e.target.previousSibling)
    })
}

const initMemoFormOpenEvent = (emptyMemoEl) => {
    emptyMemoEl.addEventListener('click', () => {
        openMemoForm()
    })
}

const closeMemoEditForm = (textareaEl) => {
    const characterId = extractCharacterId()
    const id = textareaEl.dataset.id
    const text = textareaEl.value.trim()

    text === '' ? removeMemo(characterId, id) : updateMemo(characterId, { id, text });
    renderMemos()
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
        if (isContained(className.memoListItem)) {
            initMemoItemEvent(node)
        }
        if (isContained(className.memoTextarea)) {
            initMemoEditFormEvent(node)
            initMemoEditFormBackgroundEvent()
        }
    }

    generateObserver(process).observe(memoListEl, { childList: true })
}

// observe changes of memo list 
const startObserveMemoList = () => {
    const process = (mutation) => {
        const listEl = mutation.addedNodes[0]  
        if (!listEl) return 

        // init event listener for empty memo element
        if (listEl.classList.contains(className.emptyMemoEl)) {
            initMemoFormOpenEvent(listEl)
            return 
        }
        // init event listener for memo list-item element
        initMemoItemEvent(listEl.firstChild)
        startObserveMemoListItem(listEl)
    }
    
    const memoListEl = document.querySelector(selector.memoList)
    generateObserver(process).observe(memoListEl, { childList: true })
}


startObserveMemoList()
