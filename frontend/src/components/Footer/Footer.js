import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";

const Footer = () => {
  return (
    <footer
      className="bg-dark"
      data-bs-theme="dark"
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="py-3 text-center">Copyright &copy; NJ 2023</Col>
        </Row>
      </Container>
    </footer>
  );
};

// function Footer() {
//   return (
//     <footer
//       style={{
//         width: "100%",
//         position: "relative",
//         bottom: 0,
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       Copyright NJ 2023
//     </footer>
//   );
// }

export default Footer;
