<template>
    <div class="organization-structure">
        <div class="user-box">
            <div class="new-title-public">组织架构管理</div>
            <div class="btn-group">
                <span class="gy-button-extra mr10" v-show="!isFirst" @click="addPerson">添加人员</span>
                <span class="gy-button-normal mr10" v-show="!isFirst" @click="deleteDepartmentPerson">删除人员</span>
                <button type="button" :class="isFirst ? 'gy-button-extra' : 'gy-button-normal'"
                        @click="addDepartmentClick">添加部门</button>
                <button type="button" v-show="!isFirst" class="gy-button-normal mrl10" @click="editDepartmentClick">修改部门
                </button>
                <button type="button" v-show="!isFirst" class="gy-button-normal" @click="deleteDepartment">删除部门</button>
            </div>
        </div>
        <div class="organization-wrapper" :style="{minHeight: dragWrapperHeight}" :class="{'eResize' : mouseOver}">
            <div class="organization-menu" id="dragBox">
                <div class="dragLine" id="dragLine"></div>
                <div class="menuData" v-if="menuData" id="dragMenu">
                    <el-tree :data="menuData" :default-expand-all="true" :props="defaultProps"
                             @node-click="handleNodeClick"></el-tree>
                </div>
            </div>
            <div class="organization-content user-box" id="dragContent">
                <div style="padding: 12px 16px">
                    <div class="gy-table" v-if="departmentData.list">
                        <el-table
                            :data="departmentData.list"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                prop="username"
                                label="姓名">
                            </el-table-column>
                            <el-table-column
                                prop="account"
                                label="用户名">
                            </el-table-column>
                            <el-table-column
                                prop="phone"
                                label="手机"
                                show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="departmentName" v-if="departmentData.personNum">
                    {{'当前部门及子部门共计: ' + departmentData.personNum + '人'}}
                </div>
                <div class="departmentName" v-else>当前部门及子部门共计: 0人</div>
            </div>
        </div>
        <el-dialog class="AddressManagement" width="800px" :title="departmentClick === 'add' ? '添加部门' : '修改部门'"
                   :visible.sync="dialogAddDepartment" :append-to-body="true">
            <div>
                <div class="gy-form-group" style="height: 50px">
                    <span class="l"><strong>*</strong>名称</span>
                    <input type="text" v-model="addDepartment.name" placeholder="请输入名称">
                </div>
                <div class="gy-form-group">
                    <span class="l">上级部门</span>
                    <div class="chkHigherAuthorities">
                        <input type="text" placeholder="请选择" v-model="addDepartment.parentName"
                               @click="chkHigherAuthorities = true">
                        <i class="el-icon-arrow-down" :class="{'el-rotate' : (chkHigherAuthorities && menuData)}"
                           @click="chkHigherAuthorities = true" style="position: absolute;right: 0;top: 7px;"></i>
                        <div v-if="chkHigherAuthorities && menuData" class="chkOrganization-content">
                            <el-tree :data="menuData" accordion :props="defaultProps"
                                     @node-click="higherAuthoritiesClick"></el-tree>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group ipt-number" style="display: none">
                    <span class="l"><strong>*</strong>排序</span>
                    <el-input-number controls-position="right" v-model="addDepartment.orderNum" :min="0"
                                     :max="10"></el-input-number>
                </div>
                <div style="clear: both"></div>
                <div style="text-align: right">
                    <span class="gy-button-extra mr10" @click="doAddDepartment">保存</span>
                    <span class="gy-button-normal" @click="dialogAddDepartment = false">取消</span>
                </div>
            </div>
        </el-dialog>
        <el-dialog class="AddressManagement" width="600px" title="添加人员" :visible.sync="dialogAddPerson"
                   :append-to-body="true">
            <div v-if="dialogAddPerson">
                <div style="max-height: 400px;overflow: auto">
                    <table class="gy-table">
                        <thead>
                        <tr>
                            <th>
                                <el-checkbox @change="addPersonChkAll"></el-checkbox>
                                <span style="margin-left: 5px">#</span></th>
                            <th>人员姓名</th>
                            <th>手机号</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) of companyPersonList" :key="index">
                            <td>
                                <el-checkbox v-model="item.isOrganization" :true-label="1"
                                             :false-label="0"></el-checkbox>
                                <span style="margin-left: 5px">{{index + 1}}</span>
                            </td>
                            <td>{{item.username}}</td>
                            <td>{{item.phone}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style="text-align: right;margin-top: 15px">
                    <span class="gy-button-extra mr10" @click="doAddPerson">确定</span>
                    <span class="gy-button-normal" @click="dialogAddPerson = false;">取消</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dialogAddPerson: false,
            menuData: [],
            defaultProps: {
                children: 'list',
                label: 'name'
            },
            departmentName: null,
            departmentData: {
                'id': null,
                'userId': null,
                'organizationId': null,
                'companyId': null,
                'username': null,
                'account': null,
                'title': null,
                'isAdmin': null,
                'sex': null,
                'phone': null,
                'personNum': null,
                'list': []
            },
            dialogAddDepartment: false,
            chkHigherAuthorities: false,
            deletePerson: {
                companyId: null,
                roleIdList: [],
                valid: 0
            },
            chkPersonList: [],
            addDepartment: {
                desc: null,
                level: null,
                name: null,
                orderNum: null,
                parentId: null,
                parentName: null,
                usrCompanyId: null
            },
            organizationId: null,
            departmentClick: null,
            companyPersonList: [],
            companyName: null,
            isFirst: false,
            mouseOver: false,
            dragWrapperHeight: 0
        };
    },
    created () {
        if (localStorage.getItem('userInfo')) {
            this.deletePerson.companyId = JSON.parse(localStorage.getItem('userInfo')).companyId;
            this.addDepartment.usrCompanyId = JSON.parse(localStorage.getItem('userInfo')).companyId;
            this.companyName = JSON.parse(localStorage.getItem('userInfo')).companyName;
        }
        this.getOrganizationList();
    },
    mounted () {
        this.drag();
    },
    methods: {
        resetHeight () {
            Promise.resolve().then(() => {
                this.dragWrapperHeight = document.getElementById('dragMenu').offsetHeight + 10 + 'px';
            });
        },
        drag () {
            let oBox = document.getElementById('dragBox');
            let oLine = document.getElementById('dragLine');
            let oContent = document.getElementById('dragContent');
            // let wrapperWidth = 1153;
            oLine.onmousedown = (ev) => {
                let iEvent = ev || event;
                let dx = iEvent.clientX;
                let dw = oBox.offsetWidth;
                this.mouseOver = true;
                document.onmousemove = (ev) => {
                    let iEvent = ev || event;
                    if (dw + (iEvent.clientX - dx) < 300) {
                        oBox.style.width = '300px';
                        oLine.style.left = '295px';
                        // oContent.style.width = '1153px';
                        oContent.style.paddingLeft = '305px';
                    } else if (dw + (iEvent.clientX - dx) > 700) {
                        oBox.style.width = '700px';
                        oLine.style.left = '695px';
                        // oContent.style.width = '447px';
                        oContent.style.paddingLeft = '705px';
                    } else {
                        oBox.style.width = dw + (iEvent.clientX - dx) + 'px';
                        oLine.style.left = dw + (iEvent.clientX - dx) - 5 + 'px';
                        // oContent.style.width = wrapperWidth - (dw + (iEvent.clientX - dx)) - 6 + 'px';
                        oContent.style.paddingLeft = dw + (iEvent.clientX - dx) + 5 + 'px';
                    }
                };
                document.onmouseup = () => {
                    this.mouseOver = false;
                    document.onmousedown = null;
                    document.onmousemove = null;
                };
                return false;
            };
        },
        // 添加人员全选
        addPersonChkAll (type) {
            this.companyPersonList.forEach((e) => {
                e.isOrganization = type ? 1 : 0;
            });
        },
        // 部门选中
        handleNodeClick (item) {
            this.organizationId = item;
            this.getDepartmentList();
            this.departmentName = item.name;
        },
        // 获取组织结构列表
        getOrganizationList () {
            this.$http.get(this.$api.organizational.organizationalList + '/' + 0)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.menuData = res.data.data;
                        this.handleNodeClick(res.data.data[0]);
                        this.resetHeight();
                    }
                });
        },
        // 获取选中部门下员工
        getDepartmentList () {
            if (!this.organizationId.id) {
                this.organizationId.id = 0;
            }
            this.$http.get(this.$api.organizational.departmentList + '/' + this.organizationId.id)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.departmentData = res.data.data;
                        if (this.departmentData.list === null || this.departmentData.list === '') {
                            this.departmentData.list = [];
                        }
                    }
                })
                .catch((e) => {
                    console.log('出错了' + e);
                });
        },
        // 部门人员列表选中（全选）
        handleSelectionChange (val) {
            this.chkPersonList = val;
        },
        // 添加（修改部门）选中上级部门
        higherAuthoritiesClick (item) {
            this.addDepartment.parentId = item.id;
            this.addDepartment.parentName = item.name;
            this.chkHigherAuthorities = false;
        },
        // 添加部门
        addDepartmentClick () {
            this.departmentClick = 'add';
            this.dialogAddDepartment = true;
            this.chkHigherAuthorities = false;
            this.addDepartment = {
                desc: null,
                level: null,
                name: null,
                orderNum: null,
                parentId: this.organizationId.id,
                parentName: this.organizationId.name,
                usrCompanyId: null
            };
        },
        // 添加（修改）部门保存
        doAddDepartment () {
            if (this.departmentClick === 'edit' && this.organizationId && this.addDepartment.parentId && this.organizationId.id === this.addDepartment.parentId) {
                this.$message.error('不能设置自身部门为上级部门！');
                return;
            }
            if (this.addDepartment.name === null) {
                this.$message.error('名称不能为空！');
                return;
            }
            this.addDepartment.parentId = this.addDepartment.parentId === null ? 0 : this.addDepartment.parentId;
            if (this.addDepartment.orderNum === null) {
                this.$message.error('请先设置部门排序！');
                return;
            }
            if (this.departmentClick === 'add') {
                this.$http.post(this.$api.organizational.addDepartment, this.addDepartment)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.dialogAddDepartment = false;
                            this.$message.success('添加成功！');
                            this.getOrganizationList();
                        } else if (res.data.code === -1) {
                            this.$message.error(res.data.message);
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
            if (this.departmentClick === 'edit') {
                this.$http.put(this.$api.organizational.addDepartment, this.addDepartment)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.dialogAddDepartment = false;
                            this.$message.success('修改成功！');
                            this.getOrganizationList();
                        } else if (res.data.code === -1) {
                            this.$message.error(res.data.message);
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        // 删除部门（确认提示）
        deleteDepartment () {
            if (this.organizationId === null) {
                this.$message.error('请先选择部门！');
                return;
            }
            if (this.organizationId.id === null) {
                this.$message.error('最上级部门无法删除！');
                return;
            }
            this.$confirm('确认删除该部门?', '提示', {
                confirmButtonText: '确定',
                confirmButtonClass: 'gy-button-extra',
                cancelButtonText: '取消',
                cancelButtonClass: 'gy-button-normal',
                type: 'warning',
                callback: this.doDeleteDepartment
            });
        },
        // 删除部门确认提示 确认/取消回调
        doDeleteDepartment (type) {
            if (type === 'cancel') return;
            this.$http.put(this.$api.organizational.deleteDepartment, {id: this.organizationId.id})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('删除成功！');
                        this.getOrganizationList();
                    } else if (res.data.code === -1) {
                        this.$message.error(res.data.message);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 修改部门(按钮)
        editDepartmentClick () {
            this.departmentClick = 'edit';
            this.dialogAddDepartment = true;
            this.chkHigherAuthorities = false;
            this.addDepartment.name = this.organizationId.name;
            this.addDepartment.id = this.organizationId.id;
            this.addDepartment.parentName = this.organizationId.parentName;
            this.addDepartment.parentId = this.organizationId.parentId;
            this.addDepartment.orderNum = this.organizationId.orderNum;
        },
        // 部门添加人员（按钮）
        addPerson () {
            if (this.organizationId === null) {
                this.$message.error('请先选择部门！');
                return;
            }
            this.dialogAddPerson = true;
            this.getAllCompangPerson();
        },
        // 获取可添加人员列表(公司全员)
        getAllCompangPerson () {
            this.$http.get(this.$api.organizational.companyPersonAll + this.organizationId.id)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.companyPersonList = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 删除部门下员工(按钮)
        deleteDepartmentPerson () {
            if (this.organizationId === null) {
                this.$message.error('请先选择部门！');
                return;
            }
            if (this.chkPersonList.length === 0) {
                this.$message.error('请先选择要删除的人员！');
                return;
            }
            let userIdList = [];
            this.chkPersonList.forEach((e) => {
                userIdList.push(e.userId);
            });
            let params = {
                organizationId: this.organizationId.id,
                userIdList: userIdList
            };
            this.$http.put(this.$api.organizational.deletePerson, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('删除成功！');
                        this.getDepartmentList();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 添加人员保存(按钮)
        doAddPerson () {
            let userIdList = [];
            this.companyPersonList.forEach((e) => {
                if (e.isOrganization === 1) {
                    userIdList.push(e.userId);
                }
            });
            if (userIdList.length === 0) {
                this.$message.error('请先选择人员！');
            }
            let params = {
                userIdList: userIdList,
                usrOrganizationId: this.organizationId.id
            };
            this.$http.put(this.$api.organizational.doAddPerson, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.dialogAddPerson = false;
                        this.$message.success('添加成功！');
                        this.getDepartmentList();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
    watch: {
        organizationId () {
            this.isFirst = (this.organizationId.id === 0);
        }
    }
};
</script>

<style lang="scss" scoped>
    .user-box {
        position: relative;
        margin-bottom: 0;
        .btn-group {
            position: absolute;
            top: 5px;
            right: 0;
            height: 100%;
            padding: 2px 15px;
        }
    }
    .mr10{
        margin-right: 10px;
    }
    .mrl10{
        margin: 0 10px;
    }
    .organization-wrapper {
        position: relative;
        .organization-menu {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9;
            width: 300px;
            height: auto;
            padding-top: 10px;
            padding-bottom: 1000px;
            margin-bottom: -999px;
            border-right: 1px solid $color-border;
            font-size: 14px;
            .dragLine {
                width: 10px;
                height: 1000px;
                position: absolute;
                left: 295px;
                top: 0;
                cursor: ew-resize;
            }
            .company-name {
                padding: 5px 10px;
            }
            .menuData {
                width: 100%;
                height: 100%;
                overflow-x: auto;
                position: relative;
                /deep/ .el-tree-node > .el-tree-node__children {
                    overflow: visible;
                }
            }
        }
        .organization-content {
            width: 1153px;
            padding-left: 305px;
            height: auto;
            .departmentName {
                color: #666;
                text-align: left;
                padding-left: 16px;
                margin-top: 8px;
                font-size: 12px;
            }
            .btn-group1 {
                text-align: right;
                padding: 5px 15px;
            }
        }
    }

    /deep/ .ipt-number {
        .el-input {
            border: 1px solid #e6eaea;
        }
        input {
            border-bottom: 0;
        }
    }

    .chkHigherAuthorities {
        position: relative;
        .chkOrganization-content {
            position: absolute;
            width: 100%;
            padding-bottom: 20px;
            background: #fff;
        }
        .el-icon-arrow-down {
            transition: all 0.3s;
        }
        .el-rotate {
            transform: rotate(180deg);
        }
    }

    /deep/ .el-table_1_column_1 {
        line-height: 1;
        .cell {
            line-height: 1;
        }
    }

    .new-title-public {
        height: 45px;
        line-height: 45px;
        padding:0 16px;
        font-size: 16px;
        font-weight: 700;
        color: $color-title;
        border-bottom: 1px solid $color-border;
    }

    .eResize {
        cursor: ew-resize !important;
    }
</style>
<style lang="scss">
    .el-message-box__btns {
        .gy-button-normal {
            float: right;
        }
        .gy-button-extra {
            background-color: #e0370f !important;
            color: #fff !important;
            border-color: #e0370f !important;
            float: right;
            margin-right: 10px;
        }
    }

    .organization-structure {
        .el-dialog__header {
            border-bottom: 1px solid $color-border;
        }
        .el-input-number.is-controls-right .el-input__inner {
            font-size: 16px;
        }
    }
</style>
<style lang="scss">
    .AddressManagement {
        .el-dialog__header {
            border-bottom: 1px solid $color-border;
            padding: 15px;
        }
        .el-dialog {
            input {
                font-size: 14px;
                color: $color-main;
            }
            /deep/ ::placeholder {
                font-size: 14px !important;
                color: $color-minor !important;
            }
        }
    }
</style>
