import { Link } from 'react-router-dom';
import { BiMoviePlay } from 'react-icons/bi';

import "./header.css";

const Header: React.FC = () => {

    return (
        <header>
            <Link
                to="/"
                className="logo"
            >
                Prime<b>Flix</b>
            </Link>
            <Link
                to="/favoritos"
                className="favoritos"
            >
                <BiMoviePlay size='1.2rem'/>
                Meus Filmes
            </Link>
        </header>
    );
}

export default Header;