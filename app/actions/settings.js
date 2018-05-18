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
// #SlEEP

export function sendMassiveEmail() {
    return () => {
        API.get('user/send/email')
            .then(() => {
                // console.log(response);
            }).catch(() => {
                // console.log('Error "sendMassiveEmail": ' + e);
            });
    };
}

export function createGroup(gamesId, bodyPrediction) {
    return () => {
        API.post(`game/${gamesId}`, [
            ...bodyPrediction
        ])
            .then(() => {
                // console.log(response);
            }).catch(() => {
                // console.log('Error sendPrediction": ' + e);
            });
    };
}
export function addGroup(gamesId, bodyPrediction) {
    return () => {
        API.post(`game/${gamesId}`, [
            ...bodyPrediction
        ])
            .then(() => {
                // console.log(response);
            }).catch(() => {
                // console.log('Error sendPrediction": ' + e);
            });
    };
}
export function removeGroup() {
    return () => {
        API.get('user/sendmail')
            .then(() => {
                // console.log(response);
            }).catch(() => {
                // console.log('Error "sendMassiveEmail": ' + e);
            });
    };
}

export function updateSuperQuiniela(gamesId, bodyPrediction) {
    return () => {
        API.patch(`game/${gamesId}`, [
            ...bodyPrediction
        ])
            .then(() => {
                // console.log(response);
            }).catch(() => {
                // console.log('Error sendPrediction": ' + e);
            });
    };
}
export function getSuperQuiniela() {
    return dispatch => {
        API.get('countries_groups')
            .then(countriesByGroup => {
                dispatch(setQuinielaByGroups(countriesByGroup.data));
            }).catch(() => {
                // console.log('Error "getGroupList": ' + e);
            });
    };
}
// #SLEEP

// COUNTRIES CONTAINER:
export function getGroupList() {
    return dispatch => {
        API.get('countries_groups')
            .then(countriesByGroup => {
                dispatch(setQuinielaByGroups(countriesByGroup.data));
            }).catch(() => {
                // console.log('Error "getGroupList": ' + e);
            });
    };
}
export function addNewCountry() {
    return dispatch => {
        API.get('countries_groups')
            .then(countriesByGroup => {
                dispatch(setQuinielaByGroups(countriesByGroup.data));
            }).catch(() => {
                // console.log('Error "getGroupList": ' + e);
            });
    };
}
export function removeNewCountry() {
    return dispatch => {
        API.get('countries_groups')
            .then(countriesByGroup => {
                dispatch(setQuinielaByGroups(countriesByGroup.data));
            }).catch(() => {
                // console.log('Error "getGroupList": ' + e);
            });
    };
}
// PATCH_UPDATE_GAME
export function updateGame(gamesId, bodyPrediction) {
    return () => {
        API.patch(`game/${gamesId}`, {...bodyPrediction})
            .then(() => {
            }).catch(() => {
                // console.log('Error sendPrediction": ' + e);
            });
    };
}
// GET_QUINIELA_STRUCTURES
export function getQuinielaStructures() {
    return dispatch => {
        API.get('structure')
            .then(response => {
                dispatch(setQuinielaStructures(response.data));
            }).catch(() => {
                // console.log('Error "getQuinielaStructures": ' + e);
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
                                                    }).catch(() => {
                                                        // console.log('Error "getAllGamesByGroups 6": ' + e);
                                                    });
                                            }).catch(() => {
                                                // console.log('Error "getAllGamesByGroups 5": ' + e);
                                            });
                                    }).catch(() => {
                                        // console.log('Error "getAllGamesByGroups 4": ' + e);
                                    });
                            }).catch(() => {
                                // console.log('Error "getAllGamesByGroups 3": ' + e);
                            });
                    }).catch(() => {
                        // console.log('Error "getAllGamesByGroups asdasd 2": ' + e);
                    });
            }).catch(() => {
                // console.log('Error "getAllGamesByGroups 1": ' + e);
            });
    };
}
