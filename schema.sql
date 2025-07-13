CREATE DATABASE IF NOT EXISTS pump_db;
USE pump_db;

drop table pumps;
CREATE TABLE pumps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('Centrifugal', 'Submersible', 'Diaphragm', 'Rotary', 'Peristaltic') NOT NULL,
  area_block ENUM(
    'Area A', 'Area B', 'Area C', 'Area D', 'Area E',
    'Area F', 'Area G', 'Area H', 'Area I', 'Area J'
  ) NOT NULL,

  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),

  flow_rate FLOAT,         -- GPM
  offset_value FLOAT,
  offset_unit ENUM('sec', 'ft'),

  pressure_current FLOAT,  -- psi
  pressure_min FLOAT,
  pressure_max FLOAT,

  status ENUM('Operational', 'Idle', 'Stopped', 'Fault', 'Maintenance') NOT NULL DEFAULT 'Operational',
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pumps (
  name, type, status, latitude, longitude,
  flow_rate, pressure_min, pressure_max, pressure_current,
  offset_value, offset_unit, area_block
) VALUES
('Pump A1', 'Centrifugal', 'Operational', -33.870, 151.210, 150.5, 30.0, 90.0, 60.0, 3.0, 'sec', 'Area A'),
('Pump A2', 'Diaphragm', 'Idle', -33.871, 151.211, 130.0, 25.0, 85.0, 50.0, 2.5, 'ft', 'Area B'),
('Pump A3', 'Centrifugal', 'Operational', -33.872, 151.212, 160.0, 35.0, 95.0, 65.0, 4.0, 'sec', 'Area C'),
('Pump A4', 'Peristaltic', 'Maintenance', -33.873, 151.213, 140.0, 28.0, 88.0, 58.0, 2.0, 'sec', 'Area D'),
('Pump A5', 'Centrifugal', 'Operational', -33.874, 151.214, 155.0, 32.0, 92.0, 61.0, 3.5, 'ft', 'Area E'),
('Pump A6', 'Diaphragm', 'Idle', -33.875, 151.215, 145.0, 29.0, 89.0, 59.0, 1.5, 'ft', 'Area F'),
('Pump A7', 'Centrifugal', 'Operational', -33.876, 151.216, 135.0, 27.0, 87.0, 57.0, 2.7, 'sec', 'Area G'),
('Pump A8', 'Peristaltic', 'Maintenance', -33.877, 151.217, 120.0, 24.0, 80.0, 55.0, 2.2, 'ft', 'Area H'),
('Pump A9', 'Centrifugal', 'Operational', -33.878, 151.218, 170.0, 38.0, 98.0, 70.0, 3.8, 'sec', 'Area I'),
('Pump A10', 'Diaphragm', 'Idle', -33.879, 151.219, 125.0, 22.0, 78.0, 52.0, 2.9, 'ft', 'Area J'),

('Pump B1', 'Centrifugal', 'Operational', -33.880, 151.220, 150.0, 31.0, 91.0, 60.0, 3.1, 'sec', 'Area A'),
('Pump B2', 'Peristaltic', 'Maintenance', -33.881, 151.221, 110.0, 20.0, 75.0, 50.0, 1.8, 'ft', 'Area B'),
('Pump B3', 'Centrifugal', 'Operational', -33.882, 151.222, 165.0, 36.0, 96.0, 66.0, 3.4, 'sec', 'Area C'),
('Pump B4', 'Diaphragm', 'Idle', -33.883, 151.223, 140.0, 30.0, 85.0, 55.0, 2.3, 'ft', 'Area D'),
('Pump B5', 'Centrifugal', 'Operational', -33.884, 151.224, 152.0, 33.0, 93.0, 63.0, 3.6, 'sec', 'Area E'),
('Pump B6', 'Peristaltic', 'Maintenance', -33.885, 151.225, 100.0, 18.0, 70.0, 45.0, 1.2, 'ft', 'Area F'),
('Pump B7', 'Centrifugal', 'Operational', -33.886, 151.226, 148.0, 30.0, 90.0, 60.0, 3.0, 'sec', 'Area G'),
('Pump B8', 'Diaphragm', 'Idle', -33.887, 151.227, 115.0, 21.0, 76.0, 53.0, 2.6, 'ft', 'Area H'),
('Pump B9', 'Centrifugal', 'Operational', -33.888, 151.228, 175.0, 40.0, 100.0, 72.0, 4.1, 'sec', 'Area I'),
('Pump B10', 'Peristaltic', 'Maintenance', -33.889, 151.229, 105.0, 19.0, 73.0, 49.0, 1.9, 'ft', 'Area J');

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
