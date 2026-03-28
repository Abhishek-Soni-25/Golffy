import { getCharities } from "../services/charityService.js";

export async function fetchCharities(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;

    const result = await getCharities(page, 5);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}