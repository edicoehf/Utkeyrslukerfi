import React from 'react'
import { View, ScrollView } from 'react-native'
import { Table, Row } from 'react-native-table-component'

// Table for products containing barcode, status and more
const ProductTable = ({ tableHeaders, tableData, tableWidth }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
        <Row data={tableHeaders} widthArr={tableWidth} />
      </Table>
      <ScrollView>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          {
          tableData.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              widthArr={tableWidth}
              style={[index % 2 && { backgroundColor: '#F7F6E7' }]}
            />
          ))
          }
        </Table>
      </ScrollView>
    </View>
  )
}

export default ProductTable
