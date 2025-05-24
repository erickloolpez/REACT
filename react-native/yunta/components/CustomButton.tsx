import { ButtonProps } from "@/types/type"
import { Text, TouchableOpacity } from "react-native"

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case "primary":
      return "bg-[#2C68A4]"
    case "danger":
      return "bg-red-500"
    case "success":
      return "bg-green-500"
    case "outline":
      return "bg-transparent border-neutral border-[0.5px]"
    default:
      return "bg-[#2E669F]"
  }
}

const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
  switch (variant) {
    case "primary":
      return "text-[#2C68A4]"
    case "secondary":
      return "text-black"
    case "danger":
      return "text-red-100"
    case "success":
      return "text-green-100"
    default:
      return "text-white"
  }
}


const CustomButton = ({ onPress, title, bgVariant = "primary", textVariant = "danger", IconLeft, IconRight, className, ...props }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-full p-3 border-2 border-black rounded-xl  flex-row justify-center items-center shadow-md ${getBgVariantStyle(bgVariant)} ${className}`}
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text
      className={`text-lg font-bold font-BlockHead ${getTextVariantStyle(textVariant)}`}
    >
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
)

export default CustomButton