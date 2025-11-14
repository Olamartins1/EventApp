import styled from "styled-components";

const TermsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <Overlay>
      <ModalBox>
        <Header>
          <Title>Terms & Conditions</Title>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

        <Content>
         <h2>Terms and Conditions</h2>
<p>Last updated: November 14, 2025</p>

<h3>1. Introduction</h3>
<p>
  Welcome to Eventiq. These Terms and Conditions (“Terms”) govern your use of our
  event management platform and services. By accessing or using Eventiq, you
  agree to be bound by these Terms. If you do not agree with any part of these
  Terms, you may not use our services.
</p>
<p>
  Eventiq provides a platform that connects event organizers with venue owners,
  facilitating venue bookings, payments, and event management services.
</p>

<h3>2. Account Terms</h3>

<h4>2.1 Registration</h4>
<p>
  You must create an account to use our services. You agree to provide accurate,
  current, and complete information during registration and to update such
  information to keep it accurate and current.
</p>

<h4>2.2 Account Security</h4>
<p>
  You are responsible for maintaining the confidentiality of your account
  credentials and for all activities that occur under your account. You must
  notify us immediately of any unauthorized access or security breach.
</p>

<h4>2.3 Eligibility</h4>
<p>
  You must be at least 18 years old to create an account and use our services.
  By registering, you represent that you meet this age requirement.
</p>

<h3>3. Venue Listings</h3>

<h4>3.1 Venue Owners</h4>
<p>
  Venue owners are responsible for the accuracy and completeness of their venue
  listings, including descriptions, pricing, availability, amenities, and photos.
</p>

<h4>3.2 Verification</h4>
<p>
  Eventiq reserves the right to verify venue listings and may request additional
  documentation or conduct site visits to ensure listing accuracy.
</p>

<h4>3.3 Listing Removal</h4>
<p>
  We reserve the right to remove any listing that violates these Terms, is
  misleading, or does not meet our quality standards.
</p>

<h3>4. Bookings and Payments</h3>

<h4>4.1 Booking Process</h4>
<p>
  All bookings made through Eventiq are subject to venue availability and
  confirmation by the venue owner. A booking is not confirmed until you receive
  a confirmation notification from us.
</p>

<h4>4.2 Payment</h4>
<p>
  Payment must be completed through our platform using the available payment
  methods. Full payment is required to confirm your booking.
</p>

<h4>4.3 Cancellation Policy</h4>
<p>
  Cancellation terms vary by venue and are displayed at the time of booking.
  Refunds, if applicable, will be processed according to the venue’s cancellation
  policy.
</p>

<h4>4.4 Service Fees</h4>
<p>
  Eventiq charges service fees for bookings made through the platform. These fees
  will be clearly displayed before you complete your booking.
</p>

<h3>5. User Conduct</h3>
<p>You agree not to:</p>
<ul>
  <li>Use the platform for any illegal or unauthorized purpose</li>
  <li>Post false, misleading, or fraudulent information</li>
  <li>Interfere with or disrupt the platform’s functionality</li>
  <li>Attempt to circumvent or bypass venue listing requirements</li>
  <li>Harass, abuse, or harm other users of the platform</li>
</ul>

<h3>6. Intellectual Property</h3>

<h4>6.1 Platform Content</h4>
<p>
  All content, features, and functionality on Eventiq, including text, graphics,
  logos, and software, are owned by Eventiq and protected by intellectual
  property laws.
</p>

<h4>6.2 User Content</h4>
<p>
  By posting content on our platform, you grant Eventiq a non-exclusive,
  worldwide, royalty-free license to use, reproduce, and display such content for
  platform operations and marketing purposes.
</p>

<h3>7. Limitation of Liability</h3>

<h4>7.1 Platform Role</h4>
<p>
  Eventiq acts as an intermediary platform connecting venue owners and event
  organizers. We are not responsible for the actual delivery of venue services or
  the conduct of users.
</p>

<h4>7.2 Disclaimers</h4>
<p>
  The platform is provided “as is” without warranties of any kind. We do not
  guarantee the accuracy of venue listings, availability, or the quality of
  services provided by venue owners.
</p>

<h4>7.3 Liability Cap</h4>
<p>
  To the maximum extent permitted by law, Eventiq’s total liability shall not
  exceed the amount paid by you for the specific booking or service that gave
  rise to the claim.
</p>

<h3>8. Privacy</h3>
<p>
  Your use of Eventiq is subject to our Privacy Policy, which describes how we
  collect, use, and protect your personal information. By using our services, you
  consent to our collection and use of information as described in the Privacy
  Policy.
</p>

<h3>9. Dispute Resolution</h3>

<h4>9.1 Dispute Between Users</h4>
<p>
  While we strive to help users resolve disputes, we are not obliged to do so and
  are not responsible for any disputes that may arise between users.
</p>

<h4>9.2 Governing Law</h4>
<p>
  These Terms shall be governed by and construed in accordance with the laws of
  Nigeria, without regard to conflict of law principles.
</p>

<h3>10. Changes to Terms</h3>
<p>
  We reserve the right to modify these Terms at any time. We will notify users of
  material changes via email or through the platform. Your continued use of
  Eventiq after such modifications constitutes acceptance of the updated Terms.
</p>

<h3>11. Termination</h3>

<h4>11.1 By You</h4>
<p>
  You may terminate your account at any time by contacting our support team or
  through account settings.
</p>

<h4>11.2 By Us</h4>
<p>
  We may suspend or terminate your account if you violate these Terms, engage in
  fraudulent activity, or for any other reason at our discretion.
</p>

<h3>12. Contact Information</h3>
<p>If you have any questions about these Terms and Conditions, please contact us at:</p>

<p><strong>Eventiq Support</strong></p>
<p>Email: support@eventiq.com</p>
<p>Phone: +234 (0) 800 123 4567</p>
<p>Address: Lagos, Nigeria</p>

        </Content>

        <ButtonWrapper>
          <button onClick={onClose}>Close</button>
        </ButtonWrapper>
      </ModalBox>
    </Overlay>
  );
};

export default TermsModal;

// ============== STYLES ==============
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
   color: #252525;
`;

const ModalBox = styled.div`
  width:100%;
  height:70%;
  max-width: 450px;
  background: #f1ebeb;
  border-radius: 12px;
  padding: 20px;
  color: #252525; 
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #252525;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0;
   color: #252525;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 26px;
  cursor: pointer;
`;

const Content = styled.div`
  margin-top: 10px;
  overflow-y: auto;
  height:80%;
`;

const ButtonWrapper = styled.div`
  text-align: right;
  margin-top: 15px;

  button {
    padding: 8px 18px;
    border: none;
    background: #603379;
    color: white;
    border-radius: 6px;
    cursor: pointer;
  }
`;
