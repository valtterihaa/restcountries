import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            neighbors:[],
            // neighborCode:[],
            // neighborFlag:[],
        }
    }

    componentDidMount(){
        axios.get(`https://restcountries.eu/rest/v2/alpha${window.location.pathname}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    country:res.data,
                    languages:res.data.languages.map(l => l),
                    population:res.data.population.toLocaleString(),
                    callingCodes:res.data.callingCodes.map(cc => cc),
                    currencies:res.data.currencies.map(m => m),
                    topLevelDomain:res.data.topLevelDomain.map(tld => tld),
                    neighbors:res.data.borders.map(borders => borders)
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
        let n = this.state.neighbors

        let langs = l.map(l => <div className="multi-info-piece" key={l.nativeName}>{l.name}</div>)
        let callCodes = cc.map(cc => <div className="multi-info-piece" key={cc}>{cc}</div>)
        let monies = m.map(m => <div className="multi-info-piece" key={m.name}>{m.name}</div>)
        let domain = tld.map(tld => <div className="multi-info-piece" key={tld}>{tld}</div>)
        let neigh = n.map(n => 
            <div className="multi-info-piece neighbor-flag" key={n}>
                <Link to={n}>
                    <div>{n}</div>
                    <img src={`https://restcountries.eu/data/${n.toLowerCase()}.svg`} alt={`The flag of ${n}`} />
                </Link>
            </div>
        )
        
        return (
            <main>
            <section className="one-country-page" key={c.alpha3Code}>
                <h1>{c.name}</h1>
                <img className="large-flag" src={c.flag} alt={`The flag of ${c.name}`} />
                <div className="one-country-info">
                    <div className="one-country-info-divide">
                        <div className="one-country-info-snippet single-info">
                            <h3>Capital city:</h3> <div>{c.capital}</div> 
                        </div>
                        <div className="one-country-info-snippet single-info">
                            <h3>Population:</h3> <div>{ppl}</div> 
                        </div>
                        
                    </div>
                    <div className="one-country-info-divide">
                        <div className="one-country-info-snippet multi-info">
                            <h3>Languages:</h3>
                            <div>{langs}</div>
                        </div>
                        <div className="one-country-info-snippet multi-info">
                            <h3>Currencies:</h3>
                            <div>{monies}</div>
                        </div>
                        <div className="one-country-info-snippet multi-info">
                            <h3>Calling codes:</h3>
                            <div>{callCodes}</div>
                        </div>
                        <div className="one-country-info-snippet multi-info">
                            <h3>Domains:</h3>
                            <div>{domain}</div>
                        </div>
                        
                    </div>
                    <div className="one-country-info-divide">
                        <div className="one-country-info-snippet multi-info neighbor-info">
                            <h3>Bordering countries:</h3>
                            <div className="neighbor-flags">{neigh}</div>
                        </div>
                    </div>
                    
                    
                </div>
                
            </section>
            </main>
        )
    }
}