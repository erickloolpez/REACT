import { Card } from 'antd'
import { StartButton } from './StartButton'
import { useDispatch } from 'react-redux'
import { setFavorites } from '../Actions'
import { setFavorite } from '../Slices/dataSlice'

export const PokemonCard = ({ name, image, types, id, favorite }) => {
    const dispatch = useDispatch()
    const typesString = types.map(element => element.type.name).join(',', ' ')

    const handleOnFavorite = () => {
        // dispatch(setFavorites({pokemonID: id}))
        dispatch(setFavorite({ pokemonID: id }))
    }

    return (
        <Card hoverable cover={<img src={image} alt='Ditto' />} extra={<StartButton isFavorite={favorite} onClick={handleOnFavorite} />}>
            <Card.Meta title={name} description={typesString} />
        </Card>
    )
}