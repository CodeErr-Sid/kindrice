import React from 'react';
import './Table.css';

const Table = () => {
  return (
    <div className="table-container">
      <h2 className="table-title">Why Kind Rice?</h2>
      <table className="kind-rice-table">
        <thead className='title-head'>
          <tr>
            <th className="aspect-header">Aspect</th>
            <th className="kind-header">Kind Low-GI rice <br />(55 or below)</th>
            <th className="normal-header">Normal rice <br />(70 and above)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border-right'>Energy Release</td>
            <td className='color-unique'>Slow and steady</td>
            <td>Fast burst</td>
          </tr>
          <tr>
          <td className='border-right'>Feeling After Eating</td>
            <td className='color-unique'>Stay full longer</td>
            <td>Get hungry soon</td>
          </tr>
          <tr>
          <td className='border-right'>Blood Sugar Impact</td>
            <td className='color-unique'>Rises gradually</td>
            <td>Spikes quickly</td>
          </tr>
          <tr>
          <td className='border-right'>Best Suited For</td>
            <td className='color-unique'>Blood sugar, weight management</td>
            <td>Quick energy needs</td>
          </tr>
          <tr>
          <td className='border-right'>Fiber Content</td>
            <td className='color-unique'>High fiber</td>
            <td>Less fiber</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
