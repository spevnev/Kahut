import createLobby from './createLobby';
import joinLobby from './joinLobby';
import startLobby from './startGame';
import submitAnswer from './submitAnswer';
import editGame from './editGame';
import deleteGame from './deleteGame';
import editQuestion from './editQuestion';
import deleteQuestion from './deleteQuestion';

const mutations = { joinLobby, createLobby, startLobby, submitAnswer, editGame, deleteGame, editQuestion, deleteQuestion };

export default mutations;
