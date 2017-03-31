import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Status } from '../Status/Status';

test('renders status properly', t => {
  const wrapper = shallow(
    <Status />
  );

  t.is(wrapper.find('p').length, 1);
  t.is(wrapper.find('h1').length, 1);
});