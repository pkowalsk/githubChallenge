import React from 'react';
import { render } from 'react-dom';
import Repos from './repos';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/rc-pagination/assets/index.css';

render(
  <Repos />,
  document.getElementById('app')
);
