import React, {Component} from 'react';
import {Modal, Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';
import {getAttr, getObservation} from '../helpers.js';
import {translate} from 'react-i18next';
import ObservationStatus from './ObservationStatus';
import * as unitHelpers from '../helpers';

const ModalHeader = ({handleClick, unit, t}) => {
  const iconURL = unit ? unitHelpers.getUnitIconURL(unit) : null;

  return(
    <Modal.Header>
      <div>
        <div className="modal-header-name">
          <div>
            <h4>{unit ? getAttr(unit.name) : t('MODAL.LOADING')}</h4>
          </div>
          <div style={{alignSelf: 'center'}}>
            <Link to="/"><Glyphicon onClick={handleClick} glyph="remove"/></Link>
          </div>
        </div>
        {unit
          ? <div className="modal-header-description">
              <img src={iconURL} alt=""/>
              <div>
                <p>{unit.services[0] === 33418 ?
                    'Luistelurata'
                  :  unit.services[0] === 33417 ?
                    'Hiihtolatu'
                  :  null
                  }
                </p>
                <p>{getAttr(unit.street_address) + ', ' + unit.address_zip}</p>
              </div>
            </div>
          : null
        }
      </div>
    </Modal.Header>
  );
};


const LocationState = ({observation, updated, t}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.QUALITY')}</div>
    <ObservationStatus observation={observation}/>
  </div>;

const LocationInfo = ({t}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.INFO')}</div>
    Such info
  </div>;

const LocationWeather = ({t}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.WEATHER')}</div>
    Wow such weather.
  </div>;

const LocationHeightProfile = ({t}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.HEIGHT_PROFILE')}</div>
    Wow such profile.
  </div>;

export class SingleUnitModalContainer extends Component {

  constructor(props) {
    super(props);
    this.getCurrentUnit = this.getCurrentUnit.bind(this);
  }

  getCurrentUnit(units, currentUnitId) {
    return units.filter((unit) => unit.id == currentUnitId)[0];
  }

  render(){
    const {units, handleClick, params, t} = this.props;
    const currentUnit = units ? this.getCurrentUnit(units, params.unitId) : null;
    const unitObservation = currentUnit ? getObservation(currentUnit) : null;

    return (
      <div>
        <Modal className="single-unit-modal" show={this.props.isOpen} backdrop={false}>
          <ModalHeader unit={currentUnit} handleClick={handleClick} t={t}/>
          {currentUnit ?
            <Modal.Body>
              <LocationState observation={unitObservation} t={t}/>
              <LocationInfo t={t}/>
              <LocationWeather t={t}/>
              <LocationHeightProfile t={t}/>
            </Modal.Body>
            : null
          }
        </Modal>
      </div>
    );
  }
}

export default translate()(SingleUnitModalContainer);
