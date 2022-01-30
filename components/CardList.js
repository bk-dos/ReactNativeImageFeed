import { FlatList } from "react-native";
import PropTypes from 'prop-types'
import React from 'react'

import { getImageFromId } from "../utils/api";
import Card from "./Card";



const CardList = ({items, commentsForItem, onPressComments}) => {
  
  const keyExtractor = ({id}) => id.toString()

  const renderItem = ({item}) => {
    const comments = commentsForItem[item.id]
    
    return (
      <Card
        fullname={item.author}
        image={{
          uri: getImageFromId(item.id)
        }}
        linkText={`${comments ? comments.length : 0} Comments`}
        onPressLinkText={() => onPressComments(item.id)}
      />
    )
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      extraData={commentsForItem}
    />
  )
}

CardList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired
    })
  ).isRequired,
  commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onPressComments: PropTypes.func.isRequired
}

export default CardList