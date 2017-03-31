import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { Contact } from '../Contact/Contact';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

test('renders contact properly', t => {
  const wrapper = shallow(
    <Contact />
  );

  t.is(wrapper.find('h1').length, 1);
  t.is(wrapper.find(Paper).length, 1);
  t.is(wrapper.find(Divider).length, 4);
  t.is(wrapper.find(TextField).length, 4);
  t.is(wrapper.find(RaisedButton).length, 1);
});
