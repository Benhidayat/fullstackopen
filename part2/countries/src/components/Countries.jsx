import List from "./List";

const Countries = ({ countries }) => {


    return (
        <ul>
            {countries.map(c => <List key={c.id} country={c} />)}
        </ul>
    )
};

export default Countries;
