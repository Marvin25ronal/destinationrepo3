const assert = require('chai').assert;
const expect = require('chai').expect;
const operaciones = require('../src/operaciones');
require('chai').should();

describe('Prueba con chai', () => {
    describe('Prueba con expect', () => {
        it('Deberia de retornar 4', () => {
            expect(1 + 3).to.equal(4)
        })
        it('Prueba con should', () => {
            const suma = 1 + 3;
            suma.should.be.a('number')
        })
        it('Prueba con assert', () => {
            assert.equal(1 + 3, 4)
        }
        )
    })
    describe('Prueba de metodos de operaciones', () => {
        it('Prueba de suma', () => {
            assert.equal(operaciones.suma(1, 3), 4);
        }
        );
        it('Prueba de resta', () => {
            assert.equal(operaciones.resta(1, 3), -2);
        }
        );
        it('Prueba de multiplicacion', () => {
            assert.equal(operaciones.multiplicacion(1, 3), 3);
        }
        );
        it('Prueba de division', () => {
            assert.equal(operaciones.division(9, 3), 3);
        }
        );
        it('Prueba de modulo', () => {
            assert.equal(operaciones.modulo(1, 3), 1);
        }
        );
    })
})