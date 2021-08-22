import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const CountryFun = () => {
    const [allData,setAllData] = useState([])
    const [subRegions, setSubRegions] = useState([])
    const [sortOrder, setSortOrder] = useState('name')
    const [sortByLow, setSortByLow] = useState(true)
    const [filter, setFilter] = useState('')
    const [subr, setSubr] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                setAllData(res.data)
                setSubRegions(res.data.map(subregion => {
                    return subregion.subregion
                }))
            })
            .catch(err => {console.log(err)})
    },[])

    const subRegionChanged = ev => {
        setSubr(ev.target.value)
    }

    const sortOrderChanged = ev => {
        if (ev.target.value === 'population') {
            setSortByLow(true)
            setSortOrder('population')
        }
        if (ev.target.value === 'population-higher') {
            setSortByLow(false)
            setSortOrder('population-higher')
            console.log(sortOrder,sortByLow,filter,subr)
        }
        if (ev.target.value === 'name') setSortOrder('name')
        if (ev.target.value === 'region') setSortOrder('region')
    }

    const textChanged = ev => {
        setSortByLow(true)
        setFilter(ev.target.value)
    }

    let subs = Array.from(new Set(subRegions))
    let subregions = subs.filter(Boolean);
    let srfilter = subregions.map(sr => {
        return <option key={sr}>{sr}</option>
    })
    
    let filtered = allData.filter(
        c => 
        c.name.toLowerCase().includes(filter.toLowerCase())
        &&
        c.subregion.toLowerCase().includes(subr.toLowerCase())
    )
    console.log(filtered)
    if (sortOrder === 'name' || sortOrder === 'region') filtered.sort((a,b) => a[sortOrder].localeCompare(b[sortOrder]));
    if (sortOrder === 'population' && sortByLow===true) {
        filtered.sort((a,b) => a[sortOrder]-b[sortOrder])
    }
    if (sortOrder === 'population-higher') {
        filtered.sort((a,b) => b[sortOrder]-a[sortOrder])
    }

    let countryInfos = filtered.map(c => 
        {
            let population = c.population.toLocaleString()
            return (
                <div key={c.alpha3Code} className="country-card">
                    <img src={c.flag} alt={`The flag of ${c.name}`} />
                    <div className="country-info-wrapper">
                        <div className="country-info">
                            <h2>{c.name}</h2>
                            <h3>{c.region}</h3>
                            <h3>{population}</h3>
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
    )

    return (<>
        <main>
            <div className="country-filters">
                <div>
                    <select name="sortOrder" id="sortOrder" className="country-filter" value={sortOrder} onChange={ev => sortOrderChanged(ev)}>
                        <option value="name">Name</option>
                        <option value="population">Population (lowest first)</option>
                        <option value="population-higher">Population (highest first)</option>
                        <option value="region">Region</option>
                    </select>
                </div>
                <div>
                    <select name="subr" id="subr" className="country-filter" value={subr} onChange={ev => subRegionChanged(ev)} >
                        <option value="">Subregion</option>
                        {srfilter}
                    </select>
                </div>
                <div>
                    <label htmlFor="filter" className="hide">Filter by name</label>
                    <input id="filter" className="country-filter" value={filter} onChange={ev => textChanged(ev)} placeholder="filter by name" />
                </div>
            </div>
            <div className="all-countries">
                {countryInfos}
            </div>
        </main>
    </>)
}