import React from 'react'


const PersonForm = ({onSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => {
    return(
    <form onSubmit={onSubmit}>
    <div>
        name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
        <button type="submit">add</button>
    </div>
    </form>
    )
}

export default PersonForm