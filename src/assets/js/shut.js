

class Modal {

    config = {
        modalSelector: '.dr-modal-overlay',
        closeSelector: '.dr-close',
        titleSelector: '.dr-title',
        modalContentSelector: '.dr-content',
        bodyCss: 'mdl-open',
        triggerAttr: 'data-trigger'
    };


    constructor(element) {
        this.modalElement = element;
        this.trigger = element.getAttribute(this.config.triggerAttr);

        this.modalElement.addEventListener('click', event => {
            const target = event.target;

            if (!target.closest(this.config.modalContentSelector)) {
                this.hide();
            }
            // if target is close, hide
            if (target.matches(this.config.closeSelector)) {
                this.hide();
            }
        });

        window.document.addEventListener('click', event => {
            const target = event.target;

            if (this.trigger) {
                if (target.matches(this.trigger) || target.closest(this.trigger)) {
                    // itself or its parent
                    // const _t = target.matches(this.trigger) ? target : target.closest(this.trigger);
                    this.show();
                }
            }
        });
    }
    show = () => {

         this.modalElement.style.display = 'block';
         document.body.classList.add(this.config.bodyCss);
    };

    hide = () => {
        this.modalElement.style.display = 'none';
        document.body.classList.remove(this.config.bodyCss);
        
    };


}

function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('DOMContentLoaded', (event) => {

    // set --vh
    setVh();

    window.addEventListener('resize', setVh);

    // find dialogs and attach behaviors
    const modals = document.querySelectorAll('.dr-modal-overlay');

    modals.forEach(n => {

        new Modal(n);

    });

});
