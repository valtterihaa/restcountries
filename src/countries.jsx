import React from 'react';
import axios from 'axios';


export class Countries extends React.Component {
    constructor(props){
        super(props);
        this.state = {filter:'',countries:[],sortOrder:'name'}
    }

    componentDidMount(){
        axios.get('https://restcountries.eu/rest/v2/all')
            .then((res) => {
                this.setState({countries:res.data})
            })
            .catch((err) => {
                console.log(err)
            })
            .then(() => {
                //
            })
    }

    textChanged(ev){
        console.log(ev.target);
        this.setState({filter:ev.target.value});
    }

    render(){
        let {filter,sortOrder} = this.state;
        let filtered = this.state.countries.filter(
            c => 
            c.name.toLowerCase().includes(filter.toLowerCase())
        );
        filtered.sort((a,b) => a[sortOrder].localeCompare(b[sortOrder]));
        let stuffs = filtered.map(c => 
            {
                let pop = c.population.toLocaleString();
                return (
                    <div key={c.alpha3Code} className="country-card">
                        <img src={c.flag} alt={`The flag of ${c.name}`} />
                        <div className="country-info">
                            <h2>{c.name}</h2>
                            <h3>{c.capital}</h3>
                            <h3>{pop}</h3>
                        </div>
                    </div>
                )
            }
        );
        return (
            <div>
                <div>
                    <input id="filter" className="country-filter" value={this.state.filter} onChange={ev => this.textChanged(ev)} placeholder="search by name" />
                </div>
                <div className="all-countries">
                    {stuffs}
                </div>
            </div>
        )
    }
}

