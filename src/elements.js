// This file is only used for populating the DOM with elements
import * as DOMFunctions from './DOMFunctions'

const mainContainer = DOMFunctions.create('div', 'main-container', '', document.body)

export const sidebar = () => {
    const sidebarMenu = (() => {
        const container = DOMFunctions.createTitleContentContainer('sidebar-container', 'sidebar-title', 'Projects', 'sidebar-content', '', mainContainer)
        const button = DOMFunctions.create('button', 'sidebar-button', '+ New Project', container.content)
        button.addEventListener('click', () => {
            popup(container.content).forEach(element => {
                element.classList.add('active')
            })
        })
    })()
    const popup = (parent) => {
        const container = DOMFunctions.create('div', 'popup-container', '', mainContainer)
        const window = DOMFunctions.create('div', 'popup-window', '', container)
        const input = DOMFunctions.create('input', 'popup-input', '', window)
        const setButton = DOMFunctions.create('button', 'popup-set-button', 'Set', window)
        const cancelButton = DOMFunctions.create('button', 'popup-cancel-button', 'Cancel', window)
        const elementArray = [
            container,
            window,
            input,
            setButton,
            cancelButton
        ]
        const closePopup = () => {
            elementArray.forEach(element => {
                element.classList.remove('active')
            })
        }
        input.setAttribute('placeholder', 'Project Name')
        setButton.addEventListener('click', () => {
            DOMFunctions.create('div', 'sidebar-project', input.value, parent)
            input.value = ''
            closePopup()
        })
        cancelButton.addEventListener('click', () => {
            closePopup()
        })
        return elementArray
    }
}

// Right side contains more details on project
// Title of the project on top
// Project to do items in the middle