import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthenticationService } from '~features/authentication/services/authentication.service';
import { UserService } from '~features/authentication/services/user.service';
import { AlertService } from '~core/services/ui/alert.service';
import type { Pokemon } from '~features/pokemon/types/pokemon.types';
import { CropImageService } from '~features/pokemon/services/crop-image.service';
import { BattleEvent } from './enums/pokedex-action.enum';
import { PokedexComponent } from './pokedex.component';

describe('PokedexComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokedexComponent],
      providers: [
        { provide: AuthenticationService, useValue: { authState: () => ({ isLoggedIn: false }) } },
        { provide: UserService, useValue: {} },
        { provide: AlertService, useValue: {} },
        {
          provide: CropImageService,
          useValue: { getCroppedImageURL: vi.fn().mockResolvedValue('') },
        },
      ],
    });
  });

  it.each([
    { height: '7', weight: '69', expectedHeight: '0.7', expectedWeight: '6.9' },
    { height: '10', weight: '100', expectedHeight: '1', expectedWeight: '10' },
    { height: '1', weight: '1', expectedHeight: '0.1', expectedWeight: '0.1' },
  ])('should display $height dm and $weight hg in metres and kilograms', (measurements) => {
    const fixture = TestBed.createComponent(PokedexComponent);
    const pokemon: Pokemon = {
      id: 1,
      order: '1',
      name: 'bulbasaur',
      height: measurements.height,
      weight: measurements.weight,
      sprites: { front_default: 'bulbasaur.png', front_shiny: 'bulbasaur-shiny.png' },
    };
    fixture.componentRef.setInput('pokemon', pokemon);
    fixture.componentRef.setInput('pokemonBattleEvent', signal(BattleEvent.RESET_BATTLE));
    fixture.detectChanges();

    const paragraphs = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.pokedex__top-text-container p'),
      (paragraph) => paragraph.textContent.trim(),
    );
    expect(paragraphs).toContain(`Height: ${measurements.expectedHeight} m`);
    expect(paragraphs).toContain(`Weight: ${measurements.expectedWeight} kg`);
  });
});
