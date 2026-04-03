import pool from '../config/db.js'; // .js extension zaroori hai

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 8, category = 'All', sort = 'default', search = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.*, t.tag_name, sc.name as subcategory_name, 
             ps.quantity as stock, ps.min_order,
             (SELECT AVG(rating) FROM product_reviews WHERE product_id = p.id) as avg_rating,
             (SELECT COUNT(*) FROM product_reviews WHERE product_id = p.id) as review_count
      FROM products p
      LEFT JOIN tags t ON p.tag_id = t.id
      LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
      LEFT JOIN product_stocks ps ON p.id = ps.product_id
      LEFT JOIN categories c ON sc.category_id = c.id
      WHERE 1=1
    `;

    const queryParams = [];

    // Filter by Category
    if (category !== 'All') {
      query += ` AND c.name = ?`;
      queryParams.push(category);
    }

    // Search Filter
    if (search) {
      query += ` AND p.name LIKE ?`;
      queryParams.push(`%${search}%`);
    }

    // Sorting Logic
    if (sort === 'price_low') query += ` ORDER BY p.price ASC`;
    else if (sort === 'price_high') query += ` ORDER BY p.price DESC`;
    else if (sort === 'highest_rated') query += ` ORDER BY avg_rating DESC`;
    else query += ` ORDER BY p.id ASC`;

    // Pagination
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, queryParams);
    
    const [countRows] = await pool.query('SELECT COUNT(*) as total FROM products');
    const totalProducts = countRows[0].total;

    res.status(200).json({
      success: true,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page),
      data: rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};