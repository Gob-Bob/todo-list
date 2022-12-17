// This file is only used for creating DOM related functions

const documentBody = document.body

export const createElement = (type, className, innerText, parent) => {
    const element = document.createElement(type)
    element.classList.add(className)
    element.innerHTML = innerText
    parent.appendChild(element)
    return element
}
export const createTitleContentContainer = (containerClassName, titleClassName, titleName, contentClassName, contentName, parent) => {
    const container = createElement('div', containerClassName, '', parent)
    const title = createElement('div', titleClassName, titleName, container)
    const content = createElement('div', contentClassName, contentName, container)
    return {title, content}
}