import React from 'react';
import axios from 'axios';
// import {useParams} from 'react-router-dom';

export class OneCountry extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            country:[],
            languages:[],
            population:'',
        }
    }

    // componentDidMount(){
    //     axios.get(this.props.match.params.id)
    //     axios.get(`https://restcountries.eu/rest/v2/alpha/col`)
    //         .then((res) => {
    //             this.setState({country:res.data})
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //         .then(() => {
    //             //console.log(res.data)
    //         })
    //     //console.log(this.props.location)
    // }

    componentDidMount(){
        axios.get(`https://restcountries.eu/rest/v2/alpha${window.location.pathname}`)
            .then(res => {
                console.log(res.data);
                // this.state.country.push(res.data);
                this.setState({
                    country:res.data,
                    languages:res.data.languages.map(l => {
                        return l
                    }),
                    population:res.data.population.toLocaleString()
                })
            })
            .catch(err => console.log(err))
            .then(res => console.log("in then",res))
    }

    render(){
        // let infos = this.state.country.map(c => {
        //     <div>
        //         {c.name}
        //     </div>
        // })
        let c = this.state.country;
        let l = this.state.languages;
        let ppl = this.state.population;
        console.log(c);
        console.log(l);
        console.log(ppl);

        let langs = l.map(l => {
            return (
                <div key={l.nativeName}>{l.name}</div>
            )
        })
        
        return (
            <div key={c.alpha3Code}>
                <img className="large-flag" src={c.flag} alt={`The flag of ${c.name}`} />
                <div>
                    <h1>{c.name}</h1>
                    <h2>{c.capital}</h2>
                    <h3>{ppl}</h3>
                    <h3>{langs}</h3>
                </div>
            </div>
        )
    }
}