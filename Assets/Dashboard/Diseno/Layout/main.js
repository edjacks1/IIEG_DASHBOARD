if ($(window).width() > 575) {

    let menu_abierto = ((localStorage.getItem('menu_abierto') === null) ? ({
        'open': false
    }) : ({
        'open': JSON.parse(localStorage.getItem('menu_abierto'))['open']
    }));

    document.querySelector('#menuToggle').onclick = function() {
        document.querySelector('body').classList.toggle('open');
        ((menu_abierto['open']) ? (menu_abierto['open'] = false) : (menu_abierto['open'] = true));
        localStorage.setItem('menu_abierto', JSON.stringify(menu_abierto));
    };


    if ((localStorage.getItem('menu_abierto') != null)) {
        ((JSON.parse(localStorage.getItem('menu_abierto'))['open'] === true) ? (document.querySelector('body').classList.toggle('open')) : (''));
    }
}
