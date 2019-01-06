/*
* offcanvas side bar v 0.0.2
*/

"use strict";

class Sidebar {
    constructor(sidebarId = null,
                {
                    sidebarDefaultClass = 'sidebar',
                    sidebarMenuClass = 'sidebar-menu',
                    position = 'left',//'top', 'right', 'bottom', 'left ', default 'left'
                    buttonToggleSelector = 'sidebar-toggle',
                    sidebarBehavior = 'push-content', //'push-content', 'over-content' , default 'push-content' (disable for top, bottom positions)
                    pageContainerSelector = 'body' //page container default 'body'
                } = {}) {
        const pageWrapper = document.querySelector(pageContainerSelector);
        this._sidebar = document.getElementById(sidebarId);

        if (this._sidebar) {
            this.preparingElements(this._sidebar, {sidebarDefaultClass, sidebarMenuClass, position});
            const classesBodyList = [sidebarBehavior, position];
            const sidebarTogglers = document.querySelectorAll(`#${sidebarId} .${buttonToggleSelector}, [data-sidebar-id="${sidebarId}"]`);
            if(!sidebarTogglers.length) {
                throw new Error('Please check you sidebar togglers it / they should have class "buttonToggleSelector" or attribute [data-sidebar-id="sidebarId"]');
            }
            if(sidebarTogglers.length > 0) {
                for (let i = 0; i < sidebarTogglers.length; i++) {
                    sidebarTogglers[i].addEventListener('click', this.toggleSidebar.bind(this._sidebar, pageWrapper, classesBodyList));
                }
            } else {
                sidebarTogglers[0].addEventListener('click', this.toggleSidebar.bind(this._sidebar, pageWrapper, classesBodyList));
            }
            document.addEventListener('click', (e) => {
                if(e.target && e.target.classList.contains(sidebarId + '_open')) {
                    this.toggleSidebar.call(this._sidebar, pageWrapper, classesBodyList);
                }
            });
        }
    }
    // adding classes to wrapper, main ul, children
    preparingElements(sidebar, {sidebarDefaultClass, sidebarMenuClass, position}) {
        const classesList = [sidebarDefaultClass, position];
        //adding classes to wrapper
        sidebar.classList.add(...classesList);
        //adding classes to links and subLinks and
        if(this._sidebar.querySelector(`.${sidebarMenuClass}`)) {
            const ul = this._sidebar.querySelector(`.${sidebarMenuClass}`);
            ul.classList.add('list_0');
            //
            this.findElementInsideElement(ul);
            this.addToggleToListParent(ul, '.has-child-list');
        }
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

        this._sidebar.addEventListener('click', function (e) {
            if(e.target && e.target.classList.contains(toggleClass)) {
                e.target.parentNode.classList.toggle('open');
            }
        });
    }
    //on click event sidebar toggle button function
    toggleSidebar(pageWrapper, classesBodyList) {
        //this sidebar toggle class open
        this.classList.toggle('open');
        // page wrapper toggle class open
        if(pageWrapper.classList.contains(`${this.id}_open`)) {
            pageWrapper.classList.remove(`${this.id}_open`, ...classesBodyList);
        } else {
            pageWrapper.classList.add(`${this.id}_open`, ...classesBodyList);
        }
    }

    //target parent toggle open class
    targetParentToggle(e, toggleClass) {

    }
}

/*
* Sidebar('id element', options {
                    sidebarDefaultClass: 'sidebar',
                    position: 'left',
                    buttonToggleSelector: 'sidebar-toggle',
                    sidebarBehavior: 'push-content',
                    pageContainerSelector: 'body'
* });
*/
const sidebar = new Sidebar('sidebar1');
//
const sidebarRight = new Sidebar('sidebar2', {position: 'right'});

