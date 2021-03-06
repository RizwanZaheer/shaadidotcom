/**
 *
 * SecondDashboard
 *
 */

import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ProfileCompactView from 'components/ProfileCompactView';
import ProfileComponent from 'components/ProfileComponent';
import RightSidePartnerSearchContainer from 'components/RightSidePartnerSearchContainer';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { nodeApiServerUrl } from '../../config/envChecker';
import { USERDETAIL } from '../../config/getUserDetailFromLocalStorage';
import reducer from './reducer';
import saga from './saga';
import makeSelectSecondDashboard from './selectors';
import './style.scss';

export class SecondDashboard extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      userId: USERDETAIL._id,
      fName: USERDETAIL.fname ? USERDETAIL.fname : 'Huddy',
      lName: USERDETAIL.lname ? USERDETAIL.lname : '',
      users: [],
      testname: '',
      searchByName: '',
      totalCount: 0,
    };
  }

  componentWillMount() {
    try {
      axios
        .post(`${nodeApiServerUrl}/api/getuserdetail`, {
          userId: USERDETAIL._id,
        })
        .then(({ data: { user }, status, statusText }) => {
          if (status === 200 && statusText === 'OK') {
            !user.fname ? (window.location.href = '/my-shaadi/edit-profile') : '';
            // Object.entries(user).forEach(([key, value]) => {
            //   const newValue =
            //     key === 'dob' ? moment(value).format('YYYY-MM-DD') : value;
            //   this.setState({ [key]: newValue });
            // });
            // console.log('this state: ', this.state);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    // !USERDETAIL.fname ? (window.location.href = '/my-shaadi/edit-profile') : '';
    axios
      .post(`${nodeApiServerUrl}/api/getmatchusersprofile`, {
        gender: USERDETAIL.gender === 'Male' ? 'Female' : 'Male',
        userId: this.state.userId,
      })
      .then(({ data: { users, totalCount } }) => {
        this.setState({
          users,
          totalCount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    // if (this.props.username && this.props.username.trim().length > 0) {
    // this.props.onSubmitForm(); }
  }
  clickHandler = () => {
    const { searchByName } = this.state;
    const newSearchByName = searchByName.toUpperCase();
    // searchByName.charAt(0).toUpperCase() + searchByName.slice(1);
    this.props.history.push(`my-shaadi/searchusers?fname=${newSearchByName}`);
  };
  render() {
    const { fName, lName, users, totalCount } = this.state;
    return (
      <article className="home-page-container">
        <Helmet>
          <title>User Dashboard</title>
          <meta name="description" content="A User dashboard App" />
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <h5 className="welcome-message">
                    Hello, {fName} {lName}!
                  </h5>
                  <div className="row">
                    {/* Side profile container */}
                    <div className="col-12 col-md-12 col-lg-3 col-sm-12">
                      <ProfileComponent />
                    </div>
                    <div
                      className="col-12 col-md-12 col-lg-6 col-sm-12"
                      style={{
                        marginBottom: '20px',
                      }}
                    >
                      <div className="new-match-container">
                        <h5>My Matches ({totalCount})</h5>
                        {/* list of all user present in Db */}
                        {/* Single user call profilecompactive */}
                        {users.map((value) => (
                          <div key={value._id}>
                            <ProfileCompactView data={value} />
                          </div>
                        ))}
                        {users.length === 0 && (
                          <h6 className="text-center">
                            No perfect match for you in our Record!!!
                            <br />
                            Please Set your Preferences.
                          </h6>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-3 col-sm-12">
                      <RightSidePartnerSearchContainer
                        heading="Partner Search"
                        footer
                        btn="Search"
                        clickHandler={this.clickHandler}
                      >
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="formGroupExampleInput">
                                First name:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput"
                                placeholder="First name"
                                onChange={(e) =>
                                  this.setState(
                                    {
                                      searchByName: e.target.value,
                                    }
                                  )}
                              />
                            </div>
                          </div>
                        </div>
                      </RightSidePartnerSearchContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

SecondDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  seconddashboard: makeSelectSecondDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'secondDashboard', reducer });
const withSaga = injectSaga({ key: 'secondDashboard', saga });

export default withRouter(compose(withReducer, withSaga, withConnect)(SecondDashboard));
