import React from 'react';
import { Parser } from 'json2csv';

const data = [
  { 
    "name": "column_int",
    "type": "Integer",
    "values": [10, 2, 3, 4, 5, 6, 7, 8],
  },
  { 
    "name": "column_float",
    "type": "Float",
    "values": [1.2, 1.2, 1.4, 4.2, 3.2, 1.1, 1.2, 1.2],
  },
  { 
    "name": "column_timedelta",
    "type": "Timedelta",
    "values": [900.0, 90000.0, 1800.0, 900.0, 90000.0, 86400.0, 10.0, 86400.0],
  },
  { 
    "name": "column_datetime",
    "type": "Datetime",
    "values": ["2017-01-26", "2017-02-26", "2017-01-27", "2017-02-27", "2017-01-26", "2017-11-26", "2019-01-26", "2017-01-26"],
  },
  { 
    "name": "column_object",
    "type": "Object",
    "values": ["a", "b", "c", "a", "a", "b", "aba", "aaba"],
  },
  { 
    "name": "column_boolean",
    "type": "Boolean",
    "values": [true, false, true, true, false, false, true, false],
  },
  { 
    "name": "column_categorical",
    "type": "Categorical",
    "values": ["in_work", "verified", "on_check", "in_work", "verified", "in_work", "verified", "in_work"],
  },
];

const DownloadCSV = () => {
  const json2csvParser = new Parser({ header: true });
  const csv = json2csvParser.parse(data);

  const handleDownload = () => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload}>Download CSV</button>
  );
};

export default DownloadCSV;
