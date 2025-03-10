import React, { useState, useEffect } from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState((prevState) => ({
      ...prevState,
      error: false,
      loading: false,
      confirmed: true
    }));
  }

  const onError = () => {
    setState((prevState) => ({
      ...prevState,
      error: true,
      loading: false,
    }));
  }

  const onWrite = (event) => {
    setState((prevState) => ({
      ...prevState,
      value: event.target.value
    }))
  }

  const onCheck = () => {
    setState((prevState) => ({
      ...prevState,
      error: false,
      loading: true
    }));
  }

  const onDelete = () => {
    setState((prevState) => ({
      ...prevState,
      deleted: true,
    }))
  }

  const onReset = () => {
    setState((prevState) => ({
      ...prevState,
      confirmed: false,
      deleted: false,
      value: '',
    }))
  }

  useEffect(() => {
    if (state.loading) {
      const timeout = setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError()
        } else {
          onConfirm()
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
          onChange={(event) => onWrite(event)}
        />
        <button onClick={() => {
          onCheck()
        }}>Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>Pedimos Confirmacion. tas segur@?</p>
        <button onClick={() => {
          onDelete()
        }}>Si, eliminar</button>
        <button onClick={() => {
          onReset()
        }}>No, me arrepenti</button>
      </>
    )
  } else {
    return (
      <>
        <p>Eliminado con exito</p>
        <button onClick={() => {
          onReset()
        }}>Volver al Menu</button>
      </>
    )
  }
}

export { UseState };
