import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Testa se é exibido o texto "No favorite pokemon found."', () => {
    renderWithRouter(<FavoritePokemons />);

    const notPokemon = screen.getByText('No favorite pokemon found');
    expect(notPokemon).toBeInTheDocument();
  });

  it('Testa se são exibido todos os cards favoritados.', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favorite);

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
