import React from 'react';
import axios from 'axios';

export class OneCountry extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            country:[],
            languages:[],
            currencies:[],
            callingCodes:[],
            population:'',
            topLevelDomain: [],
        }
    }

    componentDidMount(){
        axios.get(`https://restcountries.eu/rest/v2/alpha${window.location.pathname}`)
            .then(res => {
                this.setState({
                    country:res.data,
                    languages:res.data.languages.map(l => l),
                    population:res.data.population.toLocaleString(),
                    callingCodes:res.data.callingCodes.map(cc => cc),
                    currencies:res.data.currencies.map(m => m),
                    topLevelDomain:res.data.topLevelDomain.map(tld => tld)
                })
            })
            .catch(err => console.log(err))
    }

    render(){
        let c = this.state.country
        let l = this.state.languages
        let m = this.state.currencies
        let cc = this.state.callingCodes
        let ppl = this.state.population
        let tld = this.state.topLevelDomain

        let langs = l.map(l => <div key={l.nativeName}>{l.name}</div>)
        let callCodes = cc.map(cc => <div key={cc}>{cc}</div>)
        let monies = m.map(m => <div key={m.name}>{m.name}</div>)
        let domain = tld.map(tld => <div key={tld}>{tld}</div>)
        
        return (
            <div className="one-country-page" key={c.alpha3Code}>
                <h1>{c.name}</h1>
                <img className="large-flag" src={c.flag} alt={`The flag of ${c.name}`} />
                <div className="one-country-info">
                    <div className="one-country-info-snippet">
                        <h3>Capital city</h3>
                        <div>{c.capital}</div>
                    </div>
                    <div className="one-country-info-snippet">
                        <h3>Population</h3>
                        <div>{ppl}</div>
                    </div>
                    <div className="one-country-info-snippet">
                        <h3>Languages</h3>
                        <div>{langs}</div>
                    </div>
                    <div className="one-country-info-snippet">
                        <h3>Currencies</h3>
                        <div>{monies}</div>
                    </div>
                    <div className="one-country-info-snippet">
                        <h3>Calling codes</h3>
                        <div>{callCodes}</div>
                    </div>
                    <div className="one-country-info-snippet">
                        <h3>Domain</h3>
                        <div>{domain}</div>
                    </div>
                </div>
                
            </div>
        )
    }
}