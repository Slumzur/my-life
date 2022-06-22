import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {TopBlock} from "./TopBlock";
import {CardBenefits} from "./CardBenefits";
import {PoraForm} from "./Form/PoraForm";
import {ComfortCalculator} from "***/calculator-comfort-card/dist";
import {
    Button,
    Footer,
    Body1
} from "***";
import {MirSVG} from "./MirSVG";

export const focusNumberField = () => {
    const elem = document.getElementById('1_mobile');
    elem.scrollIntoView({block: "center", inline: "center", behavior: "smooth"});
    elem.focus();
};

export const App = () => {
    const [productCities, setProductCities] = useState( []);
    const [actualCity, setActualCity] = useState( {});
    const [ldg, setLdg] = useState("");

    useEffect(() => {
        const geoIP = () => {
            fetch("***")
                .then((response) => response.json())
                .then((data) => {
                    if (!data) {
                        return;
                    }
                    setActualCity(data);
                });
        };
        const getCityArray = () => {
            fetch(
                "***"
            )
                .then((response) => response.json())
                .then((result) => { setProductCities(result.sort((a, b) => a.name.localeCompare(b.name, "ru"))) });
        };

        geoIP();
        getCityArray();
        const urlParams = new URLSearchParams(window.location.search);
        setLdg(urlParams.get("ldg"))
    }, []);

    return (
        <Page>
            <TopBlock actualCity={actualCity} productCities={productCities} onActualCityChange={setActualCity} ldg={ldg}/>
            <InfoBlock>
                <ImgBlock><MirSVG/></ImgBlock>
                <Body1>После обработки заявки вам будет доставлена карта «My&nbsp;Life» платёжной системы МИР.<br/>
                    Если вы хотите заказать карту «My&nbsp;Life» другой платёжной системы, пожалуйста, обратитесь по&nbsp;телефону горячей линии <strong>8&nbsp;(800)&nbsp;1000&#8209;200</strong></Body1>
            </InfoBlock>
            <PoraForm actualCity={actualCity} productCities={productCities} />
            <CardBenefits />
            <CalcWrapper>
                <ComfortCalculator />
                <ButtonWrapper>
                    <Button view={"ruby"} text={'Отправить заявку'} handleClick={focusNumberField} />
                </ButtonWrapper>
                <DetailedConditions href={ldg ==="virality" ? "/fileManager/seefile?file_alias=my_life_bringafriend" : (ldg ==="getblogger" || ldg ==="cpahub" ? "/fileManager/seefile?file_alias=my_life_getblogger" : "/fileManager/seefile?file_alias=my_life")} target="_blank">
                    <Body1>Подробные  условия по карте</Body1>
                </DetailedConditions>
            </CalcWrapper>
            <FooterWrapper>
                <Footer />
            </FooterWrapper>
        </Page>
    );
};

const ImgBlock=styled.div`
    width:100px;
  height: 30px;
  margin-right: 40px;
`

const InfoBlock=styled.div`
  box-sizing: border-box;
  background: #F5F4F4;
  border-radius: 8px;
  display: flex;
  align-items: center;
  //margin:80px auto;
  padding:24px;
  margin: 80px 16px 0;
  max-width: 1200px;
  flex: 0 0 auto;
  @media (min-width: 320px) {
    margin: 24px 16px 0;
    flex-direction: column;
    align-items: start;
    div {
      margin-top: 10px;
    }
  }
  @media (min-width: 768px) {
    margin: 80px 40px 0;
    align-items: center;

    flex-direction: row;

  }

  @media (min-width: 1024px) {
    margin: 80px 40px 0;
  }

  @media (min-width: 1440px) {
    width: 1200px;
    margin: 80px auto 0;
  }
`

const Page = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    height: 100%;
`;
const CalcWrapper = styled.div`
  margin: 0 16px;
  flex: 0 0 auto;
  
  @media (min-width: 768px) {
    margin: 0 40px;
  }
  
  @media (min-width: 1440px) {
    width: 1200px;
    margin: 0 auto;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  
  & > button {
    box-sizing: border-box;
    background-color: #CC163F;
    border-radius: 8px;
    margin-top: 24px;
    width: 100%;
    color: #FFFFFF;
    
    &:hover {
      cursor: pointer;
      background-color: #A81235;
    }
  }
  
  @media (min-width: 768px) {
    justify-content: flex-end;
  
    & > button {
      width: 263px;
    }
  }
`;
const FooterWrapper = styled.div`
  flex: 0 0 auto;
  & > div {
    margin: 24px 16px 0;
  }
  
  @media (min-width: 768px) {
      & > div {
        margin: 24px 40px 0;
        max-width: 1200px;
      }
  }
  
  @media (min-width: 1024px) {
    & > div {
      margin: 24px 40px 0;
    }
  }
  
  @media (min-width: 1440px) {
    & > div {
      width: 1200px;
      margin: 24px auto 0;
    }
  }
`
const DetailedConditions = styled.a`
  display: flex;
  text-decoration: none;
  justify-content: center;
  margin-top: 24px;
  
  & > div {
    color: #CC163F;
  }
  
  @media (min-width: 768px) {
    margin-top: 80px;
    justify-content: flex-start;
  }
`