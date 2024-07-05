import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";
import { scale } from "react-native-size-matters";


const IconComponent = ({ IconName, leftIcon, color, marginLeft }) => {
    const iconProps = { name: leftIcon, size: scale(25), color };


    switch (IconName) {
        case "Fontisto": return <Fontisto {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "AntDesign": return <AntDesign {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "Entypo": return <Entypo {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "EvilIcons": return <EvilIcons {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "Feather": return <Feather {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "FontAwesome": return <FontAwesome {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "FontAwesome5": return <FontAwesome5 {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "FontAwesome6": return <FontAwesome6 {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "Foundation": return <Foundation {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "Ionicons": return <Ionicons {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "MaterialCommunityIcons": return <MaterialCommunityIcons {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "MaterialIcons": return <MaterialIcons {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "Octicons": return <Octicons {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "SimpleLineIcons": return <SimpleLineIcons {...iconProps} style={{ marginLeft: marginLeft }} />;
        case "Zocial": return <Zocial {...iconProps} style={{ marginLeft: marginLeft }} />;
        default: return null;
    }
};


export default IconComponent




