import { useState } from "react";
import SingleCountry from "./SingleCountry";

const List = ({ country }) => {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };
    return (
        <li>
            {country.name.common}
            <button onClick={handleShow}>Show</button>
            <SingleCountry country={country} show={show} />
        </li>
    )
};

export default List;
