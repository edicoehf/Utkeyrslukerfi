import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from "lodash"

//TODO: Print data out into table
//TODO: Allow sorting of each row
const DeliveryTable = ({ data }) => {
    const [columns, setColumns] = useState([
        "id",
        "status",
        "Dagsetning",
    ])
    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    const [deliveries, setDeliveries] = useState();
    const [counter, setCounter] = useState(0);

    const sortTable = (column) => {
        const newDirection = direction === "desc" ? "asc" : "desc"
        const sortedData = _.orderBy(data, [column], [newDirection])
        setSelectedColumn(column)
        setDirection(newDirection)
        setDeliveries(sortedData)
    }
    const tableHeader = () => (
        <View style={styles.tableHeader}>
            {
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.columnHeader}
                                onPress={() => sortTable(column)}>
                                <Text style={styles.columnHeaderTxt}>{column + " "}
                                    {selectedColumn === column && <Icon
                                        name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                                    />
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }
        </View>
    )

    const tableBody = () => {
        //TODO: Laga þessa þvælu
        if (counter <= 0) {
            setDeliveries(data)
            setCounter(counter + 1)
        }
        return (
            <FlatList
                data={deliveries}
                style={{ width: "90%" }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                            <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>{item.id}</Text>
                            <Text style={styles.columnRowTxt}>{item.status}</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#37C2D0",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height: 50
    },
    tableRow: {
        flexDirection: "row",
        height: 40,
        alignItems: "center",
    },
    columnHeader: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    columnHeaderTxt: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14
    },
    columnRowTxt: {
        width: "33.3%",
        textAlign: "center",
    }
});

export default DeliveryTable