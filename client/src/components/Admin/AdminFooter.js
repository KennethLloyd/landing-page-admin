import { Row, Col } from 'reactstrap';

const AdminFooter = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{' '}
            <a
              className="font-weight-bold ml-1"
              href="https://www.creative-tim.com?ref=adr-admin-footer"
              rel="noopener noreferrer"
              target="_blank"
            >
              All Rights Reserved
            </a>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default AdminFooter;
