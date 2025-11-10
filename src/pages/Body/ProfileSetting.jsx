import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FiCamera, FiCheck, FiX } from "react-icons/fi";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import axios from "axios";
import {toast} from "react-toastify";


const ProfileSettings = () => {
    const {user} = useContext(AuthContext)
   const {token} = useContext(AuthContext)
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
  const [fetchuser, setFetchuser] = useState({})
const [loadingBank, setLoadingBank] = useState(false);
// const [loadingProfile, setLoadingProfile] = useState(false);
// const [loadingEdit, setLoadingEdit] = useState(false);




  console.log("line 39", user._id)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

useEffect(() => {
  const fetchData = async () => {
    if (!user?._id) return; 

    console.log("Fetching user data for:", user._id);

    try {
      const res = await axios.get(
        `https://eventiq-final-project.onrender.com/api/v1/venueowner/${user._id}` 
      );

      setFetchuser(res.data.data);
     
    } catch (error) {
      console.error("Error fetching venue owner:", error);
    }
  };

  fetchData();
}, [user?._id]);
console.log("the fetchuser", fetchuser)

const submitBankDetails = async () => {
  setLoadingBank(true);
  try {
    if (!user?._id) {
      toast.error("User not found. Please login again.");
      return;
    }


   
    const bankData = {
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      accountType: formData.type, 
      accountName: formData.accountName,
    };

    const res = await axios.post(
      "https://eventiq-final-project.onrender.com/api/v1/register-bank",
      bankData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

    );

    console.log(res)

  
      toast.success("Bank details saved successfully!");
     setLoadingBank(false)
  } catch (error) {
    console.error("Bank registration error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Error registering bank details");

    setLoadingBank(false)
  }

};



 const Updateprofile = async () => {
  try {
    //  setLoadingProfile(true);
    if (!user?._id) {
      toast.error(res.data.message);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("phoneNumber", formData.phone);
    if (profileImage) {
     
      const blob = await fetch(profileImage).then((res) => res.blob());
      formDataToSend.append("profilePicture", blob, "profile.jpg");
    }

    const res = await axios.patch(
      `https://eventiq-final-project.onrender.com/api/v1/update-profile`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
setFetchuser(res.data.data);
     toast.success(res.data.message);
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Error updating profile");
  }
};

const updateBankDetails = async () => {

  try {
      // setLoadingBank(true);
    if (!user?._id) {
      toast.error("User not found. Please login again.");
      return;
    }

    const bankData = {
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      accountType: formData.type, 
      accountName: formData.accountName,
    };

    const res = await axios.put(
      "https://eventiq-final-project.onrender.com/api/v1/update-bank",
      bankData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
      setFetchuser(res.data.data); 
    console.log('my response', res)

    toast.success(res.data.message);


  } catch (error) {
    console.error("Bank update error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Error updating bank details");
  }finally {
    setLoadingBank(false); 
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
         <EditButton
  onClick={() => {
    if (isEditMode) {
      Updateprofile(); 
    }
    handleEditToggle();
  }}
>
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
            <Input

              disabled
              placeholder={fetchuser.firstName}
              hasError={errors.firstName}
            />
            {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <Label>Surname</Label>
            <Input
        
              disabled
              placeholder={fetchuser.surname}
             
            />
            {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
          </FormGroup>
           <FormGroup>
            <Label>Email</Label>
            <Input
              disabled
              placeholder={fetchuser.email}
            />
            {errors.lastName && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditMode}
              placeholder={fetchuser.phoneNumber}
              hasError={errors.phone}
            />
            {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
          </FormGroup>
        </FormGrid>

      </Section>



      <Section>
        <SectionTitle>Bank Details</SectionTitle>
        <FormGrid>
          <FormGroupFull>
            <Label>Bank Name</Label>
            <Input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
            />
          </FormGroupFull>
          <FormGroup>
            <Label>Account Number</Label>
            <Input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              maxLength={10}
            />
          </FormGroup>
          <FormGroup>
            <Label>Account type </Label>
            <Select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
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
              value={formData.accountName}
              onChange={handleChange}
            />
          </FormGroupFull>
        </FormGrid>
      </Section>
      <Btn>
  <Button onClick={submitBankDetails}>
    {loadingBank ? "Sending..." : "Submit"}
  </Button>
  <Button
  onClick={updateBankDetails} 
  // disabled={loadingBank}      
>
  edit
</Button>
</Btn>
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
            Change Password
          </ChangePasswordButton>
        </form>
      </Section>
    </Container>
    
  );
};


const Btn = styled.div`
width:100%;
height:40px;
margin-bottom:10px;
display:flex;
justify-content:space-between;
`;

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
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
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
border-radius: 0.5rem;
  background:  #9476a5;
  padding: 0.5rem;
  cursor: pointer;
  color:#fff;
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
  border: 1px solid #ddd;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  font-weight: 500;

  &:hover {
    border-color: #7c3aed;
    color: #7c3aed;
    background: #f5f3ff;
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
    color: #7c3aed;
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
  border: 1px solid ${(props) => (props.hasError ? "#ef4444" : "#e5e5e5")};
  border-radius: 6px;
  font-size: 14px;
  background: ${(props) => (props.disabled ? "#f9f9f9" : "#f9f9f9")};
  transition: all 0.2s;
  color: ${(props) => (props.disabled ? "#999" : "#1a1a1a")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ef4444" : "#7c3aed")};
    background: ${(props) => (props.disabled ? "#f9f9f9" : "white")};
  }

  &::placeholder {
    color: #aaa;
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
    border-color: #7c3aed;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default ProfileSettings;
