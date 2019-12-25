import React, { Component } from 'react';
import { HotTable } from '@handsontable/react';
import { Input } from 'reactstrap';
import Handsontable from 'handsontable'; 

import 'handsontable/dist/handsontable.full.css';
import './index.scss';

export default class SpreadSheet extends Component {
  handsOnTableData = Handsontable.helper.createSpreadsheetData(6, 10);
  render () {
    
    return (
      <div className='spreadsheet-container' style={{ width: 400, height: 400, overflow: 'auto'}}>
        <div className='spreadsheet-input py-2'>
          <Input type='file' name='file'></Input>
        </div>
        <div>
          <HotTable
            id='hot'
            data={this.handsOnTableData}
            colHeaders={true}
            rowHeaders={true}
            licenseKey='non-commercial-and-evaluation'
          />
        </div>
      </div>      
    )
  }
}