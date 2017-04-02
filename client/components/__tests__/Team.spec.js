import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Team } from '../Team/Team';

test('renders team members information correctly', t => {
  const wrapper = shallow(
    <Team />
  );

  t.is(wrapper.find('p').length, 7);
  t.is(wrapper.find('h1').length, 1);
  t.is(wrapper.find('h2').length, 7);
  t.is(wrapper.find('hr').length, 6);
});
