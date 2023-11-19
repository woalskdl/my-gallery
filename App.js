import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { useGallery } from './src/use-gallery';
import MyDropDownPicker from './src/MyDropDownPicker';
import TextInputModal from './src/TextInputModal';
import BigImgModal from './src/BigImgModal';
import useRewardsAd from './src/use-rewards-ad';
import ImageList from './src/imageList';

// ca-app-pub-3869122967357561/5920765307

export default function App() {

  const {
    // images,
    imagesWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow
  } = useGallery();

  // const { loadRewardAd } = useRewardsAd();

  const onPressOpenGallery = pickImage;
  const onLongPressImage = (imageId) => deleteImage(imageId);

  const onPressWatchAd = () => {
    // loadRewardAd();
  }

  const onPressAddAlbum = () => {

    // if (albums.length >= 2) {
    //   Alert.alert('광고를 시청해야 앨범을 추가할 수 있습니다.', '', [
    //     {
    //       style: 'cancel',
    //       text: '닫기'
    //     },
    //     {
    //       text: '광고 시청',
    //       onPress: onPressWatchAd
    //     }
    //   ])
    // } else {
      openTextInputModal();
    // }
  }
  const onSubmitEditing = () => {
    if (!albumTitle)
      return;

    // 1. 앨범에 타이틀 추가
    addAlbum();

    // 2. Modal 닫기 && TextInput의 value 초기화
    closeTextInputModal();
    resetAlbumTitle();
  }

  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal();
  }

  const onPressHeader = () => {
    if (isDropdownOpen)
      closeDropdown();
    else 
      openDropdown();
  }

  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropdown();
  }
  
  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId);
  }

  const onPressImage = (image) => {
    selectImage(image);
    openBigImgModal();
  }

  const onPressBigImgModalBackdrop = () => {
    closeBigImgModal();
  }

  const onPressLeftArrow = () => {
    moveToPreviousImage();
  }

  const onPressRightArrow = () => {
    moveToNextImage();
  }

  

  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 DropDown, 앨범 추가 버튼 */}
      <MyDropDownPicker 
        isDropdownOpen={isDropdownOpen}
        onPressHeader={onPressHeader}
        selectedAlbum={selectedAlbum} 
        onPressAddAlbum={onPressAddAlbum}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
      />

      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal 
        modalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
      />

      {/* 이미지를 크게 보는 Modal */}
      <BigImgModal
        modalVisible={bigImgModalVisible}
        onPressBackdrop={onPressBigImgModalBackdrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />

      {/* 이미지 리스트 */}
      <ImageList
        imagesWithAddButton={imagesWithAddButton}
        onPressOpenGallery={onPressOpenGallery}
        onPressImage={onPressImage}
        onLongPressImage={onLongPressImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    marginTop: Platform.OS === 'android' ? 30 : 0
  }
});
