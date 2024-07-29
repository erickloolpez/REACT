import { useEffect } from 'react'
import { Col, Spin } from 'antd'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Searcher } from '../Components/Searcher'
import { PokemonList } from '../Components/PokemonList';
// import { getPokemons } from '../Api';
// import { getPokemonsWithDetails, setLoading } from '../Actions';
import { fetchPokemonWithDetails } from '../Slices/dataSlice';

function App() {

  // const pokemons = useSelector(state => state.getIn(['data','pokemons'],shallowEqual)).toJS()
  const dispatch = useDispatch()
  const pokemons = useSelector(state => state.data.pokemons, shallowEqual)
  // const loading = useSelector(state => state.getIn(['data', 'loading']))
  const loading = useSelector(state => state.ui.loading)


  useEffect(() => {
    // const fetchPokemons = async () => {
    //   dispatch(setLoading(true))
    //   const pokemonsRes = await getPokemons()
    //   dispatch(getPokemonsWithDetails(pokemonsRes))
    //   dispatch(setLoading(false))
    // }
    // fetchPokemons()
    dispatch(fetchPokemonWithDetails())
  }, [])

  return (
    <div className="App">
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      {
        loading ?
          <Col offset={12}>
            <Spin size='large' />
          </Col>
          :
          <PokemonList pokemons={pokemons} />
      }
    </div>
  );
}

export default App;
