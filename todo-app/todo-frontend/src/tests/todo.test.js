import { Todo } from '../Todos/List'
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const todo = {
  text: 'this is a test todo',
  done: 'false'
}


test('todo displays correctly', () => {

  const onClickDelete = jest.fn();
  const onClickComplete = jest.fn();

  render(
    <Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />
  )

  const text = screen.getByTestId('todo-text')

  expect(text).toHaveTextContent('this is a test todo')
})