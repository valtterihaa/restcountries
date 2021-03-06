import axios from "axios"
import { useEffect, useState } from "react"
import { CountryCard } from "./countryCard"
import { Loading } from "./loading"

export const AllCountries = () => {
    const [allData,setAllData] = useState([])
    const [subRegions, setSubRegions] = useState([])
    const [sortOrder, setSortOrder] = useState('name')
    const [filter, setFilter] = useState('')
    const [subr, setSubr] = useState('')
    const [hasLoaded, setLoaded] = useState(false)
    
    // idea is to add a keydown event listener that changes the focus to the filter options; should make site navigable with just the keyboard
    // const handleKeyPress = ev => {
    //     if (ev.key === "s") {
    //         // set focus to the first sort option
    //         console.log("this is the key that should",setFocus())
    //     }
    // }

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
        // add keydown event so we can listen to "s" key
        // document.addEventListener('keydown', handleKeyPress)
        // return () => document.removeEventListener('keydown', handleKeyPress)
    },[])

    const subRegionChanged = ev => setSubr(ev.target.value)
    const sortOrderChanged = ev => setSortOrder(ev.target.value)
    const textChanged = ev => setFilter(ev.target.value)
    // const setFocus = () => {
    //     console.log(window)
    //     return "i am setFocus"
    // }
    


    let subregions = Array.from(new Set(subRegions))
    subregions.filter(Boolean);
    const srfilter = subregions.map(sr => <option key={sr}>{sr}</option>)
    let filtered = allData.filter(c =>
        c.name.toLowerCase().includes(filter.toLowerCase())
        &&
        c.subregion.toLowerCase().includes(subr.toLowerCase())
    )
    if (sortOrder === 'name' || sortOrder === 'region') filtered.sort((a,b) => a[sortOrder].localeCompare(b[sortOrder]));
    if (sortOrder === 'population') filtered.sort((a,b) => a[sortOrder]-b[sortOrder])
    if (sortOrder === 'population-higher') filtered.sort((a,b) => b['population']-a['population'])


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
                    <CountryCard props={filtered} />
                    </> 
                    : <div className="center">
                        <Loading />
                    </div>}
                </div>
            </section>
        </main>
    </>)
}