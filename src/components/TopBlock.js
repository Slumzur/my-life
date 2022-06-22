import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {H1, H3, Body1,TitleBody, Button, ToolTip} from "***";
import { DeterminationOfCity } from "./DeterminationOfCity";
import myLifeBanner1440 from "../img/my-life-banner-img-1440.png";
import myLifeBanner1024 from "../img/my-life-banner-1024.png";
import myLifeBanner1440Virality from "../img/my-life-new-banner-1440_Virality.png";
import myLifeBanner1024Virality from "../img/my-life-new-banner-1024_Virality.png";
import logoUbrrMobile from "../img/logo-ubrr-mobile.svg";
import logoUbrrDesc from "../img/logo-ubrr-desc.svg";
import boxIcon from "../img/box-icon.svg";
import dashLine from "../img/dashed-line.svg";
import { focusNumberField } from "./App";
import {constantsApi} from "../../../../constantApi";

export const TopBlock = ({ actualCity, productCities, onActualCityChange ,ldg}) => {
  const api = constantsApi('calculator-myLife', '***');
  const [ header, setHeader ] = useState('');
  const [ description, setDescription ] = useState('');

  useEffect(()=>{
    if (ldg !== '') {
      api.getTag('calculator-myLife').then((value)=>{
        try{
          if (ldg === 'virality') {
            setHeader(value['myLife-head_virality'])
            setDescription(value['myLife-desc_virality'])
          }
          if (ldg === 'getblogger') {
            setHeader(value['myLife-head_getblogger'])
            setDescription(value['myLife-desc_getblogger'])
          }
          if (ldg === 'cpahub') {
            setHeader(value['myLife-head_cpahub'])
            setDescription(value['myLife-desc_cpahub'])
          }
        }
        catch (e) {}
      });
    }
  }, [ldg]);

  const chooseHeader = () => {
    if (ldg === "virality" || ldg === "getblogger" || ldg === 'cpahub') return <H1>{header}</H1>;
    return <><H1>Дебетовая карта «My&nbsp;life»</H1> <p><H3>Одна карта — много кешбэков</H3></p></>
  }

  const parseConstText = () => {
    if (description) {
      if (description.indexOf('<br>') !== -1) {
        let liElementsArr = description.split('<br>')
        return (
            <CustomUL>
              {liElementsArr.map((item, i) => {
                return <li key={i}>{item}</li>
              })}
            </CustomUL>
        )
      }
    }
    return description
  }

  return (
    <Background>
      <Wrapper ldg={ldg}>
        <LogoCityWrapper>
          <Logo href="https://www.ubrr.ru/" target="_blank" />
          <StyledDeterminationOfCity
            actualCity={actualCity}
            productCities={productCities}
            onActualCityChange={onActualCityChange}
          />
        </LogoCityWrapper>
        <Header>
          {chooseHeader()}
        </Header>
        <BenefitsBlock>
          {(ldg ==="virality" || ldg ==="getblogger" || ldg === 'cpahub') && <TitleBody>{parseConstText()}</TitleBody>}
          {ldg !=="virality" && ldg !== "getblogger" && ldg !== 'cpahub' && (<><BenefitsItem>
            {/*<Dot />*/}
            {/*<ItemTextM>*/}
            {/*  <Body1>До 15% кешбэк за аптеки, супермаркеты и АЗС</Body1>*/}
            {/*</ItemTextM>*/}
            {/*<ItemTextT>*/}
            {/*  <Body1>До 15% кешбэк за аптеки, супермаркеты и АЗС</Body1>*/}
            {/*</ItemTextT>*/}
            <ItemText>
              <H3>500 &#x20bd;</H3>
              <Body1>за мобильную связь</Body1>
            </ItemText>
            <DashLine />
          </BenefitsItem>
          <BenefitsItem>
            <Dot />
            <ItemTextM>
                <Body1>500 &#x20bd; за мобильную связь</Body1>
            </ItemTextM>
            <ItemTextT>
              <ToolTipBox>
                <Body1>500 &#x20bd;<br/>за&nbsp;мобильную связь&nbsp;&nbsp;
                </Body1>
              </ToolTipBox>
            </ItemTextT>
            <ItemTextT>
              <ToolTipBox>
                <Body1>5% кешбэк за ЖКУ и&nbsp;онлайн&#8209;покупки&nbsp;&nbsp;
                  <ToolTip textPosition="bottom" width={"250px"}>Кешбек 5% за онлайн-покупки начисляется при подключении опции «Больше плюсов». Смотри Подробные условия по карте</ToolTip>
                </Body1>
              </ToolTipBox>
            </ItemTextT>
            <ItemText>
              <H3>5%</H3>
              <ToolTipBox>
                <Body1 style={{width: '145px'}}>кешбэк за ЖКУ&nbsp;и онлайн&#8209;покупки</Body1>
                <ToolTip textPosition="bottom" width={"250px"}>Кешбек 5% за онлайн-покупки начисляется при подключении опции «Больше плюсов».</ToolTip>
              </ToolTipBox>
            </ItemText>
            <DashLine />
          </BenefitsItem>
          <BenefitsItemM>
            <Dot />
            <ItemTextM>
              <ToolTipBox>
                <Body1>5% кешбэк за ЖКУ и онлайн-покупки</Body1>
                <ToolTip textPosition="diagonalRight" width={"250px"}>Кешбек 5% за онлайн-покупки начисляется при подключении опции «Больше плюсов».</ToolTip>
              </ToolTipBox>
            </ItemTextM>
          </BenefitsItemM>
          <BenefitsItem>
            <Dot />
            <ItemTextM>
              <ToolTipBox>
                <Body1>1% кешбэк за прочие покупки</Body1>
                <ToolTip textPosition="diagonalRight" width={"250px"}>
                  Кроме покупок социально значимых товаров / услуг
                </ToolTip>
              </ToolTipBox>
            </ItemTextM>
            <ItemTextT>
              <ToolTipBox>
                  <Body1>1% кешбэк за прочие покупки</Body1>
                  <ToolTip textPosition="bottom" width={"250px"}>
                    Кроме покупок социально значимых товаров / услуг
                  </ToolTip>
              </ToolTipBox>
            </ItemTextT>
            <ItemText>
              <H3>1%</H3>
              <ToolTipBox>
                <Body1 style={{ width: "135px" }}>кешбэк за прочие покупки</Body1>
                <ToolTip textPosition="bottom" width={"250px"}>
                  Кроме покупок социально значимых товаров / услуг
                </ToolTip>
              </ToolTipBox>
            </ItemText>
          </BenefitsItem></>)
          }
        </BenefitsBlock>
        <ButtonWrapper>
          <Button
            view={"ruby"}
            text={"Отправить заявку"}
            handleClick={focusNumberField}
          />
        </ButtonWrapper>
        <Promise>
          <BoxIcon />
          <Body1>Бесплатно доставим карту до дома уже на следующий день</Body1>
        </Promise>
        <BottomLine />
      </Wrapper>
    </Background>
  );
};

const CustomUL = styled.ul`
  margin: 0;
  padding-left: 20px;
`;
const LogoCityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    margin: 0 0 32px;
  }

  @media (min-width: 1024px) {
    justify-content: flex-start;
    margin: 0 0 40px;
  }
`;
const StyledDeterminationOfCity = styled(DeterminationOfCity)`
  @media (min-width: 1024px) {
    margin-left: 45px;
  }
`;
const Promise = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f4f4;
  margin: 32px 0 0px;
  padding: 8px;
  border-radius: 8px;

  & > div:last-child {
    color: #595959;
  }

  @media (min-width: 768px) {
    margin-top: 32px;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;
const BottomLine = styled.div`
  height: 1px;
  background-color: #dadada;
  margin: 32px -16px 0;

  @media (min-width: 768px) {
    margin: 48px -40px 0;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;
const Background = styled.div`
  flex: 0 0 auto;
  @media (min-width: 1024px) {
    background-color: #f5f4f4;
  }
`;
const Wrapper = styled.div`
  margin: 20px 16px 0;

  @media (min-width: 768px) {
    margin: 48px 40px 0;
  }

  @media (min-width: 1024px) {
    padding: ${props=>(props.ldg==="virality" || props.ldg==="getblogger" || props.ldg==="cpahub") ? '64px 40px 35px' : '15px 40px 35px'};
    margin: 0;
    max-width: 1500px;
    background-image: ${props=>(props.ldg==="virality" || props.ldg==="getblogger"  || props.ldg==="cpahub") ? `url(${myLifeBanner1024Virality})` : `url(${myLifeBanner1024})`};
    background-repeat: no-repeat;
    background-position: ${props=>(props.ldg==="virality" || props.ldg==="getblogger"  || props.ldg==="cpahub") ? 'right 0 center' : '-180px center'};
  }

  //TODO: Очень странный блок, надо бы переверстать

  @media (min-width: 1440px) {
    background-image: ${props=>(props.ldg==="virality" || props.ldg==="getblogger"  || props.ldg==="cpahub") ? `url(${myLifeBanner1440Virality})` : `url(${myLifeBanner1440})`};
    background-position: center right;
    max-width: 1200px;
    margin: 0 auto;
    padding: ${props=>(props.ldg==="virality" || props.ldg==="getblogger"  || props.ldg==="cpahub") ? '64px 0 40px' : '40px 0'};
  }
`;
const Logo = styled.a`
  display: block;
  background-image: url(${logoUbrrMobile});
  background-repeat: no-repeat;
  width: 93px;
  height: 20px;
  text-decoration: none;

  @media (min-width: 768px) {
    width: 152px;
    height: 32px;
    background-size: contain;
  }

  @media (min-width: 1024px) {
    background-image: url(${logoUbrrDesc});
    width: 236px;
    height: 42px;
  }
`;
const Header = styled.div`
  & > div {
    color: #3c3c44;
  }
  margin-bottom: 24px;

  @media (min-width: 768px) {
    width: 690px;
    margin-bottom: 32px;
  }

  @media (min-width: 1024px) {
    & > div {
      color: #262626;
    }
  }
`;
const BenefitsBlock = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const BenefitsItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  white-space: break-spaces;
  @media (min-width: 768px) {
    margin: 0 23px 0 0;
    &:last-child {
      margin-right: 0;
    }
  }

  @media (min-width: 1024px) {
    margin-right: 64px;
    margin-bottom: 0;
    position: relative;
    align-items: baseline;
  }
`;
const BenefitsItemM = styled(BenefitsItem)`
  @media (min-width: 768px) {
    display: none;
  }
`;
const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #cc163f;
  margin-right: 8px;
  flex-shrink: 0;

  @media (min-width: 1024px) {
    display: none;
  }
`;
const ItemText = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;

    & > div:first-child {
      margin-bottom: 4px;
    }

    & > div:last-child {
      color: #595959;
    }
  }
`;
const ItemTextM = styled.div`
  & > div {
    color: #3c3c44;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
const ItemTextT = styled(ItemTextM)`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;
const DashLine = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: absolute;
    background-image: url(${dashLine});
    background-repeat: no-repeat;
    background-position: center;
    width: 2px;
    height: 80px;
    left: calc(100% + 32px);
    top: 6px;
  }
`;
export const BoxIcon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${boxIcon});
  margin-right: 8px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    margin-right: 12px;
  }

  @media (min-width: 768px) {
    background-size: contain;
    width: 48px;
    height: 48px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;

  & > button {
    box-sizing: border-box;
    background-color: #cc163f;
    border-radius: 8px;
    margin-top: 24px;
    width: 100%;
    color: #ffffff;

    &:hover {
      cursor: pointer;
      background-color: #a81235;
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const ToolTipBox = styled.div`
  display: flex; 
  align-items: flex-end;
  & > div {
    color: #3c3c44;
  }
  & > div:first-child {
    margin-right: 8px;
  }
  
  @media (min-width: 1024px) {
    & > div {
      color: #595959;
    }
    
    & > div:first-child {
      margin-right: 0;
    }
  }
`;