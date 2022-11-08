import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment, { lang } from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime:[]
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    // console.log("moment vie: ", moment(new Date()).format("dddd - DD/MM"));
    // console.log(
    //   "moment en: ",
    //   moment(new Date()).locale("en").format("ddd - DD/MM")
    // );
    this.setDate(language);
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  setDate = async (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        obj.label = this.capitalizeFirstLetter(labelVi)
      } else {
        obj.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(obj);
    }

    this.setState({
      allDays: arrDate,
    });
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setDate(this.props.language);
    }
  }
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if(res && res.errCode === 0){
        this.setState({
          allAvailableTime: res.data ? res.data : []
        })
      }
      console.log("DTM check res schedule from react: ", res);
    }
    //console.log("event onchange date value: ", event.target.value);
  };

  render() {
    let { allDays, allAvailableTime } = this.state;
    let {language} = this.props;
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnChangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calendar">
            <span>
              <i className="fa-solid fa-calendar-days"></i>Lịch khám
            </span>
          </div>
          <div className="time-content">
            {allAvailableTime && allAvailableTime.length> 0 ?
             allAvailableTime.map((item,index)=> {
              let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
              return(
                <button key={index}>{timeDisplay}</button>
              )
             })
            :<div>Không có lịch hẹn trong thời gian này. Vui lòng chọn ngày khác</div>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
