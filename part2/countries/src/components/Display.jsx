import SingleCountry from "./SingleCountry";
import Countries from "./Countries";

const Display = ({ countries }) => {

    return (
        <div>
            {countries.length > 10
                ? <p>Too many matches, specify another filter.</p>
                : countries.length === 1
                    ? <SingleCountry country={countries[0]} show={true} />
                    : <Countries countries={countries} />
            }
        </div>
    )
};

export default Display;
