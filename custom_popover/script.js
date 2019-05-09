var arr = Array.from(document.getElementsByClassName('onboarding'));

arr.forEach(a => {

    var wrapper = document.createElement('DIV');
    wrapper.classList.add('popup-wrapper');
    a.before(wrapper);

    var popup = document.createElement('DIV');
    popup.classList.add('popup');
    var info = document.createTextNode(a.getAttribute('data-description'));
    popup.appendChild(info);

    wrapper.append(popup, a);

    var shown = false;
    a.onclick = () => {
        // show popup only once
        if (wrapper.contains(popup)) {
            if (shown === false) {
                popup.classList.add('show');
                shown = true;
            } else {
                wrapper.removeChild(popup);
                a.classList.remove('onboarding');
            }
        }
        // one popup at a time
        var open = Array.from(document.getElementsByClassName('show'));
        open.filter(o => {
            if (o !== popup) {
                o.classList.remove('show');
                o.nextSibling.classList.remove('onboarding');
            }
        })
    };
});

// clear popups on document click
function removePopup(e) {
    var open = Array.from(document.getElementsByClassName('show'));
    var exclude = 'onboarding';
    console.log(exclude, e.target.classList[0]);
    open.forEach(op => {
        if (e.target.classList[0] !== exclude) {
            op.classList.remove('show');
            op.nextSibling.classList.remove('onboarding');
        }
    })
}

document.body.addEventListener('click', removePopup);
