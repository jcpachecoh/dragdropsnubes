import React from 'react';
import {DropComponent} from './components/DropComponent';
import renderer from 'react-test-renderer';


test('DropComponent render fine without problem', () => {
  // Render a checkbox with label in the document
  const component = renderer.create(
    <DropComponent trainId={1} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});