import React from "react";
import {
  Row,
  Col,
} from "react-bootstrap";
const Footer = () => (
  <footer
    className="page-footer font-small blue pt-4"
    style={{ marginTop: 80 }}
  >
    <Row className="mt-4" >
      <Col className="mb-5">
        <div><h5>SUDOKU</h5>
          <p style={{ textAlign: "center" }}>
            Open source on <a style={{ textDecoration: "none" }} href="https://github.com/qsaheeb/Sudoku.git">GitHub</a>
          </p>
        </div>
      </Col>
      <Col>
        <h5 className="text-uppercase">Contact</h5>
        <ul className="list-unstyled">
          <li>
            <a href="www.linkedin.com/in/qsaheeb93"><i className="fab fa-linkedin-in"></i></a>
          </li>
          <li>
            <a href="https://twitter.com/undolt93"><i className="fab fa-twitter"></i></a>
          </li>
          <li>
            <a href="https://www.facebook.com/qazi.saheeb.908/"><i className="fab fa-facebook-square"></i></a>
          </li>
          <li>
            <a href="https://github.com/qsaheeb"><i className="fab fa-github"></i></a>
          </li>
        </ul>
      </Col>
    </Row>

    <div className="footer-copyright text-center py-3">
      © 2021/Sudoku
    </div>
  </footer>
);

export default Footer;

