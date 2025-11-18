
const FilterContacts = ({ searchStr, handleSearch }) => {
    return (
        <div>
            Filter shown with <input type="text" value={searchStr} onChange={handleSearch}/>
        </div>
    )
};

export default FilterContacts;
