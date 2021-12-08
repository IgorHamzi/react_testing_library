import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Pokemons from '../data';

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se possui um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Testa se o próximo Pokémon é mostrado quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(button);
    expect(button).toBeInTheDocument();

    const pokemon = screen.getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemonList = screen.getAllByTestId('pokemon-name');

    expect(pokemonList.length).toBe(1);
  });

  it('Testa se a Pokédex possui os botões de filtro.', () => {
    renderWithRouter(<App />);
    const buttonsTotal = 7;

    const allButtons = screen.getByRole('button', { name: 'All' });
    expect(allButtons).toBeInTheDocument();

    const pokemonsButtons = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonsButtons.length).toBe(buttonsTotal);

    Pokemons.forEach(({ type }) => {
      const buttonType = screen.getByRole('button', { name: `${type}` });
      expect(buttonType).toBeInTheDocument();
    });
  });

  it('Testa se a Pokédex possui o botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButtons = screen.getByRole('button', { name: 'All' });
    expect(allButtons).toBeInTheDocument();

    userEvent.click(allButtons);

    const example = screen.getByText(/pikachu/i);
    expect(example).toBeInTheDocument();
  });
});
