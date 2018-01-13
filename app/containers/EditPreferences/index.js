/**
 *
 * EditPreferences
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';

import ProfileComponent from 'components/ProfileComponent';
import ReactRangeSlider from 'components/ReactRangeSlider';
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import WavesButton from 'components/WavesButton';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEditPreferences from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { nodeApiServerUrl } from '../../config/envChecker';
import {
  MatrialStatus,
  Religion,
  MotherTongue,
  Community,
  SkinTone,
  BloodGroup,
  BodyType,
  HairType,
  FamilyAffluence,
} from '../../config/dropDownListData';
import { USERDETAIL } from '../../config/getUserDetailFromLocalStorage';

import './EditPreferencesStyle.scss';

export class EditPreferences extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      fromAge: 20,
      toAge: 24,
      community: 'Malik',
      motherTongue: 'Punjabi',
      religion: 'Muslim',
      status: 'Divorced',
      skinTone: 'Fair',
      bloodGroup: 'A+',
      bodyType: 'Average',
      hairType: 'Brown Straight long',
      familyAffluence: 'Middle class',
      drink: 'yes',
      smoke: 'yes',
    };
  }
  dropDownChangeHandler = ({ dropDownType, value }) => {
    this.setState(
      {
        [dropDownType]: value,
      },
      () => console.log('this.state: ', this.state)
    );
  };
  AgeChangeHandler = (value) => {
    this.setState({
      fromAge: value[0],
      toAge: value[0],
    });
    // console.log('AgeChangeHandler: ', value);
    // console.log('AgeChangeHandler state: ', this.state);
  };
  saveAndUpdate = () => {
    console.log('this.state: ', this.state);
    axios
      .post(
        `${nodeApiServerUrl}/api/updateandsavepartnerpreferences`,
        Object.assign({}, this.state, { userId: USERDETAIL._id })
      )
      .then((success) => {
        console.log('success: ', success);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {
      fromAge,
      toAge,
      community,
      motherTongue,
      religion,
      status,
      skinTone,
      familyAffluence,
      bloodGroup,
      hairType,
      bodyType,
      drink,
      smoke,
    } = this.state;
    return (
      <div className="container">
        <Helmet>
          <title>EditPreferences</title>
          <meta name="description" content="Description of EditPreferences" />
        </Helmet>
        <div className="row edit-preferences-container">
          <div className="col-12 col-md-12 col-lg-3 col-sm-12">
            <ProfileComponent />
          </div>
          <div className="col-12 col-md-12 col-lg-8 col-sm-12">
            <div className="edit-preferences-wrapper">
              <form>
                <div className="row">
                  <div className="col-12">
                    <h5 className="edit-preferences-profile-heading">
                      <FormattedMessage {...messages.header} />
                    </h5>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Age
                  </label>
                  <div className="col-sm-7">
                    <ReactRangeSlider
                      min={18}
                      max={28}
                      defaultValue={[fromAge, toAge]}
                      onChange={this.AgeChangeHandler}
                      label1={'From 18 years'}
                      label2={'To 28 years'}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Marital Status
                  </label>
                  <div className="col-sm-7">
                    <Dropdown
                      dropDownChangeHandler={this.dropDownChangeHandler}
                      options={MatrialStatus}
                      defaultValue={status}
                      dropDownType={status}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Skin Tone
                  </label>
                  <div className="col-sm-7">
                    <Dropdown
                      dropDownChangeHandler={this.dropDownChangeHandler}
                      options={SkinTone}
                      defaultValue={skinTone}
                      dropDownType={skinTone}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Body Type
                  </label>
                  <div className="col-sm-7">
                    <Dropdown
                      dropDownChangeHandler={this.dropDownChangeHandler}
                      options={BodyType}
                      defaultValue={bodyType}
                      dropDownType={bodyType}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Hair Type
                  </label>
                  <div className="col-sm-7">
                    <Dropdown
                      dropDownChangeHandler={this.dropDownChangeHandler}
                      options={HairType}
                      defaultValue={hairType}
                      dropDownType={hairType}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Family Affluence
                  </label>
                  <div className="col-sm-7">
                    <Dropdown
                      dropDownChangeHandler={this.dropDownChangeHandler}
                      options={FamilyAffluence}
                      defaultValue={familyAffluence}
                      dropDownType={familyAffluence}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Blood Group
                  </label>
                  <div className="col-sm-7">
                    <Dropdown
                      dropDownChangeHandler={this.dropDownChangeHandler}
                      options={BloodGroup}
                      defaultValue={bloodGroup}
                      dropDownType={bloodGroup}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Religion
                  </label>
                  <div className="col-sm-7">
                    <div className="form-group">
                      <Dropdown
                        dropDownChangeHandler={this.dropDownChangeHandler}
                        options={Religion}
                        defaultValue={religion}
                        dropDownType={religion}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Community
                  </label>
                  <div className="col-sm-7">
                    <Dropdown
                      dropDownChangeHandler={this.dropDownChangeHandler}
                      options={Community}
                      defaultValue={community}
                      dropDownType={community}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label"
                  >
                    Mother Tongue
                  </label>
                  <div className="col-sm-7">
                    <Dropdown
                      dropDownChangeHandler={this.dropDownChangeHandler}
                      options={MotherTongue}
                      defaultValue={motherTongue}
                      dropDownType={motherTongue}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="drink">
                    Drink
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  <div className="form-check form-check-inline">
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
                  <div className="form-check form-check-inline">
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

                <div className="form-group">
                  <label htmlFor="smoke">
                    Smoke
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  <div className="form-check form-check-inline">
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
                  <div className="form-check form-check-inline">
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

                <div className="row save-and-update">
                  <WavesButton
                    label="Save & update"
                    clickHandler={this.saveAndUpdate}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditPreferences.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editpreferences: makeSelectEditPreferences(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editPreferences', reducer });
const withSaga = injectSaga({ key: 'editPreferences', saga });

export default compose(withReducer, withSaga, withConnect)(EditPreferences);
