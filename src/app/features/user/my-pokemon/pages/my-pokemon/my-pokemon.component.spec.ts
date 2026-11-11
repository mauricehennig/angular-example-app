import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of, Subject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserService } from '~features/authentication/services/user.service';
import { PokemonService } from '~features/pokemon/services/pokemon.service';
import type { Pokemon } from '~features/pokemon/types/pokemon.types';
import { AlertService } from '~core/services/ui/alert.service';
import { PokemonCardComponent } from '~features/user/my-pokemon/components/pokemon-card/pokemon-card.component';
import { PokemonSearchInputComponent } from '~shared/components/pokemon-search-input/pokemon-search-input.component';
import { MyPokemonComponent } from './my-pokemon.component';

describe('MyPokemonComponent', () => {
  let fixture: ComponentFixture<MyPokemonComponent>;
  let pokemons: Subject<Pokemon[]>;
  let caughtPokemonIds: number[];

  beforeEach(async () => {
    pokemons = new Subject<Pokemon[]>();
    caughtPokemonIds = [1, 2, 3];

    await TestBed.configureTestingModule({
      imports: [MyPokemonComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: UserService, useValue: { getMe: () => of({ caughtPokemonIds }) } },
        { provide: PokemonService, useValue: { getPokemonByIds: () => pokemons } },
        { provide: AlertService, useValue: { createErrorAlert: vi.fn() } },
      ],
    })
      .overrideComponent(MyPokemonComponent, {
        remove: { imports: [PokemonCardComponent, PokemonSearchInputComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MyPokemonComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  it.each([1, 3])('should show the caught count of %i above the cards', async (count) => {
    pokemons.next(
      Array.from({ length: count }, (_value, index) => ({
        id: index + 1,
        order: String(index + 1),
        name: 'pokemon',
        height: '1',
        weight: '1',
        sprites: { front_default: '', front_shiny: '' },
      })),
    );
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    const summary = element.querySelector('.my-pokemon__count');

    expect(summary?.textContent).toBe(`You have caught ${count} Pokémon`);
    expect(summary?.nextElementSibling?.classList.contains('my-pokemon__grid')).toBe(true);
    expect(element.querySelectorAll('app-pokemon-card')).toHaveLength(count);
    expect(element.querySelector('.pokemons-empty__container')).toBeNull();
    expect(element.querySelector('.pokemons-empty__link')).toBeNull();
  });

  it('should explain how to catch pokemon with a home link when none have been caught', async () => {
    caughtPokemonIds = [];
    fixture.destroy();
    fixture = TestBed.createComponent(MyPokemonComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    const emptyState = element.querySelector('.pokemons-empty__container');
    const link = emptyState?.querySelector('a');

    expect(element.querySelector('.my-pokemon__count')).toBeNull();
    expect(emptyState?.textContent).toContain('you haven’t caught any Pokémon yet!');
    expect(link?.textContent).toBe('Search and catch Pokémon on the home page');
    expect(link?.getAttribute('href')).toBe('/');
    expect(element.querySelector('app-pokemon-card')).toBeNull();
  });
});
