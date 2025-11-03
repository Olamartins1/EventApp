import React from "react";
import {
  Container,
  Title,
  Section,
  Label,
  Input,
  Button,
  Row,
} from "./SettingStyle";

const Setting = () => {
  return (
    <Container>
      <Title>Account Settings</Title>
      <Section>
        <h4>👤 Personal Information</h4>
        <p>Update your account details</p>

        <Row>
          <div>
            <Label>First Name</Label>
            <Input type="text" placeholder="Princess" />
          </div>

          <div>
            <Label>Surname</Label>
            <Input type="text" placeholder="Umez" />
          </div>
        </Row>

        <div>
          <Label>Email Address</Label>
          <Input type="email" placeholder="Princessumez@gmail.com" disabled />
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input type="text" placeholder="Input your phone number" />
        </div>

        <Button>Save Changes</Button>
      </Section>
    </Container>
  );
};

export default Setting;
