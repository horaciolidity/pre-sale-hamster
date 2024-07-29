document.addEventListener('DOMContentLoaded', () => {
    const grandMasterButton = document.getElementById('grand-master');
    const lordButton = document.getElementById('lord');
    const creatorButton = document.getElementById('creator');
    const payAmountInput = document.getElementById('pay-amount');
    const receiveAmountInput = document.getElementById('receive-amount');

    grandMasterButton.addEventListener('click', () => {
        payAmountInput.value = '0.1';
        receiveAmountInput.value = '2400';
    });

    lordButton.addEventListener('click', () => {
        payAmountInput.value = '0.5';
        receiveAmountInput.value = '13100';
    });

    creatorButton.addEventListener('click', () => {
        payAmountInput.value = '1';
        receiveAmountInput.value = '24000';
    });
     var endDate = new Date();
    endDate.setDate(endDate.getDate() + 15);

    function updateCountdown() {
        var now = new Date();
        var timeRemaining = endDate - now;

        if (timeRemaining <= 0) {
            document.getElementById('countdown').innerHTML = "Presale has ended!";
            return;
        }

        var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('countdown').innerHTML = days + "d " + hours + "h " + minutes + "m";
    }

    // Actualiza el contador cada minuto
    updateCountdown();
    setInterval(updateCountdown, 60000);
});
