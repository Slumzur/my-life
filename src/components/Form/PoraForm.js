import React from "react";
import styled from "styled-components";
import {
    FormSales,
    MobileField,
    AgreeField,
    Button,
    StepSales,
    NameField,
    EmailField,
    DateField,
    Delivery,
    SingleAddress,
    StringField,
    PassportField,
    SmsButton,
    HiddenField,
    ActionsWithUhash,
    AutocompleteESIA
} from "***";
import {
    Button as SButton,
    Pagination,
    H3,
    H4,
    Body1,
} from "***";
import {BoxIcon} from "../TopBlock";
import dashedLine from "../../img/dashed-line-long.svg";
import {RULE} from "../../const";

export class PoraForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCityDelivery: {
                name: this.props.actualCity.name || null,
                code: this.props.actualCity.code || null,
            },
            selectedDate: {
                value: '',
                fullFormatValue: '',
            },
            selectedTime: '',
            timeSlotId: '',
            agree: true,
            phoneNumber: "",
            fio: "",
            birthDate: "",
            email: "",
            passSeries: '',
            passNumber: '',
            passDate: '',
            passInstituteCode: '',
            passInstituteName: '',
            passBirthPlace: '',
            registrationCity: '',
            registrationCityId: '',
            registrationStreet: '',
            registrationPlaceName: '',
            registrationHomeIndex: '',
            registrationHomeNumber: '',
            registrationHomeBuilding: '',
            registrationApartment: '',
            callRequest: false,
            step: this.hasEsiaLoadParam() ? '2' : '1',
            esiaResult: false,
            esiaError: false,
            errorArray: {
                office_sap_id: "",
                city_name: "",
                delivery_time: "",
                delivery_date: "",
            },
        }
        this.form = React.createRef();
        this.ActionsWithUhash = new ActionsWithUhash();
    }

    hasEsiaLoadParam = () => {
        let esiaLoadParam = window.location.search.match(new RegExp('esiaLoad=([^&=]+)'));
        return !!esiaLoadParam;
    }

    componentDidMount() {
        if (!this.hasEsiaLoadParam()) {
            this.ActionsWithUhash.deleteUhash();
            this.form.current.state.form.uhash = '';
        }
    }
    
    componentDidUpdate(prevProps) {
        if ((this.props.actualCity?.name && this.props.actualCity.name !== prevProps.actualCity.name)
          && (this.props.actualCity?.code && this.props.actualCity.code !== prevProps.actualCity.code)
          && this.state.step < 3) {
            this.setState({
                selectedCityDelivery: {
                    name: this.props.actualCity.name,
                    code: this.props.actualCity.code,
                },
            });
        }
    }

    getHash = () => {
        return (
            new URL(window.location.href).searchParams.get("uhash") ||
            this.form.current.state.form.uhash
        );
    }

    getMobile = () => {
        return this.state.phoneNumber;
    }

    setMobile = (value) => {
        this.setState({
            phoneNumber: value,
        });
    }

    setAgree = (value) => {
        this.setState({
            agree: value,
        });
    }

    scenario = (step, form, errors) => {
        if (errors) {
            if (('delivery_date' || 'delivery_time') in errors) {
                this.setState({
                    errorArray: {
                        delivery_time: errors?.delivery_time,
                        delivery_date: errors?.delivery_date,
                    },
                })
            }
            if ('isDouble' in errors) {
                window.location = '/newSiteAssets/react/my-life-double/build/index.html';
            }
            if (errors.nextStep) {
                return errors.nextStep;
            }
            return;
        }

        if (step.alias === '1') {
            try {
                ga('send', 'event', 'form', 'send', 'mylifestep1');
                ym(50422966, 'reachGoal', 'my-life-send-step1');
            } catch (e) {};
        } else if (step.alias === '2') {
            try {
                ga('send', 'event', 'form', 'send', 'mylifestep2');
                ym(50422966, 'reachGoal', 'my-life-send-step2');
            } catch (e) {};
        }

        const nexts = {
            1: 2,
            2: 3,
        }

        if (3 == step.alias) {
            window.location = '/newSiteAssets/react/my-life-thanks/build/index.html?thanks=' + this.getHash();
        }
        if (!(step.alias in nexts)) {
            return;
        }

        this.setState({ step: Number(step.alias) })

        return nexts[step.alias];
    }
    
    setDeliveryValues = (value) => {
        this.setState({
            selectedCityDelivery: value.actualCity,
            selectedDate: { value: value.selectedDay || '', fullFormatValue: value.fullFormatValue },
            selectedTime: value.selectTime,
            timeSlotId: value.timeSlotId,
        })
    }

    getValuePassport = (value) => {
        this.setState({
            passSeries: value.passport_ser,
            passNumber: value.passport_num,
            passDate: value.passport_date,
            passInstituteCode: value.passport_department_code,
            passInstituteName: value.passport_kemv,
        });
    }

    getLDG=()=>{
        return new URL(window.location.href).searchParams.get("ldg") || "s1"
    }

    handleBack = (event, step) => {
        event.preventDefault();
        this.form.current.scenario("1", {
            nextStep: step
        });
        setTimeout(() => {
            document.getElementById('2-step-header-scroll').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 0);
    };

    handleCallRequest = () => {
        this.setState({
            callRequest: !this.state.callRequest,
        });
    };

    steps = [
        "Телефон",
        "Личные данные",
        "Доставка",
    ];

    disclaimerText = () => {
        return (
            <div>
                <p>Я даю свое согласие ПАО КБ «УБРиР» в соответствии с Федеральным законом РФ от 27.07.2006 N 152-ФЗ «О
                    персональных данных» на обработку моих персональных данных, в том числе: Ф.И.О.; дата и место
                    рождения; паспортные данные, сведения о занятости, трудовой деятельности (в том числе сведения о
                    трудовом стаже, доходах и расходах), семейное положение, образование, профессия; фотографическое
                    изображение; сведения из кредитной истории, сведения о счетах и картах, о размере задолженности
                    перед кредиторами, иная, ранее предоставленная Банку информация; сведения о номерах телефонов, об
                    адресах электронной почты, данные о созданном на сайте Банка или мобильном приложении аккаунте
                    (учетной записи); метаданные, данные cookie-файлов, cookie-идентификаторы, IP-адреса; сведения,
                    полученные от третьих лиц, в том числе государственных органов, государственных информационных
                    систем, единой системы идентификации и аутентификации (ЕСИА), Пенсионного фонда Российской
                    Федерации, в том числе через систему межведомственного электронного взаимодействия (СМЭВ), и/или из
                    сети Интернет, и/или из иных общедоступных источников персональных данных и любую иную информацию,
                    представленную Банку.</p>
                <p>Обработка персональных данных может осуществляться с использованием средств автоматизации или без
                    таковых, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление,
                    изменение), извлечение, использование, передачу (предоставление, доступ), обезличивание,
                    блокирование, удаление персональных данных, в том числе в информационных системах Банка, и
                    совершение иных действий, предусмотренных Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных
                    данных».</p>
                <ul>
                    Целями обработки персональных данных является:
                    <li>проверка достоверности указанных мною сведений;</li>
                    <li>получение моих персональных данных из иных разрешенных источников;</li>
                    <li>проверка и оценка платежеспособности и кредитоспособности Заявителя, получение результатов такой
                        оценки, скорингового балла (индивидуального рейтинга) и других показателей благонадежности при
                        рассмотрении Банком возможности заключения с Заявителем любых договоров и соглашений;
                    </li>
                    <li>подбор и предоставление Банком услуг;</li>
                    <li>предоставление мне информации о результатах рассмотрения Банком Заявления;</li>
                    <li>создание информационных систем данных, анализ, моделирование, прогнозирование, построение
                        математических (скоринг) моделей, анализ агрегированных и анонимных данных, статистические и
                        исследовательские цели;
                    </li>
                    <li>хранение данных Банком и третьими лицами;</li>
                    <li>заключение с Банком и третьими лицами договоров и соглашений;</li>
                    <li>продвижение продуктов и услуг Банка и/или третьих лиц, в том числе передача информационных и
                        рекламных сообщений об услугах Банка и/или третьих лиц путем осуществления прямых контактов с
                        помощью средств связи и иным способом.
                    </li>
                </ul>
                <p>Я выражаю согласие на получение рекламы, предоставление информации и предложения продуктов Банка
                    путем направления на указанный адрес электронной почты, телефонных обращений, SMS-сообщений на
                    телефонные номера, по сети подвижной радиотелефонной связи и иным способом».</p>
                <p> Я выражаю согласие на обработку персональных данных третьими лицами, с которыми у ПАО КБ «УБРиР»
                    заключено соглашение, содержащее условие об обработке персональных данных в объеме, необходимом для
                    исполнения соглашения, а также условие о конфиденциальности и неразглашении информации.</p>
                <p>Указанное согласие действует в течение трех календарных месяцев с момента предоставления данных и
                    может быть отозвано мною путем подачи письменного заявления в Банк.</p>
                <br/>
                <a href="https://www.ubrr.ru/politika-konfidencialnosti-i-informirovaniya" target="_blank">Политика
                    конфиденциальности и информирования﻿</a>
            </div>
        );
    };

    getEsiaState = (data) => {
        let resp = data.esiaData;
        if (resp) {
            let registrationCity = resp.address_info.elements.find((item) => item.type === "PRG")?.city;
            if (registrationCity[0] === 'г') {
                registrationCity = registrationCity.slice(2)
            }

            let registrationStreet = resp.address_info.elements.find((item) => item.type === "PRG")?.street;
            if (registrationStreet.slice(0, 2) === 'ул') {
                registrationStreet = registrationStreet.slice(3)
            }
            this.setState({
                esiaResult: data.esiaResult,
                fio: `${resp.person_info.lastName} ${resp.person_info.firstName} ${resp.person_info.middleName}`,
                birthDate: resp.person_info.birthDate,
                email: resp.contact_info.elements.find((item) => item.type === 'EML')?.value,
                passSeries: resp.document_info.elements.find((item) => item.type === "RF_PASSPORT")?.series,
                passNumber: resp.document_info.elements.find((item) => item.type === "RF_PASSPORT")?.number,
                passDate: resp.document_info.elements.find((item) => item.type === "RF_PASSPORT")?.issueDate,
                passInstituteCode: resp.document_info.elements.find((item) => item.type === "RF_PASSPORT")?.issueId,
                passInstituteName: resp.document_info.elements.find((item) => item.type === "RF_PASSPORT")?.issuedBy,
                passBirthPlace: resp.person_info.birthPlace,
                registrationCity: registrationCity,
                registrationStreet: registrationStreet ||
                    resp.address_info.elements.find((item) => item.type === "PRG")?.settlement,
                registrationPlaceName: resp.address_info.elements.find((item) => item.type === "PRG")?.settlement,
                registrationHomeIndex: resp.address_info.elements.find((item) => item.type === "PRG")?.zipCode,
                registrationHomeNumber: resp.address_info.elements.find((item) => item.type === "PRG")?.house,
                registrationHomeBuilding: resp.address_info.elements.find((item) => item.type === "PRG")?.frame ||
                    resp.address_info.elements.find((item) => item.type === "PRG")?.building,
                registrationApartment: resp.address_info.elements.find((item) => item.type === "PRG")?.flat,
                registrationPlaceCode: '',
            });
        } else {
            this.setState({
                esiaError: data.esiaError,
            });
        }
    }

    render() {
        return (
            <div className={"form"} style={{flex: '0 0 auto'}}>
                <FormSales
                    ref={this.form}
                    theme={"sales"}
                    rule={RULE}
                    ldg={this.getLDG()}
                    currentStep={this.state.step}
                    apiHost={__API_HOST__}
                    scenario={this.scenario}
                >
                    <StepSales
                        alias={"1"}
                        firstStep={"mobile"}
                        timerTime={300}
                    >
                        <StepWrapper>
                            <Pagination steps={this.steps} currentStep={1} className={'pagination'} lastCircle={true}/>
                            <ContentWrapper>
                                <FirstStepHeader><H3>Заполните заявку и оформите карту за 10 минут</H3></FirstStepHeader>
                                <Promise>
                                    <BoxIcon />
                                    <Body1>Бесплатно доставим карту до дома уже на следующий день</Body1>
                                </Promise>
                                <MobileField
                                    alias={"mobile"}
                                    nextField={"start-button"}
                                    focusId={"mobile"}
                                    setValue={this.setMobile}
                                />
                                <DashedLine/>
                                <div className="first-step-wrapper">
                                    <AgreeField
                                        alias={"full_agree"}
                                        value={this.state.agree}
                                        setValue={this.setAgree}
                                        className="agree-field"
                                        disclaimerText={this.disclaimerText()}
                                    />
                                    <SmsButton
                                        value="Далее"
                                        focusId={"start-button"}
                                        getHash={this.getHash}
                                        getMobile={this.getMobile}
                                    />
                                </div>
                            </ContentWrapper>
                        </StepWrapper>
                    </StepSales>
                    <StepSales
                        alias={"2"}
                        timerTime={300}
                    >
                        <StepWrapper>
                            <Pagination steps={this.steps} currentStep={2} className={'pagination'} lastCircle={true}/>
                            <ContentWrapper>
                                <StepHeader><H3 id='2-step-header-scroll'>Личные данные</H3></StepHeader>
                                <AutocompleteESIA
                                    getEsiaState={this.getEsiaState}
                                />
                                <NameField
                                    alias={"full_name"}
                                    focusId={"full_name"}
                                    nextField={"birth_date"}
                                    placeholder={"Фамилия Имя Отчество"}
                                    value={this.state.fio}
                                />
                                <input name={"has_full_name"} type={"hidden"} value={"1"}/>
                                <SplitRowWrapperBlock>
                                    <DateField alias={"birth_date"} nextField={"email"} focusId={"birth_date"} value={this.state.birthDate}/>
                                    <EmailField alias={"email"} focusId={"email"} value={this.state.email}/>
                                </SplitRowWrapperBlock>
                                <HiddenField alias={"esia_auth"} value={this.state.esiaResult}/>
                                <ESIASuccessBlock esiaResult={this.state.esiaResult}>
                                    <PassportField
                                        alias={"passport"}
                                        focusId={"passport"}
                                        label={"Паспортные данные"}
                                        classNameDate={'passport-date-third-step'}
                                        classNameInstName={'passport-inst-name-third-step'}
                                        labelType="small"
                                        getValue={this.getValuePassport}
                                        passSeries={this.state.passSeries}
                                        passNumber={this.state.passNumber}
                                        passDate={this.state.passDate}
                                        passInstituteCode={this.state.passInstituteCode}
                                        passInstituteName={this.state.passInstituteName}
                                    />
                                    <StringField
                                        name={'birth-place'}
                                        alias={"passport_birthplace"}
                                        label={"Место рождения"}
                                        focusId={"passport_birthplace"}
                                        labelType="small"
                                        className={'birth-place-third-step'}
                                        value={this.state.passBirthPlace}
                                    />
                                    <SingleAddress
                                        id={'3_register'}
                                        alias={"register"}
                                        label={"Адрес регистрации"}
                                        nextField={"data-button"}
                                        className={'registration-address'}
                                        chooseFirstSuggestionOnBlur={true}
                                        cityName={'city_name'}
                                        streetName={'street_name'}
                                        homeNumber={'home_number'}
                                        homeApartment={'home_apartment'}
                                        value={{
                                            register_city_name: this.state.registrationCity,
                                            register_street_name: this.state.registrationStreet,
                                            register_place_name: this.state.registrationPlaceName,
                                            register_home_index: this.state.registrationHomeIndex,
                                            register_home_number: this.state.registrationHomeNumber,
                                            register_home_building: this.state.registrationHomeBuilding,
                                            register_home_apartment: this.state.registrationApartment,
                                            register_place_code: this.state.registrationPlaceCode,
                                        }}
                                    />
                                </ESIASuccessBlock>
                                <DashedLine/>
                                <SubmitButtonsBlock>
                                    <Button
                                        id={'second-step-submit'}
                                        value="Далее"
                                        focusId={"data-button"}
                                    />
                                </SubmitButtonsBlock>
                            </ContentWrapper>
                        </StepWrapper>
                    </StepSales>
                    <StepSales
                        alias={"3"}
                        timerTime={300}
                    >
                        <StepWrapper>
                            <Pagination steps={this.steps} currentStep={3} className={'pagination'} lastCircle={true}/>
                            <ContentWrapper>
                                <StepHeader><H3>Доставка карты</H3></StepHeader>
                                <div>
                                    <DeliveryAddressTitle><H4>Укажите адрес места доставки</H4></DeliveryAddressTitle>
                                    <Delivery
                                      alias="delivery"
                                      label={'Улица, дом, корпус, квартира'}
                                      getValues={this.setDeliveryValues}
                                      actualCity={this.state.selectedCityDelivery}
                                      isOldApi
                                      time_delivery_error={this.form.current?.state?.form?.fields?.delivery_time?.error}
                                      date_delivery_error={this.form.current?.state?.form?.fields?.delivery_date?.error}
                                    />
                                    <HiddenField alias={"delivery_date"} value={this.state.selectedDate.value} />
                                    <HiddenField alias={"delivery_time"} value={this.state.selectedTime} />
                                    <HiddenField alias={"delivery_time_slot_id"} value={this.state.timeSlotId} />
                                    <ESIASuccessBlock esiaResult={!this.state.esiaResult}>
                                        <PassportField
                                            alias={"passport"}
                                            focusId={"passport"}
                                            label={"Паспортные данные"}
                                            classNameDate={'passport-date-third-step'}
                                            classNameInstName={'passport-inst-name-third-step'}
                                            labelType="small"
                                            getValue={this.getValuePassport}
                                            passSeries={this.state.passSeries}
                                            passNumber={this.state.passNumber}
                                            passDate={this.state.passDate}
                                            passInstituteCode={this.state.passInstituteCode}
                                            passInstituteName={this.state.passInstituteName}
                                        />
                                        <StringField
                                            name={'birth-place'}
                                            alias={"passport_birthplace"}
                                            label={"Место рождения"}
                                            focusId={"passport_birthplace"}
                                            labelType="small"
                                            className={'birth-place-third-step'}
                                            value={this.state.passBirthPlace}
                                        />
                                        <SingleAddress
                                            id={'3_register'}
                                            alias={"register"}
                                            label={"Адрес регистрации"}
                                            nextField={"data-button"}
                                            className={'registration-address'}
                                            chooseFirstSuggestionOnBlur={true}
                                            cityName={'city_name'}
                                            streetName={'street_name'}
                                            homeNumber={'home_number'}
                                            homeApartment={'home_apartment'}
                                            value={{
                                                register_city_name: this.state.registrationCity,
                                                register_street_name: this.state.registrationStreet,
                                                register_place_name: this.state.registrationPlaceName,
                                                register_home_index: this.state.registrationHomeIndex,
                                                register_home_number: this.state.registrationHomeNumber,
                                                register_home_building: this.state.registrationHomeBuilding,
                                                register_home_apartment: this.state.registrationApartment,
                                                register_place_code: this.state.registrationPlaceCode,
                                            }}
                                        />
                                    </ESIASuccessBlock>
                                </div>
                                <HiddenField alias={"need_call_for_agreement"} value={this.state.callRequest ? '1' : '0'}/>
                                <DashedLine/>
                                <SubmitButtonsBlock>
                                    <Button
                                        id={'third-step-submit-btn'}
                                        value="Отправить заявку"
                                        focusId={"data-button"}
                                    />
                                    <SButton
                                        handleClick={(event) => this.handleBack(event, "2")}
                                        text="Назад"
                                        view={'outline'}
                                        className={'get-back-button'}
                                    />
                                </SubmitButtonsBlock>
                            </ContentWrapper>
                        </StepWrapper>
                    </StepSales>
                </FormSales>
            </div>
        );
    }
}

const DashedLine = styled.div`
  width: 100%;
  height: 2px;
  background-image: url(${dashedLine});
  background-repeat: no-repeat;
  background-position: center;
  margin: 32px 0 24px;
  
  @media (min-width: 768px) {
    margin-top: 40px;
  }
`
const Promise = styled.div`
  display: none;
  align-items: center;
  background-color: #F5F4F4;
  margin: 16px 0 28px;
  padding: 8px;
  border-radius: 8px;
  
  @media (min-width: 1024px) {
    display: flex;
    margin: 40px 0;
    padding: 20px;
    font-size: 16px;
    line-height: 24px;
  }
`;
const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
const ContentWrapper = styled.div`
  flex-shrink: 0;
  max-width: 690px;
  order: 2;
  
  @media (min-width: 1024px) {
    order: 1;
    margin-right: 105px;
    width: 620px;
  }
  
  @media (min-width: 1440px) {
    margin-right: 126px;
    width: 690px;
  }
`;
const FirstStepHeader = styled.div`
  display: none;
  
  @media (min-width: 1024px) {
    display: flex;
  }
`;
const DeliveryAddressTitle = styled.div`
  margin: 16px 0;

  & > div {
    color: #3C3C44;
  }

  @media (min-width: 768px) {
    margin: 32px 0 24px;
  }

  @media (min-width: 1024px) {
    margin: 40px 0 34px;
  }
`;
const StepHeader = styled.div`
  margin-bottom: 32px;
  
  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;
const SplitRowWrapperBlock = styled.div`
  margin-top: 16px;
  margin-bottom: 32px;
  
  @media (min-width: 768px) {
    display: flex;
    margin-top: 24px;
    
    & > div {
      width: 50%;
      margin-bottom: 0;
    }
    
    & > div:first-child {
      margin-right: 24px;
    }
  }
  
  @media (min-width: 1024px) {
    margin-bottom: 40px;
  }
`;
const SubmitButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  
  & > button:first-child {
    margin-bottom: 16px;
    border: none;
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    
    & > button:first-child {
      margin-bottom: 0;
    }
    
    & > button:last-child {
      width: 152px;
    }
  }
  
  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

const ESIASuccessBlock = styled.div`
  display: ${(props) => props.esiaResult ? 'block' : 'none'};
`