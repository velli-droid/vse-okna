if (window.FormData) {
    let successPopup = document.querySelector('.page-popup__suscess');
    let errorPopup = document.querySelector('.page-popup__error');


    let forms = [...document.querySelectorAll('form')];

    for(let form of forms) {
        form.addEventListener('submit', formSend);
        async function formSend(event) {
            event.preventDefault();        
            let formData = new FormData(form);
            let responce = await fetch('../send.php', {
                method: 'POST',
                body: formData
            });
            if(responce.ok) {
                let result = await responce.json();
                if(result.message == 'Oшибка') {
                    showPopup(errorPopup);
                } else {
                    form.reset();
                    showPopup(successPopup);
                } 
            } else {
                showPopup(errorPopup);
            }
        }
    }
}