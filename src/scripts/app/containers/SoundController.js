import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import * as modalActions from '../actions/modal';
import * as soundActions from '../actions/sound';
import SoundController from '../components/SoundController';

const mapStateToProps = (state) => ({
    ...state.sound,
    continuousGeneration : state.config.continuousGeneration,
    bpm                  : state.config.bpm,
    sequences            : state.sequences,
    instruments          : state.instruments,
});

const mapDispatchToProps = (dispatch) => {
    const actions = {
        ...configActions,
        ...instrumentsActions,
        ...modalActions,
        ...soundActions,
    };
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundController);
