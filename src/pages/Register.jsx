import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import $ from 'jquery';

/*
Registration page
*/

function Register() {


    // make an jquery post request after user click the log in button
    const handleRegister = e => {
        e.preventDefault();

        var username=$('#username').val();
        var email = $('#email').val();
        var password1 = $('#pwd1').val();
        var password2 = $('#pwd2').val();

        if(password1!=password2){

            alert("Password does not match");
            return;
        }
        var jsonData = `{"username":"${username}","email":"${email}","password":"${password1}"}`;

        console.log(jsonData);
        $.ajax({
            url: "http://localhost:8081/user",
            type: "POST",
            data: jsonData,
            contentType: "application/json",
            dataType: "json",
            success: function (result, textStatus, xhr) {
                alert("Account Successfully Created");
             
                window.location.assign("login");

            },
            error: function (xhr, status, error) {
                console.log("error");
                alert(error);
            }

        });
    }


  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleRegister}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control type="text" id="username" placeholder="Enter Username" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" id="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="pwd1" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" id="pwd2" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{' '}
                        <a href="login" className="text-primary fw-bold">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;