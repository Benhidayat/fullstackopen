import Part from "./Part";

const Content = ({ parts }) => {
    console.log(parts)
    return (
        <ul>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </ul>
    )
};

export default Content;
