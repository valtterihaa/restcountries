import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const AllCountries = () => {
    const [allData,setAllData] = useState([])
    const [subRegions, setSubRegions] = useState([])
    const [sortOrder, setSortOrder] = useState('name')
    const [filter, setFilter] = useState('')
    const [subr, setSubr] = useState('')
    const [hasLoaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all')
            .then(res => {
                setAllData(res.data)
                console.log(res.data)
                setSubRegions(res.data.map(data => {
                    return data.subregion
                }))
                setLoaded(true)
            })
            .catch(err => {console.log(err)})
    },[])

    const subRegionChanged = ev => setSubr(ev.target.value)
    const sortOrderChanged = ev => setSortOrder(ev.target.value)
    const textChanged = ev => setFilter(ev.target.value)

    let subregions = Array.from(new Set(subRegions))
    subregions.filter(Boolean);
    let srfilter = subregions.map(sr => <option key={sr}>{sr}</option>)
    let filtered = allData.filter(c =>
        c.name.toLowerCase().includes(filter.toLowerCase())
        &&
        c.subregion.toLowerCase().includes(subr.toLowerCase())
    )
    if (sortOrder === 'name' || sortOrder === 'region') filtered.sort((a,b) => a[sortOrder].localeCompare(b[sortOrder]));
    if (sortOrder === 'population') filtered.sort((a,b) => a[sortOrder]-b[sortOrder])
    if (sortOrder === 'population-higher') filtered.sort((a,b) => b['population']-a['population'])

    let countryInfos = filtered.map(c => 
        {
            let population = c.population.toLocaleString()
            return (
                <div key={c.alpha3Code} className="country-card">
                    <picture>
                        <img src={c.flag} alt={`The flag of ${c.name}`} />
                    </picture>
                    {/* <picture className="country-list-image">
                        <source srcSet={c.flags[1]} media="(min-height: 200px)" /> */}
                        
                    {/* </picture> */}
                    
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
                        <option value="">Show all subregions</option>
                        {srfilter}
                    </select>
                </div>
                <div>
                    <label htmlFor="filter" className="hide">Filter by name</label>
                    <input id="filter" className="country-filter" value={filter} onChange={ev => textChanged(ev)} placeholder="filter by name" />
                </div>
            </div>
            <section className="main-page-listings">
                <div className="all-countries">
                    {hasLoaded ? <>
                    {countryInfos}
                    </> 
                    : <div className="center">
                        {/* <Loading /> */}
                    </div>}
                </div>
            </section>
        </main>
    </>)
}