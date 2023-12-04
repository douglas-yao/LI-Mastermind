"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compareStrings(attempt, solution) {
    if (attempt.length !== solution.length) {
        console.error('Attempt and solution lengths are different!');
        return;
    }
    const comparisons = {
        directMatches: 0,
        indirectMatches: 0,
        incorrect: 0,
        won: false,
    };
    const attemptArr = attempt.split('');
    const solutionArr = solution.split('');
    const attemptLeftover = [];
    const solutionLeftover = [];
    const solutionLeftoverHash = {};
    for (let i = 0; i < attempt.length; i++) {
        if (attemptArr[i] === solutionArr[i]) {
            comparisons.directMatches++;
            comparisons.indirectMatches++;
        }
        else {
            attemptLeftover.push(attemptArr[i]);
            solutionLeftover.push(solutionArr[i]);
        }
    }
    for (let i = 0; i < solutionLeftover.length; i++) {
        solutionLeftoverHash[solutionLeftover[i]] =
            ++solutionLeftoverHash[solutionLeftover[i]] || 1;
    }
    for (let i = 0; i < attemptLeftover.length; i++) {
        if (solutionLeftoverHash[attemptLeftover[i]] > 0) {
            comparisons.indirectMatches++;
            solutionLeftoverHash[attemptLeftover[i]]--;
        }
        else {
            comparisons.incorrect++;
        }
    }
    comparisons.won = comparisons.directMatches === attempt.length;
    return comparisons;
}
exports.default = compareStrings;
