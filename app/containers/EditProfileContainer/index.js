/**
 *
 * EditProfileContainer
 *
 */

import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import ProfileComponent from 'components/ProfileComponent';
import SweetAlertPopup from 'components/SweetAlertPopup';
import UploadImage from 'components/UploadImage';
import WavesButton from 'components/WavesButton';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  MotherTongue,
  MatrialStatus,
  Community,
  Religion,
  BloodGroup,
  HairType,
  BodyType,
  SkinTone,
  FamilyAffluence,
  Star,
  MovieGenre,
} from '../../config/dropDownListData';
import { nodeApiServerUrl } from '../../config/envChecker';
import { USERDETAIL } from '../../config/getUserDetailFromLocalStorage';
import femaleAvator from '../../images/femaleAvator.gif';
import MaleAvator from '../../images/MaleAvator.gif';
import './EditProfileContainerStyle.scss';

import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectEditProfileContainer from './selectors';

export class EditProfileContainer extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {};
    this.inputChange = this.inputChange.bind(this);
    // this.dropDownChangeHandler = this.dropDownChangeHandler.bind(this);
  }

  componentWillMount() {
    try {
      console.log('timmy my love');
      axios
        .post(`${nodeApiServerUrl}/api/getuserdetail`, {
          userId: USERDETAIL._id,
        })
        .then((data) => {
          if (status === 200 && statusText === 'OK') {
            console.log('data is: ', data);
            console.log(" user ", data.user);
            Object.entries(data.user).forEach(([key, value]) => {
              const newValue =
                key === 'dob' ? moment(value).format('YYYY-MM-DD') : value;
              this.setState({ [key]: newValue });
            });
            console.log('this state: ', this.state);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }
  inputChange(name, value) {
    this.setState({
      [name]: value,
    });
    console.log(`handle input change name: ${name}, value: ${value}`);
  }
  dropDownChangeHandler = ({ dropDownType, value }) => {
    this.setState({
      [dropDownType]: value,
    });
  };
  updateAndSaveHandler = () => {
    try {
      axios
        .post(
          `${nodeApiServerUrl}/api/updateandsaveuser`,
          Object.assign({}, this.state, { userId: USERDETAIL._id })
        )
        .then(({ data, status, statusText }) => {
          console.log('moment age: ', data);
          localStorage.setItem('user_detail', JSON.stringify(data.user));
          // console.log(localStorage.getItem('user_detail'));
          if (status === 200 && statusText === 'OK') {
            SweetAlertPopup(
              'Success!',
              'Your data is update & save Successfuly!',
              'success'
            );
            // window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          SweetAlertPopup('Oops...', 'Something went wrong!', 'error');
        });
    } catch (error) {
      console.error('catch error: ', error);
    }
  };

  render() {
    const {
      fname,
      email,
      lname,
      education,
      religion,
      aboutMySelf,
      bloodGroup,
      community,
      dob,
      annualIncome,
      drink,
      familyAffluence,
      height,
      motherTongue,
      phone,
      province,
      smoke,
      status,
      skinTone,
      gender,
      image,
      hairType,
      star,
      movieGenre,
      bodyType,
      sport,
      weight,
      city,
      country,
      ethenic,
    } = this.state;
    const avator = gender === 'Male' ? MaleAvator : femaleAvator;
    const newImage = image || avator;
    console.log('image is: ', image);
    return (
      <div className="container">
        <Helmet>
          <title>EditProfileContainer</title>
          <meta
            name="description"
            content="Description of EditProfileContainer"
          />
        </Helmet>
        <div className="row edit-profile-container">
          <div className="col-12 col-md-12 col-lg-3 col-sm-12">
            <ProfileComponent />
          </div>
          <div className="col-12 col-md-12 col-lg-8 col-sm-12">
            <div className="edit-profile-wrapper">
              <form>
                <div className="row">
                  <div className="col-12">
                    <h3 className="edit-personal-profile-heading">
                      <FormattedMessage {...messages.header} />
                    </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <img
                      src={newImage}
                      alt=""
                      className="profile-image img-thumbnail"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <UploadImage userId={USERDETAIL._id} />
                  </div>
                </div>
                <Input
                  id="fname"
                  label="First Name"
                  placeholder="Enter first name"
                  value={fname}
                  name="fname"
                  type="text"
                  inputChange={this.inputChange}
                />

                <Input
                  id="lname"
                  label="Last Name"
                  placeholder="Enter last name"
                  value={lname}
                  name="lname"
                  type="text"
                  inputChange={this.inputChange}
                />

                <div className="form-group form-check-inline">
                  <label htmlFor="fname">
                    Gender
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="gender1"
                      value="Male"
                      checked={gender === 'Male'}
                      onChange={() =>
                        this.setState({ gender: 'Male' }, () => {
                          console.log('gender:', this.state.gender);
                        })}
                    />
                    <label className="form-check-label" htmlFor="gender1">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="gender2"
                      value="Female"
                      checked={gender === 'Female'}
                      onChange={() =>
                        this.setState({ gender: 'Female' }, () => {
                          console.log('gender:', this.state.gender);
                        })}
                    />
                    <label className="form-check-label" htmlFor="gender2">
                      Female
                    </label>
                  </div>
                </div>
                <br />
                <div className="form-group form-check-inline">
                  <label htmlFor="drink">
                    Drink
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="drink"
                      id="drink1"
                      value="yes"
                      checked={drink === 'yes'}
                      onChange={() => this.setState({ drink: 'yes' })}
                    />
                    <label className="form-check-label" htmlFor="drink1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="drink"
                      id="drink2"
                      value="no"
                      checked={drink === 'no'}
                      onChange={() => this.setState({ drink: 'no' })}
                    />
                    <label className="form-check-label" htmlFor="drink2">
                      No
                    </label>
                  </div>
                </div>
                <br />
                <div className="form-group form-check-inline">
                  <label htmlFor="smoke">
                    Smoke
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="smoke"
                      id="smoke1"
                      value="yes"
                      checked={smoke === 'yes'}
                      onChange={() => this.setState({ smoke: 'yes' })}
                    />
                    <label className="form-check-label" htmlFor="smoke1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="smoke"
                      id="smoke2"
                      value="no"
                      checked={smoke === 'no'}
                      onChange={() => this.setState({ smoke: 'no' })}
                    />
                    <label className="form-check-label" htmlFor="smoke2">
                      No
                    </label>
                  </div>
                </div>

                <Input
                  id="email"
                  label="Email"
                  placeholder="Enter update email"
                  value={email}
                  name="email"
                  type="email"
                  inputChange={this.inputChange}
                />

                <Input
                  id="education"
                  label="Education"
                  placeholder="Enter Education"
                  value={education}
                  name="education"
                  type="text"
                  inputChange={this.inputChange}
                />
                <Input
                  id="dob"
                  label="Date of Birth"
                  placeholder="Enter Date of birth"
                  value={dob}
                  name="dob"
                  type="date"
                  inputChange={this.inputChange}
                />

                <Input
                  id="height"
                  label="Height (e.g 5.5)"
                  placeholder="Enter height eg. 5.5"
                  value={height}
                  name="height"
                  type="text"
                  inputChange={this.inputChange}
                />
                <Input
                  id="weight"
                  label="Weight (e.g 65kg)"
                  placeholder="Enter Weight in Kg"
                  value={weight}
                  name="weight"
                  type="text"
                  inputChange={this.inputChange}
                />

                <div className="form-group">
                  <Dropdown
                    label="Status"
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={MatrialStatus}
                    defaultValue={status}
                    dropDownType={status}
                  />
                </div>
                {/* <div className="form-group">
                  <Dropdown
                    label="Star"
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={Star}
                    defaultValue={star}
                    dropDownType={star}
                  />
                </div> */}
                <div className="form-group">
                  <Dropdown
                    label="Movie Genre"
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={MovieGenre}
                    defaultValue={movieGenre}
                    dropDownType={movieGenre}
                  />
                </div>
                <Input
                  id="sport"
                  label="Sport"
                  placeholder="Enter Sport"
                  value={sport}
                  name="sport"
                  type="text"
                  inputChange={this.inputChange}
                />
                <Input
                  id="ethenic"
                  label="Ethenic"
                  placeholder="Enter your Ethenic city"
                  value={ethenic}
                  name="ethenic"
                  type="text"
                  inputChange={this.inputChange}
                />
                <Input
                  id="annualIncome"
                  label="Annual Income (e.g 30000)"
                  placeholder="Enter your Annual Income"
                  value={annualIncome}
                  name="annualIncome"
                  type="text"
                  inputChange={this.inputChange}
                />
                <div className="form-group">
                  <Dropdown
                    label="Family Affluence"
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={FamilyAffluence}
                    defaultValue={familyAffluence}
                    dropDownType={familyAffluence}
                  />
                </div>
                <div className="form-group">
                  <Dropdown
                    label="Skin Tone"
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={SkinTone}
                    defaultValue={skinTone}
                    dropDownType={skinTone}
                  />
                </div>
                <div className="form-group">
                  <Dropdown
                    label="Body Type"
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={BodyType}
                    defaultValue={bodyType}
                    dropDownType={bodyType}
                  />
                </div>
                <div className="form-group">
                  <Dropdown
                    label="Hair Type"
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={HairType}
                    defaultValue={hairType}
                    dropDownType={hairType}
                  />
                </div>

                <div className="form-group">
                  <Dropdown
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={Community}
                    defaultValue={community}
                    dropDownType={community}
                    label="Caste"
                  />
                </div>

                <div className="form-group">
                  <Dropdown
                    label="Religion"
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={Religion}
                    defaultValue={religion}
                    dropDownType={religion}
                  />
                </div>

                <div className="form-group">
                  <Dropdown
                    label={'Mother Tongue'}
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={MotherTongue}
                    defaultValue={motherTongue}
                    dropDownType={motherTongue}
                  />
                </div>

                <div className="form-group">
                  <Dropdown
                    label={'Blood Group'}
                    dropDownChangeHandler={this.dropDownChangeHandler}
                    options={BloodGroup}
                    defaultValue={bloodGroup}
                    dropDownType={bloodGroup}
                  />
                </div>

                <Input
                  id="phone"
                  label="Phone"
                  placeholder="Enter phone"
                  value={phone}
                  name="phone"
                  type="text"
                  inputChange={this.inputChange}
                />

                <Input
                  id="city"
                  label="City"
                  placeholder="Enter city"
                  value={city}
                  name="city"
                  type="text"
                  inputChange={this.inputChange}
                />

                <Input
                  id="province"
                  label="Province"
                  placeholder="Enter province"
                  value={province}
                  name="province"
                  type="text"
                  inputChange={this.inputChange}
                />

                <Input
                  id="country"
                  label="Country"
                  placeholder="Enter country"
                  value={country}
                  name="country"
                  type="text"
                  inputChange={this.inputChange}
                />
                <Input
                  id="aboutMySelf"
                  label="About Myself"
                  placeholder="about you self"
                  value={aboutMySelf}
                  name="aboutMySelf"
                  type="text"
                  inputChange={this.inputChange}
                />

                <div className="row">
                  <div className="col-6" />
                  <div className="col-6">
                    <WavesButton
                      label={'Save & Update'}
                      clickHandler={(e) => this.updateAndSaveHandler(e)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfileContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editprofilecontainer: makeSelectEditProfileContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editProfileContainer', reducer });
const withSaga = injectSaga({ key: 'editProfileContainer', saga });

export default compose(withReducer, withSaga, withConnect)(
  EditProfileContainer
);
