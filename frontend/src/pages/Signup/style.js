import styled from "styled-components";

const StyledWrapper = styled.div.attrs({ className: "styled-wrapper" })`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  height: 90%;
  min-height: 86vh;
  @media (max-width: 419px) {
    min-height: 100vh;
  }
`;

const FormikSectionContainer = styled.div.attrs({
  className: "formkit-section-container",
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 50%;
  background-color: #fff;
  height: 100%;
  margin: 130px 0;

  @media (max-width: 767px) {
    max-width: 100%;
    margin: 0 0;
  }
  @media (max-width: 419px) {
    background: transparent;
    padding 5% 10px;
  }
`;

const WelcomeContainer = styled.div.attrs({ className: "welcome-container" })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15%;

  > .welcome {
    font-size: 1.3rem;
    color: #8d8d8d;
    font-weight: 400;
    font-style: normal;
    line-height: 1.6rem;
    @media (max-width: 419px) {
      display: unset;
      color: #fff;
       font-size: 17px;
       font-family: 'HelveticaNeueBold';
    }
  }
  > .welcome-mobile {
    display: none;
    @media (max-width: 419px) {
      display: unset;
      color: #fff;
      font-family: 'HelveticaNeueMedium';
      margin-bottom: 2rem;
      
      font-size: 17px;
    }
  }

  > .signup-account {
    font-size: 1.125rem;
    color: #000;
    font-weight: 700;
    font-style: normal;
    line-height: 1.7rem;
    letter-spacing: 0.05em;
    @media (max-width: 419px) {
      display: none;
    }
  }
  .signup-account-mobile {
    display: none;
    @media (max-width: 419px) {
      display: flex;
      color: #fbd12e;
      font-size: 1.5rem;
      margin-top:5%;
      font-weight: 600;
      font-family: HelveticaNeueBold;
    }
  }
`;

const FormikSection = styled.div.attrs({ className: "formkit-section" })`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: 991px) {
    width: 100%;
    padding: 0 20px;
  }
  @media (max-width: 419px) {
    padding: 0 20px;
  }
`;

const FormWrapper = styled.div.attrs({ className: "form-wrapper" })`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
 @media (max-width: 419px) {
    .label-class{
      display:none;
    }
    }
  > div {
    @media (max-width: 480px) {
      display: block;
      width: 100%;
    }
    @media (max-width: 1199px) {
      display: block;
      width: 100%;
    }

    > div {
      position: relative;
      margin-bottom: 10px;
    }
    @media (max-width: 1199px) {
      > div {
        position: relative;
        margin-bottom: 6%;
      }
    }
  }

  .alert {
    padding: 5px;
    font-size: 12px;
    margin-bottom: 0;
    position: relative;
    width: 100%;
    margin: 2px auto 0;
    text-align: center;
  }
  .mobile-field{
    padding: 0.4rem;
    margin-bottom: 0;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "gray" : "#000")};
  border-radius: 6px;
  padding: 0.5rem;
  color: #fff;
  border: none;
  font-weight: 700;
  font-size: 17px;
  line-height: 25px;
  margin-bottom: 15px;
  letter-spacing: 0.05em;
  width: 100%;
  font-family: "Poppins", sans-serif;
  font-style: normal;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  @media (max-width: 419px) {
    background-color: ${(props) => (props.disabled ? "transparent" : "transparent")};
    border:1px solid #fff;
    width: 100%;
    font-size: 16px;
    :hover {
      background-color: #FBD002;
      color: #000;
      border: none;
      border-radius: inherit;
    }
  }
`;

const TermsAndConditionWrapper = styled.div.attrs({ className: "form-group" })`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 419px) {
      align-items: center;
      margin-bottom: 4% !important;
    .terms-of-service {
      color: #fff;
      font-family: sans-serif;
      margin-top: 8px;
    }
    span {
      font-size:11px;

      @media (max-width: 480px) {
        font-size: 10px;
        position: relative;
        top: -3px;
      }
    }
    @media (max-width: 386px) {
      top: 10px;
    }
  }
  strong {
    letter-spacing: 0.05em;
  }
  .break {
    display: none;
    @media (max-width: 386px) {
      display: block;
    }
  }
`;

const TermsAndConditionWrapperMobile = styled.div.attrs({ className: "form-group" })`
@media (max-width: 419px) {
  display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0px!important;
    .check-box{
   height: 22px;
    width: 21px;
    margin-right: 5%;
}
    } 
}
`;

const BottomTextWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  font-style: normal;
  line-height: 1.7rem;
  @media (max-width: 419px) {
    flex-direction: column;
    line-height: 1.3rem;
    .login-toggle {
    font-size: 1.06rem;
    color: #fff;
    letter-spacing: 0.05em;
    transition: all 0.5s;
    font-family:  sans-serif;
  }
    .text-center {
      color: #fff;
      font-family:  sans-serif;
      margin-top: 6%;
    }
  }
  .login-toggle {
    font-size: 1.03rem;
    text-decoration: underline;
    letter-spacing: 0.05em;
    transition: all 0.5s;
  }
  .login-toggle:hover {
    color: #000;
    transition: all 0.5s;
  }
`;
const StyledLogoWrapper = styled.div`
  display: none;
  @media (max-width: 419px) {
    display: flex;
  margin-bottom-2rem;
    padding: 0;
       justify-content: space-between;
    width: 100%;
    img {
      height:50px;
      margin-bottom-2rem;
    }
  }
`;
const FormGroupWrapperMobile = styled.div`
width:100%;

@media (max-width: 419px) {
  .form-control {
    display: block;
    height: 3rem;
    width: 100%;
    border-radius: inherit;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #000;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    // margin-bottom: 8%;
    font-size:HelveticaNeueMedium !important
    
}
.mobile-field{
  display: block;
    height: 3rem;
    width: 100%;
    border-radius: inherit;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #000;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    // margin-bottom: 8%;
}
label{
  display:none;
}
.mobile-field label{
  display:none;
}
.form-control::placeholder {
  color:#707070;
  opacity: 1;
   font-style: italic;
}
.terms-of-service{
  color:#fff
}
.terms-of-use{
  color:#fd100;
  font-family: sans-serif;
}

  
`;

export {
  FormWrapper,
  StyledWrapper,
  FormikSectionContainer,
  WelcomeContainer,
  FormikSection,
  TermsAndConditionWrapper,
  Button,
  BottomTextWrapper,
  StyledLogoWrapper,
  FormGroupWrapperMobile,
  TermsAndConditionWrapperMobile
};
