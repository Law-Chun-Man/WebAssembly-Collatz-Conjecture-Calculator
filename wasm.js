import init, { collatz } from './pkg/collatz.js';

await init();

const input = document.getElementById('collatz-input');
const result = document.getElementById('result');
const log = document.getElementById('log');

// Create table from logs
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
            // Create header row
            const headerRow = document.createElement('tr');
            [step, number, calculation].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                headerRow.appendChild(th);
            });
            currentTable.appendChild(headerRow);
        } else {
            // Create data row
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
    // Check if the Enter key was pressed
    if (event.key === "Enter") {
        // Clear previous logs
        log.innerHTML = '';

        const n = parseInt(input.value);
        if (isNaN(n) || n < 0) {
            result.textContent = 'Please enter a non-negative number';
            return;
        }
        try {
            const iteration = collatz(n);
            result.textContent = `Steps used: ${iteration}`;
        } catch (e) {
            result.textContent = 'An error occurred. The number might be too large.';
        }
    }
});

