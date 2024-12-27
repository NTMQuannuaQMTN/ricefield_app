import { Text, View, Image } from "react-native";
const logoIcon = require("../assets/images/tpIcon.png");

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#448D57",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={logoIcon} style={{width: 150, height: 150}}/>
    </View>
  );
}