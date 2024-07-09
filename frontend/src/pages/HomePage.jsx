import React from 'react';
import { useAuth, SignInButton, SignOutButton } from '@clerk/clerk-react';
import TaskComponent from '../components/TaskComponent';
import { Container, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const HomePage = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column justify-content-between vh-100 bg-light">
      <div>
        {isSignedIn ? (
          <>
            <Row className="w-100 mb-4">
              <Col className="d-flex justify-content-end">
                <SignOutButton>
                  <Button variant="danger">Sign Out</Button>
                </SignOutButton>
              </Col>
            </Row>
            <TaskComponent />
          </>
        ) : (
          <div className="text-center">
            <Alert variant="info" className="mb-4">
              Please sign in to manage your tasks.
            </Alert>
            <SignInButton>
              <Button variant="primary">Sign In</Button>
            </SignInButton>
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
