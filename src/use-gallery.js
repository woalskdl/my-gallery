import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

const defaultAlbum = {
  id : 1,
  title: '기본'
}

export const useGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [bigImgModalVisible, setBigImgModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id : lastId + 1,
        uri : result.assets[0].uri,
        albumId: selectedAlbum.id
      }

      // 취소
      setImages([
        ...images,
        newImage
      ]);
    }
  }

  const deleteImage = (imageId) => {
    Alert.alert('이미지를 삭제하시겠어요?', '', [
      {
        style: 'cancel',
        text: '아니요'
      },
      {
        text: '네',
        onPress: () => {
          const newImages = images.filter(image => image.id !== imageId);
          setImages(newImages);
        }
      }
    ])
  }

  const openTextInputModal = () => setTextInputModalVisible(true);
  const closeTextInputModal = () => setTextInputModalVisible(false);
  const openBigImgModal = () => setBigImgModalVisible(true);
  const closeBigImgModal = () => setBigImgModalVisible(false);
  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };

    setAlbums([
      ...albums,
      newAlbum
    ])

    setSelectedAlbum(newAlbum)
  }

  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  }

  const deleteAlbum = (albumId) => {
    if (albumId === defaultAlbum.id) {
      Alert.alert('기본 앨범은 삭제할 수 없어요!');
      return;
    }

    Alert.alert('앨범을 삭제하시겠어요?', '', [
      {
        style: 'cancel',
        text: '아니요'
      },
      {
        text: '네',
        onPress: () => {
          const newAlbums = albums.filter(album => album.id !== albumId);
          setAlbums(newAlbums);
          setSelectedAlbum(defaultAlbum);
        }
      }
    ])
  }

  const selectImage = (image) => {
    setSelectedImage(image);
  }

  const resetAlbumTitle = () => {
    setAlbumTitle('');
  }

  const filteredImages = images.filter((image) => image.albumId === selectedAlbum.id);
  const imagesWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: ''
    }
  ]

  return {
    // images,
    imagesWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    textInputModalVisible: textInputModalVisible,
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
    selectedImage
  }
}