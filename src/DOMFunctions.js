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