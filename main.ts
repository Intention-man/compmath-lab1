import { getReader } from './reader.js';
import { solveLinearEquationsSystem } from './solver.js';
import { printResult } from './printer.js';

/** Обработать нажатие кнопки "Решить". */
export function onSolveClicked(event: Event): void {
  event.preventDefault();
  const reader = getReader();
  
  reader.read()
    .then(inputData => {
      try {
        const result = solveLinearEquationsSystem(inputData);
        printResult(result);
      } catch (e) {
        if (e instanceof Error && e.name === 'DiagonallyDominationUnobtainable') {
          alert('Невозможно достичь диагонального преобладания исходной матрицы');
          return;
        }
        throw e;
      }
    })
    .catch((e: Error) => {
      if (e.name === 'ReadError') {
        alert(e.message);
        return;
      }
      throw e;
    });
}

window.onload = () => {
  const solveButton = document.getElementById('solve-button');
  solveButton?.addEventListener('click', onSolveClicked);
};
