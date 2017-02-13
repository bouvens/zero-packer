import React, { PropTypes } from 'react'

const noOperation = () => {}

export class LabeledConnector extends React.Component {
    static propTypes = {
        state: PropTypes.object,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        children: PropTypes.array,
    }

    static defaultProps = {
        state: {},
        onChange: noOperation,
        onClick: noOperation,
        onFocus: noOperation,
    }

    render () {
        return (
            <div>
                {React.Children.map(
                    this.props.children,
                    (child) => (
                        typeof child.type === 'function'
                            ? React.cloneElement(child, {
                                state: this.props.state,
                                onChange: this.props.onChange,
                                onClick: this.props.onClick,
                                onFocus: this.props.onFocus,
                            })
                            : child
                    )
                )}
            </div>
        )
    }
}
