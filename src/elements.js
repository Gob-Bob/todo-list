import * as DOMFunctions from './DOMFunctions'
import editImg from './pencil.png'
import deleteImg from './trash.png'

const mainContainer = DOMFunctions.create('div', 'main-container', '', document.body)

export const sidebar = () => {
    const container = DOMFunctions.createTitleContentContainer('sidebar-container', 'sidebar-title', 'Projects', 'sidebar-content', '', mainContainer)
    const newProjectContainer = DOMFunctions.create('div', 'sidebar-project-container', '', container.content)
    const newProjectButton = DOMFunctions.create('button', 'sidebar-new-project-button', '+', container.content)
    const customProjectArray = JSON.parse(localStorage.getItem('customProjects')) || []
    customProjectArray.forEach(element => {
        DOMFunctions.create('div', 'sidebar-project', DOMFunctions.truncate(element, 12), newProjectContainer)
        projectTabs(element, customProjectArray)
        DOMFunctions.setupTabs('.sidebar-project', '.project-details-container', 'project-tab-active', 'project-content-active')
    })
    const nameCustomProject = (input) => {
        projectTabs(input, customProjectArray)
        customProjectArray.push(input)
        localStorage.setItem('customProjects', JSON.stringify(customProjectArray))
        DOMFunctions.create('div', 'sidebar-project', DOMFunctions.truncate(input, 12), newProjectContainer)
        DOMFunctions.setupTabs('.sidebar-project', '.project-details-container', 'project-tab-active', 'project-content-active')
    }
    DOMFunctions.activatePopup(newProjectButton, 'popup', 'Project Name', nameCustomProject, mainContainer)
}
const projectTabs = (title, array) => {
    const mainContentContainer = DOMFunctions.createTitleContentContainer('project-details-container', 'project-details-header', '', 'project-details-content', '', mainContainer)
    const projectTitle = DOMFunctions.create('div', 'project-details-title', title, mainContentContainer.firstElement)
    const editProjectNameButton = DOMFunctions.img(editImg, 'edit-project-name-button', mainContentContainer.firstElement)
    const deleteProjectButton = DOMFunctions.img(deleteImg, 'delete-project-name-button', mainContentContainer.firstElement)
    const taskContainer = DOMFunctions.createTitleContentContainer('todo-container', 'todo-title', 'Todo List', 'task-container', '', mainContentContainer.content)
    const header = DOMFunctions.create('div', 'task-category-container', '', taskContainer.content)
    const priority = DOMFunctions.create('div', 'task-category-priority', 'Priority', header)
    const description = DOMFunctions.create('div', 'task-category-description', 'Description', header)
    const dueDate = DOMFunctions.create('div', 'task-category-dueDate', 'Due Date', header)
    const newTaskButton = DOMFunctions.create('button', 'new-task-button', '+', mainContentContainer.content)
    const newProjectName = (newName) => {
        projectTitle.innerHTML = newName
        const activeProjectTab = document.querySelector('.project-tab-active')
        activeProjectTab.innerHTML = DOMFunctions.truncate(newName, 12)
        DOMFunctions.renameCustomProject(title, newName, array)
    }
    deleteProjectButton.addEventListener('click', () => {
        DOMFunctions.deletePropertiesOfObject(mainContentContainer)
        const activeProjectTab = document.querySelector('.project-tab-active')
        activeProjectTab.remove()
        DOMFunctions.deleteCustomProject(title, array)
    })
    DOMFunctions.activatePopup(editProjectNameButton, 'popup', 'New Project Name', newProjectName, mainContainer)

    const addNewTask = (description) => {
        const container = DOMFunctions.create('div', 'individual-task-container', '', taskContainer.content)
        const checkmarkBox = DOMFunctions.create('input', 'task-checkbox', '', container)
        checkmarkBox.setAttribute('type', 'checkbox')
        const priorityContainer = DOMFunctions.create('select', 'priority-container', '', container)
        priorityContainer.setAttribute('name', 'Priority')
        DOMFunctions.createPriorityValues(priorityContainer)
        const taskDescription = DOMFunctions.create('div', 'task-description', description, container)
        const datePicker = DOMFunctions.create('input', 'task-date', '', container)
        datePicker.setAttribute('type', 'date')
        datePicker.setAttribute('placeholder', 'Custom Due Date')
        const editButton = DOMFunctions.create('button', 'task-edit-button', 'Edit', container)
        const deleteButton = DOMFunctions.create('button', 'task-delete-button', 'Delete', container)
        const elementArray = [
            container,
            checkmarkBox,
            taskDescription,
            editButton,
            deleteButton
        ]
        deleteButton.addEventListener('click', () => {
            DOMFunctions.deleteElements(elementArray)
        })
        const editTaskDescription = (newDescription) => {
            taskDescription.innerHTML = newDescription
        }
        DOMFunctions.activatePopup(editButton, 'popup', 'New Task Description', editTaskDescription, mainContainer)
    }
    DOMFunctions.activatePopup(newTaskButton, 'popup', 'Task Description', addNewTask, mainContainer)
}