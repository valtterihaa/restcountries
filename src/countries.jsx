import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export class Countries extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filter:'',
            region:'',
            subr:'',
            subreg:[],
            countries:[],
            sortOrder:'name'}
    }

    componentDidMount(){
        axios.get('https://restcountries.eu/rest/v2/all')
            .then((res) => {
                this.setState({
                    countries:res.data,
                    subreg:res.data.map(d => {
                        return d.subregion
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    textChanged(ev){
        // console.log(ev.target.value);
        this.setState({[ev.target.id]:ev.target.value});
    }

    render(){
        
        let {filter,sortOrder,subr} = this.state;
        let subs = Array.from(new Set(this.state.subreg))
        let subregions = subs.filter(Boolean);
        let srfilter = subregions.map(sr => {
            return <option key={sr}>{sr}</option>
        })
        let filtered = this.state.countries.filter(
            c => 
            c.name.toLowerCase().includes(filter.toLowerCase())
            &&
            c.subregion.toLowerCase().includes(subr.toLowerCase())
        );
        if (sortOrder === 'name' || sortOrder === 'region') filtered.sort((a,b) => a[sortOrder].localeCompare(b[sortOrder]));
        if (sortOrder === 'population') filtered.sort((a,b) => a[sortOrder]-b[sortOrder])
            
        let stuffs = filtered.map(c => 
            {
                let pop = c.population.toLocaleString();
                // country card return
                return (
                    <div key={c.alpha3Code} className="country-card">
                        <img src={c.flag} alt={`The flag of ${c.name}`} />
                        <div className="country-info-wrapper">
                            <div className="country-info">
                                <h2>{c.name}</h2>
                                <h3>{c.region}</h3>
                                <h3>{pop}</h3>
                            </div>
                            <div className="learn-more-wrapper">
                                <Link to={c.alpha3Code}>
                                    <div className="learn-more">Learn More</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        );


        // Main return
        return (
            <div>
                <div className="country-filters">
                    <div>
                        <select name="sortOrder" id="sortOrder" className="country-filter" value={this.state.sortOrder} onChange={ev => this.textChanged(ev)}>
                            <option value="name">Name</option>
                            <option value="population">Population</option>
                            <option value="region">Region</option>
                        </select>
                    </div>
                    <div>
                        <select name="subr" id="subr" className="country-filter" value={this.state.subr} onChange={ev => this.textChanged(ev)} >
                            <option value="">Subregion</option>
                            {srfilter}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="filter" className="hide">Filter by name</label>
                        <input id="filter" className="country-filter" value={this.state.filter} onChange={ev => this.textChanged(ev)} placeholder="filter by name" />
                    </div>
                    

                </div>
                <div className="all-countries">
                    {stuffs}
                </div>
            </div>
        )
    }
}

