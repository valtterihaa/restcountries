import { Link } from "react-router-dom"

export const CountryCard = props => {
    const infos = [...props.props]
        return (<>{infos.map(c => {
        // let population = c.population.toLocaleString()
            return(<div key={c.alpha3Code} className="country-card">
                <picture>
                    <img src={c.flag} alt={`The flag of ${c.name}`} />
                </picture>
                <div className="country-info-wrapper">
                    <div className="country-info">
                        <h2>{c.name}</h2>
                        <h3>{c.region}</h3>
                        <h3>{c.population.toLocaleString()}</h3>
                    </div>
                    <div className="learn-more-wrapper">
                        <Link to={c.alpha3Code}>
                            <button className="learn-more">Learn More</button>
                        </Link>
                    </div>
                </div>
            </div>)
        })
    }</>)
    
}



