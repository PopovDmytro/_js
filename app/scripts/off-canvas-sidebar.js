"use strict";

class Sidebar {

    constructor(sidebearId = null,
                {
                    sidebarDefaultClass = 'sidebar',
                    position = 'left',//'top', 'right', 'bottom', 'left ', default 'left'
                    buttonToggleSelector = '.sidebar-toggle',
                    sidebarBehavior = 'push-content', //'push-content', 'over-content' , default 'push-content' (disable for top, bottom positions)
                    pageContainerSelector = 'body' //page container default 'body'
                }) {
        const pageWrapper = document.querySelector(pageContainerSelector);
        this._sidebar = document.getElementById(sidebearId);

        if (sidebearId) {
            this.preparingElements(this._sidebar, {sidebarDefaultClass, position});
            const classesBodyList = [sidebarBehavior, position];
            pageWrapper.classList.add(...classesBodyList);
            //add event listener for toggle sidebar
            const sidebarTogglers = document.querySelectorAll(buttonToggleSelector);
            if(sidebarTogglers.length > 0) {
                for (let i = 0; i < sidebarTogglers.length; i++) {
                    sidebarTogglers[i].addEventListener('click', this.toggleSidebar.bind(this._sidebar, pageWrapper));
                }
            } else {
                sidebarTogglers[0].addEventListener('click', this.toggleSidebar.bind(this._sidebar, pageWrapper));
            }
            document.addEventListener('click', (e) => {
                if(e.target && e.target.classList.contains(sidebearId + '_open')) {
                    this.toggleSidebar.call(this._sidebar, pageWrapper);
                }
            });
        }
    }
    // adding classes to wrapper, main ul, children
    preparingElements(sidebar, {sidebarDefaultClass, position}) {
        const classesList = [sidebarDefaultClass, position];
        //adding classes to wrapper
        sidebar.classList.add(...classesList);
        //adding classes to links and subLinks and
        const ul = sidebar.querySelector('ul');
        ul.classList.add('list_0');
        //
        this.findElementInsideElement(ul);
        this.addToggleToListParent(ul, '.has-child-list');
    }
    //recursively add classes on ul, li
    findElementInsideElement(el, counter = 0) {
        let locCounter = counter;
        for (let i = 0; i < el.children.length; i++) {
            if (el.children[i].tagName === 'UL') {
                const parent = el.children[i].parentNode;
                parent.classList.add('has-child-list');
                //
                locCounter++;
                el.children[i].classList.add('list_' + locCounter);
                //
                this.findElementInsideElement(el.children[i], locCounter);
            } else {
                if (el.children[i].tagName === 'LI') {
                    el.children[i].classList.add('item_' + locCounter);
                }
                this.findElementInsideElement(el.children[i], locCounter);
            }
        }
    }
    //add switcher inside .has-child-list
    addToggleToListParent(searchContainer, selector, toggleTag = 'div', toggleClass = 'list-toggle' ) {
        const listParentsNodes = searchContainer.querySelectorAll(selector);
        const toggleEl = document.createElement(toggleTag);
        toggleEl.classList.add(toggleClass);

        for (let i = 0; i < listParentsNodes.length; i++) {
            const clone = toggleEl.cloneNode(true);
            listParentsNodes[i].insertBefore(clone, listParentsNodes[i].firstChild);
        }

        document.addEventListener('click', (e) => {
            if(e.target && e.target.classList.contains(toggleClass)) {
                e.target.parentNode.classList.toggle('open');
            }
        });
    }
    //on click event sidebar toggle button function
    toggleSidebar(pageWrapper) {
        //this sidebar toggle class open
        this.classList.toggle('open');
        // page wrapper toggle class open
        pageWrapper.classList.toggle(this.id + '_open');
    }
}

/*
* element = 'id element', options {}
*/
const mainSidebar = new Sidebar('sidebar-main', {position: 'left'});
// console.log(mainSidebar.sidebar);

