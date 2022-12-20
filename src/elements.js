import * as DOMFunctions from './DOMFunctions'

const mainContainer = DOMFunctions.create('div', 'main-container', '', document.body)

export const sidebar = () => {
    const sidebarMenu = (() => {
        const container = DOMFunctions.createTitleContentContainer('sidebar-container', 'sidebar-title', 'Projects', 'sidebar-content', '', mainContainer)
        const newProjectContainer = DOMFunctions.create('div', 'sidebar-project-container', '', container.content)
        const button = DOMFunctions.create('button', 'sidebar-button', '+', container.content)
        button.addEventListener('click', () => {
            popup(newProjectContainer).forEach(element => {
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
            DOMFunctions.create('div', 'sidebar-project', DOMFunctions.truncate(input.value, 12), parent)
            closePopup()
            projectTabs(input.value)
            DOMFunctions.setupTabs('.sidebar-project', '.project-details-container', 'project-tab-active', 'project-content-active')
            input.value = ''
        })
        cancelButton.addEventListener('click', () => {
            closePopup()
        })
        return elementArray
    }
}
const projectTabs = (title) => {
    // The page should contain the option to add tasks to a todo list
    // Each task should be a container and it should have a checkmark box, description, edit, and delete button 
    // Each task that is checkmarked should be moved to a completed drop down menu that can be minimized

    const mainContentContainer = DOMFunctions.createTitleContentContainer('project-details-container', 'project-details-title', title, 'project-details-content', '', mainContainer)
    const taskContainer = DOMFunctions.createTitleContentContainer('todo-container', 'todo-title', 'Todo List', 'task-container', '', mainContentContainer.content)
    const newTaskButton = DOMFunctions.create('button', 'new-task-button', '+', mainContentContainer.content)

    const addNewTask = (description) => {
        const container = DOMFunctions.create('div', 'individual-task-container', '', taskContainer.content)
        const checkmarkBox = DOMFunctions.create('input', 'task-checkbox', '', container)
        checkmarkBox.setAttribute('type', 'checkbox')
        const taskDescription = DOMFunctions.create('div', 'task-description', description, container)
        const editButton = DOMFunctions.create('button', 'task-edit-button', 'Edit', container)
        const deleteButton = DOMFunctions.create('button', 'task-delete-button', 'Delete', container)
        deleteButton.addEventListener('click', () => {
            const array = [
                container,
                checkmarkBox,
                taskDescription,
                editButton,
                deleteButton
            ]
            array.forEach(element => {
                element.remove()
            })
        })
    }
    const taskPopup = (className, placeholderDescription) => {
        const container = DOMFunctions.create('div', className + '-container', '', mainContainer)
        const window = DOMFunctions.create('div', className + '-window', '', container)
        const input = DOMFunctions.create('input', className + '-input', '', window)
        const setButton = DOMFunctions.create('button', className + '-set-button', 'Set', window)
        const cancelButton = DOMFunctions.create('button', className + '-cancel-button', 'Cancel', window)
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
        input.setAttribute('placeholder', placeholderDescription)
        setButton.addEventListener('click', () => {
            addNewTask(input.value)
            closePopup()
            input.value = ''
        })
        cancelButton.addEventListener('click', () => {
            closePopup()
        })
        return elementArray
    }
    newTaskButton.addEventListener('click', () => {
        taskPopup('popup', 'Task Description').forEach(element => {
            element.classList.add('active')
        })
    })
}
// Title of the project on top
// Project to do items in the middle