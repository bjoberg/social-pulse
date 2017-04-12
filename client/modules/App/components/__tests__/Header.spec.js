import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Header } from '../Header/Header';
import { Link } from 'react-router';

test('renders header properly', t => {
  const wrapper = shallow(
    <Header />
  );

  // TODO: This test will change when conditional Header is implemented
  t.is(wrapper.find(Link).length, 7);
});
