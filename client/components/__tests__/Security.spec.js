import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Security } from '../Security/Security';

test('renders security properly', t => {
  const wrapper = shallow(
    <Security />
  );

  t.is(wrapper.find('p').length, 1);
  t.is(wrapper.find('h1').length, 1);
});