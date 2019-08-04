/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
    List
} from 'antd-mobile'

import constants from 'global/constants'
import dateUtil from 'util/date'
import Svg_reward_wait from 'assets/svg/md_wait.svg'
import Svg_reward_reject from 'assets/svg/md_reject.svg'
import Svg_reward_draw from 'assets/svg/md_draw.svg'
import Svg_reward_pass from 'assets/svg/md_pass.svg'
import Svg_reward_del from 'assets/svg/md_del.svg'
import Svg_wait from 'assets/svg/sm_wait.svg'
import Svg_pass from 'assets/svg/sm_pass.svg'
import Svg_draft from 'assets/svg/sm_draft.svg'
import Svg_sm_del from 'assets/svg/sm_del.svg'
import moment from 'moment'
import Svg_reject from 'assets/svg/lg_reject.svg'
import Svg_draw from 'assets/svg/lg_draw.svg';
import Svg_del from 'assets/svg/lg_del.svg'

export default class RecordListItem extends BaseRc {
    render() {
        const record = this.props.record
        const quantify = record.quantify
        return (
            <List.Item multipleLine onClick={ this.props.onClick } className="shared-list" >
                    <div className="shared-list-lf" style={{ top: 7 }}>
                        { this.renderRewardSvg(record) }
                    </div>
                    <div className="shared-list-bd title">{ '事件： ' + record.eventName }</div>
                    { this.renderAscore(record) }
                    { this.renderBscore(record) }
                    { this.renderOp(record) }
                    <List.Item.Brief>
                        <span className="shared-list-fd">
                            <label>奖扣时间</label>:&nbsp;
                            { this.getTime(record.quantify.quantifyDate) }
                        </span>
                    </List.Item.Brief>
                    <List.Item.Brief>
                         <span className="shared-list-fd">
                              <label>初审人</label>:&nbsp;
                              { record.quantify.attnFullName || record.attnFullName }
                         </span>
                    </List.Item.Brief>
                    <List.Item.Brief>
                         <span className="shared-list-fd">
                              <label>终审人</label>:&nbsp;
                              { record.quantify.auditFullName || record.auditFullName }
                         </span>
                    </List.Item.Brief>
                    <List.Item.Brief>
                         { this.renderCheckStatusBottom(record) }
                    </List.Item.Brief>
                    <div className="shared-list-operate">
                         { this.renderOperateSvg(record) }
                    </div>
               </List.Item>
        )
    }

    /**
     * 渲染左侧审核流程图标
     * 1.正常流程待初审和待终审显示等待图标
     */
    renderRewardSvg(record) {
        const quantify = record.quantify
        const status = parseInt(quantify.status)
        const operate = quantify.operate

        if (status === constants.CHECK_STATUS.PASSED) {
            if (record.isDel) {
                return <Svg_reward_del width={ 26 } height= { 26 } className='text-red' />
            }
            return <Svg_reward_pass width={ 26 } height= { 26 } className='text-primary' />
        } else {
            if (operate === 1) {
                return <Svg_reward_reject width={ 26 } height= { 26 } className='text-red' />
            } else if (operate === 2) {
                return <Svg_reward_draw width={ 26 } height= { 26 } className='text-yellow' />
            } else {
                return <Svg_reward_wait width={ 26 } height= { 26 } className='text-primary' />
            }
        }
    }

    /**
     * 计算A分b分
     */
    getScore(score) {
        score = parseInt(score)
        if (isNaN(score)) score = 0
        if (score >= 0) {
            return score
        } else {
            return (
                <span className="text-red">{ score }</span>
            )
        }
    }

    /**
     * 渲染a分
     */
    renderAscore(record) {
        const score = record.ascore
        if (!score) {
            return null
        }
        return (
            <List.Item.Brief>
                    <span className="shared-list-bd">
                         <label>A分</label>:&nbsp;
                         { this.getScore(score) }
                    </span>
               </List.Item.Brief>
        )
    }

    /**
     * 渲染b分
     */
    renderBscore(record) {
        const score = record.bscore
        if (!score) {
            return null
        }
        return (
            <List.Item.Brief>
                    <span className="shared-list-bd">
                         <label>B分</label>:&nbsp;
                         { this.getScore(score) }
                    </span>
               </List.Item.Brief>
        )
    }
    /**
     * 渲染产值
     */
    renderOp(record) {
        const type = record.opType
        const score = record.opScore
        const virtual = type == constants.OUTPUT_TYPE.VIRTUAL ? score : 0
        const real = type == constants.OUTPUT_TYPE.REAL ? score : 0
        const create = type == constants.OUTPUT_TYPE.CREATE ? score : 0
        if (!virtual && !real && !create) {
            return null
        }
        return (
            <List.Item.Brief>
                    <span className="shared-list-bd">
                         <label>虚/实/创</label>:&nbsp;
                         { virtual+'/'+real+'/'+create }
                    </span>
               </List.Item.Brief>
        )
    }

    /**
     * 渲然审核状态 底部
     */
    renderCheckStatusBottom(record) {
        const quantify = record.quantify
        const status = quantify.status
        const operate = quantify.operate
        const isDel = record.isDel
        if (isDel == 1) {
            return (
                <span className="shared-list-st">
                     <span className="text-red">
                         <Svg_sm_del width={ 16 } height= { 16 } />
                         &nbsp;
                         <span className='text-red'>已作废</span>
                     </span>
                </span>

            )
        } else if (status === '0') {
            let spanClassName = '';
            if (operate === 1) {
                spanClassName = 'text-red'
            } else if (operate === 2) {
                spanClassName = 'text-yellow'
            } else {
                spanClassName = 'text-primary'
            }
            return (
                <span className="shared-list-st">
                     <span className={ spanClassName }>
                         <Svg_draft width={ 14 } height= { 14 } />
                         &nbsp;拟稿
                     </span>
                </span>
            )

        } else if (status === '1') {
            return (
                <span className="shared-list-st">
                         <span className="text-primary">
                             <Svg_wait width={ 14 } height= { 14 } />
                             &nbsp;待初审
                         </span>
                    </span>
            )
        } else if (status === '2') {
            return (
                <span className="shared-list-st">
                    <span className="text-primary">
                        <Svg_wait width={ 14 } height= { 14 } className='text-primary' />
                        &nbsp;待终审
                    </span>
                </span>
            )
        } else if (status === '3') {
            return (
                <span className="shared-list-st">
                    <span className="text-primary">
                        <Svg_pass width={ 14 } height= { 14 } className='text-primary' />
                        &nbsp;审核通过
                    </span>
                </span>
            )
        }
    }

    /**
     * 计算时间
     */
    getTime(str) {
        if (!str) return ''
        return new moment(str).format('YYYY-MM-DD')
    }

    /**
     * 渲染驳回驳回状态
     */
    renderOperateSvg(record) {
        const quantify = record.quantify
        const operate = quantify.operate
        if (record.isDel) {
            return <Svg_del width={ 60 } height={ 60 } className="text-red" />
        }
        if (operate === 1) {
            return <Svg_reject width={ 60 } height={ 60 } className="text-red" />
        } else if (operate === 2) {
            return <Svg_draw width={ 60 } height={ 60 } className="text-yellow" />
        }
        return null
    }
}