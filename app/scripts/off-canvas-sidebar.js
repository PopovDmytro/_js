"use strict";

class Sidebar {

    constructor(wrapperId = null,
                {
                    wrapperClass = 'sidebar',
                    position = 'left',
                    buttonToggle = 'sidebar-toggler'
                }) {
        this._sidebar = document.getElementById(wrapperId);

        if (wrapperId) {
            this.preparingElements(this._sidebar, {wrapperClass, position});
        }
    }

    preparingElements(sidebar, {wrapperClass, position}) {
        const classesList = [wrapperClass, position];
        //adding classes to wrapper
        sidebar.classList.add(...classesList);
        //adding classes to links and subLinks and
        const ul = sidebar.querySelector('ul');
        ul.classList.add('list_0');

        //making array from node list
        const list_0_childrenArr = Array.prototype.slice.call(ul.children);
        console.log(list_0_childrenArr);
        //

        this.findElementInsideElement(ul);
        this.addTogglerToListParent(ul, '.has-child-list');
    }

    get sidebar() {
        return this._sidebar;
    }
    //helpers
    findElementInsideElement(el, counter = 0) {
        let locCounter = counter;
        for (let i = 0; i < el.children.length; i++) {
            if (el.children[i].tagName === 'UL') {
                const parent = el.children[i].parentNode;
                parent.classList.add('has-child-list');

                // parent.appendChild(toggleEl);
                // console.log(parent.firstChild);
                // parent.insertBefore(toggleEl, parent.firstChild);

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
    addTogglerToListParent(searchContainer, selector) {
        const listParentsNodes = searchContainer.querySelectorAll(selector);
        const toggleEl = document.createElement("div");
        toggleEl.classList.add('list-toggle');

        for (let i = 0; i < listParentsNodes.length; i++) {
            const clone = toggleEl.cloneNode(true);
            listParentsNodes[i].insertBefore(clone, listParentsNodes[i].firstChild);
        }
    }
}

//element = 'id element', options {}
const mainSidebar = new Sidebar('sidebar-main', {position: 'right'});
// console.log(mainSidebar.sidebar);

