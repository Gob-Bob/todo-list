const documentBody = document.body

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