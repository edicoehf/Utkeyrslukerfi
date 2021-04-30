import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

// Table for products containing barcode, status and more
const ProductTable = ({ tableHeaders, tableData }) => {
  const tableHeaderComponent = () => (
    <View style={styles.tableHeader}>
      {
        tableHeaders.map((column, index) => {
          {
            return (
              <Text key={index} style={styles.columnHeaderTxt}>{column}</Text>
            )
          }
        })
      }
    </View>
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {
        <FlatList
          data={tableData}
          style={{width:'90%'}}
          keyExtractor={(_, index) => index+''}
          ListHeaderComponent={tableHeaderComponent}
          stickyHeaderIndices={[0]}
          renderItem={({item, index}) => {
            return (
              <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
                {Object.keys(item).map((k) => k !== 'status' && <Text key={k} style={styles.columnRowTxt}>{item[k]}</Text>)}
              </View>
            )
          }}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:80
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#4A79BA",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnHeader: {
    width: "25%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width:"25%",
    textAlign:"center",
  }
});

export default ProductTable
