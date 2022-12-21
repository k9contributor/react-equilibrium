import React from 'react';

export default class Polo extends React.Component {
    render() {
        let store = this.context;

        return (<div className="Polo">
            Polo: { store.counter }
        </div>);
    }
}