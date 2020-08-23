
export function appFunc() {
    let btn = document.querySelector('#btn');
    let overlay = document.querySelector('#overlay');

    btn.addEventListener('click', () => {
        // add grid to display and animations
        overlay.style.display = "grid";
        overlay.classList.add('overlay-animation');

        // set display to none after 3 seconds 
        setTimeout(function () {
            overlay.style.display = "none";
        }, 2000);
    });
}

appFunc();