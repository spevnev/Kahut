import Game from '../types/game';
import Question from '../types/question';

export const areQuestionsEqual = (q1?: Question, q2?: Question): boolean => {
    if (!q1 || !q2) return false;
    if (q1.title !== q2.title) return false;
    if (q1.time !== q2.time) return false;
    if (q1.type !== q2.type) return false;
    if (q1.image !== q2.image) return false;
    if (q1.answers.join('') !== q2.answers.join('')) return false;
    if (q1.choices.join('') !== q2.choices.join('')) return false;
    return true;
};

export const areGamesEqual = (g1?: Game, g2?: Game): boolean => {
    if (!g1 || !g2) return false;
    if (g1.title !== g2.title) return false;
    if (g1.image !== g2.image) return false;
    if (g1.description !== g2.description) return false;
    return true;
};
