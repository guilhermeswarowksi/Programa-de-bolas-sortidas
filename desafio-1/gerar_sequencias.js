const fs = require('fs');
const { SocketAddress } = require('net');


const bolas = [
    { cor: "verde", peso: 1 },
    { cor: "azul", peso: 2 },
    { cor: "amarelo", peso: 3 },
    { cor: "vermelho", peso: 5 }
];


const cores = bolas.map(bola => bola.cor);
const pesos = bolas.map(bola => bola.peso);


function gerarSequencia() {
    const sequencia = [];
    for (let i = 0; i < 4; i++) {
        const totalPeso = pesos.reduce((a, b) => a + b, 0);
        let escolha = Math.random() * totalPeso;
        for (let j = 0; j < pesos.length; j++) {
            escolha -= pesos[j];
            if (escolha < 0) {
                sequencia.push(cores[j]);
                break;
            }
        }
    }
    return sequencia;
}

const writeStream = fs.createWriteStream('resultado.txt');
for (let i = 0; i < 1000; i++) {
    const sequencia = gerarSequencia();
    writeStream.write(sequencia.join(',') + '\n');
}
writeStream.end();


writeStream.on('finish', () => {
    const contagem = cores.reduce((acc, cor) => ({ ...acc, [cor]: 0 }), {});
    const data = fs.readFileSync('resultado.txt', 'utf-8');
    const linhas = data.split('\n').filter(Boolean);

    linhas.forEach(linha => {
        const sequencia = linha.split(',');
        sequencia.forEach(cor => {
            contagem[cor]++;
        });
    });

    for (const [cor, count] of Object.entries(contagem)) {
        console.log(`${cor}: ${count}`);
    }
});

