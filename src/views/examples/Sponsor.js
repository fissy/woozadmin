import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  Button,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { Link } from "react-router-dom";
import EditSponsorModal from "./EditSponsorModal";
import DeleteSponsorModal from "./DeleteSponsorModal";
// import { handleGetSponsor } from "redux/actions/Sponsor";
import { connect } from "react-redux";
import { handleGetSponsors } from "redux/actions/sponsors";
import { handleDeleteSponsor } from "redux/actions/sponsors";

class Sponsor extends React.Component {
  state = {
    loading: true
  }
  componentDidMount() {
    this.props.getSponsors().then(res => {
      this.setState({
        loading: false
      })
    })
  }

  handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.props.deleteSponsor(id)
    }
  }

  render() {
    const { sponsors } = this.props
    console.log({ sponsors })
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}

          {/* <Link to='socials'> */}
          <Button href='socials' variant='outline-danger' type="button"> Back to socials </Button>
          {/* </Link> */}
          {/* <Button color="primary" type="button" onClick={() => this.toggleModal("CreateCategoryModal")} > <i fa fa-arrow-left></i> Back </Button> */}
          <Row className="mt-5">

            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">All Sponsor Data</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Description</th>
                      <th scope="col">Name</th>
                      <th scope="col">Hashtag</th>
                      <th scope="col">Image</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      sponsors.map(sponsor => (
                        <tr key={sponsor._id}>
                          <td>
                            <span className="mb-0 text-sm">{sponsor._id}</span>
                          </td>

                          <td>
                            <span className="mb-0 text-sm">{sponsor.description}</span>
                          </td>
                          <td>
                            <span className="mb-0 text-sm">{sponsor.name}</span>
                          </td>
                          <td>
                            <span className="mb-0 text-sm">{sponsor.hashtag}</span>
                          </td>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={sponsor.imageURL}
                                />
                              </a>
                            </Media>
                          </th>

                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Edit
                            </DropdownItem>
                                <DropdownItem
                                  onClick={() => this.handleDelete(sponsor._id)}
                                >
                                  Delete
                            </DropdownItem>

                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ socials: { sponsors } }) => {
  return {
    sponsors
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSponsors: () => dispatch(handleGetSponsors()),
  deleteSponsor: (id) => dispatch(handleDeleteSponsor(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor);