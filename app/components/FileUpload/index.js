/**
 *
 * FileUpload
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import FormData from 'form-data';
import axios from 'axios';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { nodeApiServerUrl } from '../../config/envChecker';

class FileUpload extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      file: '',
      userId: this.props.userId,
      imagePreviewUrl: '',
    };
  }
  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { userId, imagePreviewUrl } = this.state;
    // this.props.imageChange(userId, imagePreviewUrl);
    !imagePreviewUrl
      ? ''
      : axios
          .post(`${nodeApiServerUrl}/api/upload`, {
            userId,
            imageUrl: imagePreviewUrl,
          })
          .then(({ data }) => {
            localStorage.setItem(
              'user_detail',
              JSON.stringify(data.new_user_detail)
            );
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt="" />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }
    return (
      <div className="previewComponent">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={(e) => this.handleImageChange(e)}
          />
          <button
            className="submitButton"
            type="submit"
            onClick={(e) => this.handleSubmit(e)}
          >
            Upload Image
          </button>
        </form>
        <div className="imgPreview">{$imagePreview}</div>
      </div>
    );
  }
}

FileUpload.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default FileUpload;
