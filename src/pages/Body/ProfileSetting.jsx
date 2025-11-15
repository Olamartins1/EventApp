import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FiCamera, FiCheck, FiX } from "react-icons/fi";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const { user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [fetchuser, setFetchuser] = useState({});
  const [loadingBank, setLoadingBank] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("line 39", user._id);
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
  console.log("the fetchuser", fetchuser);

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

      console.log(res);

      toast.success("Bank details saved successfully!");
      setLoadingBank(false);
    } catch (error) {
      console.error(
        "Bank registration error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Error registering bank details"
      );

      setLoadingBank(false);
    }
  };

  const Updateprofile = async () => {
    try {
      if (!user?._id) {
        toast.error("User not found");
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
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  const updateBankDetails = async () => {
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
      console.log("my response", res);

      toast.success(res.data.message);
    } catch (error) {
      console.error(
        "Bank update error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Error updating bank details"
      );
    } finally {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = user?.accessToken || localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();

      for (const key in formData) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }

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
      toast.error(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
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
            <Input disabled placeholder={fetchuser.surname} />
            {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input disabled placeholder={fetchuser.email} />
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
              <Input disabled placeholder={fetchuser.surname} />
              {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input disabled placeholder={fetchuser.email} />
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
          <ChangePasswordButton type="submit">
            Confirm Password
          </ChangePasswordButton>
        </form>
      </Section>
      </Wrapper>
    </Container>
  );
};

const Btn = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  margin: 20px 0;

  @media (max-width: 600px) {
    width:500px;
    flex-direction: column;
  }
`;

  const Container = styled.div`
  background: #f4f4f4;
  padding: 40px 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  

  @media (max-width: 768px) {
    padding: 20px 5px;
  }
`;


const Wrapper = styled.div`
background: #fff;
  width: 100%;
  max-width: 900px;
  border-radius: 12px;
  padding: 30px 20px;
  

  @media (max-width: 768px) {
    padding: 30px;
    width: 90%;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    width: 95%;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    padding: 12px 20px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    left: 10px;
    right: 10px;
    top: 5px;
    padding: 10px 16px;
    font-size: 13px;
  }
`;

const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    margin-bottom: 25px;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #800080;
    box-shadow: 0 0 0 3px rgba(128, 0, 128, 0.1);
  }

  @media (max-width: 480px) {
    padding: 0.7rem;
    font-size: 0.9rem;
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

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 6px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    margin-bottom: 25px;
  }
`;

const Button = styled.div`
  text-align: center;
  width: 120px;
  border-radius: 0.5rem;
  background: #9476a5;
  padding: 0.75rem;
  cursor: pointer;
  color: #fff;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #836495;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 14px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const EditButton = styled.button`
  background: transparent;
  border: 1px solid #d1d5db;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  color: #000;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #fff;
    background: #800080;
    border-color: #800080;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 10px 20px;
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
    gap: 15px;
  }
`;

const Avatar = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  background: #603379;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
  }
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

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const CameraIconLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background:#603379;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  cursor: pointer;
  color: white;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UploadTitle = styled.p`
  font-size: 14px;
  color: #1a1a1a;
  margin: 0 0 4px 0;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const UploadSubtitle = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 15px;
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

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 6px;
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  background: ${(props) => (props.disabled ? "#f9f9f9" : "white")};

  &:focus {
    outline: none;
    border-color: #800080;
    box-shadow: 0 0 0 3px rgba(128, 0, 128, 0.1);
  }

  ${(props) =>
    props.hasError &&
    `
    border-color: #ef4444;
  `}

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 13px;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: 11px;
  }
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
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: #800080;
    color: white;
    border-color: #800080;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 14px 32px;
    font-size: 14px;
  }
`;

export default ProfileSettings;
