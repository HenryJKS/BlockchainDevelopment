// Função 'it' do Mocha, é usado para testar uma função especifica.
// Função 'describe' do Mocha, é usado para agrupar funções 'it'
// Função 'beforeEach' do Mocha, é usado para executar uma função antes de cada 'it', para evitar repetição de codigo.

// Importando o modulo assert.
// Assert é usado para fazer uma comparação entre dois valores.
const assert = require('assert');

// Exemplo de teste.
// a classe Car possui duas funções, park e drive.
class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom'
    }

    velocidade() {
        return '100km';
    }
}

class Conta {
    soma(x, y, total) {
        x = 5;
        y = 5;
        total = x + y;
        return total
    }

    subtracao(x, y, total) {
        x = 5;
        y = 2;
        total = x - y;
        return total
    };

    multiplicacao(x, y, total) {
        x = 10;
        y = 10;
        total = x * y;
        return total
    }
}

// Criando uma variavel car, que é uma instancia da classe Car.
// let pode ser uso para receber um novo valor.
let car;
let conta;

// Usando beforeEach para criar uma nova instancia da classe Car, antes de cada teste.
beforeEach( () => {
    car = new Car();
    conta = new Conta();
})

// Estamos agrupando os testes da classe Car, usando a função describe.
describe('Testando conta', () => {

    // Primeiro teste.
    it('Somando', () => {
        assert.equal(conta.soma(), 10)
    });

    // Segundo teste.
    it ('Substraindo', () => {
        assert.equal(conta.subtracao(), 3);
    });

    // Terceiro teste.
    it ('Multiplicando', () => {
        assert.equal(conta.multiplicacao(), 100);
    });
})