import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Footer } from '../Footer/Footer';
import { Link } from 'react-router';

test('renders footer properly', t => {
  const wrapper = shallow(
    <Footer />
  );

  t.is(wrapper.find(Link).length, 8);
});
