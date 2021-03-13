import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
  CardFooter,
} from 'reactstrap';
import { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';
import Pagination from './Pagination';
import Teacher from './Teacher';
import AddTeacherModal from './AddTeacherModal';
import api from '../api/api';

const TeacherList = () => {
  const [total, setTotal] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const pageLimit = 10;

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  useEffect(() => {
    let queryString = `?page=${activePage}&limit=${pageLimit}`;

    const fetchData = async () => {
      const data = await api(`/teachers${queryString}`);
      if (!data) {
        setShowError(true);
      } else {
        setShowError(false);

        setTotal(data.total);
        setTeachers(data.teachers);
      }
    };
    fetchData();
  }, [activePage, refresh]);

  return (
    <>
      <Container fluid className="pb-5">
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Teachers List</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="justify-content-start">
                  <FaPlusCircle
                    className="icon-primary ml-4"
                    size="35px"
                    onClick={toggleAddModal}
                  />
                  <AddTeacherModal
                    show={showAddModal}
                    setShow={setShowAddModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </Row>
                {showError ? (
                  <Row className="align-items-center mt-4 justify-content-center">
                    <Col md="4">
                      <ErrorAlert
                        msg={errorMsg}
                        show={showError}
                        setShow={setShowError}
                      />
                    </Col>
                  </Row>
                ) : (
                  ''
                )}
                <Table
                  className="align-items-center table-flush mt-3"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Order</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((item) => {
                      return (
                        <Teacher
                          details={item}
                          key={item.id}
                          refresh={refresh}
                          setRefresh={setRefresh}
                          setErrorMsg={setErrorMsg}
                          setShowError={setShowError}
                        />
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter className="py-3">
                <Pagination
                  total={total}
                  pageLimit={pageLimit}
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TeacherList;
