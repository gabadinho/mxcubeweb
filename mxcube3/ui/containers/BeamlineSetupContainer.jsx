import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import LabelPopInput from '../components/PopInput/LabelPopInput';
import BeamlineActions from './BeamlineActionsContainer';
import InOutSwitch2 from '../components/InOutSwitch2/InOutSwitch2';
import LabeledValue from '../components/LabeledValue/LabeledValue';
import MachInfo from '../components/MachInfo/MachInfo';

import { sendGetAllAttributes,
         sendSetAttribute,
         sendAbortCurrentAction } from '../actions/beamline';


class BeamlineSetupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSaveHandler = this.onSaveHandler.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this.onCancelHandler = this.onCancelHandler.bind(this);
    this.createActuatorComponent = this.createActuatorComponent.bind(this);
  }


  componentDidMount() {
    this.props.getAllAttributes();
  }


  onSaveHandler(name, value) {
    this.props.setAttribute(name, value);
  }


  onCancelHandler(name) {
    this.props.abortCurrentAction(name);
  }


  setAttribute(name, value) {
    this.props.setAttribute(name, value);
  }


  createActuatorComponent() {
    const acts = [];
    for (let key in this.props.data.attributes) {
      if (this.props.data.attributes[key].type === 'DUOSTATE') {
        acts.push(<Col key={key} sm={1}>
                    <InOutSwitch2
                      onText={ this.props.data.attributes[key].commands[0] }
                      offText={ this.props.data.attributes[key].commands[1] }
                      labelText={ this.props.data.attributes[key].label }
                      pkey={ key }
                      data={ this.props.data.attributes[key] }
                      onSave={ this.setAttribute }
                    />
                  </Col>
              );
      }
    }
    return acts;
  }

  render() {
    return (
      <Row style={{
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        background: '#FAFAFA',
        borderBottom: '1px solid rgb(180,180,180)' }}
      >
        <Col sm={12}>
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col sm={1}>
              <BeamlineActions actionsList={this.props.data.beamlineActionsList} />
            </Col>
            {this.createActuatorComponent()}
            <Col sm={1} style={{ paddingRight: '0px', marginLeft: '2em' }}>
              <LabelPopInput
                name="Energy"
                pkey="energy"
                suffix="keV"
                data={ this.props.data.attributes.energy }
                onSave= { this.setAttribute }
                onCancel= { this.onCancelHandler }
              />
            </Col>
            <Col sm={1} style={{ paddingLeft: '0px', marginLeft: '-2em' }}>
              <LabelPopInput
                name="Wavelength"
                pkey="wavelength"
                placement="left"
                suffix="&Aring;"
                data={this.props.data.attributes.wavelength}
                onSave={this.setAttribute}
                onCancel={this.onCancelHandler}
              />
            </Col>
            <Col sm={1} style={{ paddingRight: '0px', marginLeft: '2em' }}>
              <LabelPopInput
                name="Resolution"
                pkey="resolution"
                suffix="&Aring;"
                data={this.props.data.attributes.resolution}
                onSave={this.setAttribute}
                onCancel={this.onCancelHandler}
              />
            </Col>
            <Col sm={1} style={{ paddingLeft: '0px', marginLeft: '-2em' }}>
              <LabelPopInput
                name="Detector"
                pkey="detdist"
                suffix="mm"
                data={this.props.data.attributes.detdist}
                onSave={this.setAttribute}
                onCancel={this.onCancelHandler}
              />
            </Col>
            <Col sm={1} style={{ paddingRight: '0px', marginLeft: '2em' }}>
              <LabelPopInput
                name="Transmission"
                pkey="transmission"
                suffix="%"
                data={this.props.data.attributes.transmission}
                onSave={this.setAttribute}
                onCancel={this.onCancelHandler}
              />
            </Col>
            <Col sm={1} style={{ paddingLeft: '0px', marginLeft: '-2em' }}>
              <LabeledValue
                name="Flux"
                value={this.props.data.attributes.flux.value}
              />
            </Col>
            <Col sm={1}>
              <LabelPopInput
                name="Cryo"
                pkey="cryo"
                suffix="K"
                data={this.props.data.cryo}
                onSave={this.setAttribute}
                onCancel={this.onCancelHandler}
              />
            </Col>
            <Col sm={1}>
              <MachInfo
                info={this.props.data.attributes.machinfo.value}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}


function mapStateToProps(state) {
  return {
    data: state.beamline
  };
}


function mapDispatchToProps(dispatch) {
  return {
    getAllAttributes: bindActionCreators(sendGetAllAttributes, dispatch),
    setAttribute: bindActionCreators(sendSetAttribute, dispatch),
    abortCurrentAction: bindActionCreators(sendAbortCurrentAction, dispatch)
  };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BeamlineSetupContainer);
