/*
* accordion v 0.0.1
*/

;"use strict";
const tabSection = {
    init() {
        document.addEventListener("click", this, false);
        document.addEventListener("mouseover", this, false);
        window.onresize = this.handleEvent.bind(this);
        //making active element after loading
        const active = document.querySelector('.tab-section .tab-nav.active a');
        if (active) {
            active.click();
        }
    },
    handleEvent: function (e) {

        let t = e.target;

        if (e.type === 'resize') {
            t = document.querySelector('.tab-section .tab-nav.active a');
        }

        if (e.type === 'mouseover' && t.parentNode && t.parentNode.classList.contains('active')) {
            return;
        }

        if (t.parentNode && t.parentNode.classList.contains('tab-nav')) {
            e.preventDefault();

            const tabElements = this.getTabElements(t);

            if (e.type !== 'resize') {
                this.makeElementsActive(tabElements.nav, tabElements.content, tabElements.activeElements);

                this.setUnderlineCss(tabElements.underline, tabElements.tabHead, tabElements.nav);
            }

            this.showActiveContent(tabElements.content, tabElements.tabBody);
        }
    },
    getTabElements(targetEl) {
        const nav = targetEl.parentNode,
            tabHead = targetEl.closest('.tab-head'),
            section = nav.closest('.tab-section'),
            activeElements = section.querySelectorAll('.active'),
            a = nav.querySelector('a'),
            activeId = a.getAttribute('href'),
            tabBody = section.querySelector('.tab-body'),
            content = section.querySelector(activeId),
            underline = tabHead.querySelector('.tab-underline');

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

        const contents = tabBody.querySelectorAll('.tab-content');
        for (let i = 0; i < contents.length; i++) {
            contents[i].style.transform = `translateX(-${contentI * tabBody.offsetWidth}px)`;
        }
    },
    makeElementsActive(nav, content, activeElements) {
        for (let i = 0; i < activeElements.length; i++) {
            activeElements[i].classList.remove('active');
        }

        nav.classList.add('active');
        content.classList.add('active');
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

window.onload = tabSection.init.bind(tabSection);
