import { describe, it, expect } from 'vitest';
import devisReducer, {
  addToDevis,
  removeFromDevis,
  increaseQty,
  decreaseQty,
  clearDevis
} from './devisSlice';

describe('devisSlice reducer', () => {
  const initialState = {
    items: [],
    total: 0
  };

  it('should handle initial state', () => {
    expect(devisReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addToDevis', () => {
    const product = { id: '1', titre: 'Product 1', prix: 100 };
    const actual = devisReducer(initialState, addToDevis(product));
    
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual({ ...product, quantity: 1 });
    expect(actual.total).toBe(100);
  });

  it('should handle addToDevis existing item', () => {
    const product = { id: '1', titre: 'Product 1', prix: 100 };
    const stateWithItem = {
      items: [{ ...product, quantity: 1 }],
      total: 100
    };
    
    const actual = devisReducer(stateWithItem, addToDevis(product));
    
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(2);
    expect(actual.total).toBe(200);
  });

  it('should handle removeFromDevis', () => {
    const stateWithItem = {
      items: [{ id: '1', titre: 'Product 1', prix: 100, quantity: 1 }],
      total: 100
    };
    
    const actual = devisReducer(stateWithItem, removeFromDevis('1'));
    
    expect(actual.items).toHaveLength(0);
    expect(actual.total).toBe(0);
  });

  it('should handle increaseQty', () => {
    const stateWithItem = {
      items: [{ id: '1', titre: 'Product 1', prix: 100, quantity: 1 }],
      total: 100
    };
    
    const actual = devisReducer(stateWithItem, increaseQty('1'));
    
    expect(actual.items[0].quantity).toBe(2);
    expect(actual.total).toBe(200);
  });

  it('should handle decreaseQty', () => {
    const stateWithItem = {
      items: [{ id: '1', titre: 'Product 1', prix: 100, quantity: 2 }],
      total: 200
    };
    
    const actual = devisReducer(stateWithItem, decreaseQty('1'));
    
    expect(actual.items[0].quantity).toBe(1);
    expect(actual.total).toBe(100);
  });

  it('should not decrease quantity below 1', () => {
    const stateWithItem = {
        items: [{ id: '1', titre: 'Product 1', prix: 100, quantity: 1 }],
        total: 100
      };
      
      const actual = devisReducer(stateWithItem, decreaseQty('1'));
      
      expect(actual.items[0].quantity).toBe(1);
      expect(actual.total).toBe(100); // Should remain same if quantity didn't change, based on logic? 
      // Actually checking the implementation: 
      // if (item && item.quantity > 1) { ... }
      // So nothing happens if qty is 1.
  });

  it('should handle clearDevis', () => {
    const stateWithItem = {
      items: [{ id: '1', titre: 'Product 1', prix: 100, quantity: 1 }],
      total: 100
    };
    
    const actual = devisReducer(stateWithItem, clearDevis());
    
    expect(actual).toEqual(initialState);
  });
});
