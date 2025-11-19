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

const ViewDetailsModal = ({ onClose, venue }) => {
  const amenitiesArray =
    venue?.raw.amenities?.[0]?.split(",").map((a) => a.trim()) || [];
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={18} />
        </CloseButton>

        <Header>
          <Title>{venue.raw.venuename}</Title>

          <ImageSection>
            <ImageLabel>Venue Images</ImageLabel>
            <ImageGrid>
              {/* <Image
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
              /> */}

              {venue?.raw.documents?.images?.map((img) => (
                <Image key={img?._id} src={img?.url} alt={venue?.venuename} />
              ))}
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
                  <InfoValue>
                    {" "}
                    {venue?.raw.location?.street}, {venue?.raw.location?.city},{" "}
                    {venue?.raw.location?.state}
                  </InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>{/* <Users size={18} /> */}</IconWrapper>
                <InfoContent>
                  <InfoLabel>Capacity</InfoLabel>
                  <InfoValue>
                    {" "}
                    {venue?.raw.capacity?.minimum}-
                    {venue?.raw.capacity?.maximum} guests
                  </InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  {/* <Users size={18} /> */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 2.5H17.5V7.5"
                      stroke="#707070"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.5001 2.5L11.6667 8.33333"
                      stroke="#707070"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.5 17.5013L8.33333 11.668"
                      stroke="#707070"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.5 17.5H2.5V12.5"
                      stroke="#707070"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Hall Size</InfoLabel>
                  <InfoValue>{venue?.raw.hallsize}</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <MapPin size={18} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Venue Type</InfoLabel>
                  <InfoValue>{venue?.raw.type}</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <Calendar size={18} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Available From</InfoLabel>
                  <InfoValue>
                    {new Date(venue?.raw.createdAt)?.toLocaleDateString()}
                  </InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.4999 1.66797H4.99992C4.55789 1.66797 4.13397 1.84356 3.82141 2.15612C3.50885 2.46868 3.33325 2.89261 3.33325 3.33464V16.668C3.33325 17.11 3.50885 17.5339 3.82141 17.8465C4.13397 18.159 4.55789 18.3346 4.99992 18.3346H14.9999C15.4419 18.3346 15.8659 18.159 16.1784 17.8465C16.491 17.5339 16.6666 17.11 16.6666 16.668V5.83464L12.4999 1.66797Z"
                      stroke="#707070"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.6667 1.66797V5.0013C11.6667 5.44333 11.8423 5.86725 12.1549 6.17981C12.4675 6.49237 12.8914 6.66797 13.3334 6.66797H16.6667"
                      stroke="#707070"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.33341 7.5H6.66675"
                      stroke="#707070"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.3334 10.832H6.66675"
                      stroke="#707070"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.3334 14.168H6.66675"
                      stroke="#707070"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Owner</InfoLabel>
                  <InfoValue>{venue?.raw.venueOwnerId}</InfoValue>
                </InfoContent>
              </InfoItem>
            </InfoGrid>
          </Section>

          <Section>
            <SectionTitle>Description</SectionTitle>
            <Description>{venue?.raw.description}</Description>
          </Section>

          <Section>
            <SectionTitle>Pricing & Operating Hours</SectionTitle>
            <TimeSlotGrid>
              <TimeSlotGrid1>
                <TimeSlot>
                  <IconWrapper>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
                        fill="url(#paint0_linear_2311_6973)"
                      />
                      <path
                        d="M20 11.668V28.3346"
                        stroke="#281533"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.1667 14.168H17.9167C17.1431 14.168 16.4013 14.4753 15.8543 15.0222C15.3073 15.5692 15 16.3111 15 17.0846C15 17.8582 15.3073 18.6 15.8543 19.147C16.4013 19.694 17.1431 20.0013 17.9167 20.0013H22.0833C22.8569 20.0013 23.5987 20.3086 24.1457 20.8556C24.6927 21.4026 25 22.1444 25 22.918C25 23.6915 24.6927 24.4334 24.1457 24.9804C23.5987 25.5273 22.8569 25.8346 22.0833 25.8346H15"
                        stroke="#281533"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2311_6973"
                          x1="0"
                          y1="0"
                          x2="40"
                          y2="40"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#AD46FF" stop-opacity="0.1" />
                          <stop
                            offset="1"
                            stop-color="#9810FA"
                            stop-opacity="0.1"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </IconWrapper>
                  <TimeSlotInfo>
                    <TimeSlotLabel>Price per Day</TimeSlotLabel>
                    <TimeSlotValue>
                      #{venue?.raw.price?.toLocaleString()}
                    </TimeSlotValue>
                  </TimeSlotInfo>
                </TimeSlot>
                <TimeSlot>
                  <IconWrapper>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z"
                        fill="#F5F5F5"
                      />
                      <path
                        d="M20 11.668V28.3346"
                        stroke="#292929"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.1667 14.168H17.9167C17.1431 14.168 16.4013 14.4753 15.8543 15.0222C15.3073 15.5692 15 16.3111 15 17.0846C15 17.8582 15.3073 18.6 15.8543 19.147C16.4013 19.694 17.1431 20.0013 17.9167 20.0013H22.0833C22.8569 20.0013 23.5987 20.3086 24.1457 20.8556C24.6927 21.4026 25 22.1444 25 22.918C25 23.6915 24.6927 24.4334 24.1457 24.9804C23.5987 25.5273 22.8569 25.8346 22.0833 25.8346H15"
                        stroke="#292929"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </IconWrapper>
                  <TimeSlotInfo>
                    <TimeSlotLabel>Caution Fee</TimeSlotLabel>
                    <TimeSlotValue>
                      #{venue?.raw.cautionfee?.toLocaleString()}
                    </TimeSlotValue>
                  </TimeSlotInfo>
                </TimeSlot>
              </TimeSlotGrid1>

              <TimeSlotGrid2>
                <TimeSlot>
                  <IconWrapper>
                    <Clock size={18} />
                  </IconWrapper>
                  <TimeSlotInfo>
                    <TimeSlotLabel>Opening Time</TimeSlotLabel>
                    <TimeSlotValue>{venue?.raw.openingtime}</TimeSlotValue>
                  </TimeSlotInfo>
                </TimeSlot>

                <TimeSlot>
                  <IconWrapper>
                    <Clock size={18} />
                  </IconWrapper>
                  <TimeSlotInfo>
                    <TimeSlotLabel>Closing Time</TimeSlotLabel>
                    <TimeSlotValue>{venue?.raw.closingtime}</TimeSlotValue>
                  </TimeSlotInfo>
                </TimeSlot>
              </TimeSlotGrid2>
            </TimeSlotGrid>
          </Section>

          <Section>
            <SectionTitle>Available Amenities & Facilities</SectionTitle>
            <AmenitiesGrid>
              {/* <Amenity1>
                <AmenityItem>
                 
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2311_7096)">
                      <path
                        d="M13.6537 6.92695V12.352C13.6537 12.6969 13.5167 13.0276 13.2728 13.2715C13.029 13.5153 12.6982 13.6523 12.3533 13.6523H3.25091C2.90604 13.6523 2.57529 13.5153 2.33142 13.2715C2.08756 13.0276 1.95056 12.6969 1.95056 12.352V3.24957C1.95056 2.90469 2.08756 2.57394 2.33142 2.33008C2.57529 2.08622 2.90604 1.94922 3.25091 1.94922H11.2767"
                        stroke="#00B235"
                        stroke-width="1.30035"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.85156 7.15278L7.80208 9.1033L14.3038 2.60156"
                        stroke="#00B235"
                        stroke-width="1.30035"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2311_7096">
                        <rect width="15.6042" height="15.6042" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
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
              </Amenity1>

              <Amenity2>
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
              </Amenity2>

              <Amenity3>
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

                {venue?.raw.amenities?.map((amenity, index) => (
                  <AmenityItem key={index}>
                    {amenity}
                    <AmenityIcon color="#84cc16">
                      <Utensils size={16} />
                    </AmenityIcon>
                    Dance Floor
                  </AmenityItem>
                ))}
                {venue?.raw.amenities?.map((amenity, index) => (
                  <AmenityItem key={index}>
                    {amenity}
                    <AmenityIcon color="#a855f7">
                      <Car size={16} />
                    </AmenityIcon>
                    Parking
                  </AmenityItem>
                ))}
              </Amenity3> */}
              {amenitiesArray.map((amenity, index) => (
                <AmenityItem key={index}>
                  <AmenityIcon color="#10b981">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_2311_7096)">
                        <path
                          d="M13.6537 6.92695V12.352C13.6537 12.6969 13.5167 13.0276 13.2728 13.2715C13.029 13.5153 12.6982 13.6523 12.3533 13.6523H3.25091C2.90604 13.6523 2.57529 13.5153 2.33142 13.2715C2.08756 13.0276 1.95056 12.6969 1.95056 12.352V3.24957C1.95056 2.90469 2.08756 2.57394 2.33142 2.33008C2.57529 2.08622 2.90604 1.94922 3.25091 1.94922H11.2767"
                          stroke="#00B235"
                          stroke-width="1.30035"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.85156 7.15278L7.80208 9.1033L14.3038 2.60156"
                          stroke="#00B235"
                          stroke-width="1.30035"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2311_7096">
                          <rect width="15.6042" height="15.6042" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    {/* or dynamic icon based on amenity */}
                  </AmenityIcon>
                  {amenity.trim()} {/* trim to remove extra spaces */}
                </AmenityItem>
              ))}
            </AmenitiesGrid>
          </Section>

          <Section>
            <SectionTitle>KYC Verification Documents</SectionTitle>
            <DocumentsGrid>
              {venue?.raw.documents?.cac?.map((doc) => (
                <DocumentItem
                  key={doc?._id}
                  href={doc?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  // onClick={(e) => e?.preventDefault()}
                >
                  <DocumentInfo>
                    <DocumentIconWrapper>
                      {/* <Sparkles size={18} /> */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 1.66797H5.00004C4.55801 1.66797 4.13409 1.84356 3.82153 2.15612C3.50897 2.46868 3.33337 2.89261 3.33337 3.33464V16.668C3.33337 17.11 3.50897 17.5339 3.82153 17.8465C4.13409 18.159 4.55801 18.3346 5.00004 18.3346H15C15.4421 18.3346 15.866 18.159 16.1786 17.8465C16.4911 17.5339 16.6667 17.11 16.6667 16.668V5.83464L12.5 1.66797Z"
                          stroke="#9810FA"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.6666 1.66797V5.0013C11.6666 5.44333 11.8422 5.86725 12.1548 6.17981C12.4673 6.49237 12.8913 6.66797 13.3333 6.66797H16.6666"
                          stroke="#9810FA"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.33329 7.5H6.66663"
                          stroke="#9810FA"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.3333 10.832H6.66663"
                          stroke="#9810FA"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.3333 14.168H6.66663"
                          stroke="#9810FA"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </DocumentIconWrapper>
                    <DocumentContent>
                      <DocumentTitle>CAC Certificate</DocumentTitle>
                      <DocumentSubtitle>
                        {doc?.raw?.publicId?.split("/")?.pop()}
                      </DocumentSubtitle>
                    </DocumentContent>
                  </DocumentInfo>
                  <ViewLink>View</ViewLink>
                </DocumentItem>
              ))}

              {venue?.raw.documents?.doc?.map((doc) => (
                <DocumentItem
                  key={doc?._id}
                  href={doc?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  // onClick={(e) => e?.preventDefault()}
                >
                  <DocumentInfo>
                    <DocumentIconWrapper>
                      {/* <Sparkles size={18} /> */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 1.66797H5.00004C4.55801 1.66797 4.13409 1.84356 3.82153 2.15612C3.50897 2.46868 3.33337 2.89261 3.33337 3.33464V16.668C3.33337 17.11 3.50897 17.5339 3.82153 17.8465C4.13409 18.159 4.55801 18.3346 5.00004 18.3346H15C15.4421 18.3346 15.866 18.159 16.1786 17.8465C16.4911 17.5339 16.6667 17.11 16.6667 16.668V5.83464L12.5 1.66797Z"
                          stroke="#9810FA"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.6666 1.66797V5.0013C11.6666 5.44333 11.8422 5.86725 12.1548 6.17981C12.4673 6.49237 12.8913 6.66797 13.3333 6.66797H16.6666"
                          stroke="#9810FA"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.33329 7.5H6.66663"
                          stroke="#9810FA"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.3333 10.832H6.66663"
                          stroke="#9810FA"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.3333 14.168H6.66663"
                          stroke="#9810FA"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </DocumentIconWrapper>
                    <DocumentContent>
                      <DocumentTitle>Certificate of Occupancy</DocumentTitle>
                      <DocumentSubtitle>
                        {doc?.raw?.publicId.split("/")?.pop()}
                      </DocumentSubtitle>
                    </DocumentContent>
                  </DocumentInfo>
                  <ViewLink>View</ViewLink>
                </DocumentItem>
              ))}
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
  background-color: #efebf2;
  border-radius: 12px;
  width: 100%;
  max-width: 744px;
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
  background-color: white;
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

// const ImageGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 8px;
// `;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  & > * {
    flex: 0 0 calc((100% - 16px) / 3); /* 3 items per row */
  }
`;

const Image = styled.img`
  width: 40px;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 30px;
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

// const InfoGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 16px;
// `;

const InfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  & > * {
    flex: 0 0 calc((100% - 16px) / 2); /* 2 items per row */
  }
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

// const TimeSlotGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 12px;
// `;

const TimeSlotGrid1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  flex-direction: row;

  & > * {
    flex: 0 0 calc((100% - 12px) / 2); /* 2 items per row */
  }
`;

const TimeSlotGrid2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  flex-direction: row;

  & > * {
    flex: 0 0 calc((100% - 12px) / 2); /* 2 items per row */
  }
`;

const TimeSlotGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  flex-direction: row;

  & > * {
    flex: 0 0 calc((100% - 12px) / 2); /* 2 items per row */
  }
`;

const TimeSlot = styled.div`
  padding: 12px;
  // border: 1px solid #e5e5e5;
  // border-radius: 8px;
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

// const AmenitiesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 12px;
// `;

const Amenity1 = styled.div`
  display: flex;
  // flex-wrap: wrap;
  gap: 12px;
  flex-direction: column;
  width: 200px;
  height: 100px;

  & > * {
    flex: 0 0 calc((100% - 12px) / 2); /* 2 items per row */
  }
`;

const Amenity2 = styled.div`
  display: flex;
  // flex-wrap: wrap;
  gap: 12px;
  flex-direction: column;
  width: 200px;
  height: 100px;

  & > * {
    flex: 0 0 calc((100% - 12px) / 2); /* 2 items per row */
  }
`;

const Amenity3 = styled.div`
  display: flex;
  // flex-wrap: wrap;
  gap: 12px;
  flex-direction: column;
  width: 200px;
  height: 100px;

  & > * {
    flex: 0 0 calc((100% - 12px) / 2); /* 2 items per row */
  }
`;

{
  /* const AmenitiesGrid = styled.div`
  display: flex;
  gap: 10px;
  height: 300px;
`; */
}

const AmenitiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap; /* allow items to go to next row */
  gap: 12px;
`;

// const AmenityItem = styled.div`
//   display: flex;
//   align-items: center;

//   gap: 8px;
//   padding: 10px 12px;
//   background: #f9f9f9;
//   border-radius: 8px;
//   font-size: 13px;
//   color: #1a1a1a;
// `;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #f9f9f9;
  border-radius: 8px;
  font-size: 13px;
  color: #1a1a1a;
  flex: 0 0 auto; /* important: prevent stretching */
`;

const AmenityIcon = styled.div`
  color: ${(props) => props.color || "#666"};
  flex-shrink: 0;
`;

// const DocumentsGrid = styled.div`
//   display: grid;
//   gap: 8px;
// `;

const DocumentsGrid = styled.div`
  display: flex;
  flex-direction: column; /* stack items vertically */
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
  color: #9810fa;
  font-weight: 500;
  padding: 0.3rem;
  width: 40px;
  height: 20px;
  border: 1px solid #dab2ff;
  border-radius: 10px;
  text-align: center;
  background-color: white;
`;
