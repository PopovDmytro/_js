/*
* accordion v 0.0.2
*/
;"use strict";

const tabSection = {
    init(options) {

        //set options if exist
        for (let key in options) {
            if (options.hasOwnProperty(key) && options[key]) {
                this.options[key] = options[key];
            }
        }

        //initialize tabs
        this.callEventHandler();

        //change tabs on events
        const events = this.options.events;
        for (let i = 0; i < events.length; i++) {
            document.addEventListener(events[i], this, false);
        }

        //change tabs on window resize
        window.onresize = this.callEventHandler.bind(this);
    },
    callEventHandler() {
        const activeNodeList = document.querySelectorAll(`${this.options.tabSectionSelector} ${this.options.tabNavSelector}.${this.options.activeClass} ${this.options.switchTag}`);
        if (activeNodeList.length) {
            for (let i = 0; i < activeNodeList.length; i++) {
                this.handleEvent(activeNodeList[i]);
            }
        } else if (activeNodeList) {
            this.handleEvent(activeNodeList[0]);
        }
    },
    handleEvent(e) {
        let t;
        if (e && e.type) {
            t = e.target;
        } else if (e) {
            t = e;
        } else {
            return;
        }

        if (e.type && t.closest(this.options.tabHeadSelector)) {
            e.preventDefault();
        }

        if ((t.parentNode && t.parentNode.closest(this.options.tabNavSelector) && !t.parentNode.closest('.' + this.options.activeClass)) || (t.parentNode.closest('.' + this.options.activeClass) && !e.type)) {

            /*
            * TODO need to be reviewed
            * do not research useless elements on event
            * all section elements bound on target a when event bubbling
            */
            const tabElements = this.getTabElements(t);
            //

            this.makeElementsActive(tabElements.nav, tabElements.content, tabElements.activeElements);

            this.setUnderlineCss(tabElements.underline, tabElements.tabHead, tabElements.nav);

            this.showActiveContent(tabElements.content, tabElements.tabBody);
        }
    },
    options: {
        events: ['click', 'mouseover'],
        tabSectionSelector: '.tab-section',
        tabHeadSelector: '.tab-head',
        tabNavSelector: '.tab-nav',
        tabBodySelector: '.tab-body',
        tabContentSelector: '.tab-content',
        underlineSelector: '.tab-underline',
        switchTag: 'a',
        switchIdAttribute: 'href',
        activeClass: 'active'
    },
    /*
    * TODO need to be reviewed
    * do not research useless elements on event
    * all section elements bound on target a when event bubbling
    */
    getTabElements(targetEl) {
        const nav = targetEl.parentNode,
            tabHead = targetEl.closest(this.options.tabHeadSelector),
            section = nav.closest(this.options.tabSectionSelector),
            activeElements = section.querySelectorAll('.' + this.options.activeClass),
            a = nav.querySelector(this.options.switchTag),
            activeId = a.getAttribute(this.options.switchIdAttribute),
            tabBody = section.querySelector(this.options.tabBodySelector),
            content = section.querySelector(activeId),
            underline = tabHead.querySelector(this.options.underlineSelector);

        return {
            nav,
            section,
            tabHead,
            activeElements,
            a,
            activeId,
            tabBody,
            content,
            underline
        };
    },
    showActiveContent(content, tabBody) {

        let contentI = 0;
        let previousEl = content;
        while ((previousEl = previousEl.previousSibling) != null) {
            ++contentI;
        }

        const contents = tabBody.querySelectorAll(this.options.tabContentSelector);
        for (let i = 0; i < contents.length; i++) {
            contents[i].style.transform = `translateX(-${contentI * tabBody.offsetWidth}px)`;
        }
    },
    makeElementsActive(nav, content, activeElements) {
        for (let i = 0; i < activeElements.length; i++) {
            activeElements[i].classList.remove(this.options.activeClass);
        }

        nav.classList.add(this.options.activeClass);
        content.classList.add(this.options.activeClass);
    },
    setUnderlineCss(underline, head, nav) {

        const headR = head.getBoundingClientRect(),
            headL = headR.left,
            activeR = nav.getBoundingClientRect(),
            w = nav.offsetWidth,
            l = activeR.left;

        underline.style.width = w + 'px';
        underline.style.left = l - headL + 'px';
    }
};

/* default properties
options = {
        events: ['click', 'mouseover'],
        tabSectionSelector: '.tab-section',
        tabHeadSelector: '.tab-head',
        tabNavSelector: '.tab-nav',
        tabBodySelector: '.tab-body',
        tabContentSelector: '.tab-content',
        underlineSelector: '.tab-underline',
        switchTag: 'a',
        switchIdAttribute: 'href',
        activeClass: 'active'
}
tabSection.init(options);
*/

window.onload = function () {

    tabSection.init({

    });

};


