import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <App.js />', () => {
  it('Testa se no topo da aplicação possui um conjunto fixo de links', () => {
    renderWithRouter(<App />);

    const testLinkA = screen.getByRole('link', { name: 'Home' });
    const testLinkB = screen.getByRole('link', { name: 'About' });
    const testLinkC = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(testLinkA).toBeInTheDocument();
    expect(testLinkB).toBeInTheDocument();
    expect(testLinkC).toBeInTheDocument();
  });

  it('Testa se é redirecionado para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const testLinkA = screen.getByRole('link', { name: 'Home' });
    userEvent.click(testLinkA);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se é redirecionado para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const testLinkB = screen.getByRole('link', { name: 'About' });
    userEvent.click(testLinkB);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se é redirecionado para a página de Pokémons Favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const testLinkC = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(testLinkC);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se é redirecionado para a página de Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina-não-encontrada');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
