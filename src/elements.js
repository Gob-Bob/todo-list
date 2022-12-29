import * as DOMFunctions from './DOMFunctions'
import editImg from './pencil.png'
import deleteImg from './trash.png'

const mainContainer = DOMFunctions.create('div', 'main-container', '', document.body)

export const sidebar = () => {
    const container = DOMFunctions.createTitleContentContainer('sidebar-container', 'sidebar-title', 'Projects', 'sidebar-content', '', mainContainer)
    const newProjectContainer = DOMFunctions.create('div', 'sidebar-project-container', '', container.content)
    const newProjectButton = DOMFunctions.create('button', 'sidebar-new-project-button', '+', container.content)
    const nameCustomProject = (input) => {
        DOMFunctions.create('div', 'sidebar-project', DOMFunctions.truncate(input, 12), newProjectContainer)
        projectTabs(input)
        DOMFunctions.setupTabs('.sidebar-project', '.project-details-container', 'project-tab-active', 'project-content-active')
    }
    DOMFunctions.activatePopup(newProjectButton, 'popup', 'Project Name', nameCustomProject, mainContainer)
}
const projectTabs = (title) => {
    // The page should contain the option to add tasks to a todo list
    // Each task should be a container and it should have a checkmark box, description, edit, and delete button 
    // Each task that is checkmarked should be moved to a completed drop down menu that can be minimized

    const mainContentContainer = DOMFunctions.createTitleContentContainer('project-details-container', 'project-details-header', '', 'project-details-content', '', mainContainer)
    const projectTitle = DOMFunctions.create('div', 'project-details-title', title, mainContentContainer.firstElement)
    const editProjectNameButton = DOMFunctions.img(editImg, 'edit-project-name-button', mainContentContainer.firstElement)
    const deleteProjectButton = DOMFunctions.img(deleteImg, 'delete-project-name-button', mainContentContainer.firstElement)
    const taskContainer = DOMFunctions.createTitleContentContainer('todo-container', 'todo-title', 'Todo List', 'task-container', '', mainContentContainer.content)
    const newTaskButton = DOMFunctions.create('button', 'new-task-button', '+', mainContentContainer.content)
    const elementArray = [
        // mainContentContainer,
        projectTitle,
        editProjectNameButton,
        deleteProjectButton,
        // taskContainer,
        newTaskButton
    ]
    const newProjectName = (newName) => {
        projectTitle.innerHTML = newName
        const activeProjectTab = document.querySelector('.project-tab-active')
        activeProjectTab.innerHTML = DOMFunctions.truncate(newName, 12)
    }
    deleteProjectButton.addEventListener('click', () => {
        // DOMFunctions.deleteElements(elementArray)
        DOMFunctions.deletePropertiesOfObject(mainContentContainer)
        const sidebarProject = document.querySelector('.sidebar-project')
        sidebarProject.remove()
    })
    DOMFunctions.activatePopup(editProjectNameButton, 'popup', 'New Project Name', newProjectName, mainContainer)

    const addNewTask = (description) => {
        const container = DOMFunctions.create('div', 'individual-task-container', '', taskContainer.content)
        const checkmarkBox = DOMFunctions.create('input', 'task-checkbox', '', container)
        checkmarkBox.setAttribute('type', 'checkbox')
        const taskDescription = DOMFunctions.create('div', 'task-description', description, container)
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
// Title of the project on top
// Project to do items in the middle