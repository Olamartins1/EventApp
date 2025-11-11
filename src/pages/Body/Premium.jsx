// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import { toast } from "react-toastify";

// const FeaturesSectionComponent = () => {
//   const [features, setFeatures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFeatures = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("authToken");
//         console.log("🔑 Token from localStorage:", token);

//         const response = await axios.get(
//           "https://eventiq-final-project.onrender.com/api/v1/features",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("📦 Raw API Response:", response);

//         if (response.data && response.data.data) {
//           console.log("✅ Features data received:", response.data.data);
//           setFeatures(response.data.data);
//           setError(null);
//         } else {
//           console.warn("⚠️ Invalid response format:", response.data);
//           setError("Invalid response format");
//           toast.error("Failed to load features");
//         }
//       } catch (err) {
//         console.error("❌ Features fetch error:", err);
//         const errorMessage = axios.isAxiosError(err)
//           ? err.response?.data?.message || err.message
//           : "Failed to load features";
//         setError(errorMessage);
//         toast.error(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeatures();
//   }, []);

//   console.log(
//     "📊 Current state — loading:",
//     loading,
//     "error:",
//     error,
//     "features:",
//     features
//   );

//   if (loading) {
//     return (
//       <FeaturesContainer>
//         <FeaturesHeader>
//           <FeaturesTitle>Pricing Plans</FeaturesTitle>
//         </FeaturesHeader>
//         <FeaturesSubtitle>
//           Choose your preferred subscription duration
//         </FeaturesSubtitle>
//         <SkeletonGrid>
//           {[1, 2, 3, 4].map((index) => (
//             <SkeletonCard key={index}>
//               <SkeletonIcon />
//               <SkeletonBar style={{ height: "20px", width: "80%" }} />
//               <SkeletonBar style={{ height: "14px", width: "100%" }} />
//               <SkeletonBar style={{ height: "14px", width: "90%" }} />
//             </SkeletonCard>
//           ))}
//         </SkeletonGrid>
//       </FeaturesContainer>
//     );
//   }

//   if (error) {
//     return (
//       <FeaturesContainer>
//         <FeaturesHeader>
//           <FeaturesTitle>Pricing Plans</FeaturesTitle>
//         </FeaturesHeader>
//         <FeaturesSubtitle>
//           Choose your preferred subscription duration
//         </FeaturesSubtitle>
//         <div style={{ textAlign: "center", padding: "2rem", color: "#ff0000" }}>
//           <p>⚠️ {error}</p>
//         </div>
//       </FeaturesContainer>
//     );
//   }

//   if (features.length === 0) {
//     return (
//       <FeaturesContainer>
//         <FeaturesHeader>
//           <FeaturesTitle>Pricing Plans</FeaturesTitle>
//         </FeaturesHeader>
//         <FeaturesSubtitle>
//           Choose your preferred subscription duration
//         </FeaturesSubtitle>
//         <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
//           <p>No plans available at the moment. Check back soon!</p>
//         </div>
//       </FeaturesContainer>
//     );
//   }

//   return (
//     <FeaturesContainer>
//       <FeaturesHeader>
//         <FeaturesTitle>Pricing Plans</FeaturesTitle>
//       </FeaturesHeader>
//       <FeaturesSubtitle>
//         Choose your preferred subscription duration
//       </FeaturesSubtitle>
//       <FeaturesGrid>
//         {features.map((feature) => (
//           <FeatureCard key={feature._id}>
//             <FeatureIcon>💰</FeatureIcon>
//             <FeatureName>
//               {feature.duration} Month{feature.duration > 1 ? "s" : ""}
//             </FeatureName>
//             <FeatureDescription>
//               ₦{feature.amount.toLocaleString()}
//             </FeatureDescription>
//           </FeatureCard>
//         ))}
//       </FeaturesGrid>
//     </FeaturesContainer>
//   );
// };

// export default FeaturesSectionComponent;

// ("use client");



// const FeaturesContainer = styled.div`
//   background: white;
//   padding: 2rem;
//   border-radius: 12px;
//   margin-bottom: 3rem;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
// `;

// const FeaturesHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   margin-bottom: 0.5rem;
// `;

// const FeaturesTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: #1a1a1a;
//   margin: 0;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   &:before {
//     content: "✨";
//     font-size: 1.75rem;
//   }
// `;

// const FeaturesSubtitle = styled.p`
//   font-size: 0.95rem;
//   color: #666;
//   margin: 0 0 2rem 0;
// `;

// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 1.5rem;
// `;

// const FeatureCard = styled.div`
//   background: linear-gradient(135deg, #f5f3ff 0%, #faf7ff 100%);
//   border: 1px solid #ede9fe;
//   border-radius: 12px;
//   padding: 1.5rem;
//   text-align: center;
//   transition: all 0.3s;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 12px 24px rgba(124, 58, 237, 0.15);
//     border-color: #7c3aed;
//   }
// `;

// const FeatureIcon = styled.div`
//   font-size: 2.5rem;
//   margin-bottom: 1rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 60px;
//   height: 60px;
//   background: rgba(124, 58, 237, 0.1);
//   border-radius: 8px;
// `;

// const FeatureName = styled.h3`
//   font-size: 1.125rem;
//   font-weight: 700;
//   color: #1a1a1a;
//   margin: 0 0 0.75rem 0;
// `;

// const FeatureDescription = styled.p`
//   font-size: 0.875rem;
//   color: #666;
//   margin: 0;
//   line-height: 1.5;
// `;

// const SkeletonGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 1.5rem;
// `;

// const SkeletonCard = styled.div`
//   background: white;
//   border: 1px solid #eee;
//   border-radius: 12px;
//   padding: 1.5rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 1rem;
// `;

// const SkeletonIcon = styled.div`
//   width: 60px;
//   height: 60px;
//   background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//   background-size: 200% 100%;
//   animation: loading 1.5s infinite;
//   border-radius: 8px;

//   @keyframes loading {
//     0% {
//       background-position: 200% 0;
//     }
//     100% {
//       background-position: -200% 0;
//     }
//   }
// `;

// const SkeletonBar = styled.div`
//   height: 16px;
//   background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//   background-size: 200% 100%;
//   animation: loading 1.5s infinite;
//   border-radius: 6px;
//   width: 100%;

//   @keyframes loading {
//     0% {
//       background-position: 200% 0;
//     }
//     100% {
//       background-position: -200% 0;
//     }
//   }

//   &:last-child {
//     width: 85%;
//   }
// `;
