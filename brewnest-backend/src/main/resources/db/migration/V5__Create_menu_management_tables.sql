CREATE TABLE menu_categories (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    is_active BIT NOT NULL DEFAULT 1,
    created_at DATETIME2 DEFAULT SYSDATETIME(),
    updated_at DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT uk_menu_categories_name UNIQUE (name),
    CONSTRAINT uk_menu_categories_slug UNIQUE (slug)
);

CREATE TABLE menu_items (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500) NULL,
    availability_status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
    category_id BIGINT NOT NULL,
    created_at DATETIME2 DEFAULT SYSDATETIME(),
    updated_at DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT fk_menu_items_category FOREIGN KEY (category_id) REFERENCES menu_categories(id),
    CONSTRAINT chk_menu_items_price CHECK (price > 0),
    CONSTRAINT chk_menu_items_availability CHECK (availability_status IN ('AVAILABLE', 'OUT_OF_STOCK', 'HIDDEN'))
);

CREATE INDEX idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX idx_menu_items_availability_status ON menu_items(availability_status);
CREATE INDEX idx_menu_items_name ON menu_items(name);

INSERT INTO menu_categories (name, slug, is_active) VALUES
('Coffee', 'coffee', 1),
('Tea', 'tea', 1),
('Desserts', 'desserts', 1),
('Snacks', 'snacks', 1),
('Breakfast', 'breakfast', 1);

INSERT INTO menu_items (name, description, price, image_url, availability_status, category_id) VALUES
('Cappuccino', 'Rich espresso with steamed milk and creamy foam.', 850.00, NULL, 'AVAILABLE', (SELECT id FROM menu_categories WHERE slug = 'coffee')),
('Cafe Latte', 'Smooth espresso mixed with warm milk.', 900.00, NULL, 'AVAILABLE', (SELECT id FROM menu_categories WHERE slug = 'coffee')),
('Iced Coffee', 'Cold brewed coffee served with ice.', 750.00, NULL, 'AVAILABLE', (SELECT id FROM menu_categories WHERE slug = 'coffee')),
('Brownie', 'Chocolate brownie served fresh.', 650.00, NULL, 'OUT_OF_STOCK', (SELECT id FROM menu_categories WHERE slug = 'desserts')),
('Milk Tea', 'Freshly brewed tea with milk.', 450.00, NULL, 'AVAILABLE', (SELECT id FROM menu_categories WHERE slug = 'tea'));
