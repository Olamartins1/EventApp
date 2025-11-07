import styled from "styled-components";
import {
  X,
  MapPin,
  Users,
  IndianRupee,
  Calendar,
  Clock,
  Utensils,
  Music,
  Camera,
  Palette,
  Cake,
  Flower2,
  Sparkles,
  Mic2,
  Car,
} from "lucide-react";

const ViewDetailsModal = ({ onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={18} />
        </CloseButton>

        <Header>
          <Title>Grand Elegance Banquet Hall</Title>

          <ImageSection>
            <ImageLabel>Venue Images</ImageLabel>
            <ImageGrid>
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=400"
                alt="Venue 1"
              />
              <Image
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400"
                alt="Venue 2"
              />
              <Image
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400"
                alt="Venue 3"
              />
            </ImageGrid>
          </ImageSection>
        </Header>

        <Content>
          <Section>
            <SectionTitle>Basic Information</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <IconWrapper>
                  <MapPin size={18} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Location</InfoLabel>
                  <InfoValue>Ikoyi, Lagos, Nigeria</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <Users size={18} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Capacity</InfoLabel>
                  <InfoValue>500-1000 guests</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <IndianRupee size={18} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Price Range</InfoLabel>
                  <InfoValue>₦500K</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <Calendar size={18} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Available From</InfoLabel>
                  <InfoValue>25 October 2025</InfoValue>
                </InfoContent>
              </InfoItem>
            </InfoGrid>
          </Section>

          <Section>
            <SectionTitle>Description</SectionTitle>
            <Description>
              Grand ballroom designed for large-scale events. Features
              cross-ceiling details, crystal chandeliers, and spacious layout
              ideal for weddings and corporate gatherings. Elegant red carpeting
              with large guest area.
            </Description>
          </Section>

          <Section>
            <SectionTitle>Pricing & Operating Hours</SectionTitle>
            <TimeSlotGrid>
              <TimeSlot>
                <IconWrapper>
                  <Clock size={18} />
                </IconWrapper>
                <TimeSlotInfo>
                  <TimeSlotLabel>Daytime</TimeSlotLabel>
                  <TimeSlotValue>08:00AM - 04:00PM</TimeSlotValue>
                </TimeSlotInfo>
              </TimeSlot>

              <TimeSlot>
                <IconWrapper>
                  <Clock size={18} />
                </IconWrapper>
                <TimeSlotInfo>
                  <TimeSlotLabel>Evening Slot</TimeSlotLabel>
                  <TimeSlotValue>04:00PM - 12:00AM</TimeSlotValue>
                </TimeSlotInfo>
              </TimeSlot>

              <TimeSlot>
                <IconWrapper>
                  <Clock size={18} />
                </IconWrapper>
                <TimeSlotInfo>
                  <TimeSlotLabel>Closing Time</TimeSlotLabel>
                  <TimeSlotValue>12:00 AM</TimeSlotValue>
                </TimeSlotInfo>
              </TimeSlot>
            </TimeSlotGrid>
          </Section>

          <Section>
            <SectionTitle>Available Amenities & Facilities</SectionTitle>
            <AmenitiesGrid>
              <AmenityItem>
                <AmenityIcon color="#10b981">
                  <Utensils size={16} />
                </AmenityIcon>
                Air Conditioning
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#3b82f6">
                  <Music size={16} />
                </AmenityIcon>
                Sound System
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#8b5cf6">
                  <Sparkles size={16} />
                </AmenityIcon>
                Professional Lighting
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#06b6d4">
                  <Mic2 size={16} />
                </AmenityIcon>
                Projector/Screen
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#f59e0b">
                  <Utensils size={16} />
                </AmenityIcon>
                Catering Services
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#ec4899">
                  <Palette size={16} />
                </AmenityIcon>
                Decor/DJ
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#14b8a6">
                  <Flower2 size={16} />
                </AmenityIcon>
                Tables & Chairs
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#ef4444">
                  <Cake size={16} />
                </AmenityIcon>
                Backup Generator
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#6366f1">
                  <Camera size={16} />
                </AmenityIcon>
                Stage/Platform
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#64748b">
                  <Car size={16} />
                </AmenityIcon>
                Changing Rooms
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#84cc16">
                  <Utensils size={16} />
                </AmenityIcon>
                Dance Floor
              </AmenityItem>

              <AmenityItem>
                <AmenityIcon color="#a855f7">
                  <Car size={16} />
                </AmenityIcon>
                Parking
              </AmenityItem>
            </AmenitiesGrid>
          </Section>

          <Section>
            <SectionTitle>KYC Verification Documents</SectionTitle>
            <DocumentsGrid>
              <DocumentItem href="#" onClick={(e) => e.preventDefault()}>
                <DocumentInfo>
                  <DocumentIconWrapper>
                    <Sparkles size={18} />
                  </DocumentIconWrapper>
                  <DocumentContent>
                    <DocumentTitle>CAC Certificate</DocumentTitle>
                    <DocumentSubtitle>
                      certificate_of_registration.pdf
                    </DocumentSubtitle>
                  </DocumentContent>
                </DocumentInfo>
                <ViewLink>View</ViewLink>
              </DocumentItem>

              <DocumentItem href="#" onClick={(e) => e.preventDefault()}>
                <DocumentInfo>
                  <DocumentIconWrapper>
                    <Sparkles size={18} />
                  </DocumentIconWrapper>
                  <DocumentContent>
                    <DocumentTitle>Certificate of Occupancy</DocumentTitle>
                    <DocumentSubtitle>
                      certificate_of_occupancy.pdf
                    </DocumentSubtitle>
                  </DocumentContent>
                </DocumentInfo>
                <ViewLink>View</ViewLink>
              </DocumentItem>
            </DocumentsGrid>
          </Section>
        </Content>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ViewDetailsModal;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }
`;

const Header = styled.div`
  padding: 24px 24px 0;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
`;

const ImageSection = styled.div`
  margin-bottom: 24px;
`;

const ImageLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 8px;
`;

const Content = styled.div`
  padding: 0 24px 24px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const IconWrapper = styled.div`
  color: #666;
  flex-shrink: 0;
  margin-top: 2px;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const TimeSlot = styled.div`
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimeSlotInfo = styled.div`
  flex: 1;
`;

const TimeSlotLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
`;

const TimeSlotValue = styled.div`
  font-size: 13px;
  color: #1a1a1a;
  font-weight: 500;
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #f9f9f9;
  border-radius: 8px;
  font-size: 13px;
  color: #1a1a1a;
`;

const AmenityIcon = styled.div`
  color: ${(props) => props.color || "#666"};
  flex-shrink: 0;
`;

const DocumentsGrid = styled.div`
  display: grid;
  gap: 8px;
`;

const DocumentItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #f0f0ff;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: #e5e5ff;
  }
`;

const DocumentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const DocumentIconWrapper = styled.div`
  color: #6366f1;
`;

const DocumentContent = styled.div``;

const DocumentTitle = styled.div`
  font-size: 13px;
  color: #1a1a1a;
  font-weight: 500;
  margin-bottom: 2px;
`;

const DocumentSubtitle = styled.div`
  font-size: 11px;
  color: #666;
`;

const ViewLink = styled.span`
  font-size: 12px;
  color: #6366f1;
  font-weight: 500;
`;
