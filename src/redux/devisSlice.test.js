import devisReducer, { addToDevis } from './devisSlice';
import { describe, it, expect, test } from "vitest";

describe('devisSlice', () => {
  const initialState = {
    items: [],
    total: 0,
  };

  test('should handle addToDevis', () => {
    const product = {
      id: '1',
      titre: 'Fenêtre',
      prix: 1000,
    };

    // Test adding a new product
    const nextState = devisReducer(initialState, addToDevis(product));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual({ ...product, quantity: 1 });
    expect(nextState.total).toEqual(1000);

    // Test adding the same product again (should increase quantity)
    const stateAfterSecondAdd = devisReducer(nextState, addToDevis(product));
    
    expect(stateAfterSecondAdd.items).toHaveLength(1);
    expect(stateAfterSecondAdd.items[0].quantity).toEqual(2);
    expect(stateAfterSecondAdd.total).toEqual(2000);
  });
});
