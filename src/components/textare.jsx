import React, { Component } from 'react'
import translate from './translate';
import google from '@google-cloud/translate';
const doIt = new google.Translate();


export default class textare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    onChange = (event) => {
        this.setState({ value: event.target.value })
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.setState({ value: this.state.value });
        debugger;
        const text = this.state.value;
        const target = 'jp';
        doIt
            .translate(text, target)
            .then(results => {
                let translations = results[0];
                translations = Array.isArray(translations)
                    ? translations
                    : [translations];

                console.log('Translations:');
                translations.forEach((translation, i) => {
                    console.log(`${text[i]} => (${target}) ${translation}`);
                });
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
        debugger;
        console.log(this.state.value);

    }
    render() {
        return (
            <div>
                <div>Enter a word</div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.value} onChange={this.onChange}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
