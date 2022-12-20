export const create = (type, className, innerText, parent) => {
    const element = document.createElement(type)
    element.classList.add(className)
    element.innerHTML = innerText
    parent.appendChild(element)
    return element
}
export const createTitleContentContainer = (containerClassName, titleClassName, titleName, contentClassName, contentName, parent) => {
    const container = create('div', containerClassName, '', parent)
    const title = create('div', titleClassName, titleName, container)
    const content = create('div', contentClassName, contentName, container)
    return {title, content}
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
export const img = (source, parent) => {
    const element = document.createElement('img')
    element.src = source
    parent.appendChild(element)
    return element
}