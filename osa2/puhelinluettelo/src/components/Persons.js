import React from 'react'

const Contact = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ persons, filter }) => {
    return (
        <div>
        {persons.map(person => {
            if (person.name.toLowerCase().includes(filter.toLowerCase()))
                return <Contact key={person.name} name={person.name} number={person.number}/>
            else return <></>
        })}
        </div>
    )
}
export default Persons