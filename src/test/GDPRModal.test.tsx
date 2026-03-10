import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import GDPRModal from '../components/GDPRModal';

describe('GDPRModal', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the GDPR modal when no consent is given', () => {
    render(<GDPRModal />);
    expect(screen.getByText('gdpr.title')).toBeInTheDocument();
    expect(screen.getByText('gdpr.message')).toBeInTheDocument();
    expect(screen.getByText('gdpr.dismiss')).toBeInTheDocument();
  });

  it('does not render the GDPR modal when consent is already given', () => {
    localStorage.setItem('gdpr-consent', 'true');
    render(<GDPRModal />);
    expect(screen.queryByText('gdpr.title')).not.toBeInTheDocument();
  });

  it('dismisses the modal and sets localStorage when the button is clicked', () => {
    render(<GDPRModal />);
    const dismissButton = screen.getByText('gdpr.dismiss');
    
    fireEvent.click(dismissButton);
    
    expect(screen.queryByText('gdpr.title')).not.toBeInTheDocument();
    expect(localStorage.getItem('gdpr-consent')).toBe('true');
  });
});
