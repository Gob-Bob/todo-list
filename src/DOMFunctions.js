export const create = (type, className, innerText, parent) => {
    const element = document.createElement(type)
    element.classList.add(className)
    element.innerHTML = innerText
    parent.appendChild(element)
    return element
}
export const createTitleContentContainer = (containerClassName, titleClassName, titleName, contentClassName, contentName, parent) => {
    const container = create('div', containerClassName, '', parent)
    const firstElement = create('div', titleClassName, titleName, container)
    const content = create('div', contentClassName, contentName, container)
    return {container, firstElement, content}
}
export const setupTabs = (tabClass, contentClass, tabActiveClass, contentActiveClass) => {
    const allTabs = document.querySelectorAll(tabClass)
    const allTabContent = document.querySelectorAll(contentClass)
    
    allTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            allTabContent.forEach(content => {
                content.classList.remove(contentActiveClass)
            })
            allTabs.forEach(tab => {
                tab.classList.remove(tabActiveClass)
            })
            allTabs[index].classList.add(tabActiveClass)
            allTabContent[index].classList.add(contentActiveClass)
        })
    })
}
export const truncate = (string, stringLengthLimit) => {
    if (string.length > stringLengthLimit) {
        return string.substring(0, stringLengthLimit) + '...'
    } else {
        return string
    }
}
export const img = (source, className, parent) => {
    const element = document.createElement('img')
    element.classList.add(className)
    element.src = source
    parent.appendChild(element)
    return element
}
export const deleteElements = array => {
    array.forEach(item => {
        item.remove()
    })
}
export const deletePropertiesOfObject = inputObject => {
    for (const [key, value] of Object.entries(inputObject)) {
        value.remove()
    }
}
const createPopup = (className, placeholderDescription, runCustomFunction, parent) => {
    const container = create('div', className + '-container', '', parent)
    const window = create('div', className + '-window', '', container)
    const input = create('input', className + '-input', '', window)
    const setButton = create('button', className + '-set-button', 'Set', window)
    const cancelButton = create('button', className + '-cancel-button', 'Cancel', window)
    const elementArray = [
        container,
        window,
        input,
        setButton,
        cancelButton
    ]
    cancelButton.addEventListener('click', () => {
        deleteElements(elementArray)
    })
    input.setAttribute('placeholder', placeholderDescription)
    setButton.addEventListener('click', () => {
        runCustomFunction(input.value)
        deleteElements(elementArray)
    })
    return elementArray
}
export const activatePopup = (button, className, placeholderDescription, runCustomFunction, parent) => {
    button.addEventListener('click', () => {
        const array = createPopup(className, placeholderDescription, runCustomFunction, parent)
        array.forEach(element => {
            element.classList.add('active')
        })
    })
}
export const createPriorityValues = (parent) => {
    const array = [
        'None',
        'High',
        'Medium',
        'Low'
    ]
    array.forEach(priorityLevel => {
        const element = create('option', 'priority-option', priorityLevel, parent)
        element.setAttribute('value', priorityLevel.toLowerCase())
    })
}
export const deleteCustomProject = (name, array) => {
    const index = array.indexOf(name)
    array.splice(index, 1)
    localStorage.setItem('customProjects', JSON.stringify(array))
}
export const renameCustomProject = (oldName, newName, array) => {
    const index = array.indexOf(oldName)
    array[index] = newName
    localStorage.setItem('customProjects', JSON.stringify(array))
}
export const addProject = (name, projectArray) => {
    projectArray.push({
        name
    })
    localStorage.setItem('projects', JSON.stringify(projectArray))
    return ({ name })
}
export const createProject = (object, parent) => {
    create('div', 'sidebar-project', truncate(object.name, 12), parent)
}
export const createProjectTab = (title, editImg, deleteImg) => {
    const mainContentContainer = createTitleContentContainer('project-details-container', 'project-details-header', '', 'project-details-content', '', mainContainer)
    const projectTitle = create('div', 'project-details-title', title, mainContentContainer.firstElement)
    const editProjectNameButton = img(editImg, 'edit-project-name-button', mainContentContainer.firstElement)
    const deleteProjectButton = img(deleteImg, 'delete-project-name-button', mainContentContainer.firstElement)
    const taskContainer = createTitleContentContainer('todo-container', 'todo-title', 'Todo List', 'task-container', '', mainContentContainer.content)
    const header = create('div', 'task-category-container', '', taskContainer.content)
    const priority = create('div', 'task-category-priority', 'Priority', header)
    const description = create('div', 'task-category-description', 'Description', header)
    const dueDate = create('div', 'task-category-dueDate', 'Due Date', header)
    const newTaskButton = create('button', 'new-task-button', '+', mainContentContainer.content)
    const newProjectName = (newName) => {
        projectTitle.innerHTML = newName
        const activeProjectTab = document.querySelector('.project-tab-active')
        activeProjectTab.innerHTML = truncate(newName, 12)
        renameCustomProject(title, newName, array)
    }
    deleteProjectButton.addEventListener('click', () => {
        deletePropertiesOfObject(mainContentContainer)
        const activeProjectTab = document.querySelector('.project-tab-active')
        activeProjectTab.remove()
        deleteCustomProject(title, array)
    })
    activatePopup(editProjectNameButton, 'popup', 'New Project Name', newProjectName, mainContainer)

    const addNewTask = (description) => {
        const container = create('div', 'individual-task-container', '', taskContainer.content)
        const checkmarkBox = create('input', 'task-checkbox', '', container)
        checkmarkBox.setAttribute('type', 'checkbox')
        const priorityContainer = create('select', 'priority-container', '', container)
        priorityContainer.setAttribute('name', 'Priority')
        createPriorityValues(priorityContainer)
        const taskDescription = create('div', 'task-description', description, container)
        const datePicker = create('input', 'task-date', '', container)
        datePicker.setAttribute('type', 'date')
        datePicker.setAttribute('placeholder', 'Custom Due Date')
        const editButton = create('button', 'task-edit-button', 'Edit', container)
        const deleteButton = create('button', 'task-delete-button', 'Delete', container)
        const elementArray = [
            container,
            checkmarkBox,
            taskDescription,
            editButton,
            deleteButton
        ]
        deleteButton.addEventListener('click', () => {
            deleteElements(elementArray)
        })
        const editTaskDescription = (newDescription) => {
            taskDescription.innerHTML = newDescription
        }
        activatePopup(editButton, 'popup', 'New Task Description', editTaskDescription, mainContainer)
    }
    activatePopup(newTaskButton, 'popup', 'Task Description', addNewTask, mainContainer)
}