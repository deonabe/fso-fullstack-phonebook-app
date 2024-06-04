import Person from "./Person.jsx"

const Persons = ({persons, handleDeleteOnClick}) => {
    
    return (
        <table>
            <tbody>
                {persons.map(person => <Person key={person.id} person={person} handleDeleteOnClick={handleDeleteOnClick}/>)}
            </tbody>
        </table>
    )
}

export default Persons