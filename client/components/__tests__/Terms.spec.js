import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Terms } from '../Terms/Terms';

test('renders terms info correctly', t => {
  const wrapper = shallow(
    <Terms />
  );

  t.is(wrapper.find('p').length, 1);
  t.is(wrapper.find('h1').length, 1);
});
