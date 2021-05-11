import React, { useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../../styles/deliveryTable'
import { getDeliveries } from '../../actions/deliveryActions'
import _ from 'lodash'
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native';

const DeliveryTable = ({ data }) => {
  const columns = ['id', 'status', 'date']
  const columnText = ['Sendingarnr', 'Staða', 'Dagsetning']
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)
  const [direction, setDirection] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [deliveries, setDeliveries] = useState()
  const [counter, setCounter] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const token = useSelector(({ login }) => login.token)
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const sortTable = (column) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc'
    const sortedData = _.orderBy(data, [column], [newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setDeliveries(sortedData)
  }
  
  const onRefresh = () => {
    // Clear old data of the list
    setDeliveries([])
    // Call the Service to get the latest deliveries
    dispatch(getDeliveries(token))
    setDeliveries(data)
    setRefreshing(false)
  }

  const navigateToDelivery = (delivery) => {
    if (delivery) {
      navigation.navigate('Details', { delivery: delivery })
    }
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
              <Text style={styles.columnHeaderTxt}>{columnText[index] + ' '} {
                selectedColumn === column &&
                  <Icon name={direction === 'desc' ? 'arrow-down-drop-circle' : 'arrow-up-drop-circle'} />
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
        style={styles.flatList}
        keyExtractor={(item, index) => index + ''}
        ListHeaderComponent={tableHeader}
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl
            // refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => { navigateToDelivery(item) }} style={{ ...styles.tableRow, backgroundColor: index % 2 === 1 ? '#F0FBFC' : 'white' }}>
              <Text style={{ ...styles.columnRowTxt, fontWeight: 'bold' }}>{item.id}</Text>
              <Text style={styles.columnRowTxt}>{availableStatusCodes[item.status]}</Text>
              <Text style={styles.columnRowTxt}>{format(new Date(item.deliveryDate), 'MMMM do, yyyy')}</Text>
            </TouchableOpacity>
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
