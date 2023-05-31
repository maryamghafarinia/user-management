import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { UserItem } from 'components/User';
import users from 'data/users.json';

describe('User Item', () => {
  const user = users[0]
  const handleOnClickUpdate = jest.fn();
  const handleOnClickDelete = jest.fn();

  beforeEach(() => {
    render(<UserItem
      user={user}
      onUpdate={handleOnClickUpdate}
      onDelete={handleOnClickDelete}
    />)
  })

  afterEach(cleanup);

  test('should render avatar image', () => {
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toBeInTheDocument();
  })

  test('should render user name', () => {
    const nameElement = screen.getByText(`${user.name} ${user.lastName}`);
    expect(nameElement).toBeInTheDocument();
  })

  test('should render email address', () => {
    const emailElement = screen.getByText(user.email);
    expect(emailElement).toBeInTheDocument();
  })

  test('should render age', () => {
    const ageElement = screen.getByText(user.age);
    expect(ageElement).toBeInTheDocument();
  })

  test('should render phone number', () => {
    const phoneElement = screen.getByText(user.phoneNumber);
    expect(phoneElement).toBeInTheDocument();
  })

  test('should render website link', () => {
    const siteLink = screen.getByText(/Website/i);
    expect(siteLink).toBeInTheDocument();
    expect(siteLink).toHaveAttribute('href', user.linkToWebsite);
    expect(siteLink).toHaveAttribute('target', '_blank');
  })

  test('should trigger events on clicking action icons', () => {
    const editIcon = screen.getByTestId('edit-icon');
    const trashIcon = screen.getByTestId('delete-icon');

    fireEvent.click(editIcon);
    fireEvent.click(trashIcon);
    expect(handleOnClickUpdate).toHaveBeenCalledTimes(1);
    expect(handleOnClickDelete).toHaveBeenCalledTimes(1);
  })
})

describe('User Item/Website Link', () => {
  test('should not have anchor when website link is empty', () => {
    const user = users[0]
    user.linkToWebsite = "";
    const handleOnClickUpdate = jest.fn();
    const handleOnClickDelete = jest.fn();

    render(<UserItem
      user={user}
      onUpdate={() => { }}
      onDelete={() => { }}
    />)

    const linkTd = screen.getByText(/no website link/i);
    expect(linkTd).toBeInTheDocument();
  })
})