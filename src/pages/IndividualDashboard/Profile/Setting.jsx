import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Container,
  Title,
  Section,
  Label,
  Input,
  Button,
  Row,
} from "./SettingStyle";
import { AuthContext } from "../../../assets/AuthContext/AuthContext";

const Setting = () => {
  const { user, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    phone: user?.phoneNumber || "",
  });

  const [isEditable, setIsEditable] = useState(true); // input editable
  const [updatedPhone, setUpdatedPhone] = useState(user?.phoneNumber || "");
  const [loading, setLoading] = useState(false); // loading state

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const Updateprofile = async () => {
    try {
      if (!user?._id) {
        toast.error("User not found");
        return;
      }

      setLoading(true);

      const formDataToSend = { phoneNumber: formData.phone };

      const res = await axios.patch(
        `https://eventiq-final-project.onrender.com/api/v1/update-profile`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      // Update input placeholder and disable input + button
      setUpdatedPhone(formData.phone);
      setIsEditable(false); // disables input and button
    } catch (error) {
      console.log(
        "Error updating profile:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Account Settings</Title>
      <Section>
        <h4>👤 Personal Information</h4>
        <p>Update your account details</p>

        <Row>
          <div>
            <Label>Firstname</Label>
            <Input type="text" placeholder={user?.firstName} disabled />
          </div>

          <div>
            <Label>Surname</Label>
            <Input type="text" placeholder={user?.surname} disabled />
          </div>
        </Row>

        <div>
          <Label>Email Address</Label>
          <Input type="email" placeholder={user?.email || ""} disabled />
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input
            type="text"
            name="phone"
            value={isEditable ? formData.phone : ""}
            onChange={handleInputChange}
            placeholder={updatedPhone}
            disabled={!isEditable}
          />
        </div>

        <Button
          onClick={Updateprofile}
          disabled={!isEditable || loading}
          style={{
            backgroundColor: !isEditable ? "#d1d5db" : "#603379",
            cursor: !isEditable ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Updating..." : "Save Changes"}
        </Button>
      </Section>
    </Container>
  );
};

export default Setting;
