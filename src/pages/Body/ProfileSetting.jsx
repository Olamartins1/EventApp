import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FiCamera, FiCheck, FiX } from "react-icons/fi";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    rcNumber: "",
    state: "",
    localGovt: "",
    businessPhone: "",
    businessAddress: "",
    bankName: "",
    accountNumber: "",
    accountType: "",
    accountName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  // const [phonenumbeer, setPhonenumber] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [fetchuser, setFetchuser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      if (!file.type.match("image/(jpg|jpeg|png|gif)")) {
        alert("Only JPG, PNG, or GIF files are allowed");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePersonalInfo = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    return newErrors;
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      const validationErrors = validatePersonalInfo();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      showSuccessMessage("Personal information updated successfully!");
    }
    setIsEditMode(!isEditMode);
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const validationErrors = validatePassword();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setTimeout(() => {
      showSuccessMessage("Password changed successfully!");
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    }, 500);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const getInitials = () => {
    return `${formData.firstName.charAt(0)}${formData.lastName.charAt(
      0
    )}`.toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // start loading

    try {
      const token = user?.accessToken || localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      // Use FormData for multipart/form-data
      const formDataToSend = new FormData();

      // Append all fields from your formData state
      for (const key in formData) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }

      // Append profile image if exists
      if (profileImage) {
        const blob = await (await fetch(profileImage)).blob();
        formDataToSend.append("profilePicture", blob, "profile.png");
      }

      const res = await axios.patch(
        "https://eventiq-final-project.onrender.com/api/v1/update-profile",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile updated:", res.data);
      toast.success(res.data.message);
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err);
      toast.error(res.data.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <Container>
      {successMessage && (
        <SuccessMessage>
          <FiCheck size={20} />
          {successMessage}
        </SuccessMessage>
      )}

      <Header>
        <Title>Profile Settings</Title>
        <Subtitle>
          Manage your account information and business details
        </Subtitle>
      </Header>

      <Section>
        <SectionTitle>Profile Picture</SectionTitle>
        <ProfilePictureWrapper>
          <Avatar>
            {profileImage ? (
              <ProfileImage src={profileImage} alt="Profile" />
            ) : (
              <AvatarText>{getInitials()}</AvatarText>
            )}
            <CameraIconLabel htmlFor="profile-upload">
              <FiCamera size={16} />
            </CameraIconLabel>
            <HiddenInput
              id="profile-upload"
              type="file"
              accept="image/jpg,image/jpeg,image/png,image/gif"
              onChange={handleImageUpload}
            />
          </Avatar>
          <UploadText>
            <UploadTitle>
              Upload a professional photo to help customers recognize you
            </UploadTitle>
            <UploadSubtitle>JPG, PNG or GIF. Max size 5MB</UploadSubtitle>
          </UploadText>
        </ProfilePictureWrapper>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Personal Information</SectionTitle>
          <EditButton onClick={handleEditToggle}>
            {isEditMode ? (
              <>
                <FiCheck size={16} style={{ marginRight: "6px" }} />
                Save
              </>
            ) : (
              "Edit"
            )}
          </EditButton>
        </SectionHeader>
        <FormGrid>
          <FormGroup>
            <Label>First name</Label>
            <Input placeholder="First name" hasError={errors.firstName} />
            {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <Label>Surname</Label>
            <Input placeholder="Surname" />
            {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input placeholder="email" />
            {errors.lastName && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="phone number"
              hasError={errors.phone}
            />
            {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
          </FormGroup>
        </FormGrid>
      </Section>

      <Section>
        <SectionTitle>Bank Details</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>Account Number</Label>
            <Input
              type="text"
              name="accountNumber"
              placeholder="please input your account number"
              value={formData.accountNumber}
              onChange={handleChange}
              maxLength={10}
            />
          </FormGroup>
          <FormGroup>
            <Label>Account type </Label>
            <Select name="type" value={formData.type} onChange={handleChange}>
              <option value="Select type">Select type</option>
              <option value="Savings">Savings</option>
              <option value="Fixed">Fixed</option>
              <option value="Current">Current</option>
              <option value="Corporate">Corporate</option>
            </Select>
          </FormGroup>
          <FormGroupFull>
            <Label>Account Name</Label>
            <Input
              type="text"
              name="accountName"
              placeholder="please input your account name"
              value={formData.accountName}
              onChange={handleChange}
            />
          </FormGroupFull>
        </FormGrid>
      </Section>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Updating..." : "Submit"}
      </Button>
      <Section>
        <SectionTitle>Security</SectionTitle>
        <form onSubmit={handlePasswordChange}>
          <FormGrid>
            <FormGroupFull>
              <Label>Current Password</Label>
              <Input
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={handleChange}
                hasError={errors.currentPassword}
              />
              {errors.currentPassword && (
                <ErrorText>{errors.currentPassword}</ErrorText>
              )}
            </FormGroupFull>
            <FormGroupFull>
              <Label>New Password</Label>
              <Input
                type="password"
                name="newPassword"
                placeholder="Enter new password (min 8 characters)"
                value={formData.newPassword}
                onChange={handleChange}
                hasError={errors.newPassword}
              />
              {errors.newPassword && (
                <ErrorText>{errors.newPassword}</ErrorText>
              )}
            </FormGroupFull>
            <FormGroupFull>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                hasError={errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <ErrorText>{errors.confirmPassword}</ErrorText>
              )}
            </FormGroupFull>
          </FormGrid>
          <ChangePasswordButton type="submit">
            Confirm Password
          </ChangePasswordButton>
        </form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  background: #fff;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
    top: 10px;
  }
`;

const Header = styled.div`
  margin-bottom: 40px;
`;
const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid gray;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #800080;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }

  option {
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;
const Button = styled.div`
  text-align: center;
  width: 10%;
  border: 1px solid gray;
  border-radius: 0.5rem;
  background: transparent;
  color: #000;
  padding: 0.5rem;
  margin-bottom: 7px;

  &:hover {
    transform: translateY(-2px);
    background: #800080;
    color: #fff;
    cursor: pointer;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px 0;
`;

const EditButton = styled.button`
  background: transparent;
  border: 1px solid gray;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  color: #000;

  display: flex;
  align-items: center;
  font-weight: 500;

  &:hover {
    color: #fff;
    background: #800080;
    cursor: pointer;
  }
`;

const ProfilePictureWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Avatar = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarText = styled.span`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const CameraIconLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;

  &:hover {
    color: #800080;
    transform: scale(1.1);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadText = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadTitle = styled.p`
  font-size: 14px;
  color: #1a1a1a;
  margin: 0 0 4px 0;
`;

const UploadSubtitle = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGroupFull = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / -1;
`;

const Label = styled.label`
  font-size: 14px;
  color: #1a1a1a;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid gray;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 14px;
  background: #f9f9f9;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #800080;
    background: white;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
`;

const ChangePasswordButton = styled.button`
  margin-top: 20px;
  padding: 12px 32px;
  background: transparent;
  color: #000;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid gray;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: #800080;
    color: white;
  }

  &:active {
    transform: translateY(0);
  }
`;

export default ProfileSettings;
