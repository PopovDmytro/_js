"use strict";

class Sidebar {

    constructor(wrapperId = null, {defaultWrapperClass = 'sidebar' ,position = 'left'}) {
        this._sidebar = document.getElementById(wrapperId);

        if(wrapperId) {
            this.preparingElements(this._sidebar, {defaultWrapperClass, position});
        }
    }

    preparingElements(sidebar, {defaultWrapperClass, position}) {
        const classesList = [defaultWrapperClass, position];
        //adding classes to wrapper
        sidebar.classList.add(...classesList);
        //adding classes to links and subLinks and

    }

    get sidebar() {
        return this._sidebar;
    }
}

//element = 'id element', options {}
const mainSidebar = new Sidebar('sidebar-main', {position: 'right'});
console.log(mainSidebar.sidebar);

