import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import DataTable from '../components/DataTable'
import {connect} from "react-redux";
import {searchResultList, getOptionsActions, clearInputAction, insertInputAction} from "../actions/search";

const basicOptionList = [
    {type:'select', title:'请输入展示地区', name:'country', data:[], show_name:'Cn', http_val:'En'},
    {type:'select', title:'请查找服务商', name:'agents', data:[], show_name:'Name', http_val:'AgentNo'},
    {type:'time', title:'开通时间', name:'time_range', time:['开通时间', '结束时间']},
    {type:'input', title:'请输入商户号，商户主体或者商户简称', name:'merchant_info'},
    {type:'input', title:'输入微信商户号查询', name:'wx_merchant_id'}
]

const basicHeaderList = [
    {
        title: '商户', width: 150, dataIndex: 'ShortName', fixed: 'left',
    },
    {
        title: '商户主体',  dataIndex: 'Name', key: 'name', width: 200
    },
    {
        title: '展业地区', dataIndex: 'CountryCode', width: 100
    },
    {
        title: '起止服务', dataIndex: 'BeginDate',  width: 300
    },
    {
        title: '服务商',  dataIndex: 'Agent.Name',  width: 200,
        render: (text, record)  => (<a href={'/agent/'+ record.Agent.No}>{text}</a>)
    },
    {
        title: '商务', dataIndex: 'ContactName', width: 100
    },
    {
        title: '合作状态',  dataIndex: 'Status', width: 100,
        filters: [{
            text: '正常',
            value: 'ACTIVE',
        }, {
            text: '过期',
            value: 'EXPIRE',
        }, {
            text: '即将过期',
            value: 'ON_EXPIRE',
        }, {
            text: '暂停',
            value: 'DENIED',
        }, {
            text: '删除',
            value: 'DELETE',
        }],
    },
    {
        title: '操作', width: 100, dataIndex: 'action',  fixed: 'right',
    }]

const pageOption = {name:'merchants', hasAction:'查看详情', href:{action:'merchant/:merchant_no'},
    type:'merchant', name_page:'商户列表', pageStatus:true}
class Merchant extends PureComponent{
    static propTypes = {
        tableDataList: PropTypes.object,
        alreadySelectOption: PropTypes.object
    }

    componentWillMount() {
        this.props.getOptionsList("merchants")
    }

    render() {
        return (
            <DataTable
                tableHeaderList={basicHeaderList}
                tableOptionSelect={basicOptionList}
                tableDataList={this.props.tableDataList}
                alreadySelectOption={this.props.alreadySelectOption}
                optionsListData = {this.props.optionsListData}
                pageOption={pageOption}
                searchResult={this.props.searchResult}
                inputValueIn={this.props.inputValueIn}
                inputClearAction={this.props.clearInputAction}
                inputInsertAction={this.props.insertInputAction}
            />
        )
    }
}


const mapStateToProps = (state) => ({
    optionsListData: state.merchant.optionData,
    tableDataList: state.merchant.data,
    alreadySelectOption: state.merchant.option,
    inputValueIn: state.merchant.input
})

const mapDispatchToProps = (dispatch)=> ({
    getOptionsList: (page_name) => getOptionsActions(page_name)(dispatch),
    searchResult : (object)=>searchResultList(object)(dispatch),
    clearInputAction: () => clearInputAction()(dispatch),
    insertInputAction:(obj)=> insertInputAction(obj)(dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(Merchant)