import React from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from '../../styles/productTable'

// Table for products containing barcode, status and more
const ProductTable = ({ tableHeaders, tableData, numberOfObjects }) => {
  const tableHeaderComponent = () => (
    <View style={styles.tableHeader}>
      {
        tableHeaders.map((column, index) => {
          return (
            <Text key={index} style={styles.columnHeaderTxt}>{column}</Text>
          )
        })
      }
    </View>
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.label}>Skannaðir pakkar</Text>
      <FlatList
        data={tableData}
        style={styles.size}
        keyExtractor={(_, index) => index + ''}
        ListHeaderComponent={tableHeaderComponent}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => {
          return (
            <View style={{ ...styles.tableRow, backgroundColor: index % 2 === 1 ? '#F0FBFC' : 'white' }}>
              {
                Object.keys(item).map((k) => {
                  if (k !== 'status') {
                    return (k === 'button' ? item[k] : <Text key={k} style={{ ...styles.columnRowTxt, width: `${90 / numberOfObjects}%` }} numberOfLines={1} ellipsizeMode='tail'>{item[k]}</Text>)
                  } else {
                    return false
                  }
                }
                )
              }
            </View>
          )
        }}
      />
    </View>
  )
}

export default ProductTable
