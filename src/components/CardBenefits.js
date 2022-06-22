import React from "react";
import styled from "styled-components";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  Body1,
  Body2,
  Link1,
  Link2,
  Link3,
  ToolTip,
} from "***";
import firstIcon from "../img/first-icon.svg";
import secondIcon from "../img/second-icon.svg";
import thirdIcon from "../img/third-icon.svg";
import forthIcon from "../img/forth-icon.svg";
import fifthIcon from "../img/fifth-icon.svg";
import sixthIcon from "../img/sixth-icon.svg";

export const CardBenefits = () => {
  return (
    <Wrapper>
      <Header>
        <H3>Преимущества карты</H3>
      </Header>
      <BenefitsBlock>
        <BenefitsRow>
          <BenefitsItem>
            <BenefitsLogo
              style={{ backgroundImage: `url(${firstIcon})` }}
            ></BenefitsLogo>
            <BenefitsText>
              <H5>Бесплатный </H5>
              <Body1>выпуск и&nbsp;обслуживание карты</Body1>
            </BenefitsText>
          </BenefitsItem>
          <BenefitsItem>
            <BenefitsLogo
              style={{ backgroundImage: `url(${secondIcon})` }}
            ></BenefitsLogo>
            <BenefitsText>
              <H5>Бесплатные переводы </H5>
              <Body1>на&nbsp;карты других банков</Body1>
            </BenefitsText>
          </BenefitsItem>
          <BenefitsItem>
            <BenefitsLogo
              style={{ backgroundImage: `url(${thirdIcon})` }}
            ></BenefitsLogo>
            <BenefitsText>
              <H5>Снятие без комиссии </H5>
              <Body1>в&nbsp;любых банкоматах</Body1>
            </BenefitsText>
          </BenefitsItem>
        </BenefitsRow>
        <BenefitsRow>
          <BenefitsItem>
            <BenefitsLogo
              style={{ backgroundImage: `url(${forthIcon})` }}
            ></BenefitsLogo>
            <BenefitsText>
              <div style={{ display: "flex", gap: 8 }}>
                <H5>5% кешбэк </H5>
                <ToolTip textPosition="diagonalRight" width={"180px"}>
                  Начисляется при подключении опции «Больше плюсов».
                </ToolTip>
              </div>
              <Body1>за&nbsp;интернет&#8209;покупки</Body1>
            </BenefitsText>
          </BenefitsItem>
          <BenefitsItem>
            <BenefitsLogo
              style={{ backgroundImage: `url(${fifthIcon})` }}
            ></BenefitsLogo>
            <BenefitsText>
              <H5>5% кешбэк </H5>
              <Body1>за&nbsp;оплату&nbsp;ЖКУ</Body1>
            </BenefitsText>
          </BenefitsItem>
          <BenefitsItem>
            <BenefitsLogo
              style={{ backgroundImage: `url(${sixthIcon})` }}
            ></BenefitsLogo>
            <BenefitsText>
              <div style={{ display: "flex", gap: 8 }}>
                <H5>1% кешбэк</H5>
                <ToolTip textPosition="diagonalRight" width={"180px"}>
                  Кроме покупок социально значимых товаров / услуг
                </ToolTip>
              </div>
              <Body1>
                за&nbsp;покупки&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Body1>
            </BenefitsText>
          </BenefitsItem>
        </BenefitsRow>
      </BenefitsBlock>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 80px 16px;
  flex: 0 0 auto;

  @media (min-width: 768px) {
    margin: 100px 40px;
  }

  @media (min-width: 1024px) {
    margin: 120px 40px;
  }

  @media (min-width: 1440px) {
    width: 1200px;
    margin: 120px auto;
  }
`;
const Header = styled.div`
  & > div {
    color: #262626;
  }
  margin-bottom: 32px;

  @media (min-width: 1440px) {
    margin-bottom: 40px;
  }
`;
const BenefitsBlock = styled.div`
  border: 1px solid #dadada;
  border-radius: 12px;
  & > div:last-child {
    & > div {
      margin-bottom: 0;
    }
    & > div:last-child {
      border-bottom: none;
    }
  }

  @media (min-width: 1024px) {
    border: none;

    & > div:last-child {
      & > div:last-child {
        border-bottom: 1px solid #dadada;
      }
    }
  }
`;
const BenefitsItem = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 16px 0;
  padding-bottom: 24px;
  border-bottom: 1px solid #dadada;

  @media (min-width: 768px) {
    padding-bottom: 16px;
    &:last-child {
      padding-bottom: 24px;
    }
  }

  @media (min-width: 1024px) {
    border: 1px solid #dadada;
    box-sizing: border-box;
    border-radius: 8px;
    margin: 0 24px 24px 0;
    padding: 24px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    width: calc(100% / 3);
  }
`;
const BenefitsLogo = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  margin-right: 16px;
`;
const BenefitsText = styled.div`
  max-width: 192px;
  & > div {
    display: inline;
    color: #262626;
  }
`;
const BenefitsRow = styled.div`
  @media (min-width: 1024px) {
    display: flex;
  }
`;
