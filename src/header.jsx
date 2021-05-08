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
    return <Link to="/"><header>RestCountries</header></Link>
}

export default Header