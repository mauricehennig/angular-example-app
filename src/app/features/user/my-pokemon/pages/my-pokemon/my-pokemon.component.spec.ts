import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
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

  beforeEach(async () => {
    pokemons = new Subject<Pokemon[]>();

    await TestBed.configureTestingModule({
      imports: [MyPokemonComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: UserService, useValue: { getMe: () => of({ caughtPokemonIds: [1, 2, 3] }) } },
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
  });

  it('should keep the empty state without a count when no pokemon have been caught', async () => {
    pokemons.next([]);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.my-pokemon__count')).toBeNull();
    expect(element.querySelector('.pokemons-empty__container')).not.toBeNull();
    expect(element.querySelector('app-pokemon-card')).toBeNull();
  });
});
