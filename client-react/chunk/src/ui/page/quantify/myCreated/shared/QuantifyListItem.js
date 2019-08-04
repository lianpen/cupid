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
import Svg_draw from 'assets/svg/lg_draw.svg'
import Svg_del from 'assets/svg/lg_del.svg'

export default class QuantifyListItem extends BaseRc {
    render() {
        const quantify = this.props.quantify
        return (
            <List.Item multipleLine onClick={ this.props.onClick } className="shared-list" >
                    <div className="shared-list-lf" style={{ top: 7 }}>
                         { this.renderRewardSvg(quantify) }
                    </div>
                    <div className="shared-list-bd title">{ quantify.data.quantifyName }</div>
                    { this.renderAscore(quantify) }
                    { this.renderBscore(quantify) }
                    { this.renderOp(quantify) }
                    { this.renderPersonNum(quantify) }
                    <List.Item.Brief>
                         <span className="shared-list-fd">
                             <label>初审人</label>:&nbsp;
                             { quantify.data.attnFullName }
                         </span>
                         </List.Item.Brief>
                         <List.Item.Brief>
                         <span className="shared-list-fd">
                             <label>终审人</label>:&nbsp;
                             { quantify.data.auditFullName }
                         </span>
                    </List.Item.Brief>
                    <List.Item.Brief>
                         { this.renderCheckStatusBottom(quantify) }
                    </List.Item.Brief>
                    <div className="shared-list-operate">
                         { this.renderOperateSvg(quantify) }
                    </div>
               </List.Item>
        )
    }

    /**
     * 渲染左侧审核流程图标
     * 1.正常流程待初审和待终审显示等待图标
     */
    renderRewardSvg(quantify) {
        const status = parseInt(quantify.data.status)
        const operate = quantify.data.operate

        if (status === constants.CHECK_STATUS.PASSED) {
            if (quantify.data.isDel) {
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
    getScore(reward, deduct) {
        if (reward && deduct) {
            return (
                <span>
                    { reward } / <span className="text-red">-{ deduct }</span> 
                </span>
            )
        } else if (reward && !deduct) {
            return reward
        } else if (!reward && deduct) {
            return (
                <span className="text-red">-{ deduct }</span>
            )
        } else {
            return null
        }
    }

    /**
     * 渲染a分
     */
    renderAscore(quantify) {
        if (!quantify || !quantify.data || !quantify.data.integralQuantifyInfo) return null
        const ascoreReward = quantify.data.integralQuantifyInfo.ascoreReward
        const ascoreDeduct = quantify.data.integralQuantifyInfo.ascoreDeduct
        if (!ascoreReward && !ascoreDeduct) {
            return null
        }
        return (
            <List.Item.Brief>
               <span className="shared-list-bd">
                    <label>A分</label>:&nbsp;
                    { this.getScore(ascoreReward, ascoreDeduct) }
               </span>
            </List.Item.Brief>
        )
    }

    /**
     * 渲染b分
     */
    renderBscore(quantify) {
        if (!quantify || !quantify.data || !quantify.data.integralQuantifyInfo) return null
        const bscoreReward = quantify.data.integralQuantifyInfo.bscoreReward
        const bscoreDeduct = quantify.data.integralQuantifyInfo.bscoreDeduct
        if (!bscoreReward && !bscoreDeduct) {
            return null
        }
        return (
            <List.Item.Brief>
                    <span className="shared-list-bd">
                         <label>B分</label>:&nbsp;
                         { this.getScore(bscoreReward, bscoreDeduct) }
                    </span>
               </List.Item.Brief>
        )
    }
    /**
     * 渲染产值
     */
    renderOp(quantify) {
        if (!quantify || !quantify.data || !quantify.data.integralQuantifyInfo) return null
        const opscoreGen = quantify.data.integralQuantifyInfo.opscoreGen
        const opscoreReal = quantify.data.integralQuantifyInfo.opscoreReal
        const opscoreVirtual = quantify.data.integralQuantifyInfo.opscoreVirtual
        if (!opscoreGen && !opscoreReal && !opscoreVirtual) {
            return null
        }
        return (
            <List.Item.Brief>
                    <span className="shared-list-bd">
                         <label>虚/实/创</label>:&nbsp;
                         { opscoreVirtual+'/'+opscoreReal+'/'+ opscoreGen}
                    </span>
               </List.Item.Brief>
        )
    }

    /**
     * 渲染人次
     */
    renderPersonNum(quantify) {
        const personNum = quantify.data.integralQuantifyInfo ? quantify.data.integralQuantifyInfo.empCount : 0
        if (!personNum) {
            return null
        }
        return (
            <List.Item.Brief>
                <span className="shared-list-bd">
                    <label>人次</label>:&nbsp;
                    { personNum }
                </span>
            </List.Item.Brief>
        )
    }

    /**
     * 渲然审核状态 底部
     */
    renderCheckStatusBottom(quantify) {
        const status = quantify.data.status
        const operate = quantify.data.operate
        const isDel = quantify.data.isDel
        if (isDel == 1) {
            return (
                <span className="shared-list-st">
                     <span className="text-red">
                         <Svg_sm_del width={ 16 } height= { 16 } />
                         &nbsp;
                         <span className='text-red'>已作废</span>
                     </span>
                     <span>{ new moment(quantify.data.lastEditDate).format('YYYY-MM-DD') }</span>
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
                     <span >
                          {new moment(quantify.lastEditDate).format('YYYY-MM-DD') }
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
                     <span >
                          { new moment(quantify.data.createDate).format('YYYY-MM-DD') }
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
                    <span >{ new moment(quantify.data.attnTime).format('YYYY-MM-DD') }</span>
                </span>
            )
        } else if (status === '3') {
            return (
                <span className="shared-list-st">
                    <span className="text-primary">
                        <Svg_pass width={ 14 } height= { 14 } className='text-primary' />
                        &nbsp;审核通过
                    </span>
                    <span>{ new moment(quantify.data.auditTime).format('YYYY-MM-DD') }</span>
                </span>
            )
        }
    }

    /**
     * 渲染驳回驳回状态
     */
    renderOperateSvg(quantify) {
        const operate = quantify.data.operate
        if (quantify.data.isDel) {
            return <Svg_del  width={ 60 } height={ 60 } className="text-red" />
        }
        if (operate === 1) {
            return <Svg_reject width={ 60 } height={ 60 } className="text-red" />
        } else if (operate === 2) {
            return <Svg_draw width={ 60 } height={ 60 } className="text-yellow" />
        }
        return null
    }
}