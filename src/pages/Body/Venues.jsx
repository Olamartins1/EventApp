import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../assets/AuthContext/AuthContext";
import {
  FiPlus,
  FiPackage,
  FiX,
  FiMapPin,
  FiUsers,
  FiCheck,
  FiUpload,
} from "react-icons/fi";
import { FaClock } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { toast } from "react-toastify";
// import Premium from "../Body/Premium";

const VenuesContainer = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin: 0;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff;
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #800080;
    color: #fff;
  }

`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const EmptyDescription = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin: 0;
`;

const VenuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const VenueCardSkeleton = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 180px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const SkeletonContent = styled.div`
  padding: 1.25rem;
`;

const SkeletonBar = styled.div`
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 6px;
  margin-bottom: 0.75rem;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const VenueCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const VenueImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const VenueImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VerifiedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(34, 197, 94, 0.95);
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`;

const VenueImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
`;

const VenueContent = styled.div`
  padding: 1.5rem;
`;

const VenueName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.75rem 0;
`;

const VenueDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.75rem;

  svg {
    color: #7c3aed;
    flex-shrink: 0;
  }
`;

const VenueStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  color: #999;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1a1a1a;
`;

const ViewDetailsButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  margin-top: 1rem;
  border: 2px solid #7c3aed;
  background: white;
  color: #7c3aed;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #7c3aed;
    color: white;
  }
`;

const VenueActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
    border-color: #2563eb;
    color: #2563eb;
  }
`;

const DeleteButton = styled(ActionButton)`
  &:hover {
    background: #fee;
    border-color: #f44;
    color: #f44;
  }
`;

// const PlansContainer = styled.div`
//   background: white;
//   padding: 2rem;
//   border-radius: 12px;
//   margin-bottom: 3rem;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
// `;

// const PlansHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   margin-bottom: 0.5rem;
// `;

// const PlansTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: #1a1a1a;
//   margin: 0;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   &:before {
//     content: "⭐";
//     font-size: 1.75rem;
//   }
// `;

// const PlansSubtitle = styled.p`
//   font-size: 0.95rem;
//   color: #666;
//   margin: 0 0 2rem 0;
// `;

// const PlansGrid = styled.div`
//   display: flex;
//   /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
//   gap: 2rem;
// `;

// const PlanCard = styled.div`
//   background: #f3f0ff;
//   border: ${(props) =>
//     props.popular ? "2px solid #7c3aed" : "2px solid #e0e0e0"};
//   border-radius: 12px;
//   padding: 2rem 1.5rem;
//   text-align: center;
//   position: relative;
//   transition: all 0.3s;
//   width: 230px;

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
//   }
// `;

// const PopularBadge = styled.div`
//   position: absolute;
//   top: -12px;
//   left: 50%;
//   transform: translateX(-50%);
//   background: #7c3aed;
//   color: white;
//   padding: 4px 16px;
//   border-radius: 12px;
//   font-size: 0.75rem;
//   font-weight: 600;
// `;

// const PlanDuration = styled.h3`
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: #333;
//   margin: ${(props) =>
//     props.popular ? "1.5rem 0 0.75rem 0" : "0 0 0.75rem 0"};
// `;

// const PlanPrice = styled.div`
//   font-size: 2.5rem;
//   font-weight: 700;
//   color: #7c3aed;
//   margin: 0.5rem 0;
// `;

// const PlanDays = styled.p`
//   font-size: 0.875rem;
//   color: #999;
//   margin: 0.5rem 0 1.5rem 0;
// `;

// const PlanFeatures = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 1.5rem 0;
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
//   text-align: left;
// `;

// const PlanFeature = styled.li`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   font-size: 0.9rem;
//   color: #666;

//   svg {
//     color: #7c3aed;
//     flex-shrink: 0;
//   }
// `;

// const SubscribeButton = styled.button`
//   width: 100%;
//   padding: 0.875rem;
//   margin-top: 1.5rem;
//   border: ${(props) => (props.popular ? "none" : "1px solid #7c3aed")};
//   background: ${(props) => (props.popular ? "#7c3aed" : "white")};
//   color: ${(props) => (props.popular ? "white" : "#7c3aed")};
//   border-radius: 8px;
//   font-size: 0.95rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;

//   &:hover {
//     background: #7c3aed;
//     color: white;
//     ${(props) => !props.popular && "border-color: #7c3aed;"}
//   }
// `;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem 0;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  width: 90%;
  max-width: 800px;
  margin: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #1a1a1a;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const TabNav = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${(props) => (props.active ? "white" : "#f8f9fa")};
  color: ${(props) => (props.active ? "#7c3aed" : "#999")};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  font-size: 0.95rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  border: ${(props) =>
    props.active ? "1px solid #7c3aed" : "1px solid transparent"};

  &:hover {
    color: ${(props) => (!props.active ? "#666" : "#7c3aed")};
    background: ${(props) => (!props.active ? "#f8f9fa" : "white")};
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem;
  max-height: calc(100vh - 400px);
  overflow-y: auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;

  span {
    color: #e74c3c;
  }
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }
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

const ImageUploadSection = styled.div`
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #7c3aed;
    background-color: #faf7ff;
  }
`;

const ImageUploadIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
`;

const ImageUploadText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;

  strong {
    color: #1a1a1a;
  }
`;

const ImageUploadHelper = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 0.5rem 0 0 0;
`;

const ImagePreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const ImagePreviewItem = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const SubmitButton = styled.button`
  background-color: #7c3aed;
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 44px;

  &:hover:not(:disabled) {
    background-color: #6d28d9;
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 2px solid #f3f4f6;
  border-top: 2px solid #7c3aed;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const HelpText = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 0.5rem 0 0 0;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;

  input {
    margin-right: 0.5rem;
    accent-color: #7c3aed;
  }
`;

const KYCSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`;

const KYCTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const DocumentUploadGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const DocumentLabel = styled(Label)`
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

const BottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const NextButton = styled(SubmitButton)`
  background-color: #2563eb;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }
`;

const PreviousButton = styled.button`
  padding: 0.875rem 1.5rem;
  border: 1px solid #e0e0e0;
  background: white;
  color: #333;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
    border-color: #a0a0a0;
  }
`;

const CancelButton = styled(PreviousButton)`
  color: #e74c3c;
  border-color: #e74c3c;

  &:hover {
    background: #fff0f0;
    border-color: #c0392b;
  }
`;

const VenueCardSkeletonLoader = () => (
  <VenueCardSkeleton>
    <SkeletonImage />
    <SkeletonContent>
      <SkeletonBar
        style={{ width: "80%", height: "24px", marginBottom: "12px" }}
      />
      <SkeletonBar
        style={{ width: "100%", height: "16px", marginBottom: "8px" }}
      />
      <SkeletonBar
        style={{ width: "90%", height: "16px", marginBottom: "8px" }}
      />
      <SkeletonBar style={{ width: "85%", height: "16px" }} />
    </SkeletonContent>
  </VenueCardSkeleton>
);

const Venues = () => {
  const { user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const [venues, setVenues] = useState([]);
  console.log(venues);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    venuename: "",
    description: "",
    minimum: "",
    maximum: "",
    price: "",
    type: "indoor",
    amenities: [],
    cautionfee: "",
    openingtime: "08:00 AM",
    closingtime: "11:00 PM",
    hallsize: "",
    street: "",
    city: "",
    state: "",
  });

  const [documentFiles, setDocumentFiles] = useState({
    cacCertificate: null,
    certificateOfOccupancy: null,
  });

  const handleOpenModal = (venue = null) => {
    setActiveTab("basic");
    if (venue) {
      setEditingVenue(venue);
      setFormData({
        venuename: venue.name || "",
        description: venue.description || "",
        minimum: venue.minimum || "",
        maximum: venue.maximum || "",
        price: venue.price || "",
        type: venue.type || "indoor",
        amenities: Array.isArray(venue.amenities)
          ? venue.amenities
          : venue.amenities
          ? venue.amenities.split(",").map((a) => a.trim())
          : [],
        cautionfee: venue.cautionfee || "",
        openingtime: venue.openingtime || "",
        closingtime: venue.closingtime || "",
        hallsize: venue.hallsize || "",
        street: venue.location?.street || "",
        city: venue.location?.city || "",
        state: venue.location?.state || "",
      });
      setUploadedImages(
        venue.image?.map((img) => ({ url: img.url, publicId: img.publicId })) ||
          []
      );
      setDocumentFiles({
        cacCertificate: venue.cacCertificate || null,
        certificateOfOccupancy: venue.certificateOfOccupancy || null,
      });
    } else {
      setEditingVenue(null);
      setFormData({
        venuename: "",
        description: "",
        minimum: "",
        maximum: "",
        price: "",
        type: "indoor",
        amenities: [],
        cautionfee: "",
        openingtime: "",
        closingtime: "",
        hallsize: "",
        street: "",
        city: "",
        state: "",
      });
      setUploadedImages([]);
      setDocumentFiles({
        cacCertificate: null,
        certificateOfOccupancy: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVenue(null);
    setUploadedImages([]);
    setDocumentFiles({
      cacCertificate: null,
      certificateOfOccupancy: null,
    });
    setFormData({
      venuename: "",
      description: "",
      minimum: "",
      maximum: "",
      price: "",
      type: "indoor",
      amenities: [],
      cautionfee: "",
      openingtime: "",
      closingtime: "",
      hallsize: "",
      street: "",
      city: "",
      state: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const newAmenities = [...prev.amenities];
        if (checked) {
          newAmenities.push(name);
        } else {
          const index = newAmenities.indexOf(name);
          if (index > -1) {
            newAmenities.splice(index, 1);
          }
        }
        return { ...prev, amenities: newAmenities };
      });
    } else if (name === "minimum" || name === "maximum") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 5 - uploadedImages.length;

    if (remainingSlots <= 0) {
      toast.error("Maximum of 5 images allowed");
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);
    const newImages = filesToAdd.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);

    if (files.length > remainingSlots) {
      toast.warning(
        `Only ${remainingSlots} image(s) can be added. Maximum is 5 images.`
      );
    }
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => {
      const updated = [...prev];
      if (updated[index].url?.startsWith("blob:")) {
        URL.revokeObjectURL(updated[index].url);
      }
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleDocumentUpload = (e, documentType) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFiles((prev) => ({
        ...prev,
        [documentType]: file,
      }));
      toast.success(
        `${
          documentType === "cacCertificate" ? "CAC" : "Certificate of Occupancy"
        } uploaded`
      );
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.venuename ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.minimum ||
      !formData.maximum ||
      !formData.price ||
      !formData.hallsize
    ) {
      toast.error("Please fill in all required fields in Basic Info");
      setActiveTab("basic");
      return;
    }
    if (!formData.minimum) {
      toast.error("Minimum capacity cannot be greater than maximum capacity");
      setActiveTab("basic");
      return;
    }
    if (Number(formData.minimum) > Number(formData.maximum)) {
      toast.error("Minimum capacity cannot be greater than maximum capacity");
      setActiveTab("basic");
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one image in Documents & Images");
      setActiveTab("documents");
      return;
    }

    if (uploadedImages.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    if (
      !documentFiles.cacCertificate ||
      !documentFiles.certificateOfOccupancy
    ) {
      toast.error(
        "Please upload both CAC Certificate and Certificate of Occupancy"
      );
      setActiveTab("documents");
      return;
    }

    setIsSubmitting(true);

    try {
      const venueFormData = new FormData();
      venueFormData.append("venuename", formData.venuename);
      venueFormData.append("description", formData.description);
      venueFormData.append("minimum", formData.minimum);
      venueFormData.append("maximum", formData.maximum);
      venueFormData.append("price", formData.price);
      venueFormData.append("type", formData.type);
      venueFormData.append("amenities", formData.amenities.join(", "));
      venueFormData.append("cautionfee", formData.cautionfee || 0);
      venueFormData.append("openingtime", formData.openingtime);
      venueFormData.append("closingtime", formData.closingtime);
      venueFormData.append("hallsize", formData.hallsize);
      venueFormData.append("street", formData.street);
      venueFormData.append("city", formData.city);
      venueFormData.append("state", formData.state);

      uploadedImages.slice(0, 5).forEach((img) => {
        if (img.file) {
          venueFormData.append("images", img.file);
        }
      });

      if (documentFiles.cacCertificate) {
        venueFormData.append("cac", documentFiles.cacCertificate);
      }
      if (documentFiles.certificateOfOccupancy) {
        venueFormData.append("doc", documentFiles.certificateOfOccupancy);
      }

      console.log(" Submitting venue data with FormData", venueFormData);

      const venueResponse = await axios.post(
        "https://eventiq-final-project.onrender.com/api/v1/list-venue",
        venueFormData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("the venue is", venueFormData);

      if (venueResponse.data.data) {
        if (editingVenue) {
          setVenues((prev) =>
            prev.map((v) =>
              v._id === editingVenue._id ? venueResponse.data.data : v
            )
          );
          toast.success("Venue updated successfully");
        } else {
          setVenues((prev) => [...prev, venueResponse.data.data]);
          toast.success("Venue and documents uploaded successfully!");
        }
      }

      setTimeout(() => {
        handleCloseModal();
      }, 500);
    } catch (err) {
      toast.error(err.response?.data || "something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (venueId) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        await axios.delete(
          `https://eventiq-final-project.onrender.com/api/v1/venues/${venueId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVenues((prev) => prev.filter((v) => v._id !== venueId));
        toast.success("Venue deleted successfully");
      } catch (err) {
        console.error("Delete error:", err);
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Failed to delete venue");
        }
      }
    }
  };

  const handleSubscribe = async (featureId) => {
    try {
      if (!token) {
        toast.error("Please login to subscribe");
        return;
      }

      // console.log("[v0] Subscribing to feature:", featureId);

      const response = await axios.get(
        `https://eventiq-final-project.onrender.com/api/v1/features`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("[v0] Subscribe response:", response.data);

      if (
        response.data &&
        response.data.data &&
        response.data.data.checkout_url
      ) {
        const { reference, checkout_url } = response.data.data;

        toast.success("Payment initialized! Redirecting to checkout...");
        // console.log("[v0] Payment details:", {
        //   reference,
        //   checkout_url,
        // });

        window.location.href = checkout_url;
      } else {
        toast.error(response.data?.message || "Failed to initialize payment");
      }
    } catch (err) {
      console.error("[v0] Subscribe error:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        toast.error("Unauthorized: Please login again");
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to initialize payment. Please try again.");
      }
    }
  };
  // const user = useContext(AuthContext)

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://eventiq-final-project.onrender.com/api/v1/ownervenue`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVenues(response.data.data);
      } catch (err) {
        // console.error("❌ Features fetch error:", err);

        toast.error(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <VenuesContainer>
      <Header>
        <HeaderContent>
          <Title>My Event Venues</Title>
          <Subtitle>Manage your listed venues</Subtitle>
        </HeaderContent>
        <AddButton onClick={() => handleOpenModal()}>
          <FiPlus size={20} />
          Add New Venue
        </AddButton>
      </Header>

      {loading ? (
        <VenuesGrid>
          {[1, 2, 3, 4].map((index) => (
            <VenueCardSkeletonLoader key={index} />
          ))}
        </VenuesGrid>
      ) : venues.length === 0 ? (
        <EmptyState>
          <IconWrapper>
            <FiPackage />
          </IconWrapper>
          <EmptyTitle>No Venue record yet</EmptyTitle>
          <EmptyDescription>
            Upload your venue details to get noticed
          </EmptyDescription>
        </EmptyState>
      ) : (
        <>
          <VenuesGrid>
            {venues.map((venue) => (
              <VenueCard key={venue._id}>
                <VenueImageWrapper>
                  {venue.documents.images ? (
                    <VenueImage
                      src={venue.documents.images[0]?.url || "/placeholder.svg"}
                      alt={venue.venuename}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <VenueImagePlaceholder>
                      <FiPackage />
                    </VenueImagePlaceholder>
                  )}
                    

                  <VerifiedBadge

                    style={{
                      color:
                        venue?.status?.toLowerCase() === "pending"
                          ? "black"
                          : "white",

                          
                      background:
                        venue?.status?.toLowerCase() === "verified"
                          ? "green"
                          : "yellow",
                    }}
                  >
                    {venue?.status?.toLowerCase() === "pending" ? (
                      <>
                        <FaClock /> Pending
                      </>
                    ) : (
                      <>
                        <MdVerified /> Verified
                      </>
                    )}
                  </VerifiedBadge>
                </VenueImageWrapper>
                <VenueContent>
                  <VenueName>{venue.venuename}</VenueName>
                  <VenueDetail>
                    <FiMapPin size={16} />
                    {venue.location?.street} , {venue.location?.city},{" "}
                    {venue.location?.state}
                  </VenueDetail>
                  <VenueDetail>
                    <FiUsers size={16} />
                    up to {venue.capacity.maximum} guests
                  </VenueDetail>

                  <VenueStats>
                    <StatItem>
                      <StatLabel>Price/Day</StatLabel>
                      <StatValue>
                        ₦{(venue.price || 0).toLocaleString()}
                      </StatValue>
                    </StatItem>
                  </VenueStats>
                  {/* <ViewDetailsButton onClick={() => handleOpenModal(venue)}>
                  view Details
                  </ViewDetailsButton> */}
                </VenueContent>
                {/* <VenueActions>
                  <ActionButton onClick={() => handleOpenModal(venue)}>
                    <FiUpload size={16} /> Edit
                  </ActionButton>
                  <DeleteButton onClick={() => handleDelete(venue._id)}>
                    <FiX size={16} /> Delete
                  </DeleteButton>
                </VenueActions> */}
              </VenueCard>
            ))}
          </VenuesGrid>

          {/*             
              {features.map((feature) => (
                <PlanCard key={feature._id}>
                  <PlanDuration>
                    {feature.duration} Month{feature.duration > 1 ? "s" : ""}
                  </PlanDuration>
                  <PlanPrice>₦{feature.amount.toLocaleString()}</PlanPrice>
                  <PlanDays></PlanDays>
                  <PlanFeatures>
                    <PlanFeature>
                      <FiCheck size={18} />
                      Priority placement
                    </PlanFeature>
                    <PlanFeature>
                      <FiCheck size={18} />
                      Homepage visibility
                    </PlanFeature>
                    <PlanFeature>
                      <FiCheck size={18} />
                      Verified badge
                    </PlanFeature>
                    <PlanFeature>
                      <FiCheck size={18} />
                      Save ₦20,000
                    </PlanFeature>
                  </PlanFeatures>
                  <SubscribeButton onClick={() => handleSubscribe(feature._id)}>
                    <FiPackage size={18} />
                    Subscribe Now
                  </SubscribeButton>
                </PlanCard>
              ))} */}

          {/* <Premium /> */}
        </>
      )}

      {isModalOpen && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {editingVenue ? "Edit Venue" : "Add New Event Venue"}
              </ModalTitle>
              <CloseButton onClick={handleCloseModal} disabled={isSubmitting}>
                <FiX size={24} />
              </CloseButton>
            </ModalHeader>

            <TabNav>
              <Tab
                active={activeTab === "basic"}
                onClick={() => setActiveTab("basic")}
              >
                Basic Info
              </Tab>
              <Tab
                active={activeTab === "documents"}
                onClick={() => setActiveTab("documents")}
              >
                Documents & Images
              </Tab>
            </TabNav>

            {activeTab === "basic" && (
              <FormContainer>
                <FormGroup>
                  <Label>
                    Venue Name <span>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="venuename"
                    value={formData.venuename}
                    onChange={handleInputChange}
                    placeholder="e.g. Grand Luxe Ballroom"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    Location/Address <span>*</span>
                  </Label>
                  <FormRow>
                    <FormGroup>
                      <Input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="Street"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                      />
                    </FormGroup>
                  </FormRow>
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <Label>
                      Guest Capacity <span>*</span>
                    </Label>
                    <Input
                      type="number"
                      name="minimum"
                      value={formData.minimum}
                      onChange={handleInputChange}
                      placeholder="Minimum guests"
                    />
                    <Input
                      type="number"
                      name="maximum"
                      value={formData.maximum}
                      onChange={handleInputChange}
                      placeholder="Maximum guests"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Hall Size (sq ft) <span>*</span>
                    </Label>
                    <Input
                      type="text"
                      name="hallsize"
                      value={formData.hallsize}
                      onChange={handleInputChange}
                      placeholder="e.g. 5000"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      Venue Type <span>*</span>
                    </Label>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                     
                    >
                      <option  value="" disabled>Select type</option>
                      <option value="indoor">Indoor</option>
                      <option value="outdoor">Outdoor</option>
                      <option value="Multipurpose">Multipurpose</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>
                    Description <span>*</span>
                  </Label>
                  <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your event venue, unique features, and what makes it special..."
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <Label>
                      Price per Day (₦) <span>*</span>
                    </Label>
                    <Input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g. 250000"
                    />
                    <HelpText>Price per day, excluding caution fee.</HelpText>
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      Caution Fee (₦) <span>*</span>
                    </Label>
                    <Input
                      type="number"
                      name="cautionfee"
                      value={formData.cautionfee}
                      onChange={handleInputChange}
                      placeholder="e.g. 50000"
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>
                      Opening Time <span>*</span>
                    </Label>
                    <Input
                      type="time"
                      name="openingtime"
                      value={formData.openingtime}
                      onChange={handleInputChange}
                      placeholder="e.g. 08:00 AM"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      Closing Time <span>*</span>
                    </Label>
                    <Input
                      type="time"
                      name="closingtime"
                      value={formData.closingtime}
                      onChange={handleInputChange}
                      placeholder="e.g. 11:00 PM"
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>
                    Available Amenities & Facilities <span>*</span>
                  </Label>
                  <HelpText>
                    Select all amenities available at your venue
                  </HelpText>
                  <CheckboxGrid>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="WiFi"
                        checked={formData.amenities.includes("WiFi")}
                        onChange={handleInputChange}
                      />
                      WiFi
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Parking Space"
                        checked={formData.amenities.includes("Parking Space")}
                        onChange={handleInputChange}
                      />
                      Parking Space
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Air Conditioning"
                        checked={formData.amenities.includes(
                          "Air Conditioning"
                        )}
                        onChange={handleInputChange}
                      />
                      Air Conditioning
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Sound System"
                        checked={formData.amenities.includes("Sound System")}
                        onChange={handleInputChange}
                      />
                      Sound System
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Professional Lighting"
                        checked={formData.amenities.includes(
                          "Professional Lighting"
                        )}
                        onChange={handleInputChange}
                      />
                      Professional Lighting
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Projector/Screen"
                        checked={formData.amenities.includes(
                          "Projector/Screen"
                        )}
                        onChange={handleInputChange}
                      />
                      Projector/Screen
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Catering Services"
                        checked={formData.amenities.includes(
                          "Catering Services"
                        )}
                        onChange={handleInputChange}
                      />
                      Catering Services
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Security"
                        checked={formData.amenities.includes("Security")}
                        onChange={handleInputChange}
                      />
                      Security
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Restrooms"
                        checked={formData.amenities.includes("Restrooms")}
                        onChange={handleInputChange}
                      />
                      Restrooms
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Stage/Platform"
                        checked={formData.amenities.includes("Stage/Platform")}
                        onChange={handleInputChange}
                      />
                      Stage/Platform
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Tables & Chairs"
                        checked={formData.amenities.includes("Tables & Chairs")}
                        onChange={handleInputChange}
                      />
                      Tables & Chairs
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Backup Generator"
                        checked={formData.amenities.includes(
                          "Backup Generator"
                        )}
                        onChange={handleInputChange}
                      />
                      Backup Generator
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Dance Floor"
                        checked={formData.amenities.includes("Dance Floor")}
                        onChange={handleInputChange}
                      />
                      Dance Floor
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Kitchen Facilities"
                        checked={formData.amenities.includes(
                          "Kitchen Facilities"
                        )}
                        onChange={handleInputChange}
                      />
                      Kitchen Facilities
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Changing Rooms"
                        checked={formData.amenities.includes("Changing Rooms")}
                        onChange={handleInputChange}
                      />
                      Changing Rooms
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        name="Bar Service"
                        checked={formData.amenities.includes("Bar Service")}
                        onChange={handleInputChange}
                      />
                      Bar Service
                    </CheckboxLabel>
                  </CheckboxGrid>
                </FormGroup>

                <BottomActions>
                  <NextButton onClick={() => setActiveTab("documents")}>
                    Next: Documents & Images
                  </NextButton>
                </BottomActions>
              </FormContainer>
            )}

            {activeTab === "documents" && (
              <FormContainer>
                <FormGroup>
                  <Label>
                    Hall Images <span>*</span>
                  </Label>
                  <HelpText>
                    Upload at least 1 and maximum 5 high-quality images/videos
                    of your venue
                  </HelpText>
                  <ImageUploadSection>
                    <input
                      type="file"
                      multiple
                      accept="image/,video/"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      id="image-input"
                      disabled={uploadedImages.length >= 5}
                    />
                    <label
                      htmlFor="image-input"
                      style={{
                        cursor:
                          uploadedImages.length >= 5
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      <ImageUploadIcon>⬆</ImageUploadIcon>
                      <ImageUploadText>
                        <strong>Click to upload</strong> or drag and drop
                      </ImageUploadText>
                      <ImageUploadHelper>
                        PNG, JPG, MP4 up to 10MB each (Max 5 images)
                      </ImageUploadHelper>
                    </label>
                  </ImageUploadSection>
                  {uploadedImages.length > 0 && (
                    <>
                      <ImagePreviewContainer>
                        {uploadedImages.map((img, index) => (
                          <ImagePreviewItem key={index}>
                            <img
                              src={img.url || "/placeholder.svg"}
                              alt={`Preview ${index}`}
                            />
                            <RemoveImageButton
                              type="button"
                              onClick={() => removeImage(index)}
                            >
                              <FiX size={16} />
                            </RemoveImageButton>
                          </ImagePreviewItem>
                        ))}
                      </ImagePreviewContainer>
                      <HelpText>
                        {uploadedImages.length}/5 images uploaded
                      </HelpText>
                    </>
                  )}
                </FormGroup>

                <KYCSection>
                  <KYCTitle>KYC Verification Documents</KYCTitle>
                  <HelpText>
                    Upload required business documents for verification
                  </HelpText>

                  <DocumentUploadGroup>
                    <DocumentLabel>
                      CAC Certificate (Corporate Affairs Commission){" "}
                      <span>*</span>
                    </DocumentLabel>
                    <ImageUploadSection>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        onChange={(e) =>
                          handleDocumentUpload(e, "cacCertificate")
                        }
                        style={{ display: "none" }}
                        id="cac-input"
                      />
                      <label htmlFor="cac-input" style={{ cursor: "pointer" }}>
                        <ImageUploadIcon>📄</ImageUploadIcon>
                        <ImageUploadText>
                          {documentFiles.cacCertificate
                            ? `✓ ${documentFiles.cacCertificate.name}`
                            : "Upload CAC Certificate"}
                        </ImageUploadText>
                        <ImageUploadHelper>
                          PDF or Image (Max 5MB)
                        </ImageUploadHelper>
                      </label>
                    </ImageUploadSection>
                  </DocumentUploadGroup>

                  <DocumentUploadGroup>
                    <DocumentLabel>
                      Certificate of Occupancy (C of O) <span>*</span>
                    </DocumentLabel>
                    <ImageUploadSection>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        onChange={(e) =>
                          handleDocumentUpload(e, "certificateOfOccupancy")
                        }
                        style={{ display: "none" }}
                        id="coo-input"
                      />
                      <label htmlFor="coo-input" style={{ cursor: "pointer" }}>
                        <ImageUploadIcon>📄</ImageUploadIcon>
                        <ImageUploadText>
                          {documentFiles.certificateOfOccupancy
                            ? `✓ ${documentFiles.certificateOfOccupancy.name}`
                            : "Upload Certification of Occupancy"}
                        </ImageUploadText>
                        <ImageUploadHelper>
                          PDF or Image (Max 5MB)
                        </ImageUploadHelper>
                      </label>
                    </ImageUploadSection>
                  </DocumentUploadGroup>
                </KYCSection>

                <BottomActions>
                  <PreviousButton onClick={() => setActiveTab("basic")}>
                    Previous
                  </PreviousButton>
                  <CancelButton
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </CancelButton>
                  <NextButton onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Spinner />
                        {editingVenue ? "Updating..." : "Submitting..."}
                      </>
                    ) : (
                      <>
                        <FiUpload size={18} />
                        Submit for Verification
                      </>
                    )}
                  </NextButton>
                </BottomActions>
              </FormContainer>
            )}
          </ModalContent>
        </Modal>
      )}
      {/* </FeatureSection> */}
    </VenuesContainer>
  );
};

export default Venues;
