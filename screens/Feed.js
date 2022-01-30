import { ActivityIndicator, Text, ViewPropTypes, SafeAreaView } from "react-native";
import PropTypes from 'prop-types'
import React, {useState, useEffect} from 'react'

import { fetchImages } from "../utils/api";
import CardList from "../components/CardList";

const Feed = ({style, commentsForItem, onPressComments}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    const f = async () => {
      try {
        const fetchedItems = await fetchImages()

        setLoading(false)
        setItems(fetchedItems)
      } catch (e) {
        setLoading(false)
        setError(error)
      }
    }
    f()
  }, [])

  if (loading) {
    return <ActivityIndicator size="large" />
  }

  if (error) {
    return <Text>Error...</Text>
  }

  return (
    <SafeAreaView style={style}>
      <CardList items={items} commentsForItem={commentsForItem} onPressComments={onPressComments}/>
    </SafeAreaView>
  )
}

Feed.propTypes = {
  style: ViewPropTypes.style,
  commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onPressComments: PropTypes.func.isRequired
}

Feed.defaultProps = {
  style: null
}

export default Feed