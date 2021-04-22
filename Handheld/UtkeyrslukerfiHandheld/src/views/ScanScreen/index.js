import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, TableWrapper, Row } from 'react-native-table-component';

const ScanScreen = () => {
    const availableStatusCodes = {1: 'Í ferli', 2: 'Á leiðinni', 3: 'Móttekið'} // TODO: make status codes configurable

    const [ status, setStatus ] = useState(availableStatusCodes[2])
    const [ barcode, setBarcode ] = useState('')
    const [ tableData, setTableData ] = useState([[]])
    const tableHeaders = ['Sendingarnúmer', 'Fyrri staða', 'Ný staða']
    const tableWidth = [100, 60, 60]

    const addBarcode = () => {
        setTableData([...tableData, [barcode, 'hmm', availableStatusCodes[status]]])
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <Text>Staða</Text>
            <DropDownPicker 
                items={[
                    {label: availableStatusCodes[1], value: 1},
                    {label: availableStatusCodes[2], value: 2},
                    {label: availableStatusCodes[3], value: 3}
                ]}
                defaultValue={status}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                temStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setStatus(item.value)}
            />
            <Text>Strikamerki sendingar</Text>
            <TextInput 
                onChangeText={setBarcode}
                value={barcode}
                placeholder='Strikamerki...'
                style={{backgroundColor: '#fafafa'}}
            />
            <Button
                onPress={addBarcode}
                title='Bæta við'
                color='grey'
                accessibilityLabel='Press button to add barcode number'
            />
            <Text>Skannaðir pakkar</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    <Row data={tableHeaders} widthArr={tableWidth}/>
                </Table>
                <ScrollView>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        {
                        tableData.map((rowData, index) => (
                            <Row
                            key={index}
                            data={rowData}
                            widthArr={tableWidth}
                            style={[index%2 && {backgroundColor: '#F7F6E7'}]}
                            />
                        ))
                        }
                    </Table>
                </ScrollView>
            </View>
        </View>
    )
}

export default ScanScreen;
