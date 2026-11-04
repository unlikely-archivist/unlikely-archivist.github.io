// Shared by Molly's room (index.html) and the feast game (feast.html):
// everything is measured in doll-base.png pixels (1090 × 1443), with Molly's top-left corner at 0,0.
// Molly is drawn in 12px blocks and so are the clothes; dropped clothes land on her 12px grid
// (x ≡ 10, y ≡ 0 mod 12) so their pixels line up with hers. x, y = where each piece fits her,
// used only by keyboard players. z = stacking order: base 0, hair-front 4 (hair falls over all but the hat).
const DOLL_W = 1090, DOLL_H = 1443, P = 12, GX = 10;
const ITEMS = [
  { id: 'hat',    name: 'pink cowboy hat', src: 'assets/items/hat.png',    x: 274, y: -36,  w: 552, z: 5 },
  { id: 'hoodie', name: 'hoodie',          src: 'assets/items/hoodie.png', x: 94,  y: 348,  w: 888, z: 2.5,
    front: 'assets/items/hoodie-front.png', back: 'assets/items/hoodie-back.png' }, // the hood sits behind her head and hair
  { id: 'jacket', name: 'camo jacket',     src: 'assets/items/jacket.png', x: 166, y: 360,  w: 756, z: 3 },
  { id: 'boots',  name: 'buckle boots',    src: 'assets/items/boots.png',  x: 334, y: 1104, w: 444, z: 2 },
];
