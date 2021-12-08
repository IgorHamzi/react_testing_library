import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <NotFound.js />', () => {
  it('Testa se possui um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Testa se mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
