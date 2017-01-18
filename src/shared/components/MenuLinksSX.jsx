import React from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';

// components
import { Link } from 'react-router';

// stules
const a = cx('db', 'ph3', 'pv3', 'fw4');
const listBlock = cx('list', 'pl0', 'ml0');
const listInline = cx('list', 'pa0', 'mv0');
const liBlock = cx('db');
const liInline = cx('dib');

export default observer(({ inline }) => (
  <ul className={inline ? listInline : listBlock}>
    <li className={inline ? liInline : liBlock}><Link className={a} to="/" >Home</Link></li>
    <li className={inline ? liInline : liBlock}><Link className={a} to="/messages">Messages Demo</Link></li>
    <li className={inline ? liInline : liBlock}><Link className={a} to="/packages">Packages</Link></li>
  </ul>
));
