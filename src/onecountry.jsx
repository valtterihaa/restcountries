import React from 'react';
import axios from 'axios';
// import {useParams} from 'react-router-dom';

export class OneCountry extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            country:[],
            languages:[],
            currencies:[],
            population:'',
        }
    }

    componentDidMount(){
        axios.get(`https://restcountries.eu/rest/v2/alpha${window.location.pathname}`)
            .then(res => {
                this.setState({
                    country:res.data,
                    languages:res.data.languages.map(l => {
                        return l
                    }),
                    population:res.data.population.toLocaleString(),
                    currencies:res.data.currencies.map(m => {
                        return m
                    })
                })
            })
            .catch(err => console.log(err))
    }

    render(){
        let c = this.state.country;
        let l = this.state.languages;
        let m = this.state.currencies;
        let ppl = this.state.population;
        console.log(c);
        console.log(l);
        console.log(ppl);

        let langs = l.map(l => {
            return (
                <div key={l.nativeName}>{l.name}</div>
            )
        })

        let monies = m.map(m => {
            return (
                <div key={m.name}>{m.name}</div>
            )
        })
        
        return (
            <div className="one-country-page" key={c.alpha3Code}>
                
                <img className="large-flag" src={c.flag} alt={`The flag of ${c.name}`} />
                <div className="one-country-info">
                    <h1>{c.name}</h1>
                    <table className="one-country-table">
                        <tr>
                            <th>Capital city</th>
                            <th>Population</th> 
                            <th>Languages</th>
                            <th>Currencies</th>
                        </tr>
                        <tr>
                            <td>{c.capital}</td>
                            <td>{ppl}</td>
                            <td>{langs}</td>
                            <td>{monies}</td>
                        </tr>
                    </table>
                </div>
                
            </div>
        )
    }
}