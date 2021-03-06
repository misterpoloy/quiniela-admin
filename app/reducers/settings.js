import * as types from '../actions/types';

const initialState = {
    game: {},
    countriesByGroup: {},
    quinielaStructures: [],
    grupos: [],
    octavos: [],
    cuartos: [],
    semiFinales: [],
    superQuiniela: null,
    tercer: [],
    final: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.POST_GAME: // action done
            return state;
        case types.GET_PREDICTIONS: // 2
            return {
                ...state,
                predictionsByUsers: action.predictionsByUsers
            };
        case types.POST_PREDICTIONS: // 2
            return {
                ...state,
                postSuccesfull: action.postSuccesfull
            };
        case types.GET_QUINIELA_POSITIONS: // 2
            return {
                ...state,
                quinielaPositions: action.quinielaPositions
            };
        case types.GET_GAME: // 2
            return {
                ...state,
                game: action.game
            };
        case types.SET_GAME_GRUPOS: // 2
            return {
                ...state,
                grupos: action.grupos
            };
        case types.SET_GAME_OCTAVOS: // 2
            return {
                ...state,
                octavos: action.octavos
            };
        case types.SET_GAME_CUARTOS: // 2
            return {
                ...state,
                cuartos: action.cuartos
            };
        case types.SET_GAME_SEMIFINALES: // 2
            return {
                ...state,
                semiFinales: action.semiFinales
            };
        case types.SET_GAME_TERCEROS: // 2
            return {
                ...state,
                tercer: action.tercer
            };
        case types.SET_GAME_FINAL: // **
            return {
                ...state,
                final: action.final
            };
        case types.COUNSTRIES_BY_GROUP: // action done
            return {
                ...state,
                countriesByGroup: action.countriesByGroup
            };
        case types.GET_QUINIELA_STRUCTURES: // action done
            return {
                ...state,
                error: false,
                quinielaStructures: action.quinielaStructures
            };
        default:
            return state;
    }
};

