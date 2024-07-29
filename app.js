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
});
