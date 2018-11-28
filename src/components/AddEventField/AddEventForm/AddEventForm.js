import React from 'react';
import { Field, reduxForm } from 'redux-form';

let AddEventForm = props => {
  const { onSubmit } = props;

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="title">Title</label>
          <Field name="title" component="input" type="text" className="form-control" id="title" placeholder="Title" />
        </div>
        <div className="form-group col-sm-6 text-center">
          <label htmlFor="place">Place</label>
          <Field name="place" component="input" type="text" className="form-control" id="place" placeholder="Place" />
        </div>
        <div className="form-group col-sm-12 text-center">
          <label htmlFor="comment">Description</label>
          <Field name="description" component="textarea" type="text" className="form-control" id="description" placeholder="Description" />
        </div>
        <div className="col-sm-12 text-center">
          <button type="submit" className="btn btn-primary add-event-button">Submit</button>
        </div>
      </div>
    </form>
  );
}

// createReduxForm = reduxForm({ form: 'addEvent' });
//
// AddEventForm = createReduxForm(AddEventForm);

AddEventForm = reduxForm({
  form: 'addEvent'
})(AddEventForm);

export default AddEventForm;
