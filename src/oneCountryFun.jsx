import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const OneCountryFun = () => {
    const [country, setCountry] = useState({
        name:'',
        languages:[],
        population:'',
        callingCodes:[],
        currencies:[],
        topLevelDomain:[],
        borderingCountries:[]
    })
    // const [country, setCountry] = useState([])
    // const [languages, setLanguages] = useState([])
    // const [currencies, setCurrencies] = useState([])
    // const [callingCodes, setCallingCodes] = useState([])
    // const [population, setPopulation] = useState('')
    // const [topLevelDomain,setTopLevelDomain] = useState([])
    // const [borderingCountries, setBorderingCountries] = useState([])
    const [countryCodeFromURL, setCountryCodeFromURL] = useState('')

            // country:[],
            // languages:[],
            // currencies:[],
            // callingCodes:[],
            // population:'',
            // topLevelDomain: [],
            // neighbors:[],
            // countryCodeFromURL:'',

    function getData(){
        setCountryCodeFromURL(window.location.pathname)
        console.log(countryCodeFromURL)
        let requestURL = `https://restcountries.eu/rest/v2/alpha${countryCodeFromURL}`
        console.log(requestURL)
        console.log(countryCodeFromURL, window.location.pathname)
        axios.get(requestURL)
            .then(res => {
                console.log(res.data)
                setCountry({...country,name:res.data.name,languages:res.data.languages,population:res.data.population,callingCodes:res.data.callingCodes,currencies:res.data.currencies,topLevelDomain:res.data.topLevelDomain,borderingCountries:res.data.borders})
            })
            .then(console.log(country.name))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    },[])

    
        // let c = this.state.country
        // let l = this.state.languages
        // let m = this.state.currencies
        // let cc = this.state.callingCodes
        // let ppl = this.state.population
        // let tld = this.state.topLevelDomain
        // let n = this.state.neighbors

        // let langs = l.map(l => <div className="multi-info-piece" key={l.nativeName}>{l.name}</div>)
        // let callCodes = cc.map(cc => <div className="multi-info-piece" key={cc}>{cc}</div>)
        // let monies = m.map(m => <div className="multi-info-piece" key={m.name}>{m.name}</div>)
        // let domain = tld.map(tld => <div className="multi-info-piece" key={tld}>{tld}</div>)
        // let neigh = n.map(n => 
        //     <div className="multi-info-piece neighbor-flag" key={n}>
        //         <Link to={n}>
        //             <div>{n}</div>
        //             <img src={`https://restcountries.eu/data/${n.toLowerCase()}.svg`} alt={`The flag of ${n}`} />
        //         </Link>
        //     </div>
        // )

        // const showInfo = () => {
        //     console.log(this.state.countryCodeFromURL)
        // }
        
        return (
            <main>
            <section className="one-country-page">
                <div>Henlo this is functional oneCountry</div>
                {/* <h1>{c.name}</h1>
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
                    
                    
                </div> */}
                
            </section>
            </main>
        )
    
}