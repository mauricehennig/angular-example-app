import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Pokemon } from '~features/pokemon/types/pokemon.types';
import { PokemonCardComponent } from './pokemon-card.component';

describe('PokemonCardComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    });
  });

  it.each([
    { height: '7', weight: '69', expectedHeight: '0.7', expectedWeight: '6.9' },
    { height: '10', weight: '100', expectedHeight: '1', expectedWeight: '10' },
    { height: '1', weight: '1', expectedHeight: '0.1', expectedWeight: '0.1' },
  ])('should display $height dm and $weight hg in metres and kilograms', (measurements) => {
    const fixture = TestBed.createComponent(PokemonCardComponent);
    const pokemon: Pokemon = {
      id: 1,
      order: '1',
      name: 'bulbasaur',
      height: measurements.height,
      weight: measurements.weight,
      sprites: { front_default: 'bulbasaur.png', front_shiny: 'bulbasaur-shiny.png' },
    };
    fixture.componentRef.setInput('pokemon', pokemon);
    fixture.detectChanges();

    const paragraphs = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('p'),
      (paragraph) => paragraph.textContent.trim(),
    );
    expect(paragraphs).toContain(`Height: ${measurements.expectedHeight} m`);
    expect(paragraphs).toContain(`Weight: ${measurements.expectedWeight} kg`);
  });
});
