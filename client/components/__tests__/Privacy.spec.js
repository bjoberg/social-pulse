import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Privacy } from '../Privacy/Privacy';

test('renders privacy properly', t => {
  const wrapper = shallow(
    <Privacy />
  );

  t.is(wrapper.find('p').length, 1);
  t.is(wrapper.find('h1').length, 1);
});