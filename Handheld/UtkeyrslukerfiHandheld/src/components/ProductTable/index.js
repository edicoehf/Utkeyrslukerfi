import React from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from '../../styles/productTable'
import { MAINLY_BLUE } from '../../constants'
import PropTypes from 'prop-types'

// Table for products containing barcode, status and more
const ProductTable = ({ tableHeaders, tableData, numberOfObjects, label }) => {
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
    <View style={styles.mainView}>
      <Text style={styles.label}>{label}</Text>
      <FlatList
        data={tableData}
        style={styles.size}
        keyExtractor={(_, index) => index + ''}
        ListHeaderComponent={tableHeaderComponent}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => {
          return (
            <View style={{ ...styles.tableRow, backgroundColor: index % 2 === 1 ? MAINLY_BLUE : 'white' }}>
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

ProductTable.propTypes = {
  // Headers for the table
  tableHeaders: PropTypes.array.isRequired,
  // Data for the table
  tableData: PropTypes.array.isRequired,
  // Number of object to be visible in the table, css attribute
  numberOfObjects: PropTypes.number.isRequired,
  // Table label
  label: PropTypes.string.isRequired
}

export default ProductTable
