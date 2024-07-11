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

  useEffect(() => {
    if (state.loading) {
      const timeout = setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          setState((prevState) => ({
            ...prevState,
            error: true,
            loading: false,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            error: false,
            loading: false,
            confirmed: true
          }));
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [state.loading]);

  if(!state.deleted && !state.confirmed){
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
        onChange={(event) => setState((prevState) => ({
          ...prevState,
          value: event.target.value
        }))}
      />
      <button onClick={() => {
        setState((prevState) => ({
          ...prevState,
          error: false,
          loading: true
        }));
      }}>Comprobar</button>
    </div>
  );
  }else if(!!state.confirmed && !state.deleted){
    return(
      <>
      <p>Pedimos Confirmacion. tas segur@?</p>
      <button onClick={()=>{
        setState((prevState)=>({
          ...prevState,
          deleted: true,
        }))
      }}>Si, eliminar</button>
      <button onClick={()=>{
        setState((prevState)=>({
          ...prevState,
          confirmed:false,
          value: '',
        }))
      }}>No, me arrepenti</button>
      </>
    )
  }else{
    return(
      <>
      <p>Eliminado con exito</p>
      <button onClick={()=>{
        setState((prevState)=>({
          ...prevState,
          confirmed:false,
          deleted:false,
          value:'',
        }))
      }}>Volver al Menu</button>
      </>
    )
  }
}

export { UseState };
