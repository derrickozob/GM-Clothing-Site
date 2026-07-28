// G&M product catalog — simple in-memory data, no backend needed.
const PRODUCTS = [
  {
    id: "hoodie-burgundy",
    name: "Hoodie",
    category: "Hoodie",
    price: 60,
    fill: "#6E2A34",
    ink: "#F0D9A8",
    sizes: ["S", "M", "L", "XL"],
    details: "Heavyweight fleece hoodie with the G&M quote printed across the chest and the peace mark stitched at the collar. Relaxed fit, drawstring hood, kangaroo pocket.",
    fabric: "80% cotton, 20% polyester fleece"
  },
  {
    id: "tshirt-white",
    name: "T-Shirt",
    category: "T-shirt",
    price: 30,
    fill: "#EFE9DA",
    ink: "#531F27",
    sizes: ["S", "M", "L", "XL"],
    details: "Classic crew-neck tee with the peace mark on the chest and the full quote printed on the back panel.",
    fabric: "100% combed cotton"
  },
  {
    id: "sweater-stone",
    name: "Crewneck Sweater",
    category: "Sweater",
    price: 50,
    fill: "#C9C3B4",
    ink: "#2E3B4E",
    sizes: ["S", "M", "L", "XL"],
    details: "Midweight crewneck with a boxy silhouette and ribbed cuffs. Quote printed front and center in bold poster type.",
    fabric: "70% cotton, 30% recycled polyester"
  },
  {
    id: "longsleeve-ink",
    name: "Long Sleeve",
    category: "Long Sleeve",
    price: 38,
    fill: "#1C1B19",
    ink: "#E4B94E",
    sizes: ["S", "M", "L", "XL"],
    details: "Long-sleeve tee with the quote wrapped across the chest and a small peace mark on the left sleeve.",
    fabric: "100% combed cotton"
  },
  {
    id: "hoodie-stone",
    name: "Hoodie",
    category: "Hoodie",
    price: 60,
    fill: "#C9C3B4",
    ink: "#2E3B4E",
    sizes: ["S", "M", "L", "XL"],
    details: "Same heavyweight build as our signature hoodie in a lighter stone colorway, ink-print quote across the chest.",
    fabric: "80% cotton, 20% polyester fleece"
  },
  {
    id: "tshirt-burgundy",
    name: "T-Shirt",
    category: "T-shirt",
    price: 30,
    fill: "#6E2A34",
    ink: "#E4B94E",
    sizes: ["S", "M", "L", "XL"],
    details: "Classic crew-neck tee in burgundy with the quote printed in gold across the front.",
    fabric: "100% combed cotton"
  },
  {
    id: "sweater-ink",
    name: "Crewneck Sweater",
    category: "Sweater",
    price: 50,
    fill: "#1C1B19",
    ink: "#E4B94E",
    sizes: ["S", "M", "L", "XL"],
    details: "Black crewneck with the quote printed in gold, boxy fit, ribbed cuffs.",
    fabric: "70% cotton, 30% recycled polyester"
  },
  {
    id: "longsleeve-cream",
    name: "Long Sleeve",
    category: "Long Sleeve",
    price: 38,
    fill: "#EFE9DA",
    ink: "#6E2A34",
    sizes: ["S", "M", "L", "XL"],
    details: "Cream long-sleeve tee, quote printed in deep burgundy across the chest.",
    fabric: "100% combed cotton"
  },
];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function formatPrice(n) {
  return "$" + n.toFixed(2).replace(/\.00$/, "");
}
