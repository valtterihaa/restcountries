import React from 'react';
import {Link} from 'react-router-dom';

// export class Header extends React.Component {
//     // constructor(props){
//     //     super(props)
//     // }

//     render(){
//         return (
//             <Link to="/"><header>RestCountries</header></Link>
            
//         )
//     }
// }

function Header(){
    return (
    <header>
        <Link to="/">
            <h1>RestCountries</h1>
        </Link>
        <Link to="/usr/info">
            <p className="info">ⓘ</p>
        </Link>
    </header>)
}

export default Header