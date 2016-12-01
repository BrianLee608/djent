import { compose, flip, map } from 'ramda';
import { getLocalStorageIO } from 'modules/localStorageIO';

//    getStoredLoopModeValue :: Key -> a
const getStoredLoopModeValue = compose(
    map(flip(parseInt)(10)),
    getLocalStorageIO,
);

const storedLoopModeValue = getStoredLoopModeValue('loopMode').runIO();

const initialState =  {
    isPlaying            : false,
    loopMode             : typeof storedLoopModeValue !== 'undefined' ? storedLoopModeValue : 0,
    generationState      : undefined,
    currentAudioTemplate : undefined,
    audioPlaylist        : [],
    activePlaylistIndex  : 0,
    currentSrc           : undefined,
};

export default function sound(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'UPDATE_IS_PLAYING':
            return {
                ...state,
                isPlaying: payload.isPlaying
            };

        case 'UPDATE_CONTINUOUS_GENERATION':
            return {
                ...state,
                loopMode: payload.continuousGeneration ? false : payload.loopMode
            };

        case 'UPDATE_LOOPING_MODE':
            return {
                ...state,
                loopMode: payload.loopMode
            };

        case 'UPDATE_GENERATION_STATE':
            return {
                ...state,
                generationState: payload.generationState
            };

        case 'UPDATE_AUDIO_PLAYLIST':
            return {
                ...state,
                audioPlaylist: payload.audioPlaylist
            };

        case 'UPDATE_ACTIVE_PLAYLIST_INDEX':
            return {
                ...state,
                activePlaylistIndex: payload.activePlaylistIndex
            };

        case 'UPDATE_CURRENT_SRC':
            return {
                ...state,
                currentSrc: payload.currentSrc
            };

        default:
            return state;
    }
}
