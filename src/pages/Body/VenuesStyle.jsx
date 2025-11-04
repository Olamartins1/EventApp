
export const VenuesContainer = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin: 0;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  font-size: 4rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

export const EmptyTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

export const EmptyDescription = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin: 0;
`;

export const VenuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

export const VenueCardSkeleton = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const SkeletonImage = styled.div`
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

export const SkeletonContent = styled.div`
  padding: 1.25rem;
`;

export const SkeletonBar = styled.div`
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

export const VenueCard = styled.div`
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

export const VenueImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const VenueImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const VerifiedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(34, 197, 94, 0.95);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const VenueImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
`;

export const VenueContent = styled.div`
  padding: 1.5rem;
`;

export const VenueName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.75rem 0;
`;

export const VenueDetail = styled.div`
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

export const VenueStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatLabel = styled.span`
  font-size: 0.75rem;
  color: #999;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
`;

export const StatValue = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1a1a1a;
`;

export const ViewDetailsButton = styled.button`
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

export const VenueActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
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

export const DeleteButton = styled(ActionButton)`
  &:hover {
    background: #fee;
    border-color: #f44;
    color: #f44;
  }
`;

export const PlansContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const PlansHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const PlansTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "⭐";
    font-size: 1.75rem;
  }
`;

export const PlansSubtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0 0 2rem 0;
`;

export const PlansGrid = styled.div`
  display: flex;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  gap: 2rem;
`;

export const PlanCard = styled.div`
  background: #f3f0ff;
  border: ${(props) =>
    props.popular ? "2px solid #7c3aed" : "2px solid #e0e0e0"};
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
  position: relative;
  transition: all 0.3s;
  width: 230px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #7c3aed;
  color: white;
  padding: 4px 16px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const PlanDuration = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin: ${(props) =>
    props.popular ? "1.5rem 0 0.75rem 0" : "0 0 0.75rem 0"};
`;

export const PlanPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #7c3aed;
  margin: 0.5rem 0;
`;

export const PlanDays = styled.p`
  font-size: 0.875rem;
  color: #999;
  margin: 0.5rem 0 1.5rem 0;
`;

export const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
`;

export const PlanFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #666;

  svg {
    color: #7c3aed;
    flex-shrink: 0;
  }
`;

export const SubscribeButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  margin-top: 1.5rem;
  border: ${(props) => (props.popular ? "none" : "1px solid #7c3aed")};
  background: ${(props) => (props.popular ? "#7c3aed" : "white")};
  color: ${(props) => (props.popular ? "white" : "#7c3aed")};
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #7c3aed;
    color: white;
    ${(props) => !props.popular && "border-color: #7c3aed;"}
  }
`;

export const Modal = styled.div`
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

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  width: 90%;
  max-width: 800px;
  margin: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

export const CloseButton = styled.button`
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

export const TabNav = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #eee;
`;

export const Tab = styled.button`
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

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem;
  max-height: calc(100vh - 400px);
  overflow-y: auto;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;

  span {
    color: #e74c3c;
  }
`;

export const Input = styled.input`
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

export const TextArea = styled.textarea`
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

export const Select = styled.select`
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

export const ImageUploadSection = styled.div`
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

export const ImageUploadIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
`;

export const ImageUploadText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;

  strong {
    color: #1a1a1a;
  }
`;

export const ImageUploadHelper = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 0.5rem 0 0 0;
`;

export const ImagePreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

export const ImagePreviewItem = styled.div`
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

export const RemoveImageButton = styled.button`
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

export const SubmitButton = styled.button`
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

export const Spinner = styled.div`
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

export const HelpText = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 0.5rem 0 0 0;
`;

export const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;
`;

export const CheckboxLabel = styled.label`
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

export const KYCSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`;

export const KYCTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

export const DocumentUploadGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const DocumentLabel = styled(Label)`
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

export const BottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

export const NextButton = styled(SubmitButton)`
  background-color: #2563eb;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }
`;

export const PreviousButton = styled.button`
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

export const CancelButton = styled(PreviousButton)`
  color: #e74c3c;
  border-color: #e74c3c;

  &:hover {
    background: #fff0f0;
    border-color: #c0392b;
  }
`;
