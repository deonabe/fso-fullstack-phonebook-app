const PersonForm = ({addContact, newName, newNumber, handleNameOnChange, handleNumberOnChange}) => {
    return (
        <form onSubmit={addContact}>
            <div>
                name: <input value={newName} onChange={handleNameOnChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberOnChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}

export default PersonForm