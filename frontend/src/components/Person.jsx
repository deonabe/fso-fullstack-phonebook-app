const Person = ({person, handleDeleteOnClick}) => {
    return (
        <tr><td>{person.name} {person.number} <button onClick={handleDeleteOnClick(person)}>delete</button></td></tr>
    )
}

export default Person