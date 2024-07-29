document.getElementById('connect-wallet').addEventListener('click', () => {
    // Connect wallet functionality
    alert('Connecting wallet...');
});

document.getElementById('swap').addEventListener('click', () => {
    // Swap functionality
    let payValue = document.getElementById('pay').value;
    let receiveValue = document.getElementById('receive').value;

    document.getElementById('pay').value = receiveValue;
    document.getElementById('receive').value = payValue;

    let payAmount = document.getElementById('pay-amount').value;
    let receiveAmount = document.getElementById('receive-amount').value;

    document.getElementById('pay-amount').value = receiveAmount;
    document.getElementById('receive-amount').value = payAmount;
});
