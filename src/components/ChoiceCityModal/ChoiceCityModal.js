import React, {useState} from "react";
import CityList from "../CityList/CityList";
import styled from "styled-components";
import locationArrow from "../../img/location-arrow.svg";
import searchIcon from "../../img/search-icon.svg";
import closeIcon from "../../img/close.svg";

export const ChoiceCityModal = ({
                                    closeModalCity,
                                    handleClickCity,
                                    actual,
                                    searchFilter,
                                    arrayCity,
                                }) => {
    const [state, setState] = useState({searchFilter: ""});
    let data
    const searchInput = (e) => {
        setState({...state, searchFilter: e.target.value});
    };

    // Фильтрация массива
    const qFilter = (array, filter) => {
        try {
            let arr = array.filter(function (item) {
                if (item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                    return item;
                }
                return false;
            });
            return arr

        } catch (error) {
        }

    };

    const filteredCities = qFilter(arrayCity, state.searchFilter);

    return (
        <Modal>
            <ModalBackground>
                <ModalWrapper>
                    <ModalTitle>
                        <TitleHeader>Ваше местоположение</TitleHeader>
                        <TitleCityBox>
                            <TitleIcon />
                            <TitleCity>{actual.name}</TitleCity>
                        </TitleCityBox>
                    </ModalTitle>
                    <ModalSearch>
                        <ModalInput
                            type="text"
                            value={searchFilter}
                            onChange={searchInput}
                            spellCheck="false"
                            placeholder="Поиск"
                        />
                    </ModalSearch>
                    <ModalClose onClick={closeModalCity}/>
                    {filteredCities.length === 0 ? (
                        <>
                            <NoFoundBlock>
                                <NoFoundHeader>Не найдено</NoFoundHeader>
                                <NoFoundDisclaimer>
                                    К сожалению, оформление заявки в выбранном городе не доступно.<br />Выберите ближайший город из списка
                                </NoFoundDisclaimer>
                            </NoFoundBlock>
                            <CityList
                                handleClickCity={handleClickCity}
                                data={arrayCity}
                            />
                        </>
                    ) : (
                        <CityList
                            handleClickCity={handleClickCity}
                            data={filteredCities}
                        />
                    )}
                </ModalWrapper>
            </ModalBackground>
        </Modal>
    );
};

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
`;
const ModalBackground = styled.div`
  background-color: #0000007F;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;
const ModalWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  padding: 72px 16px;
  position: relative;
  
  @media (min-width: 768px) {
    padding: 56px 40px;    
  }
  
  @media (min-width: 1024px) {
    width: 768px;    
    box-shadow: 0px 4px 6px rgba(73, 79, 82, 0.1);
    border-radius: 16px;
    padding: 56px 48px; 
    margin: 56px 0;
  }
  
  @media (min-width: 1440px) {
    width: 984px; 
  }
`;
const ModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 24px;
  
  @media (min-width: 768px) {
    margin-bottom: 32px;
  }
`;
const TitleHeader = styled.div`
  color: #262626;
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 7px;
  
  @media (min-width: 768px) {
    font-size: 26px;
    line-height: 34px;  
  }
`;
const TitleCityBox = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
`;
const TitleIcon = styled.div`
  width: 16px;
  height: 16px;
  background-image: url(${locationArrow});
  margin-right: 8px;
`;
const TitleCity = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #595959;
  
  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 26px;  
  }
`;
const ModalSearch = styled.div`
  position: relative;
  margin-bottom: 24px;
  &:before {
    content: "";
    position: absolute;
    top: 16px;
    left: 16px;
    width: 16px;
    height: 16px;
    background-image: url(${searchIcon});
    background-position: center;
    background-size: contain;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 32px;
    
    &:before {
      width: 24px;
      height: 24px;
    }
  }
`;
const ModalInput = styled.input`
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  height: auto;
  padding: 12px 40px;
  border-radius: 8px;
  border: 1px solid #8C8C8C;
  outline: none;
  background: #fff;
  font-size: 14px;
  line-height: 22px;
  
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;  
    padding: 16px 48px;
  }
`;
const ModalClose = styled.div`
  background-image: url(${closeIcon});
  background-position: center;
  width: 32px;
  height: 32px;
  position: absolute;
  cursor: pointer;
  top: 16px;
  right: 10px;
`;
const NoFoundBlock = styled.div`
  margin-bottom: 40px;
  font-size: 14px;
  line-height: 22px;
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;
const NoFoundHeader = styled.div`
  color: #8C8C8C;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    margin-bottom: 32px;
  }
`;
const NoFoundDisclaimer = styled.div`
  color: #595959;
  background-color: #FAF8D2;
  border-radius: 8px;
  padding: 24px;
`;