import React from 'react';
import  {Text}  from 'react-native';
import PropTypes from 'prop-types';

export default function Saludar(props){
    // const {firstName="Erick", lastName ="Lopez"} = props
    const {firstName, lastName} = props
    return (
        <Text>Hola querido ser {firstName} {lastName}</Text>
    )
}

// Saludar.defaultProps = {
//     firstName: "Erick",
//     lastName: "Lopez"
// }

Saludar.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
}