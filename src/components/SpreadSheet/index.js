import React, { Component } from 'react';
import { HotTable } from '@handsontable/react';
import { Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Papa from 'papaparse';

import 'handsontable/dist/handsontable.full.css';
import './index.scss';

export default class SpreadSheet extends Component {
  state = {
    csvfile: undefined
  };

  importFile = () => {
    const { csvfile } = this.state;
    if (!csvfile) return;
    Papa.parse(csvfile, {
      complete: this.updateData
    });
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  updateData = (result) => {
    this.props.fileUpdated(result.data);
  }

  render () {
    return (
      <div className='spreadsheet-container' style={{ width: 400, height: 400, overflow: 'auto' }}>
        <div className='spreadsheet-input py-2'>
          <Input
            type='file'
            name='file'
            accept='.csv'
            onChange={this.handleChange}
          >
          </Input>
          <Button onClick={this.importFile}>Upload file</Button>
        </div>
        <div>
          <HotTable
            id='hot'
            afterChange={this.props.dataUpdated}
            data={this.props.data}
            colHeaders={true}
            rowHeaders={true}
            licenseKey='non-commercial-and-evaluation'
          />
        </div>
      </div>
    );
  }
}
SpreadSheet.propTypes = {
  data: PropTypes.array,
  dataUpdated: PropTypes.func,
  fileUpdated: PropTypes.func
};
