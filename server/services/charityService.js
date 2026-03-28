import supabase from "../config/supabase.js";

export async function getCharities(page = 1, limit = 5) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("charities")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) throw error;

  return {
    data,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };
}