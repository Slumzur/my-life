import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
    H6,
    BodyL,
    BodyM,
    ButtonS,
} from "***";
import locationArrow from "../img/location-arrow.svg";
import { ChoiceCityModal } from "./ChoiceCityModal/ChoiceCityModal";
import {RULE} from "../const";

export const DeterminationOfCity = ({ actualCity, productCities, onActualCityChange, className }) => {
    const [actualCityState, setActualCityState] = useState({ ...actualCity });
    const [isOpenInitialModal, setIsOpenInitialModal] = useState(true);
    const [isOpenMainModal, setIsOpenMainModal] = useState(false);
    const prevActualCityCodeRef = useRef(null);

    useEffect(() => {
        setActualCityState(actualCity);

        if (actualCity?.code) {
            if (prevActualCityCodeRef.current && actualCity.code !== prevActualCityCodeRef.current) {
                let params = new URLSearchParams(window.location.search);
                let uhash = params.get("uhash");
                
                if (uhash) {
                    (async () => {
                        try {
                            await fetch(`***`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    form: {
                                        delivery_place_name: actualCity.name,
                                        delivery_place_code: actualCity.code,
                                        visit_city_code: actualCity.code,
                                    },
                                    referrer: window.location.href,
                                }),
                            });
                        } catch (error) {}
                    })();
                }
            }

            prevActualCityCodeRef.current = actualCity.code;
        }
    }, [actualCity]);

    const handleInitialModal = () => {
        setIsOpenInitialModal((prevIsOpenInitialModal) => !prevIsOpenInitialModal);
    };

    const handleMainModal = () => {
        setIsOpenMainModal((prevIsOpenMainModal) => !prevIsOpenMainModal);
        setIsOpenInitialModal(false);
    };

    const handleClickCity = (city) => {
        setActualCityState({ ...city });
        onActualCityChange({ ...city });
        setIsOpenMainModal(false);
    };

    return (
        <Wrapper className={className}>
            <CityString onClick={handleMainModal}>
                <img src={locationArrow} alt="" />
                <BodyL>{actualCityState.name}</BodyL>
            </CityString>
            {isOpenInitialModal && (
                <PopupBlock>
                    <PopupHeader>
                        <BodyM>Ваш город </BodyM><H6>{actualCityState.name}?</H6>
                    </PopupHeader>
                    <ButtonsRow>
                        <Button1 onClick={handleInitialModal}>Да</Button1>
                        <Button2 onClick={handleMainModal}>Выбрать другой</Button2>
                    </ButtonsRow>
                </PopupBlock>
            )}
            {isOpenMainModal && (
                <ChoiceCityModal
                    actual={actualCityState}
                    closeModalCity={handleMainModal}
                    handleClickCity={handleClickCity}
                    arrayCity={productCities}
                />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
  position: relative;
`
const PopupBlock = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 302px;
  background: #FFFFFF;
  filter: drop-shadow(0px 0px 16px rgba(73, 79, 82, 0.16));
  border-radius: 8px;
  padding: 24px;
  z-index: 10;
  top: 40px;
  right: -8px;
  
  &:before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    top: -6px;
    right: 25px;
    background-color: #FFFFFF;
  }
`
const PopupHeader = styled.div`
  & > div {
    display: inline;
  }
`
const ButtonsRow = styled.div`
  margin-top: 24px;
`
const Button1 = styled.button`
  ${ButtonS};
  width: 72px;
  height: 40px;
  background-color: #CC163F;
  box-shadow: 0px 1px 8px rgba(99, 90, 82, 0.2);
  border-radius: 8px;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  outline-color: #595959;
  margin-right: 16px;
  
  &:hover {
    background-color: #A81235;
  }
`;
const Button2 = styled.button`
  ${ButtonS};
  height: 40px;
  background-color: #FFFFFF;
  border-radius: 8px;
  color: #CC163F;
  border: 1px solid #CC163F;
  cursor: pointer;
  padding: 8px 16px;
  outline-color: #595959;
  
  &:hover {
    background-color: #CC163F;
    color: #FFFFFF;
  }
  
  &:focus {
    border: none;
  }
`;
const CityString = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  & > img {
    height: 12px;
    margin-right: 8px;
  }
  & > div:last-child {
    color: #CC163F;
  }
`