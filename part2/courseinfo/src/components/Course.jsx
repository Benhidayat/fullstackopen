import Header from "./Header";

const Course = ({ course }) => {
    console.log(course)
    return (
        <div>
            <Header heading={course.name} />
        </div>
    )
};

export default Course;
