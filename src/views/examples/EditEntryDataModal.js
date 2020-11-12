import React from "react";
import { connect } from "react-redux";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";
import { handleAddHashtagEntry } from "redux/actions/socials";

class EditEntryDataModal extends React.Component {
  state = {
    EditEntryDataModal: false,
    hashtagEntry: '',
    isMakingRequest: false
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { hashtagEntry } = this.state;
    if (hashtagEntry === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.addHashtagEntry({name: hashtagEntry}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }

  render() {
    const { hashtagEntry, isMakingRequest } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button color="primary" type="button" onClick={() => this.toggleModal("EditEntryDataModal")}>
          Edit
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.EditEntryDataModal}
          toggle={() => this.toggleModal("EditEntryDataModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="EditEntryDataModalLabel">
            Edit Entry Data
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("EditEntryDataModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Form onSubmit={this.handleSubmit}>
          <div className="modal-body">
          
          <Row>
            <Col md="12">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="challenge name"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="hashtagEntry"
                  value={hashtagEntry}
                />
              </FormGroup>
            </Col>

           
          </Row>
       
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("EditEntryDataModal")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              disabled={hashtagEntry === '' || isMakingRequest === true}
            >
              Create
            </Button>
          </div>
          </Form>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addHashtagEntry: (hashtag) => dispatch(handleAddHashtagEntry(hashtag)) 
}) 


export default connect(null, mapDispatchToProps)(EditEntryDataModal);
