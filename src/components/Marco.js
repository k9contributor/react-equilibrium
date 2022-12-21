import React from 'react';

export default class Marco extends React.Component {
    componentDidMount() {
        let store = this.context;
        
        store.counter = 1;

        setInterval(() => {
            store.counter++;
        }, 1000);
    }

    render() {
        let store = this.context;

        return (<div className="Marco">
            Marco: { store.counter }
        </div>);
    }
}