import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, TextInput, View } from "react-native";

export default ({ modalVisible, albumTitle, setAlbumTitle, onSubmitEditing, onPressBackdrop }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex:1 }}
      >
        <Pressable style={{ flex:1 }} onPress={onPressBackdrop}>
          <SafeAreaView style={{ width: '100%', position: 'absolute', bottom: 0 }}>
            <TextInput 
              placeholder="앨범명을 입력해주세요."
              style={{ 
                width: '100%',
                padding: 10,
                borderWidth: 0.5,
                borderColor: 'lightgrey'
              }} 
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              autoFocus={true}
            />
          </SafeAreaView>
        </Pressable>

      </KeyboardAvoidingView>
    </Modal>
  );
}