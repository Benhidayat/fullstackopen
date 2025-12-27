import { useDispatch } from "react-redux";
import { createFilter } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const filter = e.target.value;
        dispatch(createFilter(filter));
    };

    const style = {
        marginBottom: '10px'
    };
    return (
        <div style={style}>
            filter <input type="text"  onChange={handleChange}/>
        </div>
    )
};

export default Filter;
