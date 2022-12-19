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
    const truncate = (string, stringLengthLimit) => {
        if (string.length > stringLengthLimit) {
            return string.substring(0, stringLengthLimit) + '...'
        } else {
            return string
        }
    }
    const createContentTab = () => {
        return DOMFunctions.createTitleContentContainer('project-details-container', 'project-details-title', 'Project Details', 'project-details-content', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta, leo in aliquam egestas, lorem diam eleifend ex, eu pellentesque nibh libero in augue. Quisque justo neque, venenatis et nulla non, pulvinar malesuada libero. In ut urna ac neque finibus ullamcorper in a quam. Mauris a odio vitae odio euismod fermentum eu eu odio. Aliquam ac tempor sem. Aliquam a dictum urna, vel rutrum nunc. Aliquam consequat sodales eros, eu rutrum dui condimentum id. Aenean finibus dui nec risus accumsan, sit amet tristique odio congue. Duis at nulla diam. Morbi egestas ex et augue feugiat, semper faucibus lorem rhoncus. Proin justo orci, bibendum quis tellus egestas, rutrum mollis risus. Quisque egestas finibus ligula nec ultrices. Duis laoreet, purus interdum tincidunt sodales, massa massa elementum sapien, sed imperdiet diam lectus eu mauris. Quisque fringilla dolor viverra, aliquet massa quis, molestie eros. Fusce non blandit nulla. Integer tempor enim ac tellus fringilla porttitor et eget mauris. Nulla sodales enim a ipsum posuere sollicitudin. Pellentesque pretium dapibus felis lobortis pellentesque. Nulla venenatis non enim id cursus. Proin et dolor bibendum sapien tristique tempor quis a neque. Nullam in lectus tellus. Aliquam accumsan gravida ligula sodales imperdiet. Curabitur dapibus tellus arcu. Vivamus non placerat diam. Cras fringilla congue dui ac tristique. Nullam nisl erat, auctor nec tellus eu, ultrices sagittis odio. Sed hendrerit ornare risus et commodo. Nam quis imperdiet ipsum. Donec accumsan dapibus risus, nec euismod nisl volutpat nec. Nulla bibendum, massa lobortis condimentum sodales, ipsum nibh sodales ipsum, ac fringilla tortor orci vel felis.', mainContainer)
    }
    let projectsArray = []
    const viewProjectDetails = () => {
        projectsArray.forEach(project => {
            project.addEventListener('click', () => {
                console.log('Hello world!')
            })
        })
    }
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
            let newProject = DOMFunctions.create('div', 'sidebar-project', truncate(input.value, 12), parent)
            projectsArray.push(newProject)
            input.value = ''
            closePopup()
            viewProjectDetails()
        })
        cancelButton.addEventListener('click', () => {
            closePopup()
        })
        return elementArray
    }
}
export const projectTabs = () => {
    
    // When a new project gets created, add a content tab associated with that tab
    // Create a function that creates a barebones tab to make sure the tabs function works
    // Create the tab setup function
    // The content page should contain the full length name of the project 
    // The page should contain the option to add tasks to a todo list
    // Each task on the todo list should be able to be checkmarked and crossed out
    // Each task that is checkmarked should be moved to a completed drop down menu that can be minimized
}
// Title of the project on top
// Project to do items in the middle