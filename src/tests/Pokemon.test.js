import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações do determinado pokémon.', () => {
    const pokemons = Pokemons[0];
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons;

    renderWithRouter(<Pokemon pokemon={ pokemons } isFavorite={ false } />);

    const Name = screen.getByTestId('pokemon-name');
    expect(Name.textContent).toBe(name);

    const Type = screen.getByTestId('pokemon-type');
    expect(Type.textContent).toBe(type);

    const Weight = screen.getByTestId('pokemon-weight');
    expect(Weight.textContent)
      .toBe(`Average weight: ${value} ${measurementUnit}`);

    const Image = screen.getByRole('img', { name: `${name} sprite` });
    expect(Image).toHaveAttribute('src', image);
  });

  it('Teste se o card na Pokédex contém um link para exibir detalhes do Pokémon.', () => {
    const pokemons = Pokemons[0];
    const { id } = pokemons;

    renderWithRouter(<Pokemon pokemon={ pokemons } isFavorite={ false } />);

    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Teste se clicado no link, é redirecionado para a página de detalhes.', () => {
    const pokemons = Pokemons[0];
    const { id } = pokemons;

    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemons } isFavorite={ false } />,
    );

    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(link);

    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se existe o ícone de estrela nos Pokémons favoritados.', () => {
    const pokemons = Pokemons[0];
    const { name } = pokemons;

    renderWithRouter(<Pokemon pokemon={ pokemons } isFavorite />);

    const favorite = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
