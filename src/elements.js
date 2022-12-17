// This file is only used for populating the DOM with elements
import * as DOMFunctions from './DOMFunctions'

const mainContainer = DOMFunctions.createElement('div', 'main-container', '', document.body)

// Projects sidebar/container on the left
// Add a new project button
export const sidebar = () => {
    const container = DOMFunctions.createTitleContentContainer('sidebar-container', 'sidebar-title', 'Projects', 'sidebar-content', '', mainContainer)
    const button = DOMFunctions.createElement('button', 'sidebar-button', '+ New Project', container.content)
}

// Right side contains more details on project
// Title of the project on top
// Project to do items in the middle