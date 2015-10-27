/* globals React:false */
import AAQStep from './AAQStep.jsx';
import AAQActions from '../actions/AAQActions.es6.js';

export default class AttachmentField extends AAQStep {
  handleChange(ev) {
    let data = new FormData();

    let files = ev.target.files;

    for (var file of files) {
      AAQActions.uploadImage($('[data-image-upload-url]').data('image-upload-url'), file);
    }
  }

  heading() {
    return 'Add images';
  }

  body() {
    return (
      <div className="AAQApp__AttachmentField">
        <input type="file" name="image" size="30" title="Browse for an image to upload."
               onChange={this.handleChange.bind(this)} />
        <ul className="AAQApp__AttachmentField__Attachments">
          {this.props.question.images.map((image) => {
            return (
              <Attachment image={image} />
            );
          })}
        </ul>
      </div>
    );
  }
}

class Attachment extends React.Component {
  handleChange() {
    AAQActions.deleteImage(this.props.image);
  }

  render() {
    return (
      <li className="AAQApp__Attachment">
        <span className="delete" onClick={this.handleChange.bind(this)}></span>
        <img src={this.props.image.thumbnail_url} />
      </li>
    )
  }
}
