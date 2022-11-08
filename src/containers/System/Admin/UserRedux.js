import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES,CRUD_ACTIONS,CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      positionId: "",
      roleId: "",
      avatar: "",

      action:'',
      userEditId:''
    };
  }

  state = {};

  async componentDidMount() {
    this.props.fetchGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try{
    //     let res = await getAllCodeService('gender');
    //     if(res && res.errCode === 0){
    //         this.setState({
    //             genderArr : res.data
    //         })
    //     }
    //     console.log('DTM check res: ',res);
    // }
    // catch(e){
    //     console.log(e);
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        positionId:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.listusers !== this.props.listusers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        positionId:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        previewImgURL:'',
        action:CRUD_ACTIONS.CREATE
      });
    }
  }
  handleOnChangeImage =  async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
     // console.log('DTM base64 image: ', base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImg = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let {action} = this.state;
    if(action === CRUD_ACTIONS.CREATE){
      //fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.positionId,
        avatar: this.state.avatar
      });
    }
    if(action === CRUD_ACTIONS.EDIT){
      //fire redux edit user
      this.props.editUserRedux({
        id:this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.positionId,
        avatar:this.state.avatar
      })

    }


    //console.log('DTM before submit check state: ',this.state);
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserFromParent = (user) => {
    // console.log("DTM check handle edit user from parent: ", user);
    let imageBase64 = '';
    if(user.image){
      imageBase64 = new Buffer(user.image,'base64').toString('binary');
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      positionId:user.positionId,
      roleId: user.roleId,
      avatar: '',
      previewImgURL:user.image,
      action:CRUD_ACTIONS.EDIT,
      userEditId:user.id
    });
  };
  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    //console.log("dtm check props from redux ", this.props.genderRedux);
    let isGetGenders = this.props.isLoadingGender;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      positionId,
      roleId,
      avatar,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title">Learn React-Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="col-12 my-3 ">
              {isGetGenders === true ? "Loading genders" : ""}
            </div>
            <div className="row">
              <div className="col-12 my-3 ">
                <FormattedMessage id="manage-user.add"></FormattedMessage>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  value={email}
                  onChange={(event) => this.onChangeInput(event, "email")}
                  type="email"
                  disabled={this.state.action===CRUD_ACTIONS.EDIT ? true :false}
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => this.onChangeInput(event, "password")}
                  disabled={this.state.action===CRUD_ACTIONS.EDIT ? true :false}
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) => this.onChangeInput(event, "firstName")}
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) => this.onChangeInput(event, "lastName")}
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => this.onChangeInput(event, "phoneNumber")}
                ></input>
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => this.onChangeInput(event, "address")}
                ></input>
              </div>
              <div className="col-3">
                <label for="inputState">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  value={gender}
                  id="inputState"
                  class="form-control"
                  onChange={(event) => this.onChangeInput(event, "gender")}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label for="inputState1">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  value={positionId}
                  id="inputState1"
                  class="form-control"
                  onChange={(event) => this.onChangeInput(event, "positionId")}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label for="inputState2">
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  value={roleId}
                  id="inputState2"
                  class="form-control"
                  onChange={(event) => this.onChangeInput(event, "roleId")}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImage"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  ></input>
                  <label className="label-upload" htmlFor="previewImage">
                    Tải ảnh<i class="fa-solid fa-cloud-arrow-up"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImg()}
                  ></div>
                </div>
              </div>
              <div className="col-12 mt-3 mb-3">
                <button
                  className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" :"btn btn-primary"}
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" />:<FormattedMessage id="manage-user.save" />}
                  
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParentKey={this.handleEditUserFromParent}
                  action ={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    listusers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux:(data)=>dispatch(actions.editUser(data))

    //processLogout: () => dispatch(actions.processLogout()),
    //changeLanguageAppRedux : (language)=>dispatch(actions.changeLanguageApp(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
