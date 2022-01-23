import { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div className='title'>
                { this.props.title }
            </div>
        );
    }
}