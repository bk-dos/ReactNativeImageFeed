import { StatusBar } from 'expo-status-bar';
import { Modal, Platform, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react'
import Constants from 'expo-constants'

import Feed from './screens/Feed';
import Comments from './screens/Comments';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';


/*const items = [
  { id: 0, author: 'Bob Ross' },
  { id: 1, author: 'Chuck Norris' },
];*/

//const comments = ["asd", "asd", "asd", "asd", "asdjjjjj"]

export default function App() {
  const [commentsForItem, setCommentsForItem] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [selectedItemId, setselectedItemId] = useState(null)

  const openCommentScreen = id => {
    setShowModal(true)
    setselectedItemId(id)
  }

  const closeCommentScreen = () => {
    setShowModal(false)
    setselectedItemId(null)
  }

  const onSubmitComment = (text) => {
    const comments = commentsForItem[selectedItemId] || [];

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text]
    }

    setCommentsForItem(updated)
  }
  return (
    <View style={styles.container}>
      <Feed style={styles.feed} commentsForItem={commentsForItem} onPressComments={openCommentScreen} />
      <Modal visible={showModal} animationType="slide" onRequestClose={closeCommentScreen}>
        <Comments
          style={styles.container}
          comments={commentsForItem[selectedItemId] || []}
          onClose={closeCommentScreen}
          onSubmitComment={onSubmitComment}
        />
      </Modal>
      <StatusBar />
    </View>
  );
  /*return (
    <View style={styles.container}>
      <CommentInput />
      <CommentList items={comments} />
      <StatusBar />
    </View>
  )*/
}

const platformVersion = Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feed: {
    flex: 1,
    marginTop: (Platform.OS === 'android' || platformVersion < 11) ? Constants.statusBarHeight : 0
  },
  comments: {
    flex: 1,
    marginTop: Platform.OS === "ios" && platformVersion < 11 ? Constants.statusBarHeight : 0
  }
});
