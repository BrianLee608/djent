import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { insert, update, remove } from 'ramda'

import Generator from 'components/Generator'
import ReorderableList from 'components/ReorderableList'
import SVG from 'components/SVG'

import {
    updateAudioPlaylist,
    updateActivePlaylistIndex,
    updateIsPlaying,
} from 'actions/sound'

import {
    applyPreset
} from 'actions/config'

import { createPreset } from 'utils/presets'
import { createPlaylistItem } from 'utils/riffs'
import { confineToRange } from 'utils/tools'

class PlaylistEditor extends Component {
    static defaultProps = {
        audioPlaylist: []
    }

    trackLimit = 30
    state = {
        isLoading: false,
    }

    updateActivePlaylistIndex = (playlistIndex) => {
        if (playlistIndex === undefined || this.props.activePlaylistIndex === playlistIndex) return
        this.props.actions.updateActivePlaylistIndex(playlistIndex)
    }

    onListItemClick = (playlistIndex) => {
        this.props.actions.updateIsPlaying(false)
        this.updateActivePlaylistIndex(playlistIndex)
    }

    onReorder = (newOrder) => {
        const { audioPlaylist } = this.props
        const newAudioPlaylist = newOrder
            .map(key => audioPlaylist.find(item => `${item.key}` === key))
        const activeItemKey = this.props.audioPlaylist[this.props.activePlaylistIndex].id
        const newActivePlaylistIndex = newAudioPlaylist
            .reduce((answer, item, i) => (activeItemKey === item.id) ? i : answer, 0)

        this.props.actions.updateAudioPlaylist(newAudioPlaylist)
        this.updateActivePlaylistIndex(newActivePlaylistIndex)
    }

    onDelete = (e, i, isDisabled) => {
        if (isDisabled || this.props.isPlaying) return
        e.preventDefault()
        e.stopPropagation()
        const { audioPlaylist, activePlaylistIndex } = this.props
        const newAudioPlaylist = remove(i, 1, audioPlaylist)
        this.props.actions.updateAudioPlaylist(newAudioPlaylist)

        if (activePlaylistIndex >= i) {
            const newActivePlaylistIndex = confineToRange(0, newAudioPlaylist.length - 1, activePlaylistIndex + 1)
            this.updateActivePlaylistIndex(newActivePlaylistIndex)
        }
    }

    onDuplicate = (e, i, isDisabled) => {
        if (isDisabled || this.props.isPlaying) return
        e.preventDefault()
        e.stopPropagation()
        const { audioPlaylist, activePlaylistIndex } = this.props
        const playlistItem = audioPlaylist[i]
        const newAudioPlaylistItem = createPlaylistItem(playlistItem.id, playlistItem.audioTemplate, playlistItem.instruments, playlistItem.sequences, playlistItem.bpm, playlistItem.isLocked)
        const newAudioPlaylist = insert(i, newAudioPlaylistItem, audioPlaylist)

        this.props.actions.updateAudioPlaylist(newAudioPlaylist)

        if (activePlaylistIndex > i) {
            this.updateActivePlaylistIndex(confineToRange(0, newAudioPlaylist.length - 1, activePlaylistIndex + 1))
        }
    }

    onLoadSettings = (e, i, isDisabled) => {
        if (isDisabled || this.props.isPlaying) return
        const { audioPlaylist } = this.props
        const selectedItem = { ...audioPlaylist[i] }
        const preset = createPreset(selectedItem)
        this.props.actions.applyPreset(preset)
    }

    onLockTrack = (e, i) => {
        if (this.props.isPlaying) return
        const { audioPlaylist } = this.props
        const playlistItem = audioPlaylist[i]
        const newAudioPlaylistItem = createPlaylistItem(playlistItem.id, playlistItem.audioTemplate, playlistItem.instruments, playlistItem.sequences, playlistItem.bpm, !playlistItem.isLocked)
        const newAudioPlaylist = update(i, newAudioPlaylistItem, audioPlaylist)

        this.props.actions.updateAudioPlaylist(newAudioPlaylist)
    }

    onGenerationStart = () => {
        this.setState({ isLoading: true })
    }

    onGenerate = (playlistItem) => {
        this.setState({ isLoading: false })
        this.props.actions.updateAudioPlaylist([
            ...this.props.audioPlaylist,
            playlistItem
        ])
    }

    render() {
        const { activePlaylistIndex, audioPlaylist, isPlaying } = this.props
        const listItems = audioPlaylist
            .map((item, i) => ({
                key: item.key,
                body: (
                    <div className="u-flex-row u-flex-justify">
                        <div className="u-flex-row u-align-center">
                            <BlockListButton
                                className={item.isLocked ? 'u-txt-positive' : ''}
                                onClick={e => this.onLockTrack(e, i)}
                                title="Lock Track"
                                icon="lock"
                            />

                            <div className="block-list__body u-pl0 u-txt-truncate">
                                Track {item.id} - {item.bpm}BPM - {item.sequences[0].bars} × {item.sequences[0].beats}
                            </div>
                        </div>
                        <div className="u-flex-row u-align-center">
                            <BlockListButton
                                className="is-disablable"
                                onClick={e => this.onLoadSettings(e, i, item.isLocked)}
                                title="Load Settings"
                                icon="gear"
                            />
                            <BlockListButton
                                className="is-disablable u-txt-negative"
                                onClick={e => this.onDelete(e, i, item.isLocked)}
                                title="Delete"
                                icon="cross"
                            />
                            <BlockListButton
                                className="is-disablable u-txt-positive"
                                onClick={e => this.onDuplicate(e, i, item.isLocked)}
                                title="Duplicate"
                                icon="plus"
                            />
                        </div>
                    </div>
                ),
                className: `${activePlaylistIndex === i ? 'is-active' : ''} ${isPlaying || item.isLocked ? 'functionality-is-disabled' : ''}`,
            }))

        return (
            <div>
                <div className="u-mb05">
                    <ReorderableList
                        listItems={listItems}
                        onListItemClick={this.onListItemClick}
                        onReorder={this.onReorder}
                    />
                </div>
                {
                    audioPlaylist.length > 0 && (audioPlaylist.length < this.trackLimit)
                    ? (
                        <Generator
                            audioPlaylist={ this.props.audioPlaylist }
                            bpm={ this.props.bpm }
                            sequences={ this.props.sequences }
                            instruments={ this.props.instruments }
                            onGenerationStart={ this.onGenerationStart }
                            onGenerationEnd={ this.onGenerate }
                            wrapperClass="button-primary button-primary--full button-primary--gamma"
                            wrapperComponent='button'
                        >
                            <div className="u-flex-row u-flex-justify-center">
                                <SVG className={`button-primary__svg-icon u-txt-light ${this.state.isLoading ? 'u-anim-spin' : ''}`} icon="plus" />
                            </div>
                        </Generator>
                    ) : null
                }

            </div>
        )
    }
}

const BlockListButton = props => (
    <div
        className={`block-list__button block-list__content-spacing ${props.className}`}
        onClick={ props.onClick }
        title={ props.title }
    >
        <SVG className="block-list__button-icon" icon={props.icon} />
    </div>
)

const mapStateToProps = state => ({
    activePlaylistIndex : state.sound.activePlaylistIndex,
    audioPlaylist       : state.sound.audioPlaylist,
    isPlaying           : state.sound.isPlaying,
    bpm                 : state.config.bpm,
    sequences           : state.sequences,
    instruments         : state.instruments,
})

const mapDispatchToProps = (dispatch) => {
    const actions = {
        applyPreset,
        updateAudioPlaylist,
        updateActivePlaylistIndex,
        updateIsPlaying,
    }
    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEditor)
