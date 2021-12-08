import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <About.js />.', () => {
  it('Teste se possui um h2 com o texto "About Pokédex".', () => {
    renderWithRouter(<About />);

    const elementH2 = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(elementH2).toBeInTheDocument();
  });

  it('Testa se possui dois parágrafos sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutText1 = screen.getByText(/This application/i);
    const aboutText2 = screen.getByText(/One can/i);

    expect(aboutText1).toBeInTheDocument();
    expect(aboutText2).toBeInTheDocument();
  });

  it('Testa se possui a imagem correta da Pokédex', () => {
    renderWithRouter(<About />);

    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
