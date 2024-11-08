import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MoreHorizontalCircle01Icon } from 'hugeicons-react-native'
import { images } from '../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
  return (
    <SafeAreaView className="h-full bg-primary" edges={['top']}>
      <View className="w-full h-full">
        <View className="w-full h-[10%] items-end justify-center bg-blue-200">
          <MoreHorizontalCircle01Icon
            className="mr-4"
            size={32}
            color={"#17301A"}
            variant={"stroke"}
          />
        </View>

        <View className="w-full h-[40%] items-center justify-around  bg-red-200">
          <View className="w-36 h-36 bg-green-200 rounded-full overflow-hidden ">
            <Image source={images.avatar} resizeMode="cover" className="w-full h-full"/> 
          </View>

          <View className="w-full items-center justify-center">
            <Text>Monica Perez</Text>
          </View>

          <View>
            <FontAwesomeIcon icon={faStar} color='yellow' size={32}/>
            <Text></Text>
          </View>

        </View>


      </View>
    </SafeAreaView>
  )
}

export default Profile