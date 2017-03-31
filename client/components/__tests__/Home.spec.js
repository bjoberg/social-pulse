import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Home } from '../Home/Home';

test('renders the footer properly', t => {
  const wrapper = shallow(
    <Home />
  );

  t.is(wrapper.find('p').length, 2);
  t.is(wrapper.find('h1').length, 1);
});
