/*
* modal window v 0.0.1
*/

"use strict";

(function (factory) {

    factory();

}(function factory () {

    const modals = document.querySelectorAll('.modal');

    if(!modals.length) {
        return false;
    }

    document.addEventListener('click', function (e) {

        const classesArr = ['modal-toggle', 'modal-wrapper', 'close', 'modal'];

        const target = e.target,
            targetClasses = target.classList,
            modal = target.closest('.modal'),
            targetToggler = target.attributes['data-modal-id'];

        const targetCloseModal = classesArr.some((item) => {
           return targetClasses.contains(item);
        });

        if(targetToggler) {

            this.querySelector(`#${targetToggler.value}`).classList.add('open');
            document.body.classList.add('modal-open');

        } else if (targetCloseModal && modal) {

            modal.classList.remove('open');
            document.body.classList.remove('modal-open');

        }

    });
}));
