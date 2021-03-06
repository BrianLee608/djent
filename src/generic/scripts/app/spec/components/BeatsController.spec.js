import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import BeatsController from 'components/BeatsController'

const sequence = {
    id    : 'total',
    bars  : 8,
    beats : 4,
}

describe('<BeatsController />', () => {
    it('displays the relevant bars and beats given in a sequence', () => {
        const onUpdate = sinon.spy()
        const props = {
            onUpdate,
            sequence
        }
        const wrapper = mount(<BeatsController {...props} />)
        const inputBars = wrapper.find(`#${sequence.id}-bars`)
        const inputBeats = wrapper.find(`#${sequence.id}-beats`)

        expect(inputBars)
            .to.have.value(sequence.bars.toString())
        expect(inputBeats)
            .to.have.value(sequence.beats.toString())
    })

    it('calls onUpdate when bars have changed', (done) => {
        const newVal = 10
        const onUpdate = sinon.spy()
        const props = {
            onUpdate: (...args) => onUpdate(...args) || assertions(),
            sequence
        }
        const wrapper = mount(<BeatsController {...props} />)
        const inputBars = wrapper.find(`#${sequence.id}-bars`)
            .simulate('change', {target: {value: newVal}})

        function assertions() {
            expect(onUpdate.calledWith(sequence.id, 'bars', newVal))
                .to.equal(true)
            done()
        }
    })

    it('calls onUpdate when beats have changed', (done) => {
        const newVal = 1
        const onUpdate = sinon.spy()
        const props = {
            onUpdate: (...args) => onUpdate(...args) || assertions(),
            sequence
        }
        const wrapper = mount(<BeatsController {...props} />)
        const inputBars = wrapper.find(`#${sequence.id}-beats`)
            .simulate('change', {target: {value: newVal}})

        function assertions() {
            expect(onUpdate.calledWith(sequence.id, 'beats', newVal))
                .to.equal(true)
            done()
        }
    })
})
