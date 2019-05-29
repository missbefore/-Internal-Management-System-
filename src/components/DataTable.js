import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
    Table,
    Select,
    DatePicker,
    Input,
    Checkbox,
    Row,
    Col,
    Tag
} from 'antd'
import moment from 'moment';
import StyleTable from './DataTable.scss'

const TableStateList = {ACTIVE:'正常', ON_EXPIRE:'即将过期', EXPIRE:'过期', DENIED:'暂停', DELETE:'删除'}
const TableStateColor = {ACTIVE:'green', ON_EXPIRE:'yellow', EXPIRE:'red', DENIED:'red', DELETE:'red'}

class DataTable extends PureComponent {
    static propTypes = {
        tableOptionSelect: PropTypes.arrayOf(PropTypes.shape({
            name:PropTypes.string.isRequired,
            title:PropTypes.string.isRequired,
            data:PropTypes.array,
            type:PropTypes.string,
            first:PropTypes.string,
            checked:PropTypes.bool,
        })),
        tableHeaderList: PropTypes.array.isRequired,
        tableDataList: PropTypes.object,
        scrollLength: PropTypes.number,
        alreadySelectOption: PropTypes.object,
        optionsListData: PropTypes.object,
        pageOption:PropTypes.object.isRequired,
        searchResult:PropTypes.func,
        inputClearAction:PropTypes.func,
        inputValueIn: PropTypes.object,
        checkChangeValue: PropTypes.array,
        inputInsertAction:PropTypes.func,
        checkedBoxAction:PropTypes.func,
    }

    componentDidMount() {
        let obj = {type:this.props.pageOption.type, name:this.props.pageOption.name_page, options: {}}
        this.props.searchResult(obj)
    }

    allSearchDeal = (params={}, special = "") => {
        let base_params = {type:this.props.pageOption.type, name:this.props.pageOption.name_page, options:{}}
        if (special !== "input" && this.props.pageOption.isInput === undefined) {
            this.props.inputClearAction()
            delete  this.props.alreadySelectOption.input
            let oldParams = {}
            if (this.props.alreadySelectOption.others !== undefined) {
                 oldParams = this.props.alreadySelectOption.others
            }
            base_params.options =  {others:Object.assign(oldParams, params.others)}
        } else {
            base_params.options = params
        }
        this.props.searchResult(base_params)
    }

    onChangeSelect = (value, array) => {
        let params = {others:{[array.ref]:value}}
        this.allSearchDeal(params)
    }
    onChangeTime = (date, dateString) => {
        let params = {}
        if (dateString !== ',') {
             params = {others:{time_range:dateString}}
        }
         this.allSearchDeal(params)
    }

    onPressEnterInput = (event) => {
        event.persist()
        let obj = event.target
        let params = {input:{[obj.id]:obj.value}}
        this.allSearchDeal(params, "input")
    }

    onTableChange = (pagination, filters) => {
        let filters_string = ''
        if (filters.Status !== undefined) {
            filters.Status.forEach(function (list) {
                filters_string += list + ','
            })
            filters_string = filters_string.substring(0, filters_string.length-1)
            let params = {others:{Status:filters_string}}
            this.allSearchDeal(params)
        }
    }

    onChangeCheck = (checkedValues) => {
        this.props.checkedBoxAction(checkedValues)
        let checkString = ''
        checkedValues.forEach(function (i) {
            checkString += i + ','
        })
        checkString = checkString.substring(0, checkString.length-1)
        let params = {others:{status:checkString}}
        this.allSearchDeal(params)
    }

    onPressChange = (event) =>{
        event.persist()
        let obj = event.target
        let params = {[obj.id]:obj.value}
        this.props.inputInsertAction(params)
    }

    formatOptionHtml = (tableOptionSelect, alreadySelectOption) => {
        let item = []

        let alreadySelectOptionOther = alreadySelectOption.others !== undefined?alreadySelectOption.others:{}
        let alreadySelectOptionInput = alreadySelectOption.input !== undefined?alreadySelectOption.input:{}

        for (let key = 0; key < tableOptionSelect.length; key++) {
            let son_item
            let name_call = tableOptionSelect[key].title
            let name_title = tableOptionSelect[key].name
            let son_item_inner = []
            switch (tableOptionSelect[key].type) {
                case 'select':
                    const Option = Select.Option;

                    let dataList = (option_name) => {
                        if (this.props.optionsListData[option_name] !== undefined) {
                            return this.props.optionsListData[option_name]
                        } else {
                            return tableOptionSelect[key].data
                        }

                    }

                    Object.entries(dataList(tableOptionSelect[key].name)).forEach(function (key_list, index) {
                        if (tableOptionSelect[key].show_name !== undefined) {
                            let name = key_list[1][tableOptionSelect[key].show_name]
                            let val = key_list[1][tableOptionSelect[key].http_val]

                            son_item_inner.push(<Option key={index} ref={name_title} value={val}>{name}</Option>)
                        } else {
                            son_item_inner.push(<Option key={index} ref={name_title} value={key_list[1]}>{key_list[1]}</Option>)
                        }
                    })

                    let defaultSelect = alreadySelectOptionOther[name_title] === undefined ? name_call : alreadySelectOptionOther[name_title]

                    son_item = (
                        <Select
                            className={StyleTable["select-option"]}
                            placeholder={name_call}
                            onChange={this.onChangeSelect}
                            selectname={name_title}
                            key={name_title}
                            value={defaultSelect}
                        >
                            {son_item_inner}
                        </Select>
                    )
                    break
                case 'input':
                    son_item = (
                        <Input
                            allowClear={true}
                            className={StyleTable["input-option"]}
                            placeholder={name_call}
                            onChange={this.onPressChange}
                            onPressEnter={this.onPressEnterInput}
                            key={name_title}
                            selectname={name_title}
                            id={name_title}
                            value={this.props.inputValueIn[name_title]}
                        />
                    )
                    break
                case 'checkbox':
                    Object.entries(tableOptionSelect[key].data).forEach(function (key_list, index){
                        son_item_inner.push(
                            <Col key={index} span={3}>
                                <Checkbox
                                    key={key_list[1]['name']}
                                    value={key_list[1]['name']}
                                    selectname={name_title}
                                >
                                    {key_list[1]['value']}
                                </Checkbox>
                            </Col>
                        )
                    })
                    son_item = (
                        <Checkbox.Group
                            className={StyleTable['checkbox-box']}
                            key="checkbox"
                            onChange={this.onChangeCheck}
                            value={this.props.checkChangeValue}
                        >
                            <Row
                                key={name_title}
                            >
                                {son_item_inner}
                            </Row>
                        </Checkbox.Group>

                    )
                    break
                case 'time':
                    const {RangePicker} = DatePicker;
                    const dateFormat = 'YYYY-MM-DD';
                    let time_range = alreadySelectOptionOther[name_title]
                    let time_range_string
                    if (time_range) {
                        time_range_string = [moment(time_range['0'], dateFormat), moment(time_range['1'], dateFormat)]
                    } else {
                        time_range_string = null
                    }

                    son_item = (
                        <div className={StyleTable['time-box']} key={key}>
                            <RangePicker
                                key={name_title}
                                className={StyleTable["time-option"]}
                                placeholder={tableOptionSelect[key].time}
                                onChange={this.onChangeTime}
                                value={time_range_string}
                                selectname={name_title} />
                        </div>
                    )
                    break
                default:
                    son_item = (
                        <Input
                            className={StyleTable["input-option"]}
                            placeholder={name_call}
                            defaultValue={alreadySelectOptionInput[name_title]}
                            onPressEnter={this.onPressEnterInput}
                            selectname={name_title}
                            key={name_title}
                        />
                    )
                    break

            }

            item.push(son_item)

        }
        let headerOptions
        headerOptions = (
            <div>
                {item}
            </div>
        )

        return headerOptions
    }


    formatDataListArray = (dataObject, headerList, pageOption) => {
        let dataArray = Object.getOwnPropertyNames(dataObject).length === 0?
            []:(dataObject[pageOption.name]===undefined?dataObject:dataObject[pageOption.name])
        if (dataArray !== []) {
            dataArray.forEach(function (key_list, index) {
                key_list.key = index
                if (pageOption.hasAction !== undefined) {
                    key_list.action =  <a href={pageOption.href.action}>{pageOption.hasAction}</a>
                }

                if (key_list.Status !== undefined && pageOption.pageStatus) {
                    key_list.Status = <Tag color={TableStateColor[key_list.Status]} >{TableStateList[key_list.Status]}</Tag>
                }

                if (key_list.Status !== undefined && !pageOption.pageStatus) {
                    key_list.Status = <Tag >{key_list.Status}</Tag>
                }

            })
        }

        return dataArray
    }



    render() {
        let {
            tableOptionSelect,
            tableHeaderList,
            tableDataList,
            scrollLength,
            alreadySelectOption,
            pageOption
        } = this.props

        let headerList = this.formatOptionHtml(tableOptionSelect, alreadySelectOption)
        let dataList = this.formatDataListArray(tableDataList, tableHeaderList, pageOption)
        scrollLength = scrollLength===undefined?1300:scrollLength
        return (
            <div className={StyleTable["main-box"]}>
                <div className={StyleTable["header-options"]}>
                    {headerList === []?'':headerList}
                </div>
                <Table
                    columns={tableHeaderList}
                    dataSource={dataList}
                    scroll={{x : scrollLength, y:300}}
                    style={{width:"1000px"}}
                    onChange={this.onTableChange}
                >
                </Table>
            </div>
        )
    }

}

export default DataTable