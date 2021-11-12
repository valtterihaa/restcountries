import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"

export const AllCountries = () => {
    const [allData,setAllData] = useState([])
    // const [subRegions, setSubRegions] = useState([])
    const [sortOrder, setSortOrder] = useState('name.common')
    const [filter, setFilter] = useState('')
    const [subr, setSubr] = useState('')
    const [hasLoaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(res => {
                setAllData(res.data)
                // console.log("in then",res.data)
                // setSubRegions(res.data.map(data => {
                //     return data.subregion
                // }))
                setLoaded(true)
            })
            .catch(err => {console.log(err)})
    },[])

    const subRegionChanged = ev => setSubr(ev.target.value)
    const sortOrderChanged = ev => setSortOrder(ev.target.value)
    const textChanged = ev => setFilter(ev.target.value)
    console.log(sortOrder)

    // let subregions = Array.from(new Set(subRegions))
    // subregions.filter(Boolean);
    // let srfilter = subregions.map(sr => <option key={sr}>{sr}</option>)
    let filtered = allData.filter(c =>
        c.name.common.toLowerCase().includes(filter.toLowerCase())
        // &&
        // c.subregion.toLowerCase().includes(subr.toLowerCase())
    )
    if (sortOrder === 'name.common' || sortOrder === 'region') {
        filtered.sort((a,b) => {
            const name1 = a.name.common.toUpperCase()
            const name2 = b.name.common.toUpperCase()
            if (name1 < name2) return -1
            if (name1 > name2) return 1
            return 0
    })}
    if (sortOrder === 'population') filtered.sort((a,b) => a[sortOrder]-b[sortOrder])
    if (sortOrder === 'population-higher') filtered.sort((a,b) => b['population']-a['population'])
    console.log(filtered,"filtered")

    let countryInfos = filtered.map(c => 
        {
            // console.log(c.name.common)
            let population = c.population.toLocaleString()
            return (
                <div key={c.cca3} className="country-card">
                        <img src={c.flags.svg} alt={`The flag of ${c.name.common}`} />
                    
                    <div className="country-info-wrapper">
                        <div className="country-info">
                            <h2>{c.name.common}</h2>
                            <div className="statii">
                                {c.unMember && 
                                <span className="un-member status-item">UN 
                                    <span className="tooltip">This country is a UN member</span> 
                                </span>}
                                {c.independent && 
                                    <span className="independent status-item">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                        <span className="tooltip">This country is independent</span>
                                    </span>}
                            </div>
                            <h3>{c.region}</h3>
                            <h3>{population}</h3>
                        </div>
                        <div className="learn-more-wrapper">
                            <Link to={c.cca3}>
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
                        <option value="name.common">Name</option>
                        <option value="population">Population (lowest first)</option>
                        <option value="population-higher">Population (highest first)</option>
                        <option value="region">Region</option>
                    </select>
                </div>
                <div>
                    <select name="subr" id="subr" className="country-filter" value={subr} onChange={ev => subRegionChanged(ev)} >
                        <option value="">Show all subregions</option>
                        {/* {srfilter} */}
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