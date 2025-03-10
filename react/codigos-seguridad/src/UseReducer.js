
import React, { useReducer, useEffect } from 'react';

const SECURITY_CODE = 'paradigma';

const initialState = {
    value: 'paradigma',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const actionTypes = {
    confirm: 'CONFIRM', 
    delete: 'DELETE',
    check: 'CHECK',
    error: 'ERROR',
    reset: 'RESET',
    write: 'WRITE',
}

const reducerObject = (state,payload) => ({
    "CONFIRM": {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    "WRITE":{
        ...state,
        value: payload
    },
    "ERROR": {
        ...state,
        error: true,
        loading: false,
    },
    "CHECK": {
        ...state,
        loading: true,
        error: false,
    },
    "DELETE": {
        ...state,
        deleted: true,
    },
    "RESET": {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}

function UseReducer({ name }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (state.loading) {
            const timeout = setTimeout(() => {
                if (state.value !== SECURITY_CODE) {
                    dispatch({
                        type: actionTypes.error
                    })
                } else {
                    dispatch({
                        type:actionTypes.confirm 
                    })
                }
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && (
                    <p>Error: El código es incorrecto</p>
                )}
                {state.loading && (
                    <p>Estamos cargando...</p>
                )}
                <input
                    placeholder='Código de seguridad'
                    value={state.value}
                    onChange={(event) => dispatch({ type: "WRITE", payload: event.target.value })}
                />
                <button onClick={() => {
                    dispatch({ type: actionTypes.check })
                }}>Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <>
                <p>Pedimos Confirmacion. tas segur@?</p>
                <button onClick={() => {
                    dispatch({
                        type: actionTypes.delete,
                    })
                }}>Si, eliminar</button>
                <button onClick={() => {
                    dispatch({ type: actionTypes.reset})
                }}>No, me arrepenti</button>
            </>
        )
    } else {
        return (
            <>
                <p>Eliminado con exito</p>
                <button onClick={() => {
                    dispatch({ type: actionTypes.reset })
                }}>Volver al Menu</button>
            </>
        )
    }
}

export { UseReducer };