import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { About } from '../About/About';

test('renders about properly', t => {
  const wrapper = shallow(
    <About />
  );

  t.is(wrapper.find('p').length, 2);
  t.is(wrapper.find('h1').length, 1);
});
