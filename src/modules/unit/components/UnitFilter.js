import React from 'react';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import {translate} from 'react-i18next';
import {getFilterIconURL} from '../helpers';
import {UnitFilters} from '../constants';


const FilterIcon = ({filter, active}) => {
  if (filter !== UnitFilters.OPEN_NOW) {
    return (
      <img src={getFilterIconURL(filter, active)}/>
    );
  } else {
    return (
      <Glyphicon className={active ? 'active' : 'inactive'} glyph="filter"/>
    );
  }
};

const UnitFilter = translate()(({active, all, toggleFilter, t}) =>
  <Grid className="unit-filter" fluid={true}>
    <Row>
      {all && all.map((filter, index) =>
        <Col key={index} xs={6}>
        <div className={`unit-filter__filter ${active.indexOf(filter) !== -1 ? 'active' : ''}`}
          onClick={() => toggleFilter(filter)}>
          <span className="unit-filter__filter-icon"><FilterIcon filter={filter} active={active.indexOf(filter) !== -1} /></span>
          <span className="unit-filter__filter-name">{t('UNIT.FILTER.' + filter.toUpperCase())}</span>
        </div>
        </Col>
      )}
    </Row>
  </Grid>);

export default UnitFilter;
