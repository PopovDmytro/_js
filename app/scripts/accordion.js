/*
* accordion v 0.0.1
*/

;"use strict";

(function () {

    const accordions = document.querySelectorAll('.accordion');

    if (!accordions.length) {
        return false;
    }

    document.addEventListener('click', handleAccordionToggle);

    function handleAccordionToggle(e) {
        const target = e.target;

        if (!target.classList.contains('accordion-toggle')) {
            return;
        }

        const section = target.closest('.section'),
            content = section.querySelector('.accordion-content');

        if(content.offsetHeight && content.offsetHeight !== content.scrollHeight) {
            return;
        }

        if (getComputedStyle(content).display === 'none') {
            content.style.display = 'inherit';
            content.style.height = '0px';
        } else {
            content.style.height = getComputedStyle(content).height;
        }

        content.style.overflow = 'hidden';

        let minHeight = 0;
        let maxHeight = content.scrollHeight;
        let time = 1500;
        let timer = null;
        let toggled = parseInt(content.style.height) || getComputedStyle(content).display === 'none';

        clearInterval(timer);
        let instanceHeight = parseInt(getComputedStyle(content).height);  // Current height
        let init = (new Date()).getTime(); //start time
        let height = (toggled = !toggled) ? maxHeight: minHeight; //if toggled
        let disp = height - parseInt(content.style.height ? content.style.height : 0);
        timer = setInterval(function() {
            let instance = (new Date()).getTime() - init; //animating time
            if(instance <= time ) { //0 -> time seconds
                let pos = instanceHeight + Math.floor(disp * instance / time);
                content.style.height =  pos + 'px';
            }else {
                content.style.height = height + 'px'; //safety side ^^
                clearInterval(timer);
            }
        },1);
    }

})();
