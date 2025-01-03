import init, { collatz } from './pkg/collatz.js';

await init();

const input = document.getElementById('collatz-input');
const result = document.getElementById('result');
const log = document.getElementById('log');

let currentTable = null;

const originalLog = console.log;
console.log = function(message) {
    originalLog.apply(console, arguments);

    if (message === "TABLE_START") {
        currentTable = document.createElement('table');
        log.appendChild(currentTable);
        return;
    }

    if (message === "TABLE_END") {
        return;
    }

    if (currentTable) {
        const [step, number, calculation] = message.split('|');

        if (step === "Step") {
            const headerRow = document.createElement('tr');
            [step, number, calculation].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                headerRow.appendChild(th);
            });
            currentTable.appendChild(headerRow);
        } else {
            const row = document.createElement('tr');
            [step, number, calculation].forEach(text => {
                const td = document.createElement('td');
                td.textContent = text;
                row.appendChild(td);
            });
            currentTable.appendChild(row);
        }
    }
};

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        log.innerHTML = '';

        const n = parseInt(input.value);
        if (isNaN(n) || n < 0) {
            result.textContent = 'Please enter a non-negative number';
            return;
        }
        try {
            const iteration = collatz(input.value);
            result.textContent = `Steps used: ${iteration}`;
        } catch (e) {
            result.textContent = 'An error occurred. The number might be too large.';
        }
    }
});

document.getElementById('scrollButton').addEventListener('click', function () {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

