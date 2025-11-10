import { useState } from "react";
import styled, { css } from "styled-components";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Who can book halls on Eventiq?",
      answer:
        "Anyone looking for a space, from individuals planning birthdays to companies hosting events.",
    },
    {
      question: "How do payments work?",
      answer:
        "All payments are processed through Kora secure gateway, ensuring safe and fast transactions.",
    },
    {
      question: "Is Eventiq available everywhere in Nigeria?",
      answer:
        "We're currently focused on Lagos, but expanding to more cities soon.",
    },
    {
      question: "Can I list multiple halls?",
      answer:
        "Yes, absolutely. You can manage and track bookings for all your halls under one account.",
    },
    {
      question: "Are bookings verified?",
      answer:
        "Yes. All bookings go through a secure process to ensure both owners and organisers are genuine before confirmation.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container id="faq">
      <Content>
        <Faq_header>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about Eventiq</p>
        </Faq_header>

        <Faq_list>
          {faqs.map((faq, index) => (
            <Faq_item key={index}>
              <Faq_button onClick={() => toggleAccordion(index)}>
                <Faq_question>{faq.question}</Faq_question>
                <FaqIcon $open={openIndex === index} viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </FaqIcon>
              </Faq_button>

              {openIndex === index && (
                <Faq_answer>
                  <p>{faq.answer}</p>
                </Faq_answer>
              )}
            </Faq_item>
          ))}
        </Faq_list>
      </Content>
    </Container>
  );
};

export default Faq;
const FaqIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  strokewidth: 2;
  strokelinecap: round;
  strokelinejoinn: round;
  transition: transform 0.3s ease;

  ${({ $open }) =>
    $open &&
    css`
      transform: rotate(180deg);
    `}
`;

const Faq_button = styled.button`
  width: 100%;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f9fafb;
  }
`;

const Faq_item = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
`;

const Faq_list = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Faq_question = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
`;

const Faq_answer = styled.div`
  padding: 0 1.5rem 1.25rem;
  color: #444;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const Faq_header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 1rem;
    margin-top: 50px;
  }
  p {
    font-size: 1rem;
    color: #292929;
    font-weight: 500;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 56rem;
  margin-top: -70px;
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom left, #d8b4fe, #b6a1c1, #35034ecc);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
