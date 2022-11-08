import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Usermanage.scss';
import {getAllUsers, createNewUserService,deleteUserService,editUserService} from '../../services/userService';

import {emitter} from '../../utils/emitter'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers : [],
            isOpenModal : false,
            isOpenModalEditUser:false,
            userEdit:{}
        }
    }
    
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        //console.log('get user from node.js : ',response)
        if(response && response.errCode === 0){
            this.setState({
                arrUsers:response.users
            })
            //console.log(this.state.arrUsers);
        }
        //console.log('get user from node.js : ',response);      
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModal:true,
        })
    }
    toggleUserModal = () => {
        this.setState ({
        isOpenModal : ! this.state.isOpenModal
        })
    }
    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    createNewuser = async (data)=>{
        try{
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0){
                alert(response.errMessage);
            }
            else{
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModal:false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
          //  console.log('response create user: ',response);
        }
        catch(e){
            console.log(e);
        }

    }
    handleDeleteUser =  async(user) => {
        console.log(user);
        try{
            let res = await deleteUserService(user.id);
           if(res && res.errCode === 0){
            await this.getAllUsersFromReact();
           }
           else{
            alert(res.errMessage);
           }
        }catch(e){
            console.log(e);
        }
    }
    handleEditUser = async(user) => {
        // console.log('check edit user ', user);
        this.setState({
            isOpenModalEditUser:true,
            userEdit:user
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            console.log('click save user: ', res);
            if(res && res.errCode ===0 )
            {
                this.setState({
                    isOpenModalEditUser:false
                })
                await this.getAllUsersFromReact();
            }else{
                alert(res.errMessage)
            }
        }
        catch(e){
            console.log(e);
        }
    }


    render() {

        //console.log('check render',this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                isOpen = {this.state.isOpenModal}
                toggleFormParent = {this.toggleUserModal}
                test = {'abc'}
                createNewuser = {this.createNewuser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                    isOpen = {this.state.isOpenModalEditUser}
                    toggleFormParent = {this.toggleEditUserModal}
                    currentUser = {this.state.userEdit}
                    editUser = {this.doEditUser}
                    // createNewuser = {this.createNewuser}
                    />
                }
                <div className='title text-center'>Manage users with Eric
                </div>
                <div className='mx-1 add-user'>
                    <button className='btn btn-primary btn-add'
                    onClick={()=>this.handleAddNewUser()}>
                        <i className="fa-solid fa-square-plus btn-add_icon"></i>Add new user</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                <table id="customers">
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {
                        arrUsers && arrUsers.map ((item,index)=>{
                           // console.log('DTM check map',item,index)
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={()=>this.handleEditUser(item)}><i className="fa-solid fa-square-pen"></i></button>
                                        <button className='btn-delete'onClick={()=> this.handleDeleteUser(item)}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
