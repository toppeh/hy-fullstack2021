import React from 'react'
import Delete from './Delete'

const Contact = ({ name, number }) => <>{name} {number} </>

const Persons = ({ persons, filter, handleDelete }) => {
    return (
        <div>
        {persons.map(person => {
            if (person.name.toLowerCase().includes(filter.toLowerCase()))
                return ( 
                    <div>
                    <Contact key={person.name} name={person.name} number={person.number}/>
                    <Delete key={`${person.name}Btn`} handleDelet={() => handleDelete(person.id)}></Delete>
                    </div>
                )
            else return <></>
        })}
        </div>
    )
}
export default Persons