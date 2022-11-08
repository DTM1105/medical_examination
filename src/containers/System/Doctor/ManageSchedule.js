import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";
import {toast} from 'react-toastify';
import _ from "lodash";
import {saveBulkScheduleDoctor} from '../../../services/userService'
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTime();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        //  data.map(item => {
        //     item.isSelected = false
        //     return item;
        // })
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor });
    // let res = await getDetailInforDoctor(selectedDoctor.value);
    // if (res && res.errCode === 0 && res.data && res.data.Markdown) {
    //   let markdown = res.data.Markdown;
    //   this.setState({
    //     contentHTML: markdown.contentHTML,
    //     contentMarkdown: markdown.contentMarkdown,
    //     description: markdown.description,
    //     hasOldData:true
    //   });
    // } else {
    //   this.setState({
    //     contentHTML: "",
    //     contentMarkdown: "",
    //     description: "",
    //     hasOldData:false
    //   });
    // }
    // console.log(`DTM:`, res);
  };
  hanldeOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickBtnTime = (time) => {
    console.log("DTM check time: ", time);
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
        rangeTime = rangeTime.map(item => {
            if(item.id === time.id)
                item.isSelected = !item.isSelected;
                return item;
        })
        this.setState({
            rangeTime:rangeTime
        })
    }
    console.log(rangeTime);
  };
  handleSaveSchedule = async ()=> {
    let {rangeTime,currentDate,selectedDoctor} = this.state;
    let result = [];
    //trong hàm if có return để ko bị hiện 2 toast cùng lúc 
    if(!currentDate){
        toast.error("Invalid date!!!");
        return;
    }
    // _.isEmpty thư viện lodash kiểm tra xem mảng đó có giá trị hay k
    if(selectedDoctor && _.isEmpty(selectedDoctor)){
        toast.error("Invalid selected doctor!!!")
        return;
    }
    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
    //  = moment(currentDate).unix()
     let formatedDate = new Date(currentDate).getTime();
     console.log(formatedDate)
    if(rangeTime && rangeTime.length > 0){
        let selectedTime = rangeTime.filter(item => item.isSelected === true)
        if(selectedTime && selectedTime.length > 0){
            selectedTime.map(schedule => {
                let obj = {};
                obj.doctorId= selectedDoctor.value;
                obj.timeType = schedule.keyMap;
                obj.date = formatedDate;
                result.push(obj);
            })
        }else{
            toast.error("Invalid selected time!!!")
            return;
        }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      date:formatedDate
    });
    console.log('check result', res);
  }

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    // console.log("DTM check props: ", this.state);
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                className="form-control"
                onChange={this.hanldeOnChangeDatePicker}
                value={this.state.currentDate}
                minDate={new Date()}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={item.isSelected === true ? 
                        "btn btn-schedule active":"btn btn-schedule"}
                      key={index}
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button className="btn btn-primary btn-save-schedule"
              onClick={()=> this.handleSaveSchedule()}>
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allSheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: (id) => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
