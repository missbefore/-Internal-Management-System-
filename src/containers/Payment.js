import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import DataTable from '../components/DataTable'
import {connect} from "react-redux";
import {searchResultList, getOptionsActions, clearInputAction, insertInputAction} from "../actions/search";

const basicOptionList = [
    {type:'select', title:'收款商户', name:'pay_merchant', data:[{post:'APP',show:'APP'},{post:'JSAPI', show:'公众号'}],
        show_name:'post', http_val:'show'},
    {type:'select', title:'支付方式', name:'pay_method', data:[
        {post:'APP',show:'APP'},{post:'JSAPI', show:'公众号'},{post:'MICRO',show:'扫码'},{post:'MINIPROGRA',show:'扫码'},
            {post:'MP_DESK', show:'公众号收银台'},{post:'NATIVE', show:'二维码'},{post:'PC_DESK',show:'PC收银台'},
            {post:'WAP',show:'H5'}
        ],
        show_name:'show', http_val:'post'
    },
    {type:'select', title:'支付渠道', name:'pay_channel', data:[
        {post:'ALIPAYCN', show:'支付宝线上'},{post:'ALIPAYCNFL', show:'支付宝线下'}, {post:'SUPAYALICN', show:'支付宝线上(supay)'},
            {post:'SUPAYALICNFL', show:'支付宝线下(supay)'}, {post:'WECHATPAYCNFL', show:'微信线下'},{post:'WECHATPAYCN', show:'微信线上'},
            {post:'SICPAYCN', show:'云闪付'},{post:'APOS', show:'APOS'}
        ],
        show_name:'show', http_val:'post'
    },
    {type:'select', title:'支付状态', name:'payment_status', data:[
            {post:'PAID',show:'收款成功'}, {post:'INIT', show:'等待支付'},{post:'EXPIRED', show:'订单失效'}, {post:'FAIL', show:'失败'}
        ],
        show_name:'show', http_val:'post'
    },
    {type:'select', title:'退款状态', name:'refund_statue', data:[
            {post:'FULL', show:'全额退款'}, {post:'PART', show:'部分退款'},{post:'None', show:'无退款'}
        ],
        show_name:'show', http_val:'post'
    },
    {type:'select', title:'导出数据', data:[{post:'CVS', show:'CVS'}], name:'out_data_to_file', show_name:'show', http_val:'post'},
    {type:'time', title:'支付时间', name:'time_range', time:['开始时间', '结束时间']},
    {type:'input', title:'查找订单', name:'order_id'}
]

const basicHeaderList = [
    {
        title: '单号', width: 150, dataIndex: 'No', fixed: 'left',
    },
    {
        title: '收款账户',  dataIndex: 'Name', key: 'name', width: 200
    },
    {
        title: '订单金额(换汇后)', dataIndex: 'CountryCode', width: 100
    },
    {
        title: '服务费率', dataIndex: 'BeginDate',  width: 300
    },
    {
        title: '服务费',  dataIndex: 'Agent.Name',  width: 200
    },
    {
        title: '结算金额', dataIndex: 'resultMoney', width: 100
    },
    {
        title: '支付方式', dataIndex: 'PaymentState', width: 100
    },
    {
        title: '支付渠道', dataIndex: 'PaymentChannel', width: 100
    },
    {
        title: '支付状态', dataIndex: 'PaymentStatus', width: 100
    },
    {
        title: '退款状态', dataIndex: 'refundStatus', width: 100
    },
    {
        title: '支付时间',  dataIndex: 'PaymentTime', width: 100
    }]

const pageOption = {name:'payment', type:'payment', name_page:'支付列表', pageStatus:false}
class Payment extends PureComponent{
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

export default connect(mapStateToProps, mapDispatchToProps)(Payment)