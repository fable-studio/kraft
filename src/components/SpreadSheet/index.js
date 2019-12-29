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
    const newData = Array.from(this.props.data);

    while (newData.length < 50) {
      newData.push([]);
    }
    while (newData[0].length < 10) {
      newData[0].push('');
    }
    return (
      <div className='spreadsheet-container my-3' style={{ _width: 400, _height: 400, _overflow: 'auto' }}>
        <div className='spreadsheet-input py-2 d-flex flex-row justify-content-between'>
          <div className='d-inline-block'>
            <Input
              type='file'
              name='file'
              accept='.csv'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Button className='upload-button ml-1' onClick={this.importFile}>Upload</Button>
          </div>
        </div>
        <div className='w-100 mb-3' style={{ border: '1px solid grey', height: 275, overflow: 'auto' }}>
          <HotTable
            id='hot'
            afterChange={this.props.dataUpdated}
            data={newData}
            dropdownMenu={true}
            colHeaders={true}
            rowHeaders={true}
            licenseKey='non-commercial-and-evaluation'
          />
          {/* <div className='h-100'>
          </div> */}
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
