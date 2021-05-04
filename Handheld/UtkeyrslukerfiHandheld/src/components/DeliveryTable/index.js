import React, { useState } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../../styles/deliveryTable'
import _ from 'lodash'

const DeliveryTable = ({ data }) => {
  const columns = ['id', 'status', 'date']
  const columnText = ['Sendingarnúmer', 'Staða', 'Dagsetning']
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)
  const [direction, setDirection] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [deliveries, setDeliveries] = useState()
  const [counter, setCounter] = useState(0)

  const sortTable = (column) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc'
    const sortedData = _.orderBy(data, [column], [newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setDeliveries(sortedData)
  }

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {
        columns.map((column, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.columnHeader}
              onPress={() => sortTable(column)}
            >
              <Text style={styles.columnHeaderTxt}>{columnText[index] + ' '}
                {selectedColumn === column &&
                  <Icon
                    name={direction === 'desc' ? 'arrow-down-drop-circle' : 'arrow-up-drop-circle'}
                  />
                }
              </Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )

  const tableBody = () => {
    // TODO: Laga þessa þvælu
    if (counter <= 0) {
      setDeliveries(data)
      setCounter(counter + 1)
    }
    return (
      <FlatList
        data={deliveries}
        style={{ width: '90%' }}
        keyExtractor={(item, index) => index + ''}
        ListHeaderComponent={tableHeader}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => {
          return (
            <View style={{ ...styles.tableRow, backgroundColor: index % 2 === 1 ? '#F0FBFC' : 'white' }}>
              <Text style={{ ...styles.columnRowTxt, fontWeight: 'bold' }}>{item.id}</Text>
              <Text style={styles.columnRowTxt}>{availableStatusCodes[item.status]}</Text>
              <Text style={styles.columnRowTxt}>{item.pickupAddress.city}</Text>
            </View>
          )
        }}
      />
    )
  }
  return (
    <View style={styles.container}>
      {
        data.length > 0 ? tableBody() : null
      }
    </View>
  )
}

export default DeliveryTable
