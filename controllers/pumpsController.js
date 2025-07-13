import db from '../db.js';
import camelcaseKeys from 'camelcase-keys';

export const getAllPumps = async (req, res) => {
  try {
    const { name, type, status, areaBlock } = req.query;

    let sql = 'SELECT * FROM pumps WHERE 1=1';
    const values = [];

    if (name) {
      sql += ' AND name LIKE ?';
      values.push(`%${name}%`);
    }
    if (type) {
      sql += ' AND type = ?';
      values.push(type);
    }
    if (status) {
      sql += ' AND status = ?';
      values.push(status);
    }
    if (areaBlock) {
      sql += ' AND area_block = ?';
      values.push(areaBlock);
    }

    const [rows] = await db.query(sql, values);
    const camelRows = camelcaseKeys(rows, { deep: true });

    res.json(camelRows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getPumpById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM pumps WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Pump not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPump = async (req, res) => {
  const {
    name, type, status, latitude, longitude,
    flowRate, offsetValue, offsetUnit,
    pressureMin, pressureMax, pressureCurrent,
    areaBlock,
  } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO pumps 
      (name, type, status, latitude, longitude, flow_rate, offset_value, offset_unit, 
      pressure_min, pressure_max, pressure_current, area_block) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, type, status, latitude, longitude, flowRate, offsetValue, offsetUnit,
        pressureMin, pressureMax, pressureCurrent, areaBlock,
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePump = async (req, res) => {
  const { id } = req.params;
  const {
    name, type, status, latitude, longitude,
    flowRate, offsetValue, offsetUnit,
    pressureMin, pressureMax, pressureCurrent,
    areaBlock,
  } = req.body;
  try {
    await db.query(
      `UPDATE pumps SET 
      name=?, type=?, status=?, latitude=?, longitude=?, flow_rate=?, offset_value=?, offset_unit=?, 
      pressure_min=?, pressure_max=?, pressure_current=?, area_block=? 
      WHERE id=?`,
      [
        name, type, status, latitude, longitude, flowRate, offsetValue, offsetUnit,
        pressureMin, pressureMax, pressureCurrent, areaBlock, id,
      ]
    );
    res.json({ message: 'Pump updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePump = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM pumps WHERE id = ?', [id]);
    res.json({ message: 'Pump deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
