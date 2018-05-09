import API from '../constants/axios';
import * as types from '../actions/types';

/** ACTIONS DISPATCH **/

// COUNSTRIES_BY_GROUP
export function setQuinielaByGroups(countriesByGroup) {
    return {
        type: types.COUNSTRIES_BY_GROUP,
        countriesByGroup
    };
}
// GET_GAMES_BY_STRUCTURE
export function setGrupos(grupos) {
    return {
        type: types.SET_GAME_GRUPOS,
        grupos
    };
}
export function setOctavos(octavos) {
    return {
        type: types.SET_GAME_OCTAVOS,
        octavos
    };
}
export function setCuartos(cuartos) {
    return {
        type: types.SET_GAME_CUARTOS,
        cuartos
    };
}
export function setSemiFinales(semiFinales) {
    return {
        type: types.SET_GAME_SEMIFINALES,
        semiFinales
    };
}
export function setTercerPuesto(tercer) {
    return {
        type: types.SET_GAME_TERCEROS,
        tercer
    };
}
export function setFinal(final) {
    return {
        type: types.SET_GAME_FINAL,
        final
    };
}
export function setQuinielaStructures(quinielaStructures) {
    return {
        type: types.GET_QUINIELA_STRUCTURES,
        quinielaStructures
    };
}
/** ACTIONS **/
// COUNSTRIES_BY_GROUP
export function getGroupList() {
    return dispatch => {
        API.get('countries_groups/')
            .then(countriesByGroup => {
                dispatch(setQuinielaByGroups(countriesByGroup.data));
            }).catch(e => {
                console.log('Error "getGroupList": ' + e);
            });
    };
}
// GET_QUINIELA_STRUCTURES
export function getQuinielaStructures() {
    return dispatch => {
        API.get('structure/')
            .then(response => {
                dispatch(setQuinielaStructures(response.data));
            }).catch(e => {
                console.log('Error "getQuinielaStructures": ' + e);
            });
    };
}
// SET_INVITATIONS
export function getAllGamesByGroups() {
    console.log('dispatch');
    return dispatch => {
        API.get('game/estructura/1') // grupos
            .then(grupos => {
                dispatch(setGrupos(grupos.data));
                API.get('game/estructura/2') // octavos
                    .then(octavos => {
                        dispatch(setOctavos(octavos.data));
                        API.get('game/estructura/3') // cuartos
                            .then(cuartos => {
                                dispatch(setCuartos(cuartos.data));
                                API.get('game/estructura/4') // semifinales
                                    .then(semifinales => {
                                        dispatch(setSemiFinales(semifinales.data));
                                        API.get('game/estructura/5') // tercer puesto
                                            .then(tercer => {
                                                dispatch(setTercerPuesto(tercer.data));
                                                API.get('game/estructura/6') // final
                                                    .then(final => {
                                                        dispatch(setFinal(final.data));
                                                    }).catch(e => {
                                                        console.log('Error "getAllGamesByGroups 6": ' + e);
                                                    });
                                            }).catch(e => {
                                                console.log('Error "getAllGamesByGroups 5": ' + e);
                                            });
                                    }).catch(e => {
                                        console.log('Error "getAllGamesByGroups 4": ' + e);
                                    });
                            }).catch(e => {
                                console.log('Error "getAllGamesByGroups 3": ' + e);
                            });
                    }).catch(e => {
                        console.log('Error "getAllGamesByGroups asdasd 2": ' + e);
                    });
            }).catch(e => {
                console.log('Error "getAllGamesByGroups 1": ' + e);
            });
    };
}
