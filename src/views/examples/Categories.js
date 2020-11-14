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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { Link } from "react-router-dom";
import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { connect } from "react-redux";
import { handleGetCategories } from "redux/actions/categories";
// import { handleGetCategories } from "redux/actions/Categories";
// import { connect } from "react-redux";

class Categories extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    const { category } = this.props
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          
          {/* <Link to='socials'> */}
            <Button href='socials' variant='outline-danger'  type="button"> Back to socials </Button>
          {/* </Link> */}
          {/* <Button color="primary" type="button" onClick={() => this.toggleModal("CreateCategoryModal")} > <i fa fa-arrow-left></i> Back </Button> */}
          <Row className="mt-5">
          
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">All Categories Data</h3>
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
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      category.map((cat, i) => (
                        <tr key={cat._id}>
                      <td>
                        <span className="mb-0 text-sm">{i}</span>
                      </td>
                      
                      <td>
                        <span className="mb-0 text-sm">{cat.description}</span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">{cat.name}</span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">{cat.hashtagName}</span>
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
                              src={cat.userImageURL}
                            />
                          </a>
                        </Media>
                      </th>

                      <th scope='row'>
                        <EditCategoryModal cat={cat}/>
                        <DeleteCategoryModal id={cat._id}/>
                      </th>
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

const mapStateToProps = ({ socials: { category } }) => {
  return {
    category
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(handleGetCategories()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Categories);
