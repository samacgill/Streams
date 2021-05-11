import React from "react";
import { connect } from "react-redux";
import { fetchStream, updateStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    // makes sure if user goes there directly eg from bookmark the item is loaded
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = (formValues) => {
    this.props.updateStream(this.props.match.params.id, formValues);
  };
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    // s uses lodash to pick title and description out. think destructuring easier
    const { title, description } = this.props.stream;
    return (
      <div>
        <h3>Edit stream</h3>
        {/* ititialValues is specific redux form prop for Field. this.props.stream has the two fields we need*/}
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={{ title, description }}
        />
      </div>
    );
  }
}

// ownProps is optional second arg, gives access to props in StreamEdit component
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, updateStream })(
  StreamEdit
);
