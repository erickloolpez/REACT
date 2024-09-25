import { View, Text, Image } from 'react-native'

import { EthPrice } from './SubInfo'
import { FONTS, COLORS, SIZES } from '../constants'

const DetailsBid = ({bid}) => {
  return (
    <View style={{
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center ',
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.base * 2 ,
    }}>
        <Image 
            source={bid.image}
            resizeMode='contain'
            style={{width:48, height: 48}}
        />

        <View>
            <Text sytle={{
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.small,
                color: COLORS.primary,
            }}>
                Bid placed by {bid.name}
            </Text>
            <Text sytle={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.small - 2 ,
                color: COLORS.secondary,
                marginTop:3,
            }}>
                {bid.date}
            </Text>
        </View>

        <EthPrice price={bid.price} />
    </View>
  )
}

export default DetailsBid