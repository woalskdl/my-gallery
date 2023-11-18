// import { AdMobRewarded } from "expo-ads-admob";
import { Platform } from "react-native";

const UNIT_ID = Platform.select({
  ios: __DEV__ ? "ca-app-pub-3940256099942544/1712485313" : "ca-app-pub-3869122967357561/5920765307",
  android: ""
})

export default () => {
  const loadRewardAd = async () => {
    await AdMobRewarded.setAdUnitID(UNIT_ID);
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();

    /**
     * 메모
     * https://github.com/expo/expo/issues/17536
     * - 현재 iOS에서는 두번째로 광고를 봐야 하는 상황에 광고를 볼 수 없는 오류가 있음.
     * -> 앱 종료 후 재실행 시 
     */
  }

  return {
    loadRewardAd
  }
}