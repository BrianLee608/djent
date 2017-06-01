import React, { Component } from 'react'
import { filterOutKeys, throttle } from 'utils/tools'

class InputBox extends Component {
    isFocused = false
    state = {
        isValid: true
    }

    componentDidMount = () => {
        this.errorCheck(this.props.defaultValue)
    }

    componentWillUpdate = (nextProps) => {
        if (!this.isFocused) this.updateValue(nextProps.defaultValue)
    }

    updateValue = (val) => {
        this.errorCheck(val)
        this.refs.input.value = val
    }

    onFocus = () => {
        this.isFocused = true
    }

    onBlur = () => {
        this.isFocused = false
        this.updateValue(this.props.defaultValue)
    }

    onChange = (e) => {
        e.persist()
        this.errorCheck(e.target.value)
        this.throttledOnChange(e)
    }

    errorCheck = (value) => {
        if (!value) return

        const { minVal, maxVal } = this.props

        if (
            (typeof minVal !== 'undefined' && value < minVal)
            || (typeof maxVal !== 'undefined' && value > maxVal)
        ) {
            if (this.state.isValid) this.setState({ isValid: false })
        } else if (!this.state.isValid) {
            this.setState({ isValid: true })
        }
    }

    throttledOnChange = this.props.onChange ? throttle(this.props.onChange, 100) : () => {}

    render = () => {
        const props = {
            id                 : '',
            type               : 'text',
            defaultValue       : '',
            defaultChecked     : '',
            onChange           : '',
            className          : 'input-base',
            containerClassName : 'input-container',
            labelClassName     : 'input-label-base',
            ...this.props,
        }
        const { containerClassName, labelClassName, label, labelTitle, id } = props
        const inputProps = filterOutKeys([
            'containerClassName',
            'labelClassName',
            'labelTitle',
            'minVal',
            'maxVal'
        ], props)
        const inputClass = inputProps.className
            ? inputProps.className
            : ''
        const validInputClass = this.state.isValid
            ? 'is-valid'
            : 'is-invalid'

        return (
            <div className={containerClassName}>
                {
                    label &&
                    <label
                        className={ labelClassName }
                        htmlFor={ id }
                        title={ labelTitle }
                    >
                        { label }:
                    </label>
                }
                <input
                    ref="input"
                    { ...inputProps }
                    className={`${inputClass} ${validInputClass}`}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                />
            </div>
        )
    }
}

export default InputBox
