import express from 'express';

const host = '0.0.0.0';
const porta = 3000;

const server = express();

server.get('/reajuste', (req, resp) => {
    resp.setHeader('Content-type', 'text/html');

    const idade = parseInt(req.query.idade);
    const sexo = req.query.sexo;
    const salario = parseFloat(req.query.salario);
    const ano = parseInt(req.query.ano);
    const matricula = parseInt(req.query.matricula);

    var reajuste = 0;
    var novoSalario = salario;
    var mensagem = '';

    if (!idade || !salario || !ano || !matricula) {
        mensagem = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reajuste Salarial</title>
        </head>
        <body>
            <h1>Requisição Inválida!</h1>
            <h2>Por favor, preencha todos os campos corretamente.</h2>
        </body>
        </html>
        `;
        return resp.send(mensagem);
    }

    if (idade <= 16 || salario <= 0 || ano < 1960 || matricula <= 0) {
        mensagem = 'Informações inválidas. Por favor, verifique os dados fornecidos.';
    } else {
        if (idade >= 18 && idade <= 39) {
            if (sexo === 'M') {
                reajuste = salario * 0.10;
                novoSalario = salario + reajuste;
                if (2025 - ano > 10) {
                    novoSalario = novoSalario + 17;
                } else {
                    novoSalario = novoSalario - 10;
                }
            } else if (sexo === 'F') {
                reajuste = salario * 0.08;
                novoSalario = salario + reajuste;
                if (2025 - ano > 10) {
                    novoSalario = novoSalario + 16;
                } else {
                    novoSalario = novoSalario - 11;
                }
            }
        } else if (idade >= 40 && idade <= 69) {
            if (sexo === 'M') {
                reajuste = salario * 0.08;
                novoSalario = salario + reajuste;
                if (2025 - ano > 10) {
                    novoSalario = novoSalario + 15;
                } else {
                    novoSalario = novoSalario - 5;
                }
            } else if (sexo === 'F') {
                reajuste = salario * 0.10;
                novoSalario = salario + reajuste;
                if (2025 - ano > 10) {
                    novoSalario = novoSalario + 14;
                } else {
                    novoSalario = novoSalario - 15;
                }
            }
        } else if (idade >= 70 && idade <= 99) {
            if (sexo === 'M') {
                reajuste = salario * 0.15;
                novoSalario = salario + reajuste;
                if (2025 - ano > 10) {
                    novoSalario = novoSalario + 13;
                } else {
                    novoSalario = novoSalario - 12;
                }
            } else if (sexo === 'F') {
                reajuste = salario * 0.17;
                novoSalario = salario + reajuste;
                if (2025 - ano > 10) {
                    novoSalario = novoSalario + 12;
                } else {
                    novoSalario = novoSalario - 17;
                }
            }
        }

        mensagem = `
        Matrícula: ${matricula} <br>
        Idade: ${idade} <br>
        Sexo: ${sexo} <br>
        Salário Atual: R$ ${salario} <br>
        Ano de Admissão: ${ano} <br>
        Reajuste: R$ ${reajuste} <br>
        Novo Salário: R$ ${novoSalario} <br>
        `;
    }

    resp.send(mensagem);
});

server.listen(porta, host, () => {
    console.log(`Servidor executando em http://${host}:${porta}`);
});
