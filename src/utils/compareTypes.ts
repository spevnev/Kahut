import Game from '../types/game';
import Question from '../types/question';

export const areQuestionsEqual = (q1?: Question, q2?: Question): boolean =>
    !!q1 &&
    !!q2 &&
    q1.title === q2.title &&
    q1.time === q2.time &&
    q1.type === q2.type &&
    q1.image === q2.image &&
    q1.answers.join('') === q2.answers.join('') &&
    q1.choices.join('') === q2.choices.join('');

export const areGamesEqual = (g1?: Game, g2?: Game): boolean => !!g1 && !!g2 && g1.title === g2.title && g1.image === g2.image && g1.description === g2.description;
