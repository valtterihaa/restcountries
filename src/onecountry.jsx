import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Loading } from './loading';

export const OneCountry = () => {
    const [country, setCountry] = useState({
        name:'',
        flag:'',
        capital:'',
        languages:[],
        population:'',
        callingCodes:[],
        currencies:[],
        topLevelDomain:[],
        borderingCountries:[]
    })
    const linkData = useParams()

    const getData = () => {
        const requestURL = `https://restcountries.com/v3.1/alpha?codes=${linkData.alpha3Code}`
            axios.get(requestURL)
                .then(res => {
                    const info = res.data[0]
                    console.log(info.languages)
                    setCountry({
                        name:info.name.common,
                        flag:info.flags.svg,
                        capital:info.capital,
                        languages:info.languages,
                        population:info.population,
                        currencies:info.currencies,
                        topLevelDomain:res.data.topLevelDomain,
                        // borderingCountries:info.borders
                    })
                })
                .catch(err => console.log(err))    
    }

    useEffect(() => {
        getData()
    },[linkData]) // eslint-disable-line react-hooks/exhaustive-deps
    // was getting a warning about a missing dependency getData, comment above prevents the warning as adding getData produces another warning

    const languageKeys = Object.keys(country.languages)
    const currencyKeys = Object.keys(country.currencies)
    // if (country.borderingCountries){
    //     console.log("neighbors",country.borderingCountries)
    //     neighbors = country.borderingCountries.map(n => {
    //         return (<div key={n}><Link to={n}>
    //             <img src={`https://restcountries.com/data/${n.toLowerCase()}.svg`} alt={`The flag of ${n}`} />
    //         </Link></div>)
    //     })
    // } else {
    //     neighbors = (
    //         <div>This country has no border neighbors</div>
    //     )
    // }
    
    console.log(country.currencies)
    const listLanguages = languageKeys.map(l => (<li key={l}>{country.languages[l]}</li>))
    const listCurrencies = currencyKeys.map(c => {
        console.log(c)
        return (<li key={c}>{country.currencies[c].name}</li>)
    })
    // const newList = country.languages.map(l => {
    //     console.log("in newList",l)
    // })

    // if (country.currencies){
    //     listCurrencies = country.currencies.map(c =>{
    //         return (<div key={c.name}>{c.name}</div>)
    //     })    
    // } else {
    //     listCurrencies = (<div>This country has no currency</div> )
    // }
    

    // const listCallingCodes = country.callingCodes.map(cc =>{
    //     return (<div key={cc}>
    //         +{cc}
    //     </div>)
    // })

    // const listDomains = country.topLevelDomain.map(tld =>{
    //     return (<div key={tld}>
    //         {tld}
    //     </div>)
    // })
        
        return (
            <main>
            {country.flag ? <>
                <section className="one-country-page">
                    <h1>{country.name}</h1>
                    <img className="large-flag" src={country.flag} alt={`The flag of ${country.name}`} />
                    <div className="one-country-info">
                        <div className="one-country-info-divide">
                            <div className="one-country-info-snippet single-info">
                                <h3>Capital city:</h3> <div>{country.capital}</div> 
                            </div>
                            <div className="one-country-info-snippet single-info">
                                <h3>Population:</h3> <div>{country.population.toLocaleString()}</div> 
                            </div>
                        </div>
                        <div className="one-country-info-divide">
                            <div className="one-country-info-snippet multi-info">
                                <h3>Languages:</h3>
                                <div>{listLanguages}</div>
                            </div>
                            <div className="one-country-info-snippet multi-info">
                                <h3>Currencies:</h3>
                                <div>{listCurrencies}</div>
                            </div>
                            <div className="one-country-info-snippet multi-info">
                                <h3>Some info:</h3>
                                {/* <div>{listDomains}</div> */}
                            </div>
                            <div className="one-country-info-snippet multi-info">
                                <h3>Some info:</h3>
                                {/* <div>{listDomains}</div> */}
                            </div>
                        </div>
                        {/* <div className="one-country-info-divide">
                            <div className="one-country-info-snippet multi-info neighbor-info">
                                <h3>Bordering countries:</h3>
                                <div className="neighbor-flags">{neighbors}</div>
                            </div>
                        </div> */}
                    </div>
                </section>
            </>
            : <div className="center"><Loading /></div>}
            </main>
        )
    
}