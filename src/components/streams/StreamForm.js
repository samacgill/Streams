import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // console.log(meta);

    // pulling in methods, including onChange from redux form, which can then be used by input (vid 328)
    // redux form also pulls in ohter props in the field, so we can print out label

    const classes = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={classes}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    // don't need to prevent default as redux form does this
    this.props.onSubmit(formValues);
  };
  render() {
    // to see all redux form's methods:
    // console.log(this.props);
    return (
      <form
        // handleSubmit is from redux form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        // class name needs to include error or errors will be hidden by default
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// redux form runs validate function at initialisation and every interaction (connected during export)
// if there's an error it's passed to renderInput function in meta IF NAME MATCHES FIELD NAME
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

// StreamForm is wrapped in reduxForm so props not passed down directly to StreamForm component
// can use specific prop name of initialValues
export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
