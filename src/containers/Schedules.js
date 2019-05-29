import React , {PureComponent} from 'react'
import Proptypes from 'prop-types'

import DataTable from '../components/DataTable'
import {connect} from "react-redux"
import {searchResultList, checkedBoxAction} from "../actions/search";

const basicOptionList = [
    {type:'checkbox', title:'选择要展示的商户', name:'status',
        data:[
            {name:'KYC', value:'风控初审中'},
            {name:'SECONDKYC', value:'风控复审中'},
            {name:'KYC_1', value:'风控驳回'},
            {name:'CONTRACT_0', value:'提交合同中'},
            {name:'CONTRACT_1', value:'合同审核中'},
            {name:'OPENING_0', value:'商户开通中'},
            {name:'ABOLITION', value:'拒绝开通'},
            {name:'ACTIVE', value:'商户已开通'},]
    }
]

const basicHeaderList = [
    {
        title:'商户', width:150, dataIndex:'DraftMerchants.ShortName', fixed:'left',
    },
    {
        title:'展示地点', dataIndex:'Sales.Agent.CountryCode', width: 100
    },
    {
        title:'服务商', dataIndex:'Sales.Agent.Name', width:300,
    },
    {
        title:'当前处理人', dataIndex:'Sales.Name', width:200,
    },
    {
        title:'状态', dataIndex:'Status', width:200,
    },
    {
        title:'更新时间', dataIndex:'Modified', width:200,
    },
    {
        title:'操作', dataIndex:'action', fixed: 'right', width:100
    }
]

const pageOption = {name:'schedules', hasAction:'查看', href:{action:'risk/info/:info'},
    type:'schedules', name_page:'商户进件列表', isInput:false, pageStatus:false}
class Schedules extends PureComponent {
    static propTypes = {
        tableDataList: Proptypes.object,
        alreadySelectOption: Proptypes.object,
    }

    render() {
        return (
            <DataTable
                tableHeaderList={basicHeaderList}
                tableOptionSelect={basicOptionList}
                pageOption={pageOption}
                tableDataList={this.props.tableDataList}
                searchResult={this.props.searchResult}
                alreadySelectOption={{other:undefined, input:undefined}}
                checkChangeValue={this.props.checkedValueAlready}
                checkedBoxAction={this.props.checkBoxAction}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    tableDataList: state.schedule.data,
    checkedValueAlready: state.schedule.checked
})

const mapDispatchToProps = (dispatch)=> ({
    searchResult: (object) => searchResultList(object)(dispatch),
    checkBoxAction: (array) => checkedBoxAction(array)(dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Schedules)