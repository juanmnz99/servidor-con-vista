
function generateMockProducts() {
    const mockProducts = [];
    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys'];
  
    for (let i = 1; i <= 100; i++) {
      const product = {
        id: i,
        title: `Product ${i}`,
        description: `This is product ${i}`,
        code: `CODE${i}`,
        price: Math.floor(Math.random() * 100) + 1,
        status: true,
        stock: Math.floor(Math.random() * 50) + 1,
        category: categories[Math.floor(Math.random() * categories.length)],
        thumbnails: [],
      };
  
      mockProducts.push(product);
    }
  
    return mockProducts;
  }
  
  module.exports = {
    generateMockProducts,
  };
  